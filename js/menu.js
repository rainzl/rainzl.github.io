$(function(){
	var $menu = $('#menu');
	
	//设置菜单遮罩的宽高
	setClient();
	$(window).on('resize',setClient);
	
	function setClient() {
		$H = window.innerHeight;
		$W = window.innerWidth;
		$menu.find('.mark').css({'width':$W,'height':$H});
	}
	//点击菜单按钮，显示菜单
	$menu.find('.btn').off('click').on('click.menu',function(){
		if ( !this.onOff ) {
			$menu.addClass('active');
		} else {
			var $menuList = $menu.find('.menuList'); 
			$menuList.addClass('close');
			var timer = setTimeout(function(){
				
				$menuList.removeClass('close');
				setTimeout(function(){
					$menu.removeClass('active');
				},200)
			},300)
		}
		this.onOff = !this.onOff;
	});
	
	$menu.find('.menuList').find('a').off().on('click',function(){
		$menu.find('.btn').trigger('click.menu');
	});
})
