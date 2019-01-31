if(window.beforeChangeSkin){

	try{
		window.beforeChangeSkin();
	}catch(e){};
};
(function(){
	var _container = $("#wrap").findChild(".container");

	var _skinBtn = document.createElement("a");
	_skinBtn.id = "skin_singer_btn";
	_skinBtn.setAttribute("href","http://v.114la.com/zt/zy/wsgs2.html");
	_skinBtn.setAttribute("target","_blank");
	_container[0].appendChild(_skinBtn);

	
	window.beforeChangeSkin = function(){
		_container.removeChild(_skinBtn);
	}
})();


