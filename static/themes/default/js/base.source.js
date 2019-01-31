/**
 * ==========================================
 * base.js
 * Copyright (c) 2010 wwww.114la.com
 * ==========================================
 */

var mini = (function () { var b = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig, g = /^(?:[\w\-_]+)?\.([\w\-_]+)/, f = /^(?:[\w\-_]+)?#([\w\-_]+)/, j = /^([\w\*\-_]+)/, h = [null, null]; function d(o, m) { m = m || document; var k = /^[\w\-_#]+$/.test(o); if (!k && m.querySelectorAll) { return c(m.querySelectorAll(o)); } if (o.indexOf(",") > -1) { var v = o.split(/,/g), t = [], s = 0, r = v.length; for (; s < r; ++s) { t = t.concat(d(v[s], m)); } return e(t); } var p = o.match(b), n = p.pop(), l = (n.match(f) || h)[1], u = !l && (n.match(g) || h)[1], w = !l && (n.match(j) || h)[1], q; if (u && !w && m.getElementsByClassName) { q = c(m.getElementsByClassName(u)); } else { q = !l && c(m.getElementsByTagName(w || "*")); if (u) { q = i(q, "className", RegExp("(^|\\s)" + u + "(\\s|$)")); } if (l) { var x = m.getElementById(l); return x ? [x] : []; } } return p[0] && q[0] ? a(p, q) : q; } function c(o) { try { return Array.prototype.slice.call(o); } catch (n) { var l = [], m = 0, k = o.length; for (; m < k; ++m) { l[m] = o[m]; } return l; } } function a(w, p, n) { var q = w.pop(); if (q === ">") { return a(w, p, true); } var s = [], k = -1, l = (q.match(f) || h)[1], t = !l && (q.match(g) || h)[1], v = !l && (q.match(j) || h)[1], u = -1, m, x, o; v = v && v.toLowerCase(); while ((m = p[++u])) { x = m.parentNode; do { o = !v || v === "*" || v === x.nodeName.toLowerCase(); o = o && (!l || x.id === l); o = o && (!t || RegExp("(^|\\s)" + t + "(\\s|$)").test(x.className)); if (n || o) { break; } } while ((x = x.parentNode)); if (o) { s[++k] = m; } } return w[0] && s[0] ? a(w, s) : s; } var e = (function () { var k = +new Date(); var l = (function () { var m = 1; return function (p) { var o = p[k], n = m++; if (!o) { p[k] = n; return true; } return false; }; })(); return function (m) { var s = m.length, n = [], q = -1, o = 0, p; for (; o < s; ++o) { p = m[o]; if (l(p)) { n[++q] = p; } } k += 1; return n; }; })(); function i(q, k, p) { var m = -1, o, n = -1, l = []; while ((o = q[++m])) { if (p.test(o[k])) { l[++n] = o; } } return l; } return d; })();


if (typeof Ylmf === 'undefined') {
    var Ylmf = {};
}

Function.prototype.method = function (name, fn) {
    this.prototype[name] = fn;
    return this;
};
if (!Array.prototype.forEach) {
    Array.method('forEach', function (fn, thisObj) {
        var scope = thisObj || window;
        for (var i = 0,j = this.length; i < j; ++i) {
            fn.call(scope, this[i], i, this);
        }
    }).method('every',
    function (fn, thisObj) {
        var scope = thisObj || window;
        for (var i = 0,
        j = this.length; i < j; ++i) {
            if (!fn.call(scope, this[i], i, this)) {
                return false;
            }
        }
        return true;
    }).method('some',
    function (fn, thisObj) {
        var scope = thisObj || window;
        for (var i = 0,
        j = this.length; i < j; ++i) {
            if (fn.call(scope, this[i], i, this)) {
                return true;
            }
        }
        return false;
    }).method('map',
    function (fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for (var i = 0,
        j = this.length; i < j; ++i) {
            a.push(fn.call(scope, this[i], i, this));
        }
        return a;
    }).method('filter',
    function (fn, thisObj) {
        var scope = thisObj || window;
        var a = [];
        for (var i = 0,
        j = this.length; i < j; ++i) {
            if (!fn.call(scope, this[i], i, this)) {
                continue;
            }
            a.push(this[i]);
        }
        return a;
    }).method('indexOf',
    function (el, start) {
        var start = start || 0;
        for (var i = start,
        j = this.length; i < j; ++i) {
            if (this[i] === el) {
                return i;
            }
        }
        return -1;
    }).method('lastIndexOf',
    function (el, start) {
        var start = start || this.length;
        if (start >= this.length) {
            start = this.length;
        }
        if (start < 0) {
            start = this.length + start;
        }
        for (var i = start; i >= 0; --i) {
            if (this[i] === el) {
                return i;
            }
        }
        return -1;
    });
}

(function() {
	/**
	/* 来自 http://www.iteye.com/topic/517899
	/* 
	/*
	
	function addEvent(obj,evtype,fn,useCapture) {  
		if (obj.addEventListener) {//优先考虑W3C事件注册方案  
			obj.addEventListener(evtype,fn,!!useCapture);  
		} else {//当不支持addEventListener时(IE),由于IE同时也不支持捕获,所以不如使用传统事件绑定  
			if (!fn.__EventID) {fn.__EventID = addEvent.__EventHandlesCounter++;}  
			//为每个事件处理函数分配一个唯一的ID  
			  
			if (!obj.__EventHandles) {obj.__EventHandles={};}  
			//__EventHandles属性用来保存所有事件处理函数的引用  
			  
			//按事件类型分类  
			if (!obj.__EventHandles[evtype]) {//第一次注册某事件时  
				obj.__EventHandles[evtype]={};  
				if (obj["on"+evtype]) {//以前曾用传统方式注册过事件处理函数  
					(obj.__EventHandles[evtype][0]=obj["on"+evtype]).__EventID=0;//添加到预留的0位  
					//并且给原来的事件处理函数增加一个ID  
				}  
				obj["on"+evtype]=addEvent.execEventHandles;  
				//当事件发生时，execEventHandles遍历表obj.__EventHandles[evtype]并执行其中的函数  
			}  
		}  
	}  
	addEvent.__EventHandlesCounter=1;//计数器,0位预留它用  
	addEvent.execEventHandles = function (evt) {//遍历所有的事件处理函数并执行  
		if (!this.__EventHandles) {return true;}  
		evt = evt || window.event;  
		var fns = this.__EventHandles[evt.type];  
		for (var i in fns) {  
				fns[i].call(this);  
		}  
	};  
	function delEvent(obj,evtype,fn,useCapture) {  
		if (obj.removeEventListener) {//先使用W3C的方法移除事件处理函数  
			obj.removeEventListener(evtype,fn,!!useCapture);  
		} else {  
			if (obj.__EventHandles) {  
				var fns = obj.__EventHandles[evtype];  
				if (fns) {delete fns[fn.__EventID];}  
			}  
		}  
	}  **/


    Ylmf.register = function(REG) {
		function __$(el,context){
			if(typeof el=="string"){
				var elArr =  mini(el,context);
				if(!elArr||elArr=="" || typeof(elArr) == "undefined"=="undefined"){
					//alert("No $!");
					return false;
				}
				if(elArr.length==1){
					this.el = elArr[0];
				}else if(elArr.length>1){
					this.el = elArr;
				}
			}else if(el.nodeType ==1){
				this.el = el;
			}else if(YLMF.isArray(el)){
				if(el.length==1){
					this.el = el[0];
				}else if(el.length>1){
					this.el = el;
				}
			}else if(el == window){
				this.el = el;
			}
			 
		};
        __$.method(REG.each,function(fn){
			if(!this.el){
			//	fn.call(this,false);
				return
			}						 
			if(!this.el.length){
				fn.call(this,this.el);
			}else{			 
				for(var i= 0,len = this.el.length; i<len; ++i){
					fn.call(this,this.el[i],i);
				}
			}
			return this;
		}).method(REG.hasClass, function(c,fn){	
			if(fn){
				this.each(function(el){
					var col = el.className.split(/\s+/).toString();
					var result = (col.indexOf(c)>-1)?true:false;
					(function(){
						fn(result);	  
					})();
				});
				return this;
			}else if(this.size() == 1){
				var col = this.el.className.split(/\s+/).toString();
				return (col.indexOf(c)>-1)?true:false;
			}
		}).method(REG.addClass, function(classNames){	
		
			this.each(function(el){
				var col = (classNames || "").split(/\s+/);
				for(var i = 0; i < col.length; i++){
					var item = col[i];
					this.hasClass(el,function(b){
						if(!b){
							el.className += (el.className ? " " : "") + item;
						}
					
					})
				}
			});
			return this;
		}).method(REG.removeClass, function(c){	
			this.each(function(el){
				if(c != undefined){
					var col = el.className.split(/\s+/);
					var hasCol = [];
					for(var i =0,len = col.length;i<len;++i){
						var item = col[i];
						
						if(item!=c){
							hasCol.push(item);
						}					
						
					}
					
					el.className = hasCol.join(" ");
				}else{
					el.className = "";
				}

	
			});
			return this;
		}).method(REG.replaceClass, function(oc,nc){
			this.removeClass(oc);
			this.addClass(nc);
			return this;
		}).method(REG.setStyle, function(prop,val){	
			 switch (prop) {
				case 'opacity':
					this.each(function(el){
						 if(document.all){  //IE
							el.style.filter = 'alpha(opacity=' + val * 100 + ')';
						}else{             //FF

							el.style[prop] = val;
						}
					})
					break;
				default:
					this.each(function(el){
						el.style[prop] = val;
					});
					break;
			  };
			
			return this;
		}).method(REG.setCSS, function(styles) {
            for(var prop in styles){
				if(!styles.hasOwnProperty(prop)) continue;
				this.setStyle(prop,styles[prop]);
			}
            return this;
			
        }).method(REG.getStyle,function(prop,fn){

				var elem = this.el,
					attr = prop;

				if(elem.style[attr]){
					//若样式存在于html中,优先获取
					return elem.style[attr];
				}else if(elem.currentStyle){
					//IE下获取CSS属性最终样式(同于CSS优先级)
					return elem.currentStyle[attr];
				}else if(document.defaultView && document.defaultView.getComputedStyle){
					//W3C标准方法获取CSS属性最终样式(同于CSS优先级)
					//注意,此法属性原格式(text-align)获取的,故要转换一下
					attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
					//获取样式对象并获取属性值
					return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
				}else{
					return null;
				}
				/*
				var currentStyle = null;
				debugger;
				if(document.defaultView){// firefox,opera,safari
					currentStyle =  document.defaultView.getComputedStyle(this.el,null).getPropertyValue(prop);
				} else {//ie
					prop=prop.replace(/\-([a-z])([a-z]?)/ig,function(prop,a,b){return a.toUpperCase()+b.toLowerCase();});//转化为驼峰写法
					currentStyle =  this.el["currentStyle"][prop];
				}
				if(fn){
					fn.call(this,currentStyle);
				}else{
					return currentStyle;
				}
				return this;*/	
		}).method(REG.show,function(n){
			if(n==0){
				this.setStyle("display","");
			}else if(n==1){
				this.setStyle("display","");
			}else{
				this.setStyle("display","block");
			}
			return this;
		}).method(REG.hide,function(){
			this.each(function(el){
				el.style.display= "none";
			})
			return this;
		}).method(REG.toggle,function(t){
			this.each(function(el){
				if(el.style.display =="none"){
					if(t){
						t==1?el.style.display= "inline":el.style.display= ""
					}else{
						el.style.display= "block";
					}
					
				}else{
					el.style.display="block";
				}
			});
			return this;
		}).method(REG.on,function(type,fn){
			var add = function(el){
				var f = function(){
					fn(el)
				};
				if(window.addEventListener){
					el.addEventListener(type,f,false);
				}else if(window.attachEvent){
					el.attachEvent('on'+type,f);
				}	
			}
			if(!this.el){
				return;
			}
			
			if(this.el.length==0){
				add(this.el);
			}else{
				this.each(function(el){
					add(el);
				});
			}
			return this;
		}).method("bind",function(type,fn){
			var add = function(el){
				if(window.addEventListener){
					el.addEventListener(type,fn,false);
				}else if(window.attachEvent){
					el.attachEvent('on'+type,fn);
				}	
			}
			if(this.el.length==0){
				add(this.el);
			}else{
				this.each(function(el){
					add(el);
				});
			}
		}).method("unbind",function(type,fn){
			var del = function(el){
				if(window.removeEventListener){
					el.removeEventListener(type,fn,false);
				}else if(window.detachEvent){
					el.detachEvent('on'+type,fn);
				}
			}
			
			if(this.el.length==0){
				del(this.el);
			}else{
				this.each(function(el){
					del(el);
				});
			}
		}).method(REG.getRect,function(fn){
			var _oRect = this.el.getBoundingClientRect(),
				oRect = {
					left : _oRect.left,
					top : _oRect.top,
					bottom : _oRect.bottom,
					right : _oRect.right,
					width : _oRect.width ||  Math.abs(_oRect.left - _oRect.right),
					height : _oRect.height ||  Math.abs(_oRect.top - _oRect.bottom)
				}
			if(fn){
				fn.call(this,oRect);
			}else{
				return oRect;
			}
			return this;
		}).method(REG.create,function(el,o,cb){
			var el = document.createElement(el);
            for ( prop in o ) {
                el.setAttribute(prop, o[prop]);
            }
            if (cb) {
                cb.call(this, el);
            }
			
			return this;
		}).method(REG.append,function(element){
			this.el.appendChild(element);
			return this;
		}).method(REG.remove,function(element){
			if(element){
				this.el.removeChild(element);
			}
			return this;
		}).method(REG.size,function(){
			return this.el ? (this.el.length || 1) : 0;
		}).method(REG.slice,function(start,end){
			return new __$(this.el.slice(start,end));
		}).method(REG.get,function(n){
			
			try{
				if(this.el.length){
					return this.el[n];
				}else{
					return this.el;
				}
				
			}catch(e){
				return this.el;
			}
		}).method("eq",function(n){
			if(YLMF.isArray(this.el)){
				return new __$(this.el[n]);
			}else if(n == 0){
				return this;
			}
		}).method("html",function(h){
			if(typeof h ==  "string"){
				this.each(function(el){
					el.innerHTML = h;
				})
			}
		}).method("getOuterWidth",function(n){
			
			var oRect = this.getRect();
			
			var _marginL = parseInt(this.getStyle("margin-left"),10) || 0,
				_marginR = parseInt(this.getStyle("margin-right"),10) || 0;
			return oRect.width + _marginL  + _marginR;
		}).method("hover",function(overCallback, outCallback){
			var isHover = false;
			var preOvTime = new Date().getTime();
			function over(el) {
				var curOvTime = new Date().getTime();
				isHover = true;
				if (curOvTime - preOvTime > 10)
				 {
					setTimeout(function() {
						overCallback(el);
					},10);
				}
				preOvTime = curOvTime;
			}
			function out(el)
			 {
				var curOvTime = new Date().getTime();
				preOvTime = curOvTime;
				isHover = false;
				setTimeout(function() {
					if (!isHover)
					 {
						outCallback(el);
					}
				},
				10);
			}
			this.on("mouseover", over);
			this.on("mouseout", out);
		}).method("findChild", function(c){	
			if(c && c.charAt(0) == "."){
				var childs  = this.get(0).childNodes,
					l = childs.length,
					result = [];
				for(var i = 0;i< l; i++){
					if(childs[i].nodeType != 3 && $(childs[i]).hasClass(c.slice(1))){
						result.push(childs[i]);
					}
				}
				return result;
			}else{
				var childs  = this.get(0).childNodes,
					l = childs.length,
					result = [];
				for(var i = 0;i< l; i++){
					if(childs[i].nodeType != 3 && childs[i].tagName.toUpperCase() == c.toUpperCase()){
						result.push(childs[i]);
					}
				}
				return result;
			}
		}).method("index",function(subEl){
			var _el = subEl.el || subEl;
			if(this.el.length){
				var _i = this.el.length;
				for(var i = 0 ; i < _i; i++){
					if(_el == this.el[i]){
						return i;
					}
				}
			}else{
				return _el == this.el ? 0 : -1;
			}
		}).method("find",function(Str){
			var res = [];
			this.each(function(el){
				res =  res.concat(mini(Str,el));
			});
			return new __$(res);
		});
        
        window[REG.namespace] = function(el,context) {
            return new __$(el,context);
        };
        // sugar array shortcuts
        window[REG.namespace].forEach = Array.prototype.forEach;
        window[REG.namespace].every = Array.prototype.every;
        window[REG.namespace].some = Array.prototype.some;
        window[REG.namespace].map = Array.prototype.map;
        window[REG.namespace].filter = Array.prototype.filter;
				
        Ylmf.extendChain = function(name, fn) {
            __$.method(name, fn);
        };
    };
})();


Ylmf.register({
    namespace:'$',
	each:'each',
	addClass:'addClass',
	hasClass:'hasClass',
	removeClass:'removeClass',
	replaceClass:'replaceClass',
	setStyle:'setStyle',
	getStyle:'getStyle',
	setCSS:'setCSS',
	show:'show',
	hide:'hide',
	toggle:'toggle',
	on:'on',
	getRect:'getRect',
	append:'append',
	create:'create',
	remove:'remove',
	size:'size',
	get:'get',
	slice : "slice",
	hover : "hover"
});
var Yl = {
    getHost: function (A) {
        var _ = A || location.host,
    	$ = _.indexOf(":");
        return ($ == -1) ? _ : _.substring(0, $)
    },
    getFocus: function (el) {
        var txt = el.createTextRange();
        txt.moveStart('character', el.value.length);
        txt.collapse(true);
        txt.select();
    },
    loadFrame: function (iframe, callback) {
        if (Browser.isIE) {  //ie
            iframe.onreadystatechange = function () {
                callback();
            };
        } else { //w3c
            iframe.onload = function () {
                callback();
            };
        }
    },
    trim: function ($) {
        $ = $.replace(/(^\u3000+)|(\u3000+$)/g, "");
        $ = $.replace(/(^ +)|( +$)/g, "");
        return $
    },
	/*
    encodeText: function ($) {
        $ = $.replace(/</g, "&lt;");
        $ = $.replace(/>/g, "&gt;");
        $ = $.replace(/\'/g, "&#39;");
        $ = $.replace(/\"/g, "&#34;");
        $ = $.replace(/\\/g, "&#92;");
        $ = $.replace(/\[/g, "&#91;");
        $ = $.replace(/\]/g, "&#93;");
        return $
    },

    decodeHtml: function ($) {
        $ = $.replace(/&lt;/g, "<");
        $ = $.replace(/&gt;/g, ">");
        $ = $.replace(/&#39;/g, "'");
        $ = $.replace(/&#34;/g, '"');
        $ = $.replace(/&#92;/g, "\\");
        $ = $.replace(/&#91;/g, "[");
        $ = $.replace(/\&#93;/g, "]");
        return $
    },
    createFrame: function (o) {
        if (!o || !o.src) { return }
        var s = o.src,
		w = o.width || "100%",
		h = o.height || "100%",
		Frame = format('<iframe src="#{src}" width="#{width}" height="#{height}" scrolling="no" frameborder="0" allowtransparency="true"></iframe>', {
		    src: s,
		    width: w,
		    height: h
		})
        return Frame;
    },*/
    getType: function (o) {
        var _t; return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
    },

    setStyle: function (A, $) {
        var _ = document.styleSheets[0];
        if (_.addRule) {
            A = A.split(",");
            for (var C = 0,
			B = A.length; C < B; C++) _.addRule(A[C], $)
        } else if (_.insertRule) _.insertRule(A + " { " + $ + " }", _.cssRules.length)
    },

    addFav: function (title) {
        var title = title || document.getElementsByTagName("title")[0].innerHTML;
        if (document.all) {
            window.external.AddFavorite(location.href, title);
        } else if (window.sidebar) {
            window.sidebar.addPanel(title, location.href, "");
        } else if (window.opera && window.print) {
            return true;
        }
    },
    setHome: function (c,a){
		if(!Browser.isIE){
			//alert("\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u81ea\u52a8\u8bbe\u7f6e\u4e3b\u9875\uff0c\u8bf7\u4f7f\u7528\u6d4f\u89c8\u5668\u83dc\u5355\u624b\u52a8\u8bbe\u7f6e\u3002");
			 window.open("http://www.114la.com/repair/setbrowser.html");
			return
		}
		var b=a;if(!b){b=window.location.href}c.style.behavior="url(#default#homepage)";c.setHomePage(b)
	} 

},
Browser = (function () {
    var H = navigator.userAgent,
		F = 0,
		E = 0,
		I = 0,
		D = 0,
		A = 0,
		_ = 0,
		C = 0,
		B;
    if (H.indexOf("Chrome") > -1 && /Chrome\/(\d+(\.d+)?)/.test(H)) C = RegExp.$1;
    if (H.indexOf("Safari") > -1 && /Version\/(\d+(\.\d+)?)/.test(H)) F = RegExp.$1;
    if (window.opera && /Opera(\s|\/)(\d+(\.\d+)?)/.test(H)) I = RegExp.$2;
    if (H.indexOf("Gecko") > -1 && H.indexOf("KHTML") == -1 && /rv\:(\d+(\.\d+)?)/.test(H)) A = RegExp.$1;
    if (/MSIE (\d+(\.\d+)?)/.test(H)) D = RegExp.$1;
    if (/Firefox(\s|\/)(\d+(\.\d+)?)/.test(H)) _ = RegExp.$2;
    if (H.indexOf("KHTML") > -1 && /AppleWebKit\/([^\s]*)/.test(H)) E = RegExp.$1;
    try {
        B = !!external.max_version
    } catch ($) { }
    function G() {
        var _ = false;
        if (navigator.plugins) for (var B = 0; B < navigator.plugins.length; B++) if (navigator.plugins[B].name.toLowerCase().indexOf("shockwave flash") >= 0) _ = true;
        if (!_) {
            try {
                var $ = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if ($) _ = true
            } catch (A) {
                _ = false
            }
        }
        return _
    }
    return ({
        isStrict: document.compatMode == "CSS1Compat",
        isChrome: C,
        isSafari: F,
        isWebkit: E,
        isOpera: I,
        isGecko: A,
        isIE: D,
        isFF: _,
        isMaxthon: B,
        isFlash: G(),
        isCookie: (navigator.cookieEnabled) ? true : false
    })
})(),
Cookie = {
    set: function (name, value, expires, path, domain) {
        if (typeof expires == "undefined") {
            expires = new Date(new Date().getTime() + 1000 * 3600 * 24 * 365);
        }

        document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");

    },
    get: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    },
    clear: function (name, path, domain) {
        if (this.get(name)) {
            document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    }
};
/**
 * 执行基本ajax请求,返回XMLHttpRequest
 * Ajax.request(url,{
 *      async   是否异步 true(默认)
 *      method  请求方式 POST or GET(默认)
 *      data    请求参数 (键值对字符串)
 *      success 请求成功后响应函数，参数为xhr
 *      failure 请求失败后响应函数，参数为xhr
 * });
 *
 */
Ajax = function(){
    function request(url,opt){
        function fn(){}
        var async   = opt.async !== false,
            method  = opt.method    || 'GET',
            data    = opt.data      || null,
            success = opt.success   || fn,
            failure = opt.failure   || fn;
            method  = method.toUpperCase();
        if(method == 'GET' && data){
            url += (url.indexOf('?') == -1 ? '?' : '&') + data;
            data = null;
        }
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = function(){
            _onStateChange(xhr,success,failure);
        };
        xhr.open(method,url,async);
        if(method == 'POST'){
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
        }
        xhr.send(data);
        return xhr; 
    }
    function _onStateChange(xhr,success,failure){
        if(xhr.readyState == 4){
            var s = xhr.status;
            if(s>= 200 && s < 300){
                success(xhr);
            }else{
                failure(xhr);
            }
        }else{}
    }
    return {request:request};   
}();

cache = (function () {
    var cacheBox = {};
    function _get(name) {
        if (cacheBox[name]) return cacheBox[name];
        return null
    }
    function _set(name, value, A) {
        if (!A) { cacheBox[name] = value; }
        else {
            if (Yl.getType(cacheBox[name]) != "array") { cacheBox[name] = []; }
            cacheBox[name].push(value)
        }
    }
    function _remove(name) {
        delete cacheBox[name]
    }
    function _is(name) {
        return (_get(name) == null) ? false : true
    }
    return {
        get: _get,
        set: _set,
        is: _is,
        remove: _remove
    }
})();
format = function (_, B) {
    if (arguments.length > 1) {
        var F = format,
        H = /([.*+?^=!:${}()|[\]\/\\])/g,
        C = (F.left_delimiter || "{").replace(H, "\\$1"),
        A = (F.right_delimiter || "}").replace(H, "\\$1"),
        E = F._r1 || (F._r1 = new RegExp("#" + C + "([^" + C + A + "]+)" + A, "g")),
        G = F._r2 || (F._r2 = new RegExp("#" + C + "(\\d+)" + A, "g"));
        if (typeof (B) == "object") return _.replace(E,
        function (_, A) {
            var $ = B[A];
            if (typeof $ == "function") $ = $(A);
            return typeof ($) == "undefined" ? "" : $
        });
        else if (typeof (B) != "undefined") {
            var D = Array.prototype.slice.call(arguments, 1),
            $ = D.length;
            return _.replace(G,
            function (A, _) {
                _ = parseInt(_, 10);
                return (_ >= $) ? A : D[_]
            })
        }
    }
    return _
};
function DOMReady(f){
  if (/(?!.*?compatible|.*?webkit)^mozilla|opera/i.test(navigator.userAgent)){ // Feeling dirty yet?
    document.addEventListener("DOMContentLoaded", f, false);
  }  else {
    window.setTimeout(f,0);
  }
}


if(Browser.isIE=='6.0'){
	document.execCommand("BackgroundImageCache", false, true);
}
var Calendar = (function(){
    /*农历日历*/
    var lunarInfo = [0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,0x14b63];
    var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
    var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
    var now = new Date();
    var SY = now.getFullYear();
    var SM = now.getMonth();
    var SD = now.getDate();
    function cyclical(num){
        return (Gan[num % 10] + Zhi[num % 12])
    }
    function lYearDays(y){
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) 
            sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return (sum + leapDays(y))
    }
    function leapDays(y){
        if (leapMonth(y)) 
            return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        else 
            return (0)
    }
    function leapMonth(y){
        return (lunarInfo[y - 1900] & 0xf)
    }
    function monthDays(y, m){
        return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29
    }
    function Lunar(objDate){
        var i, leap = 0, temp = 0;
        var baseDate = new Date(1900, 0, 31);
        var offset = (objDate - baseDate) / 86400000;
        this.dayCyl = offset + 40;
        this.monCyl = 14;
        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
            this.monCyl += 12
        }
        if (offset < 0) {
            offset += temp;
            i--;
            this.monCyl -= 12
        }
        this.year = i;
        this.yearCyl = i - 1864;
        leap = leapMonth(i);
        this.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
                --i;
                this.isLeap = true;
                temp = leapDays(this.year)
            }
            else {
                temp = monthDays(this.year, i)
            }
            if (this.isLeap == true && i == (leap + 1)) {
                this.isLeap = false
            }
            offset -= temp;
            if (this.isLeap == false) {
                this.monCyl++
            }
        }
        if (offset == 0 && leap > 0 && i == leap + 1) {
            if (this.isLeap) {
                this.isLeap = false
            }
            else {
                this.isLeap = true;
                --i;
                --this.monCyl
            }
        }
        if (offset < 0) {
            offset += temp;
            --i;
            --this.monCyl
        }
        this.month = i;
        this.day = offset + 1
    }
    
    function cDay(m, d){
        var nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        var nStr2 = ['初', '十', '廿', '卅'];
        var s;
        if (m > 10) {
            s = '十' + nStr1[m - 10]
        }
        else {
            s = nStr1[m]
        }
		if(s=='一'){
			s='正';
		}
        s += '月';
        switch (d) {
            case 10:
                s += '初十';
                break;
            case 20:
                s += '二十';
                break;
            case 30:
                s += '三十';
                break;
            default:
                s += nStr2[Math.floor(d / 10)];
                s += nStr1[parseInt(d % 10)]
        }
        return (s)
    }
    
    function solarDay2(){
    	
        var lDObj = new Lunar(new Date(SY, SM, SD));
        var tt = cDay(lDObj.month, lDObj.day);
        return (tt)
    }
    function showToday(){
        var weekStr = "日一二三四五六";
        var template = '<a href="http://tool.114la.com/live/calendar/" rel="nr" title="点击查看万年历">#{MM}月#{DD}日&nbsp;&nbsp;&nbsp;星期#{week} </a>';
        var day = format(template, {
            YY: SY,
            MM: SM + 1,
            DD: SD,
            week: weekStr.charAt(now.getDay())
        
        });
        return day;
    }
	
	function showdate(){
		SD = SD+1;
		var m = SM<9?('0'+(SM+1)):SM+1;
		var d = SD+1<10?('0'+SD):SD;
		return (SY+'-'+m+'-'+d);
	}
	function cncal(){
		var cacal = '<a href="http://tool.114la.com/live/calendar/" rel="nr" title="点击查看万年历">农历 '+ solarDay2() +'</a>';
		return cacal;
	}
    
    return {
        day: showToday,
		cnday :cncal,
		date:showdate
    }
    
})();
/**ie6 png**/
var pngfix = function(img){
	(typeof DD_belatedPNG != "undefined") && DD_belatedPNG.fixPng(img);
}

 var _hmt = _hmt || [];

/** 
 * 串联加载指定的脚本
 * 串联加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */ 
 /*
function seriesLoadScripts(scripts,callback) {
   if(typeof(scripts) != "object") var scripts = [scripts];
   var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
   var s = new Array(), last = scripts.length - 1, recursiveLoad = function(i) {  //递归
       s[i] = document.createElement("script");
       s[i].setAttribute("type","text/javascript");
       s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
           if(!0 || this.readyState == "loaded" || this.readyState == "complete") {
               this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this); 
               if(i != last) recursiveLoad(i + 1); else if(typeof(callback) == "function") callback();
           }
       }
       s[i].setAttribute("src",scripts[i]);
       HEAD.appendChild(s[i]);
   };
   recursiveLoad(0);
}
*/


/**
*	v 1.0.4
*	by zhaixiaolin
**/
(function () {
    window.YLMF = window.YLMF || {};
    YLMF.namespace = function (c) {
        if (!c || !c.length) {
            return null
        }
        var d = c.split(".");
        var b = YLMF;
        for (var a = (d[0] == "YLMF") ? 1 : 0; a < d.length; ++a) {
            b[d[a]] = b[d[a]] || {};
            b = b[d[a]]
        }
        return b
    };
	//继承
    YLMF.extend = function (a, c) {
        var b = function () {
        };
        b.prototype = c.prototype;
        a.prototype = new b();
        a.prototype.constructor = a;
        a.superclass = c.prototype;
        if (c.prototype.constructor == Object.prototype.constructor) {
            c.prototype.constructor = c
        }
    };

	//浅拷贝
	YLMF._extend = function(destination, source){
		for ( var property in source) {
			destination[property] = source[property];
		}
		return destination;
	}
	YLMF.isArray = function(obj) { 
		return Object.prototype.toString.call(obj) === '[object Array]'; 
	} 

    YLMF.isObject = function (a) {
        return !!a && Object.prototype.toString.call(a) === "[object Object]";
    };

	YLMF.each = function (objArray, funName) {
		if(YLMF.isArray(objArray)){
			var l = objArray.length;
	        for(var i=0; i < l; i++){ funName(i,objArray[i]); }	
		}
		
    };
    YLMF.contains = function(a,b){
    	return a.contains ? a!=b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
    }
    YLMF._extend(YLMF, {
		trim : function(str){
			return str.replace(/(^\s*)|(\s*$)/g,'');
		},
        ajax: function (b, a, f) {
            var c = (YLMF.xhrs = YLMF.xhrs || {});
            f.dataType = f.dataType || "html";
            if (b) {
                try {
                    c[b] && c[b].abort()
                } catch (d) {
                }
                c[b] = $.ajax(a, f)
            } else {
                $.ajax(a, f)
            }
        },
        deferTimmer: {},
        defer: function (b, a, e, d, c) {
            e = e || 500;
            d = d || window;
            c = c || [];
            if (b) {
                this.cancelDefer(b);
                this.deferTimmer[b] = window.setTimeout(function () {
                    a.apply(d, c)
                }, e)
            } else {
                window.setTimeout(function () {
                    a.apply(d, c)
                }, e)
            }
        },
        cancelDefer: function (a) {
            window.clearTimeout(this.deferTimmer[a])
        },
        getEvent: function (b) {
            var a = b || window.event;
            if (!a) {
                var d = this.getEvent.caller;
                while (d) {
                    a = d.arguments[0];
                    if (a && (Event == a.constructor || MouseEvent == a.constructor)) {
                        break
                    }
                    d = d.caller
                }
            }
            return a
        },
        getEventTarget: function (a) {
            a = a || window.event;
            return a.target || a.srcElement
        },
        some: function (b, c) {
            if (b.some) {
                return b.some(c)
            }
            var a = b.length;
            if (typeof c != "function") {
                throw new TypeError()
            }
            for (var d = 0; d < a; d++) {
                if (d in b && c.call(c, b[d], d, b)) {
                    return true
                }
            }
            return false
        },
        getImg: function (c) {
            var a = new Image();
            this.img = a;
            var b = navigator.appName.toLowerCase();
            if (b.indexOf("netscape") == -1) {
                a.onreadystatechange = function () {
                    if (a.readyState == "complete") {
                        c(a)
                    }
                }
            } else {
                a.onload = function () {
                    if (a.complete == true) {
                        c(a)
                    }
                }
            }
        },
        imgResize: function (c, b, a) {
            if ($.browser.msie && $.browser.version == "6.0") {
                if (c.width == 0) {
                    return
                }
                if ((c.width / c.height) > (b / a)) {
                    c.width = b
                } else {
                    c.height = a
                }
            }
        }
    });
    YLMF.getImg.prototype.get = function (a) {
        this.img.src = a
    };
    YLMF.namespace("Observable");
    YLMF._extend(YLMF.Observable, {
        addEvents: function (a) {
            if (YLMF.isObject(a)) {
                for (var c in a) {
                    this.addEvents(c)
                }
            } else {
                if (typeof a == "string") {
                   this.addEvent(a);
                } else {
                    if (YLMF.isArray(a)) {
                        for (var b = 0; b < a.length; b++) {
                            this.addEvent(a[b])
                        }
                    }
                }
            }
        },
		addEvent : function(a){
			if (typeof a == "string") {
				this.events = this.events || {};
				this.events[a] = []
			}
		},
        fireEvents: function (c, a) {
            this.fireEvent(c, a);
        },
		fireEvent : function(c, a){
			if (typeof c == "string") {
                var b = Array.prototype.slice.call(arguments);;
                this.events && YLMF.each(this.events[c], function (d, e) {
                    e.apply(a || this, b.slice(2) || [])
                })
            }
		},
        addListener: function (b,c) {
            if (YLMF.isObject(b)) {
                for (var a in b) {
                    this.events && this.events[a].push(b[a])
                }
            }else if(typeof b == "string"){
				this.events && this.events[b].push(c);
			}
        },
        removeEvents: function (a) {
            if (YLMF.isObject(a)) {
                for (var b in a) {
                    this.removeEvents(b)
                }
            } else {
                if (typeof a == "STRING") {
                    this.events = this.events || {};
                    delete this.events[a]
                }
            }
        },
        removeListener: function (b) {
        	
            for (var a in b) {
                this.events && (this.events[a] = YLMF.grep(this.events[a], function (d, c) {
                    return d != b[a]
                }))
            }
        },
		on : function(b,c){
			this.addListener(b,c);
		},
		grep : function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d} 
    });
	

})();


/**
  * @constructor Animate
  * @param {HTMLElement} el the element we want to animate
  * @param {String} prop the CSS property we will be animating
  * @param {Object} opts a configuration object
  * object properties include
  * from {Int}
  * to {Int}
  * time {Int} time in milliseconds 动画所用时间
  * callback {Function}
  */
function Animate(el, prop, opts) {
  this.el = el;
  this.prop = prop;
  this.from = opts.from;
  this.to = opts.to;
  this.time = opts.time;
  this.callback = opts.callback;
  this.fps = 1E3 / 8;
}

/**
  * @private
  * @param {String} val the CSS value we will set on the property
  */
Animate.prototype._setStyle = function(val) {
	
  switch (this.prop) {
    case 'opacity':
      this.el.style[this.prop] = val;
	  this.el.style.filter = 'alpha(opacity=' + val * 100 + ')';
      break;
	case 'scrollTop':
	  
	  if(this.el ==  window){
		var _left = document.documentElement.scrollLeft || document.body.scrollLeft;
		this.el.scrollTo(_left,val);
	  }
	  
	  break;
    default:

      this.el.style[this.prop] = val + 'px';
      break;
  };
};

/**
  * @private
  * this is the tweening function
  * _animate函数连续执行形成动画
  */
Animate.prototype._animate = function() {
  var that = this;
  this.now = new Date(); //每次执行获得新的时间
  this.diff = this.now - this.startTime; //现在和开始的时间差
	//执行时间超过设定时间了么？
  if (this.diff > this.time) {
    this._setStyle(this.to);

    if (this.callback) {
      this.callback.call(this);
    }
    clearInterval(this.timer);
   return;
  }
	//没有超过设定时间
  this.percentage = (Math.floor((this.diff / this.time) * 1000000) / 1000000);
  
  	//现在的状态
  this.val = (this.animDiff * this.percentage) + this.from;
  this._setStyle(this.val);
};

/**
  * @public
  * begins the animation
  */
Animate.prototype.start = function() {
  var that = this;
  this.startTime = new Date();

  this.animDiff = this.to - this.from;
  this.timer = setInterval(function() {
    that._animate.call(that);
  }, 8);
};
/**
  * @public
  * begins the animation
  */
Animate.prototype.stop = function() {
  var that = this;
  window.clearInterval(this.timer);
};

/**
  * @static
  * @boolean
  * allows us to check if native CSS transitions are possible
  */
Animate.canTransition = function() {
  var el = document.createElement('foo');
  el.style.cssText = '-webkit-transition: all .5s linear;';
  return !!el.style.webkitTransitionProperty;
}();
/*
if (Animate.canTransition) {
  el.style.webkitTransition = 'opacity 0.5s ease-out';
  el.style.opacity = 1;
}

new Animate(el, 'opacity', {
  from: 0,
  to: 1,
  time: 500,
  callback: done
}).start();
*/

/**
  * @constructor Shake
  * extend from Anomate
  * @param {HTMLElement} el the element we want to animate
  * @param {String} prop the CSS property we will be animating
  * @param {Object} opts a configuration object
  * object properties include
  * from {Int}
  * to {Int}
  * time {Int} time in milliseconds 动画所用时间
  * callback {Function}
  */
function Shake(el, prop, opts){
	Animate.call(this,el, prop, opts);
	this.shakeTime = opts.shakeTime || 2;
	this.amplitude = opts.amplitude || 100;
	this.animDiff = this.to - this.from;
	this.starPeriod = Math.asin(this.animDiff/(Math.abs(this.amplitude) + Math.abs(this.animDiff)));
	
}

YLMF.extend(Shake,Animate);
/**
  * @private
  * this is the tweening function
  * _animate函数连续执行形成动画
 */
Shake.prototype._animate = function() {
  var that = this;
  this.now = new Date(); //每次执行获得新的时间
  this.diff = this.now - this.startTime; //现在和开始的时间差
	//执行时间超过设定时间了么？
  if (this.diff > this.time) {
    this._setStyle(this.to);

    if (this.callback) {
      this.callback.call(this);
    }
    clearInterval(this.timer);
   return;
  }

	//没有超过设定时间
  //this.percentage = (Math.floor((this.diff / this.time) * 1000000) / 1000000);
  //this.percentage = Math.sin(this.shakeTime * Math.PI * 2 * (this.diff / this.time));
  	//现在的状态
  var timePercentage = Math.round((this.diff / this.time) * 1e8) / 1e8;
  this.percentage = Math.sin((this.shakeTime * Math.PI * 2 - this.starPeriod) * timePercentage + this.starPeriod);

  this.val = ((this.amplitude - this.animDiff) * this.percentage * (1-timePercentage))  + this.to;
  
  this._setStyle(this.val);
}; 
/**
  * @constructor Shake
  * extend from Anomate
  * @param {HTMLElement} el the element we want to animate
  * @param {String} prop the CSS property we will be animating
  * @param {Object} opts a configuration object
  * object properties include
  * from {Int}
  * to {Int}
  * time {Int} time in milliseconds 动画所用时间
  * callback {Function}
  */
	function MultiAnimate(el, props, opts){
		this.el = el;
		this.props = props;
		this.time = opts.time;
		this.callback = opts.callback;
		this.fps = 1E3 / 8;
	}
	YLMF.extend(MultiAnimate,Animate);
	MultiAnimate.prototype.start = function() {
	  var that = this;
	  this.startTime = new Date();
	  this.timer = setInterval(function() {
	    that._animate.call(that);
	  }, 8);
	};
	/*
	* t 为 现在时间 time
	* b 为 开始状态 from
	* c 为 改变的值 diff
	* d 为 变化时间 diffTime
	* easeOut 为减速
	*/
	var Tween = {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	}

	MultiAnimate.prototype._animate = function() {
		var that = this;
		this.now = new Date(); //每次执行获得新的时间
		this.diff = this.now - this.startTime; //现在和开始的时间差
		//执行时间超过设定时间了么？
		if (this.diff > this.time) {
			YLMF.each(this.props,function(i,n){
				that.prop = n.proName;
				that._setStyle(n.to);
			});
			

			if (this.callback) {
				this.callback.call(this);
			}
			clearInterval(this.timer);
			return;
		}
		//没有超过设定时间
		this.percentage = (Math.floor((this.diff / this.time) * 1000000) / 1000000);
		//现在的状态
		YLMF.each(this.props,function(i,n){
			that.val = Tween.easeOut(that.percentage,n.from,n.to,1);
			//that.val = (n.to - n.from) * that.percentage + n.from;
			that.prop = n.proName;
			
			if(that.val){  that._setStyle(that.val);}
		});
	  //this.val = (this.animDiff * this.percentage) + this.from;
	  //this._setStyle(this.val);
	};

String.prototype.capitalize=function(){
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}
Array.prototype.contains=function(A){
     return (this.indexOf(A) >= 0);
}
String.prototype.camelize=function(){
        return this.replace(/\-(\w)/ig, 
        function(B, A) {
            return A.toUpperCase();
        });
}
var css={
    getStyle:function(elem,styles){
        var value;
        if(styles == "float"){
             document.defaultView ? styles = 'float' /*cssFloat*/ : styles='styleFloat';
        }
        value=elem.style[styles] || elem.style[styles.camelize()];
        if(!value){
             if (document.defaultView && document.defaultView.getComputedStyle) {
                var _css=document.defaultView.getComputedStyle(elem, null);
                value= _css ? _css.getPropertyValue(styles) : null;
             }else{
                if (elem.currentStyle){
                    value = elem.currentStyle[styles.camelize()];
                }
             }
        }
        if(value=="auto" && ["width","height"].contains(styles) && elem.style.display!="none"){
            value=elem["offset"+styles.capitalize()]+"px";
        }
        if(styles == "opacity"){
            try {
                value = elem.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                value =value/100;
            }catch(e) {
                try {
                    value = elem.filters('alpha').opacity;
                } catch(err){}
            }
            
        }
        return value=="auto" ? null :value;
    }
} 

;(function($){
	function switchable(tigger,panel,op){
		var me = this,
			_tigger =  $(tigger),
			_panel = $(panel),
			i = 0,l = _tigger.size() - 1,
			_op =  YLMF._extend({
				triggers: "a",
				currentCls: "current",
				initIndex: 0,
				triggerType: "mouse",
				delay: 0.1,
				effect: "default",
				steps: 1,
				visible: 1,
				speed: 0.7,
				easing: "swing",
				circular: false,
				vertical: false,
				panelSwitch: false,
				beforeSwitch: null,
				onSwitch: null,
				api: false
			},op)
		
		this.addEvents("beforeSwitch");
		YLMF._extend(this,{
			getTigger : function(){
				return _tigger;
			},
			getPanel : function(){
				return _panel;
			},
			getOption : function(){
				return _op;
			},
			getIndex : function(){
				return i;
			},
			setIndex : function(index){
				i = index;
			},
			getLength : function(){
				return l;
			}
		});
		
		
		if(_op.triggerType == "mouse"){
			var _hoverTimmer;
			_tigger.each(function(el,i){
				$(el).hover(function(){
					window.clearTimeout(_hoverTimmer);
					_hoverTimmer = window.setTimeout(function(){
						me.move(i);
					},200);
				},function(){
					window.clearTimeout(_hoverTimmer);
				})
			})
		}else{
			_tigger.on("click",function(el){
				var _i = _tigger.el.indexOf(el);
				me.move(_i);
			});
		}
	}
	YLMF._extend(switchable.prototype,YLMF.Observable);
	YLMF._extend(switchable.prototype,{
		move : function(index){
			var _tigger = this.getTigger();
				_panel = this.getPanel(),
				_op = this.getOption(),
				me = this,
				_i = this.getIndex(),
				_l = this.getLength(),
				_index = index;
			//判断index是否超出范围
			if(_op.circular){
				if(index < 0){
					_index = _l;
				}else if(index > _l){
					_index = 0;
				}
			}else{
				if(index < 0 || index > _l){
					return;
				}
			}
			this.setIndex(_index);
			me.fireEvent("beforeSwitch",this,_index,_tigger,_panel,_op);
			
			_effects[_op.effect].call(this,_index,function(){
				me.fireEvent("afterSwitch",this,_index,_tigger,_panel,_op);
			});
			
			_tigger.removeClass(_op.currentCls);
			_tigger.eq(_index).addClass(_op.currentCls);

		},
		getSlidePanel : function(i){
			var _op = this.getOption();
			return this.getPanel().slice(i * _op.steps, (i + 1) * _op.steps)
		},
		next : function(){
			this.move(this.getIndex() + 1);
		},
		prev : function(){
			this.move(this.getIndex() - 1);
		},
		beforeSwitch : function(fn){
			this.on("beforeSwitch",fn)
		}
	});
	var _effects = {
		/** 
		/*	
		/*	
		*/
		"default" :  function(a, e) {
			this.getPanels().hide();
			this.getSlidePanel(a).show();
			e.call();
		},
		"fade" : function(a, e){
			this.getPanel().hide();
			var _sp = this.getSlidePanel(a);

			_sp.setStyle("opacity",0).show();
			new Animate(_sp.el, 'opacity', {
			  from: 0,
			  to: 1,
			  time: 500
			}).start();
			e.call();
			return; 
			
		}
	}
	window.switchable = switchable;
})($);
//ie fix 
try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}
//firefox innerText 
if(Browser.isFF){
	HTMLElement.prototype.__defineGetter__("innerText",  
		function(){  
			var anyString = "";  
			var childS = this.childNodes;  
			for(var i=0; i<childS.length; i++) {  
				if(childS[i].nodeType==1)  
				anyString += childS[i].tagName=="BR" ? '\n' : childS[i].textContent;  
				else if(childS[i].nodeType==3)  
				anyString += childS[i].nodeValue;  
			}  
			return anyString;  
		}  
	);  
	HTMLElement.prototype.__defineSetter__("innerText",  
		function(sText){  
			this.textContent=sText;  
		}  
	);  
}