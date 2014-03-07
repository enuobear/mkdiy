define([
	'jquery',
	'backbone'	
], function($, Backbone){
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
	return setMarquee;
});