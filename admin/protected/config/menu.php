<?php

!defined('SITE_URL') && exit('Forbidden'); //在index.php定义
//后台的menu

function backendMenu($c = null, $a = null)
{
    $re = array(
        '全局设置' => array(
            'controller' => 'config',
            'acl' => 'config',
            'action' => array(
                array(
                    'name' => '网站信息',
                    'url' => 'default/welcome',
                    'acl' => 'default_welcome',
                    'list_acl' => array()
                ),
                array(
                    'name' => '同步数据',
                    'url' => 'links/tbAll',
                    'acl' => 'links_tball',
                    'list_acl' => array()
                ),
                array(
                    'name' => '站点设置',
                    'url' => 'config/info',
                    'acl' => 'config_info',
                    'list_acl' => array()
                ),
                array(
                    'name' => '清空缓存',
                    'url' => 'config/cache',
                    'acl' => 'config_cache',
                    'list_acl' => array()
                ),
            )
        ),
        
        '数据分类' => array(
            'controller' => 'links',
            'acl' => 'links',
            'action' => array(
                array(
                    'name' => '类别管理',
                    'url' => 'catalog/index',
                    'acl' => 'catalog_index',
                    'list_acl' => array(
                        '录入' => 'catalog_create',
                        '编辑' => 'catalog_update',
                        '删除' => 'catalog_delete',
                        '排序' => 'catalog_sort_order',
                        '隐藏' => 'catalog_unverify',
                        '显示' => 'catalog_verify'
                    )
                ),
                array(
                    'name' => '数据列表',
                    'url' => 'links/index',
                    'acl' => 'links_index',
                    'list_acl' => array(
                        '录入' => 'links_create',
                        '编辑' => 'links_update',
                        '批量审核' => 'links_verify',
                        '批量推荐' => 'links_commend',
                        '删除' => 'links_delete'
                    )
                ),
                array(
                    'name' => '添加数据',
                    'url' => 'links/create',
                    'acl' => 'links_create',
                    'list_acl' => array()
                ),
                array(
                    'name' => '批量添加',
                    'url' => 'links/createBatch',
                    'acl' => 'links_createbatch',
                    'list_acl' => array()
                ),
                array(
                    'name' => '批量导入',
                    'url' => 'links/createImport',
                    'acl' => 'links_createimport',
                    'list_acl' => array()
                ),
            )
        ),

        '用户管理' => array(
            'controller' => 'admin',
            'url' => 'admin/index',
            'acl' => 'user',
            'action' => array(
                array(
                    'name' => '管理员列表',
                    'url' => 'admin/index',
                    'acl' => 'admin_index',
                    'list_acl' => array(
                        '录入' => 'admin_create',
                        '编辑' => 'admin_update',
                        '删除' => 'admin_delete'
                    )
                ),
                array(
                    'name' => '管理组列表',
                    'url' => 'admin/group',
                    'acl' => 'admin_group',
                    'list_acl' => array(
                        '录入' => 'admin_groupcreate',
                        '编辑' => 'admin_groupupdate',
                        '删除' => 'admin_group_delete'
                    )
                ),

                array(
                    'name' => '管理员日志',
                    'url' => 'admin/logger',
                    'acl' => 'admin_logger',
                    'list_acl' => array(
                        '删除' => 'admin_logger_delete'
                    )
                ),
            )
        ),
        '页面生成' => array(
            'controller' => 'html',
            'acl' => 'html',
            'action' => array(
                array(
                    'name' => '生成页面',
                    'url' => 'html/create',
                    'acl' => 'html_create',
                    'list_acl' => array(
                        '生成首页'=>'html_createIndex',
                        '生成内页'=>'html_createInner',
                    )
                ),
            )
        ),
        '114啦联盟' => array(
            'controller' => 'union',
            'acl' => 'union',
            'action' => array(
                array(
                    'name' => '114啦联盟',
                    'url' => 'union/index',
                    'acl' => 'union_index',
                    'list_acl' => array()
                ),
            )
        ),
    );

    //若输入controller和action,则输出面包屑
    if ($c && $a)
    {
        $temp = $tempfirst = null;
        $i = $ii = 1;
        foreach ($re as $key => $value)
        {
            foreach ($value['action'] as $k => $v)
            {
                if ($c . '/' . $a == $v['url'])
                {
                    $temp = array('c' => $key, 'a' => $v['name']);
                    break;
                }

                if ($i == 1 && $ii == 1)
                {
                    $tempfirst = array('c' => $key, 'a' => $v['name']);
                }
                $ii++;
            }
            $i++;
        }
        if (empty($temp))
        {
            $re = $tempfirst;
        } else
        {
            $re = $temp;
        }
        unset($temp, $tempfirst);
    }

    return $re;
}

/**
 * 这是简化的 Yii::app()
 */
function app()
{
    return Yii::app();
}

/**
 * 这是简化的 Yii::app()->clientScript
 */
function gcs()
{
// You could also call the client script instance via Yii::app()->clientScript
// But this is faster
    return Yii::app()->getClientScript();
}

/**
 * 这是简化的 Yii::app()->user.
 */
function user()
{
    return Yii::app()->getUser();
}

/**
 * 这是简化的 Yii::app()->createUrl()
 */
function url($route, $params = array(), $ampersand = '&')
{
    return Yii::app()->createUrl($route, $params, $ampersand);
}

/**
 * 这是简化的 CHtml::encode
 */
function h($text)
{
    return htmlspecialchars($text, ENT_QUOTES, Yii::app()->charset);
}

/**
 * 这是简化的 CHtml::link()
 */
function l($text, $url = '#', $htmlOptions = array())
{
    return CHtml::link($text, $url, $htmlOptions);
}

/**
 * 这是简化的 Yii::t() with default category = 'stay'
 */
function t($message, $category = 'stay', $params = array(), $source = null, $language = null)
{
    return Yii::t($category, $message, $params, $source, $language);
}

/**
 * 这是简化的 Yii::app()->request->baseUrl
 * If the parameter is given, it will be returned and prefixed with the app baseUrl.
 */
function bu($url = null)
{
    static $baseUrl;
    if ($baseUrl === null)
    {
        $baseUrl = Yii::app()->getRequest()->getBaseUrl();
    }
    return $url === null ? $baseUrl : $baseUrl . '/' . ltrim($url, '/');
}

/**
 * Returns the named application parameter.
 * 这是简化的 Yii::app()->params[$name].
 */
function param($name)
{
    return Yii::app()->params[$name];
}

/**
 * A useful one that I use in development is the following
 * which dumps the target with syntax highlighting on by default
 */
function dump($target)
{
    return CVarDumper::dump($target, 10, true);
}

function ebr($param, $stop = 0)
{
    echo '<hr>';
    echo $param;
    echo '<hr><br />';
    if ($stop)
    {
        exit();
    }
}

function ppr($param, $stop = 0)
{
    echo '<hr>';
    echo "<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\">";
    echo '<pre>';
    print_r($param);
    echo '</pre><hr>';
    if ($stop)
    {
        
        exit();
    }
}

/**
 * 返回一个a标签带链接
 * htmlentities 转换<>等符号, html_entity_decode可逆转
 * addslashes 将 ' "" 转义便于入库
 */
function aurl($text, $url, $blank = NULL)
{
    isset($blank) && $blank = "target='_blank'";
    return addslashes(htmlentities("<a href='{$url}' {$blank}>{$text}</a>"));
}

function req()
{
    return Yii::app()->request;
}

/*
 * 优先get,无则links
 */

function reqReq($param)
{
    return Yii::app()->request->getParam($param);
}

/*
 * get
 */

function reqGet($param,$defaultValue=null)
{
    return Yii::app()->request->getQuery($param,$defaultValue);
}

function reqGetNum($param,$defaultValue=0)
{
    return intval(Yii::app()->request->getQuery($param,$defaultValue));
}

/*
 * links
 */

function reqPost($param,$defaultValue=null)
{
    return Yii::app()->request->getPost($param,$defaultValue);
}

function reqPostNum($param,$defaultValue=null)
{
    return intval(Yii::app()->request->getPost($param,$defaultValue));
}

/*
 * 是否是links
 */

function isPost()
{
    return Yii::app()->request->getIsPostRequest();
}

/*
 * 当前页除域名外的URL
 * /newmood/index.php?r=backend/database/index
 */

function gu()
{
    return Yii::app()->request->getUrl();
}

/*
 * 当前域名
 * http://localhost
 */

function hi()
{
    return Yii::app()->request->hostInfo;
}

function higu()
{
    return hi() . gu();
}

/*
 * 除域名外的首页地址
 * /newmood/index.php
 */

function ru()
{
    return Yii::app()->getUser()->returnUrl;
}

/*
 * 除域名外的根目录地址
 * /newmood/index.php
 */

function hu()
{
    return Yii::app()->homeUrl;
}

/*
 * 获取主机信息
 * http://localhost
 */

function getHostInfo()
{
    return Yii::app()->request->getHostInfo();
}

/*
 * 获取根目录
 * /newmood
 */

function getBaseUrl()
{
    return Yii::app()->request->getBaseUrl();
}

/*
 * 获取当前url
 * /newmood/index.php
 */

function getScriptUrl()
{
    return Yii::app()->request->getScriptUrl();
}

function getUrlRef()
{
    return Yii::app()->request->urlReferrer;
}

/*
 * 获取用户ip地址
 * 127.0.0.1
 */

function getTureIp()
{
    return Yii::app()->request->getUserHostAddress();
}

/*
 * 获取用户主机名称
 */

function getUserHost()
{
    return Yii::app()->request->getUserHost();
}

/*
 * cache GET
 */

function cacheGet($id)
{
    return Yii::app()->cache->get($id);
}

/*
 * cache SET
 */

function cacheSet($id, $value, $time = 3600)
{
    Yii::app()->cache->set($id, $value, $time);
}

/*
 * cache Clean
 */

function cacheDelete($id)
{
    Yii::app()->cache->delete($id);
}

/*
 * cache Flush
 */

function cacheFlush()
{
    Yii::app()->cache->flush();
}

function getUid()
{
    if (!empty(Yii::app()->user->id))
    {
        return Yii::app()->user->id;
    }

    return FALSE;
}

function getUname()
{
    if (!empty(Yii::app()->user->name))
    {
        return Yii::app()->user->name;
    }

    return FALSE;
}

function xEcho($param=null)
{
    if (empty($param))
    {
        if (isset($param))
        {
            echo 0;
        }  else
        {
            echo '';
        }
    }  else
    {
        echo $param;
    }
}

?>