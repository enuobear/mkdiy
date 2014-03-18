// 浮动的侧边按钮
(function(){
	refix();
	window.addEventListener("resize", function(){
		refix();
	}, false);
	function refix(){
		var $width = $("body").width(),
			$fixed = $(".fixed");
		if($width<1100){
			$fixed.css("right","10px");
		}else{
			$fixed.css("right",(($width-990)/2-42-10)+"px");
		}
	}
})();

// 子菜单显示
(function(){
	var $subMenu = $(".header_logo_div li");
	$subMenu.hover(function(){
		$(this).css("position","relative");
		$(this).children(".sub_menu").css("display","block")
	},function(){
		$(this).css("position","relative");
		$(this).children(".sub_menu").css("display","none")
	});
})();