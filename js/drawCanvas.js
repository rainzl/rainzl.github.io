(function(global,factory){
	factory(global);
})(typeof window !== "undefined" ? window : this,function(global){
	var wH = document.documentElement.clientHeight || document.body.clientHeight;
	var wW = document.documentElement.clientWidth || document.body.clientWidth;
	
	global.drawLogo = function (id,color) {
		color = color || '#1e1e1e';
		var c = document.getElementById(id);
		var W = c.offsetWidth/10,
			H = c.offsetHeight/10;
		c.width = 10*W;
		c.height = 10*H;
		var cxt = c.getContext('2d');
		
		cxt.translate(5*W,5*H);
		cxt.rotate(-Math.PI*45/180);
		
		cxt.beginPath();
		
		cxt.moveTo(-2.5*W,-3*H);
		cxt.lineTo(3*W,-3*H);
		cxt.lineTo(3*W,-2*H);
		cxt.lineTo(-1.5*W,2*H);
		cxt.lineTo(3*W,2*H);
		cxt.lineTo(3*W,3*H);
		cxt.lineTo(-3*W,3*H);
		cxt.lineTo(-3*W,2*H);
		cxt.lineTo(1.5*W,-2*H);
		cxt.lineTo(-2.5*W,-2*H);
		cxt.lineTo(-3*W,-3*H);
		
		cxt.fillStyle=color;
		cxt.lineCap = 'round';
		cxt.fill();
	}
	
	global.drawNav = function (id,de) {
		de = de || 0;
		var c = document.getElementById(id);
		
		var W = c.offsetWidth/10,
			H = c.offsetHeight/10;
		c.width = 10*W;
		c.height = 10*H;
		var cxt = c.getContext('2d');
		cxt.clearRect(0,0,10*W,10*H);
		cxt.translate(5*W,5*H);
		cxt.rotate(-Math.PI*de/180);
		cxt.save();
		cxt.beginPath();
		cxt.lineTo(-5*W,-5*H);
		cxt.lineTo(0,0);
		cxt.lineTo(5*W,-5*H);
		cxt.strokeStyle = '#000'
		cxt.lineWidth = .8;
		cxt.stroke();
		cxt.closePath();
		cxt.restore();
		
		cxt.save();
		cxt.beginPath();
		cxt.lineTo(-5*W,5*H);
		cxt.lineTo(0,0);
		cxt.lineTo(5*W,5*H);
		cxt.strokeStyle = '#000'
		cxt.lineWidth = .3;
		cxt.stroke();
		cxt.closePath();
		
		cxt.restore();
		
		
	}
	
	function DrawHat(id,yH) {
		this.c = document.getElementById(id);
		this.W = this.c.offsetWidth/10;
		this.H = this.c.offsetHeight/10;
		console.log(yH)
		yH = yH || this.H*3.3;
		this.cxt = this.c.getContext('2d');
		//this.onOff = false;
		this.settings = {
			onOff: false,
			time: 600,
			color: '#fff',
			callBack: function(){}
		}
		this.loading = [
				{
					x: -5*this.W,
					y: -5*this.H
				},
				{
					x: this.W*5,
					y: -5*this.H
				},
				{
					x: this.W*5,
					y: 5*this.H
				},
				{
					x: 0,
					y: this.H*5
				},
				{
					x: -5*this.W,
					y: 5*this.H
				}
			];
		this.loadingData = [
				{
					x: -5*this.W,
					y: -5*this.H
				},
				{
					x: this.W*5,
					y: -5*this.H
				},
				{
					x: this.W*5,
					y: 5*this.H
				},
				{
					x: 0,
					y: this.H*5
				},
				{
					x: -5*this.W,
					y: 5*this.H
				}
			];
		this.loadedData = [
				{
					x: -5*this.W+.5,
					y: -5*this.H+.5
				},
				{
					x: this.W*5+.5,
					y: -5*this.H+.5
				},
				{
					x: this.W*5+.5,
					y: -5*this.H+yH+.5
				},
				{
					x: 0+.5,
					y: this.H*5+.5
				},
				{
					x: -5*this.W+.5,
					y: -5*this.H+yH+.5
				}
			];
		this.activeData = [
				{
					x: -5*this.W,
					y: -5*this.H
				},
				{
					x: this.W*5,
					y: -5*this.H
				},
				{
					x: this.W*5,
					y: -5*this.H+yH
				},
				{
					x: 0,
					y: -5*this.H+yH
				},
				{
					x: -5*this.W,
					y: -5*this.H+yH
				}
			];
		this.c.width = 10*this.W;
			this.c.height = 10*this.H;
	}
	DrawHat.prototype = {
		init: function (status,json) {
			
			this.settings = tools.extend(this.settings,json)
			
			if ( status.last ) {
				this.zbjTween(this[status.last],this[status.now],this.settings.time,this.linear,this.settings.callBack);
			} else {
				this.draw(this[status.now]);
			}
		},
		zbjTween: function (obj,attr,times,type,callBack) {
			
			if (this.c.zbjTweenOnOff) return;
			this.c.zbjTweenOnOff = true;
			
			var _this = this;
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
					_this.draw(arr);
				} else {
					
					clearInterval(obj.timer);
					obj = attr;
					
					_this.c.zbjTweenOnOff = false;
					if (callBack && typeof callBack == 'function') {
						setTimeout(callBack,20);
					}
				}
			},20);
		},
		draw: function draw(arr){
			
			this.cxt.save();
			this.cxt.translate(5*this.W,5*this.H);
			if (this.settings.onOff) {
				this.cxt.rotate(Math.PI);
			}
			this.cxt.clearRect(-5*this.W,-5*this.H,10*this.W,10*this.H);
			this.cxt.beginPath();
			
			for ( var i=0; i<arr.length; i++ ) {
				this.cxt.lineTo(arr[i].x,arr[i].y);
			}
			
			this.cxt.fillStyle= this.settings.color;
			this.cxt.fill();
			this.cxt.closePath();
			this.cxt.restore();
		},
		linear:function (t, b, c, d){
			return c*t/d + b;
		}
	}
	global.drawHat = DrawHat;


});
