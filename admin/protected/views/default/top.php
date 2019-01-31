<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="<?php echo STATIC_BACKEND_URL?>css/style.css" rel="stylesheet" type="text/css" />
</head>

<body>
<div class="wrap">
    <div class="container">
        <div id="header">

            <div class="con">

            <div id="logo">
                <a href="<?php echo $this->createUrl("default/welcome")?>" title="管理系统首页" target="main">雨林木风后台管理系统</a>
            </div>
            
            <div id="menu">
                    <div class="item">
                        <ul>
                            <?php $i=1; foreach ($menu as $n => $c):?>
                            <?php if($this->_backendPermission == 'backendstrator' || !(FALSE === strpos($this->_backendAcl, $c['a']))):?>
                            <li<?php if($i==1):?> class="index"<?php endif;?>><a href="<?php echo $this->createUrl('default/menu',array('c'=>$c['c']))?>" id="item<?php echo $i-1;?>" target="menu" class="active" onclick="Tabmenu(this,<?php echo $i-1;?>);"><?php echo $n;?></a></li>
                            <?php endif;?>
                            <?php $i++; endforeach;?>
                        </ul>
                    </div>
                </div><!--/ menu-->
            </div><!--/ con-->
        </div><!--/ header-->
</div>
</div>
<script type="text/javascript">
function Tabmenu(obj,n){
	var Items = document.getElementById("menu").getElementsByTagName("a");
	for(var i= 0,len = Items.length;i<len;++i){
		if(Items[i].clssName !==""){
			Items[i].className = "";
		}
		obj.className = "active";
		obj.blur();
		location.hash = n;
	}
};
(function(){
var n = location.hash.replace("#","");
if(!n){ n = 0;}
var curitem = document.getElementById("item"+n);
	Tabmenu(curitem,n);
})();
</script>
</body>
</html>
