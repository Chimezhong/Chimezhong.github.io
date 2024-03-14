<template>
  <!-- 开场动画节点 -->
  <div class="curtain" ref="curtain" v-if="curtainShow">
    <div class="curtain-left" ref="animationEl"></div>
    <div class="curtain-right"></div>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from "vue";
/* 开场动画节点显示与隐藏 */
const curtainShow = ref(true);
/* css中自定义属性所在的节点 */
const curtain = ref();
/* 执行动画的节点,(这里我们随便取其中一个就行，伪元素上的动画也能监听到)*/
const animationEl = ref();
/* 监听动画结束的回调函数 */
function animationEndHandler() {
  /* 需要将左右两个盒子的宽度设置为0,直接修改css中的自定义属性 */
  curtain.value.style.setProperty("--box-width", "0");
  // /* 最后卸载这个监听事件 */
  animationEl.value.addEventListener("animationend", animationEndHandler);
}
/* 监听过渡结束 */
function transitionendHandel() {
  /* 删除整个节点 */
  curtainShow.value = false;
}
onMounted(() => {
  /* 监听这个节点的动画结束事件 */
  animationEl.value.addEventListener("animationend", animationEndHandler);
  /* 监听这个节点的过渡结束事件 */
  animationEl.value.addEventListener("transitionend", transitionendHandel);
});
</script>

<style lang="scss" scoped>
.curtain {
  position: absolute;
  inset: 0;
  background-color: transparent;
  display: flex;
  z-index: 999;

  --box-width: 50%;
  --animation-name: "elongate";

  /* 两个左右盒子的宽度 */
  .curtain-right,
  .curtain-left {
    position: absolute;
    top: 0;
    width: var(--box-width);
    height: 100%;
    background-color: #000;
    transition: width 0.3s ease-in-out;
  }
  .curtain-left {
    left: 0;
  }
  .curtain-right {
    right: 0;
  }
  .curtain-left::after,
  .curtain-right::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 50%;
    width: 1px;
    border-radius: 1px;
    height: 0px;
    transform: translate(+50%, 0%);
    background-color: #fff;
    z-index: 11;
    animation: elongate 1.5s;
  }
  .curtain-right::after {
    top: 50%;
    left: 0;
    transform: translate(-50%, 0%);
  }
  @keyframes elongate {
    45% {
      height: 15%;
      opacity: 1;
    }
    100% {
      height: 48%;
      opacity: 0;
      /* 此时宽度还在，会造成横向滚动态条，直接隐藏这个元素 */
      display: none;
    }
  }
}
</style>
