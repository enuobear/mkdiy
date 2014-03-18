//配置URL
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

require([
    'jquery',
    'handlebars-v1.3.0',
	'underscore',
	'backbone',
    'router',
    'require'
],function($, HandleBars, _, Backbone, router, require){
	
	//homepage
	router.on('route:main', function(){
		require(['app/main'], function(HomeView){
			HomeView.init();
		});
	});


    //开启路由监听
    Backbone.history.start();
});
