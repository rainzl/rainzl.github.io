
(function() {
	var hyLeft = document.getElementById('hyLeft');
	var hyLueur = hyLeft.querySelector('.hyLueur');
	var hyLampe = hyLeft.querySelector('.hyLampe');
	var hyLampeImg = hyLampe.children[1];
	var timer = null;
	
	//灯闪
	clearInterval(timer);
	Lampe();
	timer = setInterval(Lampe,1400);
	function Lampe() {
		hyLampeImg.style.display = 'block';
		mTween(hyLueur,{scale: .7},100,'elasticBoth',function() {
			hyLampeImg.style.display = 'none';
			mTween(hyLueur,{scale: 1},300,'elasticBoth');
		});
	};
	
	var hyTruck = document.getElementById('hyTruck');
	var hyFront = hyTruck.querySelector('.hyFront');
	var hyBack = hyTruck.querySelector('.hyBack');
	var hySmoke1 = hyTruck.querySelector('.hySmoke1');
	var hySmoke2 = hyTruck.querySelector('.hySmoke2');
	var hySmoke3 = hyTruck.querySelector('.hySmoke3');
	var hyCar = hyTruck.querySelector('.hyCar');
	var hyCarOff = hyCar.children[0].children[1];
	var tWheel = null;
	var tSmoke = null;
	var n = 1;
	
	//轮子转
	wheel();
	clearInterval(tWheel);
	tWheel = setInterval(wheel,120);
	function wheel() {
		mTween(hyFront,{rotate:90*n},120,'linear');
		mTween(hyBack,{rotate:90*n},120,'linear');
		n++;
	};
	
	//尾气
	smoke();
	clearInterval(tSmoke);
	tSmoke = setInterval(smoke,1000);
	function smoke() {
		mTween(hySmoke1,{top: 75,left: -20},200,'linear',function() {
			hySmoke1.style.top = 65+'px';
			hySmoke1.style.left = 0+'px';
			hySmoke1.style.opacity = 1;
			mTween(hySmoke2,{top: 80,left: -40},300,'linear',function() {
				hySmoke2.style.top = 65+'px';
				hySmoke2.style.left = 0+'px';
				hySmoke2.style.opacity = 1;
				mTween(hySmoke3,{top: 85,left: -70},400,'linear',function() {
					hySmoke3.style.top = 65+'px';
					hySmoke3.style.left = 0+'px';
				});
			});
		});
	};
	
	//车抖
	clearInterval(hyCar.tTruck);
	hyCar.tTruck = setInterval(truck,250);
	function truck() {
		mTween(hyCar,{top: -1},125,'linear',function() {
			mTween(hyCar,{top: 1},125,'linear');
		})
	};
	
	
	//车跑
	var hy = document.getElementById('hy');
	var hySec = document.getElementById('hySec');
	var hyBall = hySec.querySelector('.hyBall');
	var hyEiffel = hySec.querySelector('.hyEiffel');
	var hyBuilding = hySec.querySelector('.hyBuilding');
	var hyAvion = hySec.querySelector('.hyAvion');
	var hyF = hyAvion.children[0];
	console.log(hyF)
	var m = 0;
	hy.tHy = setTimeout(fnMove,300);
	function fnMove() {
		mTween(hy,{left: -1342},5000,'easeIn',function() {
			mTween(hyTruck,{rotate: 2},300,'easeOut',function() {
				mTween(hyTruck,{rotate: 0},100,'linear');
//				mTween(hyAvion,{left: -600},2000,'linear');
			});
			clearInterval(tWheel);
			hyCarOff.style.display = 'none';
			mTween(hyBall,{left: 1260,top: 250,rotate: 360*3},1350,'linear');
		});
		clearTimeout(hy.tHy);
	};
	
	//塔掉下来
	hyEiffel.tEiffel = setTimeout(EiffelDown,2500);
	function EiffelDown() {
		mTween(hyEiffel,{top: 100},2000,'bounceOut');
		clearTimeout(hyEiffel.tEiffel);
	};
	
	//房子掉下来
	hyBuilding.tBu = setTimeout(buildingDown,3200);
	function buildingDown() {
		mTween(hyBuilding,{top: 290},1500,'bounceOut');
		clearTimeout(hyBuilding.tBu);
	};
	
	//球掉下来
	hyBall.tBa = setTimeout(ballDown,4100);
	function ballDown() {
//		mTween(hyBall,{top: 417},1200,'bounceOut');
		mTween(hyBall,{top: 417},1200,'easeIn');
		clearTimeout(hyBall.tBa);
	};
	
	//车抖
	clearInterval(hyF.tFly);
	hyF.tFly = setInterval(fly,3000);
	function fly() {
		mTween(hyF,{top: -10},1600,'linear',function() {
			mTween(hyF,{top: 10},1400,'linear');
		})
	};
	
	//飞机飘进来
	avionDown();
//	hyAvion.tAv = setTimeout(avionDown,5300);
	function avionDown() {
//		mTween(hyAvion,{left: 293},3000,'linear');
		mTween(hyAvion,{left: -100,top: 100},5300,'linear',function() {
			mTween(hyAvion,{left: -1200,top: 150},4000,'linear');
		});
		clearTimeout(hyAvion.tAv);
	};
	
	//跳转地址
	setTimeout('this.location.href = "indexMain.html"',7000); 
	
})();

