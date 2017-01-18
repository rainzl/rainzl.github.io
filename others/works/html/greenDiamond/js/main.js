(function (){
	
	
	/*music.js*/
	
	
	var aMsBanner = document.getElementById('msBanner');
	var oMsBanImg = aMsBanner.getElementsByTagName('img')[0];
	var oMsBanP = aMsBanner.getElementsByTagName('p')[0];
	var aMsBanSpan = oMsBanP.getElementsByTagName('span');
	var aRrMBanImg = ['img/img/index-img1.jpg','img/img/index-img2.jpg','img/img/index-img3.jpg','img/img-1.jpg'];
	var msNum = 0;
	
	for ( i=0; i<aRrMBanImg.length; i++ ){
		oMsBanP.innerHTML += '<span>' + '</span>';
	}
	msBan();
	
	
	
	for ( i=0; i<aRrMBanImg.length; i++ ){
		aMsBanSpan[i].index = i;
		aMsBanSpan[i].onmouseover = function (){
			clearInterval(msBtimer);
			msNum = this.index;
			msBan();
		}
		aMsBanSpan[i].onmouseout = function (){
			msNum = this.index;
			msBtimer = setInterval ( function (){
				msNum ++;
				if ( msNum == aRrMBanImg.length ){
					msNum = 0;
				}
				msBan();
			},1000 );
		}
	}
	msBtimer = setInterval ( function (){
		msNum ++;
		if ( msNum == aRrMBanImg.length ){
			msNum = 0;
		}
		msBan();
		
	},1000 );
	
	
	function msBan (){
		for ( i=0; i<aRrMBanImg.length; i++ ){
			aMsBanSpan[i].className = '';
		}
		oMsBanImg.src = aRrMBanImg[msNum];
		aMsBanSpan[msNum].className += 'carouselActive';
	}
	
	
	
	
	/*music.js*/
	var oMsLead = document.getElementById('msLead');
	var aMsLeadDiv = oMsLead.getElementsByTagName('div')[0];
	var oMLconcert = document.getElementById('mlConcert');
	
	oMLconcert.onmouseover = function (){
		aMsLeadDiv.style.backgroundPosition = ' 0 -300px ';
	}
	oMLconcert.onmouseout = function (){
		aMsLeadDiv.style.backgroundPosition = ' 0 0 ';
	}
	
	/*music.js*/
	var oMsQualPlay = document.getElementById('msQualPlay');
	var oMsQualPlayA = oMsQualPlay.getElementsByTagName('a');
	var aMsQualPlayDiv = oMsQualPlay.getElementsByTagName('div')[0];
	var aMsQualPlayAudio = oMsQualPlay.getElementsByTagName('audio');
	var aMsQualPlayMark = aMsQualPlayDiv.getElementsByTagName('mark')[0];
	var msTimer = '';
	
	for ( var i=0, len=oMsQualPlayA.length; i<len; i++ ){
		oMsQualPlayA[i].msOnOff = true;
		oMsQualPlayA[i].index = i;
		oMsQualPlayA[i].onclick = function (){
			
			if ( this.msOnOff ){
				clearInterval(msTimer);
				for ( i=0; i<len; i++ ){
					aMsQualPlayAudio[i].pause();
					oMsQualPlayA[i].style.backgroundPosition = ' -295px 0 ';
					oMsQualPlayA[i].msOnOff = true;
				}
				aMsQualPlayMark.style.left = '1' + 'px';
				aMsQualPlayAudio[this.index].play();
				this.style.backgroundPosition = ' -305px 0 ';
				this.msOnOff = false;
				
				msTimer = setInterval(function (){
					var speed = parseInt(getStyle( aMsQualPlayMark, 'left' )) + 1;
					if ( speed > 385 ){
						speed = 385;
					}
					aMsQualPlayMark.style.left = speed + 'px';
				} , 100);
				
			} else {
				aMsQualPlayAudio[this.index].pause();
				this.style.backgroundPosition = ' -295px 0 ';
				this.msOnOff = true;
				aMsQualPlayMark.style.left = '1' + 'px';
				clearInterval(msTimer);
			}
		}
	}
	
	function getStyle( obj,attr ){ return obj.currentStyle? obj.currentStyle[attr]: getComputedStyle(obj)[attr] }
	
	
})()
