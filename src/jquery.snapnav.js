/*!
 *
 * A jQuery plugin that sets an element fixed to the top of the window when the top of the element meets or is above it.
 * The element snaps back in it's original position the original position is met
 *
 * @author Adam Henson
 * Licensed under the MIT license
 * https://github.com/adamhenson/jquery-snapnav
 *
 */
;(function ( $, window, document, undefined ) {
	
	// set scope globals
	var pluginName = 'snapNav',
	defaults = {
		classSnapHolder: "snap-holder",
		classSnapFixed: "snap-fixed"
	},
	isFixed = false, currOffset, el, $el;
	
	// construct
	 function Plugin( element, options ) {
		el = element;
		$el = $(element);
		this.options = $.extend( {}, defaults, options);
		this.init();
	 }
	
	 // set a placeholder to allow detection of original position. wrap in a div with position fixed style. allowing a class to be set for both new elements to allow overriding of style
	 Plugin.prototype.setFixed = function () {
		$el.before('<div class="' + this.options.classSnapHolder + '" style="display:block; height:' + $el.outerHeight() + 'px; margin:0; padding:0;"></div>');
		$el.wrap('<div class="' + this.options.classSnapFixed + '" style="width:100%; position:fixed; top:0; left:0; z-index:999;" />');
		isFixed = true;
	 };
	
	// unset the fixed position to original state by removing placeholder and container
	Plugin.prototype.unsetFixed = function () {
		$("." + this.options.classSnapHolder).remove();
		if($el.parent().is("." + this.options.classSnapFixed)) $el.unwrap();
		isFixed = false;
	};
	
	// initialize the plugin and define scroll reaction
	Plugin.prototype.init = function () {
		var theObj = this;
		currOffset = el.getBoundingClientRect().top;
		if(currOffset <= 0 && isFixed == false) this.setFixed();
		$(window).on("scroll", function() {
			currOffset = el.getBoundingClientRect().top;
			if(currOffset <= 0 && isFixed == false) theObj.setFixed();
			else if($("." + theObj.options.classSnapHolder).length && $("." + theObj.options.classSnapHolder)[0].getBoundingClientRect().top >= $el.height() && isFixed == true) theObj.unsetFixed();
		});
	};
	
	// A lightweight plugin wrapper around the constructor, 
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, 
				new Plugin( this, options ));
			}
		});
	}
	
})( jQuery, window, document );