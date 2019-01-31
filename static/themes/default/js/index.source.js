/**
* ==========================================
* main.js
* Copyright (c) 2012 wwww.114la.com
* ==========================================
*/
if(Cookie.get('ws')){
    $("#classicsWrap").addClass("kpWrap");
}

DOMReady(function () {
    if (Browser.isIE) {
        $("#sf .searchWord").el.value = '';
    }
    $("#sf .searchWord").el.focus();
    
    if (typeof ($(".sortSite")) != 'undefined') {
        $(".sortSite li").on('mouseover', function (el) {
            $(el).addClass('hover');
        }).on('mouseout', function (el) {
            $(el).removeClass('hover');
        })
    }
    $("li.drop").on('mouseover', function (el) {
        $(el).addClass('hover');
    }).on('mouseout', function (el) {
        $(el).removeClass('hover');
    })

    if (typeof ($("#js_cal")) !== 'undefined') {
        var str = '<ul class="fl" ><li class="date">' + Calendar.day() + '</li><li class="lcal">' + Calendar.cnday() + '</li></ul>';
        $("#js_cal").el.innerHTML = str;
    }
    MailLogin.userNameGotFocus();
    MailLogin.setMailAddress();

    YLMF._extend(YLMF,YLMF.Observable);
    YLMF.addEvents(["resize"]);
    function _resize(){
        window.clearTimeout(_resizeTimmer);
        _resizeTimmer = window.setTimeout(function(){
            _winEl.onresize = null;
            YLMF.fireEvent("resize");
            _winEl.onresize = _resize;
        },200);
    }

    var _resizeTimmer; 
    var _winEl = null;

    if(parseInt(Browser.isIE) <= 7 ){ 
        _winEl = document.body;
    }else{
        _winEl = window;
    }
    _winEl.onresize = _resize;

    
});

var Ylmf = { 
getProId : function(proName) {
    var ProId;
    for (var i = 0, len = CityArr.length; i < len; ++i) {
        if (CityArr[i][0] == proName && parseInt(CityArr[i][2]) <900) {
            ProId = CityArr[i][2];
        }
    }
    return ProId
},
getCityId:function(ProId, CityName) {
    if(!ProId) return false;
    var CityId;
    for (var i = 0, len = CityArr.length; i < len; ++i) {
        if (CityArr[i][1] == ProId && CityArr[i][0] == CityName) {
            CityId = CityArr[i][2];
        }
    }
    return CityId
},
getCitys : function(ProId){
    if(!ProId) return false;
    var Citys = [];
    for (var i = 0, len = CityArr.length; i < len; ++i) {
        if (CityArr[i][1] == ProId) {
            Citys.push(CityArr[i]);
        }
    }
    return Citys;
},
getSelectValue:function(select) {
    var idx = select.selectedIndex,
    option,
    value;
    if (idx > -1) {
    option = select.options[idx];
    value = option.innerHTML.split(' ')[1];
        return value;
        //return (value && value.specified) ? option.value : option.text;
    }
    return null;
},
    ScriptLoader:{
        Add: function(config) {
            if (!config || !config.src) return;
            var  doc = document;
            var Head = doc.getElementsByTagName('head')[0],         
                Script = doc.createElement('script');
                Script.onload = Script.onreadystatechange = function() {
                    if (Script && Script.readyState && Script.readyState != 'loaded' && Script.readyState != 'complete') return;
                    Script.onload = Script.onreadystatechange = Script.onerror = null;
                    Script.Src = '';
                    if(!doc.all){Script.parentNode.removeChild(Script);}
                    Script = null;
                };
                Script.src = config.src;
                Script.charset = config.charset || 'gb2312';
                Head.insertBefore(Script,Head.firstChild);
            return Script;
        }
    }
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


/** 宽屏版操作 **/
$("#js_ws").on("click",function (el){
    var ws = document.getElementById("ws");
    if(!ws){
        $("#classicsWrap").addClass("kpWrap");
        var link = document.createElement('link');
        link.href = 'static/css/ws.css?v2013';
        link.rel = "stylesheet";
        link.id = "ws";
        var h = document.getElementsByTagName('base')[0];
        h.parentNode.insertBefore(link, h);
        Cookie.set("ws","1");
    }
});
$("#js_nm").on("click",function (el){
    $("#classicsWrap").removeClass("kpWrap");
    var ws = document.getElementById("ws");
    if(ws){
        ws.parentNode.removeChild(ws);
        Cookie.clear("ws");
    }
});
/** 宽屏版操作结束 **/

var _preMailUserName = Cookie.get("preMailUserName");
//邮箱登录
var MailLogin = {
    userNameGotFocus: function () {
        var mailPrompt = $("#mail .mailPrompt"),
            mailLoginBox = $("#js_mailLogin"),
            mailUsername = $("#js_mailUsername"),
            mailPassWord = $("#js_mailPassWord"),
            mailPromptPw = $("#mail .mailPromptPw");
        if (Browser.isIE == '6.0') {
            mailUsername.el.value = "";
        }
        if(_preMailUserName){
            mailUsername.el.value = _preMailUserName;
        }
        if(mailUsername.el.value !==''){
            mailPrompt.hide();
        }
        
        mailUsername.on('focus', function (el) {
            mailLoginBox.show();
            $("#js_eMail").hasClass("e-mailActived",function(pRst){
                if(!pRst) {
                    $("#js_eMail").addClass("e-mailActived");
                    
                    if(_preMailUserName && YLMF.trim(_preMailUserName) == YLMF.trim(mailUsername.el.value) && YLMF.trim(_preMailUserName) != ""){
                        mailPassWord.el.focus();
                    }
                    
                };

            });
            mailPrompt.hide();
        }).on('blur', function (el) {
            if (el.value === '') {
                mailPrompt.show();
            }
        });
        mailPassWord.on('focus', function (el) {
            mailPromptPw.hide();
        }).on('blur', function (el) {
            if (el.value === '') {
                mailPromptPw.show();
            }
        });
    },

    setMailAddress: function () {
        var mailServer = $("#js_mailServer"),
            eMailList = $("#js_eMailList"),
            eMailListLi = $("#js_eMailList li"),
            dn = 0;
        var mailCutOff = [{ sou: '@vip.163.com', tar: '@vip.163...' },
                { sou: '@vip.sina.com', tar: '@vip.sina...' },
                { sou: '@yahoo.com.cn', tar: '@yahoo.c..'}];
        eMailListLi.on('click', function (el) {
            if (el.getAttribute("dn")) {
                dn = el.getAttribute("dn");
                mailServer.el.innerHTML = el.innerHTML;
                eMailList.el.setAttribute('selectIndex', dn);
                for (var i = 0; i < mailCutOff.length; i++) {
                    if (Yl.trim(el.innerHTML.toString()) === mailCutOff[i].sou) {
                        mailServer.el.innerHTML = mailCutOff[i].tar;
                    }
                    continue;
                };
            }
        }).on('mouseover',function(el){
            eMailListLi.removeClass('hover');
            $(el).hasClass("no",function(pRst){
                if(!pRst) $(el).addClass('hover');
            })
        })
    },
    flag: false,
    mailCache: [],
    sendMail: function () {
        var username = $("#js_mailUsername").el.value, password = $("#js_mailPassWord").el.value, servers = $("#js_eMailList").el, form = $("#mail").el, index = servers.getAttribute("selectIndex"), H = Config.Mail[index], F = {
            u: username,
            p: password
        };
        if (Yl.trim(F.u) == "") {
            alert("用户名不能为空！");
            $("#js_mailUsername").el.focus();
            $("#mail .mailPrompt").hide();
            return;
        }
        if (Yl.trim(F.p) == "") {
            alert("密码不能为空！");
            $("#js_mailPassWord").el.focus();
            $("#mail .mailPromptPw").hide();
            return;
        }
        if (this.mailCache.index != index) {
            this.mailCache.forEach(function (el) {
                form.removeChild(el)
            });
            this.mailCache = [];
        }
        form.setAttribute('action',H.action);
        for (I in H.params) {
            $(form).create("input", {
                type: "hidden",
                name: I,
                value: format(H.params[I], F)
            }, function (el) {
                MailLogin.mailCache.push(el);
                this.append(el);
            })
        }
        form.submit();
        Cookie.set("preMailUserName",username);
        _preMailUserName = username;
        $("#js_mailPassWord").el.value = ""
    }
  
}
//搜索切换
var SE = (function () {
    var HiddenParams = [$("#searchForm").el.tn, $("#searchForm").el.ch];
    // $("#sf .int").el.focus();
    function setForm(searchItem) {
        $("#searchForm").el.action = searchItem.action;
        $("#sf_label img").el.src = searchItem.img[0];
        $("#sf_label img").el.setAttribute("alt", searchItem.img[1]);
        $("#sf .searchWord").el.name = searchItem.name;
        $("#sf .searchSubmit ").el.value = searchItem.btn;
        $("#sf_label").el.href = searchItem.url;

        if (HiddenParams.length > 0) {
            HiddenParams = removeParams(HiddenParams);
        }
        function removeParams(inputArr) {
            for (var i = 0, len = inputArr.length; i < len; i++) {
                $("#searchForm").remove(inputArr[i]);
            }
            return [];
        }
        for (var item in searchItem.params) {
            $("#searchForm").create("input", {
                name: item,
                value: searchItem.params[item],
                type: "hidden"
            }, function (el) {
                HiddenParams.push(el);
                this.append(el);
            })
        } //创建需要的参数，并保存数组中
    }
    $("#sf .searchWord").on("mouseover", function (el) {
        if (cache.get("SE_ONFOCUS")) {
            return;
        }
        el.value = el.value;
        el.focus();
    });
    $("#sf .searchWord").on("blur", function (el) {
        cache.remove("SE_ONFOCUS");
    })
    $("#sf .searchWord").on("focus", function (el) {
        cache.set("SE_ONFOCUS", true);
        if (Browser.isIE) {
            Yl.getFocus(el);
        } else {
            el.focus();
        }
    });
    return {
        set: setForm
    };
})();

document.onclick = function (e) {
    var e = e || window.event, obj = e.srcElement || e.target, tid = obj.id;
    if ($("#js_mailLogin").el) {
        if (tid === "js_mailUsername") {
        }
        else if (tid === "js_mailPassWord") {
        }
        else if (tid === "js_mailSubmit") {
        }
        else if (tid === "js_mailServer") {
        }
        else if (obj.className === 'mailPromptPw') { 
        }
        else if (obj.parentNode.id === 'js_eMailList' && $("#js_mailUsername").el.value !=='') {
            $("#js_mailLogin").show();
            $("#js_eMail").hasClass("e-mailActived",function(pRst){
                if(!pRst) $("#js_eMail").addClass("e-mailActived");
            });
        }
        else {
            $("#js_mailLogin").hide();
            $("#js_eMail").removeClass("e-mailActived");
        }
    }
    if ($("#js_eMailList").el) {
        if (tid !== "js_mailServer") {
            $("#js_eMailList").hide();
            MailLogin.flag = false;
            if (obj.parentNode.id === 'js_eMailList' && obj.className.toString() === 'no') {
                $("#js_eMailList").show();
                $("#js_mailLogin").hide();
                MailLogin.flag = true;
            }
        }
        else {
            $("#js_mailLogin").hide();
            if (!MailLogin.flag) {
                $("#js_eMailList").show();
                MailLogin.flag = true;
            }
            else {
                $("#js_eMailList").hide();
                MailLogin.flag = false;
            }
        }
    }

    function isLink(el){return el.tagName && el.tagName.toUpperCase() == "A";}
    if (isLink(obj) || isLink(obj.parentNode) || isLink(obj.parentNode.parentNode)) {
        if (obj.rel && obj.rel == 'nr') { return; }
        var L, T;
        if (obj.parentNode.tagName.toUpperCase() == "A" && obj.tagName.toUpperCase() == "IMG") {
            L = obj.parentNode.href, T = obj.alt;
        } else if (obj.parentNode.parentNode.tagName.toUpperCase() == "A") {
            L = obj.parentNode.parentNode.href,
            T = obj.innerHTML;
        } else {
            L = obj.href || "", T = obj.innerHTML;
            if (Yl.trim(L) == "javascript:void(0);" || Yl.trim(L) == "javascript:void(0)") {
                L = T;
            }
            if (obj.getAttribute("rel")) {
                L = T = obj.innerHTML;
            }
        }
        KeywordCount({
            u: L,
            n: T,
            q: 0
        });
        UserTrack.add(obj);
    }
    Config.Track.forEach(function (element) {
        if (tid == element[0]) {
            KeywordCount(element[1]);
        }
    });
};

//顶部右上角广告图片随机显示
var _imgarr = Math.floor(Math.random() * 2);
var _imgEl = document.getElementById("imgArr").getElementsByTagName("a");
_imgEl[_imgarr].style.display = 'inline';

//搜索TAB菜单开始
$("#sm_tab li").on("click", function (el) {
    $("#sf .searchWord").el.focus();
    $("#sm_tab li").removeClass("active");
    $(el).addClass("active");
    var rel = el.getAttribute("rel");
    KeywordCount({
        u: rel,
        n: rel,
        q: 0
    });
    cache.set("CURRENT_SE_TAB", rel);
    SE.set(Config.Search[rel]);
    
    if (Browser.isIE) {
        $("#sf .searchWord").el.value = $("#sf .searchWord").el.value;
    }

    $("#sw div").hide();

    $("div#sw_" + rel).show();
    return false;
}); //搜索TAB菜单结束


var HoverTab = function (el, fn) {
    //var evt = ["click", "mouseover"],
    var evt = ["click"],
    MouseDelayTime = 300, //鼠标延停时间
    waitInterval;
    var rel = el.getAttribute("rel");
    evt.forEach(function (element) {
        switch (element) {
            case "click":
                if (waitInterval) {
                    window.clearTimeout(waitInterval);
                }
                el["on" + element] = function () {
                    fn();
                    if (rel) {
                        KeywordCount({
                            u: rel,
                            n: rel,
                            q: 0
                        });
                    }
                }
                break;
            case "mouseover":
            /*
                el["on" + element] = function () {
                    if (waitInterval) {
                        window.clearTimeout(waitInterval);
                    }
                    waitInterval = window.setTimeout(function () {
                        fn();
                        if (rel) {
                            KeywordCount({
                                u: rel,
                                n: rel,
                                q: 0
                            });
                        }
                    }, MouseDelayTime);


                }
                el["onmouseout"] = function () {
                    if (waitInterval != undefined) {
                        window.clearTimeout(waitInterval);
                    }
                }*/
                break;
        }
    });
}

// Suggest功能
var Suggest = (function () {
    var K = $("#sf .searchWord"), S = $("#suggest"), TS = $("#topShow"), Query, //输入值
 currentKey = -1, dataScript = null, //数据脚本
 dataResult, //结果数据
 KeywordItems, //li
 mouseSelect = false, stopRequest = false, Hidestate = false, isClose = false;
    K.el.onkeydown = function (e) {
        var e = e || window.event;
        if (isClose) {
            return;
        }
        TS.hide();
        switch (e.keyCode) {
            case 38:
                if (Hidestate) {
                    if (this.value == "")
                        return;
                    S.show();
                    Hidestate = false;
                }
                else {
                    currentKey--
                }
                selectItem();
                break;
            case 40:
                if (Hidestate) {
                    if (this.value == "")
                        return;
                    S.show();
                    Hidestate = false;
                }
                else {
                    currentKey++
                }
                selectItem();
                break;
            case 27:
                this.value = Query;
                hideSuggest();
                break;
            case 13:
                cache.set("Handdle_Key", "13");
                hideSuggest();
                break;
            default:
                //stopRequest = false;
                break;
        }
    }

    K.el.onkeyup = function (e) {
        var e = e || window.event;
        if (isClose) {
            return;
        }

        Query = this.value;

        switch (e.keyCode) {
            case 38:
                stopRequest = true;

                break;
            case 40:
                stopRequest = true;
                break;
            case 8:
                if (this.value == "") {
                    hideSuggest();
                }
                else {
                    requestData();
                }
                break;
            case 27:
                this.value = Query;
                hideSuggest();
            case 13:
                cache.set("Handdle_Key", "13");
                hideSuggest();
                break;
            default:
                if (Query != "") {
                    requestData();
                }

                break;
        }
    }

    K.el.onblur = function () {
        if (!mouseSelect) {
            hideSuggest();
            TS.hide();
        }
    }

    function selectItem() {
        if (!KeywordItems)
            return;
        var len = KeywordItems.length;

        stopRequest = true;
        if (currentKey < 0) {
            currentKey = len - 1;
        }
        else
            if (currentKey >= len) {
                currentKey = 0;
            }
        for (var i = 0, len = KeywordItems.length; i < len; i++) {
            KeywordItems[i].className = "";
        }
        KeywordItems[currentKey].className = "hover";
        K.el.value = KeywordItems[currentKey].innerHTML;
    }

    function showSuggest() {
        if (typeof (dataResult) != "object" || typeof (dataResult) == "undefined")
            return;
        var html = '<ul>';
        dataResult.forEach(function (el, index, arr) {
            if (cache.get("CURRENT_SE_TAB") == "taobao") {
                html += '<li key="' + index + '">' + el[0] + '</li>';
            }
            else {
                html += '<li key="' + index + '">' + el + '</li>';
            }
        });
        html += '</ul>';
        KeywordItems = S.el.getElementsByTagName("li");
        S.el.innerHTML = html;
        S.show();
        currentKey = -1;
        Hidestate = false;
        mouseHandle();
    }
    function hideSuggest() {
        S.hide();
        Hidestate = true;

    }

    function closeSuggest() {
        K.el.setAttribute("autocomplete", "on");
        K.el.focus();
        S.hide();
        isClose = true;
    }

    function mouseHandle() {
        S.el.onmouseover = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;

            if (target.tagName.toUpperCase() == "LI") {
                for (var i = 0, len = KeywordItems.length; i < len; i++) {
                    KeywordItems[i].className = "";
                }
                target.className = "hover";
                currentKey = parseInt(target.getAttribute("key"));

                $(target).on("mouseout", function (el) {
                    el.className = "";
                })
            }
            mouseSelect = true;
        }
        S.el.onmouseout = function () {
            mouseSelect = false;
        }

        S.el.onclick = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;
            if (target.tagName.toUpperCase() == "LI") {
                K.el.value = target.innerHTML;
                K.el.focus();
                hideSuggest();
                var SF = document.getElementById("searchForm");
                cache.set("Handdle_Key", "S");
                SF.onsubmit();
                SF.submit();
            }
            if (target.id == "closeSugBtn") {
                closeSuggest();
            }

        }
    }
    function mouseCtrol() {
        TS.el.onmouseover = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;

            if (target.tagName.toUpperCase() == "LI") {
                $(target).addClass("hover");
                currentKey = parseInt(target.getAttribute("key"));
            }
            mouseSelect = true;
        }
        TS.el.onmouseout = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;
            if (target.tagName.toUpperCase() == "LI") {
                $(target).removeClass("hover");
            }
            mouseSelect = false;
        }

        TS.el.onclick = function (e) {
            var e = e || window.event, target = e.target || e.srcElement;
            if (target.tagName.toUpperCase() == "A") {
                K.el.value = target.innerHTML;
                K.el.focus();
                TS.hide();
                $(".overArw").removeClass("up");
                var SF = document.getElementById("searchForm");
                cache.set("Handdle_Key", "TS");
                SF.onsubmit();
                SF.submit();
            }
            if (target.tagName.toUpperCase() == "LI") {
                K.el.value = target.getAttribute("rel");
                K.el.focus();
                TS.hide();
                $(".overArw").removeClass("up");
                var SF = document.getElementById("searchForm");
                cache.set("Handdle_Key", "TS");
                SF.onsubmit();
                SF.submit();
            }
        }
    }

    $("#searchForm").el.onsubmit = function () {
        var search_type = cache.get("CURRENT_SE_TAB") ? cache.get("CURRENT_SE_TAB") : "web";

        KeywordCount({
            type: search_type,
            word: K.el.value,
            url: window.location.href,
            key: cache.get("Handdle_Key")
        }, "http://www.tjj.com/click.php");
        
        /**114la统计：统计搜索关键词
        
        /**百度统计：统计搜索关键词**/
        if(_hmt){
           _hmt.push(['_trackEvent', '搜索框','submit', search_type, K.el.value ]);    
        }
        
    };
    $("#search_btn").on("click", function () {
        cache.set("Handdle_Key", "B");
    });

    function requestData() {
        var head = $("head").el;
        var TAB = cache.get("CURRENT_SE_TAB");
        if (dataScript) {
            if (TAB == "taobao") {
                dataScript.charset = "utf-8";
            }
            else {
                dataScript.charset = "gb2312";
            }
        }
        if (!Browser.isIE) {
            if (dataScript) {
                head.removeChild(dataScript);
            }
            dataScript = null;
        } // IE不需要重新创建script元素
        if (!dataScript) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (TAB == "taobao") {
                script.charset = "utf-8";
            }
            else {
                script.charset = "gb2312";
            }
            head.insertBefore(script, head.firstChild);
            dataScript = script;
        }
        var rd = new Date().getTime();
        var key = encodeURIComponent(K.el.value);

        var Url = "";
        switch (TAB) {
            case "taobao":
                Url = "http://suggest.taobao.com/sug?code=utf-8&callback=taobaoSU&q=" + key + "&rd=" + rd
                break;
            default:
                Url = "http://unionsug.baidu.com/su?wd=" + key + "&p=3&cb=baiduSU&t=" + rd;
        }
        dataScript.src = Url;

    }
    //baidu
    window.baiduSU = function (O) {
        if (typeof (O) == "object" && typeof (O.s) != "undefined" && typeof (O.s[0]) != "undefined") {
            dataResult = O.s;
            showSuggest();
        }
        else {
            hideSuggest();
        }
    };
    window.taobaoSU = function (O) {
        if (typeof (O) == "object" && typeof (O.result) != "undefined" && typeof (O.result[0][0]) != "undefined") {
            dataResult = O.result;
            showSuggest();
        }
        else {
            hideSuggest();
        }
    }
    
})(); //搜索自动完成



/*历史记录*/
var UserTrack = (function () {
    function add(o) {
        try {
            if (o.tagName.toUpperCase() == ("A") && o.href.indexOf("http://") == 0 && o.href.indexOf("http://" + Yl.getHost()) != 0) {
                if (o.rel && o.rel == "nr") {
                    return;
                }
                var Track = {
                    url: o.href,
                    content: o.innerHTML
                },
                data = Track.url + "_[TEXT]_" + Track.content + "_[YLMF]_",
                oldData = Cookie.get("history");
                if (oldData) {
                    if (oldData.indexOf(data) > -1) {
                        oldData = oldData.replace(data, "");
                    }
                    data += oldData;
                }
                Cookie.set("history", data, null, null, 'www.114la.com');
                var Hbox;
                if (document.getElementById('bb1')) {
                    Hbox = document.getElementById('bb1').getElementsByTagName("iframe");
                }
                if (Hbox && Hbox.length) {
                    Hbox[0].contentWindow.History.show();
                }
            }

        } catch (e) { }

    };

    return {
        add: add
    }

})();



//工具轮换tab
var ToolTaber = {
    init : function(opt){
        var num = 0;
        if(!opt) 
        opt = {
            til:undefined,
            conClass:undefined,
            tilCur:'active' || undefined
        };
        opt.til.each(function (el) {
            HoverTab(el, function () {
                opt.til.removeClass("active");
                el.className = opt.tilCur;
                show(el.getAttribute("rel"));
            });
            var show = function (box) {
                opt.conClass.hide();
                $("#" + box).show();
            }
         });
    }
};

 
for(var z=1;z<6;z++){
    ToolTaber.init({
        til:$("#aside-col0" + z + "-tab li"),
        conClass:$("#aside-col0" + z + "-cont .comWrap"),
        tilCur:'active'
    });
}
//新增二级分类
if (Browser.isIE == '6.0') {
    $("#tool-imp li").on("mouseover", function (el) {
        $("#tool-imp li").removeClass("hover");
        $(el).addClass("hover");
    });
    $("#tool-imp li").on("mouseout", function (el) {
        $("#tool-imp li").removeClass("hover");
    });
}

function KeywordCount(keyword, Counturl) {
    if (!keyword || keyword == "") {
        return
    }
    var url = Counturl || "http://www.tjj.com/index";

    var rd = new Date().getTime();
    var Count = new Image();
    var countVal = "";
    for (var i in keyword) {
        if (i == 'u') {
            countVal += ('?' + i + '=' + encodeURIComponent(keyword[i]));
        } else {
            countVal += ('&' + i + '=' + encodeURIComponent(keyword[i]));
        }
    }
    if (url == "http://www.tjj.com/index") {
        Count.src = url + countVal + '&i=' + rd + "&uid=" + YLMF.UID;
    } else {
        Count.src = url + "?i=" + rd + countVal + "&uid=" + YLMF.UID;
    }

}

var kuxun = (function () {
    //--------把中文字符转换成Utf8编码------------------------//
    function EncodeUtf8(s1){
        var s = escape(s1);
        var sa = s.split("%");
        var retV ="";
        if(sa[0] != "")
        {
         retV = sa[0];
        }
        for(var i = 1; i < sa.length; i ++)
        {
           if(sa[i].substring(0,1) == "u")
           {
               retV += Hex2Utf8(Str2Hex(sa[i].substring(1,5)));
                
           }
           else retV += "%" + sa[i];
        }

        return retV;
    }
    window.EncodeUtf8 = EncodeUtf8;
  function Str2Hex(s)
  {
      var c = "";
      var n;
      var ss = "0123456789ABCDEF";
      var digS = "";
      for(var i = 0; i < s.length; i ++)
      {
         c = s.charAt(i);
         n = ss.indexOf(c);
         digS += Dec2Dig(eval(n));
            
      }
      //return value;
      return digS;
  }
  function Dec2Dig(n1)
  {
      var s = "";
      var n2 = 0;
      for(var i = 0; i < 4; i++)
      {
         n2 = Math.pow(2,3 - i);
         if(n1 >= n2)
         {
            s += '1';
            n1 = n1 - n2;
          }
         else
          s += '0';
           
      }
      return s;
       
  }
  function Dig2Dec(s)
  {
      var retV = 0;
      if(s.length == 4)
      {
          for(var i = 0; i < 4; i ++)
          {
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
  }
  function Hex2Utf8(s)
  {
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16)
     {
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10);
         tempS += "10" + s.substring(10,16);
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++)
         {
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
  } 
    return {
        searchTicket: function () {
            var _q = document.getElementById("jP_startCity").value;
            var _k = document.getElementById("jP_toCity").value;
            var _d = document.getElementById("jp_today").value;
            var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=20&FlightWay=0";
            if(_q ==''){
                alert("请输入出发地!");
            }
            else{
                _q = EncodeUtf8(EncodeUtf8(_q));
            }
            if(_k ==''){
                alert("请输入到达地!");
            }
            else{
                _k = EncodeUtf8(EncodeUtf8(_k));
            }
            if(_d ==''){
                alert("请输入起飞日期!");
            }
            _kw += "&StartCity="+_q+"&DestCity="+_k+"&DepartDate="+_d+"&sid=1250&allianceid=1112";
            if(_q !='' && _k!='' && _d!=''){
                window.open(_kw);
            }
        },
        searchHotel: function () {
            var _q = document.getElementById("ht_city").value;
            var _k = document.getElementById("ht_key").value;
            var _d = document.getElementById("ht_today").value;
            var _kw ="http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=10";
            if(_q !=''){
                _q = EncodeUtf8(EncodeUtf8(_q));
            }
            else{
                alert("请输入入住城市！");
            }
            if(_d ==''){
                alert("请输入入住日期！");
            }
            if(_k!=''){
                _k = EncodeUtf8(EncodeUtf8(_k));
            }
            _kw +="&CityName="+_q+"&CheckInDate="+_d+"&CheckOutDate="+_d+"&HotelName="+_k+"&sid=1250&allianceid=1112";
          
            if(_q !='' && _d !=''){
                window.open(_kw);
            }
        },
        searchTravel: function () {
            var _q = document.getElementById("daodao_travel_q").value;
            var _k = document.getElementById("daodao_travel_k").value;
            var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=30";
            if(_q == ''){
                alert('请输入出发地！');
            }
            else{
                _q = EncodeUtf8(EncodeUtf8(_q));
            }
            if(_k == ''){
            }
            else{
                _k = EncodeUtf8(EncodeUtf8(_k));
            }
            _kw+='&StartCity='+_q+'&SearchValue='+_k+'&Channel=1&CurrentTab=0&sid=1250&allianceid=1112';
            if(_q!=''){window.open(_kw);}
        }
    }
})();

/**
* ==========================================
* 搜索滚动新闻
* Copyright (c) 2013 wwww.114la.com
* ==========================================
*/
;(function(){
    window.Ylmf.toplist = function(topData){
        //init
        // var _html = "<ul>";
        // for(var i = 0;i<topData.length;i++){
        //     _html += '<li class="' + (i == 0?'cur':'') +'"><span class="bot-nub ' + (i<3?'bot-r':'') +'">' + (i+1) + '</span><a href="' + topData[i]["url"] + '">' + topData[i]["title"] + '</a><i></i></li>';
        // }
        // _html += "</ul>";
        // $("#s-hot .hot-con").html(_html);
        // $(".col-hotKeys").html(_html);
        //init end
        var timer,
        anim,
        curI = 0,
        hotPanel = $("#s-hot"),
        hotKeys  = $(".col-hotKeys"),
        hotKeyHover,
        fadeIning = false,
        hotKeyItems = $(".col-hotKeys li");
        function hotFadeOut(){
            anim && anim.stop();
            anim = new Animate(hotPanel.get(0), 'opacity', {
                  from: parseInt(hotPanel.getStyle("opacity"),10),
                  to: 0,
                  time: 300,
                  callback:function(){
                    hotPanel.hide();
                  }
                });
            anim.start();
        };
        function hotFadeIn(){
            if(fadeIning)return;
            anim && anim.stop();
            hotPanel.show();
            anim = new Animate(hotPanel.get(0), 'opacity', {
                  from: parseInt(hotPanel.getStyle("opacity"),10),
                  to: 1,
                  time: 200,
                  callback:function(){
                    fadeIning = false;
                  }
                });
            fadeIning = true;
            anim.start();
        }
        hotPanel.hover(function(){
            window.clearTimeout(timer);
            window.clearTimeout(_mouseTimmer);
            hotKeyHover = true;
            hotFadeIn();
        },function(){
            window.clearTimeout(timer);
            hotKeyHover = false;
            timer = window.setTimeout(hotFadeOut,400);
        });
        
        hotKeys.hover(function(){
            hotKeyHover = true;
        },function(){
            hotKeyHover = false;
            
        });
        var _clone = $(".col-hotKeys li").get(0).cloneNode(true);
        $(".col-hotKeys ul").append(_clone);
        var _mouseTimmer;
        $(".col-hotKeys i").on("mouseover",function(){
            window.clearTimeout(_mouseTimmer);
            _mouseTimmer = window.setTimeout(hotFadeIn,200);
        });
        $(".col-hotKeys i").on("mouseout",function(){
            window.clearTimeout(_mouseTimmer);
        });
        window.setInterval(function(){
            if(hotKeyHover)return;
            
            if(curI == hotKeyItems.size()){
                curI = 0;
            }
        
            $("#s-hot li").removeClass("cur").eq((curI+1) % hotKeyItems.size()).addClass("cur");
            new Animate($(".col-hotKeys ul").get(0), 'top', {
                  from: - curI * 35,
                  to: -(curI++ * 35 + 35),
                  time: 200
            }).start();   
        },5000);
    }
    // Ylmf.ScriptLoader.Add({
    //     src: "http://api4.114la.com/1114_2.json?t=" + parseInt(Math.random() * 10000),
    //     charset: "utf-8"
    // });
    window.Ylmf.toplist();
})();


$("ul.colTitle li a").on("click",function(el){
    var _event = YLMF.getEvent(),
        _par = $(el.parentNode);
    if(!_par.hasClass("active")){
        if(_event.preventDefault){
            _event.preventDefault();
        }else{
             window.event.returnValue = false; 
        }
    }
    return false;  
});
//右边侧栏
function sliderTab(wrapId,liWrapClass,time){
    function _next(){
        $("#" + wrapId + " .comWrap").each(function(n){
            if($(n).getStyle("display") == "block"){
                var _id = n.id,
                    _lis = $("#" + _id + " ." + liWrapClass + " li");
                var _i = null;
                _lis.each(function(_li,i){
                    if($(_li).getStyle("display") == "block"){
                        if(_i != null)return;
                        _i = i - 1;
                        if(i <= 0){
                            _i = _lis.size() - 1;
                        }
                    }
                });
                _i = _i || 0;
                _lis.hide();
                _lis.eq(_i).show();
                new Animate(_lis.get(_i), 'opacity', {
                  from: 0,
                  to: 1,
                  time: 500
                }).start();
            }
        });
    }
    function _pre(){
        $("#" + wrapId + " .comWrap").each(function(n){
            if($(n).getStyle("display") == "block"){
                var _id = n.id,
                    _lis = $("#" + _id + " ." + liWrapClass + " li");
                var _i = null;
                _lis.each(function(_li,i){
                    if($(_li).getStyle("display") == "block"){
                        if(_i != null)return;
                        _i = i + 1;
                        if(i >= _lis.size() - 1){
                            _i = 0;
                        }
                    }
                });
                _i = _i || 0;
                _lis.hide();
                _lis.eq(_i).show();
                new Animate(_lis.get(_i), 'opacity', {
                  from: 0,
                  to: 1,
                  time: 500
                }).start();
            }
        });
    };
    var _intervalTimmer;
    function _starAuto(){
        window.clearInterval(_intervalTimmer);
        _intervalTimmer = window.setInterval(function(){
            _next();
        },time || 6000);
    }
    function _stopAuto(){
        window.clearInterval(_intervalTimmer);
    }
    $("#" + wrapId + " ." + liWrapClass).hover(function(){
        _stopAuto();
    },function(){
        _starAuto();
    })
    $("#" + wrapId + " .lft").on("click",function(){
        _next();
    });
    $("#" + wrapId + " .rgt").on("click",function(){
        _pre();
    });
    window.setTimeout(function(){
        _starAuto();
    },8000 * Math.random(0,1));
}
sliderTab("aside-col01-cont","mslide");
sliderTab("aside-col02-cont","msColi");
sliderTab("aside-col03-cont","msColi");
sliderTab("aside-col04-cont","mslide");

$("#c_shop,#c_rest,#c_home,#c_game").on("click",function(el){
    var _top = document.documentElement.scrollTop || document.body.scrollTop;
    var _topList = {
       "c_shop" : 2232,
       "c_rest" : 2628,
       "c_home" : 1680,
       "c_game" : 1862
    }
    new Animate(window, 'scrollTop', {
      from: _top,
      to: _topList[el.getAttribute("id")],
      time: 500
    }).start();
});

var gotoTop = {
    id: "#gotop",
    bottomId : "#c_goBot",
    wrap:document.getElementById("costom"),
    timmer : null,
    fps : 50,
    startTime : null,
    duration : 1000,
    toggleTimer : null,
    preAnimate : null,
    clickMe : function(){
        //$('html,body').animate({scrollTop : '0px'},{ duration:500});
        var _top = document.documentElement.scrollTop || document.body.scrollTop;
        new Animate(window, 'scrollTop', {
          from: _top,
          to: 0,
          time: 500
        }).start();
    },
    goBottom:function(){
        var scrollTop = 0;
        var clientHeight = 0;
        var scrollHeight = 0;
        var _docEle = document.documentElement;
        var _docBody = document.body;
        if (_docEle && _docEle.scrollTop) {
            scrollTop = _docEle.scrollTop;
        } else if (_docBody) {
            scrollTop = _docBody.scrollTop;
        }
        if (_docBody.clientHeight && _docEle.clientHeight) {
            clientHeight = (_docBody.clientHeight < _docEle.clientHeight) ? _docBody.clientHeight: _docEle.clientHeight;
        } else {
            clientHeight = (_docBody.clientHeight > _docEle.clientHeight) ? _docBody.clientHeight: _docEle.clientHeight;
        }
        scrollHeight = Math.max(_docBody.scrollHeight, _docEle.scrollHeight);

        new Animate(window, 'scrollTop', {
          from: scrollTop,
          to: scrollHeight - clientHeight,
          time: 500
        }).start();
    },
    toggleMe : function() {
        var _top = document.documentElement.scrollTop || document.body.scrollTop;
        if(_top > 500){
            $("#gotop").show();
            $("#c_goBot").hide();
        }else{
            $("#c_goBot").show();
            $("#gotop").hide();
        }
    },
    init : function() {
        $(this.id).on("click",function(){
            gotoTop.clickMe();
            return false;
        });
        $(this.bottomId).on("click",function(){
            gotoTop.goBottom();
            return false;
        });
        gotoTop.toggleMe();
        $(window).on('scroll', function(){
            window.clearTimeout(gotoTop.toggleTimer);
            gotoTop.toggleTimer = window.setTimeout(function(){
                gotoTop.toggleMe();
            },200);
        });
        $(window).on('resize', function(){
            window.clearTimeout(gotoTop.toggleTimer);
            gotoTop.toggleTimer = window.setTimeout(function(){
                gotoTop.toggleMe();
            },200);
        });

        
    }
};
gotoTop.init();
//图片延迟加载
function lazyload(container) {
    
    var _imgs = container.get(0).getElementsByTagName("img");
    
    for(var i = 0; i<_imgs.length; i++){
        var org = _imgs[i].getAttribute("org");
        if (org) {
            _imgs[i].setAttribute('src', org);
            _imgs[i].removeAttribute('org');
        }
    }
};
//var emEle = '<em />';
$("ul.colTitle li").each(function(_el){
    $(_el).hover(function(el){
        var box = el.getAttribute("rel");
        setTimeout(function(){
            lazyload($('#'+box));
        },500);
        $(el).addClass("hover");

    },function(el){
        $(el).removeClass("hover");
    });
});



;(function(){
    /** 边栏和底部调用接口数据 **/
    var CallApiData = (function(wdw){
        return function(){
            Ylmf.ScriptLoader.Add({
                //src:"public/rebuild/js/api/widget.json"+'?' + parseInt(Math.random()* 99),
                src:"http://www.114la.com/widget.json",
                charset:"utf-8"
            });
            wdw.Ylmf.widget = function(data){
                if(typeof data !=='Object' && typeof data!=='undefined' && data!==null){
                    var slider ='',news ='';
                    for(k in data){
                        function partOne(k,img,li){
                            slider = data[k][0]['slider'],len = (img < slider.length ? img:slider.length);
                            news = data[k][0]['news'],len2 = (li < news.length ? li:news.length );
                            for(var i = 0;i < len;i++){
                                $('#'+k+' ul.mslide li').eq(i).each(function(el){
                                    if(k == 'xinwen' || k == 'hotsales'){
                                        el.innerHTML = '<a href="'+slider[i]['url']+'" title="'+slider[i]['title']+'">'
                                                            +'<img src="'+slider[i]['img_url']+'" alt="'+slider[i]['title']+'" />'
                                                            +'<cite>'+slider[i]['title']+'</cite>'
                                                        +'</a>';
                                    }else{
                                        el.innerHTML = '<a href="'+slider[i]['url']+'" title="'+slider[i]['title']+'">'
                                                            +'<img style="background:url( static/images/loading.gif ) no-repeat center" org="'+slider[i]['img_url']+'" alt="'+slider[i]['title']+'" />'
                                                            +'<cite>'+slider[i]['title']+'</cite>'
                                                        +'</a>';
                                    };
                                })
                            };
                            var html ='';
                            for(var j = 0;j < len2;j++){
                                html += '<li><a href="'+news[j]['url']+'" title="'+news[j]['title']+'">'+news[j]['title']+'</a></li>';
                            };
                            if(k == 'hotsales' || k == 'cloth' || k == 'tuan' || k =='shoes'){
                                $("#"+k+' ul.msCover').html(html);
                            }else{
                                $("#"+k+' ul.nslist').html(html);
                            }
                        };
                        switch(k){
                            case 'xinwen':
                                partOne(k,3,4);
                            break;
                            case 'junshi':
                                partOne(k,3,4);
                            break;
                            case 'tiyu':
                                partOne(k,3,4);
                            break;
                            case 'bagua':
                                partOne(k,3,4);
                            break;
                            
                        };
                    }
                }else{
                    $('.sedulist').html('<div style="line-height:335px;font-weight:bold;font-size:22px;">数据加载错误，请稍后再试。</div>')
                }
            }
        }()
    })(window)
})();

/**
* ==========================================
* 换肤
* Copyright (c) 2014 wwww.114la.com
* ==========================================
*/
(function(){
    var _themeShow = false,
        curAni = null;
        _theme = $("#theme");
        skinStyleObj = $("#js_skinStyle"), /**皮肤link css对象**/
        oSkinCss = Cookie.get(Config.SkinCookieName) || Config.defaultTheme;
        curSkinValue =  oSkinCss;
        _themeChangeLink = $("#themeChange a");
        _jsXhr = null;

        /** 经典蓝 **/
        var settingSkinClassicsBlue =(function(){
            var _run =function(){
                if(typeof($("#js_reOld"))!=='undefined'&&typeof($("#js_feedback"))!=='undefined'){
                    var reOldObj =$("#js_reOld");
                    var cssFilePath = 'static/css/skin/',
                        skinStyleObj = $("#js_skinStyle");
                    var reOldAObj =$("#js_reOld a");
                    reOldAObj.on('click',function(el){
                        $(el).hasClass('exp-new',function(pRst){
                            if(!pRst){
                                Cookie.set('oldLayout',1);
                                $(el).addClass('exp-new');
                                el.innerHTML='\u6062\u590d\u9ed8\u8ba4';//恢复默认
                                Cookie.set('skinCss', 'classicsBlue');
                                curSkinValue = 'classicsBlue';
                                skinStyleObj.el.setAttribute('href', cssFilePath + 'classicsBlue.css?'+Math.round(Math.random() * 10000));
                                $(".box-mySetting .skin-list li").removeClass('actived');//fixed by goochin
                                $("#js_skinList #js_classicsBlue").addClass('actived');
                                if(Cookie.get("ws")){
                                    $("#classicsWrap").addClass("kpWrap");
                                }
                                _refreshCurClass();
                            }
                            else{
                                $("#classicsWrap").removeClass("kpWrap");
                                $(el).removeClass('exp-new');
                                el.innerHTML='\u7ecf\u5178\u84dd';//经典蓝
                                Cookie.clear('oldLayout');
                                Cookie.clear('ws');
                                Cookie.set('skinCss', 'blue');
                                curSkinValue = 'blue';
                                skinStyleObj.el.setAttribute('href', cssFilePath + 'blue.css?'+Math.round(Math.random() * 10000));
                                $("#js_skinList #js_classicsBlue").removeClass('actived');
                                var _ws = document.getElementById("ws");
                                if(_ws){
                                    _ws.parentNode.removeChild(_ws);
                                }
                                
                                _refreshCurClass();
                            }
                        })
                        if(Browser.isIE){
                            window.location.reload(true);
                        }
                    });
                    if (Cookie.get('oldLayout')){
                        reOldAObj.el.innerHTML='\u6062\u590d\u9ed8\u8ba4';
                        reOldAObj.addClass('exp-new');
                    }
                    else{
                        reOldAObj.el.innerHTML='\u7ecf\u5178\u84dd';
                        reOldAObj.removeClass('exp-new');
                    }
                }
            }
            return {
                run:_run
            }
        })();
        settingSkinClassicsBlue.run();
    function _loadSkinJs(skinValue){
        var _jsUrl = Config.getThemeJs(skinValue);
        if(_jsUrl){
            if(_jsXhr){
                try{
                    _typeChangeXhr.onreadystatechange = null; // no go in IE
                    _typeChangeXhr.abort();
                }catch(e){}
            }
            _jsXhr = Ajax.request(_jsUrl,{
                "success" : function(xhr){
                    eval(xhr.responseText);
                }
            })
        }
    }
    _loadSkinJs(curSkinValue);
    /***预览行为***/
    function _previewSkin(skinValue) {
        curSkinValue = skinValue;
        skinStyleObj.el.setAttribute('href', Config.cssFilePath + skinValue + '.css');
        
        _loadSkinJs(skinValue);
        //ie png fix
        (typeof DD_belatedPNG != "undefined") && DD_belatedPNG.applyVML(document.getElementById("logo"));
    }
    /***记录皮肤cookie行为***/
    function _save(skinValue) {
        oSkinCss = curSkinValue;
        Cookie.set(Config.SkinCookieName, skinValue);
    }
    /***清除皮肤cookie行为***/
    function _clear(){
        Cookie.clear(Config.SkinCookieName);
    }

    function _refreshCurClass(){
        
        _themeLis && _themeLis.each(function(el){
                if(el.getAttribute("skin") == curSkinValue){
                    $(el).addClass("curTheme");
                }else{
                    $(el).removeClass("curTheme");
                }
        })
    }

    function _hideChoose(){
        if(Animate.canTransition){
            $("#theme").setStyle("height","0px");
        }else{
            curAni && curAni.stop();
            curAni = new Animate($("#theme").get(0), 'height', {
              from: 210,
              to: 0,
              time: 300
            });
            curAni.start();
        }
        _themeChangeLink.html("换肤");
        $("#themeChange").removeClass("themeChangeDown");
        _themeShow = false;
    }
    function _showChoose(){
        if(Animate.canTransition){
            $("#theme").setStyle("height","210px");
        }else{
            curAni && curAni.stop();
            curAni =new Animate($("#theme").get(0), 'height', {
              from: 0,
              to: 210,
              time: 300
            });
            curAni.start();
        }
        _themeChangeLink.html("收起");
        $("#themeChange").addClass("themeChangeDown")
        _themeShow = true;
    }

    $("#themeChange").on("click",function(){
        if(_themeShow){
            _save(curSkinValue);
            _hideChoose();
        }else{
            _showChoose();
        }
    });
    var _curPage = 0,
        _moveWidth = 900;
        _sliderUl = null,
        _curSliderAni = null,
        _typeLinks  = null,
        _themeSlider = null,
        _typeChangeXhr = null,
        _themeLis = null,
        _totalPage = 0,
        _pageNubUl = null,
        _totalPageSpan = null;
    function _initSlider(){
        _sliderUl = $("#themeSliderUl");
        var _lis = _sliderUl.findChild("li");
        _totalPage = Math.ceil(_lis.length/6);
        _curPage = 0;
        _themeLis =  $("li",_sliderUl.el);
        _themeLis.on("click",function(el){
            var _skinVal = el.getAttribute("skin");
            _themeLis.removeClass("curTheme");
            $(el).addClass("curTheme");
            _previewSkin(_skinVal);
        });
        _themeLis.each(function(_el){
            $(_el).hover(function(_subEl){
                $(_subEl).addClass("themeLiHover");
            },function(_subEl){
                $(_subEl).removeClass("themeLiHover");
            })
        });
        _totalPageSpan.html("/" + _totalPage + "页");
        var _pageHtml = "";
        for(var i =0; i< _totalPage ;i++){
            _pageHtml += "<li>" + (i + 1) + "</li>";
        }
        _pageNubUl.setStyle("top","0px").html(_pageHtml);
        _refreshCurClass();
    }

    var _el = $("#themeChange").el;
    if (window.addEventListener) {
        _el.addEventListener("mouseover", _loadThemeHtml , false);
    }else{
        _el.attachEvent('onmouseover', _loadThemeHtml);
    }
    function _loadThemeHtml(){
        if (window.removeEventListener) {
            _el.removeEventListener("mouseover", _loadThemeHtml, false);
        }
        else {
            _el.detachEvent("onmouseover", _loadThemeHtml);
        }
        //加载html
        Ajax.request(Config.getThemeUrl(),{
            success : function(xhr){
                $(".themeWrap",_theme.el).html(xhr.responseText);
                $(".themeWrap",_theme.el).removeClass("loadingBig");
                _sliderUl = $("#themeSliderUl");
                _typeLinks = $(".themeTop a",_theme.el);
                _themeSlider = $(".themeSlider",_theme.el);
                _pageNubUl = $(".themePagger ul",_theme.el);
                _totalPageSpan = $(".themePagger span.after",_theme.el);
                //刷新皮肤内容
                _typeLinks.on("click",function(el){                 
                    _typeLinks.removeClass("cur");
                    $(el).addClass("cur");
                    _themeSlider.html("");
                    _themeSlider.addClass("loadingBig");
                    var _classType = el.getAttribute("alt");
                    if(_typeChangeXhr){
                        try{
                            _typeChangeXhr.onreadystatechange = null; // no go in IE
                            _typeChangeXhr.abort();
                        }catch(e){}
                    }                   
                    _typeChangeXhr =  Ajax.request(Config.getThemeTypeUrl(_classType),{
                        success : function(_xhr2){
                            _themeSlider.html(_xhr2.responseText);
                            _themeSlider.removeClass("loadingBig");
                            _initSlider();
                        }
                    });
                });
                //点击保存
                $("#themeSave").on("click",function(el){
                    _save(curSkinValue);
                    _hideChoose();
                });
                //点击取消
                $("#themeCan").on("click",function(el){
                    _previewSkin(oSkinCss);
                    _refreshCurClass();
                    _hideChoose();
                });
                //点击不使用皮肤
                $("#themeDel").on("click",function(el){
                    _previewSkin(Config.defaultTheme);
                    _refreshCurClass();
                    _save(curSkinValue);
                    _hideChoose();
                });
                $(".themeRight",_theme.el).on("click",function(){
                    
                    if(_curPage >= _totalPage - 1){
                        _curSliderAni && _curSliderAni.stop();
                        _curSliderAni = new Shake(_sliderUl.get(0), 'left', {
                          from: parseInt(_sliderUl.getStyle("left"),0),
                          to:  -_curPage * _moveWidth,
                          time: 800,
                          amplitude : -100
                        });
                        _curSliderAni.start();
                        return;
                    }
                    _curPage++;
                    _curSliderAni && _curSliderAni.stop();
                    _curSliderAni = new Animate(_sliderUl.get(0), 'left', {
                      from: parseInt(_sliderUl.getStyle("left"),0),
                      to: - _curPage * _moveWidth ,
                      time: 300
                    });
                    _curSliderAni.start();
                    _pageNubUl.setStyle("top",-_curPage * 24 + "px");
                });
                $(".themeLeft",_theme.el).on("click",function(){
                    if(_curPage <= 0){
                        _curSliderAni && _curSliderAni.stop();
                        _curSliderAni = new Shake(_sliderUl.get(0), 'left', {
                          from: parseInt(_sliderUl.getStyle("left"),0),
                          to:  -_curPage * _moveWidth,
                          time: 800,
                          amplitude : 100
                        });
                        _curSliderAni.start();
                        return;
                    }
                    _curPage--;
                    _curSliderAni && _curSliderAni.stop();
                    _curSliderAni = new Animate(_sliderUl.get(0), 'left', {
                      from: parseInt(_sliderUl.getStyle("left"),0),
                      to: - _curPage * _moveWidth ,
                      time: 300
                    });
                    _curSliderAni.start();
                    
                    _pageNubUl.setStyle("top",-_curPage * 24 + "px");
                });
                _initSlider();
            },
            failure : function(xhr){
            }
        }); 
    }
})();



/**
* ==========================================
* weather.js
* Copyright (c) 2012 wwww.114la.com
* ==========================================
*/

var __$ = function (id) { var doc = document; return doc.getElementById(id) }

//var TPL = '<a href="http://tool.114la.com/tianqi/#{cityid}" title="点击查看未来几天天气预报" target="_blank"><strong>#{city}</strong>&nbsp;<strong>今天</strong>&nbsp;<img align="absmiddle" onload="pngfix(this)" class="i" src="images/i/#{img1}.png" />&nbsp;#{today}&nbsp;&nbsp;<strong>明天</strong>&nbsp;<img align="absmiddle" onload="pngfix(this)" src="images/i/#{img2}.png" class="i" />&nbsp;#{tomorrow}</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="Weather.set();return false;" target="_self">[选择城市]</a>';


var W = document.getElementById('weather');
var Weather = {
    timer : null,
    CityCookieName: 'citydata',
    WeatherCookieName: 'weather',
    DefaultCity: ['109', '101010100', '101010100', '北京', '北京'],
    StatIPQueue: [],
    StatGetQueue: [],
    Set: function () {
        W.style.display = "none";
        __$("setCityBox").style.display = "";
        var City = Cookie.get(this.CityCookieName);
        if (City) {
            City = City.split(",");
        } else {
            City = this.DefaultCity;
        }
        __$("w_pro").value = City[0];
        this.initCitys(City[0]);
        __$("w_city").value = City[1];
        this.initAreaCitys(City[2]);
    },
    ShowStatus: function (num) {
        
        if (!num) { return }
        var TPL = '<ul class="weather"><li><h4 class="city">#{city}</h4><a class="cut" href="javascript:void(0);" onclick="Weather.Set();return false;">[切换]</a></li><li class="tWrap"><div class="i"><a href="http://tool.114la.com/tianqi/#{cityid}"><img  onload="pngfix(this)" title="#{img1_title}" src="static/images/weather/#{img1}.png" /></a></div><a href="http://tool.114la.com/tianqi/#{cityid}" target="_blank" class="t" title="#{jtitle}">今&nbsp;#{img1_title}<i class="tem">#{today}</i><i class="tem2">#{pollution}</i></a></li><li class="mWrap"><div class="i"><a href="http://tool.114la.com/tianqi/#{cityid}"><img onload="pngfix(this)" title="#{img2_title}" src="static/images/weather/#{img2}.png" /></a></div><a href="http://tool.114la.com/tianqi/#{cityid}" target="_blank" class="t" title="#{mtitle}">明&nbsp;#{img2_title}<i class="tem">#{tomorrow}</i></a></li></ul>';
        var str;
        $(".weather-tip").hide();
        switch (num) {
            case 100:
                str = '正在判断城市，请稍后...&nbsp; <a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[手动设置]</a> <a href="http://tool.114la.com/©©nqi/" target="_blank">快速查看</a>';
                break;
            case 101:
                str = '判断城市失败，默认为北京，请手动设置。';
                break;
            case 102:
                str = '正在获取天气数据，请稍候... <a href="http://tool.114la.com/tianqi/" target="_blank">快速查看</a>';
                break;
            case 404:
                str = '很抱歉，暂无该城市天气数据。<a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[选择其它城市]</a>';
                break;
            case 500:
                str = '服务器错误或本地网络过慢。<a href="javascript:void(0);" target="_self" onclick="Weather.Init();return false;">[点击重试]</a>';
                break;
            case 200:
                var result = arguments[1];
                var weekStr = ['日', '一', '二', '三', '四', '五', '六'],
                    nowD = new Date();
                var w1 = nowD.getDay();
                var w2 = nowD.getDay() == 6 ? 0 : w1 + 1;
                str = format(TPL, {
                    cityid: result[3],
                    city: result[0],
                    today: result[1],
                    tomorrow: result[2],
                    img1: result[4],
                    img2: result[5],
                    week1: weekStr[w1],
                    week2: weekStr[w2],
                    img1_title:result[6],
                    img2_title:result[7],
                    pollution : result[8],
                    jtitle : result[9],
                    mtitle : result[10]
                });
                break;
        }
        W.innerHTML = str;
    },
    Ip2City: function (callback) {
        this.ShowStatus(100);
        Ylmf.ScriptLoader.Add({
        src:'http://api.114la.com/ip',
        charset:'gb2312'
        });
        var that = this;
        
        if (typeof Ip2CityTimeOut != "undefined") {
            window.clearTimeout(Ip2CityTimeOut);
        }
        var Ip2CityTimeOut = window.setTimeout(function () {
            Cookie.clear(this.CityCookieName);
            callback && callback(that.DefaultCity);
        }, 3000);
        
        window.ILData_callback = function () {
            if (typeof (ILData) != "undefined") {
                if (typeof Ip2CityTimeOut != "undefined") {
                    window.clearTimeout(Ip2CityTimeOut);
                }
                if (ILData[2] && ILData[3]) {
                    var pid = Ylmf.getProId(ILData[2]);
                    var cid = Ylmf.getCityId(pid, ILData[3]);
                    var City = [pid, cid, cid, ILData[2], ILData[3]];
                    Cookie.set(that.CityCookieName, City);
                    callback && callback(City);
                }
                else{
                    that.ShowStatus(101);
                    /*var Ip2CityTimeOut = window.setTimeout(function () {
                        Cookie.set(that.CityCookieName, that.DefaultCity);
                        callback && callback(that.DefaultCity);
                    }, 3000);*/
                    Cookie.set(that.CityCookieName, that.DefaultCity);
                    callback && callback(that.DefaultCity);
                }
            }
        }
    },
    Get: function (cityid) {
        if (!cityid) return;
        var AleaId = cityid.slice(3, 7);
        var showStatus = this.ShowStatus;
        var that = this;
        showStatus(102);
        if (typeof TimeOut != "undefined") {
            window.clearTimeout(TimeOut);
        }
        if(!Cookie.get(this.CityCookieName)){
            var TimeOut = window.setTimeout(function () {
                showStatus(500);
                Cookie.clear(this.CityCookieName);
            }, 5000);
        }
        var api = 'http://weather.api.114la.com/openapi.php?cityid='+cityid+'';
        if (!Cookie.get(this.WeatherCookieName)) {
            
        }
        Ylmf.ScriptLoader.Add({
            src: api.toString(),
            charset: "utf-8"
        });
        window.Ylmf.getWeather = function (Data) {
            window.clearTimeout(Weather.timer);
            var _weather = $("#weather").el;
            if (typeof (Data) == "object" && typeof (Data) != "undefined" && typeof (Data.weatherinfo) != "undefined" && Data.weatherinfo != false) {
                var Desc = [Data.weatherinfo['temp1'], Data.weatherinfo['temp2']];
                var result = [Data.weatherinfo.city, Desc[0], Desc[1], cityid,Data.weatherinfo['img1'], Data.weatherinfo['img3'],Data.weatherinfo['weather1'],Data.weatherinfo['weather2'],Data.weatherinfo["pollution"],Data.weatherinfo["jtitle"],Data.weatherinfo["mtitle"]];
                var _weatherTip = $(".weather-tip");
                if (result) {
                    Weather.ShowStatus(200, result);
                    
                    $(".tWrap",_weather).hover(function(el){
                        $(el).addClass("tWrapHover");
                    },function(el){
                        $(el).removeClass("tWrapHover");
                    });
                    $(".mWrap",_weather).hover(function(el){
                        $(el).addClass("mWrapHover");
                    },function(el){
                        $(el).removeClass("mWrapHover");
                    });
                    if(Data.weatherinfo["pollution"] && Data.weatherinfo["pollution"] != ""){
                        $(".tWrap .tem",_weather).hide();
                    }
                    Weather.timer = window.setTimeout(function(){
                        $(".tem2",_weather).hide();
                        $(".tWrap .tem",_weather).show();
                    },10000);
                    var rainImgs = ["3","4","5","6","7","8","9","10","11","12","19","21","22","23","24","25"];
                    var snowImgs = ["13","14","15","16","17","26","27","28"];
                    var muaiImgs = ["53"];
                    if(snowImgs.indexOf(Data.weatherinfo['img1'])!= -1){
                        _weatherTip.el.childNodes[0].nodeValue = "今天有雪，小心路滑";
                    }
                    if(muaiImgs.indexOf(Data.weatherinfo['img1'])!= -1){
                        _weatherTip.el.childNodes[0].nodeValue = "雾霾天气，注意防护";
                    }
                    if(rainImgs.concat(snowImgs).concat(muaiImgs).indexOf(Data.weatherinfo['img1'])!= -1){
                        _weatherTip.show();
                        $(".weather-close",_weatherTip.el).on("click",function(){
                            _weatherTip.hide();
                        });
                        window.setTimeout(function(){
                            _weatherTip.hide();
                        },10000);
                    }
                    
                    Cookie.set(that.WeatherCookieName, 1);
                }
            } else if (Data.weatherinfo == false) {
                Weather.ShowStatus(404);
            }
        }
    },
    Init: function () {
        var ckname = this.CityCookieName;
        var that = this;
        if (Cookie.get(this.CityCookieName)) {
            var City = Cookie.get(this.CityCookieName).split(',');
            if (!City[2]) {
                Cookie.clear(this.CityCookieName);
                that.Init();
            }
            this.Get(City[2]);
        } else {
            this.Ip2City(function (City) {
                var C = Cookie.get(that.CityCookieName);
                if (C) {
                    C = C.split(',')
                    that.Get(C[2]);
                } else {
                    that.Get(City[2]);
                }
            });
        }
    },
    getAreas: function (cid, callback) {
        var AreaId = cid.slice(3, 7);
        Ylmf.ScriptLoader.Add({
            src: "http://weather.api.114la.com/" + AreaId + "/" + AreaId + ".txt"+'?' + parseInt(Math.random() * 99),
            charset: "utf-8"
        });
        window.Ylmf.getAreaCity = function (O) {
            if (typeof (O) == "object"
                && typeof (O.result) != "undefined"
                && typeof (O.result[0][0]) != "undefined") {
                callback(O.result);
            }
        }
    },
    initCitys: function (pid) {
        if (!pid) return;
        __$("w_city").innerHTML = "";
        for (var i = 0, len = CityArr.length; i < len; ++i) {
            var I = CityArr[i];
            if (I[1] == pid) {
                var option = document.createElement("option");
                option.value = I[2];
                option.innerHTML = I[3] + '&nbsp;' + I[0];
                __$("w_city").appendChild(option);
            }
        }
        __$("w_city").selectedIndex = 0;
    },
    initAreaCitys: function (cid, callback) {
        //$("l_city").innerHTML = "<option>选择地区</option>";
        __$("l_city").innerHTML = "";
        this.getAreas(cid, function (AreaCitys) {
            for (var i = 0, len = AreaCitys.length; i < len; ++i) {
                var I = AreaCitys[i];
                var option = document.createElement("option");
                if (I[0] == cid) {
                    option.selected = true;
                }
                option.value = I[0];
                option.innerHTML = I[2] + "&nbsp;" + I[1];
                __$("l_city").appendChild(option);
            }
            if (callback) {
                callback();
            }
        });
    },
    cp: function (val) {
        this.initCitys(val);
        __$("w_city").selectedIndex = 0;
        this.cc(__$("w_city").value);
    },
    cc: function (val) {
        this.initAreaCitys(val, function () { });
    },
    custom: function () {
        var City = Cookie.get(this.CityCookieName);
        if (City) {
            City = City.split(",")
        } else {
            City = this.DefaultCity;
        }
        var C = [__$("w_pro").value,
              __$("w_city").value,
              __$("l_city").value ? __$("l_city").value : __$("w_city").value,
              Ylmf.getSelectValue(__$("w_pro")),
              Ylmf.getSelectValue(__$("w_city"))
        ];
        if (City[2] != C[2]) {
            this.Get(C[2]);
            Cookie.set(this.CityCookieName, C);
        }
        __$("setCityBox").style.display = "none";
        W.style.display = "";

    },
    autoLoad: function () {
        Cookie.clear(this.CityCookieName);
        Cookie.clear(this.WeatherCookieName);
        //window.location.reload();
        this.Init();
        __$("setCityBox").style.display = "none";
        W.style.display = "";
    }

}
Weather.Init();


/**
* ==========================================
* citys.js
* Copyright (c) 2012 wwww.114la.com
* ==========================================
*/

var CityArr = [
["CategoryName", "ParentId", "Id"],
["华北地区", "0", "1"],
["北京", "1", "109"],
["北京", "109", "101010100", "B"],
["天津", "1", "110"],
["天津", "110", "101030100", "T"],
["河北", "1", "111"],
["石家庄", "111", "101090101", "S"],
["保定", "111", "101090201", "B"],
["承德市", "111", "101090402", "C"],
["沧州", "111", "101090701", "C"],
["衡水", "111", "101090801", "H"],
["邯郸", "111", "101091001", "H"],
["廊坊", "111", "101090601", "L"],
["秦皇岛", "111", "101091101", "Q"],
["唐山", "111", "101090501", "T"],
["邢台", "111", "101090901", "X"],
["张家口", "111", "101090301", "Z"],
["山西", "1", "112"],
["太原", "112", "101100101", "T"],
["长治", "112", "101100501", "C"],
["大同", "112", "101100201", "D"],
["晋中", "112", "101100401", "J"],
["晋城", "112", "101100601", "J"],
["临汾", "112", "101100701", "L"],
["吕梁", "112", "101101100", "L"],
["忻州", "112", "101101001", "X"],
["阳泉", "112", "101100301", "Y"],
["运城", "112", "101100801", "Y"],
["朔州", "112", "101100901", "Y"],
["内蒙古", "1", "113"],
["呼和浩特", "113", "101080101", "H"],
["阿拉善左旗", "113", "101081201", "A"],
["包头", "113", "101080201", "B"],
["赤峰", "113", "101080601", "C"],
["鄂尔多斯", "113", "101080701", "E"],
["呼伦贝尔", "113", "101081000", "H"],
["集宁", "113", "101080401", "J"],
["临河", "113", "101080801", "L"],
["通辽", "113", "101080501", "T"],
["乌海", "113", "101080301", "W"],
["乌兰浩特", "113", "101081101", "W"],
["锡林浩特", "113", "101080901", "X"],
["东北地区", "0", "2"],
["辽宁", "2", "114"],
["沈阳", "114", "101070101", "S"],
["鞍山", "114", "101070301", "A"],
["本溪", "114", "101070501", "B"],
["朝阳", "114", "101071201", "C"],
["大连", "114", "101070201", "D"],
["丹东", "114", "101070601", "D"],
["抚顺", "114", "101070401", "F"],
["阜新", "114", "101070901", "F"],
["葫芦岛", "114", "101071401", "H"],
["锦州", "114", "101070701", "J"],
["辽阳", "114", "101071001", "L"],
["盘锦", "114", "101071301", "P"],
["铁岭", "114", "101071101", "T"],
["营口", "114", "101070801", "Y"],
["吉林", "2", "115"],
["长春", "115", "101060101", "C"],
["白城", "115", "101060601", "B"],
["白山", "115", "101060901", "B"],
["吉林", "115", "101060201", "J"],
["辽源", "115", "101060701", "L"],
["四平", "115", "101060401", "S"],
["松原", "115", "101060801", "S"],
["通化", "115", "101060501", "T"],
["延吉", "115", "101060301", "Y"],
["黑龙江", "2", "116"],
["哈尔滨", "116", "101050101", "H"],
["大兴安岭", "116", "101050701", "D"],
["大庆", "116", "101050901", "D"],
["黑河", "116", "101050601", "H"],
["鹤岗", "116", "101051201", "H"],
["佳木斯", "116", "101050401", "J"],
["鸡西", "116", "101051101", "J"],
["牡丹江", "116", "101050301", "M"],
["齐齐哈尔", "116", "101050201", "Q"],
["七台河", "116", "101051002", "Q"],
["绥化", "116", "101050501", "S"],
["伊春", "116", "101050801", "Y"],
["双鸭山", "116", "101051301", "S"],
["华东地区", "0", "3"],
["上海", "3", "117"],
["上海", "117", "101020100", "S"],
["山东", "3", "118"],
["济南", "118", "101120101", "J"],
["滨州", "118", "101121101", "B"],
["德州", "118", "101120401", "D"],
["东营", "118", "101121201", "D"],
["菏泽", "118", "101121001", "H"],
["济宁", "118", "101120701", "J"],
["临沂", "118", "101120901", "L"],
["莱芜", "118", "101121601", "L"],
["聊城", "118", "101121701", "L"],
["青岛", "118", "101120201", "Q"],
["潍坊", "118", "101120601", "W"],
["威海", "118", "101121301", "W"],
["烟台", "118", "101120501", "Y"],
["日照", "118", "101121501", "R"],
["泰安", "118", "101120801", "T"],
["淄博", "118", "101120301", "Z"],
["枣庄", "118", "101121401", "Z"],
["安徽", "3", "119"],
["合肥", "119", "101220101", "H"],
["安庆", "119", "101220601", "A"],
["蚌埠", "119", "101220201", "B"],
["亳州", "119", "101220901", "B"],
["滁州", "119", "101221101", "C"],
["巢湖", "119", "101221601", "C"],
["池州", "119", "101221701", "C"],
["阜阳", "119", "101220801", "F"],
["淮南", "119", "101220401", "H"],
["黄山", "119", "101221001", "H"],
["淮北", "119", "101221201", "H"],
["六安", "119", "101221501", "L"],
["马鞍山", "119", "101220501", "M"],
["宿州", "119", "101220701", "S"],
["铜陵", "119", "101221301", "T"],
["芜湖", "119", "101220301", "W"],
["宣城", "119", "101221401", "X"],
["江苏", "3", "120"],
["南京", "120", "101190101", "N"],
["常州", "120", "101191101", "C"],
["南通", "120", "101190501", "N"],
["淮安", "120", "101190901", "H"],
["连云港", "120", "101191001", "L"],
["苏州", "120", "101190401", "S"],
["宿迁", "120", "101191301", "S"],
["泰州", "120", "101191201", "T"],
["无锡", "120", "101190201", "W"],
["徐州", "120", "101190801", "X"],
["扬州", "120", "101190601", "Y"],
["盐城", "120", "101190701", "Y"],
["镇江", "120", "101190301", "Z"],
["浙江", "3", "121"],
["杭州", "121", "101210101", "H"],
["湖州", "121", "101210201", "H"],
["嘉兴", "121", "101210301", "J"],
["金华", "121", "101210901", "J"],
["丽水", "121", "101210801", "L"],
["宁波", "121", "101210401", "N"],
["衢州", "121", "101211001", "Q"],
["绍兴", "121", "101210501", "S"],
["台州", "121", "101210601", "T"],
["温州", "121", "101210701", "W"],
["舟山", "121", "101211101", "Z"],
["江西", "3", "122"],
["南昌", "122", "101240101", "N"],
["抚州", "122", "101240401", "F"],
["赣州", "122", "101240701", "G"],
["九江", "122", "101240201", "J"],
["吉安", "122", "101240601", "J"],
["景德镇", "122", "101240801", "J"],
["萍乡", "122", "101240901", "P"],
["上饶", "122", "101240301", "S"],
["新余", "122", "101241001", "X"],
["宜春", "122", "101240501", "Y"],
["鹰潭", "122", "101241101", "Y"],
["福建", "3", "123"],
["福州", "123", "101230101", "F"],
["龙岩", "123", "101230701", "L"],
["宁德", "123", "101230301", "N"],
["南平", "123", "101230901", "N"],
["莆田", "123", "101230401", "P"],
["泉州", "123", "101230501", "Q"],
["三明", "123", "101230801", "S"],
["厦门", "123", "101230201", "X"],
["漳州", "123", "101230601", "Z"],
["中南地区", "0", "4"],
["河南", "4", "124"],
["郑州", "124", "101180101", "Z"],
["安阳", "124", "101180201", "A"],
["鹤壁", "124", "101181201", "H"],
["焦作", "124", "101181101", "J"],
["济源", "124", "101181801", "J"],
["开封", "124", "101180801", "K"],
["洛阳", "124", "101180901", "L"],
["漯河", "124", "101181501", "L"],
["南阳", "124", "101180701", "N"],
["平顶山", "124", "101180501", "P"],
["濮阳", "124", "101181301", "P"],
["商丘", "124", "101181001", "S"],
["三门峡", "124", "101181701", "S"],
["信阳", "124", "101180601", "X"],
["新乡", "124", "101180301", "X"],
["许昌", "124", "101180401", "X"],
["周口", "124", "101181401", "Z"],
["驻马店", "124", "101181601", "Z"],
["湖北", "4", "125"],
["武汉", "125", "101200101", "W"],
["鄂州", "125", "101200301", "E"],
["恩施", "125", "101201001", "E"],
["黄冈", "125", "101200501", "H"],
["黄石", "125", "101200601", "H"],
["荆州", "125", "101200801", "J"],
["荆门", "125", "101201401", "J"],
["潜江", "125", "101201701", "Q"],
["十堰", "125", "101201101", "S"],
["神农架", "125", "101201201", "S"],
["随州", "125", "101201301", "S"],
["天门", "125", "101201501", "T"],
["襄樊", "125", "101200201", "X"],
["孝感", "125", "101200401", "X"],
["咸宁", "125", "101200701", "X"],
["仙桃", "125", "101201601", "X"],
["宜昌", "125", "101200901", "Y"],
["湖南", "4", "126"],
["长沙", "126", "101250101", "C"],
["郴州", "126", "101250501", "C"],
["常德", "126", "101250601", "C"],
["衡阳", "126", "101250401", "H"],
["怀化", "126", "101251201", "H"],
["吉首", "126", "101251501", "J"],
["娄底", "126", "101250801", "L"],
["黔阳", "126", "101251301", "Q"],
["邵阳", "126", "101250901", "S"],
["湘潭", "126", "101250201", "X"],
["益阳", "126", "101250701", "Y"],
["岳阳", "126", "101251001", "Y"],
["永州", "126", "101251401", "Y"],
["株洲", "126", "101250301", "Z"],
["张家界", "126", "101251101", "Z"],
["广东", "4", "127"],
["广州", "127", "101280101", "G"],
["潮州", "127", "101281501", "C"],
["东莞", "127", "101281601", "D"],
//["东沙岛","127","101282105","D"],
["佛山", "127", "101280800", "F"],
["惠州", "127", "101280301", "H"],
["河源", "127", "101281201", "H"],
["江门", "127", "101281101", "J"],
["揭阳", "127", "101281901", "J"],
["梅州", "127", "101280401", "M"],
["茂名", "127", "101282001", "M"],
["清远", "127", "101281301", "Q"],
["韶关", "127", "101280201", "S"],
["汕头", "127", "101280501", "S"],
["深圳", "127", "101280601", "S"],
["汕尾", "127", "101282101", "S"],
["云浮", "127", "101281401", "Y"],
["阳江", "127", "101281801", "Y"],
["珠海", "127", "101280701", "Z"],
["肇庆", "127", "101280901", "Z"],
["湛江", "127", "101281001", "Z"],
["中山", "127", "101281701", "Z"],
["广西", "4", "128"],
["南宁", "128", "101300101", "N"],
["北海", "128", "101301301", "B"],
["百色", "128", "101301001", "B"],
["崇左", "128", "101300201", "C"],
["防城港", "128", "101301401", "F"],
["桂林", "128", "101300501", "G"],
["贵港", "128", "101300801", "G"],
["贺州", "128", "101300701", "H"],
["河池", "128", "101301201", "H"],
["柳州", "128", "101300301", "L"],
["来宾", "128", "101300401", "L"],
["钦州", "128", "101301101", "Q"],
["梧州", "128", "101300601", "W"],
["玉林", "128", "101300901", "Y"],
["海南", "4", "129"],
["海口", "129", "101310101", "H"],
["白沙", "129", "101310907", "B"],
["保亭", "129", "101311614", "B"],
["澄迈", "129", "101310604", "C"],
["昌江", "129", "101310806", "C"],
["东方", "129", "101310402", "D"],
["儋州", "129", "101310705", "D"],
["定安", "129", "101311109", "D"],
["临高", "129", "101310503", "L"],
["陵水", "129", "101311816", "L"],
["乐东", "129", "101312321", "L"],
["琼山", "129", "101310102", "Q"],
["琼中", "129", "101310208", "Q"],
["琼海", "129", "101311311", "Q"],
["清兰", "129", "101311513", "Q"],
["南沙岛", "129", "101312220", "N"],
["三亚", "129", "101310301", "S"],
["珊瑚岛", "129", "101312018", "S"],
["屯昌", "129", "101311210", "T"],
["通什", "129", "101312422", "T"],
["文昌", "129", "101311412", "W"],
["万宁", "129", "101311715", "W"],
["西沙", "129", "101311917", "X"],
["永署礁", "129", "101312119", "Y"],
["西北地区", "0", "5"],
["陕西", "5", "130"],
["西安", "130", "101110101", "X"],
["安康", "130", "101110701", "A"],
["宝鸡", "130", "101110901", "B"],
["汉中", "130", "101110801", "H"],
["商洛", "130", "101110601", "S"],
["铜川", "130", "101111001", "T"],
["渭南", "130", "101110501", "W"],
["咸阳", "130", "101110200", "X"],
["延安", "130", "101110300", "Y"],
["榆林", "130", "101110401", "Y"],
["甘肃", "5", "131"],
["兰州", "131", "101160101", "L"],
["白银", "131", "101161301", "B"],
["定西", "131", "101160201", "D"],
["合作", "131", "101161201", "H"],
["金昌", "131", "101160601", "J"],
["酒泉", "131", "101160801", "J"],
["临夏", "131", "101161101", "L"],
["平凉", "131", "101160301", "P"],
["庆阳", "131", "101160401", "Q"],
["天水", "131", "101160901", "T"],
["武威", "131", "101160501", "W"],
["武都", "131", "101161001", "W"],
["张掖", "131", "101160701", "Z"],
["宁夏", "5", "132"],
["银川", "132", "101170101", "Y"],
["固原", "132", "101170401", "G"],
["石嘴山", "132", "101170201", "S"],
["吴忠", "132", "101170301", "W"],
["中卫", "132", "101170501", "Z"],
["青海", "5", "133"],
["西宁", "133", "101150101", "X"],
["果洛", "133", "101150501", "G"],
["海西", "133", "101150701", "H"],
["海北", "133", "101150801", "H"],
["海东", "133", "101150201", "H"],
["黄南", "133", "101150301", "H"],
["海南", "133", "101150401", "H"],
["玉树", "133", "101150601", "Y"],
["新疆", "5", "134"],
["乌鲁木齐", "134", "101130101", "W"],
["阿勒泰", "134", "101131401", "A"],
["阿图什", "134", "101131501", "A"],
["阿克苏", "134", "101130801", "A"],
["阿拉尔", "134", "101130701", "A"],
["博乐", "134", "1011301601", "B"],
["昌吉", "134", "101130401", "C"],
["哈密", "134", "101131201", "H"],
["和田", "134", "101131301", "H"],
["克拉玛依", "134", "101130201", "K"],
["喀什", "134", "101130901", "K"],
["库尔勒", "134", "101130601", "K"],
["石河子", "134", "101130301", "S"],
["吐鲁番", "134", "101130501", "T"],
["塔城", "134", "101131101", "T"],
["伊宁", "134", "101131001", "Y"],
["西南地区", "0", "6"],
["重庆", "6", "135"],
["重庆", "135", "101040100", "C"],
["四川", "6", "136"],
["成都", "136", "101270101", "C"],
["阿坝", "136", "101271901", "A"],
["巴中", "136", "101270901", "B"],
["德阳", "136", "101272001", "D"],
["达州", "136", "101270601", "D"],
["广元", "136", "101272101", "G"],
["甘孜", "136", "101271801", "G"],
["泸州", "136", "101271001", "L"],
["乐山", "136", "101271401", "L"],
["凉山", "136", "101271601", "L"],
["眉山", "136", "101271501", "M"],
["绵阳", "136", "101270401", "M"],
["南充", "136", "101270501", "N"],
["内江", "136", "101271201", "N"],
["攀枝花", "136", "101270201", "P"],
["遂宁", "136", "101270701", "S"],
["广安", "136", "101270801", "G"],
["雅安", "136", "101271701", "Y"],
["宜宾", "136", "101271101", "Y"],
["资阳", "136", "101271301", "Z"],
["自贡", "136", "101270301", "Z"],
["贵州", "6", "137"],
["贵阳", "137", "101260101", "G"],
["安顺", "137", "101260301", "A"],
["毕节", "137", "101260701", "B"],
["都匀", "137", "101260401", "D"],
["凯里", "137", "101260501", "K"],
["六盘水", "137", "101260801", "L"],
["铜仁", "137", "101260601", "T"],
["遵义", "137", "101260201", "Z"],
["黔西", "137", "101260901", "Q"],
["云南", "6", "138"],
["昆明", "138", "101290101", "K"],
["保山", "138", "101290501", "B"],
["楚雄", "138", "101290801", "C"],
["大理", "138", "101290201", "D"],
["德宏", "138", "101291501", "D"],
["红河", "138", "101290301", "H"],
["景洪", "138", "101291601", "J"],
["临沧", "138", "101291101", "L"],
["丽江", "138", "101291401", "L"],
["怒江", "138", "101291201", "N"],
["曲靖", "138", "101290401", "Q"],
["思茅", "138", "101290901", "S"],
["文山", "138", "101290601", "W"],
["玉溪", "138", "101290701", "Y"],
["昭通", "138", "101291001", "Z"],
["中甸", "138", "101291301", "Z"],
["西藏", "6", "139"],
["拉萨", "139", "101140101", "L"],
["阿里", "139", "101140701", "A"],
["昌都", "139", "101140501", "C"],
["林芝", "139", "101140401", "L"],
["那曲", "139", "101140601", "N"],
["日喀则", "139", "101140201", "R"],
["山南", "139", "101140301", "S"],
["港澳台", "0", "7"],
["香港", "7", "140"],
["香港", "140", "101320101", "X"],
["澳门", "7", "141"],
["澳门", "141", "101330101", "A"],
["台湾", "7", "142"],
["台北县", "142", "101340101", "T"],
["高雄", "142", "101340201", "G"],
["花莲", "142", "101341001", "H"],
["嘉义", "142", "101340901", "J"],
["马公", "142", "101340801", "M"],
["彭佳屿", "142", "101341201", "P"],
["台南", "142", "101340301", "T"],
["台中", "142", "101340401", "T"],
["桃园", "142", "101340501", "T"],
["台东", "142", "101341101", "T"],
["新竹县", "142", "101340601", "X"],
["宜兰", "142", "101340701", "Y"]
]

