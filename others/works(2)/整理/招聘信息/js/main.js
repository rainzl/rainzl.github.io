
var oWrap = document.getElementById('wrap');
var oNav = oWrap.getElementsByTagName('ul')[0],
	oTitle = oWrap.getElementsByClassName('title')[0],
	oImg = oTitle.getElementsByTagName('img')[0],
	oCont = oWrap.getElementsByClassName('content')[0];
var mainHtml = 'list.html';



//生成左侧导航
function creatNav(search) {
	var oldEle = null;
	aData.list.forEach(function(item){
		var li = document.createElement('li');
		var a = document.createElement('a');
		a.href = mainHtml+'?lx='+item.lx;
		a.innerHTML = item.text;
		li.appendChild(a);
		if (item.lx == search) {
			li.className = 'focus';
		}
		oNav.appendChild(li);
	});
}

//-----------生成详情页面的详情信息 //content.html主函数--------------
function creatCont(search,hash) {
	var page = aData[search],
		img = page.img,
		name = page.name,
		txt = page.text;
	var data = txt[hash];
	var arrTemp = [];
	var div = document.createElement('div');
	oImg.src = img;
	for ( var s in data ) {
		
		if ( s == 'zw' ) {
			var h2 = document.createElement('h2');
			h2.innerHTML = data[s];
			arrTemp.push(h2);
			
		} else if (s == 'jj') {
			var divC = document.createElement('div');
			divC.className = 'clear';
			arrTemp.push(divC);
		} else if ( s == 'info' ) {
			data[s].forEach(function(item){
				var dl = document.createElement('dl');
				var dt = document.createElement('dt');
				dt.innerHTML = item.t;
				dl.appendChild(dt);
				item.l.forEach(function(item){
					var dd = document.createElement('dd');
					dd.innerHTML = item;
					dl.appendChild(dd);
				});
				arrTemp.push(dl);
			});
		} else {
			var span = document.createElement('span');
			span.className = 'l';
			switch(s){
				case 'gs':
					span.innerHTML = '招聘公司: '+data[s];
					break;
				case 'xz':
					span.innerHTML = '公司性质: '+data[s];
					break;
				case 'gz':
					span.innerHTML = '职位性质: '+data[s];
					break;
				case 'dd':
					span.innerHTML = '工作地点: '+data[s];
					break;
				case 'jy':
					span.innerHTML = '工作经验: '+data[s];
					break;
				case 'xl':
					span.innerHTML = '学历要求: '+data[s];
					break;
				case 'rs':
					span.innerHTML = '招聘人数: '+data[s]+'人';
					break;
				case 'dy':
					span.innerHTML = '薪资待遇: '+data[s];
					break;
				case 'sj':
					span.innerHTML = '发布日期: '+aData.date(data[s]);
					break;
				case 'lx':
					span.innerHTML = '招聘类型: '+data[s];
					break;
			}
			div.appendChild(span);
		}
		
	}
	arrTemp.splice(1,0,div);
	
	arrTemp.forEach(function(item){
		oCont.appendChild(item);
	})
}



