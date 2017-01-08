/*(function(){
	var hd = document.querySelectorAll(".zf_h");
	var hda = document.querySelectorAll(".shakeimage");
	var zf_btn = document.querySelector(".zf_btn")
	var l = hda[0].offsetLeft;
	var t = hda[1].offsetTop;
	var rector=3
	var stopit=0 
	var a=1
	function init(which){
		stopit=0
		shake=which
		which.style.left=l + "px";
		which.style.top= t + "px";
	}
	function stoprattle(which){
		stopit=1
		which.style.left=l + "px";
		which.style.top= t + "px";
	}
	function rattle(){
		if (stopit==1){
			return
		}
		if (a==1){
			//shake.style.top=parseInt(shake.style.top)+rector
		}
		else if (a==2){
			shake.style.left=parseInt(shake.style.left)+rector
		}
		else if (a==3){
			//shake.style.top=parseInt(shake.style.top)-rector
		}
		else{
			shake.style.left=parseInt(shake.style.left)-rector
		}
		if (a<4)
			a++
			else
			a=1
			setTimeout("rattle()",50)
	}
	for (var i = 0; i < hd.length; i++) {
		hd[i].index = i;
		hd[i].onmouseover = function(){
			init(hda[this.index]);
		//	rattle();
		}
		hd[i].onmouseout = function(){
			stoprattle(hda[this.index]);
		}
	}
})()*/
