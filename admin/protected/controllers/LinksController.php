<?php

/**
 * 内容管理
 * 
 */
class LinksController extends XBackendBase
{

    /**
     * 首页
     *
     */
    public function actionIndex()
    {
        parent::_acl();
        //过期
        $show = reqGet('show',null);
        
        $catalogId = intval(reqGet('catalogId', 0));
        $catalogList = $catalogListSub = null;
        //顶级分类

        if ($catalogId > 0)
        {
            $catalogList = XXcache::_doCatalog($catalogId, $this->_catalog);
            foreach ($this->_catalog as $value)
            {
                if ($value['id'] == $catalogId)
                {
                    $value['catalog_name'] = '=='.$value['catalog_name'].'==';
                    if (empty($catalogList))
                    {
                            $catalogList = array($value);
                    }  else
                    {
                            $catalogList = array_merge(array($value),$catalogList);
                    }
                }
            }
            if (!empty($catalogList))
            {
                //非last
                foreach ($catalogList as $value)
                {
                    $catalogListSub[]=$value['id'];
                }
                
//                $catalogListSub = implode(',', $catalogListSub);
            } 
        }  else
        {
            //全部有效分类
            if (!empty($this->_catalog))
            {
                //非last
                foreach ($this->_catalog as $value)
                {
                    $catalogListSub[]=$value['id'];
                }
            } 
        } 
        
        $catalogList = $this->_catalog;

        $model = new Links();
        $criteria = new CDbCriteria();
        $condition = '1';

        $keyword = trim(reqGet('keyword'));
        $search_type = trim(reqGet('search_type'));
        $keyword && $search_type && $condition .= ' AND ' . $search_type . ' LIKE \'%' . $keyword . '%\'';

        if ($show)
        {
            $theTime = time();
            //有效但过期
            if ($show == 'past')
            {
                $condition .= " AND t.status_is = 'Y' AND begin_time>0 AND end_time>0 AND (`begin_time` > '$theTime' OR `end_time` < '$theTime')";
            }

            //无效
            if ($show == 'status_n')
            {
                $condition .= " AND t.status_is = 'N' ";
            }
        }
            
        if (!empty($catalogListSub))
        {
            $temp = null;
            foreach ($catalogListSub as $value)
            {
                $temp[] = "`catalog_id` = '$value'";
            }
            
            $condition .= ' AND ('.  implode(' OR ', $temp).')';
            
//            $condition .= ' AND `catalog_id` IN ('.$catalogListSub.')';
        }  else
        {
            $catalogId && $condition .= ' AND `catalog_id`= ' . $catalogId;
        }

        $criteria->condition = $condition;

        $criteria->order = 't.catalog_id ASC,t.status_is ASC,t.sort_order ASC';
        $criteria->with = array('catalog', 'user');
        $count = $model->count($criteria);
        $pages = new CPagination($count);
        $pages->pageSize = 15;
        $pageParams = XUtils::buildCondition($_GET, array('title', 'catalogId', 'search_type', 'keyword','show', 'r'));
        $pages->params = is_array($pageParams) ? $pageParams : array();
        $criteria->limit = $pages->pageSize;
        $criteria->offset = $pages->currentPage * $pages->pageSize;
        $result = $model->findAll($criteria);
//        ppr($result);
        $this->render('index', array('datalist' => $result, 'pagebar' => $pages, 'pagecount'=>$count,'catalogList' => $catalogList, 'catalogId' => $catalogId, 'keyword' => $keyword, 'search_type' => $search_type));
    }

    /**
     * 录入
     *
     */
    public function actionCreate()
    {
//        ppr($this->_catalog);
//        parent::_acl();
        $model = new Links();

        $catalogId = intval(reqGet('catalogId', 0));

        if (!empty($_POST['Links']))
        {
            
//            ppr($_SESSION);
            $model->attributes = $this->_form($_POST['Links']);
            
//            ppr($model->attributes);
//            var_dump($_POST['Links']);exit;
            
            if ($model->save())
            {
                XXcache::refresh('_catalogAllNum');
                parent::_backendLogger(array('links' => 'create', 'intro' => '录入内容,title:' . $model->title));
//                $this->redirect(array('index','catalogId'=>$catalogId));
                 XUtils::message('success', '操作完成', Yii::app()->request->urlReferrer);
            }
        }
//        $attrData = Attr::dataReset($attr);
//        $attrModel = Attr::lists($model->catalog_id, 'post');
//        $this->render('create', array('model' => $model, 'imageList' => $imageListSerialize['data'], 'attrModel' => $attrModel, 'attrData' => $attrData));
        $this->render('create', array('model' => $model,'catalogId'=>$catalogId));
    }

    /**
     * 批量录入
     *
     */
    public function actionCreateBatch()
    {
//        ppr($this->_catalog);
//        parent::_acl();
        
        $catalogId = intval(reqGet('catalogId', 0));

        if (!empty($_POST['Links']))
        {
            foreach ($_POST['Links'] as $links)
            {
                if (!empty($links['name']) && !empty($links['url']))
                {
    //            ppr($_SESSION);
                    $model = new Links();
                    $model->attributes = $this->_form(array('catalog_id'=>$catalogId,'title'=>$links['name'],'link'=>$links['url'],'sort_order'=>$links['sort']));
//                               ppr($links,1);
//                    ppr($model->attributes);

                    if ($model->save())
                    {
                        XXcache::refresh('_catalogAllNum');
//                    var_dump($_POST['Links']);exit;
                        parent::_backendLogger(array('links' => 'create', 'intro' => '批量录入内容,title:' . $model->title));
                    }  else
                    {
                        $this->render('create_batch', array('model' => $model,'catalogId'=>$catalogId));
                    }
                }
            }
            $this->redirect(array('index','catalogId'=>$catalogId));
        }

        $model = new Links();
        $this->render('create_batch', array('model' => $model,'catalogId'=>$catalogId));
    }
    
    /**
     * 导入
     *
     */
    public function actionCreateImport()
    {
//        ppr($this->_catalog);
//        parent::_acl();
        
        $catalogId = intval(reqGet('catalogId', 0));
        $doimg = intval(reqPost('doimg', 0));

        if (!empty($_POST['Links']))
        {
            $catalogId = intval($_POST['Links']['catalog_id']);
            if ($catalogId<=0 )
            {
                XUtils::message('error', '未选择分类');exit();
            }
            $html = $_POST['Links']['sites'];
            $links_arr = $this->_import($html,$doimg,300);
            if (!empty($links_arr))
            {
                
                foreach ($links_arr as $links)
                {
                    if (!empty($links['title']) && !empty($links['link']))
                    {
        //            ppr($_SESSION);
                        $links['catalog_id'] = $catalogId;
                        $model = new Links();
                        $model->attributes = $this->_form($links);
                        if ($model->save())
                        {
                            XXcache::refresh('_catalogAllNum');
    //                    var_dump($_POST['Links']);exit;
                            parent::_backendLogger(array('links' => 'create', 'intro' => '导入内容,title:' . $model->title));
                        }  else
                        {
                            $this->render('create_import', array('model' => $model,'catalogId'=>$catalogId));
                        }

                    }
                }
            }  
            

            XUtils::message('success', '操作完成', $this->createUrl('index',array('catalogId'=>$catalogId)));
//            $this->redirect(array('index','catalogId'=>$catalogId));
        }
        
        $model = new Links();
        $this->render('create_import', array('model' => $model,'catalogId'=>$catalogId));
    }

    /**
     * 删除
     *
     * @param  $id
     */
    public function actionDelete($id)
    {
        $model = Links::model()->deleteByPk($id);
        parent::_backendLogger(array('links' => 'delete', 'intro' => '删除数据'.$id));
        XXcache::refresh('_catalogAllNum');
        XUtils::message('success', '操作完成', Yii::app()->request->urlReferrer);
    }
    /**
     * 更新
     *
     * @param  $id
     */
    public function actionUpdate($id)
    {
//        parent::_acl();

        $id = intval(reqGet('id', 0));
        
        if (is_int($id) && $id>0 )
        {
            $model = Links::model()->findByPk($id);
        }  else
        {
            XUtils::message('error', '未选择数据');exit();
        }
        
        $catalogId = $model->catalog_id;
        
        if (isset($_POST['Links']))
        {
            
            $links = $this->_form($_POST['Links']);

            $model->attributes = $links;

            if ($model->save())
            {
                XXcache::refresh('_catalogAllNum');
                parent::_backendLogger(array('catalog' => 'update', 'intro' => '编辑内容,ID:' . $id));
                XUtils::message('success', '操作完成', Yii::app()->request->urlReferrer);
            }
        }
//        ppr($model,1);
        
        $this->render('update', array('model' => $model,'id'=>$id,'catalogId'=>$catalogId));
    }

    /**
     * 批量操作
     *
     */
    public function actionBatch()
    {
        if (XUtils::method() == 'POST')
        {
            $ids = reqPost('id');
            empty($ids) && XUtils::message('error', '未选择记录');
        } else
        {
            XUtils::message('errorBack', '只支持POST数据');
        }
        
        $upd = reqPost('upd',null);
        $del = reqPost('del',null);
//        ppr($ids);
//        ppr($_POST,1);
        
        if ($upd)
        {
            $sortOrder = reqPost('sort_order');
            $title = reqPost('title');
            $link = reqPost('link');
            $img_link = reqPost('img_link');
            $status = reqPost('status');

            foreach ((array) $ids as $id)
            {
                $catalogModel = Links::model()->findByPk($id);
                if ($catalogModel)
                {
                    $catalogModel->sort_order = $sortOrder[$id];
                    $catalogModel->title = $title[$id];
                    $catalogModel->link = $link[$id];
                    $catalogModel->image_link = $img_link[$id];
                    $catalogModel->status_is = $status[$id];
                    $catalogModel->create_time = time();
                    //                ppr($catalogModel,1);
                    $catalogModel->save();
                }
            }
            parent::_backendLogger(array('links' => 'update_batch', 'intro' => '修改数据'));
        } elseif ($del)
        {
            foreach ((array) $ids as $id)
            {
                $catalogModel = Links::model()->findByPk($id);
                $catalogModel->delete();
            }
            parent::_backendLogger(array('links' => 'delete_batch', 'intro' => '删除数据'));
        }
        XXcache::refresh('_catalogAllNum');
        XUtils::message('success', '操作完成', Yii::app()->request->urlReferrer);
    }

    private function _form($links)
    {
        if (!empty($links['mix']) && !XUtils::isUtf8($links['mix']))
        {
            $links['mix'] = XUtils::autoCharset($links['mix']);
        }
        
        if (!empty($links['title']) && !XUtils::isUtf8($links['title']))
        {
            $links['title'] = XUtils::autoCharset($links['title']);
        }
        
        $links['mix'] = empty($links['mix']) ? null : XUtils::b64encode($links['mix']);
        
        //先判断是外链图片还是本地图片
        $imgtype = reqPost('imgtype',null);
//        ppr($_POST,1);
        if (!empty($imgtype))
        {
            if ($imgtype == 'local')
            {
                 $links['image_link'] = $this->_doLocalImage('image_link');   
            }
            
            if (empty($links['image_link']))
            {
                $links['image_link'] = null;
            }
        }
        
        $links['begin_time'] = empty($links['begin_time']) ? 0 : strtotime($links['begin_time']);
        $links['end_time'] = empty($links['end_time']) ? 0 : strtotime($links['end_time']);
//            ppr($links_arr,1);
        $links['create_time'] = $this->_thetime;
        $links['user_id'] = $this->_backendUserId;
        
        return $links;
    }

  /**
     * 批量导入网站
     *
     * @param array $data 网址数组
     * @param int $n 条数
     */
    private function _import($data,$doimg=0,$n=300)
    {

        //解析字符串
        $sites = $imgs = null;
        preg_match_all('/<a.*?(?: |\\t|\\r|\\n)?href=[\'"]?(.+?)[\'"]?(?:(?: |\\t|\\r|\\n)+.*?)?>(.+?)<\/a.*?>/sim',$data,$result);
//ppr($result); 
        $x =1;
        foreach ($result[2] as $i => $name)
        {
            if (!empty($n) && is_int($n) && $x>$n)
            {
                break;
            }
            
            $name = trim(strip_tags($name));
            $url = $result[1][$i];
            if (empty($name) || empty($url))
            {
                unset($result[1][$i]);
                unset($result[2][$i]);
                continue;
            }
            $sites[] = array('title' => $name, 'link' => $url);
            $x++;
        }
        
        if ($doimg == 1)
        {
            preg_match_all("/[img|IMG].*?src=['|\"](.*?(?:[.gif|.jpg|.png|.jpeg.|.bmp]))['|\"].*?[\/]?>/", $data, $result2);
//ppr($result2); 
            foreach ($result2[1] as $i => $imglink)
            {
                $imgs[] = $imglink;
            }
        
            if (count($imgs) == count($sites))
            {
                
                foreach ($sites as $key => $value)
                {
                    if (!empty($imgs[$key]))
                    {
                        $value['image_link'] = $imgs[$key];
                    }
                    $sites[$key] = $value;
                }
            }
        }
//        ppr($_REQUEST);        
//        ppr($sites,1);
        return $sites;
    }
    
    
/**
     * 同步
     */
    public function actionTb()
    {
        $tid = reqGet('tid');
        $cid = reqGet('cid');
        exit($this->doTb($tid,$cid));
    }
    
    private function doTb($tid,$cid=0)
    {
        if ($tid == 2610)
        {
            //彩票部分
            $cacheId = 'doTb_'.$tid;
            $fcurl = cacheGet($cacheId);
            if (empty($fcurl))
            {
                $url = 'http://www.114la.com/icai.json';
                $fcurl = XUtils::fcurl($url);
                cacheSet($cacheId, $fcurl, 3600);
            }
            $fcurl = substr($fcurl, 17,-1);
            
            $data_arr = json_decode($fcurl, TRUE);
            
            if (!empty($data_arr))
            {
                //对应关系
                $dy = array(
                    'ssq'=>array(220,221,222),
                    'dlt'=>array(223,224,225),
                    'fc3d'=>array(226,227,228),
                    'jx_11x5'=>array(229,230,231),
                );
                
                
                foreach ($data_arr as $tp => $v)
                {
                    $va =$v[0];


                    $fdata[$dy[$tp][0]] = array(
                        0 => array(
                            'title' => '上期开奖号码',
                            'link' => $va['url'][0],
                            'opt_a' => implode(',', $va['result']), //附加参数1	
                            'opt_b' => $va['phase'], //附加参数2	
                            'opt_c' => $va['date'], //附件参数3	
                        ),
                    );
                    $fdata[$dy[$tp][1]] = array(
                        0 => array(
                            'title' => '立即投注',
                            'link' => $va['url'][1],
                        ),
                        1 => array(
                            'title' => $va['chain'][0],
                            'link' => $va['chain'][1],
                        ),
                    );
                    
                    foreach ($va['link'] as $vl => $tu)
                    {
                        $tu['link'] = $tu['url'];
                        unset($tu['url']);
                        $va['link'][$vl] = $tu;
                    }
                    $fdata[$dy[$tp][2]] = $va['link'];
                }
                    
            }
                    
            if (!empty($fdata))
            {
                foreach ($fdata as $cid=>$cinfo)
                {
                    Links::model()->deleteAll("catalog_id=:cid", array(':cid'=>$cid));
                    foreach ($cinfo as $info)
                    {
                        try {
                            $model = new Links();
                            $info['catalog_id'] = $cid;
                            $info['title'] = empty($info['title'])?'待定':$info['title'];
                            $info['link'] = empty($info['link']) || $info['link']=='#'?'http://www.114la.com/':$info['link'];
                            $info['mix'] = empty($info['mix']) ? null : base64_decode($info['mix']);
                            $info = array_filter($info);
                            $model->attributes = $this->_form($info);
    //                        ppr($model->attributes);
                            $model->save();
                        } catch (Exception $exc) {
                            return 'error1caipiao';
                        }
                    }
                }
            }
            
            return 'ok';
//            ppr($fdata,1);
            
        }  elseif ($tid == 1114)
        {
            //实时热点部分
            $cacheId = 'doTb_'.$tid;
            $fcurl = cacheGet($cacheId);
            if (empty($fcurl))
            {
                $url = 'http://api4.114la.com/1114_2.json';
                $fcurl = XUtils::fcurl($url);
                cacheSet($cacheId, $fcurl, 3600);
            }
            $fcurl = substr($fcurl, 20,-1);
//            ppr($fcurl,1);
            if(!empty($fcurl) && $fcurl=  json_decode($fcurl, 1))
            {
            
                //先将对应的旧数据处理
                $old = reqPost('old');
                if(empty($old))
                {
                    Links::model()->updateAll(array('status_is'=>'N'),"`catalog_id`='$cid'");
                }  else
                {
                    Links::model()->deleteAll("catalog_id=:cid", array(':cid'=>$cid));
                }
//                ppr(Links::model()->findAll("`catalog_id`='$cid'"));
                foreach ($fcurl as $info)
                {
                    try {
                        $model = new Links();
                        $info['catalog_id'] = $cid;
                        $info['title'] = empty($info['title'])?'待定':$info['title'];
                        $info['link'] = empty($info['url']) || $info['url']=='#'?'http://www.114la.com/':$info['url'];
                        unset($info['url']);
                        $info = array_filter($info);
                        $model->attributes = $this->_form($info);
//                        ppr($model->attributes);
                        $model->save();
                    } catch (Exception $exc) {
                        return 'error1';
                    }
                }

                $cacheId = '_catalogAllNum';
                $catalogAllNum = XXcache::refresh($cacheId);
                return empty($catalogAllNum[$cid])?0:$catalogAllNum[$cid].' ok';
            }  else
            {
                return 'error2';
            }
            ppr($data_arr,1);
            
        }  elseif ($tid>1000 && $tid<10000)
        {
            $tid = (int)$tid;
            $data = $re = 0;
            
            $cacheId = 'doTb_'.$tid;
            
            $fcurl = cacheGet($cacheId);
            if (empty($fcurl))
            {
                $url = 'http://www.114la.com/api/ky.php?id='.$tid.'&'.time();
//                $url = 'http://www.114la.com/api/ky.php?id='.$tid;
                $fcurl = XUtils::fcurl($url);

                cacheSet($cacheId, $fcurl, 3600);
            }

            if(!empty($fcurl) && $fcurl=  json_decode($fcurl, 1))
            {
            
                //先将对应的旧数据处理
                $old = reqPost('old');
                if(empty($old))
                {
                    Links::model()->updateAll(array('status_is'=>'N'),"`catalog_id`='$cid'");
                }  else
                {
                    Links::model()->deleteAll("catalog_id=:cid", array(':cid'=>$cid));
                }
//                ppr(Links::model()->findAll("`catalog_id`='$cid'"));
                foreach ($fcurl as $info)
                {
                    try {
                        $model = new Links();
                        $info['catalog_id'] = $cid;
                        $info['title'] = empty($info['title'])?'待定':$info['title'];
                        $info['link'] = empty($info['link']) || $info['link']=='#'?'http://www.114la.com/':$info['link'];
                        $info['mix'] = empty($info['mix']) ? null : base64_decode($info['mix']);
                        $info = array_filter($info);
                        $model->attributes = $this->_form($info);
//                        ppr($model->attributes);
                        $model->save();
                    } catch (Exception $exc) {
                        return 'error1';
                    }
                }

                $cacheId = '_catalogAllNum';
                $catalogAllNum = XXcache::refresh($cacheId);
                return empty($catalogAllNum[$cid])?0:$catalogAllNum[$cid].' ok';
            }  else
            {
                return 'error2';
            }
        }  else
        {
            return 'error3';
        }
    }


    public function actionTbAll()
    {
        $make = reqPost('make');
        $re = $crondArr = array();
        $crond_json_file = SITE_BACKEND_PATH.'protected/data/crond/crond.json';
        if (!empty($make) && is_array($make))
        {

            if (!empty($make['crond']))
            {
                //这里生成crond地址
                $check = reqPost('check');
                $check['old'] = reqPost('old');
                file_put_contents($crond_json_file, json_encode($check));
                XUtils::message('success', '操作完成', $this->createUrl('links/tbAll'));
            }  else
            {
            
                $type = array_keys($make);
    //         ppr($type[0],1);
                switch ($type[0])
                {
                    case 'header':
                        $min = 1000;$max =  1999;
                        break;
                    case 'left':
                        $min = 2000;$max = 2999;
                        break;
                    case 'main':
                        $min = 3000;$max = 3999;
                        break;
                    case 'shop':
                        $min = 4000;$max = 4999;
                        break;
                    case 'fun':
                        $min = 5000;$max = 5999;
                        break;
                    case 'tools':
                        $min = 6000;$max = 6999;
                        break;
                    case 'games':
                        $min = 7000;$max = 7999;
                        break;
                }

                if (!empty($max) && !empty($min))
                {
                    $catalog_arr = Catalog::model()->findAll(
                    array(
                        'select' => 'id,tb_id',
                        'condition' => "t.tb_id>:min AND t.tb_id<:max",
                        'params' => array(':min'=>$min,':max'=>$max),
                    ));
                }

                if (!empty($catalog_arr))
                {
                    foreach ($catalog_arr as $info)
                    {
                        $re[$info->id] = $this->doTb($info->tb_id, $info->id);
                    }
                }
            }
//            XUtils::message('success', '操作完成', $this->createUrl('links/tbAll'));
//            $this->redirect(array('links/tbAll'));
        }
        
        if (is_file($crond_json_file))
        {
            $arr = json_decode(file_get_contents($crond_json_file),TRUE);
            if (empty($arr['old']))
            {
                unset($arr['old']);
            }
            
            $crondArr = array_keys($arr);
//            ppr($arr);
        }  
        
        $this->render('tb_all',array('catalog'=>$re,'crondArr'=>$crondArr));
    }
}
