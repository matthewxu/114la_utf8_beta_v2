<?php $this->renderPartial('/_common/header'); ?>
<div class="wrap">
    <div class="container">
        <div id="main">
            <div class="con">
                <?php $form = $this->beginWidget('CActiveForm'); ?>
                <div class="table">
                    <div class="th">
                        <div class="form">
                        </div>
                    </div>
                    <style type="text/css">
                        table.admin-tb tr:hover { background-color:#FFFFCC;}
                    </style>
                    <table id="site_multi_add" class="admin-tb">
                        <tr>
                            <th width="45" align="center">行 号</th>
                            <th>链接名</th>
                            <th>链   接</th>
                            <th>排   序</th>
                        </tr>
                        <tr><td>1</td>
                            <td><input name='Links[1][name]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[1][url]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[1][sort]' type="text" class="textinput" style="width:30%" value="1"/></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><input name='Links[2][name]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[2][url]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[2][sort]' type="text" class="textinput" style="width:30%"  value="2"/></td>
                        </tr>
                        <tr><td>3</td>
                            <td><input name='Links[3][name]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[3][url]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[3][sort]' type="text" class="textinput" style="width:30%"  value="3"/></td>
                        </tr>
                        <tr><td>4</td>
                            <td><input name='Links[4][name]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[4][url]' type="text" class="textinput" style="width:90%" /></td>
                            <td><input name='Links[4][sort]' type="text" class="textinput" style="width:30%"  value="4"/></td>
                        </tr>

                    </table>
                    <div class="add" style="background:#F2F4F6; border:1px dashed #E3E6EB; padding:5px; margin:3px 0; float: left;" >
                        <a href="javascript:void(0)" id="addrow"><img src="static/images/add.gif" alt="添加一行" /> 添加一行</a>&nbsp;&nbsp;&nbsp;
                        <script type="text/javascript">
                            $("#addrow").bind("click", function() {

                                var i = $("#site_multi_add").find("tr").length;
                                var html = "<tr><td>" + i + "</td>"
                                        + '<td><input name="Links[' + i + '][name]" type="text" class="textinput" style="width:90%" /></td>'
                                        + '<td><input name="Links[' + i + '][url]" type="text" class="textinput" style="width:90%" /></td>'
                                        + '<td><input name="Links[' + i + '][sort]" type="text" class="textinput" style="width:30%" value="'+i+'"/></td>'
                                        + '</tr>';
                                $("#site_multi_add").append(html);

                            })
                        </script>
                    </div>

                    <div class="clearfix">
                        <div id="classSearch" class="fl ml5" style="_margin-top:-6px;">
                            类别：
                            <select id="alltopic" name='catalog_id'>
                                <option value='0' <?php if (empty($catalogId) || $catalogId == 0): ?>selected<?php endif; ?>>==所有分类==</option>
                                <?php foreach ($this->_catalog as $info): ?>
                                    <option <?php if (!empty($catalogId) && $catalogId == $info['id']): ?>selected<?php endif; ?> <?php if (empty($info['last'])): ?>disabled<?php endif; ?> value='<?php echo $info['id'] ?>' <?php if (!empty($catalogId) && $info['id'] == $catalogId): ?>selected="selected"<?php endif; ?>><?php echo str_replace('&nbsp;&nbsp;', '-', $info['str_repeat']) . ' ' . $info['catalog_name'] ?></option>
                                <?php endforeach; ?>
                            </select>&nbsp;
                            <?php echo $form->error($model, 'catalog_id'); ?>
                        </div>
                        <div style="clear:both"><br /></div>
                    </div>
                    <div class="th">
                        <div class="form">
                            <div class="fl">
                                <input type="submit" value="确定" />
                            </div>
                        </div>
                    </div>
                    <?php $this->endWidget(); ?>
                </div><!--/ con-->
            </div>    
        </div><!--/ container-->

    </div><!--/ wrap-->
    <?php $this->renderPartial('/_common/footer'); ?>
