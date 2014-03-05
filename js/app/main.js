define([
	'jquery',
	'backbone'	
], function($, Backbone){
	// var HomeView = Backbone.View.extend({
	// 	toggleBonusList: function() {},
	// 	event:{
	// 		'click .bonus_list_click': 'clickBonusList'	
	// 	},
 //        initialize: function(options) {
 //            $.extend(this, options);
 //        },
	// 	clickBonusList: function(){
	// 		this.toggleBonusList();
	// 	}
	// });
	
	var homePage = {};
	
	var fn = homePage.prototype;

	fn.Animate = function(conf){
		var self = this;
		var conf = conf || {};
		var $elem = conf.elem
			$distX = conf.distX || 0,
			$distY = conf.distY || 0,
			$time  = conf.tTime || .6;	
		$elem.css({
			'-webkit-transition': '-webkit-transform '+$time+'s ease-in-out',
			'-webkit-transform': 'translate3d('+$distX+'px, '+$distY+'px, 0)'
		});	
	};

	var homeShow = function(){
		// var homeView;	

		// console.log(2);


		// function toggleBonusList(){
		// 	alert(1);
		// }

		// homeView = new HomeView({
  //           toggleBonusList: toggleBonusList
  //       });

		var $bonusBtn = $(".bonus_list_click"),
			$bonusList = $(".bonus_list"),
			$bonusMask = $(".bonus_mask"),
			$bonusListHeight = $bonusList.innerHeight(),
			$bodyHeight = $("body").height();

		$bonusMask.css("height",$bodyHeight+"px");

		$bonusList.css({
			"-webkit-transform": "translate3d(0, -"+$bonusListHeight+"px, 0)"
		});

		setTimeout(function(){
			$bonusList.css({
				"display": "block"
			});
		}, 1);

		$bonusBtn.toggle(function(){
			$bonusMask.css("display", "block");
			// $bonusList.css({
			// 	"-webkit-transition": "-webkit-transform .6s ease-in-out",
			// 	"-webkit-transform": "translate3d(0, -5px, 0)"
			// });
			// $bonusBtn.css({
			// 	"-webkit-transition": "-webkit-transform .6s ease-in-out",
			// 	"-webkit-transform": "translate3d(0, "+($bonusListHeight-5)+"px, 0)"
			// });
			homePage.Animate({
				elem: $bonusList,
				distY: -5
			});
			homePage.Animate({
				elem: $bonusBtn,
				distY: $bonusListHeight-5
			});
		}, function(){
			$bonusMask.css("display", "none");
			$bonusList.css({
				"-webkit-transition": "-webkit-transform .6s ease-in-out",
				"-webkit-transform": "translate3d(0, -"+$bonusListHeight+"px, 0)"
			});
			$bonusBtn.css({
				"-webkit-transition": "-webkit-transform .6s ease-in-out",
				"-webkit-transform": "translate3d(0, 0, 0)"
			});
		});

	};
	return homeShow;
});
