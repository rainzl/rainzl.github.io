//文字效果
(function(w){
	//var arr = ['a','d','e','f','y','r','w','t','v','o','p','＄','￡','г','％','＃'];
	


	w.fnText = function (cxt,obj,str,startX,startY,json,callBack){
		var fontSize = json.fontSize,
			fontWeight = json.fontWeight,
			color = json.color,
			backColor = json.backColor || '#fff',
			fontwidth = json.fontwidth || fontSize,
			type = json.type || 'normal',
			vertical = json.vertical || 'bottom' ;
			
		
		var x = 0,timer = 0;
		var arr = ['a','d','e','f','y','r','w','t','v','o','p','＄','￡','г','％','＃','a','d','e','f','y','r','w','t','v'];
		
		cxt.font = `${fontWeight} ${fontSize}px Arial`;
		cxt.textBaseline = vertical;
		cxt.textAlign = 'left';
		cxt.fillText(str,startX,startY);
		var textWidth = cxt.measureText(str).width+20;
		
		//生成字母
		for(var i = 0;i<Math.ceil(textWidth/fontSize); i++){
			creatText(arr[i],startX+i*fontwidth,startY,textWidth-((i-1)*fontwidth),fontSize+20,fontSize);
			creatText(arr[i+1],startX+i*fontwidth+fontwidth/2,startY,textWidth-((i-1)*fontwidth),fontSize+20,fontSize);
 		}
		
		
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			if ( type == 'normal' ) {
				if(x >= Math.floor(textWidth/fontSize)){
					x = Math.floor(textWidth/fontSize);
					clearInterval(obj.timer);
					callBack && callBack();
				}
				for ( var i=x; i<Math.ceil(textWidth/fontSize); i++ ) {
					creatText(arr[i],startX+i*fontwidth,startY,textWidth-((i-1)*fontwidth),fontSize+20,fontSize);
				}
				
				cxt.save();
				cxt.beginPath();
				cxt.font = `${fontWeight} ${fontSize}px Arial`;
		 		cxt.fillStyle = backColor;
		 		cxt.fillRect(startX+x*fontwidth, startY-(fontSize+20)/2,fontSize, fontSize+20);
		 		cxt.fillStyle = color;
		 		cxt.textBaseline = vertical;
		 		cxt.fillText(str[x], startX+x*fontwidth, startY);
				cxt.restore();
				x++;
			} else {
				if(x >= textWidth){
				 	clearInterval(obj.timer);
				 }
				cxt.save();
				cxt.font = `${fontSize}px Arial`;
		 		cxt.fillStyle = backColor;
		 		
		 		cxt.fillRect(startX, startY-(fontSize+20)/2,textWidth, fontSize+20);
		 		cxt.fillStyle = color;
		 		cxt.fontWeight = 'bold';
		 		cxt.fillText(str, startX, startY);
				cxt.restore();
		 	 
		 		for(var i = 0;i<str.length; i++){

		 			cxt.fillStyle = backColor;
		 			cxt.font = `${fontSize}px Arial`;
		 		    cxt.fillRect(x + i * fontSize, startY-(fontSize+20)/2,fontSize,fontSize+20);
		 		    fnColor();

		 			cxt.fillText(arr[i], x + i*fontSize, startY);	
		 			cxt.fillStyle = backColor;

		 			cxt.fillRect(textWidth,startY-(fontSize+10)/2,x + i*fontSize, fontSize+10);
		 		 }

		 	  x+=10;
		 	}
			
			
	 	 	arr.sort(function(){
	 			return Math.random() - 0.5;
	 		});
		},80);
		function fnColor(){
		  	var r = Math.floor(Math.random() * 255);
			var g = Math.floor(Math.random() * 255);
			var b = Math.floor(Math.random() * 255);
			colors = "rgb(" + r + "," + g + "," + b + ")";
			cxt.fillStyle = colors;
		}
		function creatText(txt,x,y,w,h,fontSize,callBack) {
			cxt.save();
			cxt.beginPath();
			cxt.fillStyle = backColor;
 			cxt.font = `${fontWeight} ${fontSize}px Arial`;
 			cxt.fillRect(x, y-(fontSize+20)/2,w,h);
 		    fnColor();
 		    cxt.textBaseline = vertical;
			cxt.fillText(txt, x, y);	
			cxt.restore();
		}
		obj.onmouseover = function(){
		
			x = 0;
			w.fnText(cxt,obj,str,startX,startY,json);
		}
			
	}		
w.setNav = function (backColor) {
	var nav = document.getElementById('nav');
	var navLi = nav.getElementsByTagName('li');
	for(var i = 0; i<navLi.length; i++){
		
		var aH = navLi[i].children[0].offsetHeight,
			aW = navLi[i].children[0].offsetWidth;
		var color = '#292a2a';
		var canvas = document.createElement('canvas');
			navLi[i].appendChild(canvas);
		var cxt = canvas.getContext('2d');
		var txt = navLi[i].children[0].innerHTML;
		canvas.width = 0;
		canvas.height = 0;
		canvas.className = 'nav';
		
		canvas.width = aW;
		canvas.height = aH;
		navLi[i].style.width = aW + 'px'; 
		navLi[i].style.height = aH + 'px';
		navLi[i].children[0].style.width = aW + 'px';
		navLi[i].children[0].style.height = aH + 'px';
		navLi[i].children[0].innerHTML = '';//清除a标签中的文字
		if ( navLi[i].className == 'active' ) {
			color = '#eeeeee';
		}
		
		fnText(cxt,navLi[i],txt,0,aH/2,{
			fontSize: 14,
			color: color,
			fontWeight: 'bold',
			backColor:backColor,
			type: 'nav',
			vertical: 'middle'
		})
	}
}


	

})(window);