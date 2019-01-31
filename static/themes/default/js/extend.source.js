
/**
* ==========================================
* 发现惊奇
* Copyright (c) 2013 wwww.114la.com
* ==========================================
*/
var _jingqiIndex = 3;
window.Ylmf.jingqi = function(data){
	var _html = "";
	data[1].height = "300px";
	data[3].width = "300px";
	data[9].width = "300px";
	var _tpl = '<div class="btmc_jq_item jq_item_1">' +
					'<a href="#{url}">' +
						'<img org="#{imgurl}" src="static/images/blank.png" style="height:#{height};width:#{width};">' +
						'<span class="jq_item_mask"><span class="mask_left">#{title}</span><span class="mask_right"><em class="jq_heart"></em>#{love}</span></span>' +
					'</a>' +
				'</div>';
	for(var i=1;i<=9;i++){
		data[i].width = data[i].width || "145px";
		data[i].height = data[i].height || "145px";
		_html += format(_tpl,data[i]);
	}
	$(".btmc_jq",_btmContent).get(0).innerHTML = _html;
	if(leisureSlider.getIndex() == _jingqiIndex){
		var _imgs = mini(".btmc_jq  img",_btmContent);
		var _imgsSize = _imgs.length;
		for(var j = 0;j<_imgsSize;j++){
			var org = _imgs[j].getAttribute("org");
			if (org) {
				_imgs[j].setAttribute('src', org);
				_imgs[j].removeAttribute('org');
			}
		}
	}
}

// function loadLeisure(nub){
// 	// var _urls = ["template/bagua.htm","template/redian.htm","template/yingshi.htm","","template/meiriyile.htm","template/xiaoyouxi.htm","template/wangyeyouxi.htm","template/xiaoshuo.htm"];
// 	var _loaded = [false,false,false,false,false,false,false,false,false,false];
// 	if(_loaded[nub])return;
// 	_loaded[nub] = true;
// 	if(nub == _jingqiIndex){
// 		Ylmf.ScriptLoader.Add({
// 			src: "http://www.xgmm.cc/api/114latop9.json",
// 			charset: "gbk"
// 		});

// 		return;
// 	}
// 	Ajax.request(_urls[nub],{
//         "success" : function(xhr){
//             var _ul = xhr.responseText;
//             var _content = $(".con_item").eq(nub);
//             _content.el.innerHTML = _ul;
            
//         }
//     });
// }



ToolTaber.init({
	til:$(".toolTab",document.getElementById("tool-tab")),
	conClass:$(".tbox",document.getElementById("tb")),
	tilCur:'active'
});
var _btmContent = $("#btmContent").el;
/* 休闲娱乐 */
var leisureSlider = new switchable($("#btmHander li",_btmContent).el,$(".con_item",_btmContent).el,{
	triggerType: "click", // or click
	effect: "fade",
	circular: true
});
leisureSlider.beforeSwitch(function(i,_tigger,_panel,_op){
	_tigger.removeClass("active");
	_tigger.eq(i).addClass("active");
	var _curPanel = _panel.eq(i).get(0);
	var uls = mini(".btmc_ss ul,.btmc_jq,.smallGameList .sgUl,.btmc_xs ul",_curPanel);
	var _imgs = mini("img",uls[0] || _btmContent);
	var _imgsSize = _imgs.length;
	for(var j = 0;j<_imgsSize;j++){
		var org = _imgs[j].getAttribute("org");
		if (org) {
			_imgs[j].setAttribute('src', org);
			_imgs[j].removeAttribute('org');
		}
	}
	// loadLeisure(i)
	Cookie.set("leisureIndex","" + i);
});

var leisureIndex = Cookie.get("leisureIndex");
if(leisureIndex){
	leisureSlider.move(parseInt(leisureIndex));
	//loadLeisure(parseInt(leisureIndex));
}else{
	leisureSlider.move(0);
	//loadLeisure(0);
}

$(".btmc_subTil li").on("click",function(el){
            	
	var _par = $(el.parentNode),
		childs = _par.get(0).childNodes,
		j = 0,l,cArr = [];
	for(var i = 0;i < childs.length; i++){
		if(childs[i].nodeType != 3){
			cArr.push(childs[i]);
		}
	}
	j = cArr.indexOf(el);
	l = cArr.length;
	if(j ==  l-1){
		return;
	}
	for(var i = 0;i < cArr.length; i++){
		$(cArr[i]).removeClass("current");
	}
	$(el).addClass("current");
	
	var con_item = $(el.parentNode.parentNode.parentNode);
	
	var btmc_ssWrap = con_item.findChild(".btmc_ssWrap")[0] || con_item.findChild(".smallGameRow")[0];
	var btmc_ss = $(btmc_ssWrap).findChild(".btmc_ss")[0] || $(btmc_ssWrap).findChild(".smallGameList")[0];
	var btmc_uls = $($(btmc_ss).findChild("ul"));
	btmc_uls.hide();
	btmc_uls.eq(j).show();
	var _curUl = btmc_uls.get(j);
	var _imgs = mini("img",_curUl);
	var _imgsSize = _imgs.length;
	for(var j = 0;j<_imgsSize;j++){
		var org = _imgs[j].getAttribute("org");
		if (org) {
			_imgs[j].setAttribute('src', org);
			_imgs[j].removeAttribute('org');
		}
	}
	new Animate(_curUl, 'opacity', {
	  from: 0,
	  to: 1,
	  time: 500
	}).start();
});

$(".btmc_la",_btmContent).on("click",function(){
	leisureSlider.prev();
});

$(".btmc_ra",_btmContent).on("click",function(){
	leisureSlider.next();
});

$(".tabHander li",_btmContent).each(function(el){
	$(el).hover(function(){
		$(el).addClass("hover");
	},function(){
		$(el).removeClass("hover");
	})
});

$("ul#tool-tab li a,#btmHander li a",_btmContent).on("click",function(el){
	var _event = YLMF.getEvent(),
	    _par = $(el.parentNode);
	if(!_par.hasClass("active") && _par.el.getAttribute("rel") !="tb4"){
		if(_event.preventDefault){
			_event.preventDefault();
		}else{
			 window.event.returnValue = false; 
		}
	}
	return false;  
});


(function(){
	/** 爱彩调用接口数据 **/
	Ylmf.ScriptLoader.Add({
		src:"static/js/api/icai.json"+'?' + parseInt(Math.random()* 99),
		charset:"utf-8"
	});
	window.Ylmf.icai = function(data){
		var icMsg = "<div style='text-align:center;line-height:162px;'>\u6570\u636e\u52a0\u8f7d\u5f02\u5e38\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002</div>";

		if(typeof data =='object'){
			if(typeof data['ssq'] == 'undefined'){
				$('#shuang').get(0).innerHTML = icMsg;
				return false;
			}else if(typeof data['dlt'] == 'undefined'){
				$('#daletou').get(0).innerHTML = icMsg;
				return false;
			}else if(typeof data['fc3d'] == 'undefined'){
				$('#3dee').get(0).innerHTML = icMsg;
				return false;
			}else if(typeof data['jx_11x5'] == 'undefined'){
				$('#xuan').get(0).innerHTML = icMsg;
				return false;
			}
			var paricle ='';
			for(k in data){
				switch(k){
					case'ssq':
						paricle = data['ssq'][0];
						var html = '<p class="icai cf">'
										+'<span class="fl">\u7b2c'+'<i>'+paricle.phase+'</i>'+'\u671f</span>'
										+'<span class="fr">'+paricle.date+'    <a href="'+paricle.url[0]+'">\u73a9\u6cd5</a></span>'
									+'</p>';
							html += '<ul class="tickets">'
										+'<li>'+paricle.result[0]+'</li>'
										+'<li>'+paricle.result[1]+'</li>'
										+'<li>'+paricle.result[2]+'</li>'
										+'<li>'+paricle.result[3]+'</li>'
										+'<li>'+paricle.result[4]+'</li>'
										+'<li>'+paricle.result[5]+'</li>'
										+'<li class="blue last">'+paricle.result[6]+'</li>'
									+'</ul>';
							html += '<ul class="selb">'
										+'<li><a href="'+paricle.url[1]+'" class="current">\u7acb\u5373\u6295\u6ce8</a></li>'
										+'<li><a href="'+paricle.chain[1]+'">'+paricle.chain[0]+'</a></li>'
									+'</ul>';
							html += '<ul class="tiOth cf">';
						link = paricle['link'];
						for(var i = 0;i < link.length; i++){
							if(i%2===0){
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a><i>|</i></li>'
							}else{
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a></li>'
							}
						}
						html += '</ul>';
						$('#shuang').get(0).innerHTML = html;
					break;
					case'dlt':
						paricle = data['dlt'][0];
						var html = '<p class="icai cf">'
										+'<span class="fl">\u7b2c'+'<i>'+paricle.phase+'</i>'+'\u671f</span>'
										+'<span class="fr">'+paricle.date+'    <a href="'+paricle.url[0]+'">\u73a9\u6cd5</a></span>'
									+'</p>';
							html += '<ul class="tickets">'
										+'<li>'+paricle.result[0]+'</li>'
										+'<li>'+paricle.result[1]+'</li>'
										+'<li>'+paricle.result[2]+'</li>'
										+'<li>'+paricle.result[3]+'</li>'
										+'<li>'+paricle.result[4]+'</li>'
										+'<li class="blue">'+paricle.result[5]+'</li>'
										+'<li class="blue last">'+paricle.result[6]+'</li>'
									+'</ul>';
							html += '<ul class="selb">'
										+'<li><a href="'+paricle.url[1]+'" class="current">\u7acb\u5373\u6295\u6ce8</a></li>'
										+'<li><a href="'+paricle.chain[1]+'">'+paricle.chain[0]+'</a></li>'
									+'</ul>';
							html += '<ul class="tiOth cf">';
						link = paricle['link'];
						for(var i = 0;i < link.length; i++){
							if(i%2===0){
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a><i>|</i></li>'
							}else{
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a></li>'
							}
						}
						html += '</ul>';
						$('#daletou').get(0).innerHTML = html;
					break;
					case'fc3d':
						paricle = data['fc3d'][0];
						var html = '<p class="icai cf">'
										+'<span class="fl">\u7b2c'+'<i>'+paricle.phase+'</i>'+'\u671f</span>'
										+'<span class="fr">'+paricle.date+'    <a href="'+paricle.url[0]+'">\u73a9\u6cd5</a></span>'
									+'</p>';
							html += '<ul class="tickets">'
										+'<li>'+paricle.result[0]+'</li>'
										+'<li>'+paricle.result[1]+'</li>'
										+'<li>'+paricle.result[2]+'</li>'
										+'<li class="txt">'+paricle.result[3]+'</li>'
									+'</ul>';
							html += '<ul class="selb">'
										+'<li><a href="'+paricle.url[1]+'" class="current">\u7acb\u5373\u6295\u6ce8</a></li>'
										+'<li><a href="'+paricle.chain[1]+'">'+paricle.chain[0]+'</a></li>'
									+'</ul>'
							html += '<ul class="tiOth cf">';
						link = paricle['link'];
						for(var i = 0;i < link.length; i++){
							if(i%2===0){
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a><i>|</i></li>'
							}else{
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a></li>'
							}
						}
						html += '</ul>';
						$('#3dee').get(0).innerHTML = html;
					break;
					case'jx_11x5':
						paricle = data['jx_11x5'][0];
						var html = '<p class="icai cf">'
										+'<span class="fl">\u7b2c'+'<i>'+paricle.phase+'</i>'+'\u671f</span>'
										+'<span class="fr">'+paricle.date+'</span>'
									+'</p>';
							html += '<ul class="tickets">'
										+'<li>'+paricle.result[0]+'</li>'
										+'<li>'+paricle.result[1]+'</li>'
										+'<li>'+paricle.result[2]+'</li>'
										+'<li>'+paricle.result[3]+'</li>'
										+'<li>'+paricle.result[4]+'</li>'
									+'</ul>';
							html += '<ul class="selb">'
										+'<li><a href="'+paricle.url[1]+'" class="current">\u7acb\u5373\u6295\u6ce8</a></li>'
										+'<li><a href="'+paricle.chain[1]+'" class="w">'+paricle.chain[0]+'</a></li>'
									+'</ul>'
							html += '<ul class="tiOth cf">';
						link = paricle['link'];
						for(var i = 0;i < link.length; i++){
							if(i%2===0){
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a><i>|</i></li>'
							}else{
								html += '<li><a href="'+link[i]['url']+'">'+link[i]['title']+'</a></li>'
							}
						}
						html += '</ul>';
						$('#xuan').get(0).innerHTML = html;
					break;
				}
			}
		}else{
			$('#shuang').get(0).innerHTML = icMsg;
		}
	}
})();
;(function(){
	var _ecRow = $("#ecRow").el;
	var _ecTimmer = null;
	var _tabs = $(".ecTilRow li",_ecRow);
	var _links = $(".ecTilRow li a",_ecRow);
	var _cons = $(".ecImgList ul",_ecRow);
	var _preIndex = 0;
	var _preTab = 0;
	_tabs.each(function(n,i){
		$(n).hover(function(el){
			YLMF.defer("ecChangeTab",function(){
				_goto(i);
			},250);
		},function(el){
			YLMF.cancelDefer("ecChangeTab");
		});
	});

	function _goto(i){
		if(_preIndex == i){
			return;
		}
		_preIndex = i;
		_tabs.removeClass("active").eq(i).addClass("active");
		_cons.hide();
		_cons.eq(i).show();

		_cons.eq(i).find("img").each(function(el){
			var org = el.getAttribute("org");
			if (org) {
				el.setAttribute('src', org);
				el.removeAttribute('org');
			}
		}); 
		_cons.eq(i).setStyle("opacity",0).show();
		new Animate(_cons.eq(i).el, 'opacity', {
		  from: 0,
		  to: 1,
		  time: 500
		}).start();
		return; 
	}

	_links.bind("click",function(event){
		var eve = YLMF.getEvent();
		var _target = eve.target || eve.srcElement;
		if(!$(_target.parentNode).hasClass("active")){
			if(eve.preventDefault){
				eve.preventDefault();
			}else{
				 window.event.returnValue = false; 
			}
		}
	});

	var onEcCenter = false;
	var onEcBody = false;
	var lastTime = new Date();

	$(".ecCenter",_ecRow).hover(function(){
		onEcCenter = true;
	},function(){
		onEcCenter = false;
		lastTime = new Date();
	});

	var ecTimmer = window.setInterval(function(){
		var _now = (new Date()).getTime();
		if(!onEcCenter &&  ((_now - lastTime.getTime()) > 2000)  ) {
			_goto((_preIndex+1) % _tabs.size());
		}
	},8000);

	$(".ecTilItem",_ecRow).eq(0).bind("click",function(event){
		if(_preTab == 0){
			return;
		}else{
			var e = YLMF.getEvent();
			if(e.preventDefault){
				e.preventDefault();
			}else{
				window.event.returnValue = false; 
			}
		}
		_preTab = 0;
		$(".ecCon",_ecRow).show();
		$("#ecFrameWrap").hide();
		var _bottomLine = $(".ecBottomLine",_ecRow),
		_left = $(".ecTilItem",_ecRow).get(0).offsetLeft;
		_bottomLine.setStyle( "left" , _left + 10 + "px");
	});
	$(".ecTilItem",_ecRow).eq(1).bind("click",function(event){
		if(_preTab == 1){
			return;
		}else{
			var e = YLMF.getEvent();
			if(e.preventDefault){
				e.preventDefault();
			}else{
				window.event.returnValue = false; 
			}
		}
		_preTab = 1;
		$(".ecCon",_ecRow).hide();
		$("#ecFrameWrap").show();
		var _iframe = $("#ecIframe").el;
		var org = _iframe.getAttribute("org");
		if (org) {
			_iframe.setAttribute('src', org);
			_iframe.removeAttribute('org');
		}
		var _bottomLine = $(".ecBottomLine",_ecRow),
		_left = $(".ecTilItem",_ecRow).get(1).offsetLeft;
		_bottomLine.setStyle( "left" , _left + 10 + "px");
	});

})();


/**
*	星座
*	
*	
*	
*/
var _starOp_hover = false,_starChose_hover = false;
$(".star_chose a",_btmContent).on("click",function(el){
	
	$(".starCol .star_chose",_btmContent).hide();
	Cookie.set("star",el.getAttribute("xzid"));
	Ylmf.ScriptLoader.Add({
		src: "http://app.114la.com/xingzuo/go108_" + el.getAttribute("xzid") + ".json",
		charset: "gb2312"
	});
});
$(".star_op",_btmContent).on("click",function(){
	$(".starCol .star_chose").show();
});
$(".star_op",_btmContent).hover(function(){
	_starOp_hover = true;
},function(){
	_starOp_hover = false;
});
$(".star_chose",_btmContent).hover(function(){
	_starChose_hover = true;
},function(){
	_starChose_hover = false;
})
$(document.body).on("click",function(){
	if(!_starOp_hover && !_starChose_hover){
		$(".starCol .star_chose",_btmContent).hide();
	}
})


window.Ylmf.star = function(data){
	function starHtml(nub){
		var _i = Math.ceil(nub/20),
			_str = "";	
		for(var j =0;j < _i;j++){
			_str += '<span class="sartIco"></span>';
		}
		for(var j = _i;j<5;j++){
			_str += '<span class="sartIco sartIco-h"></span>';
		}
		return _str;
	}
	function starTxt(nub){
		if(nub > 80){
			return "超棒";
		}else if(nub > 60){
			return "出运";
		}else if(nub > 40){
			return "平平";
		}else if(nub > 20){
			return "不佳";
		}else{
			return "最差";
		}
	}

	var _tpl = '<div class="starRow1">'+
						'<span class="starAdv">'+
							'<a href="#{url}">'+
								'<img src="static/images/xingzuo/#{tupian}" />'+
							'</a>'+
						'</span>'+
						'<div class="starTxt1">'+
							'<div class="txt1Row">'+
								'<span>#{astro}(#{date})</span>&nbsp;&nbsp;&nbsp;#{generalHtml}&nbsp;&nbsp;&nbsp;<span class="star_yun">#{generalTxt}</span>'+
								'<span class=""></span>'+
							'</div>'+
							
							'<div class="txt1Row2">'+
								'<a href="#{url}&i=1">明日运</a><a href="#{url}&i=2">本周运</a><a href="#{url}&i=3">本月运</a>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="starRow2">'+
						'<div class="starDRow">'+
							'<span class="gray">幸运颜色：</span><em>#{color}</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">幸运数字：</span><em>#{number}</em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">速配星座：</span><em>#{supei}</em>'+
						'</div>'+
						'<div class="starDRow">'+
							'<span class="gray">爱情指数：</span>#{loveHtml}'+
							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">工作指数：</span>#{workHtml}'+
						'</div>'+
						'<div class="starDRow">'+
							'<span class="gray">财运指数：</span>#{moneyHtml}'+
							'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">健康指数：</span>#{healthHtml}'+
						'</div>'+
						'<div class="starDRow2">'+
							'<span class="gray">今日概述：</span><em>#{description}</em>  <a href="#{url}" class="detail">详情&gt;&gt;</a>'+
						'</div>'+
					'</div>';
		var _data = {
			generalHtml : starHtml(data.general),
			loveHtml : starHtml(data.love),
			workHtml : starHtml(data.work),
			moneyHtml : starHtml(data.money),
			healthHtml : starHtml(data.health),
			generalTxt : starTxt(data.general)
		};
		YLMF._extend(_data,data);
		$(".star_op",_btmContent).get(0).innerHTML = "<label>" + data.astro + "</label>" + '<span class="op_icon"></span>';
		$(".starCom",_btmContent).get(0).innerHTML = format(_tpl,_data);
}
var _starC = Cookie.get("star")  || "13";
Ylmf.ScriptLoader.Add({
	src: "http://app.114la.com/xingzuo/go108_" + _starC + ".json",
	charset: "gb2312"
});




/* 机票日期 */
(function(){
	
	var _now = new Date();
	var _dInp = $("#jp_today");
	var _dInp2 = $("#ht_today");
	_dInp.el.value = _now.getFullYear() + "-" + (_now.getMonth() + 1) + "-" + _now.getDate();
	_dInp2.el.value = _now.getFullYear() + "-" + (_now.getMonth() + 1) + "-" + _now.getDate();
})();
/** 
/* 日历控件
/*
/*
/*
/*
/*
**/
DateInput = (function($) { // Localise the $ function

	var fireEvent = function fireEvent(element,event){
		if (document.createEventObject){
			// IE浏览器支持fireEvent方法
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt)
		}
		else{
			// 其他标准浏览器使用dispatchEvent方法
			var evt = document.createEvent( 'HTMLEvents' );
			// initEvent接受3个参数：
			// 事件类型，是否冒泡，是否阻止浏览器的默认行为
			evt.initEvent(event, true, true);  
			return !element.dispatchEvent(evt);
		}
	};
	//DOM没有提供insertAfter()方法
	function insertAfter(newElement, targetElement){
		var parent = targetElement.parentNode;
		if (parent.lastChild == targetElement) {
			// 如果最后的节点是目标元素，则直接添加。因为默认是最后
			parent.appendChild(newElement);
		}
		else {
			parent.insertBefore(newElement, targetElement.nextSibling);
			//如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
		}
	}
	function DateInput(el, opts) {
	  if (typeof(opts) != "object") opts = {};
	  YLMF._extend(this, DateInput.DEFAULT_OPTS);
	  YLMF._extend(this, opts);
	  this.input = $(el);
	  this.bindMethodsToObj("show", "hide", "hideIfClickOutside", "keydownHandler", "selectDate");
	  this.build();
	  this.selectDate();
	  this.hide();
	};

	DateInput.DEFAULT_OPTS = {
	  month_names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
	  short_month_names: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	  short_day_names: ["日", "一", "二", "三", "四", "五", "六"],
	  start_of_week: 1,
	  align : "left"
	};
	DateInput.prototype = {
		build : function(){
			var monthNav = document.createElement("p");
			monthNav.className = "month_nav";
			monthNav.innerHTML = '<span class="button prev" title="上一月">&#171;</span>' +
			  ' <span class="month_name"></span> ' +
			  '<span class="button next" title="下一月">&#187;</span>';
			
			this.monthNameSpan = $(".month_name", monthNav);
			$(".prev", monthNav).bind("click",this.bindToObj(function() { this.moveMonthBy(-1); }));
			$(".next", monthNav).bind("click",this.bindToObj(function() { this.moveMonthBy(1); }));

			var yearNav = document.createElement("p");
			yearNav.className = "year_nav";
			yearNav.innerHTML = '<span class="button prev" title="上一年">&#171;</span>' +
			  ' <span class="year_name"></span> ' +
			  '<span class="button next" title="下一年">&#187;</span>';
			
			this.yearNameSpan = $(".year_name", yearNav);
			$(".prev", yearNav).bind("click",this.bindToObj(function() { this.moveMonthBy(-12); }));
			$(".next", yearNav).bind("click",this.bindToObj(function() { this.moveMonthBy(12); }));

			var nav = document.createElement("div");
			nav.className = "nav";
			nav.appendChild(monthNav);
			nav.appendChild(yearNav);
			/*
			var tableShell = "<thead><tr>";
			$(this.adjustDays(this.short_day_names)).each(function(el) {
				tableShell += "<th>" + el + "</th>";
			});
			tableShell += "</tr></thead><tbody></tbody>";
			*/
			
			var _tableshellEl = document.createElement("table");
			var tHead = _tableshellEl.createTHead();
			tHead.insertRow();
			$(this.adjustDays(this.short_day_names)).each(function(el,i) {
				theCell=tHead.rows[0].insertCell(i);  
				theCell.innerHTML=el;  
			});
			//_tableshellEl.innerHTML = tableShell;
			this.dateSelector = this.rootLayers = document.createElement("div");
			this.dateSelector.className = "date_selector";
			this.dateSelector.appendChild(nav);
			this.dateSelector.appendChild(_tableshellEl);
			insertAfter(this.dateSelector,this.input.el);
			
			this.tbody = $(document.createElement("tbody"));
			_tableshellEl.appendChild(this.tbody.el);
			
			if(Browser.isIE && Browser.isIE <= 7){
				this.ieframe = document.createElement("iframe");
				this.ieframe.className = "date_selector_ieframe";
				this.ieframe.setAttribute("frameborder","0");
				this.ieframe.setAttribute("src","#");
				this.dateSelector.appendChild(this.ieframe);
				//this.ieframe = $('<iframe class="date_selector_ieframe" frameborder="0" src="#"></iframe>').insertBefore(this.dateSelector);
			}
			this.input.bind("change",this.bindToObj(function() { this.selectDate(); }));
			this.selectDate();
		},
		stringToDate: function(string) {
			
			var matches;
			if (matches = string.match(/^(\d{4,4})-(\d{1,2})-(\d{1,2})$/)) {
			  return new Date(matches[1], parseInt(matches[2]) - 1, matches[3], 12, 00);
			} else {
			  return null;
			};
		},
		// Select a particular date. If the date is not specified it is read from the input. If no date is
		// found then the current date is selected. The selectMonth() function is responsible for actually
		// selecting a particular date.
		selectDate: function(date) {
			if (typeof(date) == "undefined") {
			  date = this.stringToDate(this.input.el.value);
			};
			if (!date) date = new Date();

			this.selectedDate = date;
			this.selectedDateString = this.dateToString(this.selectedDate);
			
			this.selectMonth(this.selectedDate);
		},
		dateToString: function(date) {
			return date.getFullYear() + "-" + this.toTwoDigits(date.getMonth() + 1) + "-" +  this.toTwoDigits(date.getDate())   ;
		},

		// Move the currently displayed month by a certain amount. This does *not* move the currently
		// selected date, so we end up viewing a month with no visibly selected date.
		moveMonthBy: function(amount) {
			var event = YLMF.getEvent();
			if(event){
				event.cancelBubble = true;
				event.stopPropagation && event.stopPropagation();
			}
			var newMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + amount, this.currentMonth.getDate());
			this.selectMonth(newMonth);
		},
		// Finds out the array index of a particular value in that array
		indexFor: function(array, value) {
			for (var i = 0; i < array.length; i++) {
			  if (value == array[i]) return i;
			};
		},
		// Finds the number of a given month name
		monthNum: function(month_name) {
			return this.indexFor(this.month_names, month_name);
		},

		// Finds the number of a given short month name
		shortMonthNum: function(month_name) {
			return this.indexFor(this.short_month_names, month_name);
		},

		// Finds the number of a given day name
		shortDayNum: function(day_name) {
			return this.indexFor(this.short_day_names, day_name);
		},
		toTwoDigits : function(nub){
			return nub < 10 ? "0" + nub : "" + nub;
		},
		selectMonth : function(date){
				
				
				var me = this;
				var newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
				
				if (!this.currentMonth || !(this.currentMonth.getFullYear() == newMonth.getFullYear() &&
								this.currentMonth.getMonth() == newMonth.getMonth())) {
					// We have moved to a different month and so need to re-draw the table
					this.currentMonth = newMonth;

					// Work out the range of days we will draw
					var rangeStart = this.rangeStart(date), rangeEnd = this.rangeEnd(date);
					var numDays = this.daysBetween(rangeStart, rangeEnd);
					while(this.tbody.el.firstChild)this.tbody.el.removeChild(this.tbody.el.firstChild);
					var dayRow = null;
					var dayCells = "";
					var _nowDateString = this.dateToString(new Date());
					// Draw each of the days
					for (var i = 0; i <= numDays; i++) {
					var currentDay = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate() + i, 12, 00);

					if (this.isFirstDayOfWeek(currentDay)) dayRow = this.tbody.el.insertRow(Math.floor(i/7));

					if (currentDay.getMonth() == date.getMonth()) {
						dayCells = dayRow.insertCell(Math.floor(i%7));
						dayCells.className = "selectable_day";
						dayCells.setAttribute("date",this.dateToString(currentDay));
						dayCells.appendChild(document.createTextNode(currentDay.getDate()));
					} else {
						dayCells = dayRow.insertCell(Math.floor(i%7));
						dayCells.className = "unselected_month";
						dayCells.setAttribute("date",this.dateToString(currentDay));
						dayCells.appendChild(document.createTextNode(currentDay.getDate()));
					};
					
					if(_nowDateString == this.dateToString(currentDay)){
						$(dayCells).addClass("today");
					}
				};
				this.monthNameSpan.el.innerText = this.monthName(date);
				this.yearNameSpan.el.innerText = this.currentMonth.getFullYear();
				$(".selectable_day", this.tbody.el).on("click",function(el){
					var _eve = YLMF.getEvent();
					me.changeInput($(_eve.target || _eve.srcElement).el.getAttribute("date"));
				});	
			};
			$('.selected', this.tbody.el).removeClass("selected");
			var _sDateString = this.selectedDateString
			$(".selectable_day",this.tbody.el).each(function(n,i){
				if(n.getAttribute("date") == _sDateString){
					$(n).addClass("selected");
				}
			});
			
		},
		hide: function() {
			
			this.rootLayers.style.display = "none";
			$([window, document.body]).unbind("click", this.hideIfClickOutside);
			this.input.bind("focus",this.show);
			$(document.body).unbind("keydown", this.keydownHandler);
		},
		// Write a date string to the input and hide. Trigger the change event so we know to update the
		// selectedDate.
		changeInput: function(dateString) { 
			
			this.input.el.value = dateString;
			this.selectDate();
			this.hide();
		},
		// We should hide the date selector if a click event happens outside of it
		hideIfClickOutside: function(event) {
			var target = event.target || event.srcElement;
			if (target != this.input.el && !this.insideSelector(event)) {
			  this.hide();
			};
		},
		// Returns true if the given event occurred inside the date selector
		insideSelector: function(event) {
			
			var offset = $(this.dateSelector).getRect();

			return event.clientY  < offset.bottom &&
				   event.clientY  > offset.top &&
				   event.clientX  < offset.right &&
				   event.clientX  > offset.left;
		},
		show: function() {
			
			this.rootLayers.style.display = "block";
			var me = this;
			$([window, document.body]).bind("click",this.hideIfClickOutside);
			this.input.unbind("focus", this.show);
			$(document.body).bind("keydown",this.keydownHandler);
			this.setPosition();
		},

		setPosition: function() {
			
			var offset = this.input.getRect();
			var rootOffset = $(this.rootLayers).getRect();
			
			if( this.align == "left"){
				$(this.rootLayers).setStyle("top",this.input.el.offsetTop + offset.height + "px");
				$(this.rootLayers).setStyle("left",this.input.el.offsetLeft + "px");
			}else{
				
				$(this.rootLayers).setStyle("top",this.input.el.offsetTop + offset.height + "px");
				$(this.rootLayers).setStyle("left",this.input.el.offsetLeft + offset.width - rootOffset.width + "px");
			}
			
			
			if (this.ieframe) {
				var _offset2 = $(this.dateSelector).getRect();
				//this.ieframe.style.width = ;
				this.ieframe.style.width = _offset2.width + "px";
				this.ieframe.style.height = _offset2.height + "px";
				//debugger;
				/*
				({
				width: this.dateSelector.offsetWidth(),
				height: this.dateSelector.offsetHeight()
				});*/
			};
		},
		// Works out the number of days between two dates
		daysBetween: function(start, end) {
			start = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
			end = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
			return (end - start) / 86400000;
		},
  
		  /*
		  changeDayTo: Given a date, move along the date line in the given direction until we reach the
		  desired day of week.
		  
		  The maths is a bit complex, here's an explanation.
		  
		  Think of a continuous repeating number line like:
		  
		  .. 5 6 0 1 2 3 4 5 6 0 1 2 3 4 5 6 0 1 ..
		  
		  We are essentially trying to find the difference between two numbers
		  on the line in one direction (dictated by the sign of direction variable).
		  Unfortunately Javascript's modulo operator works such that -5 % 7 = -5,
		  instead of -5 % 7 = 2, so we need to only work with the positives.
		  
		  To find the difference between 1 and 4, going backwards, we can treat 1
		  as (1 + 7) = 8, so the different is |8 - 4| = 4. If we don't cross the 
		  boundary between 0 and 6, for instance to find the backwards difference
		  between 5 and 2, |(5 + 7) - 2| = |12 - 2| = 10. And 10 % 7 = 3.
		  
		  Going forwards, to find the difference between 4 and 1, we again treat 1
		  as (1 + 7) = 8, and the difference is |4 - 8| = 4. If we don't cross the
		  boundary, the difference between 2 and 5 is |2 - (5 + 7)| = |2 - 12| = 10.
		  And 10 % 7 = 3.
		  
		  Once we have the positive difference in either direction represented as a
		  absolute value, we can multiply it by the direction variable to get the difference
		  in the desired direction.
		  
		  We can condense the two methods into a single equation:
		  
			backwardsDifference = direction * (|(currentDayNum + 7) - dayOfWeek| % 7)
								= direction * (|currentDayNum - dayOfWeek + 7|  % 7)
			
			 forwardsDifference = direction * (|currentDayNum - (dayOfWeek + 7)| % 7)
								= direction * (|currentDayNum - dayOfWeek - 7| % 7)
			
			(The two equations now differ only by the +/- 7)
			
					 difference = direction * (|currentDayNum - dayOfWeek - (direction * 7)| % 7)
		  */
		  changeDayTo: function(dayOfWeek, date, direction) {
			var difference = direction * (Math.abs(date.getDay() - dayOfWeek - (direction * 7)) % 7);
			return new Date(date.getFullYear(), date.getMonth(), date.getDate() + difference);
		  },
		  
		  // Given a date, return the day at the start of the week *before* this month
		  rangeStart: function(date) {
			return this.changeDayTo(this.start_of_week, new Date(date.getFullYear(), date.getMonth()), -1);
		  },
		  
		  // Given a date, return the day at the end of the week *after* this month
		  rangeEnd: function(date) {
			return this.changeDayTo((this.start_of_week - 1) % 7, new Date(date.getFullYear(), date.getMonth() + 1, 0), 1);
		  },
		  
		  // Is the given date the first day of the week?
		  isFirstDayOfWeek: function(date) {
			return date.getDay() == this.start_of_week;
		  },
		  
		  // Is the given date the last day of the week?
		  isLastDayOfWeek: function(date) {
			return date.getDay() == (this.start_of_week - 1) % 7;
		  },
		  
		  // Adjust a given array of day names to begin with the configured start-of-week
		  adjustDays: function(days) {
			var newDays = [];
			for (var i = 0; i < days.length; i++) {
			  newDays[i] = days[(i + this.start_of_week) % 7];
			};
			return newDays;
		  },
		  monthName: function(date) {
			return this.month_names[date.getMonth()];
		  },
		  // A hack to make "this" refer to this object instance when inside the given function
		  bindToObj: function(fn) {
			var self = this;
			return function() { return fn.apply(self, arguments) };
		  },
		  keydownHandler : function(){
			
		  },
		  // See above
		  bindMethodsToObj: function() {
			for (var i = 0; i < arguments.length; i++) {
				this[arguments[i]] = this.bindToObj(this[arguments[i]]);
			};
		  }
	}
	


	return DateInput;
})($); // End localisation of the $ function


new DateInput(document.getElementById("jp_today"));
new DateInput(document.getElementById("ht_today"),{ align : "right" });


/* 城市选择 */
;(function(){
	var hotelCities = {
		hot : ["北京", "上海", "广州", "深圳", "青岛", "大连", "杭州", "南京", "成都", "武汉", "重庆", "三亚", "厦门", "澳门", "香港"],
		A : ["阿坝", "阿克苏", "阿拉善盟", "阿勒泰", "安康", "安庆", "鞍山"],
		B : ["北京", "白银", "保定", "宝鸡", "包头", "北海", "本溪"],
		C : ["长春", "常德", "长沙", "常州", "巢湖", "潮州", "承德", "成都", "重庆"],
		D : ["大理", "大连", "丹东", "大庆", "大同", "大兴安岭", "达州", "德阳", "德州", "东莞"],
		E : ["鄂尔多斯", "恩施自治州", "鄂州"],
		F : ["防城港", "佛山", "抚顺", "阜新", "福州"],
		G : ["赣州", "广元", "广州", "桂林", "贵阳"],
		H : ["杭州", "哈尔滨", "海口", "哈密", "邯郸", "汉中", "合肥", "衡阳", "黄山", "呼和浩特", "呼伦贝尔", "湖州"],
		J : ["佳木斯", "嘉兴", "嘉峪关", "济南", "景德镇", "金华", "济宁", "九江", "酒泉"],
		K : ["开封", "喀什", "克拉玛依", "昆明"],
		L : ["廊坊", "兰州", "拉萨", "乐山", "凉山", "连云港", "丽江", "丽水", "洛阳"],
		M : ["马鞍山", "梅州", "绵阳", "牡丹江"],
		N : ["南昌", "南充", "南京", "南宁", "南平", "南通", "宁波"],
		P : ["攀枝花", "平顶山", "萍乡", "莆田"],
		Q : ["青岛", "秦皇岛", "钦州", "琼海", "齐齐哈尔", "泉州", "衢州"],
		R : ["日喀则", "日照"],
		S : ["上海", "深圳", "三门峡", "汕头", "韶关", "绍兴", "沈阳", "石河子", "石家庄", "十堰"],
		T : ["天津", "泰安", "太原", "唐山", "天水", "铁岭", "吐鲁番"],
		W : ["威海", "温州", "武汉", "乌鲁木齐", "无锡"],
		X : ["厦门", "西安", "湘潭", "湘西", "咸阳", "西双版纳", "徐州"],
		Y : ["雅安", "延安", "延边", "扬州", "烟台", "伊犁", "银川", "岳阳"],
		Z : ["张家界", "张家口", "漳州", "湛江", "肇庆", "郑州", "镇江", "舟山", "珠海", "株洲"]
	}
	var flyCities = {
		hot : ["上海", "北京", "广州", "昆明", "西安", "成都", "深圳", "厦门", "乌鲁木齐", "南京", "重庆", "杭州", "大连", "长沙", "海口", "哈尔滨", "青岛", "沈阳", "三亚", "济南", "武汉", "郑州", "贵阳", "南宁", "福州", "天津", "长春", "太原", "南昌", "丽江"],
		A : ["阿里", "阿尔山", "安庆", "阿勒泰", "安康", "鞍山", "安顺", "阿克苏"],
		B : ["包头", "北海", "北京", "百色", "保山", "博乐", "毕节", "巴彦淖尔"],
		C : ["长治", "池州", "长春", "常州", "昌都", "朝阳", "常德", "长白山", "成都", "重庆", "长沙", "赤峰"],
		D : ["大同", "大连", "东营", "大庆", "丹东", "大理", "敦煌", "达州", "稻城"],
		E : ["恩施", "鄂尔多斯", "二连浩特"],
		F : ["佛山", "福州", "阜阳"],
		G : ["贵阳", "桂林", "广州", "广元", "格尔木", "赣州", "固原"],
		H : ["哈密", "呼和浩特", "黑河", "海拉尔", "哈尔滨", "海口", "黄山", "杭州", "邯郸", "合肥", "黄龙", "汉中", "和田", "淮安"],
		J : ["鸡西", "晋江", "锦州", "景德镇", "嘉峪关", "井冈山", "济宁", "九江", "佳木斯", "济南", "加格达奇", "金昌"],
		K : ["喀什", "昆明", "康定", "克拉玛依", "库尔勒", "库车", "喀纳斯", "凯里"],
		L : ["兰州", "洛阳", "丽江", "荔波", "林芝", "柳州", "泸州", "连云港", "黎平", "连城", "拉萨", "临沧", "临沂"],
		M : ["芒市", "牡丹江", "满洲里", "绵阳", "梅县", "漠河"],
		N : ["南京", "南充", "南宁", "南阳", "南通", "南昌", "那拉提", "宁波"],
		P : ["攀枝花"],
		Q : ["衢州", "黔江", "秦皇岛", "庆阳", "且末", "齐齐哈尔", "青岛"],
		R : ["日喀则"],
		S : ["汕头", "深圳", "石家庄", "三亚", "沈阳", "上海", "思茅"],
		T : ["唐山", "铜仁", "塔城", "腾冲", "台州", "天水", "天津", "通辽", "吐鲁番", "太原"],
		W : ["威海", "武汉", "梧州", "文山", "无锡", "潍坊", "武夷山", "乌兰浩特", "温州", "乌鲁木齐", "万州", "乌海"],
		X : ["兴义", "西昌", "厦门", "香格里拉", "西安", "西宁", "襄阳(中国)", "锡林浩特", "西双版纳", "徐州"],
		Y : ["义乌", "永州", "榆林", "扬州", "延安", "运城", "烟台", "银川", "宜昌", "宜宾", "宜春", "盐城", "延吉", "玉树", "伊宁", "伊春"],
		Z : ["珠海", "昭通", "张家界", "舟山", "郑州", "中卫", "芷江", "湛江", "遵义", "张掖", "张家口"]
	}
	
	function CityInput(el, opts){
		if(!opts)opts = {};
		this.op = {};
		YLMF._extend(this.op, DateInput.DEFAULT_OPTS);
		YLMF._extend(this.op, opts);

		var me = this;

		this.input = $(el);
		this.inited = false;
		this.showed = false;
		this.hideTimmer = null;
		this.city_list = hotelCities;
		if(this.op.city_type == "fly"){
			this.city_list = flyCities;
		}

		//this.init();
		this.input.bind("focus",function(){
			if(!me.inited){
				me.init();
				me.show();
				window.setTimeout(function(){
					$(me.wrap).addClass("animate");	;
				},1);
			}else{
				me.show();
			}
		});
		this.input.bind("blur",function(){

			window.clearTimeout(me.hideTimmer);
			me.hideTimmer = window.setTimeout(function(){
				me.hide();
			},10);
		});
		

	}
	
	CityInput.DEFAULT_OPTS = {
	   city_type : "hotel"
	};

	CityInput.prototype = {
		build : function (){
			
		},
		init : function (){
			var me = this;
			this.wrap = document.createElement("div");
			this.wrap.className = "city_selecter";
			this.tilRow = document.createElement("div");
			this.tilRow.className = "city_til";
			this.tilRow.innerHTML = "<span class='city_til_txt'>城市选择</span><span class='city_close'>X</span>";
			this.wrap.appendChild(this.tilRow);
			
			this.tabHead = document.createElement("div");
			this.tabHead.className = "city_tab clearfix";
			this.tabHead.innerHTML = "<span class='city_tab_item active' data='hot'>热门</span>" 
				+ "<span class='city_tab_item ' data='ABCDE'>ABCDE</span>"
				+ "<span class='city_tab_item ' data='FGHJ'>FGHJ</span>"
				+ "<span class='city_tab_item ' data='KLMNP'>KLMNP</span>"
				+ "<span class='city_tab_item ' data='QRSTW'>QRSTW</span>"
				+ "<span class='city_tab_item ' data='XYZ'>XYZ</span>";
			this.tabCon = document.createElement("div");
			this.tabCon.className = "city_con";
			
			var _hots = document.createElement("div");
			var _strs = "<ul>";
			YLMF.each(me.city_list.hot,function(i,n){
				_strs += "<li><a class='city_name_item' data-name='" + n + "' href='javascript:void(0)'>" + n + "</a></li>";
			});
			_strs += "</ul>";
			_hots.innerHTML = _strs;
			_hots.className = "city_con_item city_hots";
			this.wrap.appendChild(this.tabHead);
			this.wrap.appendChild(this.tabCon);
			this.tabCon.appendChild(_hots);
			document.body.appendChild(this.wrap);
			

			var _data = ["ABCDE","FGHJ","KLMNP","QRSTW","XYZ"];
			YLMF.each(_data,function(i,n){
				var _p = document.createElement("div");
				_p.className = "city_con_item";
				var _strs = "";
				for(var i = 0;i<n.length;i++){
					var _w  = n.charAt(i);
					_strs  += "<div class='city_grounp' ><span class='city_zimu'>" + _w + "</span>";
					YLMF.each(me.city_list[_w],function(i,n){
						_strs += "<a class='city_name_item' data-name='" + n + "' href='javascript:void(0)'>" + n + "</a>";
					});
					_strs += "</div>";
				}
				_p.innerHTML = _strs;
				me.tabCon.appendChild(_p);
			});
			$(this.wrap).bind("mousedown",function(){
				var event = YLMF.getEvent();
				var _target = event.target || event.srcElement;
				var _e = $(_target);
				if(_e.hasClass("city_name_item")){
					me.input.el.value = _target.getAttribute("data-name");
				}else{
					if(_e.hasClass("city_tab_item")){
						var _span = $(me.tabHead).find("span");
						var i = _span.index(_e);
						_span.removeClass("active");
						_e.addClass("active");
						$(".city_con_item",me.tabCon).hide().eq(i).show();
					}else if(_e.hasClass("city_close")){
						window.clearTimeout(me.hideTimmer);
						me.hide();
						return;
					}
					window.setTimeout(function(){
						window.clearTimeout(me.hideTimmer);
						me.input.el.select();
					},0);
				}
			});
			this.inited = true;
		},
		show : function(){
			var me = this;
			if(!this.showrd){
				$(this.wrap).show();
				this.setPosition();
				this._setPosition = function(){
					me.setPosition();
				}
				YLMF.addListener({
					resize : me._setPosition
				});
				this.showed = true;
			}
		},
		hide : function(){	
			$(this.wrap).hide();
			YLMF.removeListener({
				resize : this._setPosition
			})
			this.showed = false;
		},
		setPosition : function(){

			var _inpOffset = this.input.getRect();
			var _top = document.documentElement.scrollTop || document.body.scrollTop;
			var _left = document.documentElement.scrollLeft || document.body.scrollLeft;
			var _width = document.documentElement.clientWidth || document.body.clientWidth;
			var _wrap = $(this.wrap);
			var _wrapOffseet = _wrap.getRect();
			var _bodyOffset = $(document.body).getRect();
			var _container = $($("#wrap").findChild(".container")).getRect();
			if(this.showed){
				if(!$(this.wrap).hasClass("animate")){
					$(this.wrap).addClass("animate");
				}
			}else{
				$(this.wrap).removeClass("animate");
			}
			/*
			if(_inpOffset.left + _wrapOffseet.width >= _width && true){
				$(this.wrap).setStyle("left",_inpOffset.right -_bodyOffset.left - _wrapOffseet.width + "px");
			}else{
				$(this.wrap).setStyle("left",_inpOffset.left -_bodyOffset.left  + "px");
			}*/
			$(this.wrap).setStyle("left",_container.right -_bodyOffset.left - _wrapOffseet.width + "px");
			$(this.wrap).setStyle("top",_inpOffset.top - _bodyOffset.top - _wrapOffseet.height  + "px");
			
		}
	}
	var _ids = ["jP_startCity","jP_toCity","ht_city","daodao_travel_q","daodao_travel_k"];
	var _city_types = ["fly","fly","hotel","hotel","hotel"];
	for(var iz=0;iz<_ids.length;iz++){
		new CityInput(document.getElementById(_ids[iz]),{ city_type : _city_types[iz]});
	}
	/*
	new CityInput(document.getElementById("jP_startCity"),{ city_type : "fly"});
	new CityInput(document.getElementById("jP_toCity"),{ city_type : "fly"});
	new CityInput(document.getElementById("ht_city"),{ city_type : "hotel"});
	new CityInput(document.getElementById("daodao_travel_q"),{ city_type : "hotel"});
	new CityInput(document.getElementById("daodao_travel_k"),{ city_type : "hotel"});
	*/
})();