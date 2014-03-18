(function(window, undefined){
	var document = window.document,
		support = {
			transform3d: ("WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix())
		}; //是否支持3d
	
	var appUeMap = function(element, conf){
		return (this instanceof appUeMap)
			? this.init(element, conf)
			: new appUeMap(element, conf);
	};
	
	appUeMap.prototype = {
		init: function(element, conf){
			var self = this;
			
			self.element  = element;
			self.currentX = 0;
			self.newX     = 0;
			self.currentY = 0;
			self.newY     = 0;
			self.element  = document.getElementById(element); //获得元素
			
			//config set
			self.conf   = conf || {};
			self.remove = self.conf.remove || 0; 	//磁性滚动距离|后面没要了
			self.wrapX  = self.conf.wrapX || 0; 	//可视区域宽度
			self.wrapY  = self.conf.wrapY || 0; 	//可视区域高度
			self.mapX   = self.conf.mapX || 0; 	    //地图宽度
			self.mapY   = self.conf.mapY || 0;      //地图高度
			
			self.width  = self.mapX - self.wrapX;   //地图的宽度减去可视区域的宽度
			self.height = self.mapY - self.wrapY;   //地图的高度减去可视区域的高度
			
			//alert(self.width);
			//alert(self.height);
			
			//绑定touch事件
			self.element.addEventListener("touchstart",function(){
				self._touchstart(event);
			},false);
			self.element.addEventListener("touchmove",function(){
				self._touchmove(event);
			},false);
			self.element.addEventListener("touchend",function(){
				self._touchend(event);
			},false);
			
			return self;
		},
		_touchstart: function(event){ //touchstart
			var self = this;
			event.preventDefault();
			
			self.startPageX = getPage(event, "pageX");
			self.basePageX  = self.startPageX;
			
			self.startPageY = getPage(event, "pageY");
			self.basePageY  = self.startPageY;
			
		    document.getElementsByTagName("span")[0].getElementsByTagName("em")[0].innerHTML = self.startPageX;
		    document.getElementsByTagName("span")[4].getElementsByTagName("em")[0].innerHTML = self.startPageY;
		},
		_touchmove: function(event){ //touchmove
			var self = this,
				pageX = getPage(event, "pageX"),
				pageY = getPage(event, "pageY");
			
			event.preventDefault();
			event.stopPropagation();
			
			self.distX = (pageX - self.basePageX) + self.newX;
			self.distY = (pageY - self.basePageY) + self.newY;
			
			self.currentX = self.distX; //记录下了移动的距离
			self.currentY = self.distY;
			
	    	//if(self.distX <= 0) return;
		    //if(self.distX > 720) return;
		    
		    //self.element.innerHTML = "1";
		    document.getElementsByTagName("span")[1].getElementsByTagName("em")[0].innerHTML = self.basePageX;
		    document.getElementsByTagName("span")[2].getElementsByTagName("em")[0].innerHTML = pageX;
		    document.getElementsByTagName("span")[3].getElementsByTagName("em")[0].innerHTML = self.distX;
		    
		    document.getElementsByTagName("span")[5].getElementsByTagName("em")[0].innerHTML = self.basePageY;
		    document.getElementsByTagName("span")[6].getElementsByTagName("em")[0].innerHTML = pageY;
		    document.getElementsByTagName("span")[7].getElementsByTagName("em")[0].innerHTML = self.distY;
		    
		    
		    /*
		    if(self.distX >= self.remove) return;  //如果X移动距离大于等于设定remove距离就停止移动（往右移）
		    if(self.distX <= -(self.width+self.remove)) return; //如果X移动距离小于等于……（往左移）
		    
		    if(self.distY >= self.remove) return;
		    if(self.distY <= -(self.height+self.remove)) return;
			self.element.style.webkitTransform = getTranslate(self.distX, self.distY);
			*/
			//self.basePageX = pageX;
			
			if(self.distX > 0){
				self.moveX = Math.round(self.distX/3);
				self.movePos();
			}else if( self.distX<=0 && self.distX>=-self.width ){
				self.moveX = self.distX;
				self.movePos();
			}else if(self.distX < -self.width ){
				self.moveX = -self.width+Math.round((self.distX+self.width)/3);
				self.movePos();
			}
		},
		_touchend: function(event){ //touchend
			var self = this;
			
			//self.newX = self.currentX;
			//self.newY = self.currentY;
			
			if( self.distX>0 ){
				self.newX = 0;
				self.reset();
			}else if( self.distX<=0 && self.distX>=-self.width ){
				self.newX = self.distX;
				self.reset();
			}else if( self.distX<-self.width){
				self.newX = -self.width;
				self.reset();
			}
		},
		movePos: function(){ //移动
			var self = this;
			if(self.distY > 0){
				self.moveY = Math.round(self.distY/3);
			}else if(self.distY < -self.height){
				self.moveY = -self.height+Math.round((self.distY+self.height)/3);
			}else{
				self.moveY = self.distY;
			}
			//self.element.style.webkitTransform = getTranslate(self.moveX, self.moveY);
			self.refresh(self.moveX, self.moveY);
		},
		refresh: function(x, y){
			var self = this;
		    //self.element.style.webkitTransition = "-webkit-transform 0.4s ease-in-out";
			self.element.style.webkitTransitionProperty = "-webkit-transform";
			self.element.style.webkitTransitionTimingFunction = "cubic-bezier(0,0,0.25,1)";
		    self.element.style.webkitTransitionDuration = "350ms";
		    self.element.addEventListener("webkitTransitionEnd", function(event){
		    	self.element.style.webkitTransition = "none";
		    }, false );
		    self.element.style.webkitTransform = getTranslate(x, y);
		},
		reset: function(){
			var self = this;
			if( self.distY>0 ){
				self.newY = 0;
				self.refresh(self.newX, self.newY);
			}else if( self.distY<0 && self.distY>=-self.height ){
				self.newY = self.distY;
				self.refresh(self.newX, self.distY);
			}else if( self.distY<-self.height ){
				self.newY = -self.height;
				self.refresh(self.newX, self.newY);
			}
		},
		destroy: function() {
			var self = this;
	
			self.element.removeEventListener("touchstart", self);
			self.element.removeEventListener("touchmove", self);
			self.element.removeEventListener("touchend", self);
		}
		
	};
	
	function getTranslate(x, y) {
		return support.transform3d
			? "translate3d("+x+"px, "+y+"px, 0)"
			: "translate("+x+"px, "+y+"px)";
	}
	
	function getPage(event, page) {
		return support.touch ? event.changedTouches[0][page] : event[page];
	}
	
	window.appUeMap = appUeMap;
})(this);


appUeMap("map", {
	remove: 50,
	wrapX: 320,
	wrapY: 300,
	mapX: 720,
	mapY: 450
});
