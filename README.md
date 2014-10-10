update.js
======
下拉刷新，可以定制。模拟APP。
/*
  * @param {HTMLElement} 滑动的 dom
  * @param {function} 滑动中的callback(point)
  * @param {function} 滑动结束的callback(point)
*/
initUpdate(element,function(point){
    console.log(point)
},function(point){
    console.log("end")
},{animate:0.3})
