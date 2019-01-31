if(window.beforeChangeSkin){

	try{
		window.beforeChangeSkin();
	}catch(e){};
};

(function(){
	var _container = $("#wrap").findChild(".container");

	if(Browser.isIE && parseInt(Browser.isIE) <= 7){
	}else{
		var _before = document.createElement("div");
		_before.className = "skin_women_before";
		var _after = document.createElement("div");
		_after.className = "skin_women_after";
		var _flow = document.createElement("div");
		_flow.className = "skin_women_flow";

		_container[0].appendChild(_before);
		_container[0].appendChild(_after);
		_after.appendChild(_flow);
	}
	window.beforeChangeSkin = function(){
		if(Browser.isIE && parseInt(Browser.isIE) <= 7){
		}else{
			_container[0].removeChild(_before);
			_container[0].removeChild(_after);
		}

	}
})();