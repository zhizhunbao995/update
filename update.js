(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
    var touch = {
        sX:0,
        sy:0,
        ex:0,
        ey:0
    },
    refrech = false,
    moveing = false;
    down = false;
    function mix(des,src,override){
        for (i in src) {
            if (override || !(des[i] || (i in des))) { 
                des[i] = src[i];
            }
        }
        return des;
    }
    function init(div,moveback,endback,opt){
        var moveback = moveback || function(){},
            opotion = {animate:1},
            endback = endback || function(){},
            opotion = mix(opotion,opt,true);
            console.log(opotion)
        function moveUp(e){
            e.preventDefault()
            window.re = window.requestAnimationFrame(function(){
                var pos = e.changedTouches[0];
                touch.eTime = touch.sTime  - new Date().getTime();
                touch.ex = pos.pageX;
                touch.ey = pos.pageY;
                var cha = touch.ey -  touch.sy;
                moveback && moveback.call(null,touch)
                //document.querySelector("h1").innerHTML+=(cha+"<br>")
                if(touch.ey -  touch.sy >5 && !refrech){
                    moveing = true;
                    if (window.scrollY<2) {
                        //document.querySelector("h1").innerHTML+=("ok2"+"<br>")
                        div.style["webkitTransform"] = "translate3d(0px,"+((cha*opotion.animate)+5)+"px,0)"
                    };
                }
            })
        }
        function moveCancel(e){
            var pos = e.changedTouches[0];
                if (pos.pageY - touch.sy<0) {
                    div.removeEventListener("touchmove",moveUp);
                    //document.querySelector("h1").innerHTML+=(pos.pageY - touch.sy+"<br>")
                };
        }
        div.addEventListener("touchmove",moveCancel,false)
        div.addEventListener("touchstart",function(e){
            var pos = e.changedTouches[0];
            touch.sTime = new Date().getTime();
            touch.sx = pos.pageX;
            touch.sy = pos.pageY;
            if (window.scrollY == 0) {
                //document.querySelector("h1").innerHTML+=("OK"+"<br>")
                div.addEventListener("touchmove",moveUp,false)
            };
            console.log("touch")
        })
        div.addEventListener("touchend",function(e){//注册捕获事件为的是取消在滑动中的任何事件
            if (moveing) {//在滑动中取消所有事件
                e.stopImmediatePropagation()
            };
            endback && endback.call(null,touch)
            refrech = true;
            div.removeEventListener("touchmove",moveUp)
            window.cancelAnimationFrame(window.re);
            window.cancelAnimationFrame(window.moving);
            div.style["webkitTransition"] ="all .3s ease";
            div.style["webkitTransform"] = "translate3d(0px,"+0+"px,0)";
           setTimeout(function(){
                moveing = false;
                refrech = false;
                div.style["webkitTransition"] = ""
           },300)
        },true)
    }
    window.initUpdate = init
}());
/*
  * @param {HTMLElement} 滑动的 dom
  * @param {function} 滑动中的callback(point)
  * @param {function} 滑动结束的callback(point)
*/
initUpdate(document.querySelector("div"),function(point){
    console.log(point)
},function(point){
    console.log("end")
},{animate:0.3})