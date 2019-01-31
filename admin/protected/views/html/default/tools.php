                                <div class="toolsCol">
                                    <div class="tilRow">
 <span class="tilTxt"><span class="tilIcon iconTool">&#xe60e;</span><label>最常用工具</label></span>
 <a href="#" class="more">更多&gt;&gt;</a>
                                    </div>
                                    <?php $cArr = $this->getChildCatalogId(118); ?>
                                    <?php $mm=1;foreach ($cArr as $i =>$v): if($mm>1):break;endif;?>
                                    <div class="colLeft">
 <ul>
 <?php if(!empty($x[$i]['data'])): ?>
 <?php foreach ($x[$i]['data'] as  $k => $item): ?>
 <li>
<?php if(empty($item['mix'])): ?>
<a class="<?php echo $item['opt_a'];?>" <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"></a> 
<?php else: ?>
<?php echo XUtils::b64decode($item['mix']); ?>
<?php endif; ?>
 </li>
 <?php endforeach; ?>
 <?php endif; ?>
 </ul>
                                    </div>
                                    <?php $mm++; endforeach;?>
                                    
                                    <?php $mm=1;foreach ($cArr as $i =>$v): if($mm==2):?>
                                    <div class="colRight">
<ul class="clearfix" >
<?php if(!empty($x[$i]['data'])): ?>
<?php $z=1;foreach ($x[$i]['data'] as  $k => $item): ?>
<li>
<?php if(empty($item['mix'])): ?>
<a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a> 
<?php else: ?>
<?php echo XUtils::b64decode($item['mix']); ?>
<?php endif; ?>
</li>
<?php if($z==6):?> </ul><ul class="clearfix"> <?php endif;?>
 <?php $z++;endforeach; ?>
<?php endif; ?>
</ul>
                                    </div>
                                    <?php endif; $mm++; endforeach;?>
                                    
                                </div>
                                <div class="starCol">
                                    <div class="tilRow">
 <span class="tilTxt "><span class="tilIcon iconStar ">&#xe614;</span><label>看您的星座</label></span>
 <span class="star_op"><label></label><span class="op_icon"></span></span>
                                    </div>
                                    <div class="star_chose">
 <ul>
     <li><a href="javascript:void(0)" xzid="1" target="_self">白羊座</a></li>
     <li><a href="javascript:void(0)" xzid="2" target="_self">金牛座</a></li>
     <li><a href="javascript:void(0)" xzid="3" target="_self">双子座</a></li>
     <li><a href="javascript:void(0)" xzid="4" target="_self">巨蟹座</a></li>
     <li><a href="javascript:void(0)" xzid="5" target="_self">狮子座</a></li>
     <li><a href="javascript:void(0)" xzid="6" target="_self">处女座</a></li>
     <li><a href="javascript:void(0)" xzid="7" target="_self">天秤座</a></li>
     <li><a href="javascript:void(0)" xzid="8" target="_self">天蝎座</a></li>
     <li><a href="javascript:void(0)" xzid="9" target="_self">射手座</a></li>
     <li><a href="javascript:void(0)" xzid="10" target="_self">摩羯座</a></li>
     <li><a href="javascript:void(0)" xzid="11" target="_self">水瓶座</a></li>
     <li><a href="javascript:void(0)" xzid="12" target="_self">双鱼座</a></li>
 </ul>
                                    </div>
                                    <div class="starCom">
         <?php if(!empty($x[119]['data'][0]['mix'])): ?>
         <?php $mix = json_decode(XUtils::b64decode($x[119]['data'][0]['mix']),1);?>
 <div class="starRow1">
     <span class="starAdv">
<a href="<?php echo $mix['url'];?>">
    <img src="<?php echo STATIC_THEME_URL?>images/xingzuo/tupian<?php echo $x[119]['data'][0]['opt_a']?>.jpg" />
</a>
     </span>
     <div class="starTxt1">
<div class="txt1Row">
    <span><?php echo $mix['astro']?>(<?php echo $mix['date']?>)</span>
    &nbsp;&nbsp;&nbsp;
    <?php   
    $g = ceil($mix['general']/20);
    for ($i=1;$i<=$g;$i++):?><span class="sartIco"></span> <?php endfor;
    for ($i=1;$i<=5-$g;$i++):?><span class="sartIco sartIco-h"></span><?php endfor;?>
    &nbsp;&nbsp;&nbsp;
    <span class="star_yun">
    <?php
    switch ($g):
        case 5:$g = '超棒';break;
        case 4:$g = '出运';break;
        case 3:$g = '平平';break;
        case 2:$g = '不佳';break;
        case 1:$g = '最差';break;
    endswitch;
    echo $g;
    ?>
    </span>
    <span class=""></span>
</div>

<div class="txt1Row2">
    <a href="<?php $mix['url']?>#today">明日运</a><a href="<?php $mix['url']?>#week">本周运</a><a href="<?php $mix['url']?>#mouth">本月运</a>
</div>
     </div>
 </div>
 
 <div class="starRow2">
     <div class="starDRow">
<span class="gray">幸运颜色：</span><em><?php $mix['color']?></em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">幸运数字：</span><em>2</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">速配星座：</span><em>白羊座</em>
     </div>
     <div class="starDRow">
<span class="gray">爱情指数：</span>
<?php $g = ceil($mix['love']/20);
    for ($i=1;$i<=$g;$i++):?><span class="sartIco"></span> <?php endfor;
    for ($i=1;$i<=5-$g;$i++):?><span class="sartIco sartIco-h"></span><?php endfor;?>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span class="gray">工作指数：</span>
<?php $g = ceil($mix['work']/20);
    for ($i=1;$i<=$g;$i++):?><span class="sartIco"></span> <?php endfor;
    for ($i=1;$i<=5-$g;$i++):?><span class="sartIco sartIco-h"></span><?php endfor;?>
     </div>
     <div class="starDRow">
<span class="gray">财运指数：</span>
<span class="sartIco"></span>
<?php $g = ceil($mix['money']/20);
    for ($i=1;$i<=$g;$i++):?><span class="sartIco"></span> <?php endfor;
    for ($i=1;$i<=5-$g;$i++):?><span class="sartIco sartIco-h"></span><?php endfor;?>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<span class="gray">健康指数：</span>
<?php $g = ceil($mix['health']/20);
    for ($i=1;$i<=$g;$i++):?><span class="sartIco"></span> <?php endfor;
    for ($i=1;$i<=5-$g;$i++):?><span class="sartIco sartIco-h"></span><?php endfor;?>
     </div>
     <div class="starDRow2">
<span class="gray">今日概述：</span>
<em><?php echo $mix['description']?> </em>  
<a href="<?php $mix['url']?>" class="detail">详情&gt;&gt;</a>
     </div>
 </div>
 
<?php endif;?>
                                    </div>
                                </div>
                                <div class="otherCol">
                                    <ul class="colTitle btop" id="tool-tab">
 <li rel="tb1"class="active toolTab" id="tool-tab-def"><a href="javascript:;">机票</a></li>
 <li class="toolTab" rel="tb2"><a href="javascript:;">酒店</a></li>
 <li class="toolTab" rel="tb3" ><a href="javascript:;">旅游</a></li>
 <li rel="tb4" ><a href="http://app.alipay.com/tx/mobile.htm" target="_blank">手机</a></li>
                                    </ul>
                                    <div class="comWrap" style="display:block;">
 <div id="tb" class="usage-con">
     <div style="display:block;" class="tbox tTicket" id="tb1">
<form onsubmit="kuxun.searchTicket();
                return false;"  class="plane">
    <p>&nbsp;从 &nbsp;
        <input type="text" onblur="this.value == '' ? this.value = '北京' : this.value = this.value" onclick="(this.value == '北京') ? this.value = '' : this.focus()" value="北京" name="t" class="ipt-text" id="jP_startCity" />
        &nbsp;到&nbsp;
        <input type="text" onblur="this.value == '' ? this.value = '上海' : this.value = this.value" onclick="(this.value == '上海') ? this.value = '' : this.focus()" value="上海" class="ipt-text" name="q" id="jP_toCity" />
    </p>
    <p class="under">日期
        <input type="text" name="date" id="jp_today" class="ipt-text ipt-date" value="2012-07-15" />
        &nbsp;<span class="box-btn">
            <input type="submit" class="btn rep" value="查看折扣价" />
        </span></p>
</form>
     </div>
     <div style="display:none;" class="tbox tHotel" id="tb2">
<form onsubmit="kuxun.searchHotel();
                return false;" class="plane">
    <p>城市&nbsp;
        <input id="ht_city" onblur="this.value == '' ? this.value = '北京' : this.value = this.value" onclick="(this.value == '北京') ? this.value = '' : this.focus()" value="北京" class="ipt-text ipt-city" name="city" />
        &nbsp;入住日期&nbsp;
        <input  value="" id="ht_today" class="ipt-text ipt-date" name="date" />
    </p>
    <p class="under">酒店&nbsp;
        <input value="" id="ht_key" class="ipt-text" name="nameContains" />
        &nbsp;&nbsp;<span class="box-btn">
            <input type="submit" class="btn rep" value="搜 索" />
        </span></p>
</form>
     </div>
     <div style="display:none;" class="tbox tTour" id="tb3">
<form onsubmit="kuxun.searchTravel();
                return false;" class="plane">
    <p >出发地&nbsp;
        <input type="text" onblur="this.value == '' ? this.value = '北京' : this.value = this.value" onclick="(this.value == '北京') ? this.value = '' : this.focus()" value="北京" name="StartPlace" class="ipt-text" id="daodao_travel_q" />
    </p>
    <p class="under">目的地&nbsp;
        <input value="" id="daodao_travel_k" class="ipt-text" name="KeyWords" />
        &nbsp;&nbsp;<span class="box-btn">
            <input type="submit" class="btn rep " value="旅游搜索" />
        </span></p>
</form>
     </div>
     
 </div>
                                    </div>

                                    <div class="phone_adv">
 <ul class="mslide appWrap">
     <li style="display:block;"><!--热卖-->
<?php if(!empty($x[277]['data'])): ?>
<?php foreach ($x[277]['data'] as  $k => $item): ?> 
<a class="app" href="<?php echo $item['link']?>"><img src="<?php echo $item['image_link']?>"><?php echo $item['title']?></a>
 <?php endforeach; ?>
 <?php endif; ?>
     </li>
 </ul>
                                    </div>
                                </div>