<?php $form = $this->beginWidget('CActiveForm'); ?>
    
    <div class="box-header">
        <h4>管理组名称 : 
            <input type="text" name="gname" value="<?php if (!empty($model)): echo $model->group_name; endif;?>"/>&nbsp;&nbsp;
            有效性 : 
            <input type="radio" name="sis" value="Y" <?php if (empty($model) || $model->status_is == 'Y'): ?>checked="checked" <?php endif; ?>/><img title='' src="<?php echo STATIC_BACKEND_URL ?>images/tick.gif" align="absmiddle" />&nbsp;&nbsp;
            <input type="radio" name="sis" value="N" <?php if (!empty($model) && $model->status_is == 'N'): ?>checked="checked"<?php endif; ?> /><img title='' src="<?php echo STATIC_BACKEND_URL ?>images/cross.gif" align="absmiddle" /> 
        </h4>
    </div>
    <style type="text/css" >
        .table-font td { width:100px;}
    </style>
    <div class="box-header">
        <h4>
            <table class="table-font" style="width:1000px; margin-left:5px;">
                <tr>
                    <?php foreach ($acl as $key => $value): ?>
                        <td>
                            <input name="auth[<?php echo $value['acl'] ?>]" <?php if (!empty($model) && !(FALSE === Admin::checkGroupAcl($model->acl, $value['acl']))): ?> checked <?php endif; ?> type="checkbox" id="checkbox_<?php echo $value['acl'] ?>" rel="<?php echo $value['acl'] ?>" onClick="checkSameRel(this);" /> 
                            <label for="checkbox_<?php echo $value['acl'] ?>"><?php echo $key; ?></label>
                        </td>
                    <?php endforeach; ?>
                </tr>
            </table>
        </h4>
    </div>

    <div class="box-content">
        <table class="table-font" style="width:1000px;" id="js_item_table">
            <tr>
                <?php foreach ($acl as $key => $value): ?>
                    <td>
                        <ul>
                            <?php foreach ($value['action'] as $k => $v): ?>
                                <li>
                                    <input onClick="checkSameAlt(this);"  rel="<?php echo $value['acl'] ?>" alt="<?php echo $v['acl'] ?>" name="auth[<?php echo $v['acl'] ?>]" type="checkbox"  value="1" <?php if (!empty($model) && !(FALSE === Admin::checkGroupAcl($model->acl, $v['acl']))): ?> checked <?php endif; ?> />&nbsp;<?php echo $v['name'] ?>
                                    <?php if (!empty($v['list_acl'])): foreach ($v['list_acl'] as $sk => $sv): ?>
                                            <div>
                                                &nbsp;&nbsp;<img src="<?php echo STATIC_BACKEND_URL ?>images/class_icon.gif" align="absmiddle" />
                                                <input alt="<?php echo $v['acl'] ?>" rel="<?php echo $value['acl'] ?>" name="auth[<?php echo $sv ?>]" type="checkbox" value="1" <?php if (!empty($model) && !(FALSE === Admin::checkGroupAcl($model->acl, $sv))): ?> checked <?php endif; ?> />&nbsp;<?php echo $sk ?>
                                            </div>
                                        <?php endforeach;
                                    endif; ?>
                                </li>
    <?php endforeach; ?>
                        </ul>
                    </td>
<?php endforeach; ?>
            </tr>
        </table>
    </div>
    <div class="box-footer">
        <div class="box-footer-inner">
            <input type="submit" value="确定" /> 或 <input type="reset" value="恢复"/>
            <?php if (!empty($model)):?>
            <input name="gid" type="hidden" id="gid" value="<?php echo $model->id ?>">
            <?php endif;?>
        </div>
    </div>
<?php $this->endWidget();?>
<script type="text/javascript">
var checkSameRel = function(ele) {
    $("#js_item_table").find("input[rel='" + $(ele).attr("rel") + "']").each(function(i) {
        this.checked = ele.checked;
    });
}

var checkSameAlt = function(ela) {
    $("#js_item_table").find("input[alt='" + $(ela).attr("alt") + "']").each(function(i) {
        this.checked = ela.checked;
    });
}
</script>