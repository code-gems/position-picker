"use strict";
(function($){

	$.fn.PositionPicker = function(settings) {

		return this.each( function(){

			var self 			= $(this),
				input			= $("<div class='pp-input'/>"),
				input_span 		= $("<span/>"),
				dropdown		= $("<div class='pp-dropdown'/>"),
				radios,
				labels,

				// USED FOR FIXING DOCUMENT CLICK EVENT TOGGLING DROPDOWN
				clicked 		= 0,

				// SETTINGS
				sett 			= typeof settings 					!= 'undefined' ? settings : {},
				select			= typeof sett.select 				!= 'undefined' ? parseInt(sett.select) : 0,
				select 			= typeof self.attr("select") 		!= 'undefined' ? parseInt(self.attr("select")) : select,

				pholder			= typeof sett.placeholder 			!= 'undefined' ? sett.placeholder : "Position: ",
				pholder 		= typeof self.attr("placeholder") 	!= 'undefined' ? self.attr("placeholder") : pholder,

				ipt_name		= typeof sett.name	 				!= 'undefined' ? sett.name : "position",
				ipt_name 		= typeof self.attr("input-name") 	!= 'undefined' ? self.attr("input-name") : ipt_name,

				text 			= typeof sett.text 					!= 'undefined' ? sett.text : [  "top-left", "top-center", "top-right",
																									"middle-left", "middle-center", "middle-right",
																									"bottom-left", "bottom-center", "bottom-right"],

				value 			= typeof sett.value 				!= 'undefined' ? sett.value : [ "position-top position-left", "position-top position-center", "position-top position-right",
																									"position-middle position-left", "position-middle position-center", "position-middle position-right",
																									"position-bottom position-left", "position-bottom position-center", "position-bottom position-right"],



				init = function() {
					var radios_body = "";

					// CREATE INPUT BODY
					for ( var i = 0; i < 9; i++ ) {
						radios_body += "<input type='radio' name='" + ipt_name + "' data-text='" + text[i] + "' value='" + value[i] + "'><label/>";
					}

					dropdown.append( radios_body );
					input.append( input_span ).append( dropdown );
					self.append( input );

					// FIND RADIOS AND LABELS
					radios 	= dropdown.find("input[type='radio']"),
					labels	= dropdown.find("label"),


					radios.prop("checked", false);
					$(radios.get(select)).prop("checked", true);

					input_span.text(pholder + " " + $(radios.get(select)).data("text"));

					// ADD EVENTS TO LABELS
					labels.each(function(index){
						var me 	= $(this),
							idx = index;

						me.mousedown(function(e){
							radios.prop("checked", false);
							$(radios.get(idx)).prop("checked", true);
							select = idx;

							input_span.text(pholder + " " + $(radios.get(idx)).data("text"));

							setTimeout( function(){ closeDropdown() }, 200);
						});

					});

					// ADD EVENTS TO INPUT
					input.on("click", function(e){ clicked = 1; toggleDropdown(); });

				},

				closeDropdown = function() {
					self.removeClass("pp-show");
				},

				toggleDropdown = function() {
					self.toggleClass("pp-show");
				};

			$(document).click( function(){
				console.log(self.attr("toggle"));
				if ( self.attr("toggle") != 0 ) {
					self.attr("toggle", 0);
					return;
				}
				clicked !=0 ? clicked = 0 : closeDropdown();
			});

			// RUN
			init();

		});


	}; //-- PositionPicker()

	$.fn.getPosition = function() {
		return $(this).find("input[type='radio']:checked").val();
	};

	$.fn.toggle = function() {
		return $(this).attr("toggle", 1).toggleClass("pp-show");
	};

	$.fn.open = function() {
		return $(this).attr("toggle", 1).addClass("pp-show");
	};

	$.fn.close = function() {
		return $(this).removeClass("pp-show");
	};

})(jQuery);

var pospicker1, pospicker2, pospicker3;

$(window).on("load", function() {

	pospicker1 = $("#pp1").PositionPicker({
		placeholder	: 'Custom placeholder: ',
		name		: 'position1'

	});

	pospicker2 = $("#pp2").PositionPicker({
		name		: 'position2'

	});

	pospicker3 = $("#pp3").PositionPicker({
		name		: 'position3'

	});


});
