require([
    'jquery',
	'underscore',
	'backbone',
    'router',
    'require'
],function($, _, Backbone, router, require){
    console.log(1);
	router.on('route:main', function(){
		require(['todo'], function(HomeView){
			HomeView();
		});
        console.log('into main');
	});

    Backbone.history.start();
    // var Sidebar = Backbone.Model.extend({
    //     promptColor: function(csColor){
    //         var cssColor = prompt("Please enter a CSS color:");
    //         this.set({
    //             color: cssColor
    //         });
    //     }
    // });

    // window.sidebar = new Sidebar();

    // sidebar.on('change:color', function(model, color){
    //     $('#sidebar').css({
    //         background: color
    //     });
    // });

    // sidebar.set({
    //     color: 'red'
    // });

    // sidebar.promptColor();
});