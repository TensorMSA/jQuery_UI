/* ========================================================================
 * venus-makemenu.js v1.0
 * ========================================================================
 * Copyright 2015 Venus, Inc.
 * Licensed under MIT  
 * 2015 Susang Kim
 * ======================================================================== */

/*
 * Venus 적용 화면 내 Serurity 메뉴 구성 
 * - jQuery Self-Invoking function
 * - function($) { ...} (window.jQuery)
 **/
+function($){
	'use strict'
	
	  /**
	   * selector variable
	   * - 이 셀렉터와 동일한 DOM element로부터 click 이벤트를 연결하기 위하여 
	   *   생성자에서 사용하는 jQuery Selector
	   *   JSON Type의 url을 나타냄
	   */
	var selector = '[data-menu]'
		
	//VenusMakeMenu Class Method Call로 구현 별도 이벤트 없음
	var VenusMakeMenu = function(element){
	    this.$element = $(element)	
	}	
	VenusMakeMenu.VERSION = '0.0.1'
	VenusMakeMenu.TRANSITION_DURATION = 150

	//Constructor
	VenusMakeMenu.prototype.createMakeMenu = function() {
		var $this = $(selector)
			var menuContent = null
				//JSON Ajax로 접근하여 메뉴 생성
				menuContent = createMenu($this)
				 $this.append(menuContent)
					$("li").each(function(){
						if( $(this).children("a").attr('href') == "" ){
						 $(this).addClass("nextMenu");
						}
					});	    
				 
	}


	//url String을 입력받아 메뉴 생성
	function createMenu($this)
	{
		var menuHTML = "";

          var JSONdata= $this.attr("data-menu");
          var data = $.parseJSON(JSONdata);

					  menuHTML="<div class='sidebarm'><div class='sidebarm-nav'><ul id='venusMenuList'>\n";
					 
					   $.each(data, function(key, val){
							   	$(val).each(function(i,element){	
							   		if(element["MenuLevel"]=='0'){
							   			if(i!='0'){
							   				menuHTML+="</ul></li>";
							   			}	
							   			menuHTML+=" <li><a href='";
							   			menuHTML+=element["MenuURL"];
							   			menuHTML+="'>";
							   			menuHTML+=element["MenuName"]	;
							   			menuHTML+="</a><ul>\n"	;
							   		}				   		
							   		else if(element["MenuLevel"]=='1'){
							   			if(i!='0'){
							   				menuHTML+="</ul></li>";
							   			}	
							   			menuHTML+=" <li><a href='";
							   			menuHTML+=element["MenuURL"];
							   			//level별 url존재시 링크 연결 필요
							   			if(element["MenuURL"]!=""){
								   			menuHTML+="'";
								   			menuHTML+=" onclick=document.location.href='";
								   			menuHTML+=element["MenuURL"];
							   				menuHTML+="'>";
							   			}
							   			else{
							   				menuHTML+="'>";
							   			}							   			
							   			menuHTML+=element["MenuName"]	;
							   			menuHTML+="</a><ul>\n"	;
							   		}
							   		else if(element["MenuLevel"]=='2'){
							   			menuHTML+=" <li><a href='";
								   		menuHTML+=element["MenuURL"];
								   		menuHTML+="'>";
								   		menuHTML+=element["MenuName"]	;
								   		menuHTML+="</a></li>\n"	;
							   		}
							   	})
							   	
					   })
					   menuHTML+="</ul></i></ul></div></div>";
		return menuHTML;
	}
	
	//Plug in 생성
	function Plugin(option){
		return this.each(function(){
			var $this = $(this)
			var data = $this.data('vs.venusmakemenu')  
			if(!data) $this.data('vs.venusmakemenu', (data = new VenusMakeMenu(this)))  
			if(typeof option == 'string') data[option].call() 
			                                               
		})
	}
	
	var old = $.fn.venusmakemenu

	$.fn.venusmakemenu             = Plugin
	$.fn.venusmakemenu.Constructor = VenusMakeMenu 

	$.fn.venusmakemenu.noConflict = function () {
		$.fn.venusmakemenu = old
		return this 
	}
		
}(jQuery);
