<template>
  <div class="home router-page">
    <div class="top-title">
      <div class="title">
        <span style="color: #b4d700; margin-right: 10px">Hi!</span>
        <span style="color: #a2a5b1">There I'm</span>
      </div>
      <div class="info">
        <span>{{ hellMesg.toUpperCase() }}</span>
      </div>
    </div>
    <div class="img-group">
      <div class="img-left">
        <div class="left-1">
          <div class="img-content" style="width: 30%" v-mouseStyle>
            <img src="../assets/img/javascript.png" alt="" />
          </div>
          <div class="img-content" style="width: 64%" v-mouseStyle>
            <img src="../assets/img/html5.png" alt="" />
          </div>
        </div>
        <div class="left-1">
          <div class="img-content" style="width: 80%" v-mouseStyle>
            <img src="../assets/img/vue.png" alt="" />
          </div>
          <div class="img-icon">
            <div class="img-content" v-mouseStyle>
              <img src="../assets/img/element-ui.png" alt="" />
            </div>
            <div class="img-content" v-mouseStyle>
              <img src="../assets/img/axios.png" alt="" />
            </div>
            <div class="img-content" v-mouseStyle>
              <img src="../assets/img/antd-vue.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="img-right">
        <div class="img-content" v-mouseStyle>
          <img src="../assets/img/css3.png" alt="" />
        </div>
        <div class="img-content" v-mouseStyle>
          <img src="../assets/img/node-express.png" alt="" />
        </div>
        <div class="img-content" v-mouseStyle>
          <img src="../assets/img/mysql.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const hellMesg = ref("I'm a frontend engineer this is my project.");
</script>
<style lang="scss" scoped>
.home {
  .top-title {
    margin-top: 23px;
    margin-bottom: 50px;
    .title {
      font-family: "Inter";
      font-weight: 400;
      font-size: 18px;
    }
    .info {
      margin-top: -3px;
      font-size: 62px;
      line-height: 82px;
      padding-right: 52px;
      font-weight: 900;
      color: var(--color-white);
    }
  }

  .img-group {
    display: flex;
    flex-wrap: wrap;
    .img-content {
      overflow: hidden;
      border-radius: 20px;
      position: relative;
      img {
        vertical-align: middle;
      }
    }
    .img-content::before {
      position: absolute;
      top: 0;
      left: -84%; //先让它看不见
      display: inline-block;
      content: "";
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 100%
      );
      transform: skewX(-25deg); //倾斜多少度
    }

    .img-content:hover::before {
      left: 150%; //先让它看不见
      transition: all 0.9s ease-in-out;
    }

    .img-left {
      width: 67%;

      .left-1 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;

        .img-icon {
          width: 15%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .img-content {
            width: 100%;
          }
        }
        .img-content {
          img {
            width: 100%;
          }
        }
      }
      .left-1:first-child {
        align-items: flex-end;
      }
      .left-1:last-child {
        margin-bottom: 15px;
      }
    }

    .img-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 30px;
      padding-bottom: 15px;

      .img-content {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
