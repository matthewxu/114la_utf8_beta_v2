<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>114啦网址导航建站系统-Install</title>
<link href="./css/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="wrap">
    <div class="container">
        <div id="install">
            <div class="top">
                <div class="version">
                    <dl>
                        <dt class="current">当前版本：</dt>
                        <dd>v<?php echo APP_VERSION?></dd>
                    </dl>
                </div>
            </div>
            <div class="con">
                <div class="box2">
                    <div class="box2-top">
                        <h2>欢迎使用114啦网址导航建站系统 V<?php echo APP_VERSION?> </h2>
                    </div>
                    <div class="box2-con">
                        <div class="agreement" style="overflow:hidden;">
                           	<ul id="link">
                            <li><a  href="<?php echo $this->createUrl('install')?>">安装程序</a><span><img src="images/1.gif" /></span></li>
                            <li><a  href="<?php echo $this->createUrl('resetpw')?>">重置管理员密码</a><span><img src="images/1.gif" /></span></li>
                            <li><a target="_blank" href="http://q.115.com/347/">建站交流</a><span><img src="images/3.gif" /></span></li>
                            </ul>
                        </div>
                    </div>
                    <div class="box2-fot">

                    </div>
                </div>
                <div class="copyright">Copyright &copy; 2005-2014 114啦网址导航(114la.com). All Rights Reserved. </div>
            </div>
            <div class="fot"></div>
        </div>
        <!--/ install-->
    </div>
    <!--/ container-->
</div>
<!--/ wrap-->
</body>
</html>
