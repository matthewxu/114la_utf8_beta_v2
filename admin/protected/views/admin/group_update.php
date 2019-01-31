<?php $this->renderPartial('/_common/header'); ?>
<div class="wrap">
    <div class="container">
        <div id="main">
            <div class="con box-green">
<?php $this->renderPartial('_group_form',array('model' => $model, 'acl' => $acl)); ?>
                
            </div><!--/ con-->
        </div>    
    </div><!--/ container-->
</div>           


<?php $this->renderPartial('/_common/footer'); ?>
