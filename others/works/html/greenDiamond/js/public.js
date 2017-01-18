(function(){
	
	fnTopBottm();
	
	//到页面顶部和底部的按钮
	function fnTopBottm() {
		var oFixed = document.getElementById('fixed');
		var aFixedAs = oFixed.getElementsByTagName('a');//回到顶部
		
		aFixedAs[0].addEventListener('click',function(){
			var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
			var timer = setInterval(function(){
				scrollT -= 80;
				if ( scrollT <= 0 ) {
					scrollT = 0;
					clearInterval(timer);
				}
				
				window.scrollTo(0,scrollT);
			},30);
			
		});
		aFixedAs[2].addEventListener('click',function(){
			var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
			var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
			
			var timer = setInterval(function(){
				scrollT += 80;
				if ( scrollT >= scrollH ) {
					scrollT = scrollH;
					clearInterval(timer);
				}
				
				window.scrollTo(0,scrollT);
			},30);
			
		});
	}
})()
