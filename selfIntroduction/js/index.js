(function(){
	var oInfo = document.getElementById('info');
	var aLis = oInfo.getElementsByTagName('li');
	var num = 0;//当前显示第几个
	var W = window.innerHeight;
	var len = aLis.length;
	
	//通过改变translateY对li的位置进行初始化
	setRem();
	
	initLis();
	
	pChange();
	
	nChange();
	
	
	
	
	//通过改变translateY对li的位置进行初始化
	function initLis() {
		for (let i=0; i<aLis.length; i++) {
			if ( i === num ) {
				move.css(aLis[i],'translateY',0);
			} else if (i>num) {
				move.css(aLis[i],'translateY',W);
			} else {
				move.css(aLis[i],'translateY',-W);
			}
		}
	}
	
	//滚轮事件，切换显示内容
	function pChange() {
		var onOff = true;
		
		wheel(document,fnWheel);
		
		function fnWheel(down) {
			if (!onOff) return;
			onOff = false;
			
			if ( down ) {
				num ++;
				num = num > aLis.length-1? aLis.length-1: num;
			} else {
				num --;
				num = num < 0? 0: num;
			}
			aLis[num].style.zIndex = 10;
			move.mTween(aLis[num],{'translateY':0},800,'easeOut',function(){
				onOff = true;
				aLis[num].style.zIndex = 0;
				initLis();
			})
		}
	}
	
	//移动端滑动屏幕，切换显示内容
	function nChange() {
		var onOff = true;
		var startY, disY, nowNum;
		slide({
			fnStart:fnStart,
			fnMove:fnMove,
			fnEnd:fnEnd
		});
		
		function fnStart(obj) {
			nowNum = num;
			startY = obj.y;
		}
		function fnMove(obj) {
			if (!onOff) return;
			if ( obj.y > 0 ) {
				if (num === 0) return;
				if ( aLis[num+1] && move.css(aLis[num+1],'translateY')<W ) {
					aLis[num+1].style.zIndex = 0;
					move.css(aLis[num+1],'translateY',W);
				}
				nowNum = num - 1;
				aLis[nowNum].style.zIndex = 10;
				move.css(aLis[nowNum],'translateY',-W+obj.y);
			} else {
				if (num === aLis.length-1) return;
				if ( aLis[num-1] && move.css(aLis[num-1],'translateY')>-W ) {
					aLis[num-1].style.zIndex = 0;
					move.css(aLis[num-1],'translateY',W)
				}
				
				nowNum = num + 1;
				aLis[nowNum].style.zIndex = 10;
				move.css(aLis[nowNum],'translateY',W+obj.y);
			}
		}
		function fnEnd(obj) {
			if (!onOff) return;
			num = nowNum;
			onOff = false;
			move.mTween(aLis[num],{'translateY':0},800,'easeOut',function(){
				onOff = true;
				aLis[num].style.zIndex = 0;
				initLis();
			})
		}
	}
	
	//给对象添加移动端滑屏事件
	function slide(json) {
		var settings = {
			obj: json.obj || document,
			fnStart:json.fnStart || function () {},
			fnMove:json.fnMove || function () {},
			fnEnd:json.fnEnd || function () {}
		}
		var startX, startY, disX, disY;
		
		settings.obj.addEventListener('touchstart',fnStart);
		settings.obj.addEventListener('touchmove',fnMove);
		settings.obj.addEventListener('touchend',fnEnd);
		
		function fnStart(ev) {
			var obj = ev.changedTouches[0];
			startX = obj.pageX;
			startY = obj.pageY;
			settings.fnStart({x:startX,y:startY});
		}
		function fnMove(ev) {
			var obj = ev.changedTouches[0];
			disX = obj.pageX - startX;
			disY = obj.pageY - startY;
			settings.fnMove({x:disX,y:disY});
		}
		function fnEnd(ev) {
			settings.fnEnd({x:disX,y:disY});
		}
	}
	
	//滚轮滚动兼容，判断滚动方向
	function wheel(obj,callBack) {
		obj.addEventListener('mousewheel',fnWheel);
		obj.addEventListener('DOMMouseScroll',fnWheel);
		
		function fnWheel(ev) {
			var down = true;
			if (ev.detail) {
				down = ev.detail>0? true: false;
			} else {
				down = ev.wheelDelta>0? false: true;
			}
			callBack(down);
		}
	}
	function setRem() {
		var html = document.documentElement;
		var r = 20; 
		html.style.fontsize = html.clientWidth/16;
		
		if (!window.orientation) {
			var aDls = oInfo.getElementsByTagName('dl');
			var aDts = oInfo.getElementsByTagName('dt');
			var aDds = oInfo.getElementsByTagName('dd');
			var oH1 = oInfo.getElementsByTagName('h1')[0];
			var oPortrait = oInfo.getElementsByClassName('portrait')[0];
			
			
			
			for ( var i=0; i<aDls.length; i++ ) {
				aDls[i].style.margin = 10/r+'rem auto';
				aDts[i].style.fontSize = 30/r+'rem';
			}
			for ( var i=0; i<aDts.length; i++ ) {
				aDts[i].style.lineHeight = 50/r+'rem';
			}
			for ( var i=0; i<aDds.length; i++ ) {
				aDds[i].style.margin = 6/r+'rem';
				aDds[i].style.padding = '0 '+10/r+'rem';
				aDds[i].style.fontSize = 16/r+'rem';
				aDds[i].style.lineHeight = 30/r+'rem';
			}
			
			oH1.style.height = 100/r+'rem';
			oH1.style.fontSize = 50/r+'rem';
			oH1.style.lineHeight = 100/r+'rem';
			oPortrait.style.marginBottom = 50/r+'rem';
			oPortrait.style.height = oPortrait.style.width = 160/r+'rem';
			oPortrait.style.padding = 3/r+'rem';
			
			
			
			var aIntDl = oInfo.getElementsByClassName('interest')[0].getElementsByTagName('dl');
			var aAddDt = oInfo.querySelectorAll('.add dt');
			var aAddDd = oInfo.querySelectorAll('.add dd');
			var aDesDt = oInfo.querySelectorAll('.describe dt');
			var aSkiDt = oInfo.querySelectorAll('.skill dt');
			for ( var i=0; i<aIntDl.length; i++ ) {
				aIntDl[i].style.margin = 50/r+'rem auto';
			}
			for ( var i=0;i<aIntDl.length; i++ ) {
				aIntDl[i].style.margin = 50/r+'rem auto';
			}
			for ( var i=0; i<aAddDt.length; i++ ) {
				aAddDt[i].style.fontSize = 36/r+'rem';
			}
			for ( var i=0; i<aAddDd.length; i++ ) {
				aAddDd[i].style.fontSize = 26/r+'rem';
			}
			for ( var i=0; i<aDesDt.length; i++ ) {
				aDesDt[i].style.marginBottom = 50/r+'rem';
			}
			for ( var i=0; i<aSkiDt.length; i++ ) {
				aSkiDt[i].style.marginBottom = 50/r+'rem';
			}
		}
	}
})()
