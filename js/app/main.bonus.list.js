define([
	'jquery',
	'backbone',
	'app/main.fn',
	'app/main.marquee',
	'app/main.frame'
], function($, Backbone, FnProcess, SetMarquee, SetFrame){
	
	var HomeView = {
		// 初始化
		init: function(){
			var $this = this;

			$this.showType = false; //活动规则是否显示

			$this.bonusBtn   = $(".bonus_list_click");
			$this.bonusList  = $(".bonus_list");
			$this.bonusMask  = $(".bonus_mask");

			$this.bonusListHeight = FnProcess.getHeight($this.bonusList);
			$this.bodyHeight = $("body").height();

			$this.bonusShow();
			$this.ruleShow();
			
			// 文字滚动
			SetMarquee.init('.bonus_marquee', {
				tMove: '.marquee',
				cloneTag: 'dd'
			});
			var textTimer = setInterval(function(){
				SetMarquee.loop();
			}, 10);

			// 屏幕旋转
			window.addEventListener('orientationchange', function(){
				$this.ruleShow();

				clearInterval(textTimer);
				SetMarquee.refer();
				textTimer = setInterval(function(){
					SetMarquee.loop();
				}, 10);
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
				FnProcess.setAnimate({
					elem: $this.bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, -5px, 0)'
				});
				FnProcess.setAnimate({
					elem: $this.bonusBtn,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+($this.bonusListHeight-5)+'px, 0)'
				});
			}, function(){
				$this.maskShow("none");

				FnProcess.setAnimate({
					elem: $this.bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+(-$this.bonusListHeight)+'px, 0)'
				});
				FnProcess.setAnimate({
					elem: $this.bonusBtn,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, 0, 0)'
				});
			});
		},
		// 显示活动规则
		ruleShow: function(){
			var $this = this;

			var $btn     = $(".bonus_rule"),
				$tIcon   = $(".bonus_rule_icon"),
				$tView   = $(".bonus_rule_art"),
				$show    = $(".bonus_rule article"),
				$tHeight = FnProcess.getHeight($show);

			$btn.toggle(function(){
				$this.showType = true;

				FnProcess.setAnimate({
					elem: $tIcon,
					tType: '-webkit-transform',
					tCSS: 'rotate(180deg)'
				});
				FnProcess.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: $tHeight+'px'
				});
			}, function(){
				$this.showType = false;

				FnProcess.setAnimate({
					elem: $tIcon,
					tType: '-webkit-transform',
					tCSS: 'rotate(0deg)'
				});
				FnProcess.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: 0
				});
			});
		}
	};

	return HomeView;
});
