<div class="col col-fmSite" id="hh_active">
    <div id="bb" class="fmSite-con" block="mingzhan">
        <div id="fm" class="box-fmSite" style="display:block;">
<?php $cArr = $this->getChildCatalogId(101); $m=1;
foreach ($cArr as $i =>$v): if($m>2):break;endif;?>
            <ul class="cf fmSite <?php if($m==1):?>bb<?php endif;?>">
                <?php if (!empty($x[$i]['data'])): ?>
                    <?php foreach ($x[$i]['data'] as $k => $item): ?>
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
<?php $m++; endforeach;?>
        </div>
    </div>
</div>

<div class="box-hot cf">
<?php $m=1;foreach ($cArr as $i =>$v): if($m==3):?>
    <?php if (!empty($x[$i]['data'])): ?><?php foreach ($x[278]['data'] as $k => $item): ?><?php if (empty($item['mix'])): ?><a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a><?php else: ?><?php echo XUtils::b64decode($item['mix']); ?><?php endif; ?><?php endforeach; ?><?php endif; ?>
<?php endif; $m++; endforeach;?>
</div>

<div class="col" block="cool-site">
    <!-- 第一区 -->  
    <ul class="colnavi fcolnavi">
        <?php 
$cArr = $this->getChildCatalogId(123); $m=1;
     foreach ($cArr as $i =>$v): if($m>1):break;endif;
        if (!empty($x[$i]['data'])):  $c = count($x[$i]['data']); $z = 1;
            foreach ($x[$i]['data'] as $k => $item): ?>
                <li>
                    <?php if (empty($item['mix'])): ?>
                    <span class="g0<?php echo $z; ?>">&#<?php echo $item['opt_a']; ?>;</span>
                    <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a> 
                    <?php if ($z <> $c): ?>
                        <i>|</i>
                    <?php endif; ?>
                    <?php else: ?>
                    <?php echo XUtils::b64decode($item['mix']); ?>
                </li>
                <?php 
                endif;$z++; 
            endforeach; 
        endif; $m++;
    endforeach; 
    ?>
    </ul>
    
    <ul class="sortSite">

<?php $m=1;
     foreach ($cArr as $i =>$v): if($m>1): ?>
    <?php if (!empty($x[$i])): ?>
                <li class='alt'>
                    <h4 class="tit fl"><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url']; ?>" ><?php echo $x[$i]['name']; ?></a></h4>
                    <span class="more fr"><a href="<?php echo $x[$i]['url']; ?>" >更多&#62;&#62;</a></span>
                    <?php if (!empty($x[$i]['data'])): ?><?php foreach ($x[$i]['data'] as $k => $item): ?><?php if (empty($item['mix'])): ?><a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a><?php else: ?><?php echo XUtils::b64decode($item['mix']); ?><?php endif; ?><?php endforeach; ?><?php endif; ?></li>
    <?php endif; ?>    
<?php endif; $m++; endforeach; ?>    
    </ul>

    <!-- 第二区 -->  
    <ul class="colnavi">
        <?php 
        $cArr = $this->getChildCatalogId(124); $m=1;
     foreach ($cArr as $i =>$v): if($m>1):break;endif;
        if (!empty($x[$i]['data'])): ?>
            <?php $c = count($x[$i]['data']);
            $z = 1;
            foreach ($x[$i]['data'] as $k => $item): ?>
            <li>
                <?php if (empty($item['mix'])): ?>
                    <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a>
                    <?php if ($z <> $c): ?>
             <i></i>
                <?php endif; ?>
            <?php else: ?>
        <?php echo XUtils::b64decode($item['mix']); ?>
            <?php endif; ?>
            </li>
            <?php $z++;
        endforeach; endif; $m++; endforeach;?>
    </ul>
    
    <ul class="sortSite">
<?php $m=1;
     foreach ($cArr as $i =>$v): if($m>1): ?>
                <?php if (!empty($x[$i])): ?><li class='alt'><h4 class="tit fl"><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url']; ?>" ><?php echo $x[$i]['name']; ?></a></h4>
                    <span class="more fr"><a href="<?php echo $x[$i]['url']; ?>" >更多&#62;&#62;</a></span>
                    <?php if (!empty($x[$i]['data'])): ?><?php foreach ($x[$i]['data'] as $k => $item): ?><?php if (empty($item['mix'])): ?><a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a><?php else: ?><?php echo XUtils::b64decode($item['mix']); ?><?php endif; ?><?php endforeach; ?><?php endif; ?></li>
                <?php endif; ?>    
        <?php endif; $m++; endforeach; ?>    
    </ul>

    <!-- 第三区 -->  
    <ul class="colnavi">
            <?php 
        $cArr = $this->getChildCatalogId(125); $m=1;
     foreach ($cArr as $i =>$v): if($m>1):break;endif;
            if (!empty($x[$i]['data'])): ?>
                <?php $c = count($x[$i]['data']);
                $z = 1;
                foreach ($x[$i]['data'] as $k => $item): ?>
                <li>
        <?php if (empty($item['mix'])): ?>
                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a>
                    <?php if ($z <> $c): ?>
                            <i></i>
            <?php endif; ?>
        <?php else: ?>
            <?php echo XUtils::b64decode($item['mix']); ?>
        <?php endif; ?>
                </li>
                    <?php $z++;
                endforeach;  endif; $m++; endforeach;?>
    </ul>
    <ul class="sortSite">
<?php $m=1;
     foreach ($cArr as $i =>$v): if($m>1): ?>
                <?php if (!empty($x[$i])): ?>
                <li class='alt'>
                    <h4 class="tit fl"><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url']; ?>" ><?php echo $x[$i]['name']; ?></a></h4>
                    <span class="more fr">
                        <a href="<?php echo $x[$i]['url']; ?>" >更多&#62;&#62;</a>
                    </span>
        <?php if (!empty($x[$i]['data'])): ?><?php foreach ($x[$i]['data'] as $k => $item): ?><?php if (empty($item['mix'])): ?><a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a><?php else: ?><?php echo XUtils::b64decode($item['mix']); ?><?php endif; ?><?php endforeach; ?><?php endif; ?></li>
    <?php endif; ?>    
<?php endif; $m++; endforeach; ?>    
    </ul>

    <!-- 第四区 -->  
    <ul class="colnavi">
            <?php 
        $cArr = $this->getChildCatalogId(126); $m=1;
     foreach ($cArr as $i =>$v): if($m>1):break;endif;
            if (!empty($x[$i]['data'])): ?>
                <?php $c = count($x[$i]['data']);
                $z = 1;
                foreach ($x[$i]['data'] as $k => $item): ?>
                <li>
        <?php if (empty($item['mix'])): ?>
                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a>
                    <?php if ($z <> $c): ?>
                            <i></i>
            <?php endif; ?>
        <?php else: ?>
            <?php echo XUtils::b64decode($item['mix']); ?>
        <?php endif; ?>
                </li>
                    <?php $z++;
                endforeach; ?>
            <?php endif;$m++; endforeach;?>
    </ul>
    <ul class="sortSite" style="padding-bottom: 4px;">
<?php $m=1;
     foreach ($cArr as $i =>$v): if($m>1): ?>
                <?php if (!empty($x[$i])): ?>
        <li class='alt'>
                    <h4 class="tit fl"><a <?php if(!empty($x[$i]['title_color'])):?> style="color:#<?php echo $x[$i]['title_color']?>;"<?php endif;?> href="<?php echo $x[$i]['url']; ?>" ><?php echo $x[$i]['name']; ?></a></h4>
                    <span class="more fr">
                        <a href="<?php echo $x[$i]['url']; ?>" >更多&#62;&#62;</a>
                    </span>
        <?php if (!empty($x[$i]['data'])): ?><?php foreach ($x[$i]['data'] as $k => $item): ?><?php if (empty($item['mix'])): ?><a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a><?php else: ?><?php echo XUtils::b64decode($item['mix']); ?><?php endif; ?><?php endforeach; ?><?php endif; ?></li>
    <?php endif; ?>    
<?php endif; $m++; endforeach; ?>    
    </ul>

</div>