<div class="con box-green">

    <?php if (empty($id)): ?>
        <?php $form = $this->beginWidget('CActiveForm', array('action' => $this->createUrl('create'),'htmlOptions' => array('enctype' => 'multipart/form-data'))); ?>
    <?php else: ?> 
        <?php $form = $this->beginWidget('CActiveForm', array('action' => $this->createUrl('update',array('id'=>$model->id)),'htmlOptions' => array('enctype' => 'multipart/form-data'))); ?>
        <?php echo $form->hiddenField($model, 'id'); ?>
    <?php endif; ?>
    <div class="box-header">
        <h4>编辑分类</h4>
    </div>
    <div class="box-content">
        <table class="table-font">
            <tr>
                <th class="w120">分类名称：</th>
                <td>
                    <?php echo $form->textField($model, 'catalog_name', array('class' => 'textinput w80')); ?>
                </td>
            </tr>
            <tr>
                <th>上层分类：</th>
                <td>
                    <select name="Catalog[parent_id]" id="Catalog_parent_id">
                        <option value="0">==顶级分类==</option>
                        <?php foreach ($this->_catalogAll as $catalog): ?>
                            <option value="<?php echo $catalog['id'] ?>" <?php XUtils::selected($catalog['id'], $model->parent_id); ?>><?php echo $catalog['str_repeat'] ?><?php echo $catalog['catalog_name'] ?></option>
                        <?php endforeach; ?>
                    </select>
                </td>
            </tr>
            <tr>
                <th>显示数目：</th>
                <td>
                    <?php echo $form->textField($model, 'data_count', array('class' => 'textinput w80')); ?>
                    <?php echo $form->error($model,'data_count');?>
                </td>
            </tr>
            <?php if(isset($model->parent_id) && $model->parent_id =='2'):?>
            <tr>
                <th>内页生成目录名称 / 外链地址：</th>
                <td>
                    <?php echo $form->textArea($model, 'path'); ?> 
                    <?php echo $form->error($model,'path');?>
                    分类属于内页时使用,留空则目录名称默认为分类名拼音;
                </td>
            </tr>
            <tr>
            <th>内页logo：</th>
            <td>
                <label><input type="radio" name="imgtype" value="outer" <?php if(empty($model->image_link) || !(FALSE === strpos($model->image_link,'http://'))):?>checked<?php endif;?> /></label>
                外链 : <input name="Catalog[image_link]" type="text" id="attach" class='textinput w270' value='<?php if(!empty($model->image_link) && !(FALSE === strpos($model->image_link,'http://'))):?><?php echo $model->image_link?><?php endif;?>'/>
                &nbsp;或者<br />
                <label><input type="radio" name="imgtype" value="local"<?php if(!empty($model->image_link) && FALSE === strpos($model->image_link,'http://')):?>checked<?php endif;?>/></label>
                本地 : <input name="image_link" type="file" id="attach" />
                <?php if (!empty($model->image_link)): ?>
                <?php if(!empty($model->image_link) && FALSE === strpos($model->image_link,'http://')): $y = DIR_UPLOADS_URL; else: $y=null;  endif;?>
                    <a href="<?php echo $y . $model->image_link ?>" target="_blank">
                        <img src="<?php echo $y . $model->image_link ?>" width="50" align="absmiddle" />
                    </a>
                <?php endif ?>
                <span style="margin-left:10px;">保留原图片名,覆盖同名图片 <input name='oldpicname' value="1" type="checkbox" />
            </td>
            </tr>
            
            <tr>
                <th>SEO标题：</th>
                <td>
                    <?php echo $form->textField($model, 'seo_t',array('class'=>'textinput w80')); ?> 
                    <?php echo $form->error($model,'seo_t');?>
                    分类属于内页时使用,留空则默认为分类名;
                </td>
            </tr>
            <tr>
                <th>SEO关键字：</th>
                <td>
                    <?php echo $form->textField($model, 'seo_k',array('class'=>'textinput w80')); ?> 
                    <?php echo $form->error($model,'seo_k');?>
                    分类属于内页时使用,留空则默认为分类名;
                </td>
            </tr>
            <tr>
                <th>SEO描述：</th>
                <td>
                    <?php echo $form->textArea($model, 'seo_k'); ?> 
                    <?php echo $form->error($model,'seo_k');?>
                    分类属于内页时使用,留空则默认为分类名;
                </td>
            </tr>
            <?php endif;?>
            <tr>
                <th>跳转链接：</th>
                <td>
                    <?php echo $form->textArea($model, 'redirect_url'); ?> 
                    <?php echo $form->error($model,'redirect_url');?>
                    可留空; 用于本分类数据中'更多'链接或者分类链接;
                </td>
            </tr>
            <tr>
                <th>同步ID：</th>
                <td>
                    <?php echo $form->textField($model, 'tb_id',array('class'=>'textinput w80')); ?> 
                    <?php echo $form->error($model,'tb_id');?>
                    用于一键同步分类对应数据;
                </td>
            </tr>
            <tr>
                <th>属性1：</th>
                <td>
                    <?php echo $form->textField($model, 'opt_1',array('class'=>'textinput w80')); ?> 
                    <?php echo $form->error($model,'opt_1');?>
                    附加属性1;
                </td>
            </tr>
            <tr>
                <th>属性2：</th>
                <td>
                    <?php echo $form->textField($model, 'opt_2',array('class'=>'textinput w80')); ?> 
                    <?php echo $form->error($model,'opt_2');?>
                    附加属性2;
                </td>
            </tr>
            <tr>
                <th>显示状态：</th>
                <td>
                    <?php echo $form->dropDownList($model, 'status_is', array('Y' => '显示', 'N' => '隐藏')); ?>
                </td>
            </tr>
            <tr>
                <th  style="vertical-align:top;">分类介绍：</th>
                <td><?php echo $form->textArea($model, 'content'); ?></td>
            </tr>

        </table>
    </div>
    <div class="box-footer">
        <div class="box-footer-inner">
            <input type="submit" value="提交" /> 或 <input type="reset" value="重置" /> 或 <a href="<?php echo Yii::app()->request->urlReferrer?>">取消</a>
        </div>
    </div>
    <?php $this->endWidget(); ?>
</div><!--/ con-->