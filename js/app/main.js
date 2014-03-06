define([
	'jquery',
	'backbone',
	'app/main.fn'	
], function($, Backbone, fnProcess){
	
	var homeView = {
		// 初始化
		init: function(){
			var $this = this;


			$this.showType = false; //活动规则是否显示

			$this.bonusBtn   = $(".bonus_list_click");
			$this.bonusList  = $(".bonus_list");
			$this.bonusMask  = $(".bonus_mask");

			$this.bonusListHeight = fnProcess.getHeight($this.bonusList);
			$this.bodyHeight = $("body").height();

			$this.bonusShow();
			$this.ruleShow();

			// alert(1);
			window.addEventListener('orientationchange', function(){
				// alert(2);
				$this.ruleShow();
			}, false);
		},
		// 遮罩层显示
		maskShow: function(type){
			var $this = this,
				$type = type;

			if($this.showType){
				$this.bodyHeight = $("body").height();
				$this.bonusMask.css("height",$this.bodyHeight+"px");
			}
			$this.bonusMask.css("display", $type);
		},
		// 显示我的奖品
		bonusShow: function(){
			var $this = this;
			$this.bonusMask.css("height",$this.bodyHeight+"px");

			$this.bonusList.css({
				"-webkit-transform": "translate3d(0, -"+$this.bonusListHeight+"px, 0)"
			});

			setTimeout(function(){
				$this.bonusList.css({
					"display": "block"
				});
			}, 1);

			$this.bonusBtn.toggle(function(){
				$this.maskShow("block");
				// fnProcess.setAnimate({
				// 	elem: $this.bonusList,
				// 	distY: -5
				// });
				// fnProcess.setAnimate({
				// 	elem: $this.bonusBtn,
				// 	distY: $this.bonusListHeight-5
				// });
				console.log('bonusBtn.toggle1');
				fnProcess.setAnimate({
					elem: $this.bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, -5px, 0)'
				});
				fnProcess.setAnimate({
					elem: $this.bonusBtn,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+($this.bonusListHeight-5)+'px, 0)'
				});
			}, function(){
				$this.maskShow("none");
				// fnProcess.setAnimate({
				// 	elem: $this.bonusList,
				// 	distY: -$this.bonusListHeight
				// });
				// fnProcess.setAnimate({
				// 	elem: $this.bonusBtn
				// });

				fnProcess.setAnimate({
					elem: $this.bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+(-$this.bonusListHeight)+'px, 0)'
				});
				fnProcess.setAnimate({
					elem: $this.bonusBtn,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, 0, 0)'
				});
			});
		},
		// 显示活动规则
		ruleShow: function(){
			var $this = this;

			// alert(1);
			var $btn     = $(".bonus_rule"),
				$tIcon   = $(".bonus_rule_icon"),
				$tView   = $(".bonus_rule_art"),
				$show    = $(".bonus_rule article"),
				$tHeight = fnProcess.getHeight($show);

			$btn.toggle(function(){
				$this.showType = true;
				// $tIcon.css({
				// 	'-webkit-transition': '-webkit-transform 1s ease-in-out',
				// 	'-webkit-transform': 'rotate(180deg)'
				// })
				// $tView.css({
				// 	'-webkit-transition': 'height 1s ease-in-out',
				// 	'height': $tHeight+'px'
				// });

				fnProcess.setAnimate({
					elem: $tIcon,
					tType: '-webkit-transform',
					tCSS: 'rotate(180deg)'
				});
			
				fnProcess.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: $tHeight+'px'
				});
			}, function(){
				$this.showType = false;
				// $tIcon.css({
				// 	'-webkit-transition': '-webkit-transform 1s ease-in-out',
				// 	'-webkit-transform': 'rotate(0deg)'
				// })
				// $tView.css({
				// 	'-webkit-transition': 'height 1s ease-in-out',
				// 	'height': 0
				// });
				fnProcess.setAnimate({
					elem: $tIcon,
					tType: '-webkit-transform',
					tCSS: 'rotate(0deg)'
				});
			
				fnProcess.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: 0
				});
			});
		}
	};

	return homeView;
});
