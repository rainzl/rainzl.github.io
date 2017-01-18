window.onload = function (){
	/*index.js*/
	/*idBanner.js*/
	var aIdBanner = document.getElementById('idBanner');
	var oIdBanImg = aIdBanner.getElementsByTagName('img')[0];
	var oIdBanP = aIdBanner.getElementsByTagName('p')[0];
	var aIdBanSpan = oIdBanP.getElementsByTagName('span');
	var aRrBanImg = ['img/img/index-img1.jpg','img/img/index-img2.jpg','img/img/index-img3.jpg','img/img-1.jpg'];
	var aRrBanBgcolor = ['#060709','#e43361','#030303','#0c513f'];
	var num = 0;
	var timer = '';
	
	for ( i=0; i<aRrBanImg.length; i++ ){
		oIdBanP.innerHTML += '<span>' + '</span>';
	}
	idBan();
	//dom中鼠标滚动函数
	domScroll();
	
	
	for ( i=0; i<aRrBanImg.length; i++ ){
		aIdBanSpan[i].index = i;
		aIdBanSpan[i].onmouseover = function (){
			clearInterval(timer);
			num = this.index;
			idBan();
		}
		aIdBanSpan[i].onmouseout = function (){
			num = this.index;
			timer = setInterval ( function (){
				num ++;
				if ( num == aRrBanImg.length ){
					num = 0;
				}
				idBan();
				
			},2000 );
		}
	}
	timer = setInterval ( function (){
		num ++;
		if ( num == aRrBanImg.length ){
			num = 0;
		}
		idBan();
		
	},2000 );
	
	
	function idBan (){
		for ( i=0; i<aRrBanImg.length; i++ ){
			aIdBanSpan[i].className = ' ';
		}
		aIdBanner.style.backgroundColor = aRrBanBgcolor[num];
		oIdBanImg.src = aRrBanImg[num];
		aIdBanSpan[num].className += 'carouselActive';
	}
	
	function domScroll() {
		var idGreenDiamond = document.getElementById('idGreenDiamond');
		var idMusic = document.getElementById('idMusic');
		var idConcert = document.getElementById('idConcert');
		var idGame = document.getElementById('idGame');
		var idIdentity = document.getElementById('idIdentity');
		
		
		var wH = document.documentElement.clientHeight;
		document.addEventListener('scroll',function(ev){
			var idGreenDiamondRect = idGreenDiamond.getBoundingClientRect();
			var idMusicRect = idMusic.getBoundingClientRect();
			var idConcertRect = idConcert.getBoundingClientRect();
			var idGameRect = idGame.getBoundingClientRect();
			var idIdentityRect = idIdentity.getBoundingClientRect();

			if ( 
				(idGreenDiamondRect.top>0 && idGreenDiamondRect.top<wH)
				|| (idGreenDiamondRect.top+idGreenDiamondRect.height>0 && idGreenDiamondRect.top+idGreenDiamondRect.height<wH)
				) {
				console.log('第一屏加载');
			} else if ( 
				(idMusicRect.top>0 && idMusicRect.top<wH)
				|| (idMusicRect.top+idMusicRect.height>0 && idMusicRect.top+idMusicRect.height<wH)
				) {
				console.log('第二屏加载');
			} else if ( 
				(idConcertRect.top>0 && idConcertRect.top<wH)
				|| (idConcertRect.top+idConcertRect.height>0 && idConcertRect.top+idConcertRect.height<wH)
				) {
				console.log('第三屏加载');
			} else if ( 
				(idGameRect.top>0 && idGameRect.top<wH)
				|| (idGameRect.top+idGameRect.height>0 && idGameRect.top+idGameRect.height<wH)
				) {
				console.log('第四屏加载');
			} else if ( 
				(idIdentityRect.top>0 && idIdentityRect.top<wH)
				|| (idIdentityRect.top+idIdentityRect.height>0 && idIdentityRect.top+idIdentityRect.height<wH)
				) {
				console.log('第五屏加载');
			}
			
		})
		
		
		
	}
}
