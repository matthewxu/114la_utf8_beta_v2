<?php

/**
 * crond
 */

class CrondController extends Controller
{
    public function actionIndex()
    {
        /* 永不超时 */
        ini_set('max_execution_time', 0);

        //生成的crond
        $this->_conf = XXcache::get('_config');
        if(empty($this->_conf['is_cron']))
        {
            exit();
        }
        
        $crond_json_file = SITE_BACKEND_PATH.'protected/data/crond/crond.json';
        $arr = json_decode(file_get_contents($crond_json_file),TRUE);

        
        //为1则为完全删除
        $old = empty($arr['old'])?0:1;
        unset($arr['key'],$arr['old']);

        $arr = array_keys($arr);
//        XUtils::ppr($arr,1);
        foreach ($arr as $v)
        {
            switch ($v)
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
                    $re[$info->tb_id.','.$info->id] = $this->doTb($info->tb_id,$info->id,$old);
                }
            }
//XUtils::ppr($re,1);
        }
        exit('执行完毕');
    }
    
    
    private function doTb($tid,$cid=0,$old=0)
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
                    if(empty($old))
                    {
                        Links::model()->updateAll(array('status_is'=>'N'),"`catalog_id`='$cid'");
                    }  else
                    {
                        Links::model()->deleteAll("catalog_id=:cid", array(':cid'=>$cid));
                    }
                    
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
//                    try {
                        $model = new Links();
                        $info['catalog_id'] = $cid;
                        $info['title'] = empty($info['title'])?'待定':$info['title'];
                        $info['link'] = empty($info['link']) || $info['link']=='#'?'http://www.114la.com/':$info['link'];
                        $info['mix'] = empty($info['mix']) ? null : base64_decode($info['mix']);
                        $info = array_filter($info);
                        $model->attributes = $this->_form($info);
//                        ppr($model->attributes);
                        $model->save();
//                    } catch (Exception $exc) {
//                        return 'error1';
//                    }
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
        $links['user_id'] = 0;
        return $links;
    }
}

?>