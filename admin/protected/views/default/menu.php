<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="<?php echo STATIC_BACKEND_URL?>css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo COMMON_JS_URL?>jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="<?php echo STATIC_BACKEND_URL?>js/sidebar.js"></script>
</head>
<body id="sidebar_page">
<div class="wrap">
    <div class="cotainer">
        <div id="sidebar">
        <div class="home">
            <a href="<?php echo SITE_URL?>" target="_blank">网站首页</a> - <a href="<?php echo QZ_URL?>" target="_blank">讨论圈子</a>
        </div>
        <div class="con">
        <!--公用-->
        <p class="userpanel">       
            用户名：<?php if(!XUtils::isUtf8($this->_backendUserName)): echo $this->_backendUserName; else: echo $this->_backendUserName;endif;?><br />
        用户组：<?php if(!XUtils::isUtf8($this->_backendGroupName)): echo $this->_backendGroupName;else: if($this->_backendUserId == 1):echo '超级管理组';else: echo $this->_backendGroupName;endif; endif;?><br />
        <a href="<?php echo $this->createUrl('default/welcome')?>" target="main">后台首页</a>&nbsp;|&nbsp;
        <a href="<?php echo $this->createUrl('public/logout')?>" target="_parent">退出系统</a>
        </p>
        <?php foreach ($menu as $n => $arr):?>
        <div class='item'>
            <h2><?php echo $n;?></h2>
            <ul>
                <?php $i=1; foreach ($arr['action'] as $k => $info):?>
                <?php if($this->_backendPermission == 'backendstrator' || (!empty($info['acl']) && !(FALSE === strpos($this->_backendAcl, $info['acl'])))):?>
                <li>
                    <a <?php if($i==1):?>id='firstMenu'<?php endif;?> href='<?php echo $this->createUrl($info['url']);?>' target='main' >
                        <?php echo $info['name'];?>
                    </a>
                </li>
                <?php endif;?>
                <?php $i++; endforeach; unset($i);?>
            </ul>
        </div>
        <?php endforeach;?>
        </div><!--/ .con-->
        </div><!--/ sidebar-->
    </div>
</div>
    
    <?php if(count($arr['action'])==1):?>
<script>
$(function(){
    $("a#firstMenu").attr('class','active');
    parent.main.location.replace($("a#firstMenu").attr('href'));
});
</script>
<?php endif;?>
    
</body>
</html>
