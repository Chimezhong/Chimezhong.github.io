import _ from "lodash";
/* 此文件是为了增加鼠标移动的样式 */
function init() {
  //需要创建一个点元素
  const point = document.createElement("div");
  //样式
  point.className = "mouse-point mouse-sty";
  point.id='mousePoint'//设置一个id方便后续获取这个节点
  //放入到body中
  document.body.appendChild(point);

  //创建外层园
  const garden = document.createElement("div");
  garden.className = "garden mouse-sty";
  garden.id='mouseGarden'//设置一个id方便后续获取这个节点
  //放入到body中
  document.body.appendChild(garden);

  //跟随鼠标移动
  document.addEventListener(
    "mousemove",
    //节流函数（16ms正好是一帧）
    _.throttle(function (event) {
      // 获取鼠标的坐标
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      //用transform来改变x和y的位置，再使用transition会比使用定位的left和top更加平滑
      point.style.transform = `translate(${mouseX}px,${mouseY}px)`;
      garden.style.transform = `translate(${mouseX}px,${mouseY}px)`;
    }, 16)
  );
}
init();
