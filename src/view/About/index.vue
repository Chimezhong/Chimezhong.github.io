<template>
  <div class="content router-page">
    <ContentHeader :pageName="'关于我'" :pageTitle="'自我介绍'">
      <template #icon>
        <UserOutlined :style="$iconStyle" />
      </template>
      <template #infoText>
        <div>
          啊手法和技巧很快就会放弃外国航空器文化况且我回家公开加强文化可攻击武器和可根据我回去空
          间换取我案说法切勿计划将其请问可根据后期维护感情危机和高科技请问哟i额u请我u却无法客户看上去价格和空气好搞快
        </div>
        <div>
          上课绯闻情妇况且我回家防空武器回家放弃我iu欧文i去哦给i加强我i好感全无和可根据前后文
          空间和感慨万千计划空间给我去海口叫我去韩国空军货物情况跟进和请问哈桑可是等级划分刻录机和顾客互动空手道解放和卢卡斯计划分为会发生
        </div>
      </template>
      <template #symbol>!</template>
    </ContentHeader>

    <div class="info-box">
      <div
        class="info-item"
        v-for="(item, index) in infoLIst"
        :key="index + item.label"
      >
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.value }}</div>
      </div>
    </div>

    <projectExperience />
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { reactive } from "vue";
import projectExperience from "./projectExperience.vue";
const infoLIst = reactive([
  {
    label: "姓名",
    value: "zhongzhong",
  },
  {
    label: "电话",
    value: "15397683742",
  },
  {
    label: "邮箱",
    value: "fallzhong@163.com",
  },
  {
    label: "经验",
    value: "2年",
  },
]);
</script>

<style lang="scss" scoped>
.content {
  .info-box {
    border: 1px solid var(--bg-dark-hover);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 222px;
    margin-bottom: 100px;
    .info-item {
      width: 50%;
      height: 50%;
      box-sizing: border-box;
      padding: 23px 30px;
      font-size: 18px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .label {
        width: 100%;
        color: var(--color-white);
        font-weight: 700;
      }
      .value {
        color: var(--primary-color-no);
      }
    }
    .info-item:nth-child(1n) {
      border-right: 1px solid var(--bg-dark-hover);
    }
    .info-item:nth-child(1),
    .info-item:nth-child(2) {
      border-bottom: 1px solid var(--bg-dark-hover);
    }
  }
}
</style>
