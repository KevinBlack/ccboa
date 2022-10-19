/**
 * create by zx on 2020-3-24 17:05
 * 类注释：单页长时间不操作就会自动退出
 * 备注：
 */
var lastTime = new Date().getTime()
var currentTime = new Date().getTime()
var timeOut = 10 * 1000; //设置超时时间

window.onload = function () {
  localStorage.setItem("lastTime", new Date().getTime())
  window.document.onmousedown = function () {
    localStorage.setItem("lastTime", new Date().getTime())
  }
};

function checkTimeout() {
  currentTime = new Date().getTime();	//更新当前时间
  lastTime = parseInt(localStorage.getItem("lastTime"));
  if (currentTime - lastTime > timeOut) { //判断是否超时
    console.log("超时");
    clearInterval(interval);//停止
  }
}

/* 定时器 */
var interval = window.setInterval(checkTimeout, 2 * 1000);
