<?php
!defined('SITE_URL') && exit('Forbidden'); //在index.php定义
include_once 'db.php';

$info['db_user'] = $GLOBALS ['database'] ['db_user']; 
$info['db_pass'] = $GLOBALS ['database'] ['db_pass']; 
$info['db_name'] = $GLOBALS ['database'] ['db_name']; 
$info['db_charset'] = $GLOBALS ['database'] ['db_charset']; 
$info['table_prefix'] = $GLOBALS ['database'] ['table_prefix']; 
$info['db_host'] = $GLOBALS ['database'] ['db_host']; 

//!defined('ADMINUSER') && define('ADMINUSER', $GLOBALS ['database'] ['manager']); //管理员账户
//!defined('ADMINPW') && define('ADMINPW', $GLOBALS ['database'] ['managerpw']); //管理员密码

unset($GLOBALS ['database']);

//建站讨论
!defined('QZ_URL') && define('QZ_URL', 'http://q.115.com/347/'); 

// 版本号
!defined('SYS_VERSION') && define('SYS_VERSION', '2.0'); 

// 更新时间
!defined('SYS_UPTIME') && define('SYS_UPTIME', '2014.08.08'); 

//公共JS img upd目录url
!defined('COMMON_JS_URL') && define('COMMON_JS_URL', SITE_URL . 'static/js/');
!defined('COMMON_IMG_URL') && define('COMMON_IMG_URL', SITE_URL . 'static/images/');

// 上传目录
!defined('DIR_UPLOADS') && define('DIR_UPLOADS', SITE_PATH.'static/uploads/'); 

// 上传目录url
!defined('DIR_UPLOADS_URL') && define('DIR_UPLOADS_URL', SITE_URL.'static/uploads/'); 

//后台static的url
!defined('STATIC_BACKEND_URL') && define('STATIC_BACKEND_URL', SITE_BACKEND_URL . 'static/');

return array(
    'basePath' => dirname(__FILE__) . DIRECTORY_SEPARATOR . '..',
    'name' => '114啦开源程序',
    'language' => 'zh_cn', //调用framework\messages\zh_cn\yii.php 文件翻译汉化
//    'theme' => 'default', //默认主题
    'defaultController' => 'default', //设置非module默认控制器类
    'timeZone' => 'Asia/Shanghai',
    'import' => array(
        'application.models.*',
        'application.components.*',
        'application.extensions.*',
    ),
    'modules' => array(
        'gii' => array(
            'class' => 'system.gii.GiiModule',
            'password' => '1230',
            // If removed, Gii defaults to localhost only. Edit carefully to taste.
            'ipFilters' => array('127.0.0.1', '::1'),
        ),
    ),
//    'preload' => array('log'), //日志记录
    'components' => array(
        'request' => array(
            'enableCsrfValidation' => true,
            'enableCookieValidation'=>true,
        ),
        'cache' => array(
            'class' => 'CFileCache',
        ),
        'db' => array(
            'connectionString' => 'mysql:host='.$info['db_host'].';dbname='.$info['db_name'],
            'emulatePrepare' => true,
            'enableParamLogging' => true, //在页面底部的sql中显示绑定的参数
            'enableProfiling' => true,
            'username' => $info['db_user'],
            'password' => $info['db_pass'],
            'charset' => $info['db_charset'],
            'tablePrefix' => $info['table_prefix'],
        ),
        'errorHandler' => array(
            'errorAction' => 'error/index',
        ),
        /*开启debug追踪
        'log' => array(
            'class' => 'CLogRouter',
            'routes' => array(
                array(
                    'class' => 'CFileLogRoute',
                    'levels' => 'error, warning',
                ),
                array(
                    'class' => 'CWebLogRoute',
                ),
            ),
        ), */
        'user'=>array(
            // enable cookie-based authentication
            'allowAutoLogin'=>true,
            'loginUrl' => array('site/login'),
        ),
        'urlManager' => array(
//            'urlFormat' => 'path',
//            'urlSuffix' => '.html',
//            'showScriptName' => FALSE, //false,//程序层隐藏index.php,还需要在伪静态设置 
            'rules' => array(
                // post/show&id=xx
                'post/<id:\d+>/*' => 'post/show',
                // post/show&id=xx
                'post/<id:\d+>_<title:\w+>/*' => 'post/show',
                'post/catalog/<catalog:[\w-_]+>/*' => 'post/index',
                'page/show/<name:\w+>/*' => 'page/show',
                'special/show/<name:[\w-_]+>/*' => 'special/show',
                '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
            ),
        ),
    ),
    // application-level parameters that can be accessed
    // using Yii::app()->params['paramName']
    'params' => array(
        // this is used in contact page
        'adminEmail' => 'wusong@ylmf.com',
    ),
);