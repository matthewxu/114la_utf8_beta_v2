<?php

class HtmlController extends XBackendBase
{

    public function actionCreate()
    {
        $make = reqReq('make');
        $page = $page_arr = $page_arr1 = $page_arr2 = null;
        if (!empty($make['index']))
        {
            $page = 'index';
            $page_arr = $this->actionCreateIndex();
        } elseif (!empty($make['inner']))
        {
            $page = 'inner';
            $page_arr = $this->actionCreateInner();
        } elseif (!empty($make['all']))
        {
            $page = 'all';
            $page_arr1 = $this->actionCreateIndex();
            $page_arr2 = $this->actionCreateInner();
            $page_arr = array_merge($page_arr1, $page_arr2);
            unset($page_arr1,$page_arr2);
        }

        $type = reqGet('type');

        $path_inside_page = $this->_conf['path_inside_page'];

        parent::_acl();
        $this->render('create', array('path_inside_page' => $path_inside_page, 'page' => $page,'page_arr'=>$page_arr));
//        ppr($this->_conf);
    }


    public function actionCreateIndex()
    {
        parent::_acl();

        $links = $this->_getDataPid(1); //首页
        $innerCatalog = Catalog::model()->findAll("`status_is`='Y' AND `parent_id`='2'");

        $links = $this->repInnerLink($links, $innerCatalog);
        
        $code = $this->render($this->_conf['theme'] . '/index', array('x' => $links,'cb'=>  $this->_getCityBox(),'eo'=>  $this->_getEmailOption()), 1);
        $filename_html = SITE_PATH . 'index.html';
        file_put_contents($filename_html, $code, LOCK_EX);
        $filename_htm = SITE_PATH . 'index.htm';
        file_put_contents($filename_htm, $code, LOCK_EX);
        
        $code = $this->render($this->_conf['theme'] . '/games_hot_ajax', array('x' => $links), 1);
        $filename_htm = SITE_PATH . 'ajax/games_hot_ajax.htm';
        file_put_contents($filename_htm, $code, LOCK_EX);
        
        $code = $this->render($this->_conf['theme'] . '/games_web_ajax', array('x' => $links), 1);
        $filename_htm = SITE_PATH . 'ajax/games_web_ajax.htm';
        file_put_contents($filename_htm, $code, LOCK_EX);
        
        $code = $this->render($this->_conf['theme'] . '/games_mini_ajax', array('x' => $links), 1);
        $filename_htm = SITE_PATH . 'ajax/games_mini_ajax.htm';
        file_put_contents($filename_htm, $code, LOCK_EX);

        
        $code = $this->render($this->_conf['theme'] . '/gouwu_ajax', array('x' => $links), 1);
        $filename_htm = SITE_PATH . 'ajax/gouwu_ajax.htm';
        file_put_contents($filename_htm, $code, LOCK_EX);

        $code = $this->render($this->_conf['theme'] . '/yule_ajax', array('x' => $links), 1);
        $filename_htm = SITE_PATH . 'ajax/yule_ajax.htm';
        file_put_contents($filename_htm, $code, LOCK_EX);

        
        
        unset($code,$links,$filename_html,$filename_htm);
        
        return array(0=>array('name'=>'首页','path'=>'','error'=>0));
    }

    public function actionCreateInner()
    {
        parent::_acl();

        //内页主类
        $innerCatalog = Catalog::model()->findAll("`status_is`='Y' AND `parent_id`='2'");
        
//        ppr($innerCatalog,1);
        
        $page_arr = null;
        if (!empty($innerCatalog))
        {
            foreach ($innerCatalog as $pageInfo)
            {
                $page_arr[$pageInfo->id] = array(
                    'name' => $pageInfo->catalog_name,
                    'path' => $pageInfo->path,
                    'error' => 0,
                );
                try {

                    if (FALSE === strpos($pageInfo->path, 'http:'))
                    {

                        if (empty($pageInfo->path))
                        {
                            $page_arr[$pageInfo->id]['error'] = '目录名未填写';
                            continue;
                        }

                        preg_match_all("/\w+/", $pageInfo->path, $re);
                        if (empty($re[0][0]))
                        {
                            $page_arr[$pageInfo->id]['error'] = '目录名只能是字母数字下划线';
                            continue;
                        }

                        $dir = SITE_PATH . substr($this->_conf['path_inside_page'], 1) . '/' . $re[0][0] . '/';
                        if (!is_dir($dir))
                        {
                            mkdir($dir);
                            if (!is_writable($dir))
                            {
                                $page_arr[$pageInfo->id]['error'] = '目录写入失败';
                                continue;
                            }
                        }
//                        ppr($pageInfo);ppr($this->_getDataPid($pageInfo->id));

                        $links = $this->_getDataPid($pageInfo->id);
//                        ppr($links);
                        //统一内页模板
                        $code = $this->render($this->_conf['theme'] . '/inner', array('info' => $pageInfo, 'links' => $links,'innerCatalog'=>$innerCatalog), 1);

                        $filename_html = $dir . 'index.html';
                        $filename_htm = $dir . 'index.htm';

                        file_put_contents($filename_html, $code, LOCK_EX);
                        file_put_contents($filename_htm, $code, LOCK_EX);
                    }  else
                    {
                        $page_arr[$pageInfo->id]['error'] = '已设置'.'<a href='.$pageInfo->path.' target="blank">外链</a>';
                    }
                } catch (Exception $exc) {
                    continue;
                }
            }
            
            return $page_arr;
        }
    }

    private function _getDataPid($pid)
    {
        //得到所有的父id为$pid的分类
        $dataList = XXcache::_doCatalog($pid, $this->_catalogAll);
        
        $dataRe = null;
        if (!empty($dataList))
        {
            foreach ($dataList as $key => $value)
            {
                $dataRe[$value['id']]['name'] = empty($value['catalog_name'])?null:$value['catalog_name'];
                $dataRe[$value['id']]['count'] = empty($value['data_count'])?null:$value['data_count'];
                $dataRe[$value['id']]['path'] = empty($value['path'])?null:$value['path'];
                $dataRe[$value['id']]['t'] = empty($value['seo_t'])?null:$value['seo_t'];
                $dataRe[$value['id']]['k'] = empty($value['seo_k'])?null:$value['seo_k'];
                $dataRe[$value['id']]['d'] = empty($value['seo_d'])?null:$value['seo_d'];
                $dataRe[$value['id']]['url'] = empty($value['redirect_url'])?null:$value['redirect_url'];
                $dataRe[$value['id']]['opt_1'] = empty($value['opt_1'])?null:$value['opt_1'];
                $dataRe[$value['id']]['opt_2'] = empty($value['opt_2'])?null:$value['opt_2'];
                if (!empty($value['last']) && !empty($value['id']))
                {
                    $dataRe[$value['id']]['data'] = $this->_getDataCid($value['id'], $value['data_count']);
                }
            }
        }
        unset($dataList);
//        ppr($dataRe,1);
        return $dataRe;
    }

    /**
     * 
     * @param type $cid
     */
    private function _getDataCid($cid, $count)
    {
        $theTime = $this->_thetime;
        $re = null;
        empty($count) && $count = 1000;
        // 状态可用 在期限内 
        $params = array(':cid' => $cid);
        $sql = "
            SELECT *
            FROM {{links}}
            WHERE `status_is`='Y'
            AND `catalog_id` = :cid
            AND (`begin_time`='0' OR `begin_time` IS NULL OR `begin_time` < '$theTime')
            AND (`end_time`='0' OR `end_time` IS NULL OR  `end_time` > '$theTime')
            ORDER BY sort_order ASC
            LIMIT $count
        ";
        $data = Links::model()->findAllBySql($sql, $params);

        if (!empty($data))
        {
            foreach ($data as $key=>$value)
            {
                if (empty($value->id))
                {
                    continue;
                }

                $re[$key]['title'] = $value->title;
                $re[$key]['title_color'] = $value->title_color;
                $re[$key]['id'] = $value->id;
                $re[$key]['link'] = empty($value->link)?null:$value->link;
                $re[$key]['image_link'] = empty($value->image_link)?null:$value->image_link;
                $re[$key]['opt_a'] = empty($value->opt_a)?null:$value->opt_a;
                $re[$key]['opt_b'] = empty($value->opt_b)?null:$value->opt_b;
                $re[$key]['opt_c'] = empty($value->opt_c)?null:$value->opt_c;
                $re[$key]['mix'] = empty($value->mix)?null:$value->mix;
            }
        }
//        ppr($re);
        return $re;
    }

    private function _getEmailOption()
    {
        return array(
            1 => array(
                "1" => "@163.com",
                "2" => "@126.com",
                "3" => "@vip.163.com",
                "4" => "@sina.com",
                "5" => "@vip.sina.com",
                "6" => "@yahoo.com.cn",
                "7" => "@yahoo.cn",
                "8" => "@sohu.com",
                "9" => "@tom.com",
                "10" => "@21cn.com",
                "11" => "@yeah.net",
                "12" => "@189.cn",
                "13" => "@139.com",
                "14" => "百度帐号",
                "15" => "人人网",
                "16" => "51.com",
                "17" => "ChinaRen",
            ),
            2 => array(
                "https://www.alipay.com/user/login.htm" => "支付宝",
                "http://t.sina.com.cn/" => "新浪微博",
                "http://www.kaixin001.com/" => "开心网",
                "http://qzone.qq.com/" => "QQ空间",
                "http://mail.qq.com/cgi-bin/loginpage" => "@qq.com",
                "http://mail.google.com/mail/" => "@gmail.com",
                "http://www.hotmail.com" => "@hotmail.com",
                "http://www.188.com/" => "@188.com",
            ),
        );
    }
    
    private function _getCityBox()
    {
        return array(
            "109"=>"B 北京",
            "117"=>"S 上海",
            "110"=>"T 天津",
            "135"=>"C 重庆",
            "119"=>"A 安徽",
            "123"=>"F 福建",
            "127"=>"G 广东",
            "128"=>"G 广西",
            "137"=>"G 贵州",
            "131"=>"G 甘肃",
            "111"=>"H 河北",
            "124"=>"H 河南",
            "125"=>"H 湖北",
            "126"=>"H 湖南",
            "129"=>"H 海南",
            "116"=>"H 黑龙江",
            "122"=>"J 江西",
            "120"=>"J 江苏",
            "115"=>"J 吉林",
            "114"=>"L 辽宁",
            "132"=>"N 宁夏",
            "113"=>"N 内蒙古",
            "133"=>"Q 青海",
            "118"=>"S 山东",
            "112"=>"S 山西",
            "130"=>"S 陕西",
            "136"=>"S 四川",
            "139"=>"X 西藏",
            "134"=>"X 新疆",
            "138"=>"Y 云南",
            "121"=>"Z 浙江",
            "140"=>"X 香港",
            "141"=>"A 澳门",
            "142"=>"T 台湾",
        );
    }
    
    
    protected function repInnerLink($links, $innerCatalog)
    {
        //整理innercatalog
        $idata = null;
        foreach ($innerCatalog as $key => $value)
        {
            if (!empty($value->path))
            {
                $value->catalog_name = trim($value->catalog_name);
                if (FALSE === strpos($value->path, 'http:'))
                {
                    $idata[$value->catalog_name] = SITE_URL . substr($this->_conf['path_inside_page'], 1) . '/' . $value->path . '/';
                } else
                {
                    $idata[$value->catalog_name] = $value->path;
                }
            }
        }

        //酷站的catalog的link,四格的链接的link
        $kid=array(123,124,125,126);
        $sid=array(103,104,105,106);
        
        //得到需要替换链接的分类id
        $karr = array();
        foreach ($kid as $kv)
        {
            $kvarr = $this->getChildCatalogId($kv);
            $kvarr = array_values($kvarr);
            
            if (!empty($kvarr))
            {
                foreach ($kvarr as $kva=>$vva)
                {
                    if (!empty($idata[$vva['catalog_name']]))
                    {
                        $karr[$vva['id']] = $idata[$vva['catalog_name']];
                    }
                }
            }
        }
        
        if(!empty($karr))
        {
            foreach ($karr as $kid => $kurl)
            {
                if (!empty($links[$kid]))
                {
                    $links[$kid]['url'] = $kurl;
                }
            }
        }
        
        
        //替换分类链接
        foreach ($sid as $vs)
        {
            if (!empty($links[$vs]['data']))
            {
                foreach ($links[$vs]['data'] as $ks => $vvs)
                {
                    if(!empty($idata[$vvs['title']]))
                    {
                        $links[$vs]['data'][$ks]['link'] = $idata[$vvs['title']];
                    }
                }
            }
        }

        return $links;
    }

}