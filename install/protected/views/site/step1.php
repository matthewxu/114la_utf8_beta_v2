<?php $this->renderPartial('header'); ?>

<div class="box2">
    <div class="box2-top">
        <h2>请选择适合您的安装方式</h2>
    </div>
    <div class="box2-con">
        <div class="agreement" style="overflow:hidden;">
            <ul id="update" >
                <li class="install"><a href="<?php echo $this->createUrl('site/install',array('step'=>2));?>">全新安装</a></li>
            </ul>
        </div>
    </div>
    <div class="box2-fot">

    </div><!--/ box2-->
</div>


<?php if(PHP_VERSION < '5.1.0'):?>

<?php else:?>

<?php endif;?>

<?php $this->renderPartial('footer'); ?>