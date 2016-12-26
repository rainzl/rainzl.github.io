var dataControl = {
	//获取这个id下所有的子数据
	getChildById: function (data,pid) {
		var newArr = [];
		for ( var i=0; i<data.length; i++ ) {
			if ( data[i].pid == pid ) {
				newArr.push(data[i])
			}
		}
		return newArr;
	},
	//找到当前数据的所有父级的name名字
	getParentsNames: function (data,id) {
		return data.getParent(data,id).map(function(item){
			return item.title;
		})
	},
	//获取当前id是第几级
	getLevelById: function (data,id) {
		return dataControl.getParents(data,id).length;
	},
	//这个id是否有子元素
	hasChilds: function (data,id) {
		return dataControl.getChildById(data,id).length !== 0;
	},
	//获取当前id的所有的父级
	getParents: function (data,id) {
		var arr = [];
		for (var i=0; i<data.length; i++ ) {
			if ( data[i].id == id ) {
				arr.push(data[i]);
				arr = arr.concat(dataControl.getParents(data,data[i].pid));
				break;
			}
		}
		return arr;
	},
	//查找文件名是否重名
	findPid: function (data,dataObj,fileName) {//同一个文件夹下是否有同名的文件数据
		for ( var i=0; i<data.length; i++ ) {
			if ( data[i].pid === dataObj.pid && data[i] !==dataObj) {
				if ( data[i].title === fileName && data[i].type === dataObj.type) {
					return false
				}
			}
		}
		return true;
	},
	//查找数据中，某属性相同的所有数据
	findFile: function(data,attr,val) {
		var arr = [];
		for ( var i=0; i<data.length; i++ ) {
			if ( data[i][attr] === val ) {
				arr.push(data[i]);
			}
		}
		return arr;
	},
	removeData: function (data,id) {
		for ( var i=data.length-1; i>=0; i-- ) {
			if ( data[i].id === id ) {
				data.splice(i,1);
			} else if ( data[i].pid === id ) {
				dataControl.removeData(data,data[i].id);
			}
		}
	}
	
}
