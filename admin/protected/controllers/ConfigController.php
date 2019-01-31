<?php

class ConfigController extends XBackendBase
{

    public function actionInfo()
    {
        //权限
        parent::_acl();
        //处理修改
        $this->_updateData(reqPost('config'));
        $this->render('info', array('config' => XXcache::loadData('_config')));
    }
    
    /**
     * 更新数据表数据
     */
    private function _updateData($data)
    {
        if (XUtils::method() == 'POST')
        {
            if(!empty($_FILES['site_logo']['name']))
            {
                $this->_getLogo('site_logo',SITE_PATH.'static/',$data['site_logo']);
            }  else
            {
                unset($data['site_logo']);
            }
                
            foreach ((array) $data as $key => $row)
            {
                $row = XUtils::addslashes($row);
                Yii::app()->db->createCommand("REPLACE INTO {{config}}(`variable`, `value`) VALUES('$key', '$row') ")->execute();
            }
            XXcache::refresh('_config', 3600);
            parent::_backendLogger(array('catalog' => 'update', 'intro' => '更新系统配置，模块：' . $this->action->id));
            XUtils::message('success', '更新完成', $this->createUrl($this->action->id));
        }
    }

    function actionCache()
    {
        $dataList = array(
            'pageCache'=>'页面缓存',
            'dataCache'=>'数据缓存',
            'allCache'=>'全部缓存',
        );
        
//        ppr($dataList);
        $notice = '选择缓存类型';
        if (XUtils::method() == 'POST')
        {
            $cacheType = reqPost('cacheType',NULL);
            $path=SITE_BACKEND_PATH.'assets';
            switch ($cacheType)
            {
                case 'pageCache':
                    XUtils::delDirAndFile($path);
                    break;
                case 'dataCache':
                    cacheFlush();
                    break;
                case 'allCache':
                    cacheFlush();
                    XUtils::delDirAndFile($path);
                    break;
            }
            
            $notice .= '<br />清空完成!';
        }

        $this->render('cache',array('dataList'=>$dataList,'notice'=>$notice));
        
    }
    
    private function _getLogo($imageField,$path,$logoname)
    {

        $temp_arr = explode('.', $logoname);
        $hz = end($temp_arr);
        
        if (!in_array($hz, array('png','gif','jpg','jpeg')))
        {
            $logoname = 'logo.png';
        }
        
        $file = $image_link = null;
        if (!empty($_FILES[$imageField]) && !empty($_FILES[$imageField]['name']))
        {
            $file = XUpload::upload(
                $_FILES[$imageField], array(
                    'thumb' => false,
                    'allowExts' => $this->_conf['upload_allow_ext'],
                    'maxSize' => $this->_conf['upload_max_size']*1024,
                    'saveRule' => array(
                        'rule' => 'custom',
                        'string' => 'images',
                        'path' => $path,
                    )
                )
            );
        }
        $image_link = str_replace($file['savename'], $logoname, $file['pathname']);
        // 删掉同名图片
        is_file($image_link) && unlink($image_link);
        //改名为原名
        rename($file['pathname'],$image_link);

        return $image_link;
    }
    
}