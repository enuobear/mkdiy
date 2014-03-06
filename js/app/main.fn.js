define([
	'jquery',
	'backbone'	
], function($, Backbone){
	var fnProcess = {
		getHeight: function(elem){
			var $elem = elem,
				$elHeight = $elem.innerHeight();
			return $elHeight;
		},
		setAnimate: function(conf){
			// var conf = conf || {};
			// var $elem  = conf.elem,
			// 	$distX = conf.distX || 0,
			// 	$distY = conf.distY || 0,
			// 	$time  = conf.tTime || .6;	
			// $elem.css({
			// 	'-webkit-transition': '-webkit-transform '+$time+'s ease-in-out',
			// 	'-webkit-transform': 'translate3d('+$distX+'px, '+$distY+'px, 0)'
			// });
			var conf = conf || {};
			var $elem   = conf.elem,
				$tTime  = conf.tTime || .6,
				$tType  = conf.tType,
				$tCSS   = conf.tCSS;

			var style = {};
			style['-webkit-transition'] = $tType+' '+$tTime+'s ease-in-out';
			style[$tType] = $tCSS;
			$elem.css(style);

			// $elem.css({
			// 	'-webkit-transition': $tType+' '+$tTime+'s ease-in-out',
			// 	$tType: $tCSS
			// });
		}
	};
	return fnProcess;
});
