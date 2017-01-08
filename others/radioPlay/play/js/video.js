/*
 * @Author: GZY
 * @Date:   2016-11-21 16:54:59
 * @Last Modified by:   GZY
 * @Last Modified time: 2016-11-24 18:01:50
 */

'use strict';

var gzyfn = null;


(function() {

    gzyfn = fnStart;
    //---------------------------------------------------------------------------------分辨率Resolution适配
    var hash = window.location.hash.substr(1) || 1;
    var html = document.querySelector("html");
    var width = html.getBoundingClientRect().width;
    var height = html.getBoundingClientRect().height/10;
    var widthC = width / 16;
    html.style.fontSize = widthC + 'px';

    //---------------------------------------------------------------------------------
    var vd = document.getElementById('vd');
    var controlAll = document.getElementById('control');
    var control = document.querySelector('#control').children;
    var skip = document.getElementById('skip');
    var header = document.getElementById('header');
    var skip = document.getElementById('skip');
    var vidiuChange = document.querySelector('.vidiuChange');
    var timer = null;
    var isFull = true;
    //---------------------------------------------------------------------------------
    control[0].addEventListener('click', fnStart);
    control[3].addEventListener('click', fnAd);
    control[5].addEventListener('click', fnFull);
    control[1].addEventListener('mousedown', fnVdDown);
    control[7].addEventListener('mousedown', fnAdDown1);
    console.log(hash);
    // vd.children[0].src = data[hash].mp4; //将数据加载进页面

    orign();


    //---------------------------------------------------------------------------------监听事件，当前是否为全屏
    document.addEventListener("fullscreenchange", function() {
        if (!document.fullScreen) { //返回值为false
            fnKeyDown();
        }
    });
    document.addEventListener("mozfullscreenchange", function() {
        if (!document.mozFullScreen) {
            fnKeyDown();
        }
    });
    document.addEventListener("webkitfullscreenchange", function() {
        // console.log(3,document.webkitIsFullScreen)
        if (!document.webkitIsFullScreen) {
            fnKeyDown();
        }
    });
    document.addEventListener("msfullscreenchange", function() {
        if (!document.msFullScreen) {
            fnKeyDown();
        }
    });

    

    //--------------------------------------------------------------------------------
    function orign(){
      header.style.height = 1.5 *height + "px";
      controlAll.style.height = 1.5 *height + "px";
      vd.style.height = 7*height + "px";
      vd.parentNode.style.height = 7*height + "px";
      vd.nextElementSibling.style.height = 7*height + "px";
      skip.style.height = 7*height + "px";
      vd.nextElementSibling.style.width = '13.848125rem';
      vd.nextElementSibling.style.left = '1.08rem';
      vd.style.margin = '0 auto';
      vd.style.display = 'none';

    }

   

    function fnStart() {
        if (vd.paused) { //判断视频是否暂停，如果暂停就播放，否则就暂停；
            vd.play();
            this.children[0].style.backgroundImage = 'url(img/end.png)';
            this.children[0].style.backgroundSize = '100%';
            vd.nextElementSibling.style.display = 'none';
            nowTime();
            timer = setInterval(nowTime, 1000);
            vidiuChange.style.display = 'none';
            vd.style.display = 'block';
        } else {
            vd.pause();
            this.children[0].style.backgroundImage = 'url(img/start1.png)';
            this.children[0].style.backgroundSize = '100%';
            clearInterval(timer);
            vd.style.display = 'none';
            vidiuChange.style.display = 'block';
        }
    }

    function fnAd() {
        if (vd.muted) { //判断视频是否静音，如果静音就播放，否则就静音；
            vd.volum = 0; //volume  :   0.0-1.0的音量相对值
            this.children[0].style.backgroundImage = 'url(img/ad.png)';
            this.children[0].style.backgroundSize = '100%';
            control[7].style.width = control[4].offsetWidth / widthC + 'rem';
            vd.muted = false;
        } else {
            vd.volume = 1;
            this.children[0].style.backgroundImage = 'url(img/adEnd.png)';
            this.children[0].style.backgroundSize = '100%';
            control[7].style.width = 0 + 'px';
            vd.muted = true;
        }
    }

    function nowTime() {
        control[2].innerHTML = changeTime(vd.currentTime);
        var scale = vd.currentTime / vd.duration; //duration 媒体总时间
        control[6].style.width = (scale * control[1].offsetWidth) / widthC + 'rem';
    }

    function changeTime(num) {
        num = parseInt(num); //获取视频的时间 取整
        var isM = Math.floor(num % 3600 / 60);
        var isS = toZero(Math.floor(num % 60));

        return isM + ':' + isS;
    }

    function toZero(n) { //加0
        if (n <= 9) {
            return '0' + n;
        } else {
            return '' + n;
        }
    }

    function fnVdDown(ev) {
        var L = ev.pageX - control[1].offsetLeft; //获取当前点击的位置
        console.log(L);
        control[6].style.width = L / widthC + 'rem';
        var scale = L / control[1].offsetWidth;
        vd.currentTime = scale * vd.duration;
        nowTime();
        control[6].addEventListener('mousedown', fnVdDown1);
        control[1].addEventListener('mouseup', fnVdUp);
    }

    function fnVdDown1(ev) {
        control[6].style.width = 0 + 'px';
        var L = ev.pageX - control[1].offsetLeft;
        var scale = L / control[1].offsetWidth;
        vd.currentTime = scale * vd.duration;
        nowTime();
        control[6].addEventListener('mouseup', fnVdUp1);
    }

    function fnVdUp() {
        control[1].removeEventListener('mouseup', fnVdUp);
    }

    function fnVdUp1() {
        control[6].removeEventListener('mouseup', fnVdUp1);
    }

    function fnAdDown1(ev) {
        var L = ev.pageX - control[4].offsetLeft;
        control[7].style.width = L / widthC + 'rem';
        var scale = L / control[4].offsetWidth;
        vd.volume = scale;
        control[4].addEventListener('mousedown', fnAdDown);
        control[7].addEventListener('mouseup', fnAdUp1);
    }

    function fnAdDown(ev) {
        control[7].style.width = 0 + 'px';
        control[3].children[0].style.backgroundImage = 'url(img/ad.png)';
        control[3].children[0].style.backgroundSize = '100%';
        var L = ev.pageX - control[4].offsetLeft;
        control[7].style.width = L / widthC + 'rem';
        var scale = L / control[4].offsetWidth;
        vd.volume = scale;
        control[4].addEventListener('mouseup', fnAdUp);
    }

    function fnAdUp() {
        control[4].removeEventListener('mouseup', fnAdUp);
    }

    function fnAdUp1() {
        control[7].removeEventListener('mouseup', fnAdUp1);
    }

    function fnFull() {
        var docE = document.documentElement;
        if (isFull) {
            this.children[0].style.backgroundImage = "url(img/back.png)";
            this.children[0].style.backgroundSize = "100%";
            if (docE.webkitRequestFullscreen) { //Chrome
                docE.webkitRequestFullscreen();
            } else if (docE.requestFullscreen) { //W3C
                docE.requestFullscreen();
            } else if (docE.mozRequestFullscreen) { //fireFox
                docE.mozRequestFullscreen();
            } else if (docE.msRequestFullscreen) {
                docE.msRequestFullscreen();
            }
            vd.style.height = '6.6rem';
            vd.parentNode.style.height = '6.6rem';
            vd.nextElementSibling.style.height = '6.6rem';
            vd.nextElementSibling.style.width = '15.6rem';
            vd.nextElementSibling.style.left = '0.2rem';
        } else {
            this.children[0].style.backgroundImage = "url(img/full.png)";
            this.children[0].style.backgroundSize = "100%";
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msCancelFullScreen) {
                document.msCancelFullScreen();
            }
            orign();
        }
        isFull = !isFull;
    }

    function fnKeyDown() {
        control[5].children[0].style.backgroundImage = "url(img/full.png)";
        control[5].children[0].style.backgroundSize = "100%";
        orign()
    }
})();
