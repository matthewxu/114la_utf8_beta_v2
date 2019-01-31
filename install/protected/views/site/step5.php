<?php $this->renderPartial('header'); ?>


      <div id="step">
      <div id="step3">
      第三步
      </div>
<?php if($error):?>

      <div class="box3">
      <div id="error">
      <div class="box4">
      <img src="images/icon_06.gif" alt="错误" /><br />
      <strong class="red"><?php echo $error_txt?></strong><br />
      <strong class="black">请根据提示做对应处理，然后重试。</strong>
      </div>
      </div>
      </div>
<?php else:?>

      <div id="importsql">
      <textarea style="height:200px; width:630px; margin: 0 auto; overflow:hidden; overflow-y: scroll;">
<?php if (!$check): ?>
数据库配置资料和创始人资料写入有误 X
<?php else: ?>
数据库配置资料写入完成 √
创始人资料写入完成 √
正在导入数据库 ……
<?php echo $installinfo?>
<?php endif; ?>
      </textarea>
      </div>
<?php endif;?>

      <div class="handle">
      <form method="post" action='?r=site/install'>
      <input type="hidden" name="step" value="6">
      <button type="button" class="button" onclick='history.go(-1)'>上一步</button> 
      <button type="submit" class="button" <?php if($error): echo 'disabled'; endif;?>>下一步</button>
      </form>
      </div>
      </div>
      <!--
EOT;

<?php $this->renderPartial('footer'); ?>