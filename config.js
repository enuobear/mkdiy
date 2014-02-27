require.config({
    baseUrl: "js",
    paths: {
    }
});

require([
	'underscore'
	'backbone',
	'require',
	'router'
],function(_, Backbone, require, router){
	router.on('route:homepage', function(){
		require(['todo'], function(HomeView){
			HomeView();
		});
	});
});
