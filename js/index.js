
//重写------------start------------------------


const device = mobilecheck(); 
var $body = $(document.body);
var $wrap = $('#wrap');
var hat = new drawHat('hat',move.css($('#logo')[0],'height')/2+30);
var shoesTop = window.innerHeight - $('#navConvas').offset().top - $('#navConvas').outerHeight()/2;
var shoes = new drawHat('shoes',shoesTop);
var lastHatstatus = 'loading';
var hash = (window.location.hash && window.location.hash.substr(1)) || 'home';
var r = 20; 

if (device) {
	(function(){
		var html = document.documentElement;
		var sH3 = 'margin-bottom:'+20/r+'rem;font-size: '+30/r+'rem;';
		
		html.style.fontsize = html.clientWidth/16;
		
		$('#hint')[0].style.padding = 5/r+'rem 0';
		$('#hint')[0].style.minHeight = 39/r+'rem';
		$('#hint')[0].style.font = 16/r+'rem/'+20/r+'rem helvetica';
		$('#hint').find('h3')[0].style.cssText = sH3;
		$('#hint').find('.showText')[0].style.fontSize = 12/r+'rem';
		$('#hint').find('.showText')[0].style.lineHeight = 22/r+'rem';
		
		$('#hint').find('.hintBtn')[0].style.marginTop = 15/r + 'rem';
		//$('#hint').find('.hintBtn')[0].style.width = 92/r + 'rem';
		$('#hint').find('.hintBtn')[0].style.height = 32/r + 'rem';
		$('#hint').find('.hintBtn')[0].style.lineHeight = 30/r + 'rem';
		$('#hint').find('.hintBtn').find('mark')[0].style.width = 92/r + 'rem';
		$('#footer').find('.blogroll').hide();
		
	})()
}


	

;(function(global,factory){
	var htmlName = window.location.hash = 'home';
	
	
	//画导航背景
	drawNav('navConvas');
	
	//点击底部导航执行的动画
	navRound('nav');
	
	//页面切换,执行的操作
	factory(global,htmlName,window[htmlName+'Load']);
	
	//点击导航,导航旋转
	function navRound(id) {
		var $nav = $('#'+id);
		var $navBase = $nav.find('.navBase');
		var $navBg = $nav.find('.navBg');
		var $navList = $nav.find('.navList');
		var $a = $nav.find('.navList').find('a');
		var index = 0;
		var lastIndex = 0;
		
		move.css($navBase[0],'rotate',45);
		move.css($navList[0],'rotate',45);
		for ( var i=0; i<$a.length; i++ ) {
			move.css($a[i],'rotate',-45);
		}
		window.addEventListener('hashchange',function(){
			hash = (window.location.hash && window.location.hash.substr(1)) || 'home';
			for ( var i=0; i<$a.length; i++ ) {
				if ( $($a[i]).hasClass(hash) ) {
					index = $($a[i]).index();
				}
			}
			var className = hash;
			var disIndex = Math.abs(lastIndex-index);
			
			$($a[index]).addClass('active').siblings().removeClass('active');
				move.mTween($navBase[0],{'rotate':-(index*90-45)},disIndex*400,'linear',function(){
				//画导航背景
				drawNav('navConvas',-index*90);
				$body.removeClass(htmlName).addClass(className);//替换body上的class
				if ( className === 'home' || className === 'works' ) {
					lastHatstatus = 'loading';
					$('#logo').css({'transition':'','-webkit-transition':''});
					$('#hint').css({
						'width':'0',
						'height':'0',
						'top': '40%'
					});
					$body.addClass('loading').removeClass('loaded');//替换body上的class
				}
				$wrap.find('.tBody').attr('id',className);//替换tBody上的id
				htmlName = className;
				//页面切换,执行的操作
				factory(global,htmlName,window[htmlName+'Load']);
			});
			move.mTween($navBg[0],{'rotate':-index*90},disIndex*400,'linear');
			move.mTween($navList[0],{'rotate':-(index*90-45)},disIndex*400,'linear');
			for ( var i=0; i<$a.length; i++ ) {
				move.mTween($a[i],{'rotate':(index*90+45)-90},disIndex*400,'linear');
			}
			lastIndex = index;
			
		})
	}
	
	
})(window,function(global,htmlName,loadData){
	
	
	
	//页面进来加载: 上下两个canvas的变化，页面透明度的变化
	loading();
	
	//画头部和底部的canvas
	htmlName === 'home'? drawHatShose('loadedData','#fff'):drawHatShose('activeData','#1e1e1e');
	
	//画logo
	htmlName === 'home'? drawLogo('logo'):drawLogo('logo','#fff');
	
	//设置底部的链接列表top
	setBlogroll ((htmlName==='home'?false:true));
	
	window.addEventListener('resize',setSquareHeight);
	
	showHtml();
	
	function showHtml() {
		if ( htmlName === 'home' ) {
			fnHome();
		} else if ( htmlName === 'works') {
			fnHome = null;
			fnWorks();
		} else if ( htmlName === 'about') {
			fnAbout();
		} else if ( htmlName === 'contact') {
			fnContact();
		}
	}
	
	
	
//------页面主体内容的操作开始---------------------
	//home页面操作
	function fnHome() {
		var $tabHome = $('#home');
		
		//渲染页面
		rander(data,$tabHome);
		
		var $productList = $('#home').find('.productList').find('li');
		
		var imgTab = new TabImg('home');
		//图片切换
		imgTab.init({
			data: data,
			imgParObj: $tabHome.find('.productList')[0],
			subParCode: $tabHome.find('.subCode')[0],
			nextBtn: $tabHome.find('.next')[0],
			prevBtn: $tabHome.find('.prev')[0],
			callBack: fnProductHid
		})
		imgTab.extend({
			addEvent:function(obj) {
				var startX, disX, num = 0;
				var _this = this;
				obj.off('touchstart').on('touchstart',function(ev){
					var ev = ev || event;
					
					if (ImgEvent(obj[0],ev.changedTouches[0].pageX,ev.changedTouches[0].pageY)){
						startX = _this.touchStart(ev);
					}
					ev.preventDefault();
				});
				obj.off('touchmove').on('touchmove',function(ev){
					var ev = ev || event;
					disX = _this.touchsMove(ev,disX,startX);
					
				});
				obj.off('touchend').on('touchend',function(ev){
					var ev = ev || event;
					_this.touchsEnd(disX);
					
					if ( (typeof disX==='undefined' || Math.abs(disX)<1) && ImgEvent(obj[0],ev.changedTouches[0].pageX,ev.changedTouches[0].pageY) ) {
						//--------------
						var li = findEle($productList,ev.changedTouches[0].pageX,ev.changedTouches[0].pageY);
						var fileId = $(li).attr('fileId');
						
						if ( $productList[0].parentNode.onOff ) {
							
							fnProductShow(fileId);
						} else {
							fnProductHid();
						}
						//--------------
					}
				});
			}
		})
		imgTab.addEvent($('#hat'));
		imgTab.addEvent($('#shoes'));
		
		//点击图片，弹出/隐藏详情框
		;(function(factory) {
			var $productList = $('#home').find('.productList').find('li');
			$productList[0].parentNode.onOff = true;
			$productList.closest('ul').on('click',function(ev){
				var li = findEle($productList,ev.pageX,ev.pageY);
				var fileId = $(li).attr('fileId');
				factory($productList,fileId);
			})
			$('#hat').off('click').click(function(ev){
				var ev = ev || event;
				if (ImgEvent(this,ev.pageX,ev.pageY)) {
					var li = findEle($productList,ev.pageX,ev.pageY);
					var fileId = $(li).attr('fileId');
					factory($productList,fileId);
				}
			})
			$('#shoes').off('click').click(function(ev){
				var ev = ev || event;
				if (ImgEvent(this,ev.pageX,ev.pageY)) {
					
					var li = findEle($productList,ev.pageX,ev.pageY);
					var fileId = $(li).attr('fileId');
					
					factory($productList,fileId);
				}
			})
		})(function($productList,fileId){
			
			if ( $productList[0].parentNode.onOff ) {
				
				fnProductShow(fileId);
			} else {
				fnProductHid();
			}
		});
		//弹出详情框
		function fnProductShow(fileId) {
			if (!$('#home')[0]) return;
			$('#home').find('.productList')[0].onOff = false;
			
			var index = tools.arrIndexOf(fileId,data);
			hat.init({now:'activeData',last:'loadedData'},{time:500});
			shoes.init({now:'activeData',last:'loadedData'},{onOff:true,time:500});
			
			
			fnShowHint(data[index],true,false);
			
			
			$('#footer').find('.blogroll').addClass('top');
		}
		//隐藏详情框
		function fnProductHid() {
			if ($('#home').find('.productList')[0] && !$('#home').find('.productList')[0].onOff) {
				hat.init({now:'loadedData',last:'activeData'},{time:500});
				shoes.init({now:'loadedData',last:'activeData'},{onOff:true,time:500});
				
				//这里用jq的animate之后会先变大，后width、height减小
				move.mTween($('#hint')[0],{
					'width':0,
					'height':0,
					'top': Math.round($body.innerHeight()*.4),
					'opacity': 0
				},500,'linear',function(){
					$('#home').find('.productList')[0].onOff = true;
				});
				
				
				$('#footer').find('.blogroll').removeClass('top');
			}
		}
		
		
		function rander(data,obj) {
			var str = '';
			
			str += '<span class="prev" style="display:'+(device?"none":"block")+'"></span>'+
					'<span class="next" style="display:'+(device?"none":"block")+'"></span><ul class="productList" id="idBannerImg">';
			str +=	'<li fileId="'+data[0].id+'"><img src="'+data[0].img+'"/></li><li fileId="'+data[1].id+'"><img src="'+data[1].img+'"/></li>'	
			str +=	'</ul><p style="display:'+(device?"none":"block")+'" class="subCode"></p>';
			
			$tabHome.html(str);
			$('#hint').find('.hintBtn').html('WEBSITE<span><mark>WEBSITE</mark></span>');
			$('#hint').find('h3').html('Product').css('color','#222');
			
			//$('#hint').find('.hintBtn').html('RESUME<span><mark>RESUME</mark></span>');
			//$('#hint').find('h3').html('About').css('color','#222');
		}
	}
	//works页面操作
	function fnWorks() {
		var $tabWorks = $('#works');
		
		var listWheel = new Scroll('works');
		listWheel.init();
		listWheel.extend({
			fnCanvas: function(obj){
				//this.touchFn(obj);
				var settings = {
					disY:0,nowY:0,lastTime:0,disTime:0,lastMouse:0,disMouse:0
				}
				var _this = this;
				
				fnCanvas(obj,'touchstart',function(x,y,ev){
					var a = findEle($tabWorks.find('a'),x,y);
					window.location.href = a.href;
					
					_this.fnStart(ev,settings);
				})
				
				obj.off('touchmove').on('touchmove',function(ev){
					var ev = ev || event;
					_this.fnMove(ev,settings);
				})
				obj.off('touchend').on('touchend',function(ev){
					var ev = ev || event;
						
					_this.fnEnd(ev,settings);
				})
				
				
			}
		})
		listWheel.fnCanvas($('#hat'));
		listWheel.fnCanvas($('#shoes'));
		
		
		
		
		rander(worksData,$tabWorks);
		var $aAs = $tabWorks.find('a');
		
		$aAs.off('mouseenter').on('mouseenter',function(){
			$(this).css({'transform':'scale(1.3)','-webkit-transform':'scale(1.3)'});
		});
		$aAs.off('mouseleave').on('mouseleave',function(){
			$(this).css({'transform':'scale(1)','-webkit-transform':'scale(1)'});
		});
		canvasClick('mouseenter',function(x,y){
			var a = findEle($tabWorks.find('a'),x,y);
			$(a).css({'transform':'scale(1.3)','-webkit-transform':'scale(1.3)'});
		});
		$('#shoes').off('mouseleave').on('mouseleave',function(ev){
			var a = findEle($tabWorks.find('a'),ev.pageX,ev.pageY);
			$(a).css({'transform':'scale(1)','-webkit-transform':'scale(1)'});
		});
		$('#hat').off('mouseleave').on('mouseleave',function(ev){
			var a = findEle($tabWorks.find('a'),ev.pageX,ev.pageY);
			$(a).css({'transform':'scale(1)','-webkit-transform':'scale(1)'});
		});
		
		
		
		canvasClick('click',function(x,y){
			var a = findEle($tabWorks.find('a'),x,y);
			window.location.href = a.href;
		});
		//点击上下canvas操作
		function canvasClick(Event,fn) {
			fnCanvas($('#shoes'),Event,fn);
			fnCanvas($('#hat'),Event,fn);
		}
		
		
		function rander(data,obj) {
			var str = '';
			for ( var i=0; i<worksData.length; i++ ) {
				str += '<div class="imgList">'+
							'<a href="'+data[i].href+'">'+
								'<img src="'+data[i].img+'" />'+
							'</a>'+
						'</div>';
			}
			obj.html(str);
		}
	}
	
	//about页面操作
	function fnAbout() {
		var $tabAbout = $('#about');
		
		$tabAbout.html('');
		fnShowHint(aboutData,false,true);
		
		$('#hint').find('.hintBtn').html('RESUME<span><mark>RESUME</mark></span>');
		$('#hint').find('h3').html('About').css('color','#222');
	}
	
	//contact页面操作
	function fnContact() {
		var $tabContact = $('#contact');
		var $hint = $('#hint');
		
		render();
		$tabContact.html('');
		$hint.css({
			'opacity': '1',
			'width':$('#hint').prop('width'),
			'height':$('#hint').prop('width'),
			'top': $('#hint').prop('top')
		});
		
		function render() {
			var sDl= '', sDt= '',sDd= '',sText= '';
			if(device){
				sDl = 'height: '+30/r+'rem;';
				sDt = 'line-height:'+10/r+'rem;';
				sDd = 'height: '+20/r+'rem;line-height: '+20/r+'rem;top:'+10/r+'rem;';
				sText = 'margin: '+5/r+'rem '+0/r+'rem '+20/r+'rem;font-size: '+12/r+'rem;line-height: '+20/r+'rem;height:'+100/r+'rem;'
			}
			var str = '<div class="clear">'
						+'<dl style="'+sDl+'">'
							+'<dt style="'+sDt+'">Tel:</dt>'
							+'<dd style="'+sDd+'">17310360285</dd>'
						+'</dl>'
						+'<dl style="'+sDl+'">'
							+'<dt style="'+sDt+'">Email:</dt>'
							+'<dd style="'+sDd+'">369857686@qq.com</dd>'
						+'</dl>'
					+'</div>'
					+'<div>'
						+'<div class="dt"  style="'+sDt+'">Message:</div>'
						+'<textarea style="'+sText+'"></textarea>'
					+'</div>';
			$hint.find('#hintCont').html(str);
			$hint.find('.hintBtn').attr('href','javascript:;').html('SEND<span><mark>SEND</mark></span>');
			$hint.find('h3').html('Concact').css('color','#fff');
		}
	}
	
	//上下两个canvas加事件函数
	function fnCanvas(obj,Event,fn) {
		obj.off(Event).on(Event,function(ev){
			var ev = ev || event;
			var tag = ( Event === 'touchstart' || Event === 'touchmove' || Event === 'touchend' )? ev.changedTouches[0]:ev;
			if (ImgEvent(this,tag.pageX,tag.pageY)) {
				fn(tag.pageX,tag.pageY,ev);
			}
		})
	}
	
	
	//页面hint的相关操作
	function fnShowHint(data,isObjAnimat,isTextAnimat) {
		if (isObjAnimat) {
			$('#hint').animate({
				'opacity': '1',
				'width':$('#hint').prop('width'),
				'height':$('#hint').prop('width'),
				'top': $('#hint').prop('top')
			},500);
		} else {
			$('#hint').css({
				'opacity': '1',
				'width':$('#hint').prop('width'),
				'height':$('#hint').prop('width'),
				'top': $('#hint').prop('top')
			});
		}
		$('#hint').find('a').attr('href',data.href)
		creatText(data.info,$('#hintCont')[0],isTextAnimat);
	}
	
	//页面进来加载: 有loading，需要执行loading动画，没有loading直接获取logo的位置
	function loading() {
		
		move.css($wrap.find('.tBody')[0],'translateY','0');
		
		if ( $body.hasClass('loading') ) {//前两个页面有loading
			var $bar = $('#loadingBar');
			var $barP = $bar.find('p');
			var $W = $bar.innerWidth()/loadData.length; 
			var num = 0;
			$(loadData).each(function(i,e){
			
				var $img = $('<img src="'+e+'"/>');
				
				$img.off().on('load',function(){
					num ++;
					var scal = (num - loadData.length)*$W;
					move.css($barP[0],'translateX',scal);
					if ( num === loadData.length ) {
						setTimeout(function(){
							$('#logo').css({'transition':'top .7s ease','-webkit-transition':'top .7s ease',})
							$body.removeClass('loading').addClass('loaded');
							move.css($barP[0],'translateX',-$bar.innerWidth());
						},200)
						return;
					}
				})
			})
		}
		
		setSquareHeight();
	}
	//设置详情展框的位置和宽高，只是标记
	function setSquareHeight(){
		
		//获取顶部的logo
		var $top = $('#logo').offset().top;
		//logo斜边的长度
		var $logoC = $('#logo').outerWidth();
		//logo的边长
		var $logoA = Math.round(Math.sqrt($logoC*$logoC/2));
		//logo顶点到document顶部的距离
		var disTop = 30-((Math.sqrt(2*$logoA*$logoA)-$logoA)/2);
		
		//获取底部的nav列表
		var $NavObj = $('#nav').find('.navList');
		var $NavTop = $NavObj.offset().top;
		var $NavHeight = $NavObj.outerHeight()/2;
		
		var c = $NavTop+$NavHeight-(30-disTop);
		
		var a = Math.sqrt(Math.pow(c,2)/2);
		
		var hintTop = (c-a)/2 + disTop;
		
		$('#hint').css({
					'transition': '',
					'-webkit-transition': ''
				});
		$('#hint').css({'width':a,'height':a});
		$('#hint').prop('width',a);
		$('#hint').prop('top',hintTop);
		$('#hint').css({'width':0,'height':0,'top':'40%'});
	}
	
	
	
	//画头部和底部的canvas
	function drawHatShose(nowStatus,color) {
		color = color || '#fff';
		hat.init({now:nowStatus,last:lastHatstatus},{time:700,color:color});
		shoes.init({now:nowStatus,last:lastHatstatus},{time:700,onOff:true});
		lastHatstatus = nowStatus;
	}
	
	//查找对应位置的元素
	function findEle(targetList,pageX,pageY) {
		var eleRect,t,b,l,r,s;
		for ( var i=0; i<targetList.length; i++ ) {
			eleRect = targetList[i].getBoundingClientRect();
			s = targetList[i].scrollTop;
			t = eleRect.top;
			b = eleRect.bottom;
			l = eleRect.left;
			r = eleRect.right;
			if ( s+t<pageY && s+b>pageY && l<pageX && r>pageX) {
				return targetList[i];
			}
		}
		return null;
	}
	//设置底部的链接列表top
	function setBlogroll (falg) {
		if (falg) {
			$('#footer').find('.blogroll').addClass('top');
		} else {
			$('#footer').find('.blogroll').removeClass('top');
		}
	}
	
	//打字式创建文字
	function creatText(data,obj,isAnimat) {
		if(!Array.isArray(data) || data.length===0) return;
		var num = 0;
		var arrObj = [];
		var p;
		obj.innerHTML = '';
		
		if ( isAnimat ) {
			for ( var i=0; i<data.length; i++ ) {
				p = document.createElement('p');
				arrObj.push(obj.appendChild(p));
			}
			randText(0,arrObj[0]);
			function randText(n,p){
				var index = 0,timer= null,curTimer=null ;
				var i = document.createElement('i');
				if ( device ) {
					p.style.padding = 5/r+'rem 0';
					i.style.height = 22/r+'rem';
				}
				
				p.appendChild(i);
				timer = setInterval(function(){
					var txt = document.createTextNode(data[n].charAt(index));
					p.insertBefore(txt,i);
					
					if ( index === data[n].length-1 ) {
						
						clearInterval(timer);
						if ( n<data.length-1 ) {
							n++;
							p.removeChild(i);
							randText(n,arrObj[n]);
						}
					}
					index++;
				},200);
				curTimer = setInterval(function(){
					if (!i || !obj.getElementsByTagName('p')) {
						clearInterval(curTimer);
					} else {
						i.style.opacity = (!i.onOff?'100':'0');
						i.onOff = !i.onOff;
					}
				},200)
			}
		} else {
			p = document.createElement('p');
			p.innerHTML = data.join('<br/>');
			obj.appendChild(p);
		}
	}
});

document.addEventListener('touchmove',function(ev){
	ev.preventDefault();
})
function mobilecheck() {
    var check = false;
    (function (a) {
        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}


//重写------------end------------------------





