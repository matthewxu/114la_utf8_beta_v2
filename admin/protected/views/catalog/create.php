<?php $this->renderPartial('/_common/header');?>

<div class="wrap">
    <div class="container">
        <div id="main">
<?php $this->renderPartial('_form',array('model'=>$model,'id'=>0))?>
        </div>    
    </div><!--/ container-->
</div><!--/ wrap-->

<?php $this->renderPartial('/_common/footer');?>
