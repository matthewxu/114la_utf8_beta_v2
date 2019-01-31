<?php $cArr = $this->getChildCatalogId(574); ?>
<div class="rowLeft">
   <div class="grImgListWrap">
<?php $mm=1;foreach ($cArr as $i =>$v): if($mm>1):break;endif;?>
    <div class="grImgList">
                <?php if (!empty($x[$i]['data'])): ?>
                <?php $m = 1;foreach ($x[$i]['data'] as $id => $item): ?>
                <?php if ($m <= 4): ?>
                <?php if (!empty($item['mix'])): ?>
                <?php echo XUtils::b64decode($item['mix']); ?>
                <?php else: ?>
                <div class="siteListItem <?php if ($m %2 == 0): ?> oddItem<?php endif; ?>">
                    <a href="<?php echo $item['link']; ?>" target="_blank">
                        <img width="100px" height="45px" src="<?php echo $item['image_link']; ?>" alt="<?php echo $item['title']; ?>">
                    </a>
                </div>
                <?php endif; ?>
                <?php endif; ?>
                <?php $m++;endforeach; ?>
                <?php endif; ?>
    </div>
<?php $mm++; endforeach;?>
   </div>
    
    
    <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==2):?>
   <div class="grTxtList grTxtList1">
    <ul>
                <?php if (!empty($x[$i]['data'])): ?>
                <?php $m = 1;foreach ($x[$i]['data'] as $id => $item): ?>
                <?php if ($m <= 4): ?>
                <?php if (!empty($item['mix'])): ?>
                <?php echo XUtils::b64decode($item['mix']); ?>
                <?php else: ?>
                <li><a target="_blank" href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a></li>
                <?php endif; ?>
                <?php endif; ?>
                <?php $m++;endforeach; ?>
                <?php endif; ?>   
    </ul>
   </div>
<?php endif; $mm++; endforeach;?>
    
    <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==3):?>

   <div class="grTxtList grTxtList2">
    <ul>
                <?php if (!empty($x[$i]['data'])): ?>
                <?php $m = 1;foreach ($x[$i]['data'] as $id => $item): ?>
                <?php if ($m <= 8): ?>
                <?php if (!empty($item['mix'])): ?>
                <?php echo XUtils::b64decode($item['mix']); ?>
                <?php else: ?>
                <li><a target="_blank" href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a></li>
                <?php endif; ?>
                <?php endif; ?>
                <?php $m++;endforeach; ?>
                <?php endif; ?>  
    </ul>
   </div>
    <?php endif; $mm++; endforeach;?>
    
  </div> 
  <div class="rowCenter">
   <a href="javascript:void(0);" class="grGameChange" onclick="window.grGameChange()"></a>
       <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==4):?>
   <div class="grGameList">
            <ul>
                <?php if (!empty($x[$i]['data'])): ?>
                <?php $c = count($x[$i]['data']);$m = 1;foreach ($x[$i]['data'] as $id => $item): ?>
                <?php if ($m >=1): ?>
                <?php if (!empty($item['mix'])): ?>
                <?php echo XUtils::b64decode($item['mix']); ?>
                <?php else: ?>
                <li>
                    <a href="<?php echo $item['link']; ?>" <?php if ($m %3==1): ?>_orighref="<?php echo $item['link']; ?>"  _tkworked="true"<?php endif; ?>>
                        <img <?php if ($m <=6): ?>src<?php else:?>org<?php endif; ?>="<?php echo $item['image_link']; ?>" width="160px" height="90px">
                            <span class="btmc_txt1"><?php echo $item['title']; ?></span>
                        <span class="btmc_txt2"><?php echo $item['opt_a']; ?></span>
                    </a>
                </li>
                
                <?php if ($m>1 && $m %6 == 0 && $m<$c): ?>
            </ul>
            <ul style="display:none">
                <?php endif; ?>
                
                <?php endif; ?>
                <?php endif; ?>
                <?php $m++;endforeach; ?>
                <?php endif; ?>

            </ul>
   </div>
   <?php endif; $mm++; endforeach;?>
  </div>
  <div class="rowRight">
      <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==5):?>
   <div class="grFlashGame">
    <ul>
                <?php if (!empty($x[$i]['data'])): ?>
                <?php $m = 1;foreach ($x[$i]['data'] as $id => $item): ?>
                <?php if ($m <= 6): ?>
                <?php if (!empty($item['mix'])): ?>
                <?php echo XUtils::b64decode($item['mix']); ?>
                <?php else: ?>
                <li class="sgLi">
                    <a href="<?php echo $item['link']; ?>" target="_blank" class="sgItem">
                        <i></i>
                        <img src="<?php echo $item['image_link']; ?>">
                        <span class="sgDes"><?php echo $item['title']; ?></span>
                    </a>
                </li>
                <?php endif; ?>
                <?php endif; ?>
                <?php $m++;endforeach; ?>
                <?php endif; ?>
    </ul>
   </div>
      <?php endif; $mm++; endforeach;?>
      <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==6):?>
   <div class="grGameRank">
                <ul>
                <?php if (!empty($x[$i]['data'])): ?>
                <?php $m = 1;foreach ($x[$i]['data'] as $id => $item): ?>
                <?php if ($m <= 8): ?>
                <?php if (!empty($item['mix'])): ?>
                <?php echo XUtils::b64decode($item['mix']); ?>
                <?php else: ?>
                <li><span class="game-nub grNub<?php echo $m;?>"><?php echo $m;?></span>
                    <a class="grRankLink" target="_blank" href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a></li>
                <?php endif; ?>
                <?php if ($m ==4): ?>
            </ul>
            <ul>
                <?php endif; ?>
                <?php endif; ?>
                <?php $m++;endforeach; ?>
                <?php endif; ?>
            </ul>
   </div>
      <?php endif; $mm++; endforeach;?>
  </div> 