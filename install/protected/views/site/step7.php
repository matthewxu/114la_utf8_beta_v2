<?php $this->renderPartial('header'); ?>

<div id="step">
      <div id="step4">
      第四步
      </div>
      <div class="box3">
      <div id="error">
      <div class="box4">
          <?php if(empty($t)):?>
      <img src="images/icon_06.gif" alt="错误" /><br />
      <strong class="red">自动删除安装目录失败！</strong><br />
          <?php else:?>
      <img src="images/icon_04.gif" alt="成功" /><br />
      <strong class="red">修改成功! 请牢记修改后的账号密码</strong><br />
          <?php endif;?>
      <strong class="black">为安全起见，请手动删除网站目录下的 install/ 目录！</strong>
      </div>
      </div>
      </div>

      <div style="text-align:center">
          <strong><a href="../<?php if(empty($adir)):echo 'admin';else: echo $adir; endif;?>/index.php">进入管理员登陆后台</a></strong></div>

      </div>

<?php $this->renderPartial('footer'); ?>