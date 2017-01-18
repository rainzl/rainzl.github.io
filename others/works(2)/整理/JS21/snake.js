
//--------------------------------
//变量声明部分
var startGame = document.getElementById('start');
var maxX = 20, maxY = 20;

//初始蛇的长度和速度，数组用来存储蛇的每个点的x、y坐标
var snake = [],
	len = 3,
	speed = 10;
var snakeTime = null;
var direction = 39;
var flag = true;//控制direction值改变的速度
var skateTimer = [],
	breakTimer = [];

var snakeData = creatArr(maxX,maxY);
var mapData = [];//数据层面的二维数组，用来做碰撞检测

creatTab(maxX,maxY);

startGame.onclick = function () {
	initGame();
	initSnake();
	walk();
	addObj('food');
	addToy();
}

//初始化游戏中的
function initGame(){
	mapData = creatArr(maxX,maxY);//数据层面的二维数组，用来做碰撞检测
	snake = [];
	len = 3;
	speed = 10;
	snakeTime = null;
	direction = 39;
	flag = true;//控制direction值改变的速度
	snakeData.forEach(function(item){
		item.forEach(function(item){
			item.className = '';
		})
	});
}

//需求1: 绘制活动地图
function creatTab(x,y){
	var oMap = document.getElementById('map');
	var table = document.createElement('table');
	table.cellPadding = table.cellSpacing = 0;
	
	var tbody = table.createTBody();
	for ( var i=0; i<x;i++ ){
		var tr = document.createElement('tr');
		for ( var j=0; j<y;j++ ){
			var td = document.createElement('td');
			snakeData[i][j] = tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	oMap.appendChild(table);
}


//需求2: 创建二维数组: 
function creatArr(x,y){
	var arr = new Array(x);
	for ( var i=0; i<y; i++){
		arr[i] = new Array(y);
	}
	return arr;
}
//需求3: 设定范围: 用来限制随机物品出现的坐标
function scope( startX,startY,endX,endY ){
	startX = startX || 0;
	startY = startY || 0;
	endX = endX || maxX - 1;
	endY = endY || maxY - 1;
	
	var p = [],
		x = rP([startX,endX]),
		y = rP([startY,endY]);
	p.push(x,y);
	
	// 用来判断这个点生成的位置是否已被占用，如果有就重复执行这个函数
	if (mapData[x][y]) {
		scope( startX,startY,endX,endY );
	}
	return p;
}

//需求4: 编写随机函数
function rP(arr) {
	var max = Math.max.apply(null,arr),
		min = Math.min.apply(null,arr);
	return Math.round(Math.random()*(max-min)+min);
}

//需求5: 初始化snake
function initSnake(){
	var p = scope( 0,2,maxX-1,parseInt(maxY/2) );
	for ( var i=0; i<len; i++ ) {
		var x = p[0],
			y = p[1]-i;
		snake.push([x,y]);
		snakeData[x][y].className = 'snake';
		mapData[x][y] = 'snake';
	}
}
//需求6： 让蛇跑起来

function walk() {
	clearInterval(snakeTime);
	snakeTime = setInterval(step,5000/speed);
}

//需求7: 控制蛇的运动
//step();
function step(){
	var headX = snake[0][0],
		headY = snake[0][1];
	var lastX = snake[snake.length-1][0],
		lastY = snake[snake.length-1][1];
	switch (direction) {
		case 37:
			headY -= 1;
			break;
		case 38:
			headX -= 1;
			break;
		case 39:
			headY += 1;
			break;
		case 40:
			headX += 1;
			break;
	}
	if ( headX<0 || headX>=maxX || headY<0 || headY>=maxY || mapData[headX][headY] == 'snake' || mapData[headX][headY] == 'block' ) {
		clearInterval(snakeTime);
		alert('啊哦……自杀啦！');
		skateTimer.forEach(function(item){
			clearTimeout(item);
		})
		breakTimer.forEach(function(item){
			clearTimeout(item);
		})
		return;
	}
	
	if ( !mapData[headX][headY] ) {
		snake.pop();
		snakeData[lastX][lastY].className = '';
		mapData[lastX][lastY] = false;
	} else if (mapData[headX][headY] == 'food') {
		addObj('food');
	} else if (mapData[headX][headY] == 'skate') {
		speed += 15;
		walk();
	}
	else if (mapData[headX][headY] == 'break') {
		speed += 10;
		walk();
	}
	
	if ( (len+1)%5==0&& snake.length<55&& mapData[headX][headY]=='food' ) {
		speed += 5;
		walk();
	}
	if ((len+1)%10 == 0 && len < 60 && mapData[headX][headY]=='food') {
		addObj('block');
	}
	snake.unshift([headX,headY]);
	snakeData[headX][headY].className = 'snake';
	mapData[headX][headY] = 'snake';
	len = snake.length;
	scoreAdd();
	flag = true;
}


window.onkeydown = function (ev){
	var ev = ev || event;
	if (!flag) {
		return;
	}
	if ( ev.keyCode > 36 && ev.keyCode < 41 && Math.abs(ev.keyCode - direction) != 2 ) {
		direction = ev.keyCode;
	}
	flag = false;
}
//需求9: 添加随机的物品

function addObj(name) {
	var p = scope();
	snakeData[p[0]][p[1]].className = name;
	mapData[p[0]][p[1]] = name;
}

//需求10: 添加随机数量的滑板和刹车
function addToy() {
	var skateNum = rP([6,10]),
		breakNum = rP([4,8]);
	for ( var i=0; i<skateNum; i++ ) {
		skateTimer.push(setTimeout(function(){
			addObj('skate');
		},rP([5000,120000])));
	}
	for ( var i=0; i<breakNum; i++ ) {
		breakTimer.push(setTimeout(function(){
			addObj('break');
		},rP([8000,180000])));
	}
}
function scoreAdd(){
	var score = document.getElementById('score');
	score.innerHTML = (len-3)*10;
}
