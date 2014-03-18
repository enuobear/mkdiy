define([
	'jquery',
	'backbone',
	'app/main.marquee',
	'app/main.lottery'
], function($, Backbone, SetMarquee, Lottery){
	
	var HomeView = {
		// 初始化
		init: function(){
			var self = this;

			self.showType = false; //活动规则是否显示

			self.$bonusBtn   = $(".bonus_list_click");
			self.$bonusList  = $(".bonus_list");
			self.$bonusMask  = $(".bonus_mask");

			self.$bonusListHeight = self.getHeight(self.$bonusList);
			self.$bodyHeight = $("body").height();

			self.bonusShow();
			self.ruleShow();

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
				self.ruleShow();

				clearInterval(textTimer);
				SetMarquee.refer();
				textTimer = setInterval(function(){
					SetMarquee.loop();
				}, 10);


				Lottery.initDraw();
			}, false);
		},
		// 显示我的奖品
		bonusShow: function(){
			var self = this;
			self.$bonusMask.css("height",self.$bodyHeight+"px");

			self.$bonusList.css({
				"-webkit-transform": "translate3d(0, -"+self.$bonusListHeight+"px, 0)"
			});

			setTimeout(function(){
				self.$bonusList.css({
					"display": "block"
				});
			}, 1);

			self.$bonusBtn.toggle(function(){
				self.maskShow("block");
				self.setAnimate({
					elem: self.$bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, -5px, 0)'
				});
				self.setAnimate({
					elem: self.$bonusBtn,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+(self.$bonusListHeight-5)+'px, 0)'
				});
			}, function(){
				self.maskShow("none");

				self.setAnimate({
					elem: self.$bonusList,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, '+(-self.$bonusListHeight)+'px, 0)'
				});
				self.setAnimate({
					elem: self.$bonusBtn,
					tType: '-webkit-transform',
					tCSS: 'translate3d(0, 0, 0)'
				});
			});
		},
		// 显示活动规则
		ruleShow: function(){
			var self = this;

			var $btn     = $(".bonus_rule"),
				$tIcon   = $(".bonus_rule_icon"),
				$tView   = $(".bonus_rule_art"),
				$show    = $(".bonus_rule article"),
				$tHeight = self.getHeight($show);


			$btn.toggle(function(){
				self.showType = true;

				$tIcon.css({
					'-webkit-animation': 'rotateup .6s ease-in-out forwards'
				})
				self.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: $tHeight+'px'
				});
			}, function(){
				self.showType = false;

				$tIcon.css({
					'-webkit-animation': 'rotatedown .6s ease-in-out forwards'
				})
				self.setAnimate({
					elem: $tView,
					tType: 'height',
					tCSS: 0
				});
			});
		},
		// 遮罩层显示
		maskShow: function(type){
			var self = this,
				$type = type;

			if(self.showType){
				self.$bodyHeight = $("body").height();
				self.$bonusMask.css("height", self.$bodyHeight+"px");
			}
			self.$bonusMask.css("display", $type);
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
