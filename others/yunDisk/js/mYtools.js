var tools = (function(){
	var toolsObj = {
		$: function (selector,parent) {
			parent = parent? parent: document;
			if ( selector.substr(0,1) == '#'&& selector.split(' ').length == 1 ) {
				return document.getElementById(selector.substr(1));
			} else {
				var arr = Array.from(document.querySelectorAll(selector));
				return arr.length == 1? arr[0]: arr;
			}
		},
		getByClass: function (className,parent) {
			parent = parent? parent: document;
			if (parent.getElementsByClassName) {
				return parent.getElementsByClassName(className);
			} else {
				var ele = parent.getElementsByTagName('*');
				var arr = [];
				for ( var i=0; i<ele.length; i++ ) {
					if ( tools.hasClass(ele[i].className,className) ) {
						arr.push(ele[i]);
					}
				}
				return arr;
			}
		},
		addClass: function ( obj,className ){
			if ( obj.className ) {
				if ( !tools.hasClass(obj.className,className) ) {
					obj.className += ' ' +className;
				}
			} else {
				obj.className = className;
			}
		},
		rmClass: function ( obj,className ) {
			if ( obj.className ) {
				if ( tools.hasClass(obj.className,className) ) {
					var arrClass = obj.className.split(' ');
					for ( var i=0; i<arrClass.length; i++ ) {
						if ( arrClass[i] == className ) {
							arrClass.splice(i,1);
						}
					}
					obj.className = arrClass.join(' ');
				}
			}
		},
		hasClass: function (element,className) {
			var re = new RegExp('\\b'+className+'\\b','g');
			return re.test(element);
		},
		addEvent: function (obj,event,fn) {
			obj.Event = obj.Event || {};
			obj.Event[event] = obj.Event[event] || [];
			if ( tools.arrIndexOf(fn,obj.Event[event]) ) {
				obj.Event[event].push(fn);
			}
		},
		trigger: function (obj,event) {
			if ( obj.Event[event] ) {
				obj.Event[event].forEach(function(item){
					item();
				});
			}
		},
		arrIndexOf: function (id,arr) {
			var index = -1;
			arr.forEach(function(item,i){
				if ( id == item ||id == item.id ) {
					index = i;
				}
			})
			return index;
		},
		indexOfStr: function (classList,className) {
			var re = new RegExp('\\b'+className+'\\b','g')
			return re.test(classList);
		},
		removeData: function (data, index) {
			data.splice(index,1);
		},
		extend: function (obj1,obj2) {
			if ( obj2 ) {
				for ( var attr in obj2 ) {
					obj1[attr] = obj2[attr];
				}
				return obj1;
			} else {
				var newObj = obj1.push? []: {};
				for ( var attr in obj1 ) {
					if (typeof obj1[attr] === "object") {
						newObj[attr] = tools.extend(obj1[attr]);
					} else {
						newObj[attr] = obj1[attr];
					}
				}
				return newObj;
			}
		},
		findParent: function (obj,parentSelector) { //当前元素，父级元素的集合，或者父级元素
			var parent = null;
			
			for ( var i=0; i<parentSelector.length; i++ ) {
				if ( obj == parentSelector[i] ) {
					parent = obj;
				}
			}
			if ( obj.parentNode ){
				parent = parent || this.findParent(obj.parentNode,parentSelector);
			}
			return parent;
		},
		getNowTime: function (n,oDate) {
			oDate = oDate || new Date();
			var year = oDate.getFullYear(),
				month = this.toDB(oDate.getMonth()+1),
				day = this.toDB(oDate.getDate()),
				hour = this.toDB(oDate.getHours()),
				minutes = this.toDB(oDate.getMinutes()),
				seconds = this.toDB(oDate.getSeconds());
			return this.dateToString([year,month,day,hour,minutes,seconds],n);
		},
		dateToString: function (arr,n) {
			//arr: 时间数组   ; n:时间连接方式
			var s = '';
			n = n || 0;
			var aStr = ['年月日时分秒','-- ::','// ::'];
			for ( var i=0; i<arr.length; i++ ) {
				s += arr[i]+aStr[n].charAt(i);
			}
			return s;
		},
		toDB: function (num) {
			return num<10?'0'+num: ''+num;
		},
		//判断某元素上是否有某个class，有就删除，没有就添加
		addSelect: function (obj,className) {
			if ( tools.arrIndexOf( className,obj.className.split(' ')) != -1 ) {
				tools.rmClass(obj,className);
				return false;//反选
			} else {
				tools.addClass(obj,className);
				return true;//选中
			}
		},
		//查找最大的数字
		findMaxNum: function (data,s) {
			var num = -100;
			for ( var i=0; i<data.length; i++ ) {
				if ( s ) {
					num = Math.max(data[i][s],num);	
				} else {
				 	num = Math.max(data[i],num);
				}
			}
			return num;
		},
		//碰撞检测函数   参数: obj1=移动的元素   obj2=被碰撞的元素，返回值：没碰到返回true，碰到返回false；
		collision: function(obj1,obj2) {
			var obj1Rect = obj1.getBoundingClientRect();
			var obj2Rect = obj2.getBoundingClientRect();
			var	l1 = obj1Rect.left,
				t1 = obj1Rect.top,
				r1 = l1 + obj1.offsetWidth,
				b1 = t1 + obj1.offsetHeight;
			
			var l2 = obj2Rect.left,
				t2 = obj2Rect.top,
				r2 = l2 + obj2.offsetWidth,
				b2 = t2 + obj2.offsetHeight;
			if ( r1<l2 || b1 < t2 || l1 > r2 || t1 > b2 ) {
				return false;
			} else {
				return true;
			}
		},
		ajax: function (json) {
			var settings = {
				method: json.method || 'get',
				url: json.url,
				data: json.data,
				success: json.success || function () {},
				fail: json.fail || function () {},
				type: json.type || 'json'
			}
			var arrTemp = [];
			if ( window.toString.call(settings.data) === '[object Object]' ) {
				for (var s in settings.data) {
					arrTemp.push(s +'='+ settings.data[s]);
				}
				settings.data = arrTemp.join('&');
			}
			
			var xhr = new XMLHttpRequest();
			
			if (settings.method === 'get') {
				var w = settings.data? '?': ' ';
				xhr.open(settings.method,settings.url + w + settings.data);
				xhr.send();
			} else {
				xhr.open(settings.url);
				xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				xhr.send(settings.data);
			}
			xhr.onreadystatechange = function () {
				if ( xhr.readyState === 4) {
					
					if ( xhr.status >= 200 && xhr.status <= 206 ) {
						if ( settings.type === 'json' ) {
							settings.success(eval('('+xhr.responseText+')'));
						} else if ( settings.type === 'xml' ) {
							settings.success(xhr.responseXML);
						} else {
							settings.success(xhr.responseText);
						}
					} else {
						settings.fail(xhr.status);
					}
				}
			}
		}
		
	};
	return toolsObj;
})();
