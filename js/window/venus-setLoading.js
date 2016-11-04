
+function ($) { 
  'use strict';

  
  /**
	 * 로딩 이미지 적용 및 해제 
	 *  @param {bool} bVisible 
	 *  @param {string} sClassName
	 *  @memberof jQuery#fn
	 */
	$.fn.setLoading = function(bVisible, sClassName) {
		if (!sClassName) sClassName = "loading-gray-xs";
		
		switch(sClassName) {
		case "L":
			sClassName = "loading-gray-lg";
			break;
		case "M":
			sClassName = "loading-gray-sm";
			break;
		case "S":
			sClassName = "loading-gray-xs";
			break;
		}
//		return sClassName;

		
		
		if (bVisible) {
			$(this).addClass(sClassName);
		} else {
			$(this).removeClass(sClassName);
		}
	};
  
	  var old = $.fn.setLoading

	  // setLoading NO CONFLICT
	  // ===================

	  $.fn.setLoading.noConflict = function () {
	    $.fn.setLoading = old
	    return this
	  }
}(jQuery); // this setLoading plugin is added to the jQuery