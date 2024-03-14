<template>
  <div class="page-header">
    <div class="title-box">
      <div class="page-info">
        <slot name="icon"></slot>
        <span style="color: #b4d700; padding-right: 5px">Hi</span>
        <span style="color: #a2a5b1">{{ props.pageName }}</span>
      </div>
      <div class="page-title">
        {{ props.pageTitle }}<span><slot name="symbol"></slot></span>
      </div>
    </div>
    <div class="header-img" v-if="props.imgShow">
      <div class="zedang"></div>
      <img src="/src/assets/img/circle.svg" alt="" class="circle" />
      <img src="/src/assets/img/logo-2.png" alt="" class="logo-2" />
    </div>
  </div>
  <div class="info-text">
    <slot name="infoText"></slot>
  </div>
</template>
<script setup lang="ts">
/* 
  接收父组件传递的参数 
  不考虑类型可以直接使用
  defineProps(['propsA','propsB'])
  考虑类型
  defineProps({
    propsA:{type:String,required:true},
    propsB:{type:String}
  })
  使用ts泛型
  const props = defineProps<{
  foo: string
  bar?: number
  >()
  //需要添加默认值withDefaults(()=>{},{}),
  第一个参数就是原来的defineProps<T>
  第二个参数就是你哪些参数需要默认值
*/
const props = withDefaults(
  defineProps<{
    pageName: string;
    pageTitle: string;
    imgShow?: boolean;
  }>(),
  {
    imgShow: () => true,
  }
);
</script>

<style lang="scss">
.page-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title-box {
    .page-info {
      border: 1px solid var(--bg-dark-hover);
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 17px;
      border-radius: 100px;
      cursor: pointer;
      margin-bottom: 8px;
    }
    .page-title {
      font-size: 62px;
      line-height: 74.4px;
      color: var(--color-white);
      span {
        color: #b4d700;
      }
    }
  }

  .header-img {
    text-align: center;
    position: relative;
    margin-right: 32px;
    margin-top: 6px;
    margin-bottom: -9px;

    .zedang {
      width: 120%;
      height: 50%;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translate(-10px, 5px);
      background-color: var(--color-dark);
      z-index: 1;
    }

    @keyframes routeAnimat {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .circle {
      width: 120px;
      animation: routeAnimat 8s infinite linear;
    }

    .logo-2 {
      position: absolute;
      width: 90px;
      height: 70px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -40%);
      z-index: 2;
    }
  }
}
.info-text {
  color: var(--primary-color-no);
  font-size: 16px;
  line-height: 30px;
  margin-top: 8px;
  margin-bottom: 41px;

  div {
    margin-bottom: 15px;
  }
  div:last-child {
    margin: 0;
  }
}
</style>