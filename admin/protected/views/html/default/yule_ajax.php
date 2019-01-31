
<div class="btmc_con clearfix" >
    <a href="javascript:void(0)" target="_self" class="btmc_la"></a>
    <a href="javascript:void(0)" target="_self" class="btmc_ra"></a>

    <?php $cArr = $this->getChildCatalogId(82);
    $c = 1;
    foreach ($cArr as $i => $v):
        ?>

            <?php if (!empty($x[$i])): ?>
            <div class="con_item btmc_<?php echo $x[$i]['opt_1'] ?>" <?php if ($i <> 109): ?> style="display:none"<?php endif; ?>>
    <?php endif; ?>
                    <?php if ($i == 112): ?><!--最爱影视-->
                <div class="btmc_subTil">
                    <ul>
                        <?php $sArr = $this->getChildCatalogId(112);
                        $s = 1;
                        foreach ($sArr as $m => $sv):
                            ?>
                            <li <?php if ($s == 1): ?>class="current"<?php endif; ?>><?php echo $x[$m]['name'] ?></li>
            <?php $s++;
        endforeach; ?>
        <?php if (!empty($x[$i])): ?>
                            <li><a href="<?php echo $x[$i]['url'] ?>">更多&gt;&gt;</a></li>
                        <?php endif; ?>
                    </ul>
                </div>
                <div class="btmc_ssWrap">

                    <div class="btmc_ss">
                            <?php $sArr = $this->getChildCatalogId(112);
                            $t = 1;
                            foreach ($sArr as $m => $sv): if ($t > 10):break;
                                endif;
                                ?>
                            <ul <?php if ($t > 1): ?> style="display:none"<?php endif; ?>>
            <?php if (!empty($x[$m]['data'])): ?>
                <?php foreach ($x[$m]['data'] as $id => $item): ?>
                                        <?php if (empty($item['mix'])): ?>
                                            <li>
                                                <a href="<?php echo $item['link'] ?>">
                                                    <img src="<?php echo $item['image_link'] ?>" />
                                                    <span class="up_txt"><?php echo $item['opt_a']; ?></span>
                                                    <span class="btmc_txt1"><?php echo $item['title'] ?></span>
                                                    <span class="btmc_txt2"><?php echo $item['opt_b']; ?></span>
                                                </a>
                                            </li>
                    <?php else: ?>
                                <?php echo XUtils::b64decode($item['mix']); ?>
                            <?php endif; ?>
                <?php endforeach; ?>
            <?php endif; ?>
                            </ul>
                                <?php $t++;
                            endforeach; ?>
                    </div>  
                </div>  

    <?php else: ?>
                <div class="btmc_ssWrap" >
                    <div class="btmc_ss btmc_bg">
                        <ul>
                            <?php if (!empty($x[$i]['data'])): ?>
                                <?php $z = 1;
                                foreach ($x[$i]['data'] as $id => $item): if ($z > 10):break;
                                    endif; ?>
                                    <?php if (empty($item['mix'])): ?>
                                        <li style="display:block;">
                                            <a href="<?php echo $item['link'] ?>">
                                                <img src="<?php echo $item['image_link'] ?>" width="160px" height="90px"/>
                                                <span class="btmc_txt1"><?php echo $item['title'] ?></span>
                                            </a>
                                        </li>
                    <?php else: ?>
                    <?php echo XUtils::b64decode($item['mix']); ?>
                <?php endif; ?>
                <?php $z++;
            endforeach; ?>
        <?php endif; ?>
                        </ul>
                    </div>
                </div>
    <?php endif; ?>

        </div>
                    <?php $c++;
                endforeach; ?>

</div>

<div class="btmc_con2 clearfix">
    
    <?php $this->renderPartial('default/tools', array('x' => $x)); ?>

</div>