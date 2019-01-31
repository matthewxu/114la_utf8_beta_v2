var searchName = window.location.search;
var staticDomain = "http://www.114la.com/static4"; (function() {
	var a = ["good", "wgho", "setup", "touchds", "339la", "hang", "ie567", "sky", "361la"];
	var c = [["xy", "xy.html"], ["long", "long.html"], ["xiazaiba", "xiazaiba.html"], ["soft", "soft.html"], ["xs", "xs.html"], ["qvod", "qvod.html"], ["wl", "wl.html"], ["hua", "hua.html"], ["wgho", "wgho.html"], ["anyue", "anyue.html"], ["setup", "setup.html"]];
	for (var b = 0; b < c.length; b++) {
		if ("?" + c[b][0] == searchName) {
			window.location.href = "http://www.qq.net/" + c[b][1]
		}
	}
})();
var Config = {
	getThemeUrl: function() {
		return "http://www.114la.com/static/themes/default/theme/theme.html?t=" + parseInt(Math.random() * 100)
	},
	getThemeTypeUrl: function(a) {
		a = a || "newest";
		return staticDomain + "/public4/rebuild/theme/" + a + ".html?t=" + parseInt(Math.random() * 100)
	},
	getThemeJs: function(b) {
		var a = {
			singer: staticDomain + "/public4/rebuild/js/theme/singer.js",
			"2014women": staticDomain + "/public4/rebuild/js/theme/2014women.js"
		};
		return a[b]
	},
	cssFilePath: staticDomain + "/public4/rebuild/css/skin/",
	SkinCookieName: "skinCss",
	defaultTheme: "blue",
	Search: {
		s115: {
			action: "http://s.116.com/",
			name: "q",
			btn: "搜 索",
			img: ["public4/rebuild/images/search/116.gif", "116.com"],
			url: "http://s.116.com/",
			params: {
				ie: "gbk"
			}
		},
		web: {
			action: "http://www.baidu.com/s",
			name: "wd",
			btn: "百度一下",
			img: ["public4/rebuild/images/search/baidu.gif?v2.0", "百度首页"],
			url: "http://www.baidu.com/index.php?tn=" + BaiduTn.tn + "&ch=" + BaiduTn.ch,
			params: {
				tn: BaiduTn.tn,
				ch: BaiduTn.ch
			}
		},
		mp3: {
			action: "http://mp3.baidu.com/m",
			name: "word",
			btn: "百度一下",
			img: ["public4/rebuild/images/search/mp3.gif?v2.0", "百度一下"],
			url: "http://music.baidu.com/?ie=utf-8&ct=134217728&word=&tn=" + BaiduTn.tn + "&ch=" + BaiduTn.ch,
			params: {
				tn: BaiduTn.tn,
				ch: BaiduTn.ch,
				f: "ms",
				ct: "134217728",
				ie: "utf-8"
			}
		},
		v115: {
			action: "http://hz.v.baofeng.com/search/web/search.php",
			name: "keywords",
			btn: "暴风视频",
			img: ["public4/rebuild/images/search/bf-video.gif?v2.0", "暴风视频"],
			url: "http://hz.v.baofeng.com/",
			params: {}
		},
		image: {
			action: "http://image.baidu.com/i",
			name: "word",
			btn: "百度一下",
			img: ["public4/rebuild/images/search/pic.gif?v2.0", "百度图片"],
			url: "http://image.baidu.com/",
			params: {
				ct: "201326592",
				cl: "2",
				pv: "",
				lm: "-1"
			}
		},
		zhidao: {
			action: "http://zhidao.baidu.com/q",
			name: "word",
			btn: "百度一下",
			img: ["public4/rebuild/images/search/zhidao.gif?v2.0", "百度知道"],
			url: "http://zhidao.baidu.com/q?pt=ylmf_ik",
			params: {
				tn: "ikaslist",
				ct: "17",
				pt: "ylmf_ik"
			}
		},
		taobao: {
			action: "http://search8.taobao.com/browse/search_auction.htm",
			name: "q",
			btn: "淘宝搜索",
			img: ["public4/rebuild/images/search/taobao.gif?v2.0", "淘宝网"],
			url: "http://www.taobao.com/",
			params: {
				pid: "mm_33597634_3422071_11069807",
				unid: "114la",
				commend: "all",
				search_type: "action",
				user_action: "initiative",
				f: "D9_5_1",
				at_topsearch: "1",
				sid: "(05ba391dbdcada4634d4077c189eeef7)",
				sort: "",
				spercent: "0"
			}
		},
		baike: {
			action: "http://baike.baidu.com/searchword/",
			name: "word",
			btn: "搜索词条",
			img: ["public4/rebuild/images/search/baike.gif", "百度百科"],
			url: "http://baike.baidu.com/",
			params: {
				tn: "baiduWikiSearch",
				submit: "search",
				pn: "0",
				rn: "10",
				ct: "17",
				lm: "0"
			}
		},
		ditu: {
			action: "http://map.baidu.com/m",
			name: "word",
			btn: "搜索地图",
			img: ["public4/rebuild/images/search/ditu.gif", "百度地图"],
			url: "http://map.baidu.com/",
			params: {
				ie: "gbk"
			}
		},
		computer: {
			action: "http://search.yesky.com/searchproduct.do",
			name: "wd",
			btn: "搜 索",
			img: ["public4/rebuild/images/search/yesky.gif", "天极电脑"],
			url: "http://product.yesky.com/",
			params: {
				ie: "gbk"
			}
		}
	},
	Mail: [{
		val: 0
	},
	{
		action: "http://reg.163.com/CheckUser.jsp",
		params: {
			url: "http://entry.mail.163.com/coremail/fcg/ntesdoor2?lightweight=1&verifycookie=1&language=-1&style=15",
			username: "#{u}",
			password: "#{p}"
		}
	},
	{
		action: "https://reg.163.com/logins.jsp",
		params: {
			domain: "126.com",
			username: "#{u}@126.com",
			password: "#{p}",
			url: "http://entry.mail.126.com/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26language%3D0%26style%3D-1"
		}
	},
	{
		action: "https://ssl1.vip.163.com/logon.m",
		params: {
			username: "#{u}",
			password: "#{p}",
			enterVip: true
		}
	},
	{
		action: "http://mail.sina.com.cn/cgi-bin/login.cgi",
		params: {
			u: "#{u}",
			psw: "#{p}"
		}
	},
	{
		action: "http://vip.sina.com.cn/cgi-bin/login.cgi",
		params: {
			user: "#{u}",
			pass: "#{p}"
		}
	},
	{
		action: "https://edit.bjs.yahoo.com/config/login",
		params: {
			login: "#{u}@yahoo.com.cn",
			passwd: "#{p}",
			domainss: "yahoo",
			".intl": "cn",
			".src": "ym"
		}
	},
	{
		action: "https://edit.bjs.yahoo.com/config/login",
		params: {
			login: "#{u}@yahoo.cn",
			passwd: "#{p}",
			domainss: "yahoocn",
			".intl": "cn",
			".done": "http://mail.cn.yahoo.com/inset.html"
		}
	},
	{
		action: "http://passport.sohu.com/login.jsp",
		params: {
			loginid: "#{u}@sohu.com",
			passwd: "#{p}",
			fl: "1",
			vr: "1|1",
			appid: "1000",
			ru: "http://login.mail.sohu.com/servlet/LoginServlet",
			ct: "1173080990",
			sg: "5082635c77272088ae7241ccdf7cf062"
		}
	},
	{
		action: "http://login.mail.tom.com/cgi/login",
		params: {
			user: "#{u}",
			pass: "#{p}"
		}
	},
	{
		action: "http://passport.21cn.com/maillogin.jsp",
		params: {
			UserName: "#{u}@21cn.com",
			passwd: "#{p}",
			domainname: "21cn.com"
		}
	},
	{
		action: "https://reg.163.com/logins.jsp",
		params: {
			domain: "yeah.net",
			username: "#{u}@yeah.net",
			password: "#{p}",
			url: "http://entry.mail.yeah.net/cgi/ntesdoor?lightweight%3D1%26verifycookie%3D1%26style%3D-1"
		}
	},
	{
		action: "http://zx.passport.189.cn/Logon/UDBCommon/S/PassportLogin.aspx?PassportLoginRequest=3500000000400101%243qGTaeZcFhxvAWjKmUNeSXwAgn1LsgB7Baj1rQn96XNKuzpE%2baP%2b9Q6CDg1Bqmrnosfrnoa6ujbo%0aBzYxmWBAESIoGVwlaoSM4%2fMixUkU7%2fAcJ0L4Yrckifcqhk3rO22i",
		params: {
			__VIEWSTATE: "/wEPDwUKMTYxODg2ODExNQ9kFgJmD2QWDgIBDxYCHgVzdHlsZQUSdmlzaWJpbGl0eTp2aXNpYmxlFgICAQ8PFgIeBFRleHQFG+eUqOaIt+WQjeaIluWvhueggemUmeivr+OAgmRkAg0PDxYEHgtOYXZpZ2F0ZVVybAVIaHR0cDovL3Bhc3Nwb3J0LjE4OS5jbi9TZWxmUy9ML1JlZy9TZWxlY3QuYXNweD9EZXZpY2VObz0zNTAwMDAwMDAwNDAwMTAxHwEFByDms6jlhoxkZAIPDw8WAh8BBTRodHRwOi8vd3d3LjE4OS5jbi93ZWJtYWlsL2pzcC8xODltaXNjL3Y1L2Nzcy91ZGIuY3NzZGQCEQ8PFgIfAQUtaHR0cDovL3dlYm1haWw1LjE4OS5jbi93ZWJtYWlsL1VEQkxvZ2luUmV0dXJuZGQCEw8PFgIfAQUQMzUwMDAwMDAwMDQwMDEwMWRkAhUPDxYCHwEFDDEyNC4yMDUuNzcuOWRkAhcPDxYCHwEFDHZCWWdGcWRydTVrPWRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQtjYl9TYXZlTmFtZYevyftAQT5CX9s2VZJOrPsTLqDH",
			__EVENTVALIDATION: "/wEWCQLckeONBALT8dy8BQKd+7qdDgK/8ZbBBQKhwImNCwK1yJy1AQLhyKz0DgKh/9zICgKnqZGuBiPwFoYTVzM5HAbhLCKRJWRuEyet",
			txtUserID: "#{u}",
			txtPwd: "#{p}"
		}
	},
	{
		action: "https://mail.10086.cn/Login/Login.ashx",
		params: {
			UserName: "#{u}",
			Password: "#{p}",
			ClientId: "5028",
			type: "mail"
		}
	},
	{
		action: "http://passport.baidu.com/?login",
		params: {
			u: "http://passport.baidu.com/center",
			username: "#{u}",
			password: "#{p}"
		}
	},
	{
		action: "http://passport.renren.com/PLogin.do",
		params: {
			email: "#{u}",
			password: "#{p}",
			origURL: "http://www.renren.com/Home.do",
			domain: "renren.com"
		}
	},
	{
		action: "http://passport.51.com/login.5p",
		params: {
			passport_51_user: "#{u}",
			passport_51_password: "#{p}",
			gourl: "http%3A%2F%2Fmy.51.com%2Fwebim%2Findex.php"
		}
	},
	{
		action: "http://passport.sohu.com/login.jsp",
		params: {
			loginid: "#{u}@chinaren.com",
			passwd: "#{p}",
			fl: "1",
			vr: "1|1",
			appid: "1005",
			ru: "http://profile.chinaren.com/urs/setcookie.jsp?burl=http://alumni.chinaren.com/",
			ct: "1174378209",
			sg: "84ff7b2e1d8f3dc46c6d17bb83fe72bd"
		}
	}],
	banner: {
		b4: {
			img: "static/images/banner/taoke12060.jpg",
			url: "http://pindao.huoban.taobao.com/channel/channelMall.htm?pid=mm_11140156_0_0"
		}
	},
	Track: [["js_mailSubmit", {
		n: "邮箱登录",
		u: "邮箱登录",
		q: 0
	}]],
	Keywords: [["免费杀毒软件", "http://www.xiazaiba.com/html/1773.html"], ["酷狗", "http://www.xiazaiba.com/html/63.html"]]
};
if (Cookie.get("ws")) {
	$("#classicsWrap").addClass("kpWrap")
}
DOMReady(function() {
	if (Browser.isIE) {
		$("#sf .searchWord").el.value = ""
	}
	$("#sf .searchWord").el.focus();
	if (typeof($(".sortSite")) != "undefined") {
		$(".sortSite li").on("mouseover",
		function(e) {
			$(e).addClass("hover")
		}).on("mouseout",
		function(e) {
			$(e).removeClass("hover")
		})
	}
	$("li.drop").on("mouseover",
	function(e) {
		$(e).addClass("hover")
	}).on("mouseout",
	function(e) {
		$(e).removeClass("hover")
	});
	if (typeof($("#js_cal")) !== "undefined") {
		var d = '<ul class="fl" ><li class="date">' + Calendar.day() + '</li><li class="lcal">' + Calendar.cnday() + "</li></ul>";
		$("#js_cal").el.innerHTML = d
	}
	MailLogin.userNameGotFocus();
	MailLogin.setMailAddress();
	YLMF._extend(YLMF, YLMF.Observable);
	YLMF.addEvents(["resize"]);
	function c() {
		window.clearTimeout(b);
		b = window.setTimeout(function() {
			a.onresize = null;
			YLMF.fireEvent("resize");
			a.onresize = c
		},
		200)
	}
	var b;
	var a = null;
	if (parseInt(Browser.isIE) <= 7) {
		a = document.body
	} else {
		a = window
	}
	a.onresize = c
});
var Ylmf = {
	getProId: function(b) {
		var c;
		for (var d = 0,
		a = CityArr.length; d < a; ++d) {
			if (CityArr[d][0] == b && parseInt(CityArr[d][2]) < 900) {
				c = CityArr[d][2]
			}
		}
		return c
	},
	getCityId: function(b, d) {
		if (!b) {
			return false
		}
		var e;
		for (var c = 0,
		a = CityArr.length; c < a; ++c) {
			if (CityArr[c][1] == b && CityArr[c][0] == d) {
				e = CityArr[c][2]
			}
		}
		return e
	},
	getCitys: function(c) {
		if (!c) {
			return false
		}
		var b = [];
		for (var d = 0,
		a = CityArr.length; d < a; ++d) {
			if (CityArr[d][1] == c) {
				b.push(CityArr[d])
			}
		}
		return b
	},
	getSelectValue: function(b) {
		var a = b.selectedIndex,
		c, d;
		if (a > -1) {
			c = b.options[a];
			d = c.innerHTML.split(" ")[1];
			return d
		}
		return null
	},
	ScriptLoader: {
		Add: function(c) {
			if (!c || !c.src) {
				return
			}
			var d = document;
			var b = d.getElementsByTagName("head")[0],
			a = d.createElement("script");
			a.onload = a.onreadystatechange = function() {
				if (a && a.readyState && a.readyState != "loaded" && a.readyState != "complete") {
					return
				}
				a.onload = a.onreadystatechange = a.onerror = null;
				a.Src = "";
				if (!d.all) {
					a.parentNode.removeChild(a)
				}
				a = null
			};
			a.src = c.src;
			a.charset = c.charset || "gb2312";
			b.insertBefore(a, b.firstChild);
			return a
		}
	}
};
Date.prototype.format = function(b) {
	var c = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds()
	};
	if (/(y+)/.test(b)) {
		b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (var a in c) {
		if (new RegExp("(" + a + ")").test(b)) {
			b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length))
		}
	}
	return b
};
$("#js_ws").on("click",
function(c) {
	var a = document.getElementById("ws");
	if (!a) {
		$("#classicsWrap").addClass("kpWrap");
		var d = document.createElement("link");
		d.href = "static/css/ws.css?v2013";
		d.rel = "stylesheet";
		d.id = "ws";
		var b = document.getElementsByTagName("base")[0];
		b.parentNode.insertBefore(d, b);
		Cookie.set("ws", "1")
	}
});
$("#js_nm").on("click",
function(b) {
	$("#classicsWrap").removeClass("kpWrap");
	var a = document.getElementById("ws");
	if (a) {
		a.parentNode.removeChild(a);
		Cookie.clear("ws")
	}
});
var _preMailUserName = Cookie.get("preMailUserName");
var MailLogin = {
	userNameGotFocus: function() {
		var a = $("#mail .mailPrompt"),
		e = $("#js_mailLogin"),
		c = $("#js_mailUsername"),
		d = $("#js_mailPassWord"),
		b = $("#mail .mailPromptPw");
		if (Browser.isIE == "6.0") {
			c.el.value = ""
		}
		if (_preMailUserName) {
			c.el.value = _preMailUserName
		}
		if (c.el.value !== "") {
			a.hide()
		}
		c.on("focus",
		function(f) {
			e.show();
			$("#js_eMail").hasClass("e-mailActived",
			function(g) {
				if (!g) {
					$("#js_eMail").addClass("e-mailActived");
					if (_preMailUserName && YLMF.trim(_preMailUserName) == YLMF.trim(c.el.value) && YLMF.trim(_preMailUserName) != "") {
						d.el.focus()
					}
				}
			});
			a.hide()
		}).on("blur",
		function(f) {
			if (f.value === "") {
				a.show()
			}
		});
		d.on("focus",
		function(f) {
			b.hide()
		}).on("blur",
		function(f) {
			if (f.value === "") {
				b.show()
			}
		})
	},
	setMailAddress: function() {
		var d = $("#js_mailServer"),
		a = $("#js_eMailList"),
		c = $("#js_eMailList li"),
		b = 0;
		var e = [{
			sou: "@vip.163.com",
			tar: "@vip.163..."
		},
		{
			sou: "@vip.sina.com",
			tar: "@vip.sina..."
		},
		{
			sou: "@yahoo.com.cn",
			tar: "@yahoo.c.."
		}];
		c.on("click",
		function(g) {
			if (g.getAttribute("dn")) {
				b = g.getAttribute("dn");
				d.el.innerHTML = g.innerHTML;
				a.el.setAttribute("selectIndex", b);
				for (var f = 0; f < e.length; f++) {
					if (Yl.trim(g.innerHTML.toString()) === e[f].sou) {
						d.el.innerHTML = e[f].tar
					}
					continue
				}
			}
		}).on("mouseover",
		function(f) {
			c.removeClass("hover");
			$(f).hasClass("no",
			function(g) {
				if (!g) {
					$(f).addClass("hover")
				}
			})
		})
	},
	flag: false,
	mailCache: [],
	sendMail: function() {
		var g = $("#js_mailUsername").el.value,
		b = $("#js_mailPassWord").el.value,
		f = $("#js_eMailList").el,
		e = $("#mail").el,
		a = f.getAttribute("selectIndex"),
		c = Config.Mail[a],
		d = {
			u: g,
			p: b
		};
		if (Yl.trim(d.u) == "") {
			alert("用户名不能为空！");
			$("#js_mailUsername").el.focus();
			$("#mail .mailPrompt").hide();
			return
		}
		if (Yl.trim(d.p) == "") {
			alert("密码不能为空！");
			$("#js_mailPassWord").el.focus();
			$("#mail .mailPromptPw").hide();
			return
		}
		if (this.mailCache.index != a) {
			this.mailCache.forEach(function(h) {
				e.removeChild(h)
			});
			this.mailCache = []
		}
		e.setAttribute("action", c.action);
		for (I in c.params) {
			$(e).create("input", {
				type: "hidden",
				name: I,
				value: format(c.params[I], d)
			},
			function(h) {
				MailLogin.mailCache.push(h);
				this.append(h)
			})
		}
		e.submit();
		Cookie.set("preMailUserName", g);
		_preMailUserName = g;
		$("#js_mailPassWord").el.value = ""
	}
};
var SE = (function() {
	var b = [$("#searchForm").el.tn, $("#searchForm").el.ch];
	function a(d) {
		$("#searchForm").el.action = d.action;
		$("#sf_label img").el.src = d.img[0];
		$("#sf_label img").el.setAttribute("alt", d.img[1]);
		$("#sf .searchWord").el.name = d.name;
		$("#sf .searchSubmit ").el.value = d.btn;
		$("#sf_label").el.href = d.url;
		if (b.length > 0) {
			b = c(b)
		}
		function c(h) {
			for (var g = 0,
			f = h.length; g < f; g++) {
				$("#searchForm").remove(h[g])
			}
			return []
		}
		for (var e in d.params) {
			$("#searchForm").create("input", {
				name: e,
				value: d.params[e],
				type: "hidden"
			},
			function(f) {
				b.push(f);
				this.append(f)
			})
		}
	}
	$("#sf .searchWord").on("mouseover",
	function(c) {
		if (cache.get("SE_ONFOCUS")) {
			return
		}
		c.value = c.value;
		c.focus()
	});
	$("#sf .searchWord").on("blur",
	function(c) {
		cache.remove("SE_ONFOCUS")
	});
	$("#sf .searchWord").on("focus",
	function(c) {
		cache.set("SE_ONFOCUS", true);
		if (Browser.isIE) {
			Yl.getFocus(c)
		} else {
			c.focus()
		}
	});
	return {
		set: a
	}
})();
document.onclick = function(g) {
	var g = g || window.event,
	f = g.srcElement || g.target,
	d = f.id;
	if ($("#js_mailLogin").el) {
		if (d === "js_mailUsername") {} else {
			if (d === "js_mailPassWord") {} else {
				if (d === "js_mailSubmit") {} else {
					if (d === "js_mailServer") {} else {
						if (f.className === "mailPromptPw") {} else {
							if (f.parentNode.id === "js_eMailList" && $("#js_mailUsername").el.value !== "") {
								$("#js_mailLogin").show();
								$("#js_eMail").hasClass("e-mailActived",
								function(e) {
									if (!e) {
										$("#js_eMail").addClass("e-mailActived")
									}
								})
							} else {
								$("#js_mailLogin").hide();
								$("#js_eMail").removeClass("e-mailActived")
							}
						}
					}
				}
			}
		}
	}
	if ($("#js_eMailList").el) {
		if (d !== "js_mailServer") {
			$("#js_eMailList").hide();
			MailLogin.flag = false;
			if (f.parentNode.id === "js_eMailList" && f.className.toString() === "no") {
				$("#js_eMailList").show();
				$("#js_mailLogin").hide();
				MailLogin.flag = true
			}
		} else {
			$("#js_mailLogin").hide();
			if (!MailLogin.flag) {
				$("#js_eMailList").show();
				MailLogin.flag = true
			} else {
				$("#js_eMailList").hide();
				MailLogin.flag = false
			}
		}
	}
	function c(e) {
		return e.tagName && e.tagName.toUpperCase() == "A"
	}
	if (c(f) || c(f.parentNode) || c(f.parentNode.parentNode)) {
		if (f.rel && f.rel == "nr") {
			return
		}
		var a, b;
		if (f.parentNode.tagName.toUpperCase() == "A" && f.tagName.toUpperCase() == "IMG") {
			a = f.parentNode.href,
			b = f.alt
		} else {
			if (f.parentNode.parentNode.tagName.toUpperCase() == "A") {
				a = f.parentNode.parentNode.href,
				b = f.innerHTML
			} else {
				a = f.href || "",
				b = f.innerHTML;
				if (Yl.trim(a) == "javascript:void(0);" || Yl.trim(a) == "javascript:void(0)") {
					a = b
				}
				if (f.getAttribute("rel")) {
					a = b = f.innerHTML
				}
			}
		}
		KeywordCount({
			u: a,
			n: b,
			q: 0
		});
		UserTrack.add(f)
	}
	Config.Track.forEach(function(e) {
		if (d == e[0]) {
			KeywordCount(e[1])
		}
	})
};
var isLogined = false;
function newGuid() {
	var a = "";
	for (var b = 1; b <= 32; b++) {
		var c = Math.floor(Math.random() * 16).toString(16);
		a += c;
		if ((b == 8) || (b == 12) || (b == 16) || (b == 20)) {
			a += ""
		}
	}
	return a
}
function checkLogin(a) {
	if (a && a.status == 0) {
		isLogined = true;
		YLMF.fireEvent("login", this, a.data)
	} else {
		if (a && a.status == 14) {
			isLogined = false
		}
	}
}
YLMF.login = function(a) {
	if (a && a.status == 0) {
		YLMF.fireEvent("login", this, a.data)
	} else {
		YLMF.fireEvent("logout", this, a.data);
		if (a.status == 6) {
			alert(a.info)
		}
	}
}; (function() {
	function a(n, e) {
		var f, g;
		var p = ["163.com", "sina.com", "qq.com", "126.com", "139.com", "gmail.com", "sohu.com"];
		var h = 0;
		var b = $(n);
		var m = $(".emailList", e);
		var o = false;
		b.on("keydown",
		function(q) {
			var r = YLMF.getEvent();
			if (m.getStyle("display") == "block" && (r.keyCode == 38 || r.keyCode == 40)) {
				r.preventDefault()
			} else {
				if (r.keyCode == 13) {
					if (m.getStyle("display") != "block") {
						YLMF.popLogin();
						return
					}
					r.preventDefault()
				} else {}
			}
			f = window.setTimeout(function() {
				var s = {};
				s.keyCode = r.keycode || r.keyCode;
				i(s)
			},
			10)
		});
		function d() {
			m.hide()
		}
		function j() {}
		function c() {
			return m.getStyle("display") == "block"
		}
		function l() {
			return m.find(".hv").size() != 1
		}
		b.on("blur",
		function(q) {
			var r = YLMF.getEvent();
			window.clearTimeout(f);
			f = window.setTimeout(function() {
				m.hide()
			},
			10)
		});
		b.on("focus",
		function(q) {
			var r = YLMF.getEvent();
			f = window.setTimeout(function() {
				var s = {};
				s.keyCode = r.keycode || r.keyCode;
				i(s)
			},
			10)
		});
		m.on("mousedown",
		function(r) {
			var s = YLMF.getEvent();
			var q = s.srcElement || s.target;
			var t = q.innerHTML;
			b.el.value = t;
			d()
		});
		function i(y) {
			var q = b.el.value;
			var t = YLMF.trim(q);
			var u = q.indexOf("@");
			if (u != -1) {
				var v = t.substring(0, u);
				var r = t.substring(u + 1);
				if (c() && l() && (y.keyCode == 38 || y.keyCode == 40)) {
					h = 1;
					m.find("li").removeClass("hv").eq(h).addClass("hv");
					return
				} else {
					if (y.keyCode == 38) {
						if (h == 1) {
							h = m.find("li").size()
						}
						m.find("li").removeClass("hv").eq(--h).addClass("hv");
						o = true;
						return
					} else {
						if (y.keyCode == 40) {
							if (h == m.find("li").size() - 1) {
								h = 0
							}
							m.find("li").removeClass("hv").eq(++h).addClass("hv");
							o = true;
							return
						} else {
							if (y.keyCode == 13) {
								var w = m.find(".hv").el.innerHTML;
								b.el.value = w;
								d();
								return
							}
						}
					}
				}
				var x = [];
				if (r != "") {
					YLMF.each(p,
					function(A, B) {
						if (B.substring(0, r.length) == r && B != r) {
							x.push(B)
						}
					})
				} else {
					x = p
				}
				if (x.length > 0) {
					var s = "<li>请选择邮箱类型</li>";
					YLMF.each(x,
					function(A, B) {
						s += "<li>" + v + "@" + B + "</li>"
					});
					m.html(s);
					m.show()
				} else {
					d()
				}
			} else {
				d()
			}
		}
	}
	a("#lpUser", $(".loginPop").el);
	a("#fvUser", $(".fvLogin").el)
} ());
YLMF.usErrorTimmer = null;
YLMF.usShowError = function(a) {
	var b = a || "网址已满，请登录添加更多网址！";
	$(".usErrorTip").html("<span class='usErrorTipIcon'></span>" + b);
	$(".usErrorTip").setStyle("opacity", 1);
	$(".usErrorTip").show();
	window.clearTimeout(YLMF.usErrorTimmer);
	YLMF.usErrorTimmer = window.setTimeout(function() {
		new Animate($(".usErrorTip").el, "opacity", {
			from: 1,
			to: 0,
			time: 500,
			callback: function() {
				$(".usErrorTip").hide()
			}
		}).start()
	},
	3000)
};
YLMF.UID = "";
$("#loginPopClose").on("click",
function() {
	$(".loginPop").hide()
});
YLMF.logout = function(a) {
	YLMF.fireEvent("logout", this, a.data)
};
YLMF._extend(YLMF, YLMF.Observable);
YLMF.addEvents("login");
YLMF.addEvents("logout");
YLMF.addListener({
	login: function(a) {
		var b = a.user_name || a.email;
		isLogined = true;
		YLMF.UID = a.user_id;
		$("#topName .topNameSpan").html(b);
		$(".favorite .colNameSpan").html(b);
		$("#topName,#colName").setStyle("display", "inline");
		$("#topExit,#colExit").setStyle("display", "inline");
		$("#topLogin").hide();
		$(".loginPop").hide();
		$(".favorite .fvLogin").hide();
		Ylmf.ScriptLoader.Add({
			src: "http://my.114la.com/api/index?c=api&a=favlist&appkey=26a12af305d876a677aa&callback=YLMF.bookMark",
			charset: "utf-8"
		});
		$(".fvNoSite").addClass("fvLoginNoSite")
	},
	logout: function(g) {
		isLogined = false;
		$("#topName,#colName").hide();
		$("#topExit,#colExit").hide();
		$("#topLogin").show();
		$("#fvList1").hide();
		$("#fvList2").hide();
		$(".fvNoSite").hide();
		$(".favorite .fvLogin").show();
		var l = Cookie.get("favSites") || "";
		var a = parseInt(Cookie.get("favNub"), 10) || 0;
		if (l && YLMF.trim(l) != "") {
			var b = l.split("|");
			var c = "<ul>";
			var f = "<ul>";
			for (var h = 0; h < b.length - 1; h++) {
				var d = b[h].split(",")[2];
				var j = b[h].split(",")[0];
				var e = b[h].split(",")[1];
				c += "<li><a markid='" + d + "' href='" + decodeURIComponent(e) + "'>" + decodeURIComponent(j) + "</a></li>";
				f += "<li><a markid='" + d + "' class='myCoLink' href='" + decodeURIComponent(e) + "' >" + decodeURIComponent(j) + "</a><div class='controlLink'><a class='editLink' onclick='YLMF.ModifySite(\"" + decodeURIComponent(j) + '","' + decodeURIComponent(e) + '",' + isLogined + "," + d + ")' href='javascript:void(0)'></a><a class='closeUrl' href='javascript:void(0)' onclick='YLMF.delCookieSite(" + d + ")'></a></div></li>"
			}
			c += '<li><a href="javascript:void(0)" target="_self" class="addBtn" onclick="YLMF.showAF()">添加网址</a></li></ul>';
			f += "</ul>";
			$("#fvList1").html(c);
			$("#fvList1").show();
			$("#bmType0").html(f)
		} else {
			$(".fvNoSite").removeClass("fvLoginNoSite").show();
			$(".fvList").hide();
			$("#bmType0").html("<div class='myWebUrlNoSite'>你还没有收藏的网址，请动手添加 或 到下面添加吧!</div>")
		}
		$(".fvNoSite").removeClass("fvLoginNoSite")
	}
});
YLMF.ModifySite = function(c, b, a, e) {
	YLMF.ModifyData = {
		name: c,
		url: b,
		loginStatus: a,
		id: e
	};
	$("#webName").el.value = c;
	$("#webLink").el.value = b;
	var d = $("#modifyMarkBtn").el;
	$("#modifyMarkBtn").show();
	$("#addMarkBtn").hide()
};
YLMF.modifyMark = function() {
	var a = YLMF.trim($("#webName").el.value);
	var b = YLMF.trim($("#webLink").el.value);
	var g = $("#addSelType").el.value;
	if (YLMF.ModifyData.loginStatus) {
		Ylmf.ScriptLoader.Add({
			src: "http://my.114la.com/api/index?c=api&a=editfav&appkey=26a12af305d876a677aa&callback=YLMF.modifyMarkCB&webtitle=" + encodeURIComponent(a) + "&weburl=" + encodeURIComponent(b) + "&id=" + YLMF.ModifyData.id + "&tid=" + g,
			charset: "utf-8"
		})
	} else {
		var j = Cookie.get("favSites") || "";
		var c = j.split("|");
		for (var f = c.length - 1; f >= 0; f--) {
			var h = c[f].split(",")[0];
			var e = c[f].split(",")[1];
			var d = c[f].split(",")[2];
			if (d == YLMF.ModifyData.id) {
				c[f] = encodeURIComponent(a) + "," + encodeURIComponent(b) + "," + d;
				$("#myWebUrlContent .myCoLink,#fvList1 a").each(function(i) {
					if (i.getAttribute("markid") == d) {
						i.innerHTML = a;
						i.setAttribute("href", b)
					}
				})
			}
			j = c.join("|");
			Cookie.set("favSites", j)
		}
	}
	$("#modifyMarkBtn").hide();
	$("#addMarkBtn").show();
	$("#webName").el.value = "";
	$("#webLink").el.value = ""
};
YLMF.modifyMarkCB = function(a) {
	if (a.status == 0) {
		$("#myWebUrlContent .myCoLink,#fvList1 a").each(function(b) {
			if (b.getAttribute("markid") == a.data.id) {
				b.innerHTML = a.data.title;
				b.setAttribute("href", a.data.url)
			}
		})
	} else {
		alert(a.info)
	}
};
YLMF.delCookieSite = function(d) {
	var c = Cookie.get("favSites") || "";
	var b = c.split("|");
	YLMF.delCol(d);
	var h = $("#bmType0 a");
	h.each(function(l) {
		var i = l.getAttribute("markid");
		if (i && i == d) {
			var j = l.parentNode;
			j.parentNode.removeChild(j)
		}
	});
	for (var f = b.length - 1; f >= 0; f--) {
		var a = b[f].split(",")[0];
		var e = b[f].split(",")[1];
		var g = b[f].split(",")[2];
		if (g == d) {
			b.splice(f, 1)
		}
		c = b.join("|");
		Cookie.set("favSites", c)
	}
	if ($("#bmType0 li").size() == 0) {
		$("#bmType0").html("<div class='myWebUrlNoSite'>你还没有收藏的网址，请动手添加 或 到下面添加吧!</div>")
	}
	YLMF.updateSuggest()
};
YLMF.addToCol = function(e) {
	var d = document.createElement("li");
	d.innerHTML = "<a markid='" + e.id + "' href='" + e.url + "'>" + e.title + "</a>";
	var c = $("#fvList1 ul").el;
	var b = $("#fvList2 ul").el;
	if ($("#fvList1 li").size() >= 18) {
		if ($("#fvList2 li").size() == 1) {
			var a = c.lastChild;
			b.appendChild(a);
			c.appendChild(d)
		} else {
			if ($("#fvList2 li").size() < 24) {
				b.insertBefore(d, b.lastChild)
			}
		}
	} else {
		c.insertBefore(d, c.lastChild)
	}
	if ($("#fvList2 li").size() <= 1) {
		$("#fvList2").hide()
	} else {
		$("#fvList2").show()
	}
	if ($("#fvList1 li").size() <= 1) {
		$("#fvList1").hide();
		$(".fvNoSite").show()
	} else {
		$("#fvList1").show();
		$(".fvNoSite").hide()
	}
};
YLMF.addToCol_noLogin = function(c) {
	if ($("#fvList1 li").size() == 0) {
		$("#fvList1 ul").html('<li><a href="javascript:void(0)" target="_self" class="addBtn" onclick="YLMF.showAF()">添加网址</a></li>')
	}
	var b = document.createElement("li");
	b.innerHTML = "<a markid='" + c.id + "' href='" + c.url + "'>" + c.title + "</a>";
	var a = $("#fvList1 ul").el;
	a.insertBefore(b, a.lastChild);
	$(".fvNoSite").hide();
	$("#fvList1").show()
};
YLMF.delCol = function(d) {
	var b = $(".fvList a");
	b.each(function(g) {
		var e = g.getAttribute("markid");
		if (e && e == d) {
			var f = g.parentNode;
			f.parentNode.removeChild(f)
		}
	});
	if ($("#fvList1 li").size() < 18 && $("#fvList2 li").size() != 0) {
		var c = $("#fvList2 ul").el.firstChild;
		var a = $("#fvList1 ul").el;
		a.appendChild(c)
	}
	if ($("#fvList2 li").size() == 0) {
		$("#fvList2").hide()
	} else {
		$("#fvList2").show()
	}
	if ($("#fvList1 li").size() <= 1) {
		$("#fvList1").hide();
		$(".fvNoSite").show()
	} else {
		$("#fvList1").show();
		$(".fvNoSite").hide()
	}
};
YLMF.bookMark = function(e) {
	if (e.status == 13) {
		if (isLogined) {
			$(".fvList").hide();
			$(".fvNoSite").show()
		}
	} else {
		if (e.status == 0) {
			if (e.data.favlist.length == 0) {
				$(".fvList").hide();
				$(".fvList").html("<ul><li><a href='javascript:void(0)' target='_self' class='addBtn' onclick='YLMF.showAF()'>添加网址</a></li></ul>");
				$("#bmType0").html("<div class='myWebUrlNoSite'>你还没有收藏的网址，请动手添加 或 到下面添加吧!</div>");
				$(".fvNoSite").show();
				return false
			}
			$(".fvNoSite").hide();
			var h = {};
			$("#fvList1").show();
			$("#fvList1").html("");
			var b = "<ul>";
			var d = "<ul>";
			var a = $("#addSelType");
			if (e.data.favlist.length > 17) {
				$("#fvList2").show()
			}
			a.el.options.length = 0;
			var c = new Option("未分类", 0);
			a.el.options.add(c);
			YLMF.each(e.data.favtype,
			function(j, l) {
				c = new Option(e.data.favtype[j].typename, e.data.favtype[j].id);
				a.el.options.add(c);
				if (!h[e.data.favtype[j].id]) {
					h[e.data.favtype[j].id] = {
						id: e.data.favtype[j].id,
						name: e.data.favtype[j].typename,
						sites: []
					}
				}
			});
			h["0"] = {
				id: 0,
				name: "未分类",
				sites: e.data.favlist
			};
			YLMF.each(e.data.favlist,
			function(j, l) {
				if (j < 18) {
					b += "<li><a markid='" + l.id + "' href='" + l.url + "'>" + l.title + "</a></li>"
				} else {
					if (j < 41) {
						d += "<li><a markid='" + l.id + "' href='" + l.url + "'>" + l.title + "</a></li>"
					}
				}
				if (l.typeid != 0) {
					h[l.typeid]["sites"].push(l)
				}
			});
			if (e.data.favlist.length < 18) {
				b += '<li><a href="javascript:void(0)" target="_self" class="addBtn" onclick="YLMF.showAF()">添加网址</a></li>'
			} else {
				d += '<li><a href="javascript:void(0)" target="_self" class="addBtn" onclick="YLMF.showAF()">添加网址</a></li>'
			}
			b += "</ul>";
			d += "</ul>";
			$("#fvList1").html(b);
			$("#fvList2").html(d);
			$("#bookMaskHead").html("");
			var g = "<ul>";
			var f = "";
			for (var i in h) {
				g += "<li ><a href='javascript:void(0)' onclick='YLMF.bmTypeTab(this," + h[i].id + ")'>" + h[i].name + "</a></li>";
				f += "<div class='myWebUrlItem clearfix block'  id='bmType" + h[i].id + "'><ul>";
				YLMF.each(h[i].sites,
				function(j, l) {
					if (l) {
						f += "<li><a markid='" + l.id + "' href='" + l.url + "' class='myCoLink'>" + l.title + "</a><div class='controlLink'  style='display: none;'><a onclick='YLMF.ModifySite(\"" + l.title + '","' + l.url + '",' + isLogined + "," + l.id + ")' href='javascript:void(0)' class='editLink'></a><a href='javascript:void(0)' class='closeUrl' onclick='YLMF.delSite(" + l.id + ")'></a></div></li>"
					}
				});
				f += "</ul></div>"
			}
			g += "</ul>";
			$("#bookMaskHead").html(g);
			$("#myWebUrlContent").html(f);
			$("#myWebUrlContent .myWebUrlItem").hide().eq(0).show();
			YLMF.updateSuggest()
		} else {
			if (e.status == 14) {}
		}
	}
};
YLMF.bmTypeTab = function(a, b) {
	$("#myWebUrlContent .myWebUrlItem").hide();
	$("#bookMaskHead a").removeClass("hv");
	$(a).addClass("hv");
	$("#bmType" + b).show()
};
YLMF.addMark = function() {
	if (isLogined) {
		var g = $("#webName");
		var a = $("#webLink");
		var h = $("#addSelType").el.value;
		var f = YLMF.trim(g.el.value);
		var d = YLMF.trim(a.el.value);
		if (f == "") {
			alert("请输入网站名称");
			return
		} else {
			if (d == "") {
				alert("请输入网址");
				return
			}
		}
		Ylmf.ScriptLoader.Add({
			src: "http://my.114la.com/api/index?c=api&a=fav&appkey=26a12af305d876a677aa&callback=YLMF.addMarkCB&webtitle=" + encodeURIComponent(f) + "&weburl=" + encodeURIComponent(d) + "&tid=" + h,
			charset: "utf-8"
		})
	} else {
		var b = Cookie.get("favSites") || "";
		if (b.split("|").length >= 18) {
			YLMF.usShowError();
			return
		}
		var g = $("#webName");
		var a = $("#webLink");
		var f = YLMF.trim(g.el.value);
		var d = YLMF.trim(a.el.value);
		if (f == "") {
			alert("请输入网站名称");
			return
		} else {
			if (d == "") {
				alert("请输入网址");
				return
			}
		}
		var e = parseInt(Cookie.get("favNub"), 10) || 0;
		e++;
		var c = {
			id: e,
			url: d,
			title: f
		};
		YLMF.addBM_NL(c)
	}
};
YLMF.delSite = function(a) {
	Ylmf.ScriptLoader.Add({
		src: "http://my.114la.com/api/index?c=api&a=delfav&appkey=26a12af305d876a677aa&callback=YLMF.delSiteCB&id=" + a,
		charset: "utf-8"
	})
};
YLMF.delSiteCB = function(c) {
	var b = c.data;
	var a = $("#myWebUrlContent a");
	a.each(function(f) {
		var d = f.getAttribute("markid");
		if (d && d == b) {
			var e = f.parentNode;
			e.parentNode.removeChild(e)
		}
	});
	if ($("#bmType0 li").size() == 0) {
		$("#bmType0").html("<div class='myWebUrlNoSite'>你还没有收藏的网址，请动手添加 或 到下面添加吧!</div>")
	}
	YLMF.delCol(b);
	YLMF.updateSuggest()
};
YLMF.sitePreLi = null;
$("#myWebUrlContent").on("mouseover",
function() {
	var b = YLMF.getEvent();
	var a = b.target || b.srcElement;
	var c = a;
	while (c.id != "myWebUrlContent") {
		if (c.tagName.toUpperCase() == "LI") {
			YLMF.sitePreLi && (YLMF.sitePreLi.getElementsByTagName("div")[0].style.display = "none");
			YLMF.sitePreLi = c;
			c.getElementsByTagName("div")[0].style.display = "block";
			return
		}
		c = c.parentNode
	}
});
$("#myWebUrlContent").on("mouseout",
function() {
	var b = YLMF.getEvent();
	var a = b.toElement;
	var c = a;
	while (c && c.id != "myWebUrlContent") {
		if (c.tagName && c.tagName.toUpperCase() == "LI") {
			return
		}
		c = c.parentNode
	}
	YLMF.sitePreLi && (YLMF.sitePreLi.getElementsByTagName("div")[0].style.display = "none")
});
YLMF.sitePreLi2 = null;
YLMF.SLMH = function(a) {
	$(a).on("mouseover",
	function() {
		var c = YLMF.getEvent();
		var b = c.target || c.srcElement;
		var d = b;
		while (d != a) {
			if (d.tagName.toUpperCase() == "LI") {
				if (YLMF.sitePreLi2) {
					$(".ofPrompt", YLMF.sitePreLi2).hide();
					$(".ofLink", YLMF.sitePreLi2).removeClass("hv");
					$(".jumpLink", YLMF.sitePreLi2).hide()
				}
				$(".ofPrompt", d).show();
				$(".ofLink", d).addClass("hv");
				$(".jumpLink", d).show();
				YLMF.sitePreLi2 = d;
				return
			}
			d = d.parentNode
		}
	});
	$(a).on("mouseout",
	function() {
		var c = YLMF.getEvent();
		var b = c.toElement;
		var d = b;
		if (!YLMF.contains(a, d)) {
			if (YLMF.sitePreLi2) {
				$(".ofPrompt", YLMF.sitePreLi2).hide();
				$(".ofLink", YLMF.sitePreLi2).removeClass("hv");
				$(".jumpLink", YLMF.sitePreLi2).hide()
			}
		}
	})
};
$(".ofContent").each(function(a) {
	YLMF.SLMH(a)
});
YLMF.updateSuggest = function() {
	$(".ofContent .ofLink").each(function(c) {
		var e = YLMF.trim(c.innerHTML);
		var h = YLMF.trim(c.getAttribute("href"));
		var f = true;
		if (isLogined) {
			$("#bmType0 .myCoLink").each(function(m) {
				var i = YLMF.trim(m.innerHTML);
				var n = YLMF.trim(m.getAttribute("href"));
				if (i == e && h.replace(/\/$/, "") == n.replace(/\/$/, "")) {
					$(c.parentNode).addClass("clicked");
					$(".ofPrompt span", c.parentNode.parentNode).html("已收藏，点击取消");
					f = false;
					return
				}
			})
		} else {
			var l = Cookie.get("favSites") || "";
			var a = l.split("|");
			for (var g = 0; g < a.length; g++) {
				var j = decodeURIComponent(a[g].split(",")[0]);
				var d = decodeURIComponent(a[g].split(",")[1]);
				var b = decodeURIComponent(a[g].split(",")[2]);
				if (j == e && h.replace(/\/$/, "") == d.replace(/\/$/, "")) {
					$(c.parentNode).addClass("clicked");
					$(".ofPrompt span", c.parentNode.parentNode).html("已收藏，点击取消");
					f = false;
					return
				}
			}
		}
		if (f && $(c.parentNode).hasClass("clicked")) {
			$(c.parentNode).removeClass("clicked");
			$(".ofPrompt span", c.parentNode.parentNode).html("点击收藏")
		}
	})
};
$(".usInnerWrap").on("click",
function() {
	var l = YLMF.getEvent();
	var d = l.target || l.srcElement;
	if ($(d).hasClass("ofLink")) {
		var q = d.getAttribute("href");
		var h = d.innerHTML;
		var n = YLMF.trim(h);
		var m = YLMF.trim(q);
		if (!$(d.parentNode).hasClass("clicked")) {
			if (isLogined) {
				Ylmf.ScriptLoader.Add({
					src: "http://my.114la.com/api/index?c=api&a=fav&appkey=26a12af305d876a677aa&callback=YLMF.addMarkCB&webtitle=" + encodeURIComponent(n) + "&weburl=" + encodeURIComponent(m),
					charset: "utf-8"
				});
				$(d.parentNode).addClass("clicked");
				$(".ofPrompt span", d.parentNode.parentNode).html("已收藏，点击取消")
			} else {
				var a = parseInt(Cookie.get("favNub"), 10) || 0;
				a++;
				var f = {
					id: a,
					url: m,
					title: n
				};
				var p = Cookie.get("favSites") || "";
				if (p.split("|").length >= 18) {
					YLMF.usShowError()
				} else {
					YLMF.addBM_NL(f);
					$(d.parentNode).addClass("clicked");
					$(".ofPrompt span", d.parentNode.parentNode).html("已收藏，点击取消")
				}
			}
		} else {
			if (isLogined) {
				$("#bmType0 a").each(function(e) {
					if (e.innerHTML == h && e.getAttribute("href").replace(/\/$/, "") == m.replace(/\/$/, "")) {
						YLMF.delSite(e.getAttribute("markid"))
					}
				})
			} else {
				var p = Cookie.get("favSites") || "";
				var b = p.split("|");
				for (var j = 0; j < b.length; j++) {
					var o = decodeURIComponent(b[j].split(",")[0]);
					var g = decodeURIComponent(b[j].split(",")[1]);
					var c = decodeURIComponent(b[j].split(",")[2]);
					if (o == h && m == g) {
						YLMF.delCookieSite(c)
					}
				}
			}
			$(d.parentNode).removeClass("clicked");
			$(".ofPrompt span", d.parentNode.parentNode).html("点击收藏")
		}
		if (l.preventDefault) {
			l.preventDefault()
		} else {
			l.returnValue = false
		}
		return false
	}
});
YLMF.addBM_NL = function(c) {
	var a = Cookie.get("favSites") || "";
	YLMF.addToCol_noLogin(c);
	if ($("#myWebUrlContent .myWebUrlNoSite").size() != 0) {
		$("#myWebUrlContent .myWebUrlItem").eq(0).html("<ul></ul>")
	}
	var b = document.createElement("li");
	b.innerHTML = "<a class='myCoLink' markid='" + c.id + "' href='" + c.url + "'>" + c.title + "</a><div class='controlLink'  style='display: none;'><a onclick='YLMF.ModifySite(\"" + c.title + '","' + c.url + '",' + isLogined + "," + c.id + ")' href='javascript:void(0)' class='editLink'></a><a href='javascript:void(0)' class='closeUrl' onclick='YLMF.delCookieSite(" + c.id + ")'></a></div>";
	var d = $("#bmType0  ul").el;
	d.appendChild(b);
	a += encodeURIComponent(c.title) + "," + encodeURIComponent(c.url) + "," + c.id + "|";
	Cookie.set("favSites", a);
	Cookie.set("favNub", c.id)
};
YLMF.addMarkCB = function(d) {
	if (d.status == 0) {
		YLMF.addToCol(d.data);
		if ($("#myWebUrlContent .myWebUrlNoSite").size() != 0) {
			$("#myWebUrlContent .myWebUrlItem").eq(0).html("<ul></ul>")
		}
		var c = document.createElement("li");
		c.innerHTML = "<a class='myCoLink' markid='" + d.data.id + "' href='" + d.data.url + "'>" + d.data.title + "</a><div class='controlLink'  style='display: none;'><a onclick='YLMF.ModifySite(\"" + d.data.title + '","' + d.data.url + '",' + isLogined + "," + d.data.id + ")' href='javascript:void(0)' class='editLink'></a><a href='javascript:void(0)' class='closeUrl' onclick='YLMF.delSite(" + d.data.id + ")'></a></div>";
		var e = $("#bmType0  ul").el;
		e.appendChild(c);
		if (d.data.typeid != 0) {
			var b = document.createElement("li");
			b.innerHTML = "<a class='myCoLink' markid='" + d.data.id + "' href='" + d.data.url + "'>" + d.data.title + "</a><div class='controlLink'  style='display: none;'><a onclick='YLMF.ModifySite(\"" + d.data.title + '","' + d.data.url + '",' + isLogined + "," + d.data.id + ")' href='javascript:void(0)' class='editLink'></a><a href='javascript:void(0)' class='closeUrl' onclick='YLMF.delSite(" + d.data.id + ")'></a></div>";
			var a = $("#bmType" + d.data.typeid + "  ul").el;
			a.appendChild(b)
		}
		YLMF.updateSuggest()
	}
};
YLMF.popLogin = function() {
	var c = newGuid();
	var b = $("#lpUser").get(0).value;
	var d = $("#lpPass").get(0).value;
	var a = oofUtil.security.sha1(oofUtil.security.sha1(oofUtil.security.sha1(d) + oofUtil.security.sha1(b)) + c.toUpperCase());
	var e = $("#lpAuto").el.checked | 0;
	Ylmf.ScriptLoader.Add({
		src: "http://my.114la.com/api/index?c=api&a=ssologin&appkey=26a12af305d876a677aa&callback=YLMF.login&ssoln=" + b + "&ssopw=" + a + "&ssoent=A1&ssoext=" + c + "&auto=" + e,
		charset: "utf-8"
	})
};
YLMF.coolLogin = function() {
	var c = newGuid();
	var b = $("#fvUser").get(0).value;
	var d = $("#fvPass").get(0).value;
	var a = oofUtil.security.sha1(oofUtil.security.sha1(oofUtil.security.sha1(d) + oofUtil.security.sha1(b)) + c.toUpperCase());
	Ylmf.ScriptLoader.Add({
		src: "http://my.114la.com/api/index?c=api&a=ssologin&appkey=26a12af305d876a677aa&callback=YLMF.login&ssoln=" + b + "&ssopw=" + a + "&ssoent=A1&ssoext=" + c,
		charset: "utf-8"
	})
};
$(".loginPop .lpLoginBtn").on("click",
function(a) {
	YLMF.popLogin()
});
$("#lpUser").on("keydown",
function(a) {
	var b = YLMF.getEvent();
	if (b.keyCode == 13) {}
});
$("#lpPass").on("keyup",
function(a) {
	var b = YLMF.getEvent();
	if (b.keyCode == 13) {
		YLMF.popLogin()
	}
});
YLMF.showAF = function() {
	$(".usWrap").show();
	$(".popup-mask").show();
	Ylmf.ScriptLoader.Add({
		src: "http://my.114la.com/api/index?c=api&a=recomand&appkey=26a12af305d876a677aa&callback=YLMF.suggestSite&pid=",
		charset: "utf-8"
	})
};
YLMF.hideAF = function() {
	$(".usWrap").hide();
	$(".popup-mask").hide()
};
YLMF.loadSuggestTil = false;
YLMF.suggestSite = function(e) {
	if (e.status == 0) {
		if (!YLMF.loadSuggestTil) {
			var a = "<dl><dt>从推荐中添加</dt>";
			for (var b = 0; b < e.data.type.length; b++) {
				a += "<dd><a " + (b == 0 ? "class='hv'": "") + " href='javascript:void(0)' onclick='YLMF.loadSuggestTab(" + b + "," + e.data.type[b].id + ")'>" + e.data.type[b].typename + "</a></dd>"
			}
			a += "</dl>";
			$(".recommednContent .reSidebar").html(a);
			YLMF.loadSuggestTil = true
		}
		var f = "";
		var d = e.data.list;
		for (var c in d) {
			f += "<div class='reModule'><h4><b></b>" + c + "</h4>";
			f += "<div class='ofContent'><ul class='clearfix'>";
			for (var g = 0; g < d[c].length; g++) {
				f += "<li><div class='ofPrompt' style='display: none;'><span>点击收藏</span><b></b></div>";
				f += "<div class='ofConLink'><a href='" + d[c][g].url + "' class='ofLink'>" + d[c][g].name + "</a><a class='jumpLink' href='" + d[c][g].url + "'></a></div>"
			}
			f += "</li></div>"
		}
		$(".reMain .reItem").html(f);
		$(".reMain .reItem .ofContent").each(function(h) {
			YLMF.SLMH(h)
		});
		YLMF.updateSuggest()
	}
};
YLMF.loadSuggestTab = function(a, b) {
	$(".trRow").setStyle("top", a * 30 + 84 + "px");
	$(".reSidebar dd a").removeClass("hv");
	$(".reSidebar dd a").eq(a).addClass("hv");
	Ylmf.ScriptLoader.Add({
		src: "http://my.114la.com/api/index?c=api&a=recomand&appkey=26a12af305d876a677aa&callback=YLMF.suggestSite&pid=" + b,
		charset: "utf-8"
	})
};
$("#topLogin").on("click",
function(a) {
	$(".loginPop").show()
});
Ylmf.ScriptLoader.Add({
	src: "http://my.114la.com/api/index?c=api&a=ssocheck&appkey=26a12af305d876a677aa&callback=YLMF.login",
	charset: "utf-8"
});
$("#fvUser").on("keydown",
function(b) {
	var a = YLMF.getEvent();
	if (a.keyCode == 13) {}
});
$("#fvPass").on("keydown",
function(b) {
	var a = YLMF.getEvent();
	if (a.keyCode == 13) {
		YLMF.coolLogin()
	}
});
$(".fvBtns .lpLoginBtn").on("click",
function(a) {
	YLMF.coolLogin()
});
$("#topExit,#colExit").on("click",
function(a) {
	Ylmf.ScriptLoader.Add({
		src: "http://my.114la.com/api/index?c=api&a=logout&appkey=26a12af305d876a677aa&callback=YLMF.logout",
		charset: "utf-8"
	})
});
$("#ldMore").on("click",
function(a) {
	if ($("#ldMore").hasClass("my")) {
		$("#fm").show();
		$("#loadFav").hide();
		$("#ldMore").removeClass("my");
		var b = $("#ldMore").el;
		b.setAttribute("title", "打开我的导航");
		b.innerHTML = "&#xe603;"
	} else {
		$("#fm").hide();
		$("#loadFav").show();
		$("#ldMore").addClass("my");
		var b = $("#ldMore").el;
		b.setAttribute("title", "返回名站导航");
		b.innerHTML = "&#xe617;"
	}
});
var _imgarr = Math.floor(Math.random() * 2);
var _imgEl = document.getElementById("imgArr").getElementsByTagName("a");
_imgEl[_imgarr].style.display = "inline";
$("#sm_tab li").on("click",
function(b) {
	$("#sf .searchWord").el.focus();
	$("#sm_tab li").removeClass("active");
	$(b).addClass("active");
	var a = b.getAttribute("rel");
	KeywordCount({
		u: a,
		n: a,
		q: 0
	});
	cache.set("CURRENT_SE_TAB", a);
	SE.set(Config.Search[a]);
	if (Browser.isIE) {
		$("#sf .searchWord").el.value = $("#sf .searchWord").el.value
	}
	$("#sw div").hide();
	$("div#sw_" + a).show();
	return false
});
var HoverTab = function(e, d) {
	var b = ["click"],
	c = 300,
	f;
	var a = e.getAttribute("rel");
	b.forEach(function(g) {
		switch (g) {
		case "click":
			if (f) {
				window.clearTimeout(f)
			}
			e["on" + g] = function() {
				d();
				if (a) {
					KeywordCount({
						u: a,
						n: a,
						q: 0
					})
				}
			};
			break;
		case "mouseover":
			break
		}
	})
};
var Suggest = (function() {
	var h = $("#sf .searchWord"),
	c = $("#suggest"),
	s = $("#topShow"),
	l,
	o = -1,
	b = null,
	n,
	g,
	a = false,
	m = false,
	p = false,
	q = false;
	h.el.onkeydown = function(u) {
		var u = u || window.event;
		if (q) {
			return
		}
		s.hide();
		switch (u.keyCode) {
		case 38:
			if (p) {
				if (this.value == "") {
					return
				}
				c.show();
				p = false
			} else {
				o--
			}
			d();
			break;
		case 40:
			if (p) {
				if (this.value == "") {
					return
				}
				c.show();
				p = false
			} else {
				o++
			}
			d();
			break;
		case 27:
			this.value = l;
			j();
			break;
		case 13:
			cache.set("Handdle_Key", "13");
			j();
			break;
		default:
			break
		}
	};
	h.el.onkeyup = function(u) {
		var u = u || window.event;
		if (q) {
			return
		}
		l = this.value;
		switch (u.keyCode) {
		case 38:
			m = true;
			break;
		case 40:
			m = true;
			break;
		case 8:
			if (this.value == "") {
				j()
			} else {
				r()
			}
			break;
		case 27:
			this.value = l;
			j();
		case 13:
			cache.set("Handdle_Key", "13");
			j();
			break;
		default:
			if (l != "") {
				r()
			}
			break
		}
	};
	h.el.onblur = function() {
		if (!a) {
			j();
			s.hide()
		}
	};
	function d() {
		if (!g) {
			return
		}
		var u = g.length;
		m = true;
		if (o < 0) {
			o = u - 1
		} else {
			if (o >= u) {
				o = 0
			}
		}
		for (var v = 0,
		u = g.length; v < u; v++) {
			g[v].className = ""
		}
		g[o].className = "hover";
		h.el.value = g[o].innerHTML
	}
	function f() {
		if (typeof(n) != "object" || typeof(n) == "undefined") {
			return
		}
		var u = "<ul>";
		n.forEach(function(x, w, v) {
			if (cache.get("CURRENT_SE_TAB") == "taobao") {
				u += '<li key="' + w + '">' + x[0] + "</li>"
			} else {
				u += '<li key="' + w + '">' + x + "</li>"
			}
		});
		u += "</ul>";
		g = c.el.getElementsByTagName("li");
		c.el.innerHTML = u;
		c.show();
		o = -1;
		p = false;
		e()
	}
	function j() {
		c.hide();
		p = true
	}
	function i() {
		h.el.setAttribute("autocomplete", "on");
		h.el.focus();
		c.hide();
		q = true
	}
	function e() {
		c.el.onmouseover = function(x) {
			var x = x || window.event,
			w = x.target || x.srcElement;
			if (w.tagName.toUpperCase() == "LI") {
				for (var v = 0,
				u = g.length; v < u; v++) {
					g[v].className = ""
				}
				w.className = "hover";
				o = parseInt(w.getAttribute("key"));
				$(w).on("mouseout",
				function(y) {
					y.className = ""
				})
			}
			a = true
		};
		c.el.onmouseout = function() {
			a = false
		};
		c.el.onclick = function(w) {
			var w = w || window.event,
			v = w.target || w.srcElement;
			if (v.tagName.toUpperCase() == "LI") {
				h.el.value = v.innerHTML;
				h.el.focus();
				j();
				var u = document.getElementById("searchForm");
				cache.set("Handdle_Key", "S");
				u.onsubmit();
				u.submit()
			}
			if (v.id == "closeSugBtn") {
				i()
			}
		}
	}
	function t() {
		s.el.onmouseover = function(v) {
			var v = v || window.event,
			u = v.target || v.srcElement;
			if (u.tagName.toUpperCase() == "LI") {
				$(u).addClass("hover");
				o = parseInt(u.getAttribute("key"))
			}
			a = true
		};
		s.el.onmouseout = function(v) {
			var v = v || window.event,
			u = v.target || v.srcElement;
			if (u.tagName.toUpperCase() == "LI") {
				$(u).removeClass("hover")
			}
			a = false
		};
		s.el.onclick = function(w) {
			var w = w || window.event,
			v = w.target || w.srcElement;
			if (v.tagName.toUpperCase() == "A") {
				h.el.value = v.innerHTML;
				h.el.focus();
				s.hide();
				$(".overArw").removeClass("up");
				var u = document.getElementById("searchForm");
				cache.set("Handdle_Key", "TS");
				u.onsubmit();
				u.submit()
			}
			if (v.tagName.toUpperCase() == "LI") {
				h.el.value = v.getAttribute("rel");
				h.el.focus();
				s.hide();
				$(".overArw").removeClass("up");
				var u = document.getElementById("searchForm");
				cache.set("Handdle_Key", "TS");
				u.onsubmit();
				u.submit()
			}
		}
	}
	$("#searchForm").el.onsubmit = function() {
		var u = cache.get("CURRENT_SE_TAB") ? cache.get("CURRENT_SE_TAB") : "web";
		KeywordCount({
			type: u,
			word: h.el.value,
			url: window.location.href,
			key: cache.get("Handdle_Key")
		},
		"http://www.tjj.com/click.php");
		if (_hmt) {
			_hmt.push(["_trackEvent", "搜索框", "submit", u, h.el.value])
		}
	};
	$("#search_btn").on("click",
	function() {
		cache.set("Handdle_Key", "B")
	});
	function r() {
		var x = $("head").el;
		var v = cache.get("CURRENT_SE_TAB");
		if (b) {
			if (v == "taobao") {
				b.charset = "utf-8"
			} else {
				b.charset = "gb2312"
			}
		}
		if (!Browser.isIE) {
			if (b) {
				x.removeChild(b)
			}
			b = null
		}
		if (!b) {
			var u = document.createElement("script");
			u.type = "text/javascript";
			if (v == "taobao") {
				u.charset = "utf-8"
			} else {
				u.charset = "gb2312"
			}
			x.insertBefore(u, x.firstChild);
			b = u
		}
		var y = new Date().getTime();
		var w = encodeURIComponent(h.el.value);
		var A = "";
		switch (v) {
		case "taobao":
			A = "http://suggest.taobao.com/sug?code=utf-8&callback=taobaoSU&q=" + w + "&rd=" + y;
			break;
		default:
			A = "http://unionsug.baidu.com/su?wd=" + w + "&p=3&cb=baiduSU&t=" + y
		}
		b.src = A
	}
	window.baiduSU = function(u) {
		if (typeof(u) == "object" && typeof(u.s) != "undefined" && typeof(u.s[0]) != "undefined") {
			n = u.s;
			f()
		} else {
			j()
		}
	};
	window.taobaoSU = function(u) {
		if (typeof(u) == "object" && typeof(u.result) != "undefined" && typeof(u.result[0][0]) != "undefined") {
			n = u.result;
			f()
		} else {
			j()
		}
	}
})();
var UserTrack = (function() {
	function a(g) {
		try {
			if (g.tagName.toUpperCase() == ("A") && g.href.indexOf("http://") == 0 && g.href.indexOf("http://" + Yl.getHost()) != 0) {
				if (g.rel && g.rel == "nr") {
					return
				}
				var c = {
					url: g.href,
					content: g.innerHTML
				},
				b = c.url + "_[TEXT]_" + c.content + "_[YLMF]_",
				f = Cookie.get("history");
				if (f) {
					if (f.indexOf(b) > -1) {
						f = f.replace(b, "")
					}
					b += f
				}
				Cookie.set("history", b, null, null, "www.114la.com");
				var h;
				if (document.getElementById("bb1")) {
					h = document.getElementById("bb1").getElementsByTagName("iframe")
				}
				if (h && h.length) {
					h[0].contentWindow.History.show()
				}
			}
		} catch(d) {}
	}
	return {
		add: a
	}
})();
var ToolTaber = {
	init: function(b) {
		var a = 0;
		if (!b) {
			b = {
				til: undefined,
				conClass: undefined,
				tilCur: "active" || undefined
			}
		}
		b.til.each(function(d) {
			HoverTab(d,
			function() {
				b.til.removeClass("active");
				d.className = b.tilCur;
				c(d.getAttribute("rel"))
			});
			var c = function(e) {
				b.conClass.hide();
				$("#" + e).show()
			}
		})
	}
};
for (var z = 1; z < 6; z++) {
	ToolTaber.init({
		til: $("#aside-col0" + z + "-tab li"),
		conClass: $("#aside-col0" + z + "-cont .comWrap"),
		tilCur: "active"
	})
}
if (Browser.isIE == "6.0") {
	$("#tool-imp li").on("mouseover",
	function(a) {
		$("#tool-imp li").removeClass("hover");
		$(a).addClass("hover")
	});
	$("#tool-imp li").on("mouseout",
	function(a) {
		$("#tool-imp li").removeClass("hover")
	})
}
function KeywordCount(b, e) {
	if (!b || b == "") {
		return
	}
	var c = e || "http://www.tjj.com/index";
	var g = new Date().getTime();
	var a = new Image();
	var f = "";
	for (var d in b) {
		if (d == "u") {
			f += ("?" + d + "=" + encodeURIComponent(b[d]))
		} else {
			f += ("&" + d + "=" + encodeURIComponent(b[d]))
		}
	}
	if (c == "http://www.tjj.com/index") {
		a.src = c + f + "&i=" + g + "&uid=" + YLMF.UID
	} else {
		a.src = c + "?i=" + g + f + "&uid=" + YLMF.UID
	}
}
var kuxun = (function() {
	function EncodeUtf8(s1) {
		var s = escape(s1);
		var sa = s.split("%");
		var retV = "";
		if (sa[0] != "") {
			retV = sa[0]
		}
		for (var i = 1; i < sa.length; i++) {
			if (sa[i].substring(0, 1) == "u") {
				retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)))
			} else {
				retV += "%" + sa[i]
			}
		}
		return retV
	}
	window.EncodeUtf8 = EncodeUtf8;
	function Str2Hex(s) {
		var c = "";
		var n;
		var ss = "0123456789ABCDEF";
		var digS = "";
		for (var i = 0; i < s.length; i++) {
			c = s.charAt(i);
			n = ss.indexOf(c);
			digS += Dec2Dig(eval(n))
		}
		return digS
	}
	function Dec2Dig(n1) {
		var s = "";
		var n2 = 0;
		for (var i = 0; i < 4; i++) {
			n2 = Math.pow(2, 3 - i);
			if (n1 >= n2) {
				s += "1";
				n1 = n1 - n2
			} else {
				s += "0"
			}
		}
		return s
	}
	function Dig2Dec(s) {
		var retV = 0;
		if (s.length == 4) {
			for (var i = 0; i < 4; i++) {
				retV += eval(s.charAt(i)) * Math.pow(2, 3 - i)
			}
			return retV
		}
		return - 1
	}
	function Hex2Utf8(s) {
		var retS = "";
		var tempS = "";
		var ss = "";
		if (s.length == 16) {
			tempS = "1110" + s.substring(0, 4);
			tempS += "10" + s.substring(4, 10);
			tempS += "10" + s.substring(10, 16);
			var sss = "0123456789ABCDEF";
			for (var i = 0; i < 3; i++) {
				retS += "%";
				ss = tempS.substring(i * 8, (eval(i) + 1) * 8);
				retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
				retS += sss.charAt(Dig2Dec(ss.substring(4, 8)))
			}
			return retS
		}
		return ""
	}
	return {
		searchTicket: function() {
			var _q = document.getElementById("jP_startCity").value;
			var _k = document.getElementById("jP_toCity").value;
			var _d = document.getElementById("jp_today").value;
			var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=20&FlightWay=0";
			if (_q == "") {
				alert("请输入出发地!")
			} else {
				_q = EncodeUtf8(EncodeUtf8(_q))
			}
			if (_k == "") {
				alert("请输入到达地!")
			} else {
				_k = EncodeUtf8(EncodeUtf8(_k))
			}
			if (_d == "") {
				alert("请输入起飞日期!")
			}
			_kw += "&StartCity=" + _q + "&DestCity=" + _k + "&DepartDate=" + _d + "&sid=1250&allianceid=1112";
			if (_q != "" && _k != "" && _d != "") {
				window.open(_kw)
			}
		},
		searchHotel: function() {
			var _q = document.getElementById("ht_city").value;
			var _k = document.getElementById("ht_key").value;
			var _d = document.getElementById("ht_today").value;
			var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=10";
			if (_q != "") {
				_q = EncodeUtf8(EncodeUtf8(_q))
			} else {
				alert("请输入入住城市！")
			}
			if (_d == "") {
				alert("请输入入住日期！")
			}
			if (_k != "") {
				_k = EncodeUtf8(EncodeUtf8(_k))
			}
			_kw += "&CityName=" + _q + "&CheckInDate=" + _d + "&CheckOutDate=" + _d + "&HotelName=" + _k + "&sid=1250&allianceid=1112";
			if (_q != "" && _d != "") {
				window.open(_kw)
			}
		},
		searchTravel: function() {
			var _q = document.getElementById("daodao_travel_q").value;
			var _k = document.getElementById("daodao_travel_k").value;
			var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=30";
			if (_q == "") {
				alert("请输入出发地！")
			} else {
				_q = EncodeUtf8(EncodeUtf8(_q))
			}
			if (_k == "") {} else {
				_k = EncodeUtf8(EncodeUtf8(_k))
			}
			_kw += "&StartCity=" + _q + "&SearchValue=" + _k + "&Channel=1&CurrentTab=0&sid=1250&allianceid=1112";
			if (_q != "") {
				window.open(_kw)
			}
		}
	}
})(); (function() {
	window.Ylmf.toplist = function(b) {
		var d = "<ul>";
		for (var g = 0; g < b.length; g++) {
			d += '<li class="' + (g == 0 ? "cur": "") + '"><span class="bot-nub ' + (g < 3 ? "bot-r": "") + '">' + (g + 1) + '</span><a href="' + b[g]["url"] + '">' + b[g]["title"] + "</a><i></i></li>"
		}
		d += "</ul>";
		$("#s-hot .hot-con").html(d);
		$(".col-hotKeys").html(d);
		var c, e, m = 0,
		p = $("#s-hot"),
		l = $(".col-hotKeys"),
		f,
		q = false,
		h = $(".col-hotKeys li");
		function a() {
			e && e.stop();
			e = new Animate(p.get(0), "opacity", {
				from: parseInt(p.getStyle("opacity"), 10),
				to: 0,
				time: 300,
				callback: function() {
					p.hide()
				}
			});
			e.start()
		}
		function j() {
			if (q) {
				return
			}
			e && e.stop();
			p.show();
			e = new Animate(p.get(0), "opacity", {
				from: parseInt(p.getStyle("opacity"), 10),
				to: 1,
				time: 200,
				callback: function() {
					q = false
				}
			});
			q = true;
			e.start()
		}
		p.hover(function() {
			window.clearTimeout(c);
			window.clearTimeout(n);
			f = true;
			j()
		},
		function() {
			window.clearTimeout(c);
			f = false;
			c = window.setTimeout(a, 400)
		});
		l.hover(function() {
			f = true
		},
		function() {
			f = false
		});
		var o = $(".col-hotKeys li").get(0).cloneNode(true);
		$(".col-hotKeys ul").append(o);
		var n;
		$(".col-hotKeys i").on("mouseover",
		function() {
			window.clearTimeout(n);
			n = window.setTimeout(j, 200)
		});
		$(".col-hotKeys i").on("mouseout",
		function() {
			window.clearTimeout(n)
		});
		window.setInterval(function() {
			if (f) {
				return
			}
			if (m == h.size()) {
				m = 0
			}
			$("#s-hot li").removeClass("cur").eq((m + 1) % h.size()).addClass("cur");
			new Animate($(".col-hotKeys ul").get(0), "top", {
				from: -m * 35,
				to: -(m++*35 + 35),
				time: 200
			}).start()
		},
		5000)
	};
	Ylmf.ScriptLoader.Add({
		src: "http://api4.114la.com/1114_2.json?t=" + parseInt(Math.random() * 10000),
		charset: "utf-8"
	})
})();
$("ul.colTitle li a").on("click",
function(b) {
	var a = YLMF.getEvent(),
	c = $(b.parentNode);
	if (!c.hasClass("active")) {
		if (a.preventDefault) {
			a.preventDefault()
		} else {
			window.event.returnValue = false
		}
	}
	return false
});
function sliderTab(d, b, g) {
	function c() {
		$("#" + d + " .comWrap").each(function(m) {
			if ($(m).getStyle("display") == "block") {
				var j = m.id,
				i = $("#" + j + " ." + b + " li");
				var l = null;
				i.each(function(o, n) {
					if ($(o).getStyle("display") == "block") {
						if (l != null) {
							return
						}
						l = n - 1;
						if (n <= 0) {
							l = i.size() - 1
						}
					}
				});
				l = l || 0;
				i.hide();
				i.eq(l).show();
				new Animate(i.get(l), "opacity", {
					from: 0,
					to: 1,
					time: 500
				}).start()
			}
		})
	}
	function h() {
		$("#" + d + " .comWrap").each(function(m) {
			if ($(m).getStyle("display") == "block") {
				var j = m.id,
				i = $("#" + j + " ." + b + " li");
				var l = null;
				i.each(function(o, n) {
					if ($(o).getStyle("display") == "block") {
						if (l != null) {
							return
						}
						l = n + 1;
						if (n >= i.size() - 1) {
							l = 0
						}
					}
				});
				l = l || 0;
				i.hide();
				i.eq(l).show();
				new Animate(i.get(l), "opacity", {
					from: 0,
					to: 1,
					time: 500
				}).start()
			}
		})
	}
	var e;
	function a() {
		window.clearInterval(e);
		e = window.setInterval(function() {
			c()
		},
		g || 6000)
	}
	function f() {
		window.clearInterval(e)
	}
	$("#" + d + " ." + b).hover(function() {
		f()
	},
	function() {
		a()
	});
	$("#" + d + " .lft").on("click",
	function() {
		c()
	});
	$("#" + d + " .rgt").on("click",
	function() {
		h()
	});
	window.setTimeout(function() {
		a()
	},
	8000 * Math.random(0, 1))
}
sliderTab("aside-col01-cont", "mslide");
sliderTab("aside-col02-cont", "msColi");
sliderTab("aside-col03-cont", "msColi");
sliderTab("aside-col04-cont", "mslide");
$("#c_shop,#c_rest,#c_home,#c_game").on("click",
function(b) {
	var c = document.documentElement.scrollTop || document.body.scrollTop;
	var a = {
		c_shop: 2232,
		c_rest: 2628,
		c_home: 1680,
		c_game: 1862
	};
	new Animate(window, "scrollTop", {
		from: c,
		to: a[b.getAttribute("id")],
		time: 500
	}).start()
});
var gotoTop = {
	id: "#gotop",
	bottomId: "#c_goBot",
	wrap: document.getElementById("costom"),
	timmer: null,
	fps: 50,
	startTime: null,
	duration: 1000,
	toggleTimer: null,
	preAnimate: null,
	clickMe: function() {
		var a = document.documentElement.scrollTop || document.body.scrollTop;
		new Animate(window, "scrollTop", {
			from: a,
			to: 0,
			time: 500
		}).start()
	},
	goBottom: function() {
		var e = 0;
		var b = 0;
		var d = 0;
		var c = document.documentElement;
		var a = document.body;
		if (c && c.scrollTop) {
			e = c.scrollTop
		} else {
			if (a) {
				e = a.scrollTop
			}
		}
		if (a.clientHeight && c.clientHeight) {
			b = (a.clientHeight < c.clientHeight) ? a.clientHeight: c.clientHeight
		} else {
			b = (a.clientHeight > c.clientHeight) ? a.clientHeight: c.clientHeight
		}
		d = Math.max(a.scrollHeight, c.scrollHeight);
		new Animate(window, "scrollTop", {
			from: e,
			to: d - b,
			time: 500
		}).start()
	},
	toggleMe: function() {
		var a = document.documentElement.scrollTop || document.body.scrollTop;
		if (a > 500) {
			$("#gotop").show();
			$("#c_goBot").hide()
		} else {
			$("#c_goBot").show();
			$("#gotop").hide()
		}
	},
	init: function() {
		$(this.id).on("click",
		function() {
			gotoTop.clickMe();
			return false
		});
		$(this.bottomId).on("click",
		function() {
			gotoTop.goBottom();
			return false
		});
		gotoTop.toggleMe();
		$(window).on("scroll",
		function() {
			window.clearTimeout(gotoTop.toggleTimer);
			gotoTop.toggleTimer = window.setTimeout(function() {
				gotoTop.toggleMe()
			},
			200)
		});
		$(window).on("resize",
		function() {
			window.clearTimeout(gotoTop.toggleTimer);
			gotoTop.toggleTimer = window.setTimeout(function() {
				gotoTop.toggleMe()
			},
			200)
		})
	}
};
gotoTop.init();
function lazyload(a) {
	var c = a.get(0).getElementsByTagName("img");
	for (var b = 0; b < c.length; b++) {
		var d = c[b].getAttribute("org");
		if (d) {
			c[b].setAttribute("src", d);
			c[b].removeAttribute("org")
		}
	}
}
$("ul.colTitle li").each(function(a) {
	$(a).hover(function(b) {
		var c = b.getAttribute("rel");
		setTimeout(function() {
			lazyload($("#" + c))
		},
		500);
		$(b).addClass("hover")
	},
	function(b) {
		$(b).removeClass("hover")
	})
}); (function() {
	var a = (function(b) {
		return function() {
			Ylmf.ScriptLoader.Add({
				src: "http://www.114la.com/widget.json",
				charset: "utf-8"
			});
			b.Ylmf.widget = function(f) {
				if (typeof f !== "Object" && typeof f !== "undefined" && f !== null) {
					var d = "",
					c = "";
					for (k in f) {
						function e(l, h, g) {
							d = f[l][0]["slider"],
							len = (h < d.length ? h: d.length);
							c = f[l][0]["news"],
							len2 = (g < c.length ? g: c.length);
							for (var o = 0; o < len; o++) {
								$("#" + l + " ul.mslide li").eq(o).each(function(i) {
									if (l == "xinwen" || l == "hotsales") {
										i.innerHTML = '<a href="' + d[o]["url"] + '" title="' + d[o]["title"] + '"><img src="' + d[o]["img_url"] + '" alt="' + d[o]["title"] + '" /><cite>' + d[o]["title"] + "</cite></a>"
									} else {
										i.innerHTML = '<a href="' + d[o]["url"] + '" title="' + d[o]["title"] + '"><img style="background:url( http://www.114la.com/public/rebuild/images/loading.gif ) no-repeat center" org="' + d[o]["img_url"] + '" alt="' + d[o]["title"] + '" /><cite>' + d[o]["title"] + "</cite></a>"
									}
								})
							}
							var n = "";
							for (var m = 0; m < len2; m++) {
								n += '<li><a href="' + c[m]["url"] + '" title="' + c[m]["title"] + '">' + c[m]["title"] + "</a></li>"
							}
							if (l == "hotsales" || l == "cloth" || l == "tuan" || l == "shoes") {
								$("#" + l + " ul.msCover").html(n)
							} else {
								$("#" + l + " ul.nslist").html(n)
							}
						}
						switch (k) {
						case "xinwen":
							e(k, 3, 4);
							break;
						case "junshi":
							e(k, 3, 4);
							break;
						case "tiyu":
							e(k, 3, 4);
							break;
						case "bagua":
							e(k, 3, 4);
							break;
						default:
							break
						}
					}
				} else {
					$(".sedulist").html('<div style="line-height:335px;font-weight:bold;font-size:22px;">数据加载错误，请稍后再试。</div>')
				}
			}
		} ()
	})(window)
})(); (function() {
	var _themeShow = false,
	curAni = null;
	_theme = $("#theme");
	skinStyleObj = $("#js_skinStyle"),
	oSkinCss = Cookie.get(Config.SkinCookieName) || Config.defaultTheme;
	curSkinValue = oSkinCss;
	_themeChangeLink = $("#themeChange a");
	_jsXhr = null;
	var settingSkinClassicsBlue = (function() {
		var _run = function() {
			if (typeof($("#js_reOld")) !== "undefined" && typeof($("#js_feedback")) !== "undefined") {
				var reOldObj = $("#js_reOld");
				var cssFilePath = "public4/rebuild/css/skin/",
				skinStyleObj = $("#js_skinStyle");
				var reOldAObj = $("#js_reOld a");
				reOldAObj.on("click",
				function(el) {
					$(el).hasClass("exp-new",
					function(pRst) {
						if (!pRst) {
							Cookie.set("oldLayout", 1);
							$(el).addClass("exp-new");
							el.innerHTML = "\u6062\u590d\u9ed8\u8ba4";
							Cookie.set("skinCss", "classicsBlue");
							curSkinValue = "classicsBlue";
							skinStyleObj.el.setAttribute("href", cssFilePath + "classicsBlue.css?" + Math.round(Math.random() * 10000));
							$(".box-mySetting .skin-list li").removeClass("actived");
							$("#js_skinList #js_classicsBlue").addClass("actived");
							if (Cookie.get("ws")) {
								$("#classicsWrap").addClass("kpWrap")
							}
							_refreshCurClass()
						} else {
							$("#classicsWrap").removeClass("kpWrap");
							$(el).removeClass("exp-new");
							el.innerHTML = "\u7ecf\u5178\u84dd";
							Cookie.clear("oldLayout");
							Cookie.clear("ws");
							Cookie.set("skinCss", "blue");
							curSkinValue = "blue";
							skinStyleObj.el.setAttribute("href", cssFilePath + "blue.css?" + Math.round(Math.random() * 10000));
							$("#js_skinList #js_classicsBlue").removeClass("actived");
							var _ws = document.getElementById("ws");
							if (_ws) {
								_ws.parentNode.removeChild(_ws)
							}
							_refreshCurClass()
						}
					});
					if (Browser.isIE) {
						window.location.reload(true)
					}
				});
				if (Cookie.get("oldLayout")) {
					reOldAObj.el.innerHTML = "\u6062\u590d\u9ed8\u8ba4";
					reOldAObj.addClass("exp-new")
				} else {
					reOldAObj.el.innerHTML = "\u7ecf\u5178\u84dd";
					reOldAObj.removeClass("exp-new")
				}
			}
		};
		return {
			run: _run
		}
	})();
	settingSkinClassicsBlue.run();
	function _loadSkinJs(skinValue) {
		var _jsUrl = Config.getThemeJs(skinValue);
		if (_jsUrl) {
			if (_jsXhr) {
				try {
					_typeChangeXhr.onreadystatechange = null;
					_typeChangeXhr.abort()
				} catch(e) {}
			}
			_jsXhr = Ajax.request(_jsUrl, {
				success: function(xhr) {
					eval(xhr.responseText)
				}
			})
		}
	}
	_loadSkinJs(curSkinValue);
	function _previewSkin(skinValue) {
		curSkinValue = skinValue;
		skinStyleObj.el.setAttribute("href", Config.cssFilePath + skinValue + ".css");
		_loadSkinJs(skinValue); (typeof DD_belatedPNG != "undefined") && DD_belatedPNG.applyVML(document.getElementById("logo"))
	}
	function _save(skinValue) {
		oSkinCss = curSkinValue;
		Cookie.set(Config.SkinCookieName, skinValue)
	}
	function _clear() {
		Cookie.clear(Config.SkinCookieName)
	}
	function _refreshCurClass() {
		_themeLis && _themeLis.each(function(el) {
			if (el.getAttribute("skin") == curSkinValue) {
				$(el).addClass("curTheme")
			} else {
				$(el).removeClass("curTheme")
			}
		})
	}
	function _hideChoose() {
		if (Animate.canTransition) {
			$("#theme").setStyle("height", "0px")
		} else {
			curAni && curAni.stop();
			curAni = new Animate($("#theme").get(0), "height", {
				from: 210,
				to: 0,
				time: 300
			});
			curAni.start()
		}
		_themeChangeLink.html("换肤");
		$("#themeChange").removeClass("themeChangeDown");
		_themeShow = false
	}
	function _showChoose() {
		if (Animate.canTransition) {
			$("#theme").setStyle("height", "210px")
		} else {
			curAni && curAni.stop();
			curAni = new Animate($("#theme").get(0), "height", {
				from: 0,
				to: 210,
				time: 300
			});
			curAni.start()
		}
		_themeChangeLink.html("收起");
		$("#themeChange").addClass("themeChangeDown");
		_themeShow = true
	}
	$("#themeChange").on("click",
	function() {
		if (_themeShow) {
			_save(curSkinValue);
			_hideChoose()
		} else {
			_showChoose()
		}
	});
	var _curPage = 0,
	_moveWidth = 900;
	_sliderUl = null,
	_curSliderAni = null,
	_typeLinks = null,
	_themeSlider = null,
	_typeChangeXhr = null,
	_themeLis = null,
	_totalPage = 0,
	_pageNubUl = null,
	_totalPageSpan = null;
	function _initSlider() {
		_sliderUl = $("#themeSliderUl");
		var _lis = _sliderUl.findChild("li");
		_totalPage = Math.ceil(_lis.length / 6);
		_curPage = 0;
		_themeLis = $("li", _sliderUl.el);
		_themeLis.on("click",
		function(el) {
			var _skinVal = el.getAttribute("skin");
			_themeLis.removeClass("curTheme");
			$(el).addClass("curTheme");
			_previewSkin(_skinVal)
		});
		_themeLis.each(function(_el) {
			$(_el).hover(function(_subEl) {
				$(_subEl).addClass("themeLiHover")
			},
			function(_subEl) {
				$(_subEl).removeClass("themeLiHover")
			})
		});
		_totalPageSpan.html("/" + _totalPage + "页");
		var _pageHtml = "";
		for (var i = 0; i < _totalPage; i++) {
			_pageHtml += "<li>" + (i + 1) + "</li>"
		}
		_pageNubUl.setStyle("top", "0px").html(_pageHtml);
		_refreshCurClass()
	}
	var _el = $("#themeChange").el;
	if (window.addEventListener) {
		_el.addEventListener("mouseover", _loadThemeHtml, false)
	} else {
		_el.attachEvent("onmouseover", _loadThemeHtml)
	}
	function _loadThemeHtml() {
		if (window.removeEventListener) {
			_el.removeEventListener("mouseover", _loadThemeHtml, false)
		} else {
			_el.detachEvent("onmouseover", _loadThemeHtml)
		}
		Ajax.request(Config.getThemeUrl(), {
			success: function(xhr) {
				$(".themeWrap", _theme.el).html(xhr.responseText);
				$(".themeWrap", _theme.el).removeClass("loadingBig");
				_sliderUl = $("#themeSliderUl");
				_typeLinks = $(".themeTop a", _theme.el);
				_themeSlider = $(".themeSlider", _theme.el);
				_pageNubUl = $(".themePagger ul", _theme.el);
				_totalPageSpan = $(".themePagger span.after", _theme.el);
				_typeLinks.on("click",
				function(el) {
					_typeLinks.removeClass("cur");
					$(el).addClass("cur");
					_themeSlider.html("");
					_themeSlider.addClass("loadingBig");
					var _classType = el.getAttribute("alt");
					if (_typeChangeXhr) {
						try {
							_typeChangeXhr.onreadystatechange = null;
							_typeChangeXhr.abort()
						} catch(e) {}
					}
					_typeChangeXhr = Ajax.request(Config.getThemeTypeUrl(_classType), {
						success: function(_xhr2) {
							_themeSlider.html(_xhr2.responseText);
							_themeSlider.removeClass("loadingBig");
							_initSlider()
						}
					})
				});
				$("#themeSave").on("click",
				function(el) {
					_save(curSkinValue);
					_hideChoose()
				});
				$("#themeCan").on("click",
				function(el) {
					_previewSkin(oSkinCss);
					_refreshCurClass();
					_hideChoose()
				});
				$("#themeDel").on("click",
				function(el) {
					_previewSkin(Config.defaultTheme);
					_refreshCurClass();
					_save(curSkinValue);
					_hideChoose()
				});
				$(".themeRight", _theme.el).on("click",
				function() {
					if (_curPage >= _totalPage - 1) {
						_curSliderAni && _curSliderAni.stop();
						_curSliderAni = new Shake(_sliderUl.get(0), "left", {
							from: parseInt(_sliderUl.getStyle("left"), 0),
							to: -_curPage * _moveWidth,
							time: 800,
							amplitude: -100
						});
						_curSliderAni.start();
						return
					}
					_curPage++;
					_curSliderAni && _curSliderAni.stop();
					_curSliderAni = new Animate(_sliderUl.get(0), "left", {
						from: parseInt(_sliderUl.getStyle("left"), 0),
						to: -_curPage * _moveWidth,
						time: 300
					});
					_curSliderAni.start();
					_pageNubUl.setStyle("top", -_curPage * 24 + "px")
				});
				$(".themeLeft", _theme.el).on("click",
				function() {
					if (_curPage <= 0) {
						_curSliderAni && _curSliderAni.stop();
						_curSliderAni = new Shake(_sliderUl.get(0), "left", {
							from: parseInt(_sliderUl.getStyle("left"), 0),
							to: -_curPage * _moveWidth,
							time: 800,
							amplitude: 100
						});
						_curSliderAni.start();
						return
					}
					_curPage--;
					_curSliderAni && _curSliderAni.stop();
					_curSliderAni = new Animate(_sliderUl.get(0), "left", {
						from: parseInt(_sliderUl.getStyle("left"), 0),
						to: -_curPage * _moveWidth,
						time: 300
					});
					_curSliderAni.start();
					_pageNubUl.setStyle("top", -_curPage * 24 + "px")
				});
				_initSlider()
			},
			failure: function(xhr) {}
		})
	}
})();
var __$ = function(b) {
	var a = document;
	return a.getElementById(b)
};
var W = document.getElementById("weather");
var Weather = {
	timer: null,
	CityCookieName: "citydata",
	WeatherCookieName: "weather",
	DefaultCity: ["109", "101010100", "101010100", "北京", "北京"],
	StatIPQueue: [],
	StatGetQueue: [],
	Set: function() {
		W.style.display = "none";
		__$("setCityBox").style.display = "";
		var a = Cookie.get(this.CityCookieName);
		if (a) {
			a = a.split(",")
		} else {
			a = this.DefaultCity
		}
		__$("w_pro").value = a[0];
		this.initCitys(a[0]);
		__$("w_city").value = a[1];
		this.initAreaCitys(a[2])
	},
	ShowStatus: function(f) {
		if (!f) {
			return
		}
		var d = '<ul class="weather"><li><h4 class="city">#{city}</h4><a class="cut" href="javascript:void(0);" onclick="Weather.Set();return false;">[切换]</a></li><li class="tWrap"><div class="i"><a href="http://tool.114la.com/tianqi/#{cityid}"><img  onload="pngfix(this)" title="#{img1_title}" src="public4/rebuild/images/m/#{img1}.png" /></a></div><a href="http://tool.114la.com/tianqi/#{cityid}" target="_blank" class="t" title="#{jtitle}">今&nbsp;#{img1_title}<i class="tem">#{today}</i><i class="tem2">#{pollution}</i></a></li><li class="mWrap"><div class="i"><a href="http://tool.114la.com/tianqi/#{cityid}"><img onload="pngfix(this)" title="#{img2_title}" src="public4/rebuild/images/m/#{img2}.png" /></a></div><a href="http://tool.114la.com/tianqi/#{cityid}" target="_blank" class="t" title="#{mtitle}">明&nbsp;#{img2_title}<i class="tem">#{tomorrow}</i></a></li></ul>';
		var g;
		$(".weather-tip").hide();
		switch (f) {
		case 100:
			g = '正在判断城市，请稍后...&nbsp; <a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[手动设置]</a> <a href="http://tool.114la.com/tianqi/" target="_blank">快速查看</a>';
			break;
		case 101:
			g = "判断城市失败，默认为北京，请手动设置。";
			break;
		case 102:
			g = '正在获取天气数据，请稍候... <a href="http://tool.114la.com/tianqi/" target="_blank">快速查看</a>';
			break;
		case 404:
			g = '很抱歉，暂无该城市天气数据。<a href="javascript:void(0);" onclick="Weather.Set();return false;" target="_self">[选择其它城市]</a>';
			break;
		case 500:
			g = '服务器错误或本地网络过慢。<a href="javascript:void(0);" target="_self" onclick="Weather.Init();return false;">[点击重试]</a>';
			break;
		case 200:
			var c = arguments[1];
			var h = ["日", "一", "二", "三", "四", "五", "六"],
			b = new Date();
			var e = b.getDay();
			var a = b.getDay() == 6 ? 0 : e + 1;
			g = format(d, {
				cityid: c[3],
				city: c[0],
				today: c[1],
				tomorrow: c[2],
				img1: c[4],
				img2: c[5],
				week1: h[e],
				week2: h[a],
				img1_title: c[6],
				img2_title: c[7],
				pollution: c[8],
				jtitle: c[9],
				mtitle: c[10]
			});
			break
		}
		W.innerHTML = g
	},
	Ip2City: function(c) {
		this.ShowStatus(100);
		Ylmf.ScriptLoader.Add({
			src: "http://api.114la.com/ip",
			charset: "gb2312"
		});
		var a = this;
		if (typeof b != "undefined") {
			window.clearTimeout(b)
		}
		var b = window.setTimeout(function() {
			Cookie.clear(this.CityCookieName);
			c && c(a.DefaultCity)
		},
		3000);
		window.ILData_callback = function() {
			if (typeof(ILData) != "undefined") {
				if (typeof b != "undefined") {
					window.clearTimeout(b)
				}
				if (ILData[2] && ILData[3]) {
					var d = Ylmf.getProId(ILData[2]);
					var f = Ylmf.getCityId(d, ILData[3]);
					var e = [d, f, f, ILData[2], ILData[3]];
					Cookie.set(a.CityCookieName, e);
					c && c(e)
				} else {
					a.ShowStatus(101);
					Cookie.set(a.CityCookieName, a.DefaultCity);
					c && c(a.DefaultCity)
				}
			}
		}
	},
	Get: function(e) {
		if (!e) {
			return
		}
		var b = e.slice(3, 7);
		var f = this.ShowStatus;
		var d = this;
		f(102);
		if (typeof a != "undefined") {
			window.clearTimeout(a)
		}
		if (!Cookie.get(this.CityCookieName)) {
			var a = window.setTimeout(function() {
				f(500);
				Cookie.clear(this.CityCookieName)
			},
			5000)
		}
		var c = "http://weather.api.114la.com/" + b + "/" + e + ".txt";
		c += "?" + (new Date()).getDate() + (new Date()).getHours();
		if (!Cookie.get(this.WeatherCookieName)) {}
		Ylmf.ScriptLoader.Add({
			src: c.toString(),
			charset: "utf-8"
		});
		window.Ylmf.getWeather = function(j) {
			window.clearTimeout(Weather.timer);
			var n = $("#weather").el;
			if (typeof(j) == "object" && typeof(j) != "undefined" && typeof(j.weatherinfo) != "undefined" && j.weatherinfo != false) {
				var l = [j.weatherinfo.temp1, j.weatherinfo.temp2];
				var h = [j.weatherinfo.city, l[0], l[1], e, j.weatherinfo.img1, j.weatherinfo.img3, j.weatherinfo.weather1, j.weatherinfo.weather2, j.weatherinfo.pollution, j.weatherinfo.jtitle, j.weatherinfo.mtitle];
				var o = $(".weather-tip");
				if (h) {
					Weather.ShowStatus(200, h);
					$(".tWrap", n).hover(function(p) {
						$(p).addClass("tWrapHover")
					},
					function(p) {
						$(p).removeClass("tWrapHover")
					});
					$(".mWrap", n).hover(function(p) {
						$(p).addClass("mWrapHover")
					},
					function(p) {
						$(p).removeClass("mWrapHover")
					});
					if (j.weatherinfo.pollution && j.weatherinfo.pollution != "") {
						$(".tWrap .tem", n).hide()
					}
					Weather.timer = window.setTimeout(function() {
						$(".tem2", n).hide();
						$(".tWrap .tem", n).show()
					},
					10000);
					var i = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "19", "21", "22", "23", "24", "25"];
					var g = ["13", "14", "15", "16", "17", "26", "27", "28"];
					var m = ["53"];
					if (g.indexOf(j.weatherinfo.img1) != -1) {
						o.el.childNodes[0].nodeValue = "今天有雪，小心路滑"
					}
					if (m.indexOf(j.weatherinfo.img1) != -1) {
						o.el.childNodes[0].nodeValue = "雾霾天气，注意防护"
					}
					if (i.concat(g).concat(m).indexOf(j.weatherinfo.img1) != -1) {
						o.show();
						$(".weather-close", o.el).on("click",
						function() {
							o.hide()
						});
						window.setTimeout(function() {
							o.hide()
						},
						10000)
					}
					Cookie.set(d.WeatherCookieName, 1)
				}
			} else {
				if (j.weatherinfo == false) {
					Weather.ShowStatus(404)
				}
			}
		}
	},
	Init: function() {
		var c = this.CityCookieName;
		var b = this;
		if (Cookie.get(this.CityCookieName)) {
			var a = Cookie.get(this.CityCookieName).split(",");
			if (!a[2]) {
				Cookie.clear(this.CityCookieName);
				b.Init()
			}
			this.Get(a[2])
		} else {
			this.Ip2City(function(d) {
				var e = Cookie.get(b.CityCookieName);
				if (e) {
					e = e.split(",");
					b.Get(e[2])
				} else {
					b.Get(d[2])
				}
			})
		}
	},
	getAreas: function(c, b) {
		var a = c.slice(3, 7);
		Ylmf.ScriptLoader.Add({
			src: "http://weather.api.114la.com/" + a + "/" + a + ".txt?" + parseInt(Math.random() * 99),
			charset: "utf-8"
		});
		window.Ylmf.getAreaCity = function(d) {
			if (typeof(d) == "object" && typeof(d.result) != "undefined" && typeof(d.result[0][0]) != "undefined") {
				b(d.result)
			}
		}
	},
	initCitys: function(b) {
		if (!b) {
			return
		}
		__$("w_city").innerHTML = "";
		for (var d = 0,
		a = CityArr.length; d < a; ++d) {
			var c = CityArr[d];
			if (c[1] == b) {
				var e = document.createElement("option");
				e.value = c[2];
				e.innerHTML = c[3] + "&nbsp;" + c[0];
				__$("w_city").appendChild(e)
			}
		}
		__$("w_city").selectedIndex = 0
	},
	initAreaCitys: function(b, a) {
		__$("l_city").innerHTML = "";
		this.getAreas(b,
		function(g) {
			for (var e = 0,
			c = g.length; e < c; ++e) {
				var d = g[e];
				var f = document.createElement("option");
				if (d[0] == b) {
					f.selected = true
				}
				f.value = d[0];
				f.innerHTML = d[2] + "&nbsp;" + d[1];
				__$("l_city").appendChild(f)
			}
			if (a) {
				a()
			}
		})
	},
	cp: function(a) {
		this.initCitys(a);
		__$("w_city").selectedIndex = 0;
		this.cc(__$("w_city").value)
	},
	cc: function(a) {
		this.initAreaCitys(a,
		function() {})
	},
	custom: function() {
		var a = Cookie.get(this.CityCookieName);
		if (a) {
			a = a.split(",")
		} else {
			a = this.DefaultCity
		}
		var b = [__$("w_pro").value, __$("w_city").value, __$("l_city").value ? __$("l_city").value: __$("w_city").value, Ylmf.getSelectValue(__$("w_pro")), Ylmf.getSelectValue(__$("w_city"))];
		if (a[2] != b[2]) {
			this.Get(b[2]);
			Cookie.set(this.CityCookieName, b)
		}
		__$("setCityBox").style.display = "none";
		W.style.display = ""
	},
	autoLoad: function() {
		Cookie.clear(this.CityCookieName);
		Cookie.clear(this.WeatherCookieName);
		this.Init();
		__$("setCityBox").style.display = "none";
		W.style.display = ""
	}
};
Weather.Init(); (function() {
	var d = $("#bankList");
	var a = $("#bankTra");
	var b = null;
	a.hover(function() {
		window.clearTimeout(b);
		b = window.setTimeout(e, 300)
	},
	function() {
		window.clearTimeout(b);
		b = window.setTimeout(c, 300)
	});
	d.hover(function() {
		window.clearTimeout(b);
		b = window.setTimeout(e, 300)
	},
	function() {
		window.clearTimeout(b);
		b = window.setTimeout(c, 300)
	});
	function e() {
		d.show()
	}
	function c() {
		d.hide()
	}
	$("a", d.get(0)).on("click",
	function(g) {
		var f = g.cloneNode(true);
		f.setAttribute("id", "curBank");
		var i = $("#curBank").get(0);
		var h = i.parentNode;
		h.replaceChild(f, i);
		Cookie.set("curBank", "<a href='" + g.getAttribute("href") + "' id='curBank'>" + g.innerHTML + "</a>")
	})
})();
var CityArr = [["CategoryName", "ParentId", "Id"], ["华北地区", "0", "1"], ["北京", "1", "109"], ["北京", "109", "101010100", "B"], ["天津", "1", "110"], ["天津", "110", "101030100", "T"], ["河北", "1", "111"], ["石家庄", "111", "101090101", "S"], ["保定", "111", "101090201", "B"], ["承德市", "111", "101090402", "C"], ["沧州", "111", "101090701", "C"], ["衡水", "111", "101090801", "H"], ["邯郸", "111", "101091001", "H"], ["廊坊", "111", "101090601", "L"], ["秦皇岛", "111", "101091101", "Q"], ["唐山", "111", "101090501", "T"], ["邢台", "111", "101090901", "X"], ["张家口", "111", "101090301", "Z"], ["山西", "1", "112"], ["太原", "112", "101100101", "T"], ["长治", "112", "101100501", "C"], ["大同", "112", "101100201", "D"], ["晋中", "112", "101100401", "J"], ["晋城", "112", "101100601", "J"], ["临汾", "112", "101100701", "L"], ["吕梁", "112", "101101100", "L"], ["忻州", "112", "101101001", "X"], ["阳泉", "112", "101100301", "Y"], ["运城", "112", "101100801", "Y"], ["朔州", "112", "101100901", "Y"], ["内蒙古", "1", "113"], ["呼和浩特", "113", "101080101", "H"], ["阿拉善左旗", "113", "101081201", "A"], ["包头", "113", "101080201", "B"], ["赤峰", "113", "101080601", "C"], ["鄂尔多斯", "113", "101080701", "E"], ["呼伦贝尔", "113", "101081000", "H"], ["集宁", "113", "101080401", "J"], ["临河", "113", "101080801", "L"], ["通辽", "113", "101080501", "T"], ["乌海", "113", "101080301", "W"], ["乌兰浩特", "113", "101081101", "W"], ["锡林浩特", "113", "101080901", "X"], ["东北地区", "0", "2"], ["辽宁", "2", "114"], ["沈阳", "114", "101070101", "S"], ["鞍山", "114", "101070301", "A"], ["本溪", "114", "101070501", "B"], ["朝阳", "114", "101071201", "C"], ["大连", "114", "101070201", "D"], ["丹东", "114", "101070601", "D"], ["抚顺", "114", "101070401", "F"], ["阜新", "114", "101070901", "F"], ["葫芦岛", "114", "101071401", "H"], ["锦州", "114", "101070701", "J"], ["辽阳", "114", "101071001", "L"], ["盘锦", "114", "101071301", "P"], ["铁岭", "114", "101071101", "T"], ["营口", "114", "101070801", "Y"], ["吉林", "2", "115"], ["长春", "115", "101060101", "C"], ["白城", "115", "101060601", "B"], ["白山", "115", "101060901", "B"], ["吉林", "115", "101060201", "J"], ["辽源", "115", "101060701", "L"], ["四平", "115", "101060401", "S"], ["松原", "115", "101060801", "S"], ["通化", "115", "101060501", "T"], ["延吉", "115", "101060301", "Y"], ["黑龙江", "2", "116"], ["哈尔滨", "116", "101050101", "H"], ["大兴安岭", "116", "101050701", "D"], ["大庆", "116", "101050901", "D"], ["黑河", "116", "101050601", "H"], ["鹤岗", "116", "101051201", "H"], ["佳木斯", "116", "101050401", "J"], ["鸡西", "116", "101051101", "J"], ["牡丹江", "116", "101050301", "M"], ["齐齐哈尔", "116", "101050201", "Q"], ["七台河", "116", "101051002", "Q"], ["绥化", "116", "101050501", "S"], ["伊春", "116", "101050801", "Y"], ["双鸭山", "116", "101051301", "S"], ["华东地区", "0", "3"], ["上海", "3", "117"], ["上海", "117", "101020100", "S"], ["山东", "3", "118"], ["济南", "118", "101120101", "J"], ["滨州", "118", "101121101", "B"], ["德州", "118", "101120401", "D"], ["东营", "118", "101121201", "D"], ["菏泽", "118", "101121001", "H"], ["济宁", "118", "101120701", "J"], ["临沂", "118", "101120901", "L"], ["莱芜", "118", "101121601", "L"], ["聊城", "118", "101121701", "L"], ["青岛", "118", "101120201", "Q"], ["潍坊", "118", "101120601", "W"], ["威海", "118", "101121301", "W"], ["烟台", "118", "101120501", "Y"], ["日照", "118", "101121501", "R"], ["泰安", "118", "101120801", "T"], ["淄博", "118", "101120301", "Z"], ["枣庄", "118", "101121401", "Z"], ["安徽", "3", "119"], ["合肥", "119", "101220101", "H"], ["安庆", "119", "101220601", "A"], ["蚌埠", "119", "101220201", "B"], ["亳州", "119", "101220901", "B"], ["滁州", "119", "101221101", "C"], ["巢湖", "119", "101221601", "C"], ["池州", "119", "101221701", "C"], ["阜阳", "119", "101220801", "F"], ["淮南", "119", "101220401", "H"], ["黄山", "119", "101221001", "H"], ["淮北", "119", "101221201", "H"], ["六安", "119", "101221501", "L"], ["马鞍山", "119", "101220501", "M"], ["宿州", "119", "101220701", "S"], ["铜陵", "119", "101221301", "T"], ["芜湖", "119", "101220301", "W"], ["宣城", "119", "101221401", "X"], ["江苏", "3", "120"], ["南京", "120", "101190101", "N"], ["常州", "120", "101191101", "C"], ["南通", "120", "101190501", "N"], ["淮安", "120", "101190901", "H"], ["连云港", "120", "101191001", "L"], ["苏州", "120", "101190401", "S"], ["宿迁", "120", "101191301", "S"], ["泰州", "120", "101191201", "T"], ["无锡", "120", "101190201", "W"], ["徐州", "120", "101190801", "X"], ["扬州", "120", "101190601", "Y"], ["盐城", "120", "101190701", "Y"], ["镇江", "120", "101190301", "Z"], ["浙江", "3", "121"], ["杭州", "121", "101210101", "H"], ["湖州", "121", "101210201", "H"], ["嘉兴", "121", "101210301", "J"], ["金华", "121", "101210901", "J"], ["丽水", "121", "101210801", "L"], ["宁波", "121", "101210401", "N"], ["衢州", "121", "101211001", "Q"], ["绍兴", "121", "101210501", "S"], ["台州", "121", "101210601", "T"], ["温州", "121", "101210701", "W"], ["舟山", "121", "101211101", "Z"], ["江西", "3", "122"], ["南昌", "122", "101240101", "N"], ["抚州", "122", "101240401", "F"], ["赣州", "122", "101240701", "G"], ["九江", "122", "101240201", "J"], ["吉安", "122", "101240601", "J"], ["景德镇", "122", "101240801", "J"], ["萍乡", "122", "101240901", "P"], ["上饶", "122", "101240301", "S"], ["新余", "122", "101241001", "X"], ["宜春", "122", "101240501", "Y"], ["鹰潭", "122", "101241101", "Y"], ["福建", "3", "123"], ["福州", "123", "101230101", "F"], ["龙岩", "123", "101230701", "L"], ["宁德", "123", "101230301", "N"], ["南平", "123", "101230901", "N"], ["莆田", "123", "101230401", "P"], ["泉州", "123", "101230501", "Q"], ["三明", "123", "101230801", "S"], ["厦门", "123", "101230201", "X"], ["漳州", "123", "101230601", "Z"], ["中南地区", "0", "4"], ["河南", "4", "124"], ["郑州", "124", "101180101", "Z"], ["安阳", "124", "101180201", "A"], ["鹤壁", "124", "101181201", "H"], ["焦作", "124", "101181101", "J"], ["济源", "124", "101181801", "J"], ["开封", "124", "101180801", "K"], ["洛阳", "124", "101180901", "L"], ["漯河", "124", "101181501", "L"], ["南阳", "124", "101180701", "N"], ["平顶山", "124", "101180501", "P"], ["濮阳", "124", "101181301", "P"], ["商丘", "124", "101181001", "S"], ["三门峡", "124", "101181701", "S"], ["信阳", "124", "101180601", "X"], ["新乡", "124", "101180301", "X"], ["许昌", "124", "101180401", "X"], ["周口", "124", "101181401", "Z"], ["驻马店", "124", "101181601", "Z"], ["湖北", "4", "125"], ["武汉", "125", "101200101", "W"], ["鄂州", "125", "101200301", "E"], ["恩施", "125", "101201001", "E"], ["黄冈", "125", "101200501", "H"], ["黄石", "125", "101200601", "H"], ["荆州", "125", "101200801", "J"], ["荆门", "125", "101201401", "J"], ["潜江", "125", "101201701", "Q"], ["十堰", "125", "101201101", "S"], ["神农架", "125", "101201201", "S"], ["随州", "125", "101201301", "S"], ["天门", "125", "101201501", "T"], ["襄樊", "125", "101200201", "X"], ["孝感", "125", "101200401", "X"], ["咸宁", "125", "101200701", "X"], ["仙桃", "125", "101201601", "X"], ["宜昌", "125", "101200901", "Y"], ["湖南", "4", "126"], ["长沙", "126", "101250101", "C"], ["郴州", "126", "101250501", "C"], ["常德", "126", "101250601", "C"], ["衡阳", "126", "101250401", "H"], ["怀化", "126", "101251201", "H"], ["吉首", "126", "101251501", "J"], ["娄底", "126", "101250801", "L"], ["黔阳", "126", "101251301", "Q"], ["邵阳", "126", "101250901", "S"], ["湘潭", "126", "101250201", "X"], ["益阳", "126", "101250701", "Y"], ["岳阳", "126", "101251001", "Y"], ["永州", "126", "101251401", "Y"], ["株洲", "126", "101250301", "Z"], ["张家界", "126", "101251101", "Z"], ["广东", "4", "127"], ["广州", "127", "101280101", "G"], ["潮州", "127", "101281501", "C"], ["东莞", "127", "101281601", "D"], ["佛山", "127", "101280800", "F"], ["惠州", "127", "101280301", "H"], ["河源", "127", "101281201", "H"], ["江门", "127", "101281101", "J"], ["揭阳", "127", "101281901", "J"], ["梅州", "127", "101280401", "M"], ["茂名", "127", "101282001", "M"], ["清远", "127", "101281301", "Q"], ["韶关", "127", "101280201", "S"], ["汕头", "127", "101280501", "S"], ["深圳", "127", "101280601", "S"], ["汕尾", "127", "101282101", "S"], ["云浮", "127", "101281401", "Y"], ["阳江", "127", "101281801", "Y"], ["珠海", "127", "101280701", "Z"], ["肇庆", "127", "101280901", "Z"], ["湛江", "127", "101281001", "Z"], ["中山", "127", "101281701", "Z"], ["广西", "4", "128"], ["南宁", "128", "101300101", "N"], ["北海", "128", "101301301", "B"], ["百色", "128", "101301001", "B"], ["崇左", "128", "101300201", "C"], ["防城港", "128", "101301401", "F"], ["桂林", "128", "101300501", "G"], ["贵港", "128", "101300801", "G"], ["贺州", "128", "101300701", "H"], ["河池", "128", "101301201", "H"], ["柳州", "128", "101300301", "L"], ["来宾", "128", "101300401", "L"], ["钦州", "128", "101301101", "Q"], ["梧州", "128", "101300601", "W"], ["玉林", "128", "101300901", "Y"], ["海南", "4", "129"], ["海口", "129", "101310101", "H"], ["白沙", "129", "101310907", "B"], ["保亭", "129", "101311614", "B"], ["澄迈", "129", "101310604", "C"], ["昌江", "129", "101310806", "C"], ["东方", "129", "101310402", "D"], ["儋州", "129", "101310705", "D"], ["定安", "129", "101311109", "D"], ["临高", "129", "101310503", "L"], ["陵水", "129", "101311816", "L"], ["乐东", "129", "101312321", "L"], ["琼山", "129", "101310102", "Q"], ["琼中", "129", "101310208", "Q"], ["琼海", "129", "101311311", "Q"], ["清兰", "129", "101311513", "Q"], ["南沙岛", "129", "101312220", "N"], ["三亚", "129", "101310301", "S"], ["珊瑚岛", "129", "101312018", "S"], ["屯昌", "129", "101311210", "T"], ["通什", "129", "101312422", "T"], ["文昌", "129", "101311412", "W"], ["万宁", "129", "101311715", "W"], ["西沙", "129", "101311917", "X"], ["永署礁", "129", "101312119", "Y"], ["西北地区", "0", "5"], ["陕西", "5", "130"], ["西安", "130", "101110101", "X"], ["安康", "130", "101110701", "A"], ["宝鸡", "130", "101110901", "B"], ["汉中", "130", "101110801", "H"], ["商洛", "130", "101110601", "S"], ["铜川", "130", "101111001", "T"], ["渭南", "130", "101110501", "W"], ["咸阳", "130", "101110200", "X"], ["延安", "130", "101110300", "Y"], ["榆林", "130", "101110401", "Y"], ["甘肃", "5", "131"], ["兰州", "131", "101160101", "L"], ["白银", "131", "101161301", "B"], ["定西", "131", "101160201", "D"], ["合作", "131", "101161201", "H"], ["金昌", "131", "101160601", "J"], ["酒泉", "131", "101160801", "J"], ["临夏", "131", "101161101", "L"], ["平凉", "131", "101160301", "P"], ["庆阳", "131", "101160401", "Q"], ["天水", "131", "101160901", "T"], ["武威", "131", "101160501", "W"], ["武都", "131", "101161001", "W"], ["张掖", "131", "101160701", "Z"], ["宁夏", "5", "132"], ["银川", "132", "101170101", "Y"], ["固原", "132", "101170401", "G"], ["石嘴山", "132", "101170201", "S"], ["吴忠", "132", "101170301", "W"], ["中卫", "132", "101170501", "Z"], ["青海", "5", "133"], ["西宁", "133", "101150101", "X"], ["果洛", "133", "101150501", "G"], ["海西", "133", "101150701", "H"], ["海北", "133", "101150801", "H"], ["海东", "133", "101150201", "H"], ["黄南", "133", "101150301", "H"], ["海南", "133", "101150401", "H"], ["玉树", "133", "101150601", "Y"], ["新疆", "5", "134"], ["乌鲁木齐", "134", "101130101", "W"], ["阿勒泰", "134", "101131401", "A"], ["阿图什", "134", "101131501", "A"], ["阿克苏", "134", "101130801", "A"], ["阿拉尔", "134", "101130701", "A"], ["博乐", "134", "1011301601", "B"], ["昌吉", "134", "101130401", "C"], ["哈密", "134", "101131201", "H"], ["和田", "134", "101131301", "H"], ["克拉玛依", "134", "101130201", "K"], ["喀什", "134", "101130901", "K"], ["库尔勒", "134", "101130601", "K"], ["石河子", "134", "101130301", "S"], ["吐鲁番", "134", "101130501", "T"], ["塔城", "134", "101131101", "T"], ["伊宁", "134", "101131001", "Y"], ["西南地区", "0", "6"], ["重庆", "6", "135"], ["重庆", "135", "101040100", "C"], ["四川", "6", "136"], ["成都", "136", "101270101", "C"], ["阿坝", "136", "101271901", "A"], ["巴中", "136", "101270901", "B"], ["德阳", "136", "101272001", "D"], ["达州", "136", "101270601", "D"], ["广元", "136", "101272101", "G"], ["甘孜", "136", "101271801", "G"], ["泸州", "136", "101271001", "L"], ["乐山", "136", "101271401", "L"], ["凉山", "136", "101271601", "L"], ["眉山", "136", "101271501", "M"], ["绵阳", "136", "101270401", "M"], ["南充", "136", "101270501", "N"], ["内江", "136", "101271201", "N"], ["攀枝花", "136", "101270201", "P"], ["遂宁", "136", "101270701", "S"], ["广安", "136", "101270801", "G"], ["雅安", "136", "101271701", "Y"], ["宜宾", "136", "101271101", "Y"], ["资阳", "136", "101271301", "Z"], ["自贡", "136", "101270301", "Z"], ["贵州", "6", "137"], ["贵阳", "137", "101260101", "G"], ["安顺", "137", "101260301", "A"], ["毕节", "137", "101260701", "B"], ["都匀", "137", "101260401", "D"], ["凯里", "137", "101260501", "K"], ["六盘水", "137", "101260801", "L"], ["铜仁", "137", "101260601", "T"], ["遵义", "137", "101260201", "Z"], ["黔西", "137", "101260901", "Q"], ["云南", "6", "138"], ["昆明", "138", "101290101", "K"], ["保山", "138", "101290501", "B"], ["楚雄", "138", "101290801", "C"], ["大理", "138", "101290201", "D"], ["德宏", "138", "101291501", "D"], ["红河", "138", "101290301", "H"], ["景洪", "138", "101291601", "J"], ["临沧", "138", "101291101", "L"], ["丽江", "138", "101291401", "L"], ["怒江", "138", "101291201", "N"], ["曲靖", "138", "101290401", "Q"], ["思茅", "138", "101290901", "S"], ["文山", "138", "101290601", "W"], ["玉溪", "138", "101290701", "Y"], ["昭通", "138", "101291001", "Z"], ["中甸", "138", "101291301", "Z"], ["西藏", "6", "139"], ["拉萨", "139", "101140101", "L"], ["阿里", "139", "101140701", "A"], ["昌都", "139", "101140501", "C"], ["林芝", "139", "101140401", "L"], ["那曲", "139", "101140601", "N"], ["日喀则", "139", "101140201", "R"], ["山南", "139", "101140301", "S"], ["港澳台", "0", "7"], ["香港", "7", "140"], ["香港", "140", "101320101", "X"], ["澳门", "7", "141"], ["澳门", "141", "101330101", "A"], ["台湾", "7", "142"], ["台北县", "142", "101340101", "T"], ["高雄", "142", "101340201", "G"], ["花莲", "142", "101341001", "H"], ["嘉义", "142", "101340901", "J"], ["马公", "142", "101340801", "M"], ["彭佳屿", "142", "101341201", "P"], ["台南", "142", "101340301", "T"], ["台中", "142", "101340401", "T"], ["桃园", "142", "101340501", "T"], ["台东", "142", "101341101", "T"], ["新竹县", "142", "101340601", "X"], ["宜兰", "142", "101340701", "Y"]];