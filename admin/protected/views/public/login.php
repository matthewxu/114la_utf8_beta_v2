<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>114啦网址导航建站系统--登录</title>
        <style type="text/css">
            body,h1,form,ul,li,p { margin:0; padding:0;}
            li { list-style:none; line-height:30px; height:30px; margin-top:10px;}
            ul { padding:0 0 15px 30px;}
            body { font:12px/1.5 Tahoma, Geneva, sans-serif; background:#F3F6EA}
            #admin { width:342px; border:1px solid #9BB055; background:#D8E899; position:relative; margin: 150px auto 0;}
            h1 { height:66px; overflow:hidden; text-indent:-9999px; background:url(<?php echo STATIC_BACKEND_URL?>images/login_head.gif) no-repeat;}
            .int { border-style:solid; padding:3px 2px; border-width:1px 1px 1px 1px; background-color:#F7FFDE; border-color:#666 #E8F1C2 #E8F1C2 #666; width:160px; font-family:Tahoma, Geneva, sans-serif;}
            .int:focus { background:#fff;}
            .btn { width:98px; height:33px; margin:0 auto; display:block; position:relative; left:-15px; border:none; padding:0; overflow:hidden; text-indent:-9999px; background:url(<?php echo STATIC_BACKEND_URL?>images/lgoin_btn.gif); cursor:pointer;}
            label { float:left; height:30px; line-height:30px; width:60px; text-align:right; cursor:pointer; padding-right:5px;}
            #message { background:url(<?php echo STATIC_BACKEND_URL?>images/infor-ico.gif) no-repeat 10px center #FFF8CC; width:342px; border:1px solid #FFEB69; color:#7D5018; position:absolute; bottom:-50px; left:-1px; height:40px; line-height:40px;}
            p.error { padding: 0 10px; text-align:center;}
        </style>
        <script type="text/javascript">
            if (self != top) {
                top.location = self.location;
            }
        </script>
    </head>

    <body>
        <div id="admin">
            <h1>雨林木风后台管理系统</h1>
                <?php
                $form = $this->beginWidget('CActiveForm', array(
                    'id' => 'login-wrap',
                    'enableAjaxValidation' => true,
                ));
                ?>

                <ul>
                    <li>
                        <label for="login[name]">用户名：</label>
                        <?php echo $form->textField($model, 'username', array('class' => 'int')); ?><?php echo $form->error($model, 'username'); ?> 
                    </li>
                    <li><label for="login[password]">密　码：</label>
                        <?php echo $form->passwordField($model, 'password', array('class' => 'int')); ?><?php echo $form->error($model, 'password'); ?> 
                    </li>
                    <li><label for="login[securimage]">验证码：</label>            
<?php echo $form->textField($model, 'captcha', array('class' => 'int','style'=>"width:65px; margin-right:5px;")); ?>
                <?php $this->widget('CCaptcha', array('showRefreshButton' => true, 'clickableImage' => true, 'buttonType' => 'link', 'buttonLabel' => '换一张', 'imageOptions' => array('alt' => '点击换图', 'align' => 'absmiddle'))); ?>

<?php echo $form->error($model, 'captcha'); ?>
                    </li>
<li><input type="submit" value="提　交" class="btn" /></li>
                </ul>
                        <?php $this->endWidget(); ?>

        </div>

    </body>
</html>
