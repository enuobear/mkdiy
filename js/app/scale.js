(function(window, undefined){
	var document = window.document,
		support = {
			transform3d: ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix()),
			touch: ("ontouchstart" in window)
		},
		touchstartEvent =  support.touch ? "touchstart" : "mousedown",
		touchmoveEvent  =  support.touch ? "touchmove" : "mousemove",
		touchendEvent   =  support.touch ? "touchend" : "mouseup";

		
	function getTranslate(x, y){
		var distX = x, distY = y;
		return support.transform3d
			? "translate3d("+ distX +"px, "+ distY +"px, 0)"
			: "translate("+ distX +"px, "+ distY +"px)";
	}

	function getPage(event, page) {
		return support.touch ? event.changedTouches[0][page] : event[page];
	}

	function moveTranslate(element, timer, distX, distY){
		element.style.webkitTransitionProperty = "-webkit-transform";
		element.style.webkitTransitionTimingFunction = "cubic-bezier(0,0,0.25,1.0)";
		element.style.webkitTransitionDuration = timer;
	    element.addEventListener("webkitTransitionEnd", function(event){
	    	element.style.webkitTransition = "none";
	    }, false );
		element.style.webkitTransform = getTranslate(distX, distY);
	}


	var Templates = {
		init: function(){
			var templates = '<div></div>'
			return templates;
		}
	}

	var ImagesZoom = function(params){
			return (this instanceof ImagesZoom)
				? this.init(params)
				: new ImagesZoom(params);
		};

	ImagesZoom.prototype = {
		// 给初始化数据
		init: function(params){
			var self   = this,
				params = params || {};
				
			var imgList   = document.querySelectorAll(params.elem + ' img'),
				zoomMask  = document.querySelector('.imgzoom_pack'),
				zoomImg   = document.querySelector('.imgzoom_pack .imgzoom_img img'),
				zoomClose = document.querySelector('.imgzoom_pack .imgzoom_x'),
				imgSrc    = '';

			zoomMask.addEventListener('click', function(){
				zoomMask.style.cssText = 'display:none';
				zoomImg.src = '';

				document.removeEventListener("touchmove", self.eventStop, false);
			}, false);

			for(var len=imgList.length,i=0; i<len; i++){
				imgList[i].addEventListener('click', function(i){
					imgSrc = this.getAttribute('src');
					zoomMask.style.cssText = 'display:block';
					zoomImg.src = imgSrc;
					var imgOriginaInfo = {
						width: zoomImg.width,
						height: zoomImg.height
					};
					zoomImg.style.cssText = 'margin-top:-'+(zoomImg.offsetHeight/2)+"px";

					document.addEventListener("touchmove", self.eventStop, false);
					
					self.addEventStart({
						wrapX: zoomMask.offsetWidth,
						wrapY: zoomMask.offsetHeight,
						mapX: zoomImg.width,
						mapY: zoomImg.height
					});
				}, false);
			}
		},
		addEventStart: function(conf){
			var self   = this;
			self.element = document.querySelector('.imgzoom_pack img');

			self.currentX = 0;
			self.newX     = 0;
			self.currentY = 0;
			self.newY     = 0;

			self.buff     = 3; //缓冲系数


			self.finger   = false; //触摸手指的状态 false：单手指 true：多手指

			//config set
			self.conf   = conf || {};
			self.wrapX  = self.conf.wrapX || 0; 	//可视区域宽度
			self.wrapY  = self.conf.wrapY || 0; 	//可视区域高度
			self.mapX   = self.conf.mapX || 0; 	    //地图宽度
			self.mapY   = self.conf.mapY || 0;      //地图高度

			//372
			self.gs_distY = (self.mapY - self.wrapY)/2;
			// alert(self.mapY);
			
			self.width  = self.mapX - self.wrapX;   //地图的宽度减去可视区域的宽度
			self.height = self.mapY - self.wrapY;   //地图的高度减去可视区域的高度


			self.element.addEventListener("touchstart",function(e){
				self._touchstart(e);
			},false);
			self.element.addEventListener("touchmove",function(e){
				self._touchmove(e);
			},false);
			self.element.addEventListener("touchend",function(e){
				self._touchend(e);
			},false);
		},
		_touchstart: function(e){
			var self = this;
			var touchLen = e.touches.length;

			e.preventDefault();
			
			if(touchLen == 1){
				self.startPageX = getPage(e, "pageX");
				self.basePageX  = self.startPageX;
				
				self.startPageY = getPage(e, "pageY");
				self.basePageY  = self.startPageY;

				self.finger = false;
			}else{
				self.finger = true;


				var x1= e.changedTouches[0].pageX,
		        	y1= e.changedTouches[0].pageY,
					x2= e.changedTouches[1].pageX,
		        	y2= e.changedTouches[1].pageY,
		        	a = Math.abs(x2-x1),
		        	b = Math.abs(y2-y1);

		        self.startC = Math.round(Math.sqrt(a*a+b*b));

				test({
					a: 0,
					b: "x1,y1("+x1+","+y1+") || x2,y2("+x2+","+y2+") || c("+self.startC+")"
				})
			}
		},
		_touchmove: function(e){
			var self = this,
				touchLen = e.touches.length;

			if(touchLen == 1){
				var pageX = getPage(e, "pageX"),
					pageY = getPage(e, "pageY");
				
			
				e.preventDefault();
				e.stopPropagation();

				self.distX = (pageX - self.basePageX) + self.newX;
				self.distY = (pageY - self.basePageY) + self.newY;
				
				self.currentX = self.distX; //记录下了移动的距离
				self.currentY = self.distY;
				

				if(self.width==0){ //宽度正好是屏幕的宽度时候不容许左右移动
					self.moveX = 0
					self.movePos();
				}else{
					if(self.distX > 0){
						self.moveX = Math.round(self.distX/self.buff);
						self.movePos();
					}else if( self.distX<=0 && self.distX>=-self.width ){
						self.moveX = self.distX;
						self.movePos();
					}else if(self.distX < -self.width ){
						self.moveX = -self.width+Math.round((self.distX+self.width)/self.buff);
						self.movePos();
					}
				}
				self.finger = false;
			}else{
				self.finger = true;
			
				e.preventDefault();
				e.stopPropagation();

				var x1= e.changedTouches[0].pageX,
		        	y1= e.changedTouches[0].pageY,
					x2= e.changedTouches[1].pageX,
		        	y2= e.changedTouches[1].pageY,
		        	a = Math.abs(x2-x1),
		        	b = Math.abs(y2-y1),
		        	c = Math.round(Math.sqrt(a*a+b*b));


				test({
					a: 1,
					b: "x1,y1("+x1+","+y1+") || x2,y2("+x2+","+y2+") || c("+c+")"
				})

				test({
					a: 2,
					b: self.startC/c
				})
			}
		},
		_touchend: function(e){
			var self = this,
				touchLen = e.touches.length;
			
			//self.newX = self.currentX;
			//self.newY = self.currentY;
			
			if(!self.finger){
				if( self.distX>0 ){
					self.newX = 0;
					self.reset();
				}else if( self.distX<=0 && self.distX>=-self.width ){
					self.newX = self.distX;
					self.reset();
				}else if( self.distX<-self.width ){
					self.newX = -self.width;
					self.reset();
				}
			}else{
			}

			self.finger = false;
		},
		movePos: function(){ //移动
			var self = this;

			// -------------
			if(self.height<0){
				// self.height = - self.height;
				// if(self.distY > 0){
					self.moveY = Math.round(self.distY/self.buff);
				// }else if(self.distY < -self.height){
				// 	self.moveY = -self.height+Math.round((self.distY+self.height)/5);
				// }else{
				// 	self.moveY = 0;
				// }
			}else{
				if(self.gs_distY<=0){
					if(self.distY > 0){
						self.moveY = Math.round(self.distY/self.buff);
					}else if(self.distY < -self.height){
						self.moveY = -self.height+Math.round((self.distY+self.height)/self.buff);
					}else{
						self.moveY = self.distY;
					}
				}else{
					test({
						a: self.distY + "  " + self.gs_distY
					});
					if(self.distY>0 && self.distY<=self.gs_distY){
						self.moveY = self.distY;
					}else if(self.distY > self.gs_distY){
						self.moveY = Math.round((self.distY-self.gs_distY)/self.buff)+self.gs_distY;
					}else if(self.distY < -self.gs_distY){
						self.moveY = -self.gs_distY+Math.round((self.distY+self.gs_distY)/self.buff);
					}else{
						self.moveY = self.distY;
					}
				}
			}


			self.element.style.webkitTransform = getTranslate(self.moveX, self.moveY);
			self.refresh(self.moveX, self.moveY, "0s", "ease");
		},
		refresh: function(x, y, timer, type){
			var self = this;
			console.log(3);
		    //self.element.style.webkitTransition = "-webkit-transform 0.4s ease-in-out";
			self.element.style.webkitTransitionProperty = "-webkit-transform";
		    self.element.style.webkitTransitionDuration = timer;
			self.element.style.webkitTransitionTimingFunction = type;
			// self.element.style.webkitTransitionTimingFunction = "ease-in-out";
		    // self.element.addEventListener("webkitTransitionEnd", function(event){
		    // 	self.element.style.webkitTransition = "none";
		    // }, false );
		    self.element.style.webkitTransform = getTranslate(x, y);
		},
		reset: function(){
			var self = this;

			var hideTime = ".4s";
			// -------------
			if(self.height<0){
				// self.height = - self.height;
				// if( self.distY>0 ){
					self.newY = 0;
					self.refresh(self.newX, self.newY, hideTime, "ease-in-out");
				// }else if( self.distY<0 && self.distY>=-self.height ){
				// 	self.newY = self.distY;
				// 	self.refresh(self.newX, self.distY);
				// }else if( self.distY<-self.height ){
				// 	self.newY = 0;
				// 	self.refresh(self.newX, self.newY);
				// }
			}else{
				if(self.gs_distY <=0){
					if( self.distY>0 ){
						self.newY = 0;
						self.refresh(self.newX, self.newY, hideTime, "ease-in-out");
					}else if( self.distY<0 && self.distY>=-self.height ){
						self.newY = self.distY;
						// self.refresh(self.newX, self.distY, "0s", "ease");
						self.refresh(self.newX, self.distY, hideTime, "ease-in-out");
					}else if( self.distY<-self.height ){
						self.newY = -self.height;
						self.refresh(self.newX, self.newY, hideTime, "ease-in-out");
					}
				}else{
					if( self.distY>0 && self.distY<self.gs_distY ){
						self.newY = self.distY;
						// self.refresh(self.newX, self.distY, "0s", "ease");
						self.refresh(self.newX, self.distY, hideTime, "ease-in-out");
					}else if( self.distY>=self.gs_distY ){
						self.newY = self.gs_distY;
						self.refresh(self.newX, self.newY, hideTime, "ease-in-out");
					}else if( self.distY<0 && self.distY>=-self.gs_distY ){
						self.newY = self.distY;
						// self.refresh(self.newX, self.distY, "0s", "ease");
						self.refresh(self.newX, self.distY, hideTime, "ease-in-out");
					}else if( self.distY<-self.gs_distY ){
						self.newY = -self.gs_distY;
						self.refresh(self.newX, self.newY, hideTime, "ease-in-out");
					}
				}
			}


			
		},
		eventStop: function(e){
			e.preventDefault();
		}
	};

	window.ImagesZoom = new ImagesZoom();
})(this);


function test(params){
	var li = document.querySelectorAll('.imgzoom_pack ul li');
	li[params.a].innerHTML = params.b;
}

document.addEventListener("DOMContentLoaded", function(event){
	ImagesZoom.init({
		'elem': '.list'
	});
}, false);

