<?php $this->renderPartial('/_common/header'); ?>
<div class="wrap">
    <div class="container">

        <div id="main">

            <div class="con ">
                <form action="" method="post">
                    <div class="table">
                        <div class="th">
                            <div class="form">
                                <a href="<?php echo $this->createUrl('groupCreate') ?>"><input type="button" value="添加新管理组" /></a></div>
                        </div>
                        <table class="admin-tb" id="tb1">
                            <tr>
                                <th width="5%">ID</th>
                                <th width="20%">用户组 </th>
                                <th width="15%">录入时间</th>
                                <th>操作</th>
                            </tr>
                            <?php foreach ($datalist as $row): ?>
                                        <tr>  <!-- <tr class="checked">默认选中 -->
                                    <td >
                                        <?php echo $row['id'] ?></td>
                                    <td ><?php echo $row['group_name'] ?></td>
                                    <td ><?php echo date('Y-m-d H:i', $row['create_time']) ?></td>
                                    <td >
                                        <?php if (!in_array($row['id'], array(1, 2))): ?>
                                            <a class="icon_edit" href="<?php echo $this->createUrl('groupUpdate', array('id' => $row['id'],'name'=>$row['group_name'])) ?>">编辑权限</a>&nbsp;&nbsp;
                                            <a class="icon_del" href="<?php echo $this->createUrl('groupDelete', array('id' => $row['id'])) ?>" class="confirmSubmit re" rel="删除管理组,其下所有管理账号将被禁用,是否确定?">删除</a>
                                        <?php else: ?>
                                            系统组
                                        <?php endif ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                            <tr class="foot-ctrl">
                            </tr>
                        </table>

                        <div class="th"><!--/ pages-->


                            <div class="form">
                                <input name="提交" type="submit" value="删 除" />
                            </div>
                        </div>
                    </div>
                </form>
            </div><!--/ con-->
        </div>    
    </div><!--/ container-->
</div><!--/ wrap-->              

<?php $this->renderPartial('/_common/footer'); ?>
