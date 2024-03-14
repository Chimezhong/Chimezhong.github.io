import { createApp } from "vue";
import "./style.css";
import App from "./App.vue"; //启动文件

//创建vue实列
const app = createApp(App);

//鼠标样式
import "@/utils/mouseStyle.js";

//粒子动画
import Particles from "vue3-particles";

//路由
import router from "./router/index.js";
import { pinia } from "./store/index.js"; //在这个文件中创建了pinia实列
import "./router/beforeRouter.js"; //执行路由拦截操作

//ui组件
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

//VueAMap:地图组件
import VueAMap, { initAMapApiLoader } from "@vuemap/vue-amap";
//地图的样式
import "@vuemap/vue-amap/dist/style.css";
//地图的初始化key
initAMapApiLoader({
  key: "dca21006730abebc3dd8c99f28fee674", //高德地图开发的key
  securityJsCode: "c5436f5fff74a8599cf7b6a5c0dd7f2f", //高德地图的密钥(在这里写不安全，推荐时nignx代理转发配置)，如果需要使用搜索地址的功能这个密钥就必须要
  // 插件集合 （插件按需引入）
  plugins: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
  ],
});

//全局组件
import ContentHeader from "@/components/ContentHeader/index.vue";

app.component("ContentHeader", ContentHeader);

//自定义指令
import directive from "./utils/directive/index.js"; // directive
//绑定到全局自定义指令中
directive(app);

//定义全局变量，ant-icon图标的样式
app.config.globalProperties.$iconStyle = {
  color: "#b4d700",
  paddingRight: "5px",
};

//挂载  pinia实列  路由实列
app.use(pinia).use(router).use(Antd).use(VueAMap).use(Particles).mount("#app");
