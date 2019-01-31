
(function(){
    if(Cookie.get('ws')){
        var link = document.createElement('link');
        link.href = 'static/themes/default/css/ws.css?v2013';
        link.rel = "stylesheet";
        link.id = 'ws';
        var h = document.getElementsByTagName('base')[0];
        h.parentNode.insertBefore(link, h);
    };
    if(Cookie.get('oldLayout') && Cookie.get('skinCss') == 'classicsBlue' && Cookie.get("ws")){
        var cssFilePath = 'static/themes/default/css/skin/', skinStyleObj = $("#js_skinStyle");
        skinStyleObj.el.setAttribute('href', cssFilePath + 'classicsBlue.css');
    }else if(Cookie.get('oldLayout') && Cookie.get('skinCss') == 'classicsBlue') {
        var cssFilePath = 'static/themes/default/css/skin/', skinStyleObj = $("#js_skinStyle");
        skinStyleObj.el.setAttribute('href', cssFilePath + 'classicsBlue.css');
    }else if(Cookie.get('skinCss')) {
        var cssFilePath = 'static/themes/default/css/skin/', skinStyleObj = $("#js_skinStyle");
        skinStyleObj.el.setAttribute('href', cssFilePath + Cookie.get('skinCss') + '.css'); }
})();