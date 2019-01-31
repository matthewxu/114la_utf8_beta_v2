<?php $this->renderPartial('/_common/header'); ?>
<div class="wrap">
    <div class="container">
        <div id="main">
            <div class="con box-green">
                <div class="box-header">
                    <h4>添加新用户</h4>
                </div>
                <?php $this->renderPartial('_form', array('model' => $model,'group'=>$group, 'id' => 0)) ?>
            </div><!--/ con-->            
        </div>    
    </div><!--/ container-->
</div>
<?php $this->renderPartial('/_common/footer'); ?>
