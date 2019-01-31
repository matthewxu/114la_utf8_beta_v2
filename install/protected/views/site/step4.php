<?php $this->renderPartial('header'); ?>

<div id="step">
    <div id="step2">
        第二步                   ----
    </div>
    <div id="importsql">

<textarea style="height:80px; width:630px; margin: 0 auto; overflow:hidden; overflow-y: scroll;">
<?php if ($check): ?>
数据库配置资料写入完成 √
创始人资料写入完成 √
<?php else: ?>
数据库配置资料和创始人资料写入有误 X
<?php endif; ?>
</textarea>
        
    </div>
    <br />
    <div class="handle">
        <form method="post" action='?r=site/install'>
            <input type="hidden" name="step" value="5">
            <?php if(!empty($manager)):?>
            <input type="hidden" name="mgr" value="<?php echo $manager[0]?>">
            <input type="hidden" name="psd" value="<?php echo $manager[1]?>">
            <input type="hidden" name="dbn" value="<?php echo $manager[2]?>">
            <input type="hidden" name="dbpr" value="<?php echo $manager[3]?>">
            <?php endif;?>
            <button type="button" onclick='history.go(-1)' class="button">上一步</button> 
            <button type="submit" class="button" <?php if(!$check): echo "disabled"; endif;?>>下一步</button>
        </form>
    </div>
</div>


<?php $this->renderPartial('footer'); ?>