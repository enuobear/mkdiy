//配置URL
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

require([
    'jquery',
	'underscore',
	'backbone',
    'router',
    'require'
],function($, _, Backbone, router, require){
	
	//homepage
	router.on('route:main', function(){
		require(['app/main'], function(homeView){
			homeView.init();
		});
	});


    //开启路由监听
    Backbone.history.start();
});
