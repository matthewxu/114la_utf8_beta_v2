<?php $this->renderPartial('/_common/header'); ?>
<div class="wrap">
    <div class="container">
        <div id="main">
            <div class="con box-green">
                <div class="box-header">
                    <h4>编辑链接</h4>
                </div>
<?php $this->renderPartial('_links_form',array('model'=>$model,'id'=>$id,'catalogId'=>$catalogId));?>
            </div><!--/ con-->
            
        </div>    
    </div><!--/ container-->

</div><!--/ wrap-->
<?php $this->renderPartial('/_common/footer');?>
