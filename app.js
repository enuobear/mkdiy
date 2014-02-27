require.config({
    baseUrl: "",
    paths: {
    }
});

require([
	'use!underscore'
	'use!backbone',
	'require'
],function(_, Backbone, require){
	// router.on('route:homepage', function(){
	// 	require(['todo'], function(HomeView){
	// 		HomeView();
	// 	});
	// });

        var Sidebar = Backbone.Model.extend({
            promptColor: function(csColor){
                var cssColor = prompt("Please enter a CSS color:");
                this.set({
                    color: cssColor
                });
            }
        });

        window.sidebar = new Sidebar();

        sidebar.on('change:color', function(model, color){
            $('#sidebar').css({
                background: color
            });
        });

        sidebar.set({
            color: 'red'
        });

        sidebar.promptColor();
});