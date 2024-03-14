//解决vue3全局定义方法或者变量时，ts找不到属性或者方法的解决办法
import { ComponentCustomProperties } from "@vue/runtime-core";
import type { StyleValue } from "ant-design-vue";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $iconStyle: StyleValue; // 这里填类型
  }
}

// 必须导出，才能在其他文件中使用
export default ComponentCustomProperties;
