(function(w){
	/*
		问题：
			每次渲染完数据，元素的事件函数就要重新添加
	*/
	
	function otherEvent(id) {
		if (typeof id == 'string') {
			this.obj = document.getElementById(id);
		} else {
			this.obj = id;
		}
	}
	otherEvent.prototype.addEvent = function (Event,fn,ele) {
		var that = this;
		
		this.obj = ele || this.obj;
		
		this.obj.addEventListener(Event,function(){
			fn(that.obj);
		});
	}
	otherEvent.prototype.over = function () {
		var that = this;
		this.obj = ele || this.obj;
		
		this.obj.addEventListener(Event,function(){
			fn(this);
		});
	}
	//页面初始化
	setBodyHei();//设置页面宽高
	
	
	
	
	//顶部头像 加鼠标移入移出
	headPic('headIn','headInfoCaption','headInShow');
	//排序按钮 加鼠标移入移出
	headPic('filesSortId','filesSortList','filesSortListShow',true);
	
	//循环  排列顺序的span列表,给span加鼠标移入移出事件
	circuleEv('filesSortId','#filesList .filesSortList span','active');
	
	
	
	//获取顶部按钮功能区节点
	var oFilesList = document.getElementById('filesList');
	
	
	//列表展示的样式，在showListStyle函数中设置
	var vlistStyle = 'list';
	//判断展示列表样式的按钮
	var oShowList = document.getElementById('showList');
	//页面渲染实例化对象
	var dataRand = new DataRander('filesHead','filesTab');
	//调用文件列表展示样式函数
	showListStyle(oShowList);
	//文件列表展示样式按钮添加点击事件
	var showList = new otherEvent('showList');
	showList.addEvent('click',showListStyle);
	
	
	
	
	
	
	
	
	//展示列表样式的函数
	function showListStyle(obj){
		var arr = obj.className.split(' ');
		if ( tools.arrIndexOf('icon-list',arr) == -1 ) {
			//列表展示
			tools.rmClass(obj,'icon-grid');
			tools.addClass(obj,'icon-list');
			//改变列表展示的样式
			vlistStyle = 'list';
			
		} else { 
			//大图展示
			tools.rmClass(obj,'icon-list');
			tools.addClass(obj,'icon-grid');
			
			//改变列表展示的样式
			vlistStyle = 'grid';
		}
		dataRand.init(data.files,2,vlistStyle);//数据、加载进入的文件列表id
		//dataRand.init(data.files,2,vlistStyle,fnfileList);//数据、加载进入的文件列表id
	}
	
	//文件夹交互操作 在渲染完数据后调用
	function fnfileList() {
		function InterChange(id,selectClass) {
			//文件列表主体的父级
			this.obj = document.getElementById(id);
			//文件列表顶部按钮列表
			this.HeadBtns = tools.getByClass('filesListHeadChangBtn',oFilesList)[0];
			this.HeadBtnLIst = tools.getByClass('filesListHeadChangChose',oFilesList)[0];
			//文件列表头部
			this.tHead = document.getElementById('tHead');
			this.checkAll = document.getElementById('checkAll');
			
			this.arr = [];//存放选中元素的id
			this.child = this.obj.children;//每个文件元素
			this.selectClass = selectClass;//选款的选择器
			
		} 
		InterChange.prototype = {
			init: function () {
				//给每个问价添加单选函数
				this.singleSelect();
				//顶部按钮列表点击方法
				this.btnListFn();
				
			},
			/*
				1. 点击文件前的选框，
					1) 选中并改变这个文件的样式
					2) 将选中的index添加入数组
					3) 顶部按钮列表改变：(选中的数量大于1时，样式不同)
					4) 头部文字改变
				
			*/
			//给每个文件添加单选函数
			singleSelect: function () {
				var _this = this;
				for ( var i=0; i<this.child.length; i++ ) {
					this.child[i].addEventListener('click',function(ev){
						var ev = ev || event;
						var className = ev.target.className;
						
						if ( tools.arrIndexOf( _this.selectClass,className.split(' ')) != -1 ) {
							var id = this.getAttribute('data-file-id');
							//选框执行的函数
							if (_this.addSelect(ev.target)) {//选中
								_this.arr.push(id);
								tools.addClass(this,'active');
							} else {//没选中
								tools.rmClass(this,'active');
								tools.removeData(_this.arr,tools.arrIndexOf(id,_this.arr));
							}
						}
						
						//根据选中个数，设置顶部按钮列表样式，和文件列表头部信息
						_this.checkNum();
						
					})
				}
			},
			//根据选中个数，设置顶部按钮列表样式，和文件列表头部信息
			checkNum: function () {
				
				if ( this.arr.length>0 ) {
					var rset = tools.getByClass('headResetName',this.HeadBtnLIst)[0];
					if ( this.arr.length>1 ) {
						tools.addClass(rset,'hoverNone');
					} else {
						//调用重命名方法
						tools.rmClass(rset,'hoverNone');
					}
					this.HeadBtns.style.display = 'none';
					this.HeadBtnLIst.style.display = 'block';
					this.checkAll.style.display = 'block';
					this.checkAll.innerHTML = '已选中'+this.arr.length+'个文件/文件夹';
				} else {
					this.HeadBtns.style.display = 'block';
					this.HeadBtnLIst.style.display = 'none';
					this.checkAll.style.display = 'none';
				}
			},
			//顶部按钮列表点击方法
			btnListFn: function () {
				var _this = this;
				oFilesList.addEventListener('click',function(ev) {
					var ev = ev || event;
					var reResetClass = /headResetName/g;//重命名class
					var reCreatFile = /filesCreate/g;//新建文件夹
					if ( reResetClass.test(ev.target.className) || reResetClass.test(ev.target.parentNode.className)) {
						if ( _this.arr.length == 1 ) {
							var domObj = _this.findFile(_this.arr[0]);//查找dom中的元素节点
							var dataObj = tools.arrIndexOf(_this.arr[0],data.files);//查找数据在data中的位置
							_this.resetName(domObj,data.files[dataObj]);//调用重命名方法
						}
						
					} else if(reCreatFile.test(ev.target.className) || reCreatFile.test(ev.target.parentNode.className)) {
						
						_this.creatFile();//调用新建文件夹方法
					}
				})
			},
			//新建文件夹方法
			creatFile: function() {
				var _this = this;
				var id = this.findMaxNum(data.files,'id');
				var pid = tools.$('#filesHead .filesListNow').getAttribute('data-file-id');
				
				//dom插入一个文件，设置文件名
				var obj = {
					id: ++id,
					pid: parseInt(pid),
					title:"新建文件夹",
					type:"file",
					fileDate: '-'
				}
				var str = dataRand.randBody(obj);
				this.obj.innerHTML = str + this.obj.innerHTML;
				this.resetName(this.child[0],obj,function(){
					data.files.push(obj);
					dataRand.init(data.files,pid,vlistStyle,fnfileList);//数据、加载进入的文件列表id
					//fnfileList();//数据、加载进入的文件列表id
				},function(){//取消新建文件夹
					_this.obj.removeChild(_this.child[0]);
				});
			},
			//文件重命名
			resetName: function (domObj,dataObj,success,fail) {//dom对象,数据对象，保存需要执行的函数，取消需要执行的函数
				var _this = this;
				var moduleName = document.getElementById('moduleFlieName');//修改文件名时的输入框
				
				var topNum = domObj.offsetTop,
					leftNum = domObj.offsetLeft;
					
				//设置输入框的样式
				moduleName.style.display = 'block';
				moduleName.style.top = topNum+37 + 'px';
				moduleName.style.left = leftNum + 'px';
				
				//添加按钮交互行为
				var oInput = moduleName.getElementsByTagName('input')[0];
				var aSpans = moduleName.getElementsByTagName('span');
				oInput.value = dataObj.title;
				oInput.select();
				//保存名称
				aSpans[0].onclick = function () {
					var newName = oInput.value
					var nowTime = tools.getNowTime(1);
					//文件修改日期
					if ( _this.findPid(data.files,dataObj,newName) ) {
						
						dataObj.title = newName;
						dataObj.fileDate = nowTime;
						
						tools.getByClass('fileTitle',domObj)[0].innerHTML = newName;
						tools.getByClass('fileChangeDate',domObj)[0].innerHTML = nowTime;
						
						
					} else {
						alert('文件夹重名了');
					}
					success && success();
					moduleName.style.display = 'none';
				}	
				//取消重命名
				aSpans[1].onclick = function () {
					fail && fail();
					moduleName.style.display = 'none';
				}
			},
			//选框执行的函数
			addSelect: function (obj) {
				if ( tools.arrIndexOf( 'filesChecked',obj.className.split(' ')) != -1 ) {
					tools.rmClass(obj,'filesChecked');
					return false;//反选
				} else {
					tools.addClass(obj,'filesChecked');
					return true;//选中
				}
			},
			allSelect: function () {
				
			},
			//查找最大的数字
			findMaxNum: function (data,s) {
				var num = -100;
				for ( var i=0; i<data.length; i++ ) {
					num = Math.max(data[i][s],num);
				}
				return num;
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
			findFile: function (id) {//根据id找dom中的文件节点
				for ( var i=0; i<this.child.length; i++ ) {
					if ( this.child[i].getAttribute('data-file-id') == id ) {
						return this.child[i];
					}
				}
			}
		}
		
		
		var fnFiles = new InterChange('filesTab','filesBtn');
		fnFiles.init();
		
	}
	//循环排列顺序的span列表加,给span加鼠标移入移出事件
	function circuleEv(id,selector,className) {
		var spans = tools.$(selector);
		if(spans.length>1) {
			for ( var i=0; i<spans.length; i++ ) {
				var otherE = new otherEvent(id);
				otherE.addEvent('mouseover',function(obj){
					tools.addClass(obj,className);
				},spans[i]);
				otherE.addEvent('mouseout',function(obj){
					tools.rmClass(obj,className);
				},spans[i]);
				otherE.addEvent('click',function(obj){
					var prev = obj.parentNode.getElementsByClassName('show')[0];
					var i = obj.getElementsByTagName('i')[0];
					tools.rmClass(prev,'show');
					tools.addClass(i,'show');
				},spans[i]);
			}
		}
	}
	//顶部头像/排序按钮   加鼠标移入移出
	function headPic(id,className,addClass,beal) {
		beal = beal || false;
		var otherE = new otherEvent(id);
		otherE.addEvent('mouseover',function(obj){
			var list = obj.getElementsByClassName(className)[0];
			clearTimeout(list.timer);
			if ( beal ) {
				obj = list;
			}
			tools.addClass(obj,addClass);
		});
		otherE.addEvent('mouseout',function(obj){
			var list = obj.getElementsByClassName(className)[0];
			list.timer = setTimeout(function(){
				if ( beal ) {
					obj = list;
				}
				tools.rmClass(obj,addClass);
			},200)
		});
	}
	//设置页面宽高
	function setBodyHei() {
		var oWrap = document.getElementById('tBody');
		var oHeader = document.getElementById('header');
		var H = document.documentElement.clientHeight || document.body.clientHeight;
		var h = H - oHeader.offsetHeight < 500? 500: H - oHeader.offsetHeight;
		oWrap.style.height = h + 'px';	
	}
})(window)
