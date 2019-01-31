<?php $this->renderPartial('default/header', array('x' => $x)); ?>
<div id="wrap">
    <div class="container">
        <div class="header">
            <div class="header-bd cf">
                <div class="weather-tip">有雨，出门带伞哦<span class="weather-close">X</span></div>
                <div id="imgArr">
                    <?php if (!empty($x[90]['data'])): ?>
                        <?php foreach ($x[90]['data'] as $k => $item): ?>
                            <?php if (empty($item['mix'])): ?>
                                <a href="<?php echo $item['link']; ?>" title="<?php echo $item['title']; ?>">
                                    <img src="<?php echo $item['image_link']; ?>" alt="<?php echo $item['title']; ?>" />
                                </a>
                            <?php else: ?>
                                <?php echo XUtils::b64decode($item['mix']); ?>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
                <div class="fr cf">
                    <div class="fl calendar" id="js_cal"><span class="loading">正在加载</span></div>
                    <div class="fl box-weather">
                        <div id="weather"></div>
                        <ul id="setCityBox" style="display:none;" class="box-setCity">
                            <li>
                                <select id="w_pro" onchange="Weather.cp(this.value)">
                                    <?php foreach ($cb as $k => $item): ?>
                                    <option value="<?php echo $k?>"><?php echo $item?></option>
                                    <?php endforeach; ?>
                                    
                                </select>
                                <select id="w_city" onchange="Weather.cc(this.value);">
                                </select>
                                <select id="l_city">
                                </select>
                            </li>
                            <li> <a class="button" href="javascript:void(0);" target="_self" onclick="Weather.custom();
             return false;">确 定</a> <a class="button" href="javascript:void(0);" target="_self" onclick="Weather.autoLoad();
             return false;">自动判断</a> </li>
                        </ul>
                    </div>
                    <div class="fl handle"> 
                        <span class="faceIcon">&#<?php echo $x[89]['opt_1']?>;</span>
                        <?php if (!empty($x[89]['data'][0])): ?>
                            <a <?php if(!empty($x[89]['data'][0]['title_color'])):?> style="color:#<?php echo $x[89]['data'][0]['title_color']?>;"<?php endif;?> href="<?php echo $x[89]['data'][0]['link']; ?>" class="notice" title="<?php echo $x[89]['data'][0]['title']; ?>"><?php echo $x[89]['data'][0]['title']; ?></a>
                        <?php endif; ?>
                        <form id="mail" class="mailForm" action="" onsubmit="MailLogin.sendMail(); return false;" method="post" name="mail">
                <div class="e-mail" id="js_eMail">
                  <div class="cf">
                    <input type="text" class="mailUsername fl" autocomplete="off" id="js_mailUsername" />
                    <span class="box-mailSelect fl rep">
                    <label class="bg mailSelect" id="js_mailServer">@163.com</label>
                    </span>
                    <label for="js_mailUsername" class="mailPrompt">邮箱</label>
                  </div>
                  <div class="mailLogin cf" id="js_mailLogin">
                    <input type="password" class="mailPassWord fl" id="js_mailPassWord" />
                    <span class="box-mailSubmit fl">
                    <input type="submit" value="登录" hidefocus="true" id="js_mailSubmit" rel="nr" class="mailSubmit rep" />
                    </span>
                    <label for="js_mailPassWord" class="mailPromptPw">密码</label>
                  </div>
                  <!--{ S:邮箱地址列表-->
                  <ul class="eMail-list" selectIndex="1" id="js_eMailList">
                    <li class="no">-- 请选择邮箱 --</li>
                    <?php foreach ($eo[1] as $k => $item): ?>
                    <li class="" dn="<?php echo $k?>"><?php echo $item?></li>
                    <?php endforeach; ?>
                    <li class="no">以下弹出登录</li>
                    <?php foreach ($eo[2] as $k => $item): ?>
                    <li><a href="<?php echo $k?>"><?php echo $item?></a></li>
                    <?php endforeach; ?>
                  </ul>
                  <!--E:邮箱地址列表 }--></div>
              </form>
                    </div>
                </div>
                <a id="logo" onclick="Yl.setHome(this, this.href); return false;" title="把<?php echo $this->_conf['site_name']?>设为主页" target="_self" href="<?php echo $this->_conf['site_domain']?>" hidefocus="true" class="logo fl png_bg"><?php echo $this->_conf['site_name']?></a>
            </div>
        </div>

        <div class="w980 m-search rep" block="search">
    <div class="s-hot" id="s-hot">
      <div class="hot-til"><span class="hot-clock">&#xe606;</span>&nbsp;&nbsp;<label>实时热点</label></div>
      <div class="hot-con">
          <ul>
        <?php if (!empty($x[91]['data'])): ?>
            <?php $z=1;foreach ($x[91]['data'] as $k => $item): ?>
            <li class="<?php if($z==1):echo 'cur';endif;?>"><span class="bot-nub<?php if($z<=3):echo ' bot-r';endif;?>"><?php echo $z?></span><a href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a><i></i></li>
            <?php $z++;endforeach; ?>
        <?php endif; ?>
          </ul>
      </div>
    </div>
        <ul id="sm_tab" class="m-search-tab cf">
          <!--<li rel="s115" class="st116">116搜索</li>-->
          <li class="active" rel="web">百度</li>
          <li rel="v115" class="">视频</li>
          <li rel="mp3" class="">MP3</li>
          <li rel="image" class="">图片</li>
          <li rel="zhidao" class="">知道</li>
          <li rel="computer" class="">电脑</li>
          <li rel="ditu" class="">地图</li>
          <li rel="taobao" class="">淘宝</li>
        </ul>
        <div class="cf m-search-con" id="sb">
          <div id="sw" class="fr col-hotKeys">
             <ul>
        <?php if (!empty($x[91]['data'])): ?>
            <?php $z=1;foreach ($x[91]['data'] as $k => $item): ?>
            <li class="<?php if($z==1):echo 'cur';endif;?>"><span class="bot-nub<?php if($z<=3):echo ' bot-r';endif;?>"><?php echo $z?></span><a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a><i></i></li>
            <?php $z++;endforeach; ?>
        <?php endif; ?>
            </ul>
        </div>
        <div id="sf" class="fl search-widget">
          <form method="get" action="http://www.baidu.com/s" id="searchForm">
            <a id="sf_label" class="pic fl" href="http://www.baidu.com/index.php?tn=ylmf_4_pg&amp;ch=7">
                <img src="static/images/search/baidu.gif" alt="" /></a>
            <div class="box-search-input fl"><b class="shadow-x"></b><b class="shadow-y"></b>
              <input type="text" autocomplete="off" class="searchWord" name="wd" baidusug="1" />
              <!--<b class='overArw'></b><b class='nnum' id="nums">3</b> --></div>
            <span class="box-search-submit cf rep fl"><b class="r fr bg"></b><b class="l fl bg"></b>
            <input type="submit" value="百度一下" class="searchSubmit fl" hidefocus="true" />
            </span>
            <input type="hidden" value="ylmf_4_pg" name="tn" />
            <input type="hidden" value="2" name="ch" />
          </form>
        </div>
        <div style="display:none;" id="suggest" class="sug-wrap"></div>
        
      </div>
    </div>

        <div class="w980 content cf"> 
            <div class="main fl">
                <?php $this->renderPartial('default/main', array('x' => $x)); ?>
            </div>

            <div class="sideBar fl" block="sidebar">
                <?php $this->renderPartial('default/left', array('x' => $x)); ?>
            </div>
        </div>

        <!--四格内页-->
        <div class="btmlist botNavi cf">
            <div class="wrapCont">
                
<?php $cArr = $this->getChildCatalogId(80); $m=1;
foreach ($cArr as $i =>$v): if($m>4):break;endif;?>
                <div class="botCol<?php echo $m?> botCol">
                    <div class="btmTil">
                        <span class="btmIcon grayNews">&#<?php echo $x[$i]['opt_1']?>;</span> 
                        <span class="btmTxt"><?php echo $x[$i]['name']?></span>
                    </div>
                    <ul class="">
                        <?php if (!empty($x[$i]['data'])): ?>
                            <?php foreach ($x[$i]['data'] as $k => $item): ?>
                                <li>
                                    <?php if (empty($item['mix'])): ?>
                                        <a <?php if(!empty($item['title_color'])):?> style="color:#<?php echo $item['title_color']?>;"<?php endif;?> href="<?php echo $item['link']; ?>" class="<?php echo $item['opt_a'] ?>"><?php echo $item['title']; ?></a> 
                                    <?php else: ?>
                                        <?php echo XUtils::b64decode($item['mix']); ?>
                                    <?php endif; ?>
                                </li>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </ul>
                </div>
<?php $m++; endforeach;?>
                
            </div>
        </div>

        <div class="gameRow gameRowLoading" id="gameRow">

            <div class="gameTil">
              <span class="gameTilTxt">
                <span class="ecTilIcon">&#xe60b;</span>
                <a href="#" class="ecTilSpan">玩游戏</a>
              </span>
              <div class="gameTilTab">
                <a href="http://www.114la.com/" class="gameTilItem " target="_self" _hover-ignore="1" _orighref="javascript:void(0)" _tkworked="true"><?php echo $x[574]['name'] ?></a>
                <a href="http://www.114la.com/" class="gameTilItem" target="_self" _hover-ignore="1"><?php echo $x[575]['name'] ?><i></i></a>  
                <a href="http://www.114la.com/" class="gameTilItem" target="_self" _hover-ignore="1"><?php echo $x[576]['name'] ?><i></i></a> 
                <span href="javascript:void(0)" class="gameBottomLine" style="left: 10px;"></span>
              </div>
              <div class="gameTilRight">
                <a href="http://danji.114la.com/" class="gameLink">单机游戏</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="gameLink" href="http://wangyou.114la.com/">网络游戏</a>
              </div>
            </div>
            
            <div class="gameMain">
              <div class="MainItem"></div>
              <div class="MainItem" style="display:none"></div>
              <div class="MainItem"></div>
            </div>
        </div>
        
        <div class="ecRow clearfix" id="ecRow">
            <div class="ecTil ">
                <span class="ecTilTxt"><span class="ecTilIcon">&#xe611;</span><span class="ecTilSpan">网购更优惠</span></span>
                <div class="ecTilTab">
                  <a href="http://www.114la.com/" class="ecTilItem ">每日特卖</a>
                  <a href="http://www.114la.com/" class="ecTilItem">淘宝专区<i></i></a> 
                  <span href="javascript:void(0)" class="ecBottomLine" style="left: 10px;"></span>
                </div>
                <a  href="#" class="ecMore">更多&gt;&gt;</a>
            </div>
            <div class="ecConWrap" id="ecConWrap"></div>
        </div>        

        <div class="btmContent" id="btmContent">
            <div class="btmc_til">
                <span class="tilTxt">
                    <?php if(!empty($x[82])):?>
                    <span class="tilIcon">&#<?php echo $x[82]['opt_1']?>;</span>
                    <label><?php echo $x[82]['name']?></label>
                    <?php endif;?>
                </span>
                <ul class="tabHander" id="btmHander">
                    
                    <!-- 休闲娱乐栏 82 -->
                    <?php $cArr = $this->getChildCatalogId(82); $m=1;
                        foreach ($cArr as $i =>$v):?>
                        <li <?php if ($m == 1): ?>class="active"<?php endif; ?>>
                            <?php if(!empty($x[$i])):?>
                            <a href="javascript:void(0);"><?php echo $x[$i]['name'] ?></a>
                            <?php if (!empty($x[$i]['opt_1'])): ?><i class="<?php echo $x[$i]['opt_1'] ?>"></i><?php endif; ?>
                            <?php endif;?>
                        </li>
                    <?php $m++;endforeach; ?>

                </ul>
            </div>
            <div class="btmConWrap" id="btmConWrap"></div>
        </div>

        <div class="footer cf">

            <p class="copyright">©<?php echo $this->_conf['site_copyright'];?>&nbsp;
                <a target="_self" href="/"><?php echo $this->_conf['site_name'];?></a>&nbsp;
                <a href="<?php echo $this->_conf['site_icp_url'];?>"><?php echo $this->_conf['site_icp'];?></a>
            </p>
        </div>

    </div>
    <div id="top-outerbg">
        <div id="top-innerbg">
            <div></div>
        </div>
    </div>
    <div id="bottom-outerbg">
        <div id="bottom-innerbg">
            <div></div>
        </div>
    </div>
</div>
<?php $this->renderPartial('default/footer', array('x' => $x)); ?>