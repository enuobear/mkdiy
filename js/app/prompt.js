define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var PromptView = function(){

		var Sidebar = Backbone.Model.extend({
			promptColor: function(csColor){
				var cssColor = prompt("Please enter a CSS color:");
				this.set({
					color: cssColor
				});
			}
		});

		$('#app_view').html('<div id=sidebar></div>');

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

		/////////////////
		// document.write("Hello javascript!")
		// var object = {};
		// _.extend(object, Backbone.Events);
		// object.on("alert", function(msg) {
		// 	//alert("hello " + msg);
		// 	document.write(msg)
		// });
		// object.trigger("alert", "event trigger1");

		// alert(1);

	};

	return PromptView;
});