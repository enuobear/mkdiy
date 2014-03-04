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
		require(['app/main'], function(HomeShow){
			HomeShow();
		});
        console.log('homepage');
	});

	//prompt
	router.on('route:prompt', function(){
		require(['app/prompt'], function(PromptView){
			PromptView();
		});
        console.log('prompt');
	});

	//prompt
	router.on('route:json', function(){
		require(['app/json'], function(Json){
			Json();
		});
        console.log('json');
	});


	//todo
	router.on('route:todo', function(){
		require(['app/todo'], function(Todo){
			Todo();
		});
        console.log('todo');
	});

    //开启路由监听
    Backbone.history.start();
});
