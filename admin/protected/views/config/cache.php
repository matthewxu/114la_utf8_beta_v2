<?php $this->renderPartial('/_common/header'); ?>
<div class="wrap">
    <div class="container">
        
        <div id="main">
            
            <div class="con box-green">
                <div class="box-header">
                    <?php echo $notice;?>
                </div>
                <?php $form = $this->beginWidget('CActiveForm'); ?>
                <div class="box-content">
                    <table class="table-font">
                        <?php if($dataList):foreach ($dataList as $k=>$v):?>
                        <tr>
                            <th><?php echo $v;?></th>
                            <td>
                                <label><input type="radio" name="cacheType" <?php if($k=='dataCache'):?>checked<?php endif;?> value="<?php echo $k?>" /></label>
                            </td>
                        </tr>
                        <?php endforeach;endif;?>
                        
                    </table>
                </div>
                
                <div class="box-footer">
                    <div class="box-footer-inner">
                    	<input type="submit" value="提交" />
                    </div>
                </div>
                <?php $this->endWidget(); ?>
            </div><!--/ con-->
            
            
            
        </div>    
    </div><!--/ container-->

</div><!--/ wrap-->
<?php $this->renderPartial('/_common/footer'); ?>

