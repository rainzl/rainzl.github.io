//数据渲染函数
	function DataRander(headId,id) {
		this.head = document.getElementById(headId);
		this.obj = document.getElementById(id);
		this.child = this.obj.children;
		//获取顶部按钮功能区节点
		this.oBtnsList = document.getElementById('filesList');
		//顶部按钮列表： 新建文件夹/删除/重命名
		this.HeadBtns = tools.getByClass('filesListHeadChangBtn',this.oBtnsList)[0];
		this.HeadBtnLIst = tools.getByClass('filesListHeadChangChose',this.oBtnsList)[0];
		
		this.data = null;
		this.id = -1;
		this.tags = null;
		this.arr = [];//存储选中文件的id
		this.showStyle = 'list';
		this.callback = function () {};
	}
	DataRander.prototype.init = function (data,id,showStyle,callBack) {
		this.data = data;//数据
		this.id = id;//文件的id
		this.showStyle = showStyle || this.showStyle;//控制文件列表的展示形式
		this.callback = callBack || this.callback;//需要执行的其他交互
		
		this.nav();//在点击事件完重新调用dom渲染方法
		this.body();
		
		this.headClick();
		this.frameSelect();
		this.bodyDblClick();
		this.bodyClick();
		this.btnListFn();
		this.textSearch();
		this.classSearch();
		this.callback();//执行其他交互事件
	}
	DataRander.prototype.nav = function () {
		//如果是是搜索渲染:
			// this.id不改变
			// 传数据参数
		
		var level = dataControl.getParents(this.data,this.id);
		var str = '<div class="filesListRoute left">';
		if ( level.length <= 1 ) {
			str += `<span>${level[0].title}</span>`;
		} else {
			str += this.randNav(level);
		}
		str += '</div><div class="filesListCount right"><span>已加载100个</span></div>';
		this.head.innerHTML = str;
	}
	
	DataRander.prototype.randNav = function (level) {
		var str = `<a data-file-id="${level[1].id}" class="filesListReturn" href="javascript:;">返回上一级</a>
					<i>|</i>`;
		for ( var i=level.length-1; i>=0; i-- ) {
			if ( level[i].id == this.id ) {
				str += `<span data-file-id="${level[i].id}" class="filesListNow">${level[i].title}</span>`;
			} else {
				str += `<a data-file-id="${level[i].id}" href="javascript:;">${level[i].title}</a>
					<i>></i>`;
			}
		}
		return str;
	}
	DataRander.prototype.body = function () {
		this.arr = [];
		var blankBg = tools.getByClass('blankBg')[0];
		//获取这个id下所有的子级数据，添加到页面中
		
		var arrChild = dataControl.getChildById(this.data,this.id);
		var arr = [];
		for ( var i=0; i<arrChild.length; i++ ) {
			arr.push(this.randBody(arrChild[i]));
		}
		if ( arr.length == 0 ) {
			blankBg.style.display = 'block';
		} else {
			blankBg.style.display = '';
		}
		this.obj.innerHTML = arr.join('');
		this.checkNum();
	}
	
	//展示列表样式改变时,需要改变此函数内的代码
	DataRander.prototype.randBody = function(json) {
		if ( this.showStyle === 'list' ) {
			return `
				<tr data-file-id="${json.id}">
					<td>
						<em class="filesBtn"></em>
						<i class="${json.type}Icon"></i>
						<span class="fileTitle">${json.title}</span>
						<div class="filesFns right">
							<a class="icon icon-share" href="javascript:;">分享</a>
							<a class="icon icon-download" href="javascript:;">下载</a>
							<a class="icon icon-more" href="javascript:;">更多</a>
						</div>
					</td>
					<td>
						<span>${json.size}</span>
					</td>
					<td>
						<span class="fileChangeDate">${json.fileDate}</span>
					</td>
				</tr>
				`;
		} else {
			return `
				
				`;
		}
	}
	//循环给每个文件和文件名添加点击事件
	DataRander.prototype.clickRand = function(id,tag,Event) {
		if ( id === 'filesHead' ) {
			this.tag = this.head.getElementsByTagName(tag);
		} else {
			this.tag = this.obj.getElementsByTagName(tag);
		}
		var that = this;
		for ( var i=0; i<this.tag.length; i++ ) {
			this.tag[i].addEventListener(Event,function () {
				var fileId = this.getAttribute('data-file-id');
				that.init(data.files,fileId,this.showStyle,that.callback);
			});
		}
	}
	DataRander.prototype.headClick = function() {
		var _this = this;
		this.head.addEventListener('click',function(ev){
			var ev = ev || event;
			if ( ev.target.tagName.toLowerCase() === 'a' ) {
				_this.id = parseInt(ev.target.getAttribute('data-file-id'));
				_this.nav(); //在点击事件完重新调用dom渲染方法
				_this.body();
			}
		})
	}
	DataRander.prototype.bodyDblClick = function() {
		var _this = this;
		this.obj.addEventListener('dblclick',function(ev){
			var ev = ev || event;
			var parent = tools.findParent(ev.target,_this.child); 
			if ( parent ) {
				_this.id = parent.getAttribute('data-file-id');
				
				_this.nav(); //在点击事件完重新调用dom渲染方法
				_this.body();
			}
		});
		this.obj.addEventListener('click',function(ev) {
			var ev = ev || event;
		})
	}
	//点选
	DataRander.prototype.bodyClick = function() {
		var _this = this;
		this.obj.addEventListener('click',function(ev) {
			var ev = ev || event;
			var checkedList = tools.getByClass('filesBtn',_this.obj);
			var parentCheck = tools.findParent(ev.target,checkedList); 
			
			if ( parentCheck ) {//点击的是选框
				_this.singleSelect(parentCheck);
			}
		})
	}
	//框选
	DataRander.prototype.frameSelect = function () {
		var _this = this;
		var filesBody = tools.getByClass('filesBody')[0];
		filesBody.addEventListener('mousedown',function(ev) {
			//选框
			var frameSelect = document.getElementById('frameSelect');
			var ev = ev || event;
			var startX = ev.pageX,
				startY = ev.pageY;
			document.addEventListener('mousemove',fnMove);
			document.addEventListener('mouseup',fnUp);
			function fnMove(ev){
				var ev = ev || event;
				var nowX = ev.pageX,
					nowY = ev.pageY;
				var disX = nowX - startX,
					disY = nowY - startY;
				var width = 0,
					height = 0,
					top1 = 0,
					left = 0;
				if ( Math.abs(disX)>5 && Math.abs(disY)>5 ) {
					frameSelect.style.display = 'block'
					if ( disX<0 ) {
						width = Math.abs(disX);
						left = nowX;
					} else {
						width = disX;
						left = startX;
					}
					if ( disY<0 ) {
						height = Math.abs(disY);
						top1 = nowY;
					} else {
						height = disY;
						top1 = startY;
					}
					frameSelect.style.cssText = 'width:'+width+'px;height:'+height+'px;left:'+left+'px;top:'+top1+'px;';
					//碰撞方法 : 范围,元素,碰到返回true
					for ( var i=0; i<_this.child.length; i++ ) {
						if ( tools.collision(frameSelect,_this.child[i]) ) {
							//点击的是选框
							var id = parseInt(_this.child[i].getAttribute('data-file-id'));
							if ( tools.arrIndexOf(id,_this.arr) === -1 ) {
								var checkedList = tools.getByClass('filesBtn',_this.child[i])[0];
								_this.singleSelect(checkedList);
							}
						}
					}
					
				}
			}
			function fnUp() {
				frameSelect.style.display = 'none';
				document.removeEventListener('mousemove',fnMove);
				document.removeEventListener('mouseup',fnUp);
			}
			
			ev.preventDefault();
		})
	}
	
	//文件选中方法
	DataRander.prototype.singleSelect = function (btn) {
		var className = btn.className;
		
		var fileObj = tools.findParent(btn,this.child);
		var id = parseInt(fileObj.getAttribute('data-file-id'));
		
		//选框执行的函数
		if (tools.addSelect(btn,'filesChecked')) {//选中
			this.arr.push(id);
			tools.addClass(fileObj,'active');
		} else {//没选中
			tools.rmClass(fileObj,'active');
			tools.removeData(this.arr,tools.arrIndexOf(id,this.arr));
		}
		this.checkNum();
	}
	
	DataRander.prototype.checkNum = function () {
		//多选时出现,覆盖头信息
		var checkAll = document.getElementById('checkAll');
		
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
			
			checkAll.style.display = 'block';
			checkAll.innerHTML = '已选中'+this.arr.length+'个文件/文件夹';
		} else {
			this.HeadBtns.style.display = 'block';
			this.HeadBtnLIst.style.display = 'none';
			
			checkAll.style.display = 'none';
		}
	}
	//顶部按钮列表点击方法
	DataRander.prototype.btnListFn = function () {
		var _this = this;
		this.oBtnsList.addEventListener('click',function(ev) {
			var ev = ev || event;
			var reResetClass = /headResetName/g;//重命名class
			var reCreatFile = /filesCreate/g;//新建文件夹
			var reDeleteFile = /headDelete/g;//删除文件夹
			if ( reResetClass.test(ev.target.className) || reResetClass.test(ev.target.parentNode.className)) {
				if ( _this.arr.length == 1 ) {
					var domObj = _this.findFile(_this.arr[0]);//查找dom中的元素节点
					var dataObj = tools.arrIndexOf(_this.arr[0],data.files);//查找数据在data中的位置
					
					_this.resetName(domObj,data.files[dataObj]);//调用重命名方法
				}
				
			} else if(reCreatFile.test(ev.target.className) || reCreatFile.test(ev.target.parentNode.className)) {
				
				_this.creatFile();//调用新建文件夹方法
			} else if (reDeleteFile.test(ev.target.className) || reDeleteFile.test(ev.target.parentNode.className)) {
				_this.deleteFile();//调用删除文件夹方法
			}
			_this.checkNum();
		})
	}
	DataRander.prototype.deleteFile = function () {
		if ( this.arr.length>0 ) {
			var domObj = [];
			for ( var i=0; i<this.arr.length; i++ ) {
				
				//根据id,查找文件及子级文件在数据中的位置
				dataControl.removeData(data.files,this.arr[i]);
			}
			this.arr.length = 0;
			var pid = parseInt(tools.$('#filesHead .filesListNow').getAttribute('data-file-id'));
			this.body();
		}
	}
	//新建文件夹方法
	DataRander.prototype.creatFile = function() {
		var _this = this;
		var id = tools.findMaxNum(data.files,'id');
		var pid = parseInt(tools.$('#filesHead .filesListNow').getAttribute('data-file-id'));
		
		//dom插入一个文件，设置文件名
		var obj = {
			id: ++id,
			pid: pid,
			title:"新建文件夹",
			type:"file",
			size: '-',
			fileDate: '-'
		}
		var str = this.randBody(obj);
		this.obj.innerHTML = str + this.obj.innerHTML;
		
		tools.addClass(this.child[0],'active')
		this.resetName(this.child[0],obj,function(){
			data.files.unshift(obj);
			_this.id = obj.pid;
			_this.body();
			},function(){//取消新建文件夹
			_this.obj.removeChild(_this.child[0]);
		});
	}
	//重命名方法
	DataRander.prototype.resetName = function (domObj,dataObj,success,fail) {//dom对象,数据对象，保存需要执行的函数，取消需要执行的函数
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
			if ( dataControl.findPid(data.files,dataObj,newName) ) {
				
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
	}
	DataRander.prototype.textSearch = function () {
		var _this = this;
		//输入文件名搜索
		var fileSearch = tools.$('#fileSearch');
		
		var oText = fileSearch.getElementsByTagName('input')[0];
		var oSub = fileSearch.getElementsByTagName('a')[0];
		
		oSub.addEventListener('click',fnSubmit);//点击搜索
		//回撤搜索
		fileSearch.addEventListener('keydown',function(ev){
			var ev = ev || event;
			if ( ev.keyCode === 13) {
				fnSubmit();
				ev.preventDefault();
			}
		})
		function fnSubmit() {
			var val = oText.value;
			if ( val.trim() === '' ) {
				alert('请输入要搜索的文件名');
			} else {
				var arr = dataControl.findFile(data.files,'title',val);
				if ( arr.length === 0 ) {
					alert('没有找到您要搜索的文件')
				} else {
					_this.searchRandFile(arr);
				}
			}
		}
	}
	//分类搜索
	DataRander.prototype.classSearch = function () {
		var _this = this;
		var aside = tools.$('#aside');
		
		aside.addEventListener('click',function(ev){
			var prevObj = tools.getByClass('active',aside)[0];
			var li = tools.findParent(ev.target,aside.children);
			tools.rmClass(prevObj,'active');
			tools.addClass(li,'active');
			
			if ( tools.indexOfStr(ev.target.className,'asideImg') || tools.indexOfStr(ev.target.parentNode.className,'asideImg') ) {
				var imgArr = dataControl.findFile(data.files,'type','img');
				
				_this.searchRandFile(imgArr);
			} else if (tools.indexOfStr(ev.target.className,'asideText') ||tools.indexOfStr(ev.target.parentNode.className,'asideText')) {
				var textArr = dataControl.findFile(data.files,'type','txt');
				_this.searchRandFile(textArr);
			} else if (tools.indexOfStr(ev.target.className,'asidevideo') || tools.indexOfStr(ev.target.parentNode.className,'asidevideo')) {
				var videoArr = dataControl.findFile(data.files,'type','video');
				_this.searchRandFile(videoArr);
			} else if (tools.indexOfStr(ev.target.className,'asideSeed') || tools.indexOfStr(ev.target.parentNode.className,'asideSeed')) {
				var seedArr = dataControl.findFile(data.files,'type','seed');
				_this.searchRandFile(seedArr);
			} else if (tools.indexOfStr(ev.target.className,'asideMusic') || tools.indexOfStr(ev.target.parentNode.className,'asideMusic')) {
				var musicArr = dataControl.findFile(data.files,'type','music');
				_this.searchRandFile(musicArr);
			} else if (tools.indexOfStr(ev.target.className,'asideOther') || tools.indexOfStr(ev.target.parentNode.className,'asideOther')) {
				var otherArr = dataControl.findFile(data.files,'type','other');
				_this.searchRandFile(otherArr);
			}else if (tools.indexOfStr(ev.target.className,'asideAll') || tools.indexOfStr(ev.target.parentNode.className,'asideAll')) {
				//var allArr = dataControl.findFile(data.files,'pid',0);
				_this.id = 0;
				_this.nav();//在点击事件完重新调用dom渲染方法
				_this.body();
			}
		})
	}
	DataRander.prototype.searchRandFile = function (arr) {
		var str = '';
		for ( var i=0; i<arr.length; i++ ) {
			str += this.randBody(arr[i]);
		}
		this.obj.innerHTML = str;
	}
	DataRander.prototype.findFile = function (id) {//根据id找dom中的文件节点
		for ( var i=0; i<this.child.length; i++ ) {
			if ( this.child[i].getAttribute('data-file-id') == id ) {
				return this.child[i];
			}
		}
	}