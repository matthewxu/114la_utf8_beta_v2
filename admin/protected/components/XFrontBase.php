<?php

/**
 * 控制器基类，前台控制器必须继承此类
 * 
 */
class XFrontBase extends Controller
{

    public $layout = 'none'; //默认layout
    public $defaultAction='index'; //默认控制器方法
    protected $_conf;
    protected $_catalog;
    protected $_seoTitle;
    protected $_seoKeywords;
    protected $_seoDescription;
    protected $_thisUrl;

    /**
     * 初始化
     * @see CController::init()
     */
    public function init()
    {
        parent::init();
        
        
        //前端控制器在此获得分类,从顶级分类(0)开始分层往下取,得到所有层次的分类
//        ppr(XXcache::system('_catalog')); //这里是遍历出来未按照从属排序
//        ppr($this->_catalog); //这里重新按从属排序
        $this->_catalog = Catalog::get(0, XXcache::system('_catalog'));
        
        //系统配置
        $this->_conf = XXcache::system('_config');
        $this->_seoTitle = $this->_conf['seo_title'];
        $this->_seoKeywords = $this->_conf['seo_keywords'];
        $this->_seoDescription = $this->_conf['seo_description'];
        if ($this->_conf['site_status'] == 'close')
        {
            self::_closed();
        }  
        
        $this->_thisUrl = higu();
        if ($this->_conf['cache_page_status'] == 'open')
        {
            $value = Yii::app()->cache->get($this->_thisUrl);
            if ($value === false)
            {
                echo 'nocache';
            }else{
                echo 'cache';
                echo $value;
            }
        }
        
    }

    /**
     * 生成导航链接
     */
    protected function _navLink($catalog)
    {
        if ($catalog['redirect_url'])
        {
            return $catalog['redirect_url'];
        } else
        {
            return $this->createUrl('post/index', array('catalog' => $catalog['catalog_name_alias']));
        }
    }

    /**
     * 网站关闭的状态
     */
    protected function _closed()
    {
        $this->render('/error/close', array('message' => $this->_conf['site_status_intro']));
        exit;
    }
    
    
    
    protected function afterAction($action)
    {
        parent::afterAction($action);
//        echo 'after';
        if ($this->_conf['cache_page_status'] == 'open')
        {
            $cacheTime = $this->_conf['cache_page_time'];
            $cacheId = $this->_thisUrl;
            ob_start();
            $pageData = ob_get_contents();
            
            if (Yii::app()->cache->set($cacheId, $pageData, $cacheTime))
            {
                //记录
                echo '写入cache';
                CacheData::_addMycache('页面缓存', $cacheId, $cacheTime, $this->_thisUrl);
            }
        }
    }
}
