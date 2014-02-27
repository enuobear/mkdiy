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
    console.log('start');
	router.on('route:main', function(){
		require(['app/todo'], function(HomeView){
			HomeView();
		});
        console.log('into main');
	});

    //开启路由监听
    Backbone.history.start();
});