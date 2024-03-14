/* 自定义指令 */
export default {
  mounted(el, binding, vnode) {
    //获取到原点
    const mousePoint = document.getElementById("mousePoint");
    //获取外层的园
    const mouseGarden = document.getElementById("mouseGarden");

    //鼠标移入的时候，需要改变鼠标点的大小
    el.addEventListener("mouseenter", function () {
      mousePoint.style.width = 80 + "px";
      mousePoint.style.height = 80 + "px";
      mousePoint.style.marginLeft = -50 + "px";
      mousePoint.style.marginTop = -50 + "px";
      mousePoint.style.opacity = 0.3;
      mouseGarden.style.visibility = "hidden";
      el.style.cursor='pointer'
    });

    //移出的时候需要变回原样
    el.addEventListener("mouseleave", function () {
      mousePoint.style.width = 8 + "px";
      mousePoint.style.height = 8 + "px";
      mousePoint.style.marginLeft = -5 + "px";
      mousePoint.style.marginTop = -5 + "px";
      mousePoint.style.opacity = 1;
      mouseGarden.style.visibility = "visible";
    });
  },
};
