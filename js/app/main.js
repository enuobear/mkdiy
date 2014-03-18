// 页面公用
var HomeView = {
	// 初始化
	init: function(){
		var self = this;


		console.log(document.referrer);
		console.log(window.location.href);
		
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


// 滚动
var SetMarquee = {
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

// 抽奖
var Lottery = {
	init: function(){
		var self = this;
		
		self.pixelRatio = self.getDevicePixelRatio(); // 获得像素比
		self.frames     = 2; // 帧数
		self.interState = 0;
		self.loopTime   = 100;
		self.isStart    = true; //用户是否可以点击开始抽奖了
		self.talkNum    = Math.floor(Math.random()*10);

		self.canvas = document.getElementById('bonus');

		self.initDraw();
	},
	initDraw: function(images){
		var self = this;

		var tWarpper = document.querySelector('.bonus_box_open');
		if(!tWarpper) return;
		// 获得外围宽度
		var cWidth = tWarpper.offsetWidth;

		// 绘制canvas大小
		self.canvas.style.width = cWidth+'px';
		self.canvas.style.height = '80px';
		self.canvas.width = cWidth*self.pixelRatio;
		self.canvas.height = 80*self.pixelRatio;

		// 箱子需要绘制的坐标
		self.imgPos = [
			{
				x: (cWidth/3-90)/2,
				y: 70
			},
			{
				x: cWidth/3+(cWidth/3-90)/2,
				y: 70
			},
			{
				x: cWidth/3*2+(cWidth/3-90)/2,
				y: 70
			}
		];

		self.ctx = self.canvas.getContext('2d');

		self.loadImages();
	},
	loadImages: function(){
		var self = this;
		images = new Image();
		images.onload = function() {
			self.isStart = true;
			for(var i=0; i<3; i++){
				self.drawImageBox(images, 0, 0, 180, 140, self.imgPos[i].x);
				self.drawImageBox(images, 0, 140, 180, 140, self.imgPos[i].x);
			}
			self.canvas.addEventListener('click', function(e){
				if(self.isStart){
					var boxSite = self.getClickBox(e)-1;
					console.log(boxSite);
					if(boxSite>=0){
						self.playAnimate(images, self.imgPos[boxSite].x);
					}
				}
			}, false);
		};
		images.src = 'themes/images/bonus_animate.png';
	},
	// 获得点击的坐标
	getEventPosition: function(ev){  
		var x, y;  
		if (ev.layerX || ev.layerX == 0) {  
			x = ev.layerX;  
			y = ev.layerY;  
		} else if (ev.offsetX || ev.offsetX == 0){ // Opera  
			x = ev.offsetX;  
			y = ev.offsetY;  
		}  
		return {x: x, y: y};  
	},
	// 获得像素比
	getDevicePixelRatio: function(){
		return window.devicePixelRatio || 1;
	},
	// 获得点击的箱子是哪个
	getClickBox: function(e){
		var self = this;

		var sortBox = 0,
			site = self.getEventPosition(e);

		console.log('鼠标点击的坐标：X: '+site.x+'Y: '+site.y);

		if((site.x > self.imgPos[0].x) && (site.x < (self.imgPos[0].x+85)) && (site.y < self.imgPos[0].y) && (site.y > 0)){
			console.log('点击的是第一个箱子');
			sortBox = 1;
		}
		if((site.x > self.imgPos[1].x) && (site.x < (self.imgPos[1].x+85)) && (site.y < self.imgPos[1].y) && (site.y > 0)){
			console.log('点击的是第二个箱子');
			sortBox = 2;
		}
		if((site.x > self.imgPos[2].x) && (site.x < (self.imgPos[2].x+85)) && (site.y < self.imgPos[2].y) && (site.y > 0)){
			console.log('点击的是第三个箱子');
			sortBox = 3;
		}
		return sortBox;
	},
	clearRectBox: function(dx){
		if (typeof CanvasRenderingContext2D !== "undefined") {
			var dx = dx * this.pixelRatio,
				dy = 0,
				dw = 90 * this.pixelRatio,
				dh = 70 * this.pixelRatio;
			// self.ctx.clearRect(self.imgPos[0].x*self.pixelRatio, 0, 90*self.pixelRatio, 70*self.pixelRatio);
			this.ctx.clearRect(dx, dy, dw, dh);
			return this;
		}
	},
	drawImageBox: function(images, sx, sy, sw, sh, dx){
		if (typeof CanvasRenderingContext2D !== "undefined") {
	        var dx = dx * this.pixelRatio,
		        dy = 0,
		        dw = 90 * this.pixelRatio,
		        dh = 70 * this.pixelRatio;

			// // 画箱子  
			// ctx.drawImage(images, 0, 0, 180, 140, self.imgPos[0].x*self.pixelRatio, 0, 90*self.pixelRatio, 70*self.pixelRatio);
			// ctx.drawImage(images, 0, 0, 180, 140, self.imgPos[1].x*self.pixelRatio, 0, 90*self.pixelRatio, 70*self.pixelRatio);
			// ctx.drawImage(images, 0, 0, 180, 140, self.imgPos[2].x*self.pixelRatio, 0, 90*self.pixelRatio, 70*self.pixelRatio);
			// ctx.save();
			// // 画问号
			// ctx.drawImage(images, 0, 140, 180, 140, self.imgPos[0].x*self.pixelRatio, 0, 90*self.pixelRatio, 70*self.pixelRatio);
			// ctx.drawImage(images, 0, 140, 180, 140, self.imgPos[1].x*self.pixelRatio, 0, 90*self.pixelRatio, 70*self.pixelRatio);
			// ctx.drawImage(images, 0, 140, 180, 140, self.imgPos[2].x*self.pixelRatio, 0, 90*self.pixelRatio, 70*self.pixelRatio);
	        this.ctx.drawImage(images, sx, sy, sw, sh, dx, dy, dw, dh);
	        return this;
		}
	},
	playAnimate: function(images, x){
		var self = this;
		self.clearRectBox(x);
		self.drawImageBox(images, 0, 0, 180, 140, x);
		self.timer = setInterval(function(){
			if(self.interState == self.frames){
				clearInterval(self.timer);
				setTimeout(function(){
					self.showFrame();
				}, (self.loopTime+100));
			}else{
				self.clearRectBox(x);
				self.drawImageBox(images, self.interState*180, 0, 180, 140, x);
				self.interState++;
			}
		}, self.loopTime);
	},
	showFrame: function(){
		var self = this;

		var bodyHeight = document.querySelector('body').offsetHeight;
		var mask = document.querySelector('.bonus_mask');

		var frame = document.querySelector('.bonus_frame');

		mask.style.cssText = 'display:block;height:'+bodyHeight+'px;z-index:1001;';
		frame.style.cssText = 'display:block';

		var text = document.querySelector('.bonus_frame dd');
		text.innerHTML = self.setSpeak();
	},
	setSpeak: function(){
		var talk = [];
		talk = [
			'虽说人艰不拆，但是这次真的木有中奖。<br>再点评一次，幸运总会眷顾你。',
			'貌似，可能……就差一点点了。马上中奖，马上就有礼品卡，再点评试试吧！',
			'礼品卡擦肩而过，但是积攒人品终究会爆发。亲，对自己的人品有信心吗？',
			'一切点评一条就放弃的行为都是耍流氓！<br>多写点评，中奖妥妥的！',
			'虽说木有中奖，但绝不放弃治疗。<br>药可以停，点评一定不能停。',
			'别伤心，分享中奖率翻倍，快分享给好友！',
			'亲，你长得太好看了，下次一定中！',
			'亲！幸运女神说你就差一点点！<br>再写一条吧！',
			'攒点人品继续抽，写个点评再抽一次！',
			'曾经有一份豪礼在你面前，可是你没有抽中啊。世事无奈，再来一次吧！'
		];

		return talk[this.talkNum];
	}
};

document.addEventListener("DOMContentLoaded", function(event){
	HomeView.init();
}, false);