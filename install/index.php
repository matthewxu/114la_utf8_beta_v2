<?php
error_reporting(E_ERROR);
//网站当前目录的url
$siteUrl = str_replace(array($_SERVER['DOCUMENT_ROOT'],'/index.php'), array('http://'.$_SERVER['HTTP_HOST'],'/'), $_SERVER['SCRIPT_FILENAME']);
defined('SITE_URL') or define('SITE_URL',$siteUrl);
define('YLMF_INSTALL', dirname(__FILE__).'/'); //www/kyii/install

// change the following paths if necessary
$yii=dirname(__FILE__).'/../core/yii.php';
$config=dirname(__FILE__).'/protected/config/main.php';
$pz=dirname(__FILE__).'/protected/config/pz.php';

// remove the following line when in production mode
defined('YII_DEBUG') or define('YII_DEBUG',true);

require_once($yii);
require_once($pz);
Yii::createWebApplication($config)->run();
