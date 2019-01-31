<div class="gr-sg-left">
   <div class="btmc_subTil">
    <ul>
        <!--前4个-->
<?php $cArr = $this->getChildCatalogId(576); $m=1;
     foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
     <li <?php if ($m == 1): ?>class="current"<?php endif; ?>><?php echo $x[$i]['name'] ?></li>
     <?php $m++;endforeach; ?>
     <li class="moreLi"><a href="<?php echo $x[576]['url'] ?>">更多&gt;&gt;</a></li>
    </ul>
   </div>
   <div class="smallGameList smallGameList2">
<?php $cArr = $this->getChildCatalogId(576); $m=1;
     foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
    <ul class="sgUl" <?php if($m>1):?> style="display:none"<?php endif;?>>
    <?php if(!empty($x[$i]['data'])):?>
    <?php $s=1;foreach ($x[$i]['data'] as $key => $item): if($s>18):break;endif; ?>
    <li class="sgLi">
        <a href="<?php echo $item['link']; ?>" target="_blank" class="sgItem">
            <i></i>
            <img src="<?php echo $item['image_link']; ?>">
            <span class="sgDes"><?php echo $item['title']; ?></span>
        </a>
    </li>
    <?php $s++;endforeach;?>
    <?php endif;?>
    </ul>
   <?php $m++;endforeach; ?>
   </div>
   <div class="sgLinks">
    <div class="sgWrap">
<?php $cArr = $this->getChildCatalogId(576); $m=1;
     foreach ($cArr as $i =>$v): if($m>4 && $m<11): ?>
        <?php if($m%2==1): ?>
     <div class="sgCol">
      <div class="listRow"> 
       <h3><a href="<?php echo $x[$i]['url'] ?>"><?php echo $x[$i]['name'] ?></a></h3>
       <span>|</span>
       <?php $s=1;foreach ($x[$i]['data'] as $key => $item): if($item['title'] == $x[$i]['name']):continue;endif; if($s>2):break;endif; ?>
       <a href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a>
    <?php $s++;endforeach;?>
      </div>
         <?php else:?>
      <div class="listRow"> 
       <h3><a href="<?php echo $x[$i]['url'] ?>"><?php echo $x[$i]['name'] ?></a></h3>
       <span>|</span>
       <?php $s=1;foreach ($x[$i]['data'] as $key => $item): if($item['title'] == $x[$i]['name']):continue;endif; if($s>2):break;endif; ?>
       <a href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a>
    <?php $s++;endforeach;?>
      </div>
     </div>
<?php endif; endif; $m++;endforeach; ?>
        
    </div>
   </div>
  </div>
  <div class="gr-sg-right">
   <div class="gr-wg-gameRank">
    <div class="rankTil">
     <span class="rankTilTxt">小游戏排行榜</span>
     <a href="<?php echo $x[595]['url']?>" class="rankMore">更多&gt;&gt;</a>
    </div>
    <div class="grGameRank2 grGameRank">
     <ul>
    <?php if (!empty($x[595]['data'])): ?>
    <?php $m = 1;foreach ($x[595]['data'] as $id => $item): if($m>10):break;endif;?>
      <li><span class="grNub grNub<?php echo $m; ?>"><?php echo $m; ?></span>
          <a target="_blank" class="grRankLink" href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a>
          <span class="grPs"><?php echo $item['opt_a']; ?></span></li>
    <?php $m++;endforeach; ?>
    <?php endif; ?>
     </ul>
    </div>
   </div>
  </div>