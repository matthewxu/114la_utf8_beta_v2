<?php

/**
 * 后台管理基础类，后台控制器必须继承此类
 */
class XBackendBase extends Controller
{

    protected $_backendUserId;
    protected $_backendUserName;
    protected $_backendGroupId;
    protected $_backendGroupName;
    protected $_backendPermission;
    protected $_backendAcl;
    protected $_catalog;
    protected $_catalogAll;

    public function init()
    {
        //初始化
        parent::init();
        
        //更新session
        if (isset($_POST['sessionId']))
        {
            $session = Yii::app()->getSession();
            $session->close();
            $session->sessionID = $_POST['sessionId'];
            $session->open();
        }

        //从初始化的内容里面取的userid,若存在则证明有登录
        $this->_backendUserId = parent::_sessionGet('uid');
        $this->_backendUserName = parent::_sessionGet('uname');
        $this->_backendGroupId = parent::_sessionGet('_backendGroupId');

        /* 检测判断是否登陆,否则跳到login页面 */
        empty($this->_backendUserId) && $this->redirect(array('public/login'));
        empty($this->_backendGroupId) && $this->redirect(array('public/login'));
        
        $this->_backendGroupName = parent::_sessionGet('_backendGroupName');
        $this->_backendPermission = parent::_sessionGet('_backendPermission');
        $this->_backendAcl = parent::_sessionGet('_backendAcl');
        
        
        if(empty($this->_backendAcl) || empty($this->_backendGroupName))
        {
            $groupArr= AdminGroup::model()->findByPk($this->_backendGroupId);

            //当前组权限
            $this->_backendAcl = $groupArr->acl;
            parent::_sessionSet('_backendAcl',  $this->_backendAcl);
            
            //当前组id
            $this->_backendGroupId = $groupArr->id;
            parent::_sessionSet('_backendGroupId', $this->_backendGroupId);
            
            //当前组名
            $this->_backendGroupName = $groupArr->group_name;
            parent::_sessionSet('_backendGroupName', $this->_backendGroupName);
            
            unset($groupArr);
        }
        
        //栏目,后端在此获得全分类数组,前端在system里面获得
        $this->_catalog = XXcache::get('_catalog');
        $this->_catalogAll = XXcache::get('_catalogAll');
        
        //系统配置
        $this->_conf = XXcache::get('_config');

        $this->_theme = empty($this->_conf['theme'])?'default':$this->_conf['theme'];
//        $this->_conf = self::_config();
        
        //站点前台主题静态目录url
        !defined('STATIC_THEME_URL') && define('STATIC_THEME_URL', SITE_URL . 'static/themes/' . $this->_theme . '/');
                
        
    }

    /**
     * 配置文件中参数检测
     */
    protected function _configParams($params)
    {
        if (Yii::app()->params[$params['action']] != $params['val'] && $params['response'] == 'json')
        {
            exit(CJSON::encode(array('state' => 'error', 'message' => $params['message'])));
        } elseif (Yii::app()->params[$params['action']] != $params['val'] && $params['response'] == 'text')
        {
            exit($params['message']);
        } elseif (Yii::app()->params[$params['action']] != $params['val'])
        {
            $tplVar = array(
                'code' => '访问受限',
                'message' => $params['message'],
                'redirect' => $params['redirect'] ? $params['redirect'] : Yii::app()->request->urlReferrer,
            );
            exit($this->render('/_include/_error', $tplVar));
        }
    }

    /**
     * 实时获取系统配置
     * @return [type] [description]
     */
    private function _config()
    {
        $model = Config::model()->findAll();
        $config = null;
        foreach ($model as $row)
        {
            $config[$row['variable']] = $row['value'];
        }
        return $config;
    }

    /**
     * 更新基类
     *
     * @param $model 模块
     * @param $field 字段
     * @param $redirect 跳转
     * @param $tpl 模板
     * @param $pkField 主键id
     */
    protected function _update($model, $redirect = 'index', $tpl = '', $id = 0, $pkField = 'id', $field = '')
    {
        $modelName = !$field ? get_class($model) : $field;
        $data = $model->findByPk($id);
        empty($data) && XUtils::message('error', '记录不存在');
        if (isset($_POST[$modelName]))
        {
            $data->attributes = $_POST[$modelName];
            if ($data->save())
            {
                self::_backendLogger(array('catalog' => 'update', 'intro' => '调用基类更新数据，来自模块：' . $this->id . '，方法：' . $this->action->id)); //日志
                $this->redirect($redirect);
            }
        }
        $this->render($tpl, array('model' => $data));
    }

    /**
     * 录入基类
     *
     * @param $model 模块
     * @param $field 字段
     * @param $redirect 跳转
     * @param $tpl  模板
     */
    protected function _create($model, $redirect = 'index', $tpl = '', $field = false)
    {
        $modelName = !$field ? get_class($model) : $field;

        if (isset($_POST[$modelName]))
        {
            $model->attributes = $_POST[$modelName];
            $id = $model->save();
            if ($id)
            {
                self::_backendLogger(array('catalog' => 'update', 'intro' => '调用基类录入数据，来自模块：' . $this->id . '，方法：' . $this->action->id . ',ID:' . $id)); //日志
                $this->redirect($redirect);
            }
        }
        $this->render($tpl, array('model' => $model));
    }

    /**
     * 删除数据及附件
     *
     * @param $model  模型
     * @param $id  要删除的数据id
     * @param $redirect 跳转地址
     * @param $attach 附件字段
     * @param $conditionField 条件id
     */
    protected function _delete($model = null, $id = '', $redirect = 'index', $attach = null, $pkField = 'id')
    {
        if ($attach)
        {
            $data = $model->findAll($pkField . ' IN(:id)', array(':id' => $id));
            foreach ((array) $data as $row)
            {
                foreach ((array) $attach as $value)
                {
                    if (!empty($row[$value]))
                    {
                        @unlink($row[$value]);
                    }
                }
            }
        }
        $model->deleteAll(array('condition' => 'id IN(' . $id . ')'));
        //刷新缓存
        self::_refreshCache($model);
        $this->redirect($redirect);
    }

    /**
     * 审核基础类
     *
     * @param $model
     * @param $type
     * @param $id
     * @param $redirect
     * @param $attach
     * @param $pkField
     */
    protected function _verify($model = null, $type = 'verify', $id = '', $redirect = 'index', $cdField = 'status_is', $pkField = 'id')
    {
        $criteria = new CDbCriteria();
        $criteria->condition = $pkField . ' IN(' . $id . ')';
        $showStatus = $type == 'verify' ? 'Y' : 'N';
        $model->updateAll(array($cdField => $showStatus), $criteria);
        //刷新缓存
        self::_refreshCache($model);
        $this->redirect($redirect);
    }

    /**
     * 推荐基础类
     *
     * @param $model
     * @param $type
     * @param $id
     * @param $redirect
     * @param $attach
     * @param $pkField
     */
    protected function _commend($model = null, $type = 'commend', $id = '', $redirect = 'index', $pkField = 'id')
    {
        $criteria = new CDbCriteria();
        $criteria->condition = $pkField . ' IN(' . $id . ')';
        $commend = $type == 'commend' ? 'Y' : 'N';
        $model->updateAll(array('commend' => $commend), $criteria);
        //刷新缓存
        self::_refreshCache($model);
        $this->redirect($redirect);
    }

    /**
     * 刷新内置缓存
     * @param  $model
     */
    protected function _refreshCache($model)
    {
        if (is_object($model))
        {
            $modelx = get_class($model);
        } else
        {
            $modelx = $model;
        }
        switch (strtolower($modelx))
        {
            case 'link':
                XXcache::refresh('_link', 86400);
                break;
            case 'ad':
                XXcache::refresh('_ad', 86400);
                break;
            case 'catalog':
                XXcache::refresh('_catalog', 86400);
                break;
            case 'UserGroup':
                XXcache::refresh('_userGroup', 86400);
                break;
        }
    }

    /**
     * 系统组禁止操作
     * @param $group
     * @throws CHttpException
     */
    protected function _groupPrivate($groupId = 0, $noAccess = array('1', '2'))
    {
        if (is_array($groupId))
        {
            foreach ($groupId as $value)
            {
                if (in_array($value, $noAccess))
                {
                    throw new CHttpException(404, '系统组不允许进行此操作');
                }
            }
        } else
        {
            if (in_array($groupId, $noAccess))
            {
                throw new CHttpException(404, '系统组不允许进行此操作');
            }
        }
    }

    /**
     * 取用户组列表
     * @param $type
     */
    protected function _groupList($type = 'admin')
    {
        if ($type == 'admin')
        {
            return AdminGroup::model()->findAll();
        }  else
        {
            return FALSE;
        }
    }

    /**
     * 权限检测
     * 超级用户组跳过检测
     * 附加 index_index 后台首页,防止重复验证权限
     * @param $action
     */
    protected function _acl($action = false, $params = array('response' => false, 'append' => 'default_index|'))
    {
        //若action为空,则使用path组合
        $actionFormat = empty($action) ? strtolower($this->id . '_' . $this->action->id) : strtolower($action);
        //判断是否admin
        $permission = $this->_backendPermission;

        //不是admin的时候
        if ($permission != 'backendstrator')
        {
            try
            {
                if (FALSE === strpos($this->_backendAcl. $params['append'], '|'.$actionFormat.'|'))
                {
                    throw new Exception('当前角色组无权限进行此操作，请联系管理员授权');
                }
            } catch (Exception $e)
            {

                if ($params['response'] == 'text')
                {
                    exit($e->getMessage());
                } elseif ($params['response'] == 'json')
                {
                    $var['state'] = 'error';
                    $var['message'] = $e->getMessage();
                    exit(CJSON::encode($var));
                } else
                {
                    $referrer = Yii::app()->request->urlReferrer ? Yii::app()->request->urlReferrer : $this->createUrl('default/welcome');
                    if (preg_match("/default\/index/i", $referrer))
                    {
                        $referrer = $this->createUrl('default/welcome');
                    }
                    $tplVar = array(
                        'code' => '访问受限',
                        'message' => $e->getMessage(),
                        'redirect' => !empty($params['redirect']) ? $params['redirect'] : $referrer,
                    );
                    exit($this->render('/_common/_error', $tplVar));
                }
            }
        }
    }
    
    /**
     * 处理图片上传
     * @param type $imageField 图片字段
     * @return null
     */
    protected function _doLocalImage($imageField='image_link')
    {

        $file = $image_link = null;
        if (!empty($_FILES[$imageField]) && !empty($_FILES[$imageField]['name']))
        {
            $file = XUpload::upload(
                $_FILES[$imageField], array(
                    'thumb' => false,
                    'allowExts' => $this->_conf['upload_allow_ext'],
                    'maxSize' => $this->_conf['upload_max_size']*1024,
                    'saveRule' => array(
                        'rule' => 'default',
                        'format' => 'Ymd',
                        'path' => DIR_UPLOADS,
                    )
                )
            );
        }
        if (!empty($file) && is_array($file) && isset($file['name']))
        {
            if (!empty($_POST['oldpicname']))
            {
                $oldname = str_replace($file['savename'], $file['name'], $file['pathname']);
                // 删掉同名图片
                is_file($oldname) && unlink($oldname);
                //改名为原名
                rename($file['pathname'],$oldname);
                $image_link = str_replace(DIR_UPLOADS, '', $file['savepath'].$file['name']);
            }  else
            {
                $image_link = str_replace(DIR_UPLOADS, '', $file['pathname']);
            }
        }
//                ppr($image_link,1);
        return $image_link;
    }
    
    /**
     * 得到父类别id
     * @param type $id
     */
    protected function _getParentCatalogId($id)
    {
        $fid = 0;
        foreach ($this->_catalog as $cv)
        {
            if ($cv['id'] == $id)
            {
                $fid = $cv['parent_id'];
                break;
            }
        }
        return $fid;
    }
    
    /**
     * 一个分类id的所有子分类,是否最底层,是否有排除
     * @param type $fid
     * @param type $last
     * @param type $notArr
     * @return type
     */
    function getChildCatalogId($fid,$last=null,$notArr=array())
    {
        $re= array();
        foreach ($this->_catalog as $cv)
        {
            if ($cv['parent_id'] == $fid && !in_array($cv['id'], $notArr))
            {
                if (!isset($last) || (isset($last) && $cv['last'] == $last))
                {
                    $re[$cv['id']] = $cv;
                }
            }
        }
        return $re;
    }
    
}
