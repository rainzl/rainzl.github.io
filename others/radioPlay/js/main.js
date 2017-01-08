(function(w){
	
	var header = document.getElementById('header');
	var W = document.documentElement.clientWidth,
		H = document.documentElement.clientHeight;
	
	
	setHead(header)
	function setHead(obj) {
		
		var h1 = obj.getElementsByTagName('h1')[0];
		var search = obj.getElementsByTagName('form')[0];
		var searchSpan = search.getElementsByTagName('span')[0];
		var searchIput = search.getElementsByTagName('input')[0];
		var searchClose = search.getElementsByTagName('em')[0];
		var helpBtn = obj.getElementsByClassName('helpBtn')[0];
		
		var switchPage = document.getElementById('switchPage');
		if (switchPage) { 
			var prev = switchPage.getElementsByClassName('prev')[0];
			var next = switchPage.getElementsByClassName('next')[0];
		}
		var ohelp = document.getElementById('help');
		
		searchClose.onmouseover = helpBtn.onmouseover = searchSpan.onmouseover = function () {
			var obj  = this.children[0];
			shake(obj,'left',2,30);
		}
		searchClose.onmouseout = helpBtn.onmouseout = searchSpan.onmouseout = function () {
			var obj  = this.children[0];
			clearInterval(obj.shake2);
			mTween(obj,{'left':0},100,'linear');
		}
		helpBtn.onclick = function () {
			showHelp(ohelp);
		}
		searchSpan.onclick = function () {
			this.onmouseout();
			search.classList.add('sActive');
			setTimeout(function(){
				searchClose.style.opacity = 1;
			},400);
		}
		searchClose.onclick = function () {
			searchClose.style.opacity = 0;
			setTimeout(function(){
				search.classList.remove('sActive');
			},200);
		}
		if (switchPage) { 
			prev.onmouseover = function () {
				var obj  = this.children[0];
				shake(obj,'top',2,30);
				obj.style.background = 'url(img/iconPrev2.png) no-repeat center center #292a2a';
				obj.style.backgroundSize = '60% 60%';
				this.style.backgroundColor = '#292a2a';
			}
			next.onmouseover = function () {
				var obj  = this.children[0];
				shake(obj,'top',2,30);
				obj.style.background = 'url(img/iconNext2.png) no-repeat center center #292a2a';
				obj.style.backgroundSize = '60% 60%';
				this.style.backgroundColor = '#292a2a';
			}
			prev.onmouseout = next.onmouseout = function () {
				var obj  = this.children[0];
				clearInterval(obj.shake2);
				mTween(obj,{'top':0},100,'linear');
				obj.removeAttribute('style');
				this.style.cssText = '';
			}
		}
		
	}
	function showHelp(obj) {
		var close = obj.getElementsByClassName('helpClose')[0];
		obj.style.display = 'block';
		obj.style.backgroundColor = 'rgba(0,0,0,0.9)';
		obj.style.zIndex = 20;
		close.onmouseover = function () {
			this.classList.add('closeHover');
			var obj = this.children[0];
			shake(obj,'left',2,30);
		}
		close.onmouseout = function () {
			this.classList.remove('closeHover');
			var obj = this.children[0];
			clearInterval(obj.shake2);
			mTween(obj,{'left':0},100,'linear');
		}
		obj.onclick = function () {
			this.style.cssText = '';
		}
	}
	function shake(obj,attr,num,time) {
		var arr = [];
		for ( var i=0; i<2; i++ ) {
			for ( var j=0; j<num; j++ ) {
				
				if(i==0) {
					arr.push(j-num);
				} else {
					arr.push(j+1);
				}
			}
		}
		var attr2 = attr.substr(0,1).toUpperCase()+attr.substr(1);
		var numTemp = 0;
		var n = 1;
		obj.shake2 = setInterval(function (){
			numTemp = numTemp + n;
			if ( numTemp >= arr.length || numTemp <= 0 ) {
				n = -n;
			} 
			obj.style[attr] = arr[numTemp] + 'px';
		},time);
		obj.style[attr] = 0;
	}
	/*function shake(obj,attr,num) {
		var arr = [];
		for ( var i=0; i<2; i++ ) {
			for ( var j=0; j<num*2; j++ ) {
				i==0?arr.push(j/2): arr.push(j/2-num);
			}
		}
		var attr2 = attr.substr(0,1).toUpperCase()+attr.substr(1);
		var numTemp = 0;
		var n = 1;
		
		obj.shake2 = setInterval(function (){
			numTemp = numTemp + n;
			if ( numTemp >= arr.length || numTemp <= 0 ) {
				n = -n;
			} 
			obj.style[attr] = obj['offset'+attr2] + arr[numTemp] + 'px';
		},30);
	}*/
})(window)
