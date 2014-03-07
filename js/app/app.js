var fnProcess = {
	getHeight: function(elem){
		var $elem = elem,
			$elHeight = $elem.innerHeight();
		return $elHeight;
	},
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


// 滚动文字
var setMarquee = {
	init: function(elem, conf){
		var self = this;
		var conf = conf || {};

		self.tMove     = conf.tMove || '.marquee';
		self.cloneTag  = conf.cloneTag || 'div';

		self.moveX = 0;
		self.distMove = 0;

		self.wrapper = document.querySelector(elem);
		self.moveDom = document.querySelector(self.tMove);

		self.newDom = '';
		
		var temp = document.createElement(self.cloneTag);
		self.newDom = self.wrapper.appendChild(temp);
		self.newDom.innerHTML = self.moveDom.innerHTML;
		
		self.changeStyle();
	},
	refer: function(){
		var self = this;

		self.newDom = self.wrapper.getElementsByTagName(self.cloneTag)[0];
		self.changeStyle();
	},
	changeStyle: function(){
		var self = this;
		self.distMove = self.moveDom.offsetWidth;
		self.newDom.style.cssText = 'left:'+self.distMove+'px;width:'+self.distMove+'px';
	},
	loop: function(){
		var self = this;
		if(self.moveX == -self.moveDom.offsetWidth){
			self.moveX = 0;
		}else{
			self.moveDom.style.cssText = '-webkit-transform:translate3d('+self.moveX+'px, 0, 0)';
			self.newDom.style.webkitTransform = 'translate3d('+self.moveX+'px, 0, 0)';
			self.moveX--;
		}
	}
};

var homeView = {
	// 初始化
	init: function(){
		var $this = this;

		$this.showType = false; //活动规则是否显示

		$this.bonusBtn   = $(".bonus_list_click");
		$this.bonusList  = $(".bonus_list");
		$this.bonusMask  = $(".bonus_mask");

		$this.bonusListHeight = fnProcess.getHeight($this.bonusList);
		$this.bodyHeight = $("body").height();;

		$this.bonusShow();
		$this.ruleShow();
		
		// 文字滚动
		setMarquee.init('.bonus_marquee', {
			tMove: '.marquee',
			cloneTag: 'dd'
		});
		var textTimer = setInterval(function(){
			setMarquee.loop();
		}, 10);

		// 屏幕旋转
		window.addEventListener('orientationchange', function(){
			$this.ruleShow();
			clearInterval(textTimer);
			setMarquee.refer();
			textTimer = setInterval(function(){
				setMarquee.loop();
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

		var $btn     = $(".bonus_rule"),
			$tIcon   = $(".bonus_rule_icon"),
			$tView   = $(".bonus_rule_art"),
			$show    = $(".bonus_rule article"),
			$tHeight = fnProcess.getHeight($show);

		$btn.toggle(function(){
			$this.showType = true;

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


homeView.init();
