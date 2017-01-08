/*json = {
		start: ,
		end: ,
		w: ,
		h: ,
		color: ,
		img: 
	}*/
function tab(canvas,json,onOff,callBack2) {
	var startX = json.startX || 0,
		startY = json.startY || 0,
		width = json.w || canvas.width,
		height = json.h || canvas.height,
		color = json.color || '#fff';
	if ( json.img ) {
		var img = json.img;
		var imgW = json.imgW;
		var imgH = json.imgH;
	} else if (json.cxt) {
		var cxt2 = json.cxt;
	}
	
	var cxt = canvas.getContext('2d');
	var cW = cxt.canvas.width,
		cH = cxt.canvas.height;
		rW = cW/2;
		rH = cH/2;
	

	//进入页面指针
	var arrData = [
		{	
			cp1x: -rW*.2,
			cp1y: -rH*.4-rH*.06,
			cp2x: -rW*.05,
			cp2y: -rH*.4-rH*.02,
			x: rW*.35,
			y: -rH*.3
		},	
		{	
			cp1x: rW*.35+rW*.05,
			cp1y: 0,
			cp2x: rW*.35+rW*.02,
			cp2y: rH*.05,
			x: rW*.25,
			y: rH*.3
		},
		{	
			cp1x: rW*.12,
			cp1y: rH*.35,
			cp2x: rW*.08,
			cp2y: rH*.35,
			x: -rW*.16,
			y: rH*.23
		},
		{	
			cp1x: -rW*.28,
			cp1y: 0,
			cp2x: -rW*.27,
			cp2y: rH*.05,
			x: -rW*.5,
			y: -rH*.4
		}	
	]
		
	var target1 = [
		{	
			cp1x: -rW*.45,
			cp1y: -rH-rH*.01,
			cp2x: rW*.34,
			cp2y: -rH-rH*.01,
			x: rW*.9,
			y: -rH*.85
		},	
		{	
			cp1x: rW*.9+rW*.1,
			cp1y: -rH*.2,
			cp2x: rW*.86+rW*.05,
			cp2y: rH*.35,
			x: rW*.79,
			y: rH*.79
		},
		{	
			cp1x: rW*.08,
			cp1y: rH*.9,
			cp2x: -rW*.26,
			cp2y: rH*.85,
			x: -rW*.72,
			y: rH*.72
		},
		{	
			cp1x: -rW*.85,
			cp1y: rH*.2,
			cp2x: -rW*.95,
			cp2y: -rH*.05,
			x: -rW,
			y: -rH*.95
		}
	]
	var target2 = [
		{	
			cp1x: rW*.06,
			cp1y: -rH-rH*.04,
			cp2x: rW*.5,
			cp2y: -rH-rH*.04,
			x: rW*.96,
			y: -rH*.96
		},	
		{	
			cp1x: rW*.8+rW*.25,
			cp1y: -rH*.05,
			cp2x: rW*.8+rW*.2,
			cp2y: rH*.15,
			x: rW*.86,
			y: rH*.86
		},
		{	
			cp1x: -rW*.08,
			cp1y: rH*1.02,
			cp2x: -rW*.3,
			cp2y: rH*1.05,
			x: -rW*.91,
			y: rH*.89
		},
		{	
			cp1x: -rW,
			cp1y: rH*.2,
			cp2x: -rW,
			cp2y: rH*.05,
			x: -rW*.85,
			y: -rH*.85
		}
	]
	var target3 = [
		{	
			cp1x: -rW*.16,
			cp1y: -rH+rH*.01,
			cp2x: rW*.16,
			cp2y: -rH+rH*.01,
			x: rW*.8,
			y: -rH*.8
		},	
		{	
			cp1x: rW,
			cp1y: -rH*.1,
			cp2x: rW,
			cp2y: rH*.6,
			x: rW*.95,
			y: rH*.88
		},
		{	
			cp1x: -rW*.08,
			cp1y: rH*1.02,
			cp2x: -rW*.3,
			cp2y: rH*1.05,
			x: -rW*.93,
			y: rH*.95
		},
		{	
			cp1x: -rW*1.05,
			cp1y: rH*0.5,
			cp2x: -rW*.9,
			cp2y: -rH*.3,
			x: -rW*.75,
			y: -rH*.75
		}
	]
	var target4 = [
		{	
			cp1x: -rW*.06,
			cp1y: -rH*1.1,
			cp2x: rW*.16,
			cp2y: -rH*1.1,
			x: rW*.99,
			y: -rH*.99
		},	
		{	
			cp1x: rW*1.2,
			cp1y: -rH*.2,
			cp2x: rW*1.3,
			cp2y: 0,
			x: rW*.93,
			y: rH*.93
		},
		{	
			cp1x: rW*.08,
			cp1y: rH*1.05,
			cp2x: -rW*.01,
			cp2y: rH*1.05,
			x: -rW*.86,
			y: rH*.86
		},
		{	
			cp1x: -rW+0.03*rW,
			cp1y: rH*0.1,
			cp2x: -rW+0.01*rW,
			cp2y: rH*.1,
			x: -rW*.96,
			y: -rH*.97
		}
	]
	var target5 = [
		{	
			cp1x: -rW*.2,
			cp1y: -rH,
			cp2x: rW*.12,
			cp2y: -rH,
			x: rW*.85,
			y: -rH*.83
		},	
		{	
			cp1x: rW*.96,
			cp1y: -rH*.2,
			cp2x: rW*.96,
			cp2y: rH*.1,
			x: rW*.83,
			y: rH*.9
		},
		{	
			cp1x: rW*.4,
			cp1y: rH*.96,
			cp2x: -rW*.01,
			cp2y: rH*1.05,
			x: -rW*.82,
			y: rH*.82
		},
		{	
			cp1x: -rW+0.1*rW,
			cp1y: rH*0.5,
			cp2x: -rW+0.01*rW,
			cp2y: rH*.1,
			x: -rW*.85,
			y: -rH*.85
		}
	]
	var target6 = [
		{	
			cp1x: -rW*.8,
			cp1y: -rH,
			cp2x: rW*.8,
			cp2y: -rH,
			x: rW*.96,
			y: -rH*.96
		},	
		{	
			cp1x: rW,
			cp1y: -rH*.8,
			cp2x: rW,
			cp2y: rH*.8,
			x: rW*.96,
			y: rH*.96
		},
		{	
			cp1x: rW*.9,
			cp1y: rH*1.02,
			cp2x: -rW*.9,
			cp2y: rH*1.02,
			x: -rW*.96,
			y: rH*.96
		},
		{	
			cp1x: -rW*1.1,
			cp1y: rH*0.2,
			cp2x: -rW*1.1,
			cp2y: -rH*0.2,
			x: -rW*.95,
			y: -rH*.95
		}
	]
	var target7 = [
		{	
			cp1x: -rW*.8,
			cp1y: -rH,
			cp2x: rW*.8,
			cp2y: -rH,
			x: rW,
			y: -rH
		},	
		{	
			cp1x: rW,
			cp1y: -rH*.8,
			cp2x: rW,
			cp2y: rH*.8,
			x: rW,
			y: rH
		},
		{	
			cp1x: rW*.9,
			cp1y: rH*1.02,
			cp2x: -rW*.9,
			cp2y: rH*1.02,
			x: -rW,
			y: rH
		},
		{	
			cp1x: -rW*1.1,
			cp1y: rH*0.2,
			cp2x: -rW*1.1,
			cp2y: -rH*0.2,
			x: -rW,
			y: -rH
		}
	]
	
		//退出页面指针
	var quitData = [
			{	
			cp1x: -rW*0.2,
			cp1y: -rH*.7,
			cp2x: rW*0.2,
			cp2y: -rH*.7,
			x: rW,
			y: -rH*.2
		},	
		{	
			cp1x: rW,
			cp1y: -rH*.7,
			cp2x: rW,
			cp2y: rH*.7,
			x: rW,
			y: rH*.2
		},
		{	
			cp1x: rW*.2,
			cp1y: rH*.7,
			cp2x: -rW*.2,
			cp2y: rH*.7,
			x: -rW,
			y: rH*.2
		},
		{	
			cp1x: -rW,
			cp1y: rH*0.7,
			cp2x: -rW,
			cp2y: -rH*0.7,
			x: -rW,
			y: -rH*.2
		}
	]
	var quitTarget = [
			{	
			cp1x: -rW*0.2,
			cp1y: -1,
			cp2x: rW*0.2,
			cp2y: 1,
			x: rW,
			y: 0
		},	
		{	
			cp1x: rW,
			cp1y: -rH*.8,
			cp2x: rW,
			cp2y: rH*.8,
			x: rW,
			y: 0
		},
		{	
			cp1x: rW*.2,
			cp1y: 1,
			cp2x: -rW*.2,
			cp2y: -1,
			x: -rW,
			y: 0
		},
		{	
			cp1x: -rW*1.1,
			cp1y: rH*0.2,
			cp2x: -rW*1.1,
			cp2y: -rH*0.2,
			x: -rW,
			y: 0
		}
	]
	
	if ( onOff == 'k' ) {
		goIn();
	} else {
		goOut();
	}
	
	//进入页面
	function goIn() {
		zbjTween(arrData,target1,260,linear,function(){
			zbjTween(target1,target3,160,linear,function(){
				zbjTween(target3,target4,160,linear,function(){
					zbjTween(target4,target5,160,linear,function(){
						zbjTween(target5,target6,300,backOut,function(){
							zbjTween(target6,target7,300,linear,callBack2);
							if (typeof callBack2 == 'function') {
								zbjTween(target6,target7,300,linear,callBack2);
							} else {
								zbjTween(target6,target7,300,linear);
							}
						})
					})
				})
			})
		});
	}
	
	//goOut(cxt);
	//退出页面
	function goOut() {
		zbjTween(target7,quitData,160,linear,function(){
			if (typeof callBack2 == 'function') {
				zbjTween(quitData,quitTarget,100,linear,callBack2);
			} else {
				zbjTween(quitData,quitTarget,100,linear);
			}
		});
	}
	
	function zbjTween(obj,attr,times,type,callBack) {
		var t = 0;//当前步数
		var b = [];//元素移动的初始位置
		var c = [];//初始位置和当前位置的差值
		var d = times/20; //元素移动的总步数
		for ( var i=0; i<attr.length; i++ ) {
			b[i] = {};
			c[i] = {};
			for ( var s in attr[i] ) {
				b[i][s] = obj[i][s];
				c[i][s] = attr[i][s] - b[i][s];
			}
		}
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			if ( t<d ) {
				t++;
				var arr = [];
				for ( var i=0; i<attr.length; i++ ) {
					arr[i] = {};
					for (var s in obj[i]) {
						var val = type(t, b[i][s], c[i][s], d);
						arr[i][s] = val;
					}
				}
				draw(arr);
			} else {
				
				clearInterval(obj.timer);
				obj = attr;
				if (callBack && typeof callBack == 'function') {
					setTimeout(callBack,20);
				}
			}
		},20);
	}
	
	//draw(target1);
	function draw(arr) {
		
		
		//cxt.clearRect(0,0,cW,cH)
		cxt.save();
		cxt.translate(cW/2,cH/2);
		
		
		if (img) {
			var img1 = new Image();
			img1.src = img;
			img1.onload = function () {
				cxt.clearRect(-rW,-rH,width,height);
				cxt.beginPath();
				
				cxt.drawImage(img1,-imgW/2,-imgH/2,imgW,imgH);
				cxt.globalCompositeOperation = 'destination-atop';
				
				cxt.moveTo(arr[arr.length-1].x,arr[arr.length-1].y);
				for ( var i in arr) {
					cxt.bezierCurveTo(arr[i].cp1x,arr[i].cp1y,arr[i].cp2x,arr[i].cp2y,arr[i].x,arr[i].y);
				}
				cxt.fillStyle = color;
				cxt.fill();
				cxt.closePath();
				cxt.restore();
			}
		} else if (cxt2){
			cxt.clearRect(-rW,-rH,width,height);
			cxt.beginPath();
			
			cxt.drawImage(cxt2,-cxt2.width/2,-cxt2.height/2,cxt2.width,cxt2.width);
			cxt.globalCompositeOperation = 'destination-atop';
			
			cxt.moveTo(arr[arr.length-1].x,arr[arr.length-1].y);
			for ( var i in arr) {
				cxt.bezierCurveTo(arr[i].cp1x,arr[i].cp1y,arr[i].cp2x,arr[i].cp2y,arr[i].x,arr[i].y);
			}
			cxt.fillStyle = color;
			cxt.fill();
			cxt.closePath();
			cxt.restore();
		} else {
			cxt.clearRect(-rW,-rH,width,height);
			cxt.beginPath();
			cxt.fillStyle = color;
			cxt.moveTo(arr[arr.length-1].x,arr[arr.length-1].y);
			for ( var i in arr) {
				cxt.bezierCurveTo(arr[i].cp1x,arr[i].cp1y,arr[i].cp2x,arr[i].cp2y,arr[i].x,arr[i].y);
			}
			cxt.fill();
			cxt.restore();
		}
		
	}
	 function bounceOut(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	}
	function backOut(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}
	function linear (t, b, c, d){
		return c*t/d + b;
	}
}