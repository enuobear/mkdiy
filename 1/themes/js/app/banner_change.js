document.addEventListener("DOMContentLoaded", function(event){
	var BannerChange = function(){
		return (this instanceof BannerChange)
			? this.init()
			: new BannerChange();
	};
	BannerChange.prototype = {
		// 初始化数据,进度条动画
		init: function(){
			var self = this;

			self.$barAnimate = $(".home_banner_left li .b_mid div");
			self.$barAnimate.each(function(){
				var $width = $(this).attr("data-width");
				$(this).animate({
					width: $width
				}, 1000);
			});

			self._change();
		},

		// 数据变更
		_change: function(){
			var self = this;

		    var $bannerInput = $(".r_input"),
		        $bannerLi    = $(".home_banner_right li"),
		        $bannerText  = $(".home_banner_right .r_c span"),
		        $otherShow   = $(".home_border_988 .title_green .title_r span");

		    $bannerLi.on("click", function(){
		        $bannerLi.removeClass("current");
		        $(this).addClass("current");
		        $bannerInput.val($(this).attr("data-num"));
		        $bannerText.html($(this).attr("data-num"));
		        $otherShow.html("当前投资金额"+$(this).attr("data-num")+"元");
		    });
		    $bannerInput.on("focus", function(){
		        if($(this).val() == "0"){
		        	$(this).val("");
		        }
		    });

		    // 输入结束数据变化
		    // $bannerInput.on("change", function(){
		    // 	self._animate($(this));
		    // });

		    // 数据实时变化,可行性是多少？
		    $bannerInput.on("input propertychange", function(){
		        $bannerText.html($bannerInput.val());
		        $otherShow.html("当前投资金额"+$bannerInput.val()+"元");
		    });
		},
		_animate: function($that){
			var self = this,
				num = Math.floor(Math.random()*10);

		    var changeData = [{
			    	"percentage": ["10%","30%","10%","80%","90%"]
			    },{
			    	"percentage": ["15%","20%","90%","30%","50%"]
			    },{
			    	"percentage": ["50%","10%","40%","70%","10%"]
			    },{
			    	"percentage": ["90%","60%","20%","87%","30%"]
			    },{
			    	"percentage": ["30%","23%","50%","45%","23%"]
			    },{
			    	"percentage": ["70%","55%","95%","76%","43%"]
			    },{
			    	"percentage": ["20%","49%","22%","98%","45%"]
			    },{
			    	"percentage": ["5%","99%","36%","23%","65%"]
			    },{
			    	"percentage": ["88%","67%","70%","13%","80%"]
			    },{
			    	"percentage": ["40%","80%","60%","37%","15%"]
			    }];
			
	        self.$barAnimate.each(function(i){
	            $(this).animate({
	                width: changeData[num].percentage[i]
	            }, 1000);
	        });
		}
	};

	BannerChange = new BannerChange();
}, false);