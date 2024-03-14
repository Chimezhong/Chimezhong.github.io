<template>
  <ContentHeader
    :pageName="'项目经历'"
    :pageTitle="'我的项目经历'"
    :imgShow="false"
  >
    <template #icon>
      <BarsOutlined :style="$iconStyle" />
    </template>
    <template #infoText>
      <div>
        爱好广泛况且我还高科技请问海口公交起火前往观看请我喝酒公开请问就会过去我看见过环球网看见欧文i七月哦亲舞蹈老师飞机哈卡拉斯科解放后.
      </div>
    </template>
  </ContentHeader>

  <div class="project-box">
    <div class="project-list" v-for="(item, index) in projectList" :key="index">
      <div class="year-company">
        <span class="company"> {{ item.company }} </span>
        <span class="year">
          {{ item.year }}
          <span class="now" v-if="item.now">(current)</span></span
        >
      </div>
      <div class="project-name" v-mouseStyle>{{ item.projectName }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { BarsOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

interface ProjectList {
  year: string;
  company: string;
  projectName: string;
  now: boolean;
}
const projectList = ref<Array<ProjectList>>([
  {
    year: "2023",
    company: "博客",
    projectName: "zsh博客",
    now: true,
  },
  {
    year: "2023",
    company: "民酒网",
    projectName: "民酒网设计管理系统",
    now: false,
  },
  {
    year: "2023",
    company: "民酒网",
    projectName: "民酒网商城",
    now: false,
  },
  {
    year: "2022",
    company: "民酒网",
    projectName: "民酒网会员系统",
    now: false,
  },
]);
</script>
<style lang="scss">
.project-box {
  .project-list {
    border: 1px solid var(--bg-dark-hover);
    border-radius: 10px;
    padding: 14.5px 28px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease-out 0s;
    &:hover {
      border-color: #b4d700;
    }

    .year-company {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 202px;
      margin-right: 68px;
      font-size: 16px;
      color: var(--primary-color-no);

      .company {
        margin-bottom: 10px;
      }

      .now {
        color: #b4d700;
      }
    }
    .project-name {
      font-weight: 700;
      font-size: 18px;
      color: var(--color-white);
      transition: all 0.3s ease-out 0s;
      &:hover {
        color: #b4d700;
      }
    }
  }
}
</style>
