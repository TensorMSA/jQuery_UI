/* ========================================================================
 * venus: venus-relatedlov.js v0.0.1
 * Licensed under MIT
 * 2015 Susang Kim
 * ======================================================================== */

+function($){
	'use strict'
	
	var selector = '[data-select]'
		
	var firstSelectValue= null //초기 로딩시 json에서 2번째 select를 가져오기위함

	var VenusRelatedSelect = function(element,options){
		this.options = $.extend({}, VenusRelatedSelect.DEFAULTS, options)
		$(element).on('load.vs.venusrelatedselect', this.createRelatedSelect)
	}	
	VenusRelatedSelect.VERSION = '0.0.1'
	VenusRelatedSelect.TRANSITION_DURATION = 150

	VenusRelatedSelect.prototype.createRelatedSelect = function() {
		$(selector).each(function(){
			var $this = $(this)
			var selectContent = null

			if($this.attr('data-select') == "selectData")
			{
				selectContent = createFirstSelect($this)
				$this.append($.parseHTML(selectContent));
				selectContent = createSecondSelect($this)
				$this.after($.parseHTML(selectContent)); //뒤에 붙여야함 after사용
			}
		})
	}


	//초기 로딩시 생성되는 메소드
	function createFirstSelect($this)
	{
		var selectContent = ""
		//var firstSelectValue=""
			
		$.ajax({
			  url: $this.attr('data-lovdata'),
			  async: false,
			  dataType: 'json',
			  statusCode: {
				    404: function() {
				      alert( "select Data not found" );
				    }
				  },
				  success: function(data){ 
					   var valueList = $this.attr('data-value')
					   var nameList = $this.attr('data-name')
					   var tempValue=null

					   $.each(data, function(key, val){
						   		//첫번째 LOV 생성 중복 LOV 제거
							   	$(val).each(function(i,element){
							   		
							   		if(i=='0'){ //Related Creating을 위한 값 set
							   			firstSelectValue=element[valueList]	

							   		}
							   		
							   		if(tempValue!==element[valueList]){						   			
										selectContent += "<option "
								    	selectContent += "value='" + element[valueList] + "'>"
									    selectContent += element[nameList]
										selectContent += "</option>\n"
							   		}
							   		tempValue=element[valueList]
							   	})
							   	
					   })
					//console.log(selectContent)
			  	}
			});
			
		return selectContent
	}
	
	VenusRelatedSelect.prototype.changeRelatedSelect = function() {

			var $this = $(this)
			var selectContent = null
	//		var firstContent = null
			
			firstSelectValue=$this.val()
			//console.log("click Test" + firstSelectValue)
			if($this.attr('data-select') == "selectData")
			{
				//$("#"+$this.attr('id')+"2").remove()
				
				  $("#"+$this.attr('id')+"2").selectpicker('destroy');
				selectContent = createSecondSelect($this)
				//console.log(selectContent)
				$this.next().after($.parseHTML(selectContent))
		//		 $("#"+$this.attr('id')+"1").after($.parseHTML(selectContent))

			}
			 $("#"+$this.attr('id')+"2").selectpicker('refresh');
	}	
	
	function createSecondSelect($this)
	{
		var selectContent = ""
		//var firstSelectValue=""
			
		$.ajax({
			  url: $this.attr('data-lovdata'),
			  async: false,
			  dataType: 'json',
			  statusCode: {
				    404: function() {
				      alert( "select Data not found" );
				    }
				  },
				  success: function(data){ 
					   var valueList = $this.attr('data-value')
					   var nameList = $this.attr('data-name')
					   var tempValue=null
					   //id의 경우 2가 붙고 class는 속성을 그데로가져옴
					   var makeId= $this.attr('id')!==null ? " id="+ $this.attr('id')+"2":null
					   var makeClass= $this.attr('class')!==null ? " class='"+ $this.attr('class')+"'":""
					  selectContent += "<select"+makeId + makeClass+ ">\n"

						   $.each(data, function(key, val){
						   		//첫번째 LOV 생성 중복 LOV 제거
							   	$(val).each(function(i,element){						   		

							
							   		if(tempValue!==element[valueList+"_R"] && firstSelectValue==element[valueList]){						   			
										selectContent += "<option "
								    	selectContent += "value='" + element[valueList+"_R"] + "'>"
									    selectContent += element[nameList+"_R"]
										selectContent += "</option>\n"
							   		}
							   		tempValue=element[valueList+"_R"]
							   	})
							   	
								selectContent += "</select>\n"
					   })
				//	console.log(selectContent)
			  	}
			});
			
		return selectContent
	}
	
	
	function Plugin(option){
		return this.each(function(){
			var $this = $(this)
			var data = $this.data('vs.venusrelatedselect')  
			if(!data) $this.data('vs.venusrelatedselect', (data = new VenusRelatedSelect(this, option)))  
			if(typeof option == 'string') data[option].call() 
			                                               
		})
	}
	
	var old = $.fn.venusrelatedselect

	$.fn.venusrelatedselect             = Plugin
	$.fn.venusrelatedselect.Constructor = VenusRelatedSelect 

	$.fn.venusrelatedselect.noConflict = function () {
		$.fn.venusrelatedselect = old
		return this 
	}
		

	$(window).on('load', VenusRelatedSelect.prototype.createRelatedSelect);
	$(document).on('change.vs.venusrelatedselect.data-api',selector,VenusRelatedSelect.prototype.changeRelatedSelect);
}(jQuery);