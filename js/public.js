var publicFn = function (){
	var tools = {
		//获取旋转后元素的顶点和旋转前top的差值
		difVal: function (a) {//a是边长
			return (Math.sqrt(a*a*2)-a)/2;
		}
	}
	return tools;
}
