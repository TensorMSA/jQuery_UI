/* ========================================================================
 * venus: venustable-option.js v3.3.4
 * Licensed under MIT
 * ======================================================================== */
/*
 * - jQuery Self-Invoking function
 * - Twitter bootstrap 사용 패턴
 * - function($) { ...} (window.jQuery)
 **/
+function ($) { 
  'use strict';

  // SubWindow CLASS DEFINITION
  // ======================
  
  /**
   * subwindow class has a constructor and one method
   * 
   */

  
  /**
   * dismiss variable
   * - 이 셀렉터와 동일한 DOM element로부터 click 이벤트를 연결하기 위하여 
   *   생성자에서 사용하는 jQuery Selector
   */
  var window = '[data-window]' 

  // Subwindow class 
  // el: DOM element
  // DOM el 혹은 descendant of el이 data-window 속성을  value로 갖고 있으면 click 이벤트를 this.open으로 연결. 
  var Subwindow   = function (el) {
    $(el).on('click', window, this.open)
  }

  Subwindow.VERSION = '1.0.0'

  Subwindow.TRANSITION_DURATION = 150

  Subwindow.prototype.open = function () { // Constructor에는 return value가 없다.

	var $this    = $(this) // this는 click 이벤트가 발생하는 element를 참조한다.
    // 'First Option': data-target 속성이 있는지 확인


    var position = $this.attr('data-window') // get the data-target attr's value
    //위치별 Class속성 파악
    var classPosition="."+position+"Window" 
  	var d = 'opened' //열기 닫기 구분을 위함
	   
    var divHeight = $(classPosition).height();  
	var divWidth = $(classPosition).width();
	//$(classPosition).css("display","none"); 
		
  		
    if($(classPosition).hasClass(d)){
    	closeWindow(position,d,divWidth,divHeight)
    }else{
    	openWindow(position,d)
    }

  }

  function openWindow(element,d){
	  if(element=='left'){
		 $('.leftWindow').css("display","block");
		 $('.leftWindow').animate({marginLeft:"0px"}, 400)
		 $('.leftWindow').addClass(d)
	  }else  if(element=='right'){
		  $('.rightWindow').css("display","block");
 		 $('.rightWindow').animate({marginRight:"0px"}, 400);
		 $('.rightWindow').addClass(d)
	  }else  if(element=='bottom'){
		  $('.bottomWindow').css("display","block");
		 $('.bottomWindow').animate({marginBottom:"0px"}, 400);
		 $('.bottomWindow').addClass(d)
	  }else  if(element=='top'){
	  
	  }
  }
  function closeWindow(element,d,width,height){
	  if(element=='left'){
		 $('.leftWindow').animate({marginLeft:"-"+ width +"px"}, 400,
			function(){
			 $('.leftWindow').css("display","none");
		    }	 //animate 효과 적용 보완 필요
		 ); 
		 $('.leftWindow').removeClass(d)
	  }else  if(element=='right'){
		 $('.rightWindow').animate({marginRight:"-"+ width +"px"}, 400,
			 function(){
			 	$('.rightWindow').css("display","none");
		     }
		 );  
		 $('.rightWindow').removeClass(d)
	  }else  if(element=='bottom'){
		 $('.bottomWindow').animate({marginBottom:"-"+ height +"px"}, 400,
		     function(){
				 $('.bottomWindow').css("display","none");
		     }
		 );
		 $('.bottomWindow').removeClass(d)
	  }else  if(element=='top'){
		  
	  } 
  }

  // 1. Subwindow PLUGIN DEFINITION
  // =======================
  // Now it's time to actually define the Subwindow class as a jQuery plugin
  function Plugin(option) { // option argument
	                        // 1) This is common jQuery plugin pattern
	                        // 
	// Also, as a jQuery plugin best practice, the result of calling this.each is returned to enable chaining of jQuery function calls.
    return this.each(function () { // this: result of jQuery Selector(Array of DOM element, each: for looping with DOM element
    	                           // .each(function): jQuery Object에 대해서 iteration을 하고 iteration 하면서 각 element별로 function실행
    	
      // $(this): jQuery function에 접근, this: javascript function에 접근
      // jQuery() = $() --> 괄호안에 있 selector는랑 match되는 DOM element를 찾아서 jQuery object를 만들어 준다.
      var $this = $(this)
      var data  = $this.data('vs.subwindow') // checking if we've already created an Subwindow instance for this DOM element
      // .data() in jQuery
      // 1) .data(key): Return the value at the named data store for the first element
      // 2) .data(key,value): Store arbitrary data associated with the matched elements
      
      // data 가 null이면 Alert instance가 생성 전이다. 
      if (!data) $this.data('vs.subwindow', (data = new Subwindow(this))) // creates the Subwindow instance, and it will be saved bs.alert key
      if (typeof option == 'string') data[option].call($this) // but options can also be a string with the name of a method that you want to invoke on the Subwindow instance
      // data는 Subwindow Instance에 대한 참조이고, 그러므로 data[option]은 Subwindow instance의 function에 대한 참조이다.
      // 메소드가 .call 된다.  
    })
  }
  // fn: to hook your own functionality into jQuery($.fn.myextension)
  var old = $.fn.subwindow // 1. here is to capture the current value of $.fn.alert into the old variable
                       //  - This is used later in noConflict
                       //  - it just a way to prevent this Subwindow plugin from interfering with another alert plugin with the same name
  $.fn.subwindow             = Plugin
  $.fn.subwindow.Constructor = Subwindow // By creating the Constructor reference, 
                                 // other code can directly instantiate an Subwindow instance without needing to invoke it indirectly through the jQuery API.
                                 // 이 구문을 추가하지 않으면, Alert Constructor는 private으로 남아 있는다.
  								 // 

  // 2. Subwindow NO CONFLICT
  // =================
  // This is a simple convention for handling the situation that there is another jQuery plugin also called alert. 
  // This function sets $.fn.Subwindow to its old value and returns this which refers to the $.fn.alert function defined above.
  // example
  $.fn.subwindow.noConflict = function () {
    $.fn.subwindow = old
    return this // return function defined above.
  }

  // 3. Subwindow DATA-API --> 없으면 외부에서 javascript를 통해, Plugin을 호출해야지만 private close 메소드를 사용할 수 있다.
  // ==============
  // This allows for purely declarative use of the Alert plugin, no JavaScript calls necessary.
  // .on( events [, selector ] [, data ], handler ) Method
  $(document).on('click.vs.subwindow.data-api', window, Subwindow.prototype.open)
  //$(document).on('click.vs.subwindow.data-api', '.subwindowClose', Subwindow.prototype.open)

  // $(document).off("click.bs.alert") <-- remove close event

  // This binds the 'click' event for any DOM element in the page matching the dismiss selector to Alert's close method
  // dismiss selector: [data-dismiss="alert"]
  // So any clickable element in the page that has the attribute data-dismiss with value alert will have its click event handled by Alert's close method.
}(jQuery); // this alert plugin is added to the jQuery