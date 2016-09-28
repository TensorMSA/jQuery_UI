
/* ========================================================================
 * CircularMenu: venus-circularmenu.js v1.0
 * ========================================================================
 * Copyright 2015 Posco ICT 
 * Licensed under MIT Developed by Susang Kim 
 * ======================================================================== */


+function ($) { 
  'use strict';

  // CircularMenu CLASS DEFINITION
  // ======================
  
  
  /**
   * circularMenu variable
   * - 이 셀렉터와 동일한 DOM element로부터 click 이벤트를 연결하기 위하여 
   *   생성자에서 사용하는 jQuery Selector
   */
  var circularMenu = '[data-menu=circular]' 

  // CircularMenu class 
  // el: DOM element
  // DOM el 혹은 descendant of el이 data-menu 속성을  value로 갖고 있으면 click 이벤트를 this.open으로 연결. 
  var CircularMenu   = function (el) {
    $(el).on('click', circularMenu, this.open)
  }

  CircularMenu.VERSION = '1.0.0'

  CircularMenu.TRANSITION_DURATION = 150

  CircularMenu.prototype.open = function () { // Constructor에는 return value가 없다.
		$(circularMenu).each(function(){
			var $this    = $(this) // this는 click 이벤트가 발생하는 element를 참조한다.
		  	var open = 'menu--open' //열기 닫기 구분을 위함
		    if($this.hasClass(open)){
		    	closeMenu($this,open);
		    }else{
		    	openMenu($this,open);
		    }
		})
  }

  function openMenu($this,open){
	  	$this.addClass(open);
  }
  function closeMenu($this,open){
	  	$this.removeClass(open);
  }

  // 1. CircularMenu PLUGIN DEFINITION
  function Plugin(option) { 
    return this.each(function () { 
      var $this = $(this)
      var data  = $this.data('vs.circularmenu') 
      if (!data) $this.data('vs.circularmenu', (data = new CircularMenu(this))) 
      if (typeof option == 'string') data[option].call($this) 
    })
  }
  var old = $.fn.circularmenu 
  $.fn.circularmenu             = Plugin
  $.fn.circularmenu.Constructor = CircularMenu 
  $.fn.circularmenu.noConflict = function () {
    $.fn.circularmenu = old
    return this 
  }

  $(document).on('click.vs.circularmenu.data-api', circularMenu, CircularMenu.prototype.open)
 
}(jQuery); // this circularmenu plugin is added to the jQuery


