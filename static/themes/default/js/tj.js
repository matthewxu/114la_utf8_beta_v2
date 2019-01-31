var Hmclick = (function () {
    var _version = 1.0;

    //判断页面是否存在PageId
    if (!this.Ylmf_PageId) {
        return{
            log: function () {
            }
        }
    }

    var block = "";
    var HMhost = "http://hm.114la.com/hm.gif?pid=" + Ylmf_PageId;
    var StatHost = "http://hm.114la.com/stat.gif?pid=" + Ylmf_PageId;
    var g = '__Ylmf_Click__';

    //建立统计请求
    var createImg = function (params, host) {
        var rnd = (new Date()).getTime();
        var statimg = window[g + rnd] = new Image();
        var params_str = "";
        for (var key in params) {
            params_str += ("&" + key + "=" + params[key])
        }
        statimg.src = host + params_str;
        statimg.onload = statimg.onerror = function () {
            statimg = null
        }
    };

    //cookie操作类
    var Cookie = {
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

    //获取客户端浏览器属性
    var Browser = (function () {
        var a = window,
            b = document,
            d = navigator,
            c = d.userAgent.toLowerCase(),
            g = function (a) {
                return (a = c.match(RegExp(a + "\\b[ \\/]?([\\w\\.]*)", "i"))) ? a.slice(1) : ["", ""]
            },
            f = function () {
                var b = -1 < c.indexOf("360chrome") ? !0 : !1,
                    d;
                try {
                    a.external && a.external.twGetRunPath && (d = a.external.twGetRunPath) && -1 < d.indexOf("360se") && (b = !0)
                } catch (e) {
                    b = !1
                }
                return b
            }(),
            h;
        a: {
            try {
                if (/(\d+\.\d)/.test(a.external.max_version)) {
                    h = parseFloat(RegExp.$1);
                    break a
                }
            } catch (i) {
            }
            h = void 0
        }
        var e = g("(msie|safari|firefox|chrome|opera)"),
            k = g("(maxthon|360se|360chrome|theworld|se|theworld|greenbrowser|qqbrowser|lbbrowser)"),
            j = g("(windows nt|macintosh|solaris|linux)"),
            m = g("(webkit|gecko|like gecko)");
        "msie" === e[0] ? f ? k = ["360se", ""] : h ? k = ["maxthon", h] : "," == k && (k = g("(tencenttraveler)")) : "safari" === e[0] && (e[1] = g("version") + "." + e[1]);

        return {
            cookieEnabled: navigator.cookieEnabled,
            flash: function () {
                if (d.plugins && d.mimeTypes.length) {
                    var b = d.plugins["Shockwave Flash"];
                    if (b && b.description) return b.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0"
                } else if (a.ActiveXObject && !a.opera) for (b = 12; 2 <= b; b--) try {
                    var c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
                    if (c) return c.GetVariable("$version").replace(/WIN/g, "").replace(/,/g, ".")
                } catch (e) {
                }
            }(),
            isStrict: "CSS1Compat" == b.compatMode,
            isShell: !!k[0],
            shell: k,
            kernel: m,
            platform: j,
            types: e,
            chrome: "chrome" == e[0] && e[1],
            firefox: "firefox" == e[0] && e[1],
            ie: "msie" == e[0] && e[1],
            opera: "opera" == e[0] && e[1],
            safari: "safari" == e[0] && e[1],
            maxthon: "maxthon" == k[0] && k[1],
            isTT: "tencenttraveler" == k[0] && k[1],
            is360: f
        }
    })();

    //页面加载完成
    var DOMReady = function (f) {
        if (/(?!.*?compatible|.*?webkit)^mozilla|opera/i.test(navigator.userAgent)) { // Feeling dirty yet?
            document.addEventListener("DOMContentLoaded", f, false);
        } else {
            window.setTimeout(f, 0);
        }
    }

    //去掉两边空格
    var tirm = function ($) {
        $ = $.replace(/(^\u3000+)|(\u3000+$)/g, "");
        $ = $.replace(/(^ +)|( +$)/g, "");
        return $
    }

    //生成指定位数随机数
    var rndNum = function (n) {
        var rnd = "";
        for (var i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    }

    //事件操作函数
    var on = function (e, type, j, i) {
        if (e.addEventListener) {
            e.addEventListener(type, j, i);
            return true;
        } else {
            if (e.attachEvent) {
                var k = e.attachEvent("on" + type, j);
                return k;
            }
        }
    };

    //获取浏览器页面支持的语言
    var getPageLanguage = function () {
        var lang = "";
        if (Browser.ie) {
            lang = window.navigator.systemLanguage;
        }
        else {
            lang = window.navigator.language;
        }
        return lang;
    };

    //编码函数
    var encode = function (i) {
        return encodeURIComponent(i)
    };

    //获取Dom元素的的结构位置
    var getXPosition = function (el, tags) {
        tags = tags || [];

        //设置block
        block = el.block || el.getAttribute("block") || block;

        if (el.parentNode && el.parentNode.tagName.toUpperCase() != "BODY") {
            tags = getXPosition(el.parentNode, tags)
        }

        if (el.previousSibling) {
            var j = 1;
            var i = el.previousSibling;
            do {
                if (i.nodeType == 1 && i.nodeName == el.nodeName) {
                    j++
                }
                i = i.previousSibling
            } while (i)
        }
        if (el.nodeType == 1) {
            tags.push(el.nodeName.toLowerCase() + (j > 1 ? j : ""))
        }
        return tags;
    };


    var getUmta = function(t,rnd){
        var cto = new Date();
        var umta = t+"."+rnd;
        cto.setDate(cto.getDate()+1);
        cto.setHours(0);
        cto.setMinutes(0);
        cto.setSeconds(0);
        Cookie.set("utma",umta,cto);
        return umta;
    }

    //监控鼠标按下事件
    on(document.body, "mousedown", function (e) {
        var e = window.event || e;
        var obj = e.srcElement || e.target;
        var doc = document || document.body;
        var Y = {};
        var xp = '';

        //当点击的不是A元素时作以下处理
        if (obj.tagName.toUpperCase() != "A") {
            //如果它的父级是A元素,则返回A元素对象
            if (obj.parentNode.tagName.toUpperCase() == "A") {
                obj = obj.parentNode;
                Y.a = 1;
            }else{
                if (obj.tagName.toUpperCase() == 'INPUT' && !(obj.tagName.toUpperCase() == "INPUT" && (obj.type.toLowerCase() == "checkbox" || obj.type.toLowerCase() == "radio")) && !(obj.tagName.toUpperCase() == "AREA")) {
                    return
                }
                Y.a=0;
            }
        }

        /*
         x:x坐标
         y:y坐标
         w:浏览器宽度
         s:浏览器分辨率 1920x1080
         b:浏览器类型 chrome
         c:点击类型 左键:1 右键:3 中间键:2
         r:来路 http://www.baidu.com
         a:是否a标签点击 是:1 否:0
         t:时间戳
         f:flash版本
         u:属性href
         utma:Cookie存储的内容：1360367272.1264374807 10位时间戳+10位随机数
         n:当前连接的名称
         */

        Y.x = e.clientX.toString();
        Y.y = e.clientY.toString();
        Y.w = doc.body.clientWidth.toString();
        Y.s = window.screen.width + "x" + window.screen.height;
        Y.b = Browser.ie ? (Browser.types[0] + " " + Browser.types[1]) : Browser.types[0];
        Y.c = e.button + 1;
        Y.r = typeof doc.referer == 'undefined' ? '' : encode(doc.referer);
        Y.t = new Date().getTime().toString().substr(0, 10);
        Y.f = Browser.flash;
        Y.rnd = rndNum(10);


        if(obj.tagName.toUpperCase()!="BODY"){
            xp = getXPosition(obj).join("-");
        }

        var i = obj.getAttribute("href", 2);

        //Y.u
        if (i && !(/^javascript|#/.test(i))) {
            Y.u = encode(i)
        } else {
            Y.u = "none" + "__ylmf__" + xp
        }
        if(obj.tagName.toUpperCase()=="BODY"){
            Y.u = "";
        }


        //Y.n
        if (obj.innerHTML && !(/^\s*</i.test(obj.innerHTML)) && !(/>\s*$/i.test(obj.innerHTML))) {
            Y.n = encode(obj.innerHTML)
        } else {
            Y.n = "";
        }

        //Y.blk
        if (block) {
            Y.blk = block;
        }

        //Y.utma
        if (Cookie.get("utma") != '' || Cookie.get("utma") != null) {
            Y.utma = Cookie.get("utma");
        } else {
            Y.utma = getUmta(Y.t, Y.rnd);
        }
        createImg(Y, HMhost)
    });

    DOMReady(function () {
        var doc = document,
            o = {
                s: window.screen.width + "x" + window.screen.height,
                r: typeof doc.referer == 'undefined' ? '' : encode(doc.referer),
                t: new Date().getTime().toString().substr(0, 10),
                rnd: rndNum(10),
                lg: getPageLanguage().toLowerCase()
            };
        if(Cookie.get("utma") && Cookie.get("utma")!=null){
            o.utma = Cookie.get("utma");
        }else{
            o.utma = getUmta(o.t, o.rnd);
        }
        createImg(o, StatHost);
    });

    var setClick = function (url, name) {
        var Y = {};
        if (url) {
            Y.u = encode(url)
        } else {
            Y.u = "none"
        }
        if (name) {
            Y.n = encode(name)
        } else {
            Y.n = "none"
        }
        createImg(Y, HMhost);
    };

    var _getXP = function(el){
        var xp = getXPosition(el).join("-");
        return xp;
    };

    return{
        log: setClick,
        getXP:_getXP,
        version:_version
    };
})();