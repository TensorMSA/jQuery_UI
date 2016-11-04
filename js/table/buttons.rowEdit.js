
/*!
 * Edit Row button for Buttons and DataTables.
 * 2015 Susang Kim Ltd - datatables.net/license
 */

(function($, DataTable) {
"use strict";

$.extend( DataTable.ext.buttons, {
	// Single button to add row
	edit: {
		text: function ( dt ) {
			return dt.i18n( 'buttons.edit', '' );
		},
		className: 'buttons-edit glyphicon glyphicon-pencil',
		updateModalTemplate: '',
		action: function ( e, dt, button, conf ) {
			if(dt.row('.selected').length > 0)
			{
				conf._createEditRow(e, dt, button,conf);
			}
			else
			{
				conf._showNoneSelectedModal(dt, button, conf);
			}
			
		},
		rowEditModalBtn: null,
		rowEditModalTemplate: null,
		dt: null,
		init: function(dt, button, conf) {
			conf._createRowEditModal(button, conf);
			conf.dt = dt;
		},		
		
		//edit row
		_createEditRow: function( e, dt, button, conf) {
			var modalBody = $(conf.rowEditModalTemplate).find('div.modal-body');
			var colTitle;
			var modalBodyForm = $($(modalBody).append($('<form/>').addClass('form-horizontal')));
			for(var i=0; i < dt.settings()[0].aoColumns.length; i++)
			{
				colTitle = dt.settings()[0].aoColumns[i].sTitle;
				$($(modalBodyForm).find('form')
						.append($('<div/>').addClass('form-group')
								.append($('<label/>').attr('for',colTitle.toLowerCase()).text(colTitle+':').addClass('col-sm-2'))
								.append($('<div/>').addClass('col-sm-10')
										.append($('<input/>').attr('id',colTitle.toLowerCase()).addClass('form-control').val(dt.row('.selected').data()[i]))
										)
								.append($('<div/>').addClass('col-sm-2'))
								.append($('<div/>').addClass('col-sm-10').addClass('msg-error')
										.append($('<p/>').attr('style','color:red;'))
										)
								)
				);
			}
			$(conf.rowEditModalTemplate).find('#rowEditLabel').text('Update entry');
			$(conf.rowEditModalTemplate).find('button.btn-edit').addClass('update').text('Update');
			/*
			$(conf.rowEditModalTemplate).find('button.btn-edit').on('click', function(){
				$(modalBody).empty(); // remove child elements
			});
		
			$(conf.rowEditModalTemplate).find('button.close').on('click', function(){
				$(modalBody).empty(); // remove child elements
			});
			
			$(conf.rowEditModalTemplate).on('hidden.bs.modal', function(){
				$(modalBody).empty(); // remove child elements
			});			
				*/
			$(conf.rowEditModalTemplate).find('.update')
				.off('click')
				.on('click',{sTableId: dt.settings()[0].sTableId, modalId: $(conf.rowEditModalTemplate).attr('id') }, function(e){
				
				console.log("Edit Start");
				var table = $('#'+e.data.sTableId).DataTable();
				var tableAttrArray =  $('#'+e.data.sTableId).attr('data-attributes').split('|');
				
				// create json object
				var JSONArray = [];
				var modalInputTag;
				for(var i in tableAttrArray)
				{
					modalInputTag = $('#'+e.data.modalId).find('.modal-body').find('input')[i];
					JSONArray[i] = $(modalInputTag).val();
				}
				
				//$(modalBody).empty();
			//	table.row.edit();
				
				table.row.add(JSONArray).draw();

				table.row('.selected').remove().draw();
				
				
				//$('#'+e.data.modalId).hide();
			});
			

			
		},
		_createRowEditModal: function (button, conf) {
		conf.rowEditModalBtn = $(button).attr('data-toggle','modal').attr('data-target','#rowEditModal');
			
		conf.rowEditModalTemplate = $($('<div>').addClass('modal fade').attr('id','rowEditModal').attr('tabindex','-1').attr('role','dialog').attr('aria-labelledby','rowEditLabel')
							.append($('<div>').addClass('modal-dialog').attr('role','document')
									.append($('<div>').addClass('modal-content')
											.append($('<div>').addClass('modal-header bg-primary')
													.append($('<button>').attr('type','button').addClass('close').attr('data-dismiss','modal').attr('aria-label','Close')
															.append($('<span>').attr('aria-hidden','true').text('x'))
															)
															.append($('<h4>').addClass('modal-title').attr('id','rowEditLabel'))
													)
													.append($('<div>').addClass('modal-body'))
													.append($('<div>').addClass('modal-footer bg-success')
															.append($('<button>').attr('type','button').addClass('btn btn-edit btn-primary').attr('data-dismiss','modal').text('OK'))
															)
											)
									)
								).insertAfter(button);
		
		$(conf.rowEditModalTemplate).find('button.btn-edit').on('click', function(){
			$(conf.rowEditModalTemplate).find('div.modal-body').empty(); // remove child elements
		});
		$(conf.rowEditModalTemplate).find('button.close').on('click', function(){
			$(conf.rowEditModalTemplate).find('div.modal-body').empty(); // remove child elements
		});
		
		$(conf.rowEditModalTemplate).on('hidden.bs.modal', function(){
			$(conf.rowEditModalTemplate).find('div.modal-body').empty(); // remove child elements
		});		
		
		},
		_showNoneSelectedModal: function(dt, button, conf) {
			// 1. show delete warning modal
			var message = "Update Row warning: Row must be selected when update row";
			$(conf.rowEditModalTemplate).find('#rowEditLabel').text('Warning');
			$(conf.rowEditModalTemplate).find('div.modal-body').text(message);
			$(conf.rowEditModalTemplate).find('.update').off('click');

			$(conf.rowEditModalTemplate).find('button.btn-edit').removeClass('update').text('OK');
			/*
			$(conf.rowEditModalTemplate).find('button.btn-edit').on('click', function(){
				$(conf.rowEditModalTemplate).find('div.modal-body').empty();
			});*/
		}
		
	}
} );

})(jQuery, jQuery.fn.dataTable);
