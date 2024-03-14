<template>
  <!-- 粒子效果 -->
  <Particles />
  <!-- 头部 -->
  <Header />
  <!-- 内容区域 -->
  <Section />
  <!-- 底部 -->
  <Footer />
</template>
<script setup>
import Header from "./header.vue";
import Section from "./container.vue";
import Footer from "./footer.vue";
import Particles from "./particles/index.vue";
</script>
