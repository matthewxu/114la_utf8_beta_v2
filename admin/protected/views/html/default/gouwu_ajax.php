<div class="ecCon clearfix">
<?php $cArr = $this->getChildCatalogId(107); ?>
	<div class="ecCenter">
		<div class="ecTilRow">
			<ul> 
                <?php $mm=1;foreach ($cArr as $i =>$v): if($mm>6):break;endif;?>
                        <li<?php if ($mm == 1): ?> class="active"<?php endif; ?>>
                            <a href="javascript:void(0);" target="_self" ><?php echo $x[$i]['name'] ?></a>
                        </li>
                <?php $mm++; endforeach;?>
			</ul>
		</div> 
		<div class="ecImgList">
                    <?php $mm=1;foreach ($cArr as $i =>$v): if($mm>6):break;endif;?>
                        <ul <?php if ($mm>1): ?>  style="display:none;"<?php endif; ?>>
                            <?php if (!empty($x[$i]['data'])): ?>
                                <?php $z=1;foreach ($x[$i]['data'] as $id => $item): if($z>=5): break;endif;?>
                                    <li>
                                        <a href="<?php echo $item['link'] ?>">
                                            <img src="<?php echo $item['image_link'] ?>" alt="<?php echo $item['title'] ?>" />
                                            <span class="ecImgDes"><?php echo $item['title'] ?></span>
                                        </a>
                                    </li>
                                <?php $z++;endforeach; ?>
                            <?php endif; ?>
                        </ul>
                    <?php $mm++; endforeach; ?>
		</div>
	</div>
	
	<div class="ecRight">
        <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==7):?>
		<ul class="ecRightImgList">
                <?php if (!empty($x[$i]['data'])): ?>
                    <?php foreach ($x[$i]['data'] as $id => $item): ?>
                        <?php if (empty($item['mix'])): ?>
                            <li>
                                <a href="<?php echo $item['link'] ?>"><img src="<?php echo $item['image_link'] ?>" /></a>
                            </li>
                        <?php else: ?>
                            <?php echo XUtils::b64decode($item['mix']); ?>
                        <?php endif; ?>
                    <?php endforeach; ?>
                <?php endif; ?>
		</ul>
<?php endif; $mm++; endforeach;?>
        
        <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==8):?>
		<ul class="ecRightTxtList">
                <?php if (!empty($x[$i]['data'])): ?>
                    <?php $m=1;foreach ($x[$i]['data'] as $id => $item): ?>
                        <?php if ($m<=8): ?>
                        <?php if (empty($item['mix'])): ?>
                            <li>
                                <a href="<?php echo $item['link'] ?>"><?php echo $item['title'] ?></a>
                            </li>
                        <?php else: ?>
                            <?php echo XUtils::b64decode($item['mix']); ?>
                        <?php endif; ?>
                        <?php endif; ?>
                    <?php $m++;endforeach; ?>
                <?php endif; ?>
                <li><a href="<?php echo $x[$i]['url'] ?>">更多&gt;&gt;</a>
		</ul>
        <?php endif; $mm++; endforeach;?>
	</div>

</div> 

<div class="tabCon" style="display:none;" id="ecFrameWrap">
	<iframe id="ecIframe" style="width:980px;margin:0px auto 0px;display:block;padding-top:10px;" org="http://www.taobao.com/go/act/taoke/114.php?spm=0.0.0.0.3XTRwI&pid=mm_0_0_0" frameborder="0" scrolling="no" id="" onload="" height="328px"></iframe>
</div>