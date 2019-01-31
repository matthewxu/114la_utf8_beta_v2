<div class="gr-wg-left">
   <div class="grGameList">
    <?php $cArr = $this->getChildCatalogId(575); ?>
    <?php $mm=1; foreach ($cArr as $i =>$v): if($mm>1):break;endif;?>
    <ul>
    <?php if (!empty($x[$i]['data'])): ?>
    <?php $m = 1;foreach ($x[$i]['data'] as $id => $item): if($m>8):break;endif;?>
     <li>
         <a href="<?php echo $item['link']; ?>">
             <img src="<?php echo $item['image_link']; ?>" />
             <span class="btmc_txt1"><?php echo $item['title']; ?></span>
             <span class="btmc_txt2"><?php echo $item['opt_a']; ?></span>
         </a>
     </li>
    <?php $m++;endforeach; ?>
    <?php endif; ?>
    </ul>
       <?php $mm++; endforeach;?>
   </div>
  </div>
  <div class="gr-wg-right">
   <div class="gr-wg-gameRank">
    <div class="rankTil">
     <span class="rankTilTxt">页游排行榜</span>
     <a href="<?php echo $x[584]['url']?>" class="rankMore">更多&gt;&gt;</a>
    </div>
    <div class="grGameRank2 grGameRank">
        <?php $mm=1; foreach ($cArr as $i =>$v): if($mm==2):?>
     <ul>
    <?php if (!empty($x[$i]['data'])): ?>
    <?php $m = 1;foreach ($x[$i]['data'] as $id => $item): if($m>10):break;endif;?>
      <li><span class="grNub grNub<?php echo $m; ?>"><?php echo $m; ?></span>
          <a target="_blank" class="grRankLink" href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a>
          <span class="grPs"><?php echo $item['opt_a']; ?></span></li>
    <?php $m++;endforeach; ?>
    <?php endif; ?>
     </ul>
        <?php endif; $mm++; endforeach;?>
    </div>
   </div>
  </div>