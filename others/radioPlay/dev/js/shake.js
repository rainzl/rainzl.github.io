
/* 当css的参数个数小于3，获取;   否则 设置 */
function css(el,attr,val) {   //获取计算后的样式
	if(arguments.length < 3) {   //当css里的参数个数小于3个，获取元素
		var val  = 0;  //什么一个变量val
		if(el.currentStyle) {   
			val = el.currentStyle[attr];  //兼容IE的计算后样式
		} else {
			val = getComputedStyle(el)[attr];   //除IE的浏览器的的计算后样式
		}
		if(attr == "opacity") {  //当颜色名为opacity时，
			val*=100;  //val*100是变成整数，因为opacity的值为小数，小数在js中运算会有计算问题
		}
		return parseFloat(val);  //返回计算后的val的值，判断条件见上面if
	}
	if(attr == "opacity") {    //当样式名为opacity
		el.style.opacity = val/100;   //元素的透明度 为标准浏览器的使用
		el.style.filter = "alpha(opacity = "+val+")";  //IE中的使用
	} else {
		el.style[attr] = val + "px";  //如果样式不是opacity是，输出的样式值是多少px
	}
};


//el(元素)，attr(样式)，second(抖动次数)，callBack(回调函数，如果写，就是执行完一个动画之后，再执行一个动画的内容，  如果不写就是同时执行几个动画)
function toShake(el,attr,second,callBack){
	if(el.shake){  //如果元素在抖动，就执行return(不能继续执行)
		callBack();
	}
	var arr = [];  //声明一个空数组
	var b = css(el,attr);  //获取元素计算后的样式
	var nub = 0;  //声明一个变量为0
	for(var i = second-1; i >= 0; i--){  //执行一个for循环，0 ~ second-1
		i%2?arr.push(i):arr.push(-i);  //i%2 i = 0，2，4，...时，arr数组中传入为正数，否则为负数
	}
	el.shake = setInterval(  //间隔定时器
		function(){
			if(nub >= second){  //如果nub > 抖动次数
				clearInterval(el.shake);  //关闭定时器
				//callBack&&callBack();  //是否执行回调函数
				if(typeof callBack == 'function') {  //如果callBack的类型为函数，
					callBack();   //就执行callBack()
				}
			} else {   //nub < 抖动次数
				var val = b + arr[nub];  //声明的val值 = 计算后的样式 + attr[nub]中的每一位
				css(el,attr,val);	//设置元素计算后 的样式
				nub++;  //nub自增
			}
		},40
	);
};