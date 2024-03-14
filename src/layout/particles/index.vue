<template>
  <!--引入粒子特效-->
  <div>
    <vue-particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :options="particlesOptions"
    />
  </div>
</template>
<script setup lang="ts">
/* ts类型 */
import type { Engine } from "tsparticles-engine";
/* 加载星星粒子的插件包 */
import { loadStarsPreset } from "tsparticles-preset-stars";
const particlesOptions = {
  background: {
    color: "none",//不需要自带的背景颜色
  },
  preset: "stars",//形状。星星
};
async function particlesInit(engine: Engine): Promise<void> {
  await loadStarsPreset(engine);
}
</script>
