<template>
  <header class="header">
    <div class="header-container">
      <a-row>
        <a-col :span="8">
          <img src="../assets/img/logo.png" alt="logo" class="logo" />
        </a-col>
        <a-col :span="16">
          <div class="inner-header">
            <div class="inner-left">
              <h3>
                <a>首页</a>
              </h3>
              <h3>
                <a>
                  <span ref="textRef"></span>
                  <span class="text-g">!</span>
                </a>
              </h3>
            </div>
            <div class="inner-right" ref="innerRight">
              <div class="chose-thems" @click="changeTheme" v-mouseStyle>
                <div class="sum moon" ref="sumOrMoon"></div>
              </div>
              <div class="wd-icon-box phone-hover">
                <phone-outlined class="icon-phone" :rotate="90" />
              </div>
              <div class="wd-icon-box active" @click="handelMenu">
                <div class="nav-menu">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </header>
</template>

<script setup lang="ts">
/* 引入图标组件 */
import { PhoneOutlined } from "@ant-design/icons-vue";
import { ref, onMounted } from "vue";
//使用pina中的用户模块
import userInfo from "@/store/user";
const store = userInfo();
//先获取到文字的节点
const textRef = ref<HTMLElement | null>();
/* 处理文字一个一个消失 */
function textNone() {
  const text = "欢迎来到我的博客";
  textRef.value!.innerText = text;
  let index = 8; //从第八个开始,每五秒减一，直到===0的时候，重置为8
  let timer: any = null; //定时器
  function timerStart() {
    return setInterval(() => {
      if (timer && index === 8) {
        //如果定时器存在并且index===8的时候说明一个完成的循环已经结束了，需要暂停一秒再执行
        clearInterval(timer);
        setTimeout(() => {
          timer = timerStart();
        }, 1000);
      }
      textRef.value!.innerText = text.substring(0, index);
      if (index === 0) {
        index = 8;
      } else {
        index--;
      }
    }, 150);
  }
  timer = timerStart();
}
onMounted(() => {
  textNone();
});

const sumOrMoon = ref<HTMLElement | null>();
const innerRight = ref<HTMLElement | null>();
/* 切换主题颜色 */
function changeTheme() {
  /* 修改主题颜色 */
  // 获取根元素
  const root = document.documentElement;
  const newBackgroundColor =
    getComputedStyle(root).getPropertyValue("--color-dark");
  if (newBackgroundColor === "#1a191e") {
    // 切换成白色背景
    root.style.setProperty("--color-dark", "#fff");
    root.style.setProperty("--primary-color", "#000");
    //切换成太阳
    sumOrMoon.value!.className = "sum";
    innerRight.value!.style.setProperty("--primary-bg-light", "#b4d700");
    //电话的边框
    root.style.setProperty("--bg-dark-hover", "#E6E6E7");
    //菜单的颜色
    root.style.setProperty("--menu-color", "#000");
    //人物背景的颜色
    root.style.setProperty("--user-info-color", "#f6f6f6");
    /* 人物图标的背景颜色 */
    root.style.setProperty("--icon-bgc", "#FFF");
    /* 人物图标的li颜色 */
    root.style.setProperty("--icon-bgc-li", "#b4d700");
    /* 人物按钮颜色 */
    root.style.setProperty("--ciyao-color", "#A2A5B1");
    /* 标题文字黑色变白色 */
    root.style.setProperty("--color-white", "#000");
    /* 博客列表的背景颜色 */
    root.style.setProperty("--title-light", "#F6F6F6");
    /* 博客列表的after颜色 */
    root.style.setProperty("--blog-after", "rgba(29, 28, 34, 0.05)");
  } else {
    // 切换成黑色背景
    root.style.setProperty("--color-dark", "#1a191e");
    root.style.setProperty("--primary-color", "#a2a5b1");
    //切换成月亮
    sumOrMoon.value!.className = "moon";
    innerRight.value!.style.setProperty(
      "--primary-bg-light",
      "rgba(255, 255, 255, 0.1)"
    );
    //电话的边框
    root.style.setProperty("--bg-dark-hover", "rgba(255, 255, 255, 0.1)");
    //菜单的颜色
    root.style.setProperty("--menu-color", "#b4d700");
    //人物背景的颜色
    root.style.setProperty("--user-info-color", "#1E1E22");
    /* 人物图标的背景颜色 */
    root.style.setProperty("--icon-bgc", "rgba(255,255,255,0.05)");
    /* 人物图标的li颜色 */
    root.style.setProperty("--icon-bgc-li", "rgba(255,255,255,0.05)");
    /* 人物按钮颜色 */
    root.style.setProperty("--ciyao-color", "#FFF");
    /* 标题文字黑色变白色 */
    root.style.setProperty("--color-white", "#fff");
    /* 博客列表的背景颜色 */
    root.style.setProperty("--title-light", "#1d1c22");
    /* 博客列表的after颜色 */
    root.style.setProperty("--blog-after", "rgba(255,255,255,0.05)");
  }
}

/* 打开或者关闭菜单 */
function handelMenu() {
  store.changeMenuStatus();
}
</script>

<style scoped lang="scss">
.header {
  position: relative;
  padding: 15px 0 0;
  height: 80px;

  .header-container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 1200px;
    max-width: 100%;

    .logo {
      width: 60px;
      height: 60px;
      display: block;
      margin-left: -10px;
    }

    .inner-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .inner-left {
        display: flex;
        align-items: center;
        gap: 20px;

        h3:first-child {
          margin-right: 40px;
        }
        h3 {
          font-size: 16px;
          line-height: 21.6px;
          font-weight: 700;
          a {
            color: var(--primary-color);
            text-decoration: none;
            transition: all 0.3s ease-in-out;

            .text-g {
              color: #b4d700;
              transition: all 0.3s ease-in-out;
              animation: flicker 0.7s infinite; //0.7s执行完动画，infinite无限循环
            }

            @keyframes flicker {
              0% {
                color: var(--title-light);
              }
              100% {
                color: var(--primary-bg-light);
              }
            }
          }
        }
      }
      .inner-right {
        display: flex;
        align-items: center;
        gap: 20px;

        --primary-bg-light: rgba(255, 255, 255, 0.1); // #b4d700;

        .chose-thems {
          font-size: 20%;
          position: relative;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          transition: all 500ms ease-in-out;
          background: var(--primary-bg-light);
          overflow: hidden;

          .sum {
            position: absolute;
            display: block;
            border-radius: 50%;
            top: 15px;
            left: 15px;
            transform: rotate(0deg);
            transition: all 400ms ease-in-out;
            width: 7em;
            height: 7em;
            background: var(--bg-dark-hover);
            box-shadow: 3em 3em 0 5em #fff inset, 0 -5em 0 -2.7em #fff,
              3.5em -3.5em 0 -3em #fff, 5em 0 0 -2.7em #fff,
              3.5em 3.5em 0 -3em #fff, 0 5em 0 -2.7em #fff,
              -3.5em 3.5em 0 -3em #fff, -5em 0 0 -2.7em #fff,
              -3.5em -3.5em 0 -3em #fff;
          }
          .moon {
            position: absolute;
            border-radius: 50%;
            transition: all 400ms ease-in-out;
            top: 4px;
            left: 21px;
            transform: rotate(92deg);
            width: 25px;
            height: 25px;
            background: transparent;
            box-shadow: 2.5em 2.5em 0 0 #b4d700;
          }
        }

        .wd-icon-box {
          border: 1px solid #e6e6e7;
          border-color: var(--bg-dark-hover);
          border-radius: 5px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          .icon-phone {
            font-size: 22px;
            color: #b4d700;
          }
        }
        .phone-hover:hover {
          background-color: var(--primary-bg-light);
          .icon-phone {
            color: #fff;
          }
        }

        .active {
          border: 0;
          background-color: var(--primary-bg-light);

          .nav-menu {
            position: relative;

            span::before {
              position: absolute;
              top: -8px;
              display: block;
              content: "";
              width: 90%;
              height: 100%;
              background-color: var(--menu-color);
            }
            span {
              position: relative;
              display: block;
              width: 18px;
              height: 2px;
              background-color: var(--menu-color);
              border-radius: 8px;
              margin: 8px 0 6px;
            }
            span::after {
              position: absolute;
              bottom: -8px;
              display: block;
              content: "";
              width: 70%;
              height: 100%;
              background-color: var(--menu-color);
            }
          }
        }
      }
    }
  }
}
</style>
