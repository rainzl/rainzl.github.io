/*本文件目前包含两个组件: 1. 轮播图组件; 2. 鼠标轮动页面组件*/

(function(){
	/*轮播图组件
		1.构造函数中传入轮播图总父级的id
		2.配置参数: 
			1) 图片数据
			2) 图片的父级元素
			3) 下标的标签名 例: i
			4) 下标的父级元素
			5) 上一张按钮元素
			6) 下一张按钮元素
			7) 回调函数，在点击图片之后执行
	 * */
	window.TabImg = function(id) {
		this.obj = document.getElementById(id);
		this.index = 0;
		this.obj.timer = this.obj.timer || null;
		this.subCode = null;
		this.width = document.documentElement.clientWidth || document.body.clientWidth;
		this.settings = {
			data: [],
			imgParObj: null,
			subTag: 'i',
			subParCode: null,
			nextBtn: null,
			prevBtn: null,
			device: false,//判断是移动端还是pc端
			callBack: function(){},
			id: id
		}
	}
	TabImg.prototype.init = function (json) {
		//if ( this.obj.prevHome !== this.obj ) {
			
			this.settings = tools.extend(this.settings,json);
			this.randerSubCode();
			this.settings.subParCode && this.fnSubCode();
			this.settings.nextBtn && this.nextPrevBtn();
			this.setTime();
			!this.settings.device && this.overOutPar();
			this.touchFn();
			this.imgs = this.obj.getElementsByTagName('img');
			
			var _this = this;
			//如果home不存在，window上的resize事件绑定
			
			window.addEventListener('resize',fnRsize);
			function fnRsize(){
				_this.width = document.documentElement.clientWidth || document.body.clientWidth;
			}
		//}
		
		//this.obj.prevHome = this.obj;
	}
	TabImg.prototype.touchFn = function () {
		var _this = this;
		this.settings.imgParObj.touchNum = {
			startX: 0,
			disX: 0,
			num: 0
		}
		
		this.settings.imgParObj.addEventListener('touchstart',function(ev){
			if (!document.getElementById(_this.settings.id)) {return}
			_this.touchStart(ev);
			_this.settings.imgParObj.touchNum.disX = 0;
		});
		this.settings.imgParObj.addEventListener('touchmove',function(ev){
			if (!document.getElementById(_this.settings.id)) {return}
			_this.touchsMove(ev);
		});
		this.settings.imgParObj.addEventListener('touchend',function(ev){
			if (!document.getElementById(_this.settings.id)) {return}
			_this.touchsEnd(ev);
		});
		
	}
	TabImg.prototype.touchStart = function (ev) {
		var touchs = ev.changedTouches[0];
		//清除move函数上的定时器
		clearInterval(this.settings.imgParObj.timer);
		//清除下一张的定时器
		clearInterval(this.obj.timer);
		this.settings.imgParObj.touchNum.startX = touchs.pageX;
	}
	TabImg.prototype.touchsMove = function(ev) {
		
		var touchs = ev.changedTouches[0];
		this.settings.imgParObj.touchNum.disX = touchs.pageX - this.settings.imgParObj.touchNum.startX;
		this.settings.imgParObj.touchNum.num = this.index;
		if (-this.width*this.settings.imgParObj.touchNum.num+this.settings.imgParObj.touchNum.disX>0) {
			this.settings.imgParObj.touchNum.num = this.settings.data.length;
		} 
		
		if (-this.width*this.settings.imgParObj.touchNum.num+this.settings.imgParObj.touchNum.disX<-this.width*(this.settings.data.length)) {
			this.settings.imgParObj.touchNum.num = 0;
		}
		move.css(this.settings.imgParObj,'translateX',-this.width*this.settings.imgParObj.touchNum.num+this.settings.imgParObj.touchNum.disX);
	}
	TabImg.prototype.touchsEnd = function () {
		
		if ( Math.abs(this.settings.imgParObj.touchNum.disX) !== 0 ) {
			if ( Math.abs(this.settings.imgParObj.touchNum.disX) >= this.width/3 ) {
				this.index = this.settings.imgParObj.touchNum.disX>0?this.settings.imgParObj.touchNum.num-1:this.settings.imgParObj.touchNum.num+1; 
			} else {
				this.index = this.settings.imgParObj.touchNum.num;
			}
			this.changeImg(200);
		}
		this.setTime()
	}
	TabImg.prototype.overOutPar = function () {
		var _this = this;
		this.obj.addEventListener('mouseenter',function(){
			
			clearInterval(_this.obj.timer);
		});
		
		this.obj.addEventListener('mouseleave',function(){
			
			_this.setTime();
		});
	}
	TabImg.prototype.setTime = function () {
		var _this = this;
		clearInterval(this.obj.timer);
		this.obj.timer = setInterval(function(){
			
			_this.nextBtn();
			
		},2600)
	}
	TabImg.prototype.fnSubCode = function () {
		var _this = this;
		for ( var i=0; i<this.subCode.length; i++ ) {
			this.subCode[i].addEventListener('click',function(){
				_this.index = this.index;
				_this.changeImg();
			});
			
		}
	}
	TabImg.prototype.nextPrevBtn = function () {
		var _this = this;
		this.settings.nextBtn.addEventListener('click',function(){
			_this.nextBtn();
		})
		this.settings.prevBtn.addEventListener('click',function(){
			_this.prevBtn();
		})
	}
	TabImg.prototype.nextBtn = function (num) {
		//如果home不存在，清除定时器
		if (!document.getElementById('idBannerImg')) {
			clearInterval(this.obj.timer);
			return;
		};
		
		this.index ++;
		
		if(this.index===this.settings.data.length+1){ 
			this.index%=this.settings.data.length;
			move.css(this.settings.imgParObj,'translateX',0);
		}
		
		this.changeImg();
	}
	TabImg.prototype.prevBtn = function (num) {
		
		this.index--;
		
		if ( this.index < 0 ) {
			this.index = this.settings.data.length-1;
			
			move.css(this.settings.imgParObj,'translateX',-this.width*this.settings.data.length);
		}
		
		this.changeImg();
		
	}
	TabImg.prototype.changeImg = function(delay) {
		
		delay = delay || 400;
		this.subCodeClear(this.index%this.settings.data.length);
		
		move.mTween(this.settings.imgParObj,{'translateX': -this.width*this.index},delay,'linear');
		
		this.settings.callBack([this.settings.imgParObj]);
	}
	TabImg.prototype.subCodeClear = function (num) {
		for ( var i=0; i<this.subCode.length; i++ ) {
			tools.rmClass(this.subCode[i],'active');
		}
		
		tools.addClass(this.subCode[num],'active');
	}
	
	TabImg.prototype.randerSubCode = function () {
		this.settings.subParCode.innerHTML = '';
		this.subCode = this.settings.subParCode.getElementsByTagName(this.settings.subTag);
		for ( var i=0; i<this.settings.data.length; i++ ) {
			var tag = document.createElement(this.settings.subTag);
			tag.index = i;
			if ( i === this.index ) {
				tag.className = 'active';
			}
			this.settings.subParCode.appendChild(tag);
		}
	}
	
	TabImg.prototype.extend = function (obj1,obj2,onOff) {
		if ( arguments.length === 1 && window.toString.call(arguments[0]) === '[object Object]' ) {
			this.extend(this.__proto__,arguments[0]);
		} else {
			obj1 = obj1 || {};
			for ( var attr in obj2 ) {
				if ( obj2.hasOwnProperty(attr) ) {
					if ( typeof obj2[attr] === 'object' && onOff ) {//真: 深度克隆
						obj1[attr] = Array.isArray(obj2[attr])? []: {};
						extend(obj1[attr],obj2[attr],onOff);
					} else {
						obj1[attr] = obj2[attr];
					}
				}
			}
			return obj1;
		}
	}
	
	/*鼠标轮动页面组件
		1. 
	 * */
	window.Scroll = function (id) {
		this.obj = document.getElementById(id);
		this.settings = {
			wheelObj: window,
			id:id
		};
	}
	Scroll.prototype = {
		constructor: Scroll,
		init: function (json) {
			if (json) this.settings = extend(this.settings,json); 
			this.scrollMouse();
			this.touchFn(this.obj);
		},
		scrollMouse: function () {
			var _this = this;
			this.wheel(function(upDown){
				var nowY = move.css(_this.obj,'translateY');
				nowY = upDown? nowY-15: nowY + 15;
				if ( -nowY>=_this.obj.scrollHeight+140-window.innerHeight ) {
					nowY = -(_this.obj.scrollHeight+140-window.innerHeight);
				} else if (nowY>=0) {
					nowY = 0;	
				}
				
				move.css(_this.obj,'translateY',nowY)
			})
		},
		wheel: function(callBack) {
			var _this = this;
			this.settings.wheelObj.addEventListener('DOMMouseScroll',fnWheel);
			this.settings.wheelObj.addEventListener('mousewheel',fnWheel);
			
			function fnWheel(ev){
				if (!document.getElementById(_this.settings.id)) return;
				var upDown;
				if ( ev.detail ) {
					/*ev.detail: 火狐版*/
					upDown = ev.detail > 0? true: false;
				} else {
					/*ev.wheelDelta: 谷歌版*/
					upDown = ev.wheelDelta<0? true: false;
				}
				/*upDown是真就是下滚，否则就是上滚*/
				callBack(upDown);
			}
		},
		touchFn: function (obj,callBack) {
			var _this = this;
			this.obj.settings = {
				disY:0,nowY:0,lastTime:0,disTime:0,lastMouse:0,disMouse:0
			}
			
			move.css(this.obj,'translateZ',.01);//作用：优化用3d
			
			//如果已经绑定过了，就不再绑定
			if ( this.obj.workprev !== this.obj) {
				obj.addEventListener('touchstart',fnStart);
				document.addEventListener('touchmove',fnMove);
				document.addEventListener('touchend',fnEnd);
			}
			
			this.obj.workprev = this.obj;
			
			function fnStart(ev) {
				if (!document.getElementById(_this.settings.id)) {return}
				_this.fnStart(ev);
				
			}
			function fnMove(ev) {
				if (!document.getElementById(_this.settings.id)) {return}
				_this.fnMove(ev);
			}
			function fnEnd(ev) {
				if (!document.getElementById(_this.settings.id)) {return}
				_this.fnEnd(ev);
			}
			
		},
		fnStart: function(ev) {
			
			var touchs = ev.changedTouches[0];
			this.obj.settings.disTime = this.obj.settings.disMouse = 0;
			this.obj.settings.disY = touchs.pageY - move.css(this.obj,'translateY');
			
		},
		fnMove: function(ev) {
			
			var touchs = ev.changedTouches[0];
			var nowTime = new Date().getTime();
			var nowMouse = touchs.pageY;
			
			if (this.obj.settings.nowY === touchs.pageY - this.obj.settings.disY) return;
			this.obj.settings.nowY = touchs.pageY - this.obj.settings.disY;
			
			if (this.obj.settings.nowY>0) {
				this.obj.settings.nowY = this.obj.settings.nowY/3;
				if ( this.obj.settings.nowY>window.innerHeight/3 ) {
				
					this.obj.settings.nowY = window.innerHeight/3;
				}
			} else if (this.obj.settings.nowY<=-(this.obj.scrollHeight+140-window.innerHeight)) {
				this.obj.settings.nowY = (this.obj.settings.nowY+(this.obj.scrollHeight+140-window.innerHeight))/3 - (this.obj.scrollHeight+140-window.innerHeight);
				if (this.obj.settings.nowY<=-(this.obj.scrollHeight+140-window.innerHeight*2/3)) {
					this.obj.settings.nowY = -(this.obj.scrollHeight+140-window.innerHeight*2/3);
				}
			}
			
			move.css(this.obj,'translateY',this.obj.settings.nowY);
			this.obj.settings.disTime = nowTime - this.obj.settings.lastTime;
			this.obj.settings.lastTime = nowTime;
			this.obj.settings.disMouse = nowMouse - this.obj.settings.lastMouse;
			this.obj.settings.lastMouse = nowMouse;
		},
		fnEnd: function(ev,settings) {
			
			if ( this.obj.settings.disMouse === 0 && this.obj.settings.disTime === 0 ) return;
			var startY = 0;
			var s = (this.obj.settings.disMouse / this.obj.settings.disTime) + '';
			
			var target = (isNaN(s) || s == 0 || s === '-Infinity' || s === 'Infinity' )? 0: parseInt(Math.abs(s*100))*(Math.abs(s*10)/(s*10));
			
			startY = this.obj.settings.nowY;
			
			this.obj.settings.nowY  = target + this.obj.settings.nowY;
			
			if ( this.obj.settings.nowY>=0 ) {
				this.obj.settings.nowY = 0;
			} else if (this.obj.settings.nowY <= -(this.obj.scrollHeight+140-window.innerHeight)) {
				this.obj.settings.nowY = -(this.obj.scrollHeight+140-window.innerHeight);
			}
			
			target = Math.round(Math.abs(startY-this.obj.settings.nowY)/10);
			
			move.mTween(this.obj,{'translateY':this.obj.settings.nowY},target*10,'easeOut');
		},
		extend: function (obj1,obj2,onOff) {
			if ( arguments.length === 1 && window.toString.call(arguments[0]) === '[object Object]' ) {
				this.extend(this.__proto__,arguments[0]);
			} else {
				obj1 = obj1 || {};
				for ( var attr in obj2 ) {
					if ( obj2.hasOwnProperty(attr) ) {
						if ( typeof obj2[attr] === 'object' && onOff ) {//真: 深度克隆
							obj1[attr] = Array.isArray(obj2[attr])? []: {};
							extend(obj1[attr],obj2[attr],onOff);
						} else {
							obj1[attr] = obj2[attr];
						}
					}
				}
				return obj1;
			}
		}
	}
	
	
	function extend(obj1,obj2,onOff) {
		obj1 = obj1 || {};
		for ( var attr in obj2 ) {
			if ( obj2.hasOwnProperty(attr) ) {
				if ( typeof obj2[attr] === 'object' && onOff ) {//真: 深度克隆
					obj1[attr] = Array.isArray(obj2[attr])? []: {};
					extend(obj1[attr],obj2[attr],onOff);
				} else {
					obj1[attr] = obj2[attr];
				}
			}
		}
		return obj1;
	}
	
	
	/*canvas鼠标事件
		1. 
	 * */
	window.ImgEvent = function(canvas,x,y) {
		/*如果x,y这个位置有颜色就返回false，没有颜色返回true*/
		var cxt = canvas.getContext('2d');
		var height = canvas.height;
		var width = canvas.width;
		var oTop = canvas.getBoundingClientRect().top;
		var oLeft = canvas.getBoundingClientRect().left;
		
		var data = cxt.getImageData(0,0,width,height).data;
		var arrOpacity = [];
		for ( var i=0; i<data.length/4; i++ ) {
			var num = i%width
			if ( i%width == 0 ) {
				arrOpacity[Math.floor(i/width)] = [];
			}
			arrOpacity[Math.floor(i/width)].push(data[i*4+3]); 
		}
		
		return arrOpacity[Math.round(y-oTop)][Math.round(x-oLeft)] === 0? true: false;
	}
	
})()
