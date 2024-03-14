<template>
  <div class="router-page">
    <ContentHeader :pageName="'技能'" :pageTitle="'掌握/了解的技能'">
      <template #icon>
        <CheckOutlined :style="$iconStyle" />
      </template>
      <template #infoText>
        <div>
          以下是我所掌握/了解的一些技能，啊是服务国庆放假无情剑客几位前辈可前往按时发噶沙司给我且歌且舞.
        </div>
      </template>
    </ContentHeader>
    <div class="skill-list">
      <a-collapse accordion v-model:activeKey="activeKey">
        <a-collapse-panel
          :key="index"
          :header="item.skillType"
          v-for="(item, index) in skillList"
        >
          <a-collapse :bordered="false">
            <a-collapse-panel
              :key="chi.skillName + chiIndex"
              :header="chi.skillName"
              v-for="(chi, chiIndex) in item.children"
            >
              <p style="margin: 0">{{ chi.describe }}</p>
            </a-collapse-panel>
          </a-collapse>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CheckOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";

const activeKey = ref(0);

interface SkillChildren {
  skillName: string;
  describe: string;
}
interface SkillList {
  skillType: string;
  children: Array<SkillChildren>;
}
const skillList = ref<Array<SkillList>>([
  {
    skillType: "编程语言",
    children: [
      {
        skillName: "JAVASCRIPT",
        describe:
          "熟练掌握ES5、ES6语法、了解原型与原型链的区别、箭头函数与普通函数的区别、以及闭包等等...",
      },
      {
        skillName: "TYPESCRIPT",
        describe: "熟悉ts的类型约束，泛型、接口",
      },
      {
        skillName: "HTML5",
        describe: "熟练掌握页面布局，了解语义化标签以及作用",
      },
      {
        skillName: "CSS3",
        describe:
          "熟练掌握样式的布局，个人常用felx布局，了解动画与过渡效果，css预编译常用scss",
      },
    ],
  },
  {
    skillType: "框架",
    children: [
      {
        skillName: "VUE2.x",
        describe:
          "熟练掌握VUE2.x全家桶(VUEX、VUE-ROUTER),了解VUE2.x的响应式原理",
      },
      {
        skillName: "VUE3.x",
        describe:
          "熟悉VUE3.x的组合式api，以及script setup语法糖写法，了解VUE3.x的响应式原理，了解pina状态管理工具",
      },
      {
        skillName: "uniapp",
        describe: "熟悉uniapp开发微信小程序，了解uniapp常用的一些api",
      },
      {
        skillName: "Express",
        describe:
          "了解一些基础的使用，比如:连接数据库、进行接口的编写(本项目博客相关内容接口皆由Express完成)",
      },
    ],
  },
  {
    skillType: "UI组件库",
    children: [
      {
        skillName: "Element-ui",
        describe: "常用于后台管理系统(非常熟悉)",
      },
      {
        skillName: "Ant Design Vue",
        describe: "本项目就使用了少量的Ant Design Vue组件",
      },
      {
        skillName: "uView",
        describe: "搭配uniapp进行微信小程序的开发",
      },
    ],
  },
  {
    skillType: "其它",
    children: [
      {
        skillName: "MySql",
        describe:
          "会一些常用的spl语句，例如查询、更新、删除（本项目的博客相关内容皆为数据库内容）",
      },
    ],
  },
]);
</script>
<style lang="scss" scoped>
.skill-list {
  padding-bottom: 15px;
}
:deep(.ant-collapse-header-text, .ant-collapse-expand-icon) {
  color: var(--primary-color);
}
:deep(.ant-collapse-content, .ant-collapse-borderless) {
  background-color: transparent;
}
</style>
