<?php $this->renderPartial('/_common/header'); ?>
<div class="wrap">
    <div class="container">
        <div id="main">
            <div class="con">
                
                    <div class="table">
                        <div class="th">
                            <div class="form fl">
                                <input type="button" value="添加分类" onclick="window.location = '<?php echo $this->createUrl('catalog/create') ?>'"/>&nbsp;
                                <label for="alltopic">按分类查看</label>&nbsp;
                                <select id="alltopic" onchange="window.location = '?r=catalog/index&fid='+this.value+''">
                                    <option value='0' >所有分类</option>
                                    <?php foreach ($rootCatalog as $id => $name):?>
                                    <option value='<?php echo $id?>' <?php if ($id==$fid):?>selected="selected"<?php endif;?>><?php echo $name?></option>
                                    <?php endforeach;?>
                                </select>&nbsp;
                                <?php if($fid>0):?>
                                <input type="button" value="上级分类" onclick="window.location = '<?php echo $this->createUrl('catalog/index',array('fid'=>$this->_getParentCatalogId($fid))) ?>'"/>&nbsp;
                                <?php endif;?>
                            </div>
                        </div>
                        <table class="admin-tb cataTab" id="js_data_source">
                            <tr>
                                <th width="8%"> ID</th>
                                <th width="8%"> 启用</th>
                                <th width="40%">名称</th>
                                <th width="10%">查看内容/有效数</th>
                                <th width="8%">同步ID</th>
                                <th width="15%">录入时间</th>
                                <th>删除</th>
                            </tr>
                            <?php foreach ((array) $dataList as $row): ?>
                                <tr class="mtr" rel="<?php echo 'p'.$row['parent_id'];?>" rel2="<?php echo 'p'.$row['id'];?>">
                                    <td width="30"><?php echo $row['id'] ?></td>
                                    <td width="40"><?php if ($row['status_is'] == 'N'): ?>
                                        <span class="icon_false"></span>
                                        <?php else: ?>
                                            <span class="icon_true"></span>
                                        <?php endif; ?></td>
                                    <td >
                                        <?php echo $row['str_repeat'] ?>
                                            <?php if ($row['parent_id']>0):?>
                                        <span class="icon_sub"></span>
                                            <?php endif;?>
                                            <?php if(empty($row['last'])):?>
                                        <span rel="<?php echo 'p'.$row['id']?>" class="open_btn icon_open"></span>
                                            <?php endif;?>
                                        <a title='进入同级分类' href="<?php echo $this->createUrl('index', array('fid' => $row['parent_id'])) ?>"><?php echo $row['catalog_name'] ?></a>
                                        &nbsp;&nbsp;
                                        <a class="overlay" href='<?php echo $this->createUrl('update',array('id'=>$row['id'])) ?>'><span class="icon_edit"></span></a> 
                                        &nbsp;&nbsp;
                                        <a href="<?php echo $this->createUrl('create', array('fid' => $row['id'])) ?>"><span class="icon_add"></span></a>
                                        <?php if(!empty($row['last'])):?>&nbsp;
                                        <a class="overlay" href='<?php echo $this->createUrl('links/create',array('catalogId'=>$row['id'])) ?>'>单一</a>&nbsp;|&nbsp;
                                        <a class="overlay" href='<?php echo $this->createUrl('links/createBatch',array('catalogId'=>$row['id'])) ?>'>批量</a>&nbsp;|&nbsp;
                                        <a class="overlay" href='<?php echo $this->createUrl('links/createImport',array('catalogId'=>$row['id'])) ?>'>导入</a>
                                        <?php endif;?>
                                        
                                    </td>
                                    <td width="100">
                                        <a class="overlay" title="查看包含链接" href="<?php echo $this->createUrl('links/index', array('catalogId' => $row['id'])) ?>"><span class="icon_show"></span></a>&nbsp;
                                        <?php if (!empty($row['last'])&& isset($row['num'])):?>  &nbsp;<span id="<?php echo $row['id']?>"><?php echo $row['num'];?></span> <?php endif; ?> &nbsp;
                                        <?php if($row['parent_id'] == 2 && FALSE === strpos($row['path'], 'http:')):?>
                                        <a href="<?php echo SITE_URL . substr($this->_conf['path_inside_page'], 1) . '/' .$row['path']?>" target="_blank"><?php echo $row['path']?></a>
                                        <?php elseif($row['parent_id'] == 2 && FALSE !== strpos($row['path'], 'http:')):;?>
                                        <a href="<?php echo $row['path']?>" target="_blank">外链</a>
                                        <?php endif;?>
                                    </td>
                                    <td>
                                        <?php if($row['tb_id']>0):?>
                                        <input type="button" class="tb" name='<?php echo $row['id']?>' id="<?php echo $row['tb_id']?>" value="同步" />
                                        <?php echo $row['tb_id']?>
                                        <?php endif;?>
                                    </td>
                                    <td width="110"><?php echo date('Y-m-d H:i', $row['create_time']) ?></td>
                                    <td width="30"><?php if(!empty($row['last'])):?><a rel="是否确认删除分类 : <?php echo $row['catalog_name']?> ,及该分类所有链接" href="<?php echo $this->createUrl('delete', array('catalogId' => $row['id'])) ?>" class="confirmSubmit re"><span class="icon_del"></span></a><?php endif;?></td>
                                </tr>
                            <?php endforeach; ?>
                        </table>

                        <div class="th">
                        </div>
                    </div>
            </div><!--/ con-->
        </div>    
    </div><!--/ container-->
</div><!--/ wrap-->              
<script >
jQuery(function(){
    // $('tr.mtr[rel == p<?php echo $fid?>]').show();
    // // $('span.open_btn:visible').live('click',function(){
    // //     $(this).addClass("icon_close").addClass("close_btn").removeClass("icon_open").removeClass("open_btn");
    // //     var p = $(this).attr('rel');
    // //     $("tr.mtr[rel = "+p+"]").show();
    // // });

    $(".cataTab tr").each(function(){
        if($(this).attr("rel")=='p<?php echo $fid?>'){
            $(this).show();
        }
    })

    //展开
    var _tabTr = $("#js_data_source tr");
    $(".open_btn").live("click",function(){
        var rel2 = $(this).parents("tr").attr("rel2");
        
         $(this).removeClass("icon_open").removeClass("open_btn").addClass("icon_close").addClass("close_btn");
        _tabTr.each(function(){
            if($(this).attr("rel")==rel2){
                $(this).show();
               
            }
        })
    })

    //收缩
    $(".close_btn").live("click",function(){
         $(this).removeClass("icon_close").removeClass("close_btn").addClass("icon_open").addClass("open_btn");
          var rel = $(this).parents("tr").attr("rel"); 
          var rel2 = $(this).parents("tr").attr("rel2"); 
          closeTr(rel,rel2);
    })

   function closeTr(rel,rel2){
       
        _tabTr.each(function(){
            var rtA = $(this).attr("rel");
            var rtB = $(this).attr("rel2");
            if(rtA==rel2){
                $(this).hide();
                $(this).find(".icon_close").removeClass("icon_close").removeClass("close_btn").addClass("icon_open").addClass("open_btn");
                closeTr(rtA,rtB);
            }else{
                return;
            }
                
        })
   }

    
    
    $(':input.tb').live('click',function(){
        var tid = $(this).attr('id');
        var cid = $(this).attr('name');
        $.get(
        'index.php',
        {
            r:'links/tb',
            tid:tid,
            cid:cid
        },
        function(r){
            if(r == 'error')
            {
                $("span#"+cid).append('error');
            }else{
                  $("span#"+cid).text(r);
            }
        });

    });
});
</script>
<?php $this->renderPartial('/_common/footer'); ?>
