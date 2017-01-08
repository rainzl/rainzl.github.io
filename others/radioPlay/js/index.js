(function(w){


	//生成列表的样式
	var head = document.getElementById('header');
	var zbjList = document.getElementById('zbjListC');
	var canvas = zbjList.getElementsByTagName('canvas')[0];
	var zbjListA = zbjList.getElementsByClassName('zbjlistA')[0];
	var zbjCxt = canvas.getContext('2d');
	var switchPage = document.getElementById('switchPage');
	var imgWrap= document.getElementById('imgWrap');
	var W = document.documentElement.clientWidth,
		H = document.documentElement.clientHeight;
	// var search = 1;
	var searchN = window.location.search.split('=')[1] || 1;
	var zbjArrLise = getLiSty(searchN);
	var defineArr = getdefineArr(zbjArrLise);//获取小球属性
	var lengths =Math.ceil(data.length/(zbjArrLise[0].numX*zbjArrLise[0].numY));
	
	var as = zbjListA.children;
	
	
	var pics = imgWrap.getElementsByTagName('img');
	var logo = document.querySelector('.left');
	for(var i = 0;i<as.length;i++){
		as[i].style.display = 'none';

		// textMove(zbjCxt,zbjArrLise[i], i);
	}
	
	

/*----------*/

	
	window.onresize = function () {
		window.location.reload();
	}



/*----------*/
	getAll();
	
	//操作小球
	clickBalls();

	btnClick();
	
	function clickBalls () {
	   
	    for(var i = 0;i < as.length;i++){
	    	as[i].index = i;
	    	as[i].addEventListener('click',fnClick);
	    	as[i].addEventListener('mouseenter',fnOver);
	    	as[i].addEventListener('mouseleave',fnOut);
	    }
	    
	    logo.onclick = function(){
	    	window.location.href = 'loading/loading.html';
	    }

	   
		
		function fnClick(){
			for(var i = 0;i < as.length;i++){
				clearInterval(zbjArrLise[i].timer);
			}
			this.setAttribute('isClick', true);
			var _this = this;
			wss_canvas(zbjCxt,zbjArrLise,defineArr,this.index,function(){
				setTimeout(function(){
					window.location.href = 'play/player.html?#'+_this.index;
				}, 500);
			});
		}
		
		function fnOver () {
			if(isgo()){
				clearInterval(zbjArrLise[this.index].timer);
				onlyRing(zbjArrLise[this.index],zbjCxt,zbjArrLise[this.index].w/2 - 40,this.index)
			}
		}
		
		function fnOut () {
			if(isgo()){
				ringMoveFn(this.index);
			}
		}

		
		function isgo(){//判断是否有点击，小球是否加载完毕
			var isGo = true;
			for(var i = 0;i < as.length;i++){
				if(as[i].getAttribute('isClick')){
					isGo = false;
				}
			}
			return isGo;
		}
	}
	
	//点击按钮
	
	function btnClick(){
		var prev = switchPage.querySelector('.prev');
		var next = switchPage.querySelector('.next');
		var iText = switchPage.querySelector('.numP');
		var emText = switchPage.querySelector('em');
		emText.innerHTML = lengths;
		iText.innerHTML = searchN;
		prev.addEventListener('click',fnPrev);
		next.addEventListener('click',fnNext);
		function fnPrev(){
			prev.style.display='none';
			for(var i = 0;i < zbjArrLise.length;i++){
				clearInterval(zbjArrLise[i].timer);
			}
			for(var i = 0;i < defineArr.length;i++){
				clearInterval(defineArr[i].dragTimer);
			}
			for(var i = 0;i<as.length;i++){
				as[i].style.display = 'none';
			}
			wss_canvas(zbjCxt,zbjArrLise,defineArr,null,function(){
				zbjListA.innerHTML = '';
				imgWrap.innerHTML = '';
				searchN --;
				searchN = searchN < 1 ? lengths - 1 : searchN;
				window.location.search = `?list=${searchN}`;
			});

			
		}
		function fnNext(){
			next.style.opacity = 'none';
			for(var i = 0;i < zbjArrLise.length;i++){
				clearInterval(zbjArrLise[i].timer);
			}
			for(var i = 0;i < defineArr.length;i++){
				clearInterval(defineArr[i].dragTimer);
			}
			for(var i =0;i<as.length;i++){
				as[i].style.display = 'none';
			}
			wss_canvas(zbjCxt,zbjArrLise,defineArr,null,function(){
				zbjListA.innerHTML = '';
				searchN ++;
				searchN = searchN > lengths - 1 ? 1 : searchN;
				window.location.search = `?list=${searchN}`;
			});
			
		}
	}
	

	

	
	//////////////////////////////////////////////控制出场速度
	function getAll(){
		for(var i = 0;i < zbjArrLise.length;i++){
			(function (index) {
			    setTimeout(function(){
			    	wss_mTween(zbjArrLise[index],zbjArrLise[index].w/2 - 40,500,zbjCxt,0,index,function(){
			    		defineArr[index].isGo = true;
			    		ringMoveFn(index);
			    		as[index].style.display = 'block';
			    		textMove(zbjCxt,zbjArrLise[index], index);
			    	});
			    },80*(index+1));//控制出场速度
			})(i)
		}
	}
	
	function ringMoveFn(index){
		var num = 0;
		var speed = Math.pow(-1,Math.ceil(Math.random() * 1000));
		var max = Math.floor(Math.random()*360);
		var min = -Math.floor(Math.random()*360);
		zbjArrLise[index].timer = setInterval(function(){
			num += speed;
			if(num > max || num < min){
				speed = -speed;
			}
			drawEle(zbjArrLise[index], zbjCxt, zbjArrLise[index].w/2 - 40, num,3,true,index);
		},80);
	}
	
	///////////
	function textMove(cxt,item,index){
		var w = item.w,
			h = item.h,
			t = item.t,
			l = item.l,
			title = item.js.title,
			info = item.js.author;
		var oriX = l + w/2,
			oriY = t + h/2;
		if ( info.length >= parseInt(w/12) ) {
			info = info.substr(0,parseInt(w/12))+'...';
		}
		fnText(cxt,as[index],info,l,oriY+w/2+w*3/10,{
			fontSize: 12,
			color: '#666',
			fontWeight: 600
		})

	}
	
	function drawEle(item,cxt,val,change,width,flag,index) {
		var w = item.w,
			h = item.h,
			t = item.t,
			l = item.l,
			spaceX = item.spaceX,
			spanceY = item.spaceY,
			arrColor = item.js.arrColor,
			img = item.js.img,
			title = item.js.title,
			info = item.js.author;
		var oriX = l + w/2,
			oriY = t + h/2;
		cxt.clearRect(l,t,w,h);
		if(flag){
			drawRing(cxt,oriX,oriY,w/2*0.8,arrColor,change,width);
		}
		drawImg(cxt,oriX,oriY,val,index)
		drawTitle(cxt,l,oriY+w/2+w/12,w,title);
		
	}


	function onlyRing(item,cxt,val,index){
		drawEle1(item,cxt,val,index);
		function drawEle1(item,cxt,val,index) {
			var w = item.w,
				h = item.h,
				t = item.t,
				l = item.l,
				spaceX = item.spaceX,
				spanceY = item.spaceY,
				arrColor = item.js.arrColor,
				img = item.js.img,
				title = item.js.title,
				info = item.js.author;
			var oriX = l + w/2,
				oriY = t + h/2;
			cxt.clearRect(l,t,w,h);
			drawRing1(cxt,oriX,oriY,w/2 - 10);
			drawImg(cxt,oriX,oriY,val,index)
			drawTitle(cxt,l,oriY+w/2+w/12,w,title);
			
		}

		function drawRing1(cxt,x,y,r) {
			cxt.save();
			cxt.beginPath();
			cxt.strokeStyle = '#eee';
			cxt.lineWidth = 6;
			cxt.arc(x,y,r,0,2*Math.PI);
			cxt.stroke();
			cxt.closePath();
			cxt.restore();
		}
	}



	function drawRing(cxt,x,y,r,arrColor,change,width) {
		cxt.save();
		for ( var i=0; i<arrColor.length; i++ ) {
			var sortNum = Math.floor(Math.random()*0.5+1.5);
			var rad = sortNum*Math.PI/arrColor.length;
			cxt.beginPath();
			cxt.strokeStyle = arrColor[i];
			cxt.lineWidth = width;
			var deg = change/Math.PI;
			cxt.arc(x,y,r,i*rad+deg,(i+1)*rad+deg);
			cxt.stroke();
			cxt.closePath();
		}
		cxt.restore();
	}
	
	function drawImg(cxt,x,y,r,i) {
		cxt.save();
		cxt.beginPath();
		cxt.drawImage(pics[i], x-r, y-r,2*r,2*r);
		cxt.closePath();
		cxt.restore();
		pics[i].src = pics[i].getAttribute('src');

	}
	
	function drawTitle(cxt,x,y,w,title) {
		cxt.save();
		cxt.beginPath();
		cxt.font = '12px Arial';
		cxt.textBaseline = 'middle';
		cxt.fillText(title,x,y);
		cxt.stroke();
		cxt.restore();
	}
	///*需要做文字动画的函数*/
	function drawInfo(cxt,x,y,w,info) {
		cxt.save();
		cxt.beginPath();
		cxt.font = '14px Terminal';
		cxt.textBaseline = 'middle';
		if ( info.length >= parseInt(w/8) ) {
			info = info.substr(0,parseInt(w/8)) + '...';
		}
		cxt.fillText(info,x,y);
		cxt.stroke();
		cxt.restore();
		
	}
	
	function getLiSty(search) {
		var aAs = zbjListA.children;
		var arr = [];
		var w = aAs[0].offsetWidth;
		var spaceX = 5;
		var spaceY; //垂直方向两个元素之间的间隔
		if ( w == 184 ) {
			spaceY = 80;
		} else if ( w == 162 )  {
			spaceY = 90;
		} else if ( w == 162 ) {
			spaceY = 100;
		} else if ( w == 142 ) {
			spaceY = 110;
		} else {
			spaceY = 120;
		}
		
		var AsW = zbjListA.clientWidth;//列表的宽度
		
		var numX = Math.floor(AsW/(w+spaceX));//横向可以加载几个元素
		var numY = Math.floor((H-head.offsetHeight)/(w+spaceY));//纵向可以加载几个元素
		spaceX = (AsW-numX*w)/(numX-1);//水平方向两个元素之间的间隔

		/////////////
		zbjCxt.canvas.width = zbjListA.clientWidth;
		zbjCxt.canvas.height = numY*(w+spaceY);
		
		canvas.style.top = (H-head.offsetHeight-zbjCxt.canvas.height)/2 + 'px';
		canvas.style.left = canvas.offsetLeft + 'px';
		canvas.style.position = 'absolute';


		zbjListA.innerHTML = '';
		for ( var i=(searchN-1)*numX*numY; i<searchN*numX*numY; i++ ) {
			if(i >= data.length -1){
				return;
			}
			var a = document.createElement('a');
			var imgs = new Image();
			l = (i%numX)*(w + spaceX);
			t = Math.floor((i%(numX*numY))/numX)*(w + spaceY);

			a.href = 'javascript:;';	/*跳转页面的hash值*/
			a.style.left = l + 'px';
			a.style.top = t + 'px';
			imgs.src=data[i].smallImg;
			var js = {
				'img':data[i].smallImg,
				'arrColor':data[i].color,
				'title':data[i].name,
				'author':data[i].info.author
			};
			arr.push({'w':w,'h':w,'t':t,'l':l,'spaceX':spaceX,'spaceY':spaceY,'js':js,'numX':numX,'numY':numY});
			zbjListA.appendChild(a);
			imgWrap.appendChild(imgs);
		}
		return arr;
	}
	
	
	function backOut(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}
	function wss_mTween(el,target,time,cxt,width,index,callBack) {
		var t = 0;
		var b = 10; 
		var c = target - 10; 
		var d = time/20; 
		clearInterval(el.timer);
		el.timer = setInterval(function(){
			t++;
			if(t > d) { 
				drawEle(el,cxt,target,0,width,false,index);
				clearInterval(el.timer); 
				callBack();
			} else {
				var val = backOut(t,b,c,d);
				drawEle(el,cxt,val,0,width,false,index);
			}
		},20);
	}
	
	
	
	
	function getdefineArr(obj){
		
		var R = obj[0].w/2 - 40;
		var rows = obj[0].numY,cells = obj[0].numX;
		var img = obj[0].js.img;
		var defineArr = [];
		defineArr.length = 0;
		defineAttr(rows,cells);
		function defineAttr(rows,cells){
			var n=0;
			for(var i = 0; i < rows ; i++ ){
				for(var j = 0;j< cells ;j++){
					var ball = {
						x: obj[n].l+obj[n].w/2,
						y: obj[n].t+obj[n].h/2,
						vx:0,
						vy:20,
						g:2,
						round:R,
						onoff:true,
						isGo:false,
						r:parseInt(Math.random()*10 + 20),
						time:parseInt(Math.random()*100 + 200)
						
					}
					if(i>0){
						ball.vy =0;
						ball.g = 0;
					}
					n++;
					defineArr.push(ball);
				}
			}
		}
		return defineArr;
	}
	
	
	
	
	function wss_canvas(cxt,obj,defineArr,Aindex,callBack){
		if(typeof Aindex == 'number'){
			Aindex = Aindex;
		}else{
			Aindex = null;
		}
		var R = obj[0].w/2* 0.6;
		var rows = obj[0].numY,cells = obj[0].numX;
		var img = obj[0].js.img;
		//小球运动
		
		roundMAll ();
		function roundMAll () { 
			for(var i = 0;i<cells;i++){
				(function(index){
					setTimeout(function(){
						clearInterval(defineArr[index].dragTimer);
						defineArr[index].dragTimer = setInterval(function(){
			 				cxt.clearRect(0, 0, cxt.canvas.width, cxt.canvas.height);
				 			drawMove(cxt,img);
			 				roundMove(index);
			 				if(rows == 1){
			 					if(index != Aindex && defineArr[index].y - 2*R > zbjCxt.canvas.height){
			 						clearInterval(defineArr[index].dragTimer);
				 					callBack&&callBack();
			 					}
			 				}else{
			 					if(index == Aindex && defineArr[index + cells].y - 2*R > zbjCxt.canvas.height){
				 					clearInterval(defineArr[index].dragTimer);
				 					callBack&&callBack();
				 				}else if((index + cells) == Aindex && defineArr[index].y - 2*R > zbjCxt.canvas.height){
				 					clearInterval(defineArr[index].dragTimer);
				 					callBack&&callBack();
				 				}else if(defineArr[index + cells].y - 2*R > zbjCxt.canvas.height && defineArr[index].y - 2*R > zbjCxt.canvas.height){
				 					
				 					clearInterval(defineArr[index].dragTimer);
				 					callBack&&callBack();
				 				}
			 				}
				 		},30);
					},defineArr[index].time);
				})(i)
			}
			
		}
		
		
		function roundMove (i) {
			//判断是否被点击
			
			if(i == Aindex ){
				defineArr[i].y = defineArr[i].y;
				if(defineArr[i+cells]){
					defineArr[i+cells].y += defineArr[i+cells].vy;
					defineArr[i+cells].vy += defineArr[i+cells].g;
					defineArr[i+cells].g = 4;
				}
			}else{
				defineArr[i].y += defineArr[i].vy;
				defineArr[i].vy += defineArr[i].g;
				defineArr[i].x += defineArr[i].vx;
				
				if(defineArr[i+cells]){
					defineArr[i+cells].y += defineArr[i+cells].vy;
					defineArr[i+cells].vy += defineArr[i+cells].g;
					defineArr[i+cells].x += defineArr[i+cells].vx;
				}
				

				if(defineArr[i+cells] && (defineArr[i].y + R) >= (defineArr[i+cells].y - R) && defineArr[i].onoff){
					if(Aindex - cells == i){
						defineArr[i].vx  = Math.pow(-1,Math.ceil(Math.random() * 1000)) * 6;
						defineArr[i+cells].vy = 0;
						defineArr[i].vy = -defineArr[i].vy*0.4;
						defineArr[i].y += defineArr[i].vy;
						defineArr[i+cells].vx = 0;
						defineArr[i].onoff = false;
					}else{
						defineArr[i].vx  = Math.pow(-1,Math.ceil(Math.random() * 1000)) * 2;
						defineArr[i+cells].vy = defineArr[i].vy*1.2;
						defineArr[i].vy = -defineArr[i].vy*0.1;
						defineArr[i].y += defineArr[i].vy;
						defineArr[i+cells].vx = -defineArr[i].vx*1.8;
					}
					
				}
			}

		}
		function drawMove(cxt,img) {//绘制运动后的小球
			
		    for(var i = 0;i<defineArr.length;i++){
		    	if(i == Aindex){
		    		defineArr[i].round -= 2;
		    		defineArr[i].round = Math.max(0,defineArr[i].round);
		    	}
		   		drawImg(cxt,defineArr[i].x,defineArr[i].y,defineArr[i].round,i);
		    
		    }
		}
	}
	
})(window)
