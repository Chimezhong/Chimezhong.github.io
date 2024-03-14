<template>
  <section>
    <div class="tf-container">
      <div class="wrapper">
        <div class="wrap-home-left">
          <!-- 头像 -->
          <div class="avatar">
            <img src="../assets//img//touxiang.jpg" />
          </div>
          <div class="profile">
            <!-- 招呼语 -->
            <div class="top">
              <h3 v-mouseStyle>HY!I'M ZHONGSHIHONG</h3>
              <div class="text-show">
                <span ref="textShow"></span>
                <span class="shu shu-animation" ref="shu">|</span>
              </div>
            </div>
            <div class="content">
              <p class="mail" v-mouseStyle>fallzhong@163.com</p>
              <p class="">themeforest Wedo portfolio</p>
              <ul class="wd-social-icon m-top">
                <li v-mouseStyle>
                  <GithubOutlined :style="iconStyle" />
                </li>
                <li v-mouseStyle>
                  <WechatOutlined :style="iconStyle" />
                </li>
                <li v-mouseStyle>
                  <Html5Outlined :style="iconStyle" />
                </li>
                <li v-mouseStyle>
                  <AntCloudOutlined :style="iconStyle" />
                </li>
              </ul>
            </div>
            <div class="bottom">
              <div class="custom-btn btn-top" v-mouseStyle>
                Hire Me!
                <SelectOutlined
                  :style="{ marginLeft: '5px' }"
                  class="hover-icon"
                />
              </div>
              <div class="custom-btn btn-bottom" v-mouseStyle>
                Download CV
                <SelectOutlined
                  :style="{ marginLeft: '10px' }"
                  class="hover-icon"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-home-right">
          <!-- 路由的内容页面 -->
          <router-view v-slot="{ Component }">
            <transition name="router">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>

      <MyDialog />
    </div>
  </section>
</template>

<script setup lang="ts">
/* 引入弹出组件 */
import MyDialog from "@/components/MyDialog/index.vue";
/* 引入图标组件 */
import {
  GithubOutlined,
  WechatOutlined,
  Html5Outlined,
  AntCloudOutlined,
  SelectOutlined,
} from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
const iconStyle = ref({ fontSize: "20px" });

/* 获取到文字一点一点展开一点一点消失的节点 */
const textShow = ref<HTMLElement | null>();
/* 获取到竖线 */
const shu = ref<HTMLElement | null>();
/* 执行函数 */
function textAnShow() {
  const textArr = ["Element And-Design", "Vue2.x Vue3.x Uniapp Express"];
  //第一次进行删除
  AnimationFun(
    textShow.value!,
    textArr[0], //默认就是0，从第一个开始
    true,
    textArr
  );
}
/* 动画效果：
    给定一个数组<字符串>
    初始化先增加，增加完毕后会进行删除
    删除完毕后会变为新增字符串进行新增再删除，依次类推
 */
function AnimationFun(
  dom: HTMLElement,
  str: string,
  /* false代表删除，true代表新增 */
  delOrAdd: boolean,
  /* 原始数组 */
  array: Array<string>
): void {
  let endIndex = delOrAdd ? 0 : str.length;
  /* 执行定时器进行删除或者新增 */
  let timer: any = null;
  /* 去除竖线闪动的效果 */
  shu.value!.className = "shu";
  function getNextStr(): void {
    /* 如果是删除才取下一项进行新增，否则一个用当前项进行删除 */
    let nextStr = str;
    if (!delOrAdd) {
      /* 如果原数组没有下一项就重置为第一项 */
      const curIndex = array.findIndex((item) => item === str);
      nextStr = array[curIndex + 1] ? array[curIndex + 1] : array[0];
    }
    //如果当前是新增那么下一次就是删除，依次类推
    AnimationFun(dom, nextStr, !delOrAdd, array);
  }
  timer = setInterval(() => {
    //说明本次定时器调用完毕
    if ((delOrAdd && endIndex === str.length) || (!delOrAdd && endIndex < 0)) {
      //清除定时器
      clearInterval(timer);

      //将竖线的闪动动画加上
      shu.value!.className = "shu shu-animation";

      //递归调用，如果是删除就不需要停顿，否则需要停顿一秒
      if (!delOrAdd) return getNextStr();
      setTimeout(() => {
        getNextStr();
      }, 1000);
    }
    //截取之后 重新赋值文字
    dom.innerText = str.substring(0, endIndex);
    //新增就++，删除就--
    delOrAdd ? endIndex++ : endIndex--;
  }, 100);
}

onMounted(() => {
  textAnShow();
});
</script>

<style lang="scss">
/* 这个类型代表这，你组建挂载之前，在哪个位置 */
.router-enter-from {
  opacity: 0.1;
  transform: translateY(45%);
}
/* 这个类型代表这，你组建挂载之后，在哪个位置 */
.router-enter-to {
  opacity: 1;
  transform: translateY(0);
}
/* 组件挂载前后的位置我们确定了，那么它中间的过程，希望它是多少秒完成？什么样的方式完成？ */
.router-enter-active {
  transition: 0.6s ease-in-out;
}

@keyframes opacityAnimation {
  50% {
    opacity: 0;
  }
}
/*
  这个循环方法很特别
  首先将将这个圆定位在父元素中心点
  计算中心点到父元素边需要多少像素，就使用translate移动多少像素，也就是将这个after放在了父元素的边上
  然后从0旋转到360度，也就是整旋转一圈，此时旋转会按照它原本的位置(rotate旋转会按照初始化的位置标记为中心点)，也就是父元素的中心点进行旋转，只是在旋转的过程中将它的位置移动到了边上
  */
@keyframes rotateAnimation {
  0% {
    //开始的时候旋转为0度，将它的位置放在-85px也就是父元素的边上
    transform: rotate(0deg) translate(-85px);
  }
  100% {
    //从0旋转360度，结束后它的位置依然需要85px，不然就回到原点(父元素的中心点)
    transform: rotate(360deg) translate(-85px);
  }
}
.tf-container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
  width: 1200px;
  max-width: 100%;

  .wrapper {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    border: 1px solid var(--primary-bg-light);
    border-radius: 20px;
    padding: 35px 50px;
    padding-right: 52px;
    padding-top: 49px;
    overflow: hidden;
    margin-top: 8px;
    max-height: var(--max-height);
    .wrap-home-left {
      min-width: 35%;
      background-color: var(--user-info-color);
      transition: all 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 20px;
      padding: 48px 0;
      overflow: auto;
      max-height: var(--max-height);

      &::-webkit-scrollbar {
        display: none;
      }

      .avatar {
        width: 170px;
        height: 170px;
        position: relative;
        img {
          border-radius: 100px;
          position: relative;
          max-width: 100%;
          height: auto;
          border: 0;
          vertical-align: middle;
        }
      }
      .avatar::after {
        content: "";
        width: 16px;
        height: 16px;
        background-color: var(--primary-bg-light);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border-radius: 50%;
        animation: rotateAnimation 6s linear infinite; //linear匀速，infinite无限循环
      }

      .profile {
        margin: 25px 0 0;

        .top {
          h3 {
            color: var(--primary-color);
            font-size: 24px;
            line-height: 28.8px;
            text-align: center;
            margin-bottom: 3px;
            transition: all 0.3s ease-in-out;
          }
          h3:hover {
            color: #b4d700;
          }

          .text-show {
            color: var(--primary-color-no);
            text-align: center;

            .shu {
              font-weight: 500;
              font-size: 14px;
              line-height: 30px;
              margin-left: 2px;
            }
            .shu-animation {
              opacity: 1;
              /* 开始透明度为1 百分之50的时候透明度为0 最后动画结束 透明度又为1 无限循环 */
              animation: opacityAnimation 0.7s infinite;
            }
          }
        }

        .content {
          margin: 30px 0 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .mail {
            color: #a2a5b1;
            text-decoration: underline;
            font-size: 14px;
            text-align: center;
            margin: 0;
          }
          p {
            color: #b4d700;
            font-size: 14px;
            text-align: center;
          }
          .wd-social-icon.m-top {
            margin-top: 40px;
          }
          .wd-social-icon {
            display: flex;
            align-items: center;
            gap: 10px;

            li {
              background-color: var(--icon-bgc);
              border-radius: 5px;
              width: 45px;
              height: 45px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              color: var(--primary-color);
              transition: all 0.3s ease-in-out;
              span {
                color: var(--primary-color-no);
              }
            }
            li:hover {
              background-color: var(--icon-bgc-li);
              span {
                color: var(--menu-color);
              }
            }
          }
        }

        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          .custom-btn {
            font-size: 14px;
            width: 210px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            transition: all 0.3s ease-in-out;
            font-weight: 700;
          }
          .hover-icon {
            transition: all 0.3s ease-in-out;
          }
          .custom-btn:hover {
            background-color: #b4d700;
            color: #1d1c22;
            .hover-icon {
              transform: translate(5px, -5px);
              color: #1d1c22;
            }
          }
          .btn-top {
            background-color: #b4d700;
            color: #1d1c22;
          }
          .btn-bottom {
            background-color: var(--icon-bgc);
            color: var(--ciyao-color);
            transition: all 0.3s ease-in-out;
            .hover-icon {
              color: var(--ciyao-color);
            }
          }
        }
      }
    }

    .wrap-home-right {
      width: 0;
      flex: 1;
      max-height: var(--max-height);
      margin-left: 30px;
    }
  }
}

@media screen and (max-width: 862px) {
  .tf-container {
    .wrapper {
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      .wrap-home-left {
        width: 100%;
        max-height: none;
        overflow: unset;
      }

      .wrap-home-right {
        max-height: none;
        .router-page {
          height: none;
          overflow: unset;
        }
      }
    }
  }
}
</style>
