(function(){
//---------------------------------------------------------------------------------分辨率Resolution适配
    var hash = window.location.hash.substr(1) || 1;
    var html = document.querySelector("html");
    var width = html.getBoundingClientRect().width;
    var height = html.getBoundingClientRect().height/10;
    var widthC = width / 16;
    html.style.fontSize = widthC + 'px';

 //---------------------------------------------------------------------------------

	var center = document.getElementsByTagName('section')[0];
	var hzFloat = document.querySelector('.hzFloat');
	var hzTitle = document.querySelector('.hzTitle');
	var hzChangeLeft = document.querySelector('.hzChange-left');
	var dif = hzChangeLeft.querySelector('.dif');
	var hzChangeRight = document.querySelector('.hzChange-right');
	var difR = hzChangeRight.querySelector('.difR');
	var as = center.querySelectorAll('a');
	var vidiuChange = center.querySelector('.vidiuChange');
	var vidiu = center.querySelector('.vidiu');
	var vidiuPrev = center.querySelector('.vidiuPrev');
	var vidiuNext = center.querySelector('.vidiuNext');
	var prev = center.querySelector('.prev');
	var next = center.querySelector('.next');
	var all = document.querySelector('.all');
	var timer = 0;
	var timer2 = 0;
	var timer3 = 0;
	var timer4 = 0;
	var leave = null;
	var seeW = document.documentElement.clientWidth;
	var fn  = gzyfn;
	//===============
	var ball = 120;

	var len = parseInt(seeW/ball - 1);//左右两屏幕各有多少个
		//数据生成================================================
		// window.location.hash = "10";//========================================
	var nowHash = parseInt(window.location.hash.slice(1)) || 1;
	var hashArr = [];
		createLi();
		vidiu.src=img[nowHash];
		// "../"+data[nowHash].smallImg
		vidiuPrev.src=img[nowHash];
		vidiuNext.src=img[nowHash];
		//-----------------------------------------------------------------------------------------------

		orign();


		//------------------------------------------------------------------------------------------------
		function orign(){
	      center.style.height = 7*height + "px";
		  vidiu.style.height = 7*height + "px";
		  vidiuNext.style.left = width + "px";
	      vidiuPrev.style.left = -width + "px";
	      vidiu.style.left = '1.08rem';
	      hzChangeLeft.style.top = 1*height + "px";
	      hzChangeRight.style.top = 1*height + "px";
	      hzChangeRight.style.left = width + "px";
		}
		function createLi(){
			for (var i = 0; i < len; i++) {
				var li = document.createElement('li');
				var a = document.createElement('a');
				if(nowHash-len + i < 0){
					li.style.background = "url(../"+data[nowHash-len+data.length+ i].smallImg +")";
					li.style.backgroundSize = "120px 120px";
				}else{
					li.style.background = "url(../" + data[nowHash-len+ i].smallImg + ")";//===========可以修改
					li.style.backgroundSize = "120px 120px";
				}
				a.href= "#"+ (nowHash-len + i);

				li.appendChild(a);
				hzChangeLeft.insertBefore(li,dif);
				hashArr.push(nowHash-len + i);
			}
			hashArr.push(nowHash);
			for (var i = 0; i < len; i++) {
				var li = document.createElement('li');
				var a = document.createElement('a');
				if(nowHash+i+1 > data.length){
					li.style.background = "url(../"+data[nowHash+i+1 - data.length].smallImg + ")";
					li.style.backgroundSize = "120px 120px";
				}else{
					console.log(data[nowHash+i].smallImg);
					li.style.background = "url(../"+data[nowHash+i].smallImg + ")";//===========可以修改
					li.style.backgroundSize = "120px 120px";
				}
				
				//li.innerHTML = nowHash+i+1;
				a.href="#" +(nowHash+i+1);
				li.appendChild(a);
				hzChangeRight.insertBefore(li,difR);
				hashArr.push(nowHash+i+1);
			}
		}

	var lisL = hzChangeLeft.children;
	var lisR = hzChangeRight.children;
	var vidiuPo = [];
	//console.log(lisL[1].getBoundingClientRect());
	var liW = css(lisL[1],"width")/2;
	//var liW = 65;
	//图片切换效果====================================================
	for (var i = 0; i < vidiuChange.children.length; i++) {
		vidiuPo[i] = {
			width:css(vidiuChange.children[i],'width'),
			height:css(vidiuChange.children[i],'height'),
			left:css(vidiuChange.children[i],'left'),
			opacity:css(vidiuChange.children[i],'opacity')
		};
	}
// 每个li的zindex设置及移入边框变化==================================
	for (var i = 0; i < len; i++) {
		lisL[i].style.zIndex = len - i;
		lisR[i].style.zIndex = len - i;
		lisL[i].index = i;
		lisR[i].index = i;
		lisL[i].onmouseenter = lisR[i].onmouseenter  =  function(e){
			var boWidth = 4;
			var ele = this;
			clearInterval(timer3);
			timer3 = setInterval(function(){
				boWidth = boWidth<10?++boWidth:10;
				ele.style.borderWidth = boWidth + "px";
			},20)
		};
		lisL[i].onmouseleave = lisR[i].onmouseleave =  function(e){
			this.style.borderWidth = 4 + "px";
		};
	}
// 左右两ul移入移出各自li位置变化============================
	hzChangeLeft.onmouseenter = function(){
		clearTimeout(timer);
		for (var i = 0; i < len; i++) {
			mTween(lisR[i],{left:0},200,'linear');
			mTween(as[6].parentNode,{left:150},250,'linear');
			mTween(lisL[i],{left:(i+1)*100+liW},1500-i*20,'elasticOut');
		}
		mTween(as[5].parentNode,{left:liW + 10},250,'linear');

	};
	hzChangeLeft.onmouseleave = function(){
		clearInterval(timer3);
		/*clearInterval(timer);
		timer = setTimeout(function(){
			for (var i = 0; i < len; i++) {
				mTween(lisL[i],{left:-70},200,'linear');
			}
			mTween(as[5].parentNode,{left:-50},100,'linear');
		},1000);*/

	};
	hzChangeRight.onmouseenter= function(){
		clearTimeout(timer2);
		for (var i = 0; i < len; i++) {
			mTween(lisL[i],{left:0},200,'linear');
			mTween(as[5].parentNode,{left:-50},250,'linear');
			mTween(lisR[i],{left:-(len-i)*100-liW},1500-i*20,'elasticOut');
		}
		mTween(as[6].parentNode,{left:-liW},250,'linear');
	};
	hzChangeRight.onmouseleave = function(){
		clearInterval(timer3);
		/*clearInterval(timer2);
		timer2 = setTimeout(function(){
			for (var i = 0; i < len; i++) {
				mTween(lisR[i],{left:0},200,'linear');//============================有问题
			}
			mTween(as[6].parentNode,{left:150},100,'linear');
		},1000)*/
	}
	// 中间元素显示与隐藏===============================
	center.onmouseover= function(){
		hzFloat.style.display = "block";
		mTween(hzTitle,{top:0},300,'linear');
		mTween(hzChangeRight,{left:seeW-liW},200,'linear',function(){
		});
		mTween(hzChangeLeft,{left:-liW},200,'linear');
	};
	
	center.onmouseleave = function(){
		setTimeout(none,1000);
	};
	function none(){
		/*mTween(hzTitle,{top:-140},200,'linear',function(){
			hzFloat.style.display = "none";
		})
		mTween(hzChangeLeft,{left:-2*liW},200,'linear');
		mTween(hzChangeRight,{left:seeW},200,'linear');*/
	};
	//切换=========================
	var isTab = true;
	prev.onclick = function(){
		if(!isTab){
			return;
		}
		isTab = false;
		nowHash = nowHash>0?--nowHash :data.length-1;
		window.location.hash = "#"+nowHash;

		vidiuPo.push(vidiuPo.shift());
		for (var i = 0; i < vidiuPo.length; i++) {
			mTween(vidiuChange.children[i],{
				left:vidiuPo[i].left,
				height:vidiuPo[i].height,
				width:vidiuPo[i].width,
				opacity:vidiuPo[i].opacity
			},400,'linear',function(){
				isTab = true;
			});
		}

	};
	next.onclick = function(){
		if(!isTab){
			return;
		}
		isTab = false;
		nowHash = nowHash>img.length-2?0:++nowHash;
		window.location.hash = "#"+nowHash;
		console.log(nowHash,nowHash-1,nowHash+1)
		vidiuPo.unshift(vidiuPo.pop());
		for (var i = 0; i < vidiuPo.length; i++) {
			mTween(vidiuChange.children[i],{
				left:vidiuPo[i].left,
				height:vidiuPo[i].height,
				width:vidiuPo[i].width,
				opacity:vidiuPo[i].opacity
			},400,'linear',function(){
				isTab = true;
			});
		}
	};
	window.onhashchange = addBall;
	window.onload = window.onresize = addBall;
	function addBall(){
		nowHash = parseInt(window.location.hash.slice(1) || 1);
		all.children[0].innerHTML = nowHash;
		all.children[1].innerHTML = data.length-1;
		for (var i = 0; i < len; i++) {
			if(nowHash-len+i < 0){
				lisL[i].style.background = "url(../"+data[nowHash-len + data.length + i].smallImg + ")";
				lisL[i].children[0].href= "#"+ (nowHash-len + data.length + i);
				lisL[i].style.backgroundSize = "120px 120px";
			}else{
				lisL[i].style.background = "url(../"+data[nowHash-len + i].smallImg + ")";
				lisL[i].children[0].href= "#"+ (nowHash-len + i);
				lisL[i].style.backgroundSize = "120px 120px";
			}
			mTween(lisL[i],{left:0},200,'linear');
		}
		for (var i = 0; i < len; i++) {
			if(nowHash + i+1>data.length-1){
				lisR[i].style.background = "url(../"+data[nowHash + i+1 - data.length].smallImg+ ")";
				lisR[i].children[0].href= "#"+ (nowHash + i+1- data.length);
				lisR[i].style.backgroundSize = "120px 120px";
			}else{
				lisR[i].style.background = "url(../"+data[nowHash + i+1].smallImg+ ")";//
				lisR[i].children[0].href= "#"+ (nowHash + i+1);
				lisR[i].style.backgroundSize = "120px 120px";
			}
			mTween(lisR[i],{left:0},200,'linear');
		}
		vidiu.src="../"+data[nowHash].bigImg;
		vidiuPrev.src="../"+data[nowHash].bigImg;
		vidiuNext.src="../"+data[nowHash].bigImg;
	};
	//左右晃动==========================
	function LMove(ele){
		mTween(ele,{left:6},120,'linear',function(){
			RMove(ele);
		});
	};
	function RMove(ele){
		mTween(ele,{left:-6},120,'linear',function(){
			LMove(ele);
		});
	};
	//===================================
	

	function gzysj(){
		var vd = document.getElementById('vd');
	    var controlAll = document.getElementById('control');
	    var control = document.querySelector('#control').children;
	    var skip = document.getElementById('skip');
	    var header = document.getElementById('header');
	    var skip = document.getElementById('skip');
	    var vidiuChange = document.querySelector('.vidiuChange');
	    var timer = null;
	    var isFull = true;
	}
})();
