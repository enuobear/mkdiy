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
			var conf = conf || {};
			var $elem   = conf.elem,
				$tTime  = conf.tTime || .6,
				$tType  = conf.tType,
				$tCSS   = conf.tCSS;

			var style = {};
			style['-webkit-transition'] = $tType+' '+$tTime+'s ease-in-out';
			style[$tType] = $tCSS;
			$elem.css(style);
		}
	};
	return fnProcess;
});
