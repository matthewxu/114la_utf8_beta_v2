<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta   http-equiv= "Pragma"   content= "no-cache" />
        <meta   http-equiv= "Cache-Control"   content= "no-cache" />
        <meta   http-equiv= "Expires"   content= "0" /> 
        <title></title>
        <link href="<?php echo STATIC_BACKEND_URL ?>css/style.css" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="<?php echo COMMON_JS_URL ?>jquery-1.7.2.min.js"></script>
    </head>
    <body id="main_page">
        <div id="nav">
            <dl>
                <dt>当前位置：</dt>
                <?php $mbx = backendMenu($this->id, $this->action->id); ?>
                <dd class="link"><?php echo $mbx['c'] ?></dd><!--导航-->
                <dd class="link"><?php echo $mbx['a'] ?></dd><!--导航-->
            </dl>
        </div>



