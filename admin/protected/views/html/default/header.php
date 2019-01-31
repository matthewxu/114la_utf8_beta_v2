<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="utf-8" />
        <title><?php echo $this->_conf['seo_title'] ?></title>
        <meta name="keywords" content="<?php echo $this->_conf['seo_keywords'] ?>" />
        <meta name="description" content="<?php echo $this->_conf['seo_description'] ?>" />
        <script type="text/javascript">var BaiduTn = {tn:"ylmf_4_pg",ch:"2" };var mainDomain = 'static/themes/default/theme/';</script>
        <script type="text/javascript" src="<?php echo STATIC_THEME_URL; ?>js/base.source.js<?php echo '?'.$this->_thetime?>"></script>
        <style>
        /*设置LOGO*/
        .header #logo{background:url( '<?php echo COMMON_IMG_URL; ?><?php echo $this->_conf['site_logo'];?><?php echo '?'.$this->_thetime?>' ) no-repeat 10px center;}
        </style>
        <link id="js_oStyle" href="<?php echo STATIC_THEME_URL; ?>css/index.css<?php echo '?'.$this->_thetime?>" rel="stylesheet" />
        <link rel="stylesheet" id="js_skinStyle" href="<?php echo STATIC_THEME_URL; ?>css/skin/blue.css<?php echo '?'.$this->_thetime?>" />
        <base target="_blank" />
        <script src="<?php echo STATIC_THEME_URL; ?>js/skin.js<?php echo '?'.$this->_thetime?>"></script>
        <!--[if IE 6]>
        <script src="<?php echo STATIC_THEME_URL; ?>js/DD_belatedPNG.js<?php echo '?'.$this->_thetime?>"></script>
        <script>
          /* EXAMPLE */
          DD_belatedPNG.fix('.png_bg');
          /* string argument can be any CSS selector */
          /* .png_bg example is unnecessary */
          /* change it to what suits you! */
        </script>
        <![endif]-->
        </head>
        <body>
<em style="display:none;" class="filter"></em>
<div id="classicsWrap">       
 <!--{ S:顶部工具条-->
 <div class="topbar">
     <div class="w980 cf top-bd">
         <div class="wel fl">
             <ul>
                 <li class="mcol"><i class="homeIcon">&#xe616;</i><a href="<?php echo $this->_hostInfo ?>/" class="home" target="_self" onclick="Yl.setHome(this,this.href); return false;">设为主页</a></li>
                 <li class="mcol nth2"><a href="<?php echo $this->_hostInfo ?>/repair/">主页修复</a></li>
             </ul>
         </div>
         <div class="browserAdv">
             <a href="http://ie.114la.com/chms/114Chrome_114dhv52p3.exe" class="advTxt"  target="_self">拦广告防骚扰，首选114啦浏览器</a><a href="http://ie.114la.com/chms/114Chrome_114dhv52p3.exe" class="advSpan" target="_self">一键下载</a>
         </div>
         <ul class="sets fr cf" id="set">

             <?php if (!empty($x[93]['data'])): ?>
                 <?php $z = 1;
                 foreach ($x[93]['data'] as $id => $item): if ($z <= 2): ?>
                         <li><a href="<?php echo $item['link']; ?>"><?php echo $item['title']; ?></a> </li>
                         <?php $z++;
                     endif;
                 endforeach; ?>
<?php endif; ?>

             <li class="drop">
                 <a target="_self" href="javascript:;" id="js_nm">标准版</a>
                 <ol> 
                     <li id="js_ws"><a target="_self" href="javascript:;">宽屏版</a></li> 
                     <li id="js_reOld"><a target="_self" href="javascript:;" class="exp-new"></a></li> 
                 </ol>  
             </li>
             <li class="themeChange " id="themeChange"><a href="javascript:void(0)" target="_self">换肤</a></li>
         </ul>

     </div>
 </div>
 <div class="theme" id="theme">
     <div class="themeWrap loadingBig">

     </div>
 </div>

