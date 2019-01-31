</div>
        <div id="costom">
  <a href="javascript:;" id="c_home" title="精分类" target="_self">&#xe615;</a>
  <a href="javascript:;" id="c_game" title="玩游戏" target="_self">&#xe60b; <span class="costomTxt">玩游戏</span></a>
  <a href="javascript:;" id="c_shop" title="网上购" target="_self">&#xe611;</a>
  <a href="javascript:;" id="c_rest" title="休闲吧" target="_self">&#xe607;</a>
  <a href="http://www.114la.com/"  class="funBtn" target="_self" title="设为主页" onclick="Yl.setHome(this, this.href);return false;">设为主页</a>
  <a href="http://www.114la.com/url.php"  class="funBtn"  title="添加桌面" target="_seft">添加桌面</a>
<a href="http://www.114la.com/feedback/"  class="funBtn"  title="意见反馈">意见反馈</a>
  <a href="javascript:;" id="gotop" title="到顶部"  target="_self" style="display:none;">到顶部</a>
  <a href="javascript:;" id="c_goBot" title="到底部" target="_self">到底部</a>
</div>
  
<div class="popup-mask"></div>
<script type="text/javascript">
  var footBallIndex = 0 ;
  function footBallChange(){
    footBallIndex++;
    var _size = $(".football .fbCon").size();
    $(".football .fbCon").hide();
    $(".football .fbCon").eq( footBallIndex % _size | 0 ).show();
  }
</script>
<!-- <script src="<?php echo STATIC_THEME_URL; ?>js/main.js"></script> -->
<script type="text/javascript" src="<?php echo STATIC_THEME_URL; ?>js/config.source.js"></script>
<script type="text/javascript" src="<?php echo STATIC_THEME_URL; ?>js/index.source.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo STATIC_THEME_URL; ?>js/sha1.js" charset="utf-8"></script>
<script type="text/javascript" src="<?php echo STATIC_THEME_URL; ?>js/gameRow.js" charset="utf-8"></script>
<script type="text/javascript">

var _loadExtScript = 0,_loadExtTimmer,_extLoaded = false;
var _gameLoad = false;
function loadExtScript(){
  Ylmf.ScriptLoader.Add({
    src: "<?php echo STATIC_THEME_URL; ?>js/extend.source.js?" + parseInt(Math.random() * 10000),
    charset: "utf-8"
  });
}
function loadGameRow(){
  if(_gameLoad)return;
  _gameLoad = true;
  Ajax.request('ajax/games_hot_ajax.htm?<?php echo $this->_thetime?>',{//游戏
      success : function(xhr){
        $(".MainItem").eq(0).html(xhr.responseText);
        $("#gameRow").removeClass("gameRowLoading");
      },
      failure : function(xhr){
      }
    }
  );
}
function loadExt(){
  if(_extLoaded)return;
  var _top = document.documentElement.scrollTop || document.body.scrollTop;
  var _cHeight = document.documentElement.clientHeight;
  if(_top + _cHeight > 1600){
    loadGameRow();
  }
  if(_top + _cHeight > 2000){
    doLoad();
  }
};
function doLoad(){
  if(_extLoaded)return;
  _extLoaded = true;
  Ajax.request('ajax/gouwu_ajax.htm?12',{//网购
      success : function(xhr){
        $("#ecConWrap").html(xhr.responseText);
        if(_loadExtScript == 1){
          loadExtScript();
        }else{
          _loadExtScript++;
        }
      },
      failure : function(xhr){
        if(_loadExtScript == 1){
          loadExtScript();
        }else{
          _loadExtScript++;
        }
      }
    }
  );
  Ajax.request('ajax/yule_ajax.htm?v322',{//休闲
      success : function(xhr){
        $("#btmConWrap").html(xhr.responseText);
        if(_loadExtScript == 1){
          loadExtScript();
        }else{
          _loadExtScript++;
        }
      },
      failure : function(xhr){
         if(_loadExtScript == 1){
          loadExtScript();
        }else{
          _loadExtScript++;
        }
      }
    }
  )
}
loadExt();
$(window).on('scroll', function(){
  window.clearTimeout(_loadExtTimmer);
  _loadExtTimmer = window.setTimeout(function(){
    loadExt();
  },200);
});
$(window).on('resize', function(){
  window.clearTimeout(_loadExtTimmer);
  _loadExtTimmer = window.setTimeout(function(){
    loadExt();
  },200);
});
function closeTip(){
  var _currentTime = new Date();
  Cookie.set("wordCup",_currentTime.toDateString());
  $(".sliderTip").hide();
  $("#tipPlaceHoldere").hide();
}

</script>

  <div style="display:none">
   <?php if(!empty($this->_conf['site_stats'])):?><?php echo $this->_conf['site_stats']?><?php endif;?>
  </div> 

</body>
</html>
