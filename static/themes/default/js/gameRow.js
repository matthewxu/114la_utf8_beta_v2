
;(function(){
	var gameLoadTab = [true,false,false];
	var pages = ["","ajax/games_web_ajax.htm","ajax/games_mini_ajax.htm"];
	var _gameRow = $("#gameRow").el;
	var preI = 0;
	$(".gameTilItem",_gameRow).on("click",function(el){
		var i = $(".gameTilItem").index(el);
		if(preI == i){
			return;
		}else{
			var e = YLMF.getEvent();
			if(e.preventDefault){
				e.preventDefault();
			}else{
				window.event.returnValue = false; 
			}
			
		}
		preI = i;
		$(".MainItem",_gameRow).hide();
		$(".MainItem",_gameRow).eq(i).show();
		

		var _bottomLine = $(".gameBottomLine",_gameRow),
		_left = $(".gameTilItem ",_gameRow).get(i).offsetLeft;
		_bottomLine.setStyle( "left" , _left + 10 + "px");
		if(!gameLoadTab[i]){
			Ajax.request(pages[i],{
					success : function(xhr){
						$(".MainItem").eq(i).html(xhr.responseText);
						if(i == 2){
							$(".btmc_subTil li",_gameRow).on("click",function(el){

								if($(el).hasClass("moreLi")){
									return;	
								}
								var i = $(".btmc_subTil li").index(el);
								$(".btmc_subTil li",_gameRow).removeClass("current");
								$(".btmc_subTil li",_gameRow).eq(i).addClass("current");

								$(".sgUl",_gameRow).hide();
								$(".sgUl",_gameRow).eq(i).show();

								$(".sgUl",_gameRow).eq(i).find("img").each(function(el){
									var org = el.getAttribute("org");
									if (org) {
										el.setAttribute('src', org);
										el.removeAttribute('org');
									}
								}); 
								
								new Animate($(".sgUl",_gameRow).get(i), 'opacity', {
								  from: 0,
								  to: 1,
								  time: 500
								}).start();

							});
						}
					},
					failure : function(xhr){
					}
				}
			);
			gameLoadTab[i] = true;
		} 
		new Animate($(".MainItem",_gameRow).get(i), 'opacity', {
		  from: 0,
		  to: 1,
		  time: 500
		}).start();
	});
	
	
	
	var grIndex = 0;
	window.grGameChange = function(){
		$(".rowCenter .grGameList ul",_gameRow).hide();
		var size = $(".rowCenter .grGameList ul",_gameRow).size();
		var _showEl = $(".rowCenter .grGameList ul",_gameRow).eq(++grIndex % size)
			_showEl.show();
		new Animate(_showEl.el, 'opacity', {
		  from: 0,
		  to: 1,
		  time: 500
		}).start();

	  _showEl.find("img").each(function(el){
			var org = el.getAttribute("org");
			if (org) {
				el.setAttribute('src', org);
				el.removeAttribute('org');
			}
		});
	}
})();