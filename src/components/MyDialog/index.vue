<template>
  <transition
    name="fade"
    v-show="store.setMenuStatus"
    :duration="{ enter: 80, leave: 500 }"
  >
    <div class="my-dialog">
      <div class="left">
        <div class="logo">
          <img src="../../assets/img/logo.png" alt="logo" class="logo" />
        </div>
        <div class="text-info">
          <div class="info-item">
            <span class="label">手机号码:</span>
            <h4 class="value">15397683742</h4>
          </div>
          <div class="info-item">
            <span class="label">邮箱地址:</span>
            <h4 class="value">fallzhong@163.com</h4>
          </div>
        </div>
      </div>
      <div class="center">
        <li v-for="item in liData" :key="item.name">
          <span
            @mouseenter="liHover"
            @mouseleave="liLeave"
            @click="goRouter(item.url)"
            :class="activeMenu === item.url ? 'active' : ''"
            >{{ item.name }}</span
          >
        </li>
      </div>
      <div class="right">
        <div class="text-icon">
          <div class="text-jump">
            <span>C</span>
            <span>L</span>
            <span>O</span>
            <span>S</span>
            <span>E</span>
          </div>
          <div class="close-icon" @click="closeMeun"></div>
        </div>
        <div class="icon-svg">
          <li>
            <GithubOutlined :style="iconStyle" />
          </li>
          <li>
            <WechatOutlined :style="iconStyle" />
          </li>
          <li>
            <Html5Outlined :style="iconStyle" />
          </li>
          <li>
            <AntCloudOutlined :style="iconStyle" />
          </li>
          <li>
            <SelectOutlined :style="iconStyle" />
          </li>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import {
  GithubOutlined,
  WechatOutlined,
  Html5Outlined,
  AntCloudOutlined,
  SelectOutlined,
} from "@ant-design/icons-vue";
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import userInfo from "@/store/user";
const store = userInfo();
const router = useRouter();
const routeInfo = useRoute();
const iconStyle = ref({ fontSize: "20px" });
const liData = ref([
  { name: "首页", url: "/index" },
  { name: "关于我", url: "/about" },
  { name: "地图", url: "/map" },
  { name: "技能", url: "/skill" },
  { name: "博客", url: "/blog" },
]);
function liHover(event: any) {
  //鼠标移入span，将span的before宽度设置为100%，此时before元素上没有left和right属性，css中默认就是left:0,宽度填满就是从左往右延申了
  event.target.style.setProperty("--spanBeforeWidth", "100%");
}
function liLeave(event: any) {
  //将right设置为0，这个时候定位在右边，宽度再设置0%，这个线条就会向右边缩减
  event.target.style.setProperty("--spanBeforePostionRight", "0");
  /* 移出的时候，将before的宽度设置为0 */
  event.target.style.setProperty("--spanBeforeWidth", "0%");

  //在过渡动画（transition: all 0.3s ease;）完毕的时候再将right设置为none，下一次进入的时候，就又是从左往右延申了
  setTimeout(() => {
    event.target.style.setProperty("--spanBeforePostionRight", "none");
  }, 300);
}
function closeMeun() {
  store.changeMenuStatus();
}

/* 当前是在哪一个路由 */
const activeMenu = computed(() => {
  return routeInfo.path;
});

/* 跳转路由 */
function goRouter(url: string): void {
  router.push(url);
  closeMeun();
}
</script>
<style scoped lang="scss">
/* 过渡效果 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}
.my-dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: auto;
  border-radius: 20px;
  height: calc(100vh - 80px - 80px);
  background-color: #b4d700;
  transition: all 0.5s ease 0s;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  z-index: 999; //比鼠标圆圈的层级高即可
  .left {
    width: 170px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .logo {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .text-info {
      .info-item {
        margin-top: 40px;
        .label {
          color: rgba(29, 28, 34, 0.6);
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .value {
          font-size: 24px;
          line-height: 29px;
          font-weight: 600;
          color: #1d1c22;
        }
      }
    }
  }
  .center {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    li {
      width: 120px;

      span {
        display: inline-block;
        position: relative;
        font-size: 28px;
        line-height: 29px;
        font-weight: 900;
        color: #1d1c22;
        cursor: pointer;
        --spanBeforeWidth: 0%;
        --spanBeforePostionRight: none;
      }
      span::before,
      .active::after {
        position: absolute;
        display: inline;
        bottom: -10px;
        right: var(--spanBeforePostionRight);
        content: "";
        width: var(--spanBeforeWidth);
        height: 2px;
        background-color: #000;
        transition: width 0.3s cubic-bezier(0.35, 0.7, 0.35, 1) 0s;
      }

      /* 路由高亮 */
      .active::after {
        right: 0;
        width: 100%;
      }
    }
  }
  .right {
    width: 220px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .text-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #1d1c22;
      font-family: "Bebas Neue", cursive;
      letter-spacing: 1em;
      font-size: 14px;
      line-height: 17px;
      cursor: pointer;

      .close-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
      }
      .close-icon::after,
      .close-icon::before {
        content: "";
        display: block;
        background-color: #000;
        width: 1px;
        height: 50px;
      }
      .close-icon::after {
        transform: rotate(137deg);
      }
      .close-icon::before {
        transform: rotate(45deg);
      }

      .text-jump {
        // 循环处理每个span元素
        @for $i from 1 through 5 {
          $animation-delay: 0.036s * $i; // 根据索引设置不同的延迟
          $transition-delay: 30ms * $i + 1ms;

          // 为每个span元素创建动画
          span:nth-child(#{$i}) {
            display: inline-block; //需要往y轴移动，所以需要改变盒子类型
            transition-duration: 0.5s; //过渡的持续时间
            transition-delay: $transition-delay; //过渡得延迟
            animation-duration: 0.6s; //动画持续时间
            animation-delay: $animation-delay; //动画延迟
          }
        }
        @keyframes jump {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-0.3em);
            opacity: 0.5;
          }

          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      }
    }

    .text-icon:hover {
      .close-icon {
        transform: scale(0.9) rotate(-90deg);
      }
      .text-jump {
        span {
          animation-name: jump;
        }
      }
    }

    .icon-svg {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      li {
        background-color: rgba(29, 28, 34, 0.05);
        border-radius: 5px;
        width: 45px;
        height: 45px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        transition: all 0.3s ease-in-out;
        span {
          color: rgba(29, 28, 34, 0.4);
        }
      }
      li:hover {
        cursor: pointer;
        background-color: #fff;
      }
    }
  }
}
</style>
