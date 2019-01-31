<dl class="col-row01" >
    <!--头条 上方图片-->
 <?php $cArr = $this->getChildCatalogId(94);?>
 <?php $m=1;foreach ($cArr as $i =>$v): if($m==4):?>
    <dt>
    <?php if (!empty($x[$i]['data'][0])): ?>
        <?php if (empty($x[$i]['data'][0]['mix'])): ?>
            <a href="<?php echo $x[$i]['data'][0]['link']; ?>" title="<?php echo $x[$i]['data'][0]['title']; ?>">
                <img src="<?php echo $x[$i]['data'][0]['image_link']; ?>" alt="<?php echo $x[$i]['data'][0]['title']; ?>" />
            </a>
        <?php else: ?>
            <?php echo XUtils::b64decode($x[$i]['data'][0]['mix']); ?>
        <?php endif; ?>
    <?php endif; ?>
    </dt>
<?php endif; $m++; endforeach;?>
 <!-- 头条区域-->
 <?php $m=1;foreach ($cArr as $i =>$v): if($m>3):break;endif;?>
        <?php if (!empty($x[$i])): ?>
            <dd>
                <a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> class="n" href="<?php echo $x[$i]['url']; ?>" ><?php echo $x[$i]['name']; ?></a> 
                <i class="vhr">|</i>
                <?php if (!empty($x[$i]['data'][0])): ?>
                    <a <?php if(!empty($x[$i]['data'][0]['title_color'])):?> style="color:#<?php echo $x[$i]['data'][0]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['data'][0]['link']; ?>" ><?php echo $x[$i]['data'][0]['title']; ?></a>
                <?php endif; ?>
            </dd>
        <?php endif; ?>
<?php $m++; endforeach;?>
</dl>

    <ul class="col-row02 cf">
        <?php $cArr = $this->getChildCatalogId(166);?>
         <!--分类 虚线上方-->
         <?php $m=1;foreach ($cArr as $i =>$v): if($m>8):break;endif;?>
            <?php if (!empty($x[$i])): ?>
                <li class="<?php echo $x[$i]['opt_1'] ?>"><span>&#<?php echo $x[$i]['opt_2'] ?>;</span>
                    <?php if (!empty($x[$i]['data'][0])): ?>
                        <a   <?php if(!empty($x[$i]['data'][0]['title_color'])):?> style="color:#<?php echo $x[$i]['data'][0]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['data'][0]['link'] ?>"><?php echo $x[$i]['data'][0]['title'] ?></a> 
                    <?php endif; ?>
                    <?php if (!empty($x[$i]['data'][1])): ?>
                        <i class="vhd">·</i> 
                        <a   <?php if(!empty($x[$i]['data'][1]['title_color'])):?> style="color:#<?php echo $x[$i]['data'][1]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['data'][1]['link'] ?>"><?php echo $x[$i]['data'][1]['title'] ?></a>
                    <?php endif; ?>
                </li>
            <?php endif; ?>
        <?php endforeach; ?>

        <li class="line"></li>
<!--分类 虚线下方-->
<?php $cArr = $this->getChildCatalogId(167);?>
<?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
            <?php if (!empty($x[$i])): ?>
                <li class="<?php echo $x[$i]['opt_1'] ?>"><span>&#<?php echo $x[$i]['opt_2'] ?>;</span>
                    <?php if (!empty($x[$i]['data'][0])): ?>
                        <a   <?php if(!empty($x[$i]['data'][0]['title_color'])):?> style="color:#<?php echo $x[$i]['data'][0]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['data'][0]['link'] ?>"><?php echo $x[$i]['data'][0]['title'] ?></a> 
                    <?php endif; ?>
                    <?php if (!empty($x[$i]['data'][1])): ?>
                        <i class="vhd">·</i> 
                        <a <?php if(!empty($x[$i]['data'][1]['title_color'])):?> style="color:#<?php echo $x[$i]['data'][1]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['data'][1]['link'] ?>"><?php echo $x[$i]['data'][1]['title'] ?></a>
                    <?php endif; ?>
                </li>
            <?php endif; ?>
        <?php endforeach; ?>
    </ul>

    <div class="comBox btop">

        <!-- 新闻区域  96  -->
        <ul class="colTitle" id="aside-col01-tab"> 
            <?php $cArr = $this->getChildCatalogId(96);?>
<?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
            <?php if (!empty($x[$i])): ?><li rel="<?php echo $x[$i]['opt_1'] ?>" <?php if($m==1):?>class="active"<?php endif;?>><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url'] ?>"><?php echo $x[$i]['name'] ?></a></li><?php endif; ?>
<?php $m++; endforeach; ?>
        </ul>

        <div class="boxCase" id="aside-col01-cont">
            <?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
            <?php if (!empty($x[$i])): ?>
                <div class="comWrap" id="<?php echo $x[$i]['opt_1'] ?>" style="display:<?php if($m==1): echo 'block'; else: echo 'none'; endif;?>;">
                    <?php $cArrSub = $this->getChildCatalogId($i);?>
                    <?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==1):?>
                    <ul class="mslide">
                        <?php if (!empty($x[$is]['data'])): ?>
                            <?php $mss = 1;
                            foreach ($x[$is]['data'] as $id => $item): ?>
            <?php if (empty($item['mix'])): ?>
                                    <li <?php if($mss==1):?>style="display:block;"<?php endif;?>>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> <?php if ($m % 2 == 0):?>class="rgt"<?php endif;?> href="<?php echo $item['link']; ?>" title="<?php echo $item['title']; ?>">
                                            <img src="<?php echo $item['image_link']; ?>" alt="<?php echo $item['title']; ?>" />
                                            <cite><?php echo $item['title']; ?></cite>
                                        </a>
                                    </li>
                                <?php else: ?>
                                    <?php echo XUtils::b64decode($item['mix']); ?>
                                <?php endif; ?>
                                <?php $mss++;
                            endforeach; ?>
            <?php endif; ?>      
                    </ul>
            <?php endif; $ms++; endforeach;?>

                    <div class="scroCtr">
                        <a href="javascript:;" class="lft" target="_self"></a>
                        <a href="javascript:;" class="rgt" target="_self"></a>
                    </div>
                    <div class="snum">
                    </div>
<?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==2):?>
                    <ul class="nslist">
                        <?php if (!empty($x[$is]['data'])): ?>
                            <?php foreach ($x[$is]['data'] as $id => $item): ?>
                                <li><a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link'] ?>" title="<?php echo $item['title'] ?>"><?php echo $item['title'] ?></a></li>
                    <?php endforeach; ?>
                <?php endif; ?>
                    </ul>
<?php endif; $ms++; endforeach;?>
                </div>
<?php endif; ?>
<?php $m++; endforeach; ?>

        </div>

        <!--视频 97-->  
        <ul class="colTitle btop" id="aside-col02-tab">
            <?php $cArr = $this->getChildCatalogId(97);?>
<?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
            <?php if (!empty($x[$i])): ?><li rel="<?php echo $x[$i]['opt_1'] ?>" <?php if($m==1):?>class="active"<?php endif;?>><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url'] ?>"><?php echo $x[$i]['name'] ?></a></li><?php endif; ?>
<?php $m++; endforeach; ?>
        </ul>

        <div class="boxCase" id="aside-col02-cont">
<?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
                        <?php if (!empty($x[$i])): ?>
                <div class="comWrap" id="<?php echo $x[$i]['opt_1'] ?>" style="display:<?php if($m==1): echo 'block'; else: echo 'none'; endif;?>;">
                    <?php $cArrSub = $this->getChildCatalogId($i);?>
                    <?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==1):?>
                    <ul class="msColi"><!--热播-->
                            <?php if (!empty($x[$is]['data'])): ?>
                            <li style="display:block;">
                                <?php $mss = 1;
                                $c = count($x[$is]['data']);
                                foreach($x[$is]['data'] as $id => $item): ?>
                                
            <?php if (empty($item['mix'])): ?>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> <?php if ($m % 2 == 0):?>class="rgt"<?php endif;?> href="<?php echo $item['link']; ?>" title="<?php echo $item['title']; ?>">
                                            <img src="<?php echo $item['image_link']; ?>" alt="<?php echo $item['title']; ?>" />
                                            <cite><?php echo $item['title']; ?></cite>
                                        </a>
            <?php else: ?>
                                    <?php echo XUtils::b64decode($item['mix']); ?>
                                <?php endif; ?>
                                
                                <?php if ($mss % 2 == 0 && $mss < $c): ?>
                                    </li><li class="" style="display:none;">
                                    <?php endif; ?>
                                    <?php $mss++;
                                endforeach; ?>
                            </li>
                            <?php endif; ?>       
                    </ul>
<?php endif; $ms++; endforeach;?>
                    
                    <div class="scroCtr">
                        <a href="javascript:;" class="lft" target="_self"></a>
                        <a href="javascript:;" class="rgt" target="_self"></a>
                    </div>
                    <?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==2):?>
                    <ul class="msCover cf">
                        <?php if (!empty($x[$is]['data'])): ?>
                            <?php foreach ($x[$is]['data'] as $id => $item): ?>
                                <li>
                                <?php if (empty($item['mix'])): ?>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a> 
                                    <?php else: ?>
                                        <?php echo XUtils::b64decode($item['mix']); ?>
                                    <?php endif; ?>
                                </li>
<?php endforeach; ?>
                <?php endif; ?>
                    </ul>
<?php endif; $ms++; endforeach;?>
                </div>
<?php endif; ?>
<?php $m++; endforeach; ?>

        </div>

        <!--游戏 98-->  
        <ul class="colTitle btop" id="aside-col03-tab">
            <?php $cArr = $this->getChildCatalogId(98);?>
<?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
            <?php if (!empty($x[$i])): ?><li rel="<?php echo $x[$i]['opt_1'] ?>" <?php if($m==1):?>class="active"<?php endif;?>><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url'] ?>"><?php echo $x[$i]['name'] ?></a></li><?php endif; ?>
<?php $m++; endforeach; ?>
        </ul>

        <div class="boxCase" id="aside-col03-cont">
<?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
                        <?php if (!empty($x[$i])): ?>
                <div class="comWrap" id="<?php echo $x[$i]['opt_1'] ?>" style="display:<?php if($m==1): echo 'block'; else: echo 'none'; endif;?>;">
                    <?php $cArrSub = $this->getChildCatalogId($i);?>
                    <?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==1):?>
                    <ul class="msColi"><!--热播-->
                            <?php if (!empty($x[$is]['data'])): ?>
                            <li style="display:block;">
                                <?php $mss = 1;
                                $c = count($x[$is]['data']);
                                foreach($x[$is]['data'] as $id => $item): ?>
                                
            <?php if (empty($item['mix'])): ?>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> <?php if ($m % 2 == 0):?>class="rgt"<?php endif;?> href="<?php echo $item['link']; ?>" title="<?php echo $item['title']; ?>">
                                            <img src="<?php echo $item['image_link']; ?>" alt="<?php echo $item['title']; ?>" />
                                            <cite><?php echo $item['title']; ?></cite>
                                        </a>
            <?php else: ?>
                                    <?php echo XUtils::b64decode($item['mix']); ?>
                                <?php endif; ?>
                                
                                <?php if ($mss % 2 == 0 && $mss <> $c): ?>
                                    </li><li class="" style="display:none;">
                                    <?php endif; ?>
                                    <?php $mss++;
                                endforeach; ?>
                            </li>
                            <?php endif; ?>       
                    </ul>
<?php endif; $ms++; endforeach;?>
                    
                    <div class="scroCtr">
                        <a href="javascript:;" class="lft" target="_self"></a>
                        <a href="javascript:;" class="rgt" target="_self"></a>
                    </div>
                    <?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==2):?>
                    <ul class="msCover cf">
                        <?php if (!empty($x[$is]['data'])): ?>
                            <?php foreach ($x[$is]['data'] as $id => $item): ?>
                                <li>
                                <?php if (empty($item['mix'])): ?>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a> 
                                    <?php else: ?>
                                        <?php echo XUtils::b64decode($item['mix']); ?>
                                    <?php endif; ?>
                                </li>
<?php endforeach; ?>
                <?php endif; ?>
                    </ul>
<?php endif; $ms++; endforeach;?>
                </div>
<?php endif; ?>
<?php $m++; endforeach; ?>

        </div>

        <!--生活 99-->  
        <ul class="colTitle" id="aside-col04-tab">
            <?php $cArr = $this->getChildCatalogId(99);?>
<?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
            <?php if (!empty($x[$i])): ?><li rel="<?php echo $x[$i]['opt_1'] ?>" <?php if($m==1):?>class="active"<?php endif;?>><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url'] ?>"><?php echo $x[$i]['name'] ?></a></li><?php endif; ?>
<?php $m++; endforeach; ?>
        </ul>

        <div class="boxCase" id="aside-col04-cont">
            <?php $m=1;foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
            <?php if (!empty($x[$i])): ?>
                <div class="comWrap" id="<?php echo $x[$i]['opt_1'] ?>" style="display:<?php if($m==1): echo 'block'; else: echo 'none'; endif;?>;">
                    <?php $cArrSub = $this->getChildCatalogId($i);?>
                    <?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==1):?>
                    <ul class="mslide">
                        <?php if (!empty($x[$is]['data'])): ?>
                            <?php $mss = 1;
                            foreach ($x[$is]['data'] as $id => $item): ?>
            <?php if (empty($item['mix'])): ?>
                                    <li <?php if($mss==1):?>style="display:block;"<?php endif;?>>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> <?php if ($m % 2 == 0):?>class="rgt"<?php endif;?> href="<?php echo $item['link']; ?>" title="<?php echo $item['title']; ?>">
                                            <img src="<?php echo $item['image_link']; ?>" alt="<?php echo $item['title']; ?>" />
                                            <cite><?php echo $item['title']; ?></cite>
                                        </a>
                                    </li>
                                <?php else: ?>
                                    <?php echo XUtils::b64decode($item['mix']); ?>
                                <?php endif; ?>
                                <?php $mss++;
                            endforeach; ?>
            <?php endif; ?>      
                    </ul>
            <?php endif; $ms++; endforeach;?>
                    
                    
                    <div class="scroCtr">
                        <a href="javascript:;" class="lft" target="_self"></a>
                        <a href="javascript:;" class="rgt" target="_self"></a>
                    </div>
                    <?php $ms=1;foreach ($cArrSub as $is =>$vs): if($ms==2):?>
                    <ul class="msCover cf">
                        <?php if (!empty($x[$is]['data'])): ?>
                            <?php foreach ($x[$is]['data'] as $id => $item): ?>
                                <li>
                                <?php if (empty($item['mix'])): ?>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a> 
                                    <?php else: ?>
                                        <?php echo XUtils::b64decode($item['mix']); ?>
                                    <?php endif; ?>
                                </li>
<?php endforeach; ?>
                <?php endif; ?>
                    </ul>
<?php endif; $ms++; endforeach;?>
                </div>
<?php endif; ?>
<?php $m++; endforeach; ?>

        </div>

        <!--彩票 100-->  
        <ul id="aside-col05-tab" class="colTitle btop">
            <li class="active" rel="shuang"><a href="javascript:;" _hover-ignore="1" _orighref="javascript:;" _tkworked="true">双色球</a></li>
            <li rel="daletou" class=""><a href="javascript:;" _hover-ignore="1" _orighref="javascript:;" _tkworked="true">大乐透</a></li>
            <li rel="3dee" class=""><a href="javascript:;" _hover-ignore="1" _orighref="javascript:;" _tkworked="true">3D</a></li>
            <li rel="xuan" class=""><a href="javascript:;" _hover-ignore="1" _orighref="javascript:;" _tkworked="true">11选5</a></li>
        </ul> 
        <div id="aside-col05-cont" class="boxCase">
            <div style="display: block;" id="shuang" class="comWrap">
                <p class="icai cf">
                    <span class="fl">第<i><?php echo $x[220]['data'][0]['opt_b']?></i>期</span>
                    <span class="fr"><?php echo $x[220]['data'][0]['opt_c']?><a href="<?php echo $x[220]['data'][0]['link']?>" _hover-ignore="1">玩法</a></span>
                </p>
                <ul class="tickets">
                    <?php $kj_arr = explode(',', $x[220]['data'][0]['opt_a'])?>
                    <li><?php echo $kj_arr[0]?></li>
                    <li><?php echo $kj_arr[1]?></li>
                    <li><?php echo $kj_arr[2]?></li>
                    <li><?php echo $kj_arr[3]?></li>
                    <li><?php echo $kj_arr[4]?></li>
                    <li><?php echo $kj_arr[5]?></li>
                    <li class="blue last"<?php echo $kj_arr[6]?></li>
                </ul>
                <ul class="selb">
                    <li><a class="current" href="<?php echo $x[221]['data'][0]['link']?>" _hover-ignore="1" _orighref="<?php echo $x[221]['data'][0]['link']?>" _tkworked="true"><?php echo $x[221]['data'][0]['title']?></a></li>
                    <li><a href="<?php echo $x[221]['data'][0]['link']?>" _hover-ignore="1"><?php echo $x[221]['data'][0]['title']?></a></li>
                </ul>
                <ul class="tiOth cf">
                    <?php $i=1;foreach($x[222]['data'] as $info):?>
                    <li><a href="<?php echo $info['link']?>" _hover-ignore="1"><?php echo XUtils::cutstr($info['title'],12,null)?></a>
                        <?php if($i%2==1):?><i>|</i><?php endif;?></li><?php if($i%2==0):?><li style="clear:both;"></li><?php endif;?>
                    <?php $i++; endforeach;?>
                </ul>
            </div>
            <div style="display: none;" id="daletou" class="comWrap">
                <p class="icai cf">
                    <span class="fl">第<i><?php echo $x[223]['data'][0]['opt_b']?></i>期</span>
                    <span class="fr"><?php echo $x[223]['data'][0]['opt_c']?><a href="<?php echo $x[223]['data'][0]['link']?>" _hover-ignore="1">玩法</a></span>
                </p>
                <ul class="tickets">
                    <?php $kj_arr = explode(',', $x[223]['data'][0]['opt_a'])?>
                    <li><?php echo $kj_arr[0]?></li>
                    <li><?php echo $kj_arr[1]?></li>
                    <li><?php echo $kj_arr[2]?></li>
                    <li><?php echo $kj_arr[3]?></li>
                    <li><?php echo $kj_arr[4]?></li>
                    <li class="blue"><?php echo $kj_arr[5]?></li>
                    <li class="blue last"><?php echo $kj_arr[6]?></li>
                </ul>
                <ul class="selb">
                    <li><a class="current" href="<?php echo $x[224]['data'][0]['link']?>" _hover-ignore="1" _orighref="<?php echo $x[221]['data'][0]['link']?>" _tkworked="true"><?php echo $x[221]['data'][0]['title']?></a></li>
                    <li><a href="<?php echo $x[224]['data'][0]['link']?>" _hover-ignore="1"><?php echo $x[221]['data'][0]['title']?></a></li>
                </ul>
                <ul class="tiOth cf">
                    <?php $i=1;foreach($x[225]['data'] as $info):?>
                    <li><a href="<?php echo $info['link']?>" _hover-ignore="1"><?php echo XUtils::cutstr($info['title'],12,null)?></a>
                        <?php if($i%2==1):?><i>|</i><?php endif;?></li><?php if($i%2==0):?><li style="clear:both;"></li><?php endif;?>
                    <?php $i++; endforeach;?>
                </ul>
            </div>
            <div style="display: none;" id="3dee" class="comWrap">
                <p class="icai cf">
                    <span class="fl">第<i><?php echo $x[226]['data'][0]['opt_b']?></i>期</span>
                    <span class="fr"><?php echo $x[226]['data'][0]['opt_c']?><a href="<?php echo $x[226]['data'][0]['link']?>" _hover-ignore="1">玩法</a></span>
                </p>
                <ul class="tickets">
                    <?php $kj_arr = explode(',', $x[226]['data'][0]['opt_a'])?>
                    <li><?php echo $kj_arr[0]?></li>
                    <li><?php echo $kj_arr[1]?></li>
                    <li><?php echo $kj_arr[2]?></li>
                    <li class="txt"><?php echo $kj_arr[3]?></li>
                </ul>
                <ul class="selb">
                    <li><a class="current" href="<?php echo $x[227]['data'][0]['link']?>" _hover-ignore="1" _orighref="<?php echo $x[221]['data'][0]['link']?>" _tkworked="true"><?php echo $x[221]['data'][0]['title']?></a></li>
                    <li><a href="<?php echo $x[227]['data'][0]['link']?>" _hover-ignore="1"><?php echo $x[221]['data'][0]['title']?></a></li>
                </ul>
                <ul class="tiOth cf">
                    <?php $i=1;foreach($x[228]['data'] as $info):?>
                    <li><a href="<?php echo $info['link']?>" _hover-ignore="1"><?php echo XUtils::cutstr($info['title'],12,null)?></a>
                        <?php if($i%2==1):?><i>|</i><?php endif;?></li><?php if($i%2==0):?><li style="clear:both;"></li><?php endif;?>
                    <?php $i++; endforeach;?>
                </ul>
            </div>
            <div style="display: none;" id="xuan" class="comWrap">
                <p class="icai cf">
                    <span class="fl">第<i><?php echo $x[229]['data'][0]['opt_b']?></i>期</span>
                    <span class="fr"><?php echo $x[229]['data'][0]['opt_c']?><a href="<?php echo $x[229]['data'][0]['link']?>" _hover-ignore="1">玩法</a></span>
                </p>
                <ul class="tickets">
                    <?php $kj_arr = explode(',', $x[229]['data'][0]['opt_a'])?>
                    <li><?php echo $kj_arr[0]?></li>
                    <li><?php echo $kj_arr[1]?></li>
                    <li><?php echo $kj_arr[2]?></li>
                    <li><?php echo $kj_arr[3]?></li>
                    <li><?php echo $kj_arr[4]?></li>
                </ul>
                <ul class="selb">
                    <li><a class="current" href="<?php echo $x[230]['data'][0]['link']?>" _hover-ignore="1" _orighref="<?php echo $x[221]['data'][0]['link']?>" _tkworked="true"><?php echo $x[221]['data'][0]['title']?></a></li>
                    <li><a href="<?php echo $x[230]['data'][0]['link']?>" _hover-ignore="1"><?php echo $x[221]['data'][0]['title']?></a></li>
                </ul>
                <ul class="tiOth cf">
                    <?php $i=1;foreach($x[231]['data'] as $info):?>
                    <li><a href="<?php echo $info['link']?>" _hover-ignore="1"><?php echo XUtils::cutstr($info['title'],12,null)?></a>
                        <?php if($i%2==1):?><i>|</i><?php endif;?></li><?php if($i%2==0):?><li style="clear:both;"></li><?php endif;?>
                    <?php $i++; endforeach;?>
                </ul>
            </div>
        </div> 
    </div>
