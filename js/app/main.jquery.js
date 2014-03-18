define([
	'jquery',
	'backbone',
	'app/main.marquee',
	'app/main.lottery'
], function($, Backbone, SetMarquee, Lottery){
	
	var HomeView = {
		// 初始化
		init: function(){
			var $this = this;

			$this.showType = false; //活动规则是否显示

			$this.bonusBtn   = $(".bonus_list_click");
			$this.bonusList  = $(".bonus_list");
			$this.bonusMask  = $(".bonus_mask");

			$this.bonusListHeight = $this.getHeight($this.bonusList);
			$this.bodyHeight = $("body").height();

			$this.bonusShow();
			$this.ruleShow();

			// 中奖弹框
			Lottery.init();
			
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


				Lottery.init();
			}, false);
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
				$this.setAnimate({
					elem: $this.bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, -5px, 0)'
				});
				$this.setAnimate({
					elem: $this.bonusBtn,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+($this.bonusListHeight-5)+'px, 0)'
				});
			}, function(){
				$this.maskShow("none");

				$this.setAnimate({
					elem: $this.bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+(-$this.bonusListHeight)+'px, 0)'
				});
				$this.setAnimate({
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
				$tHeight = $this.getHeight($show);


			$btn.toggle(function(){
				$this.showType = true;

				$tIcon.css({
					'-webkit-animation': 'rotateup .6s ease-in-out forwards'
				})
				$this.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: $tHeight+'px'
				});
			}, function(){
				$this.showType = false;

				$tIcon.css({
					'-webkit-animation': 'rotatedown .6s ease-in-out forwards'
				})
				$this.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: 0
				});
			});
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
		// 高度获取
		getHeight: function(elem){
			var $elem = elem,
				$elHeight = $elem.innerHeight();
			return $elHeight;
		},
		// 设置动画
		setAnimate: function(conf){
			var conf = conf || {};
			var $elem   = conf.elem,
				$tTime  = conf.tTime || .6,
				$tType  = conf.tType,
				$tCSS   = conf.tCSS;

			var style = {};
			style['-webkit-transition'] = $tType+' '+$tTime+'s ease-in-out';
			style[$tType] = $tCSS;
			$elem.css(style);
		}
	};

	return HomeView;
});
