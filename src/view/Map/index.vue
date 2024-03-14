<template>
  <div class="router-page">
    <ContentHeader :pageName="'地图'" :pageTitle="'地图组件'">
      <template #icon>
        <GlobalOutlined :style="{ color: '#b4d700', paddingRight: '5px' }" />
      </template>
      <template #infoText>
        <div>地图组件，可以实现快速导航以及路线规划</div>
      </template>
      <template #symbol>!</template>
    </ContentHeader>
    <div class="search">
      <a-form
        :model="mapFrom"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="开始位置"
          name="start"
          :rules="[{ required: true, message: '请输入开始位置!' }]"
        >
          <mapSelect
            v-model:searchKey="mapFrom.start"
            :type="'start'"
            @changeCenterAndMarker="changeCenterAndMarker"
          />
        </a-form-item>
        <a-row :gutter="32">
          <a-col :span="20">
            <a-form-item
              label="终点位置"
              name="end"
              :rules="[{ required: true, message: '请输入终点位置!' }]"
            >
              <mapSelect
                v-model:searchKey="mapFrom.end"
                :type="'end'"
                @changeCenterAndMarker="changeCenterAndMarker"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-button html-type="submit">开始导航</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="map-tainer">
      <el-amap :center="center" :zoom="zoom" @init="init">
        <!-- 放大缩小 -->
        <el-amap-control-tool-bar :visible="true"></el-amap-control-tool-bar>
        <!-- 旋转 -->
        <el-amap-control-control-bar
          :visible="true"
        ></el-amap-control-control-bar>
        <!-- 定位 -->
        <el-amap-control-geolocation
          :visible="true"
          @complete="getLocation"
          :offset="[20, 100]"
        />
        <!-- 比列尺 -->
        <!-- <el-amap-control-scale :visible="true"></el-amap-control-scale> -->
      </el-amap>
      <div id="panel"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import mapSelect from "./mapSelect.vue";
import { GlobalOutlined } from "@ant-design/icons-vue";
import { ref, reactive } from "vue";
import { arraysAreEqual } from "@/utils/commonThod";
const zoom = ref(14); //缩放级别范围
const center = ref<Array<number>>([104.053182, 30.685341]); //经纬度
let currentMapInstance = ref(); //存储当前地图实列，后续可以向这个实列中添加标记
const markers = ref<Array<any>>([]); //标记点的存储变量，后续会用它进行删除指定标记点
//记录上一次的标记点信息（当前位置、起始位置、重点位置）
let lastMarkerInfo: any = {
  lastNow: null, //上一次的当前经纬度
  lastStart: null, //上一次的开始的经纬度
  lastEnd: null, //上一次的结束经纬度
};
//地图初始化的回调
function init(map: any) {
  //创建一个标记点
  const marker = new AMap.Marker({
    position: center.value,
  });
  //鼠标经过点显示的文字
  marker.setTitle("您的位置");
  //标记点旁白的节点
  marker.setLabel({
    direction: "right", //在点的哪一个位置
    offset: new AMap.Pixel(5, 0), //设置文本标注偏移量
    content: "<div class='markerInfo'>您的位置</div>", //设置文本标注内容
  });
  //往地图实列中添加这个点标记的位置
  map.add(marker);
  //记录一下当前位置的标记点经纬度
  lastMarkerInfo.lastNow = center.value;
  markers.value.push(marker);
  //将地图实列存储到currentMapInstance数据中
  currentMapInstance.value = map;
}

//表单类型接口
interface MapFrom {
  start: string | null;
  end: string | null;
}
//起始位置的表单
const mapFrom = reactive<MapFrom>({
  start: null,
  end: null,
});
//表单校验通过,规划路线
let driving: any = null;
const onFinish = () => {
  //清除所有点标记
  currentMapInstance.value.clearMap();

  //清空之前的导航信息
  if (driving) {
    driving.destroy(); //清除导航路线
  }

  //起始点的位置
  const path = [lastMarkerInfo.lastStart, lastMarkerInfo.lastEnd];
  currentMapInstance.value.plugin("AMap.DragRoute", function () {
    driving = new AMap.DragRoute(
      currentMapInstance.value,
      path,
      AMap.DrivingPolicy.LEAST_FEE
    ); //构造拖拽导航类
    driving.search(); //查询导航路径并开启拖拽导航
  });
};
//表单校验失败
const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

/* 获取当前定位 */
function getLocation(e: any) {
  console.log("getLocation: ", e);
}

/* 改变地图中心点，并标记 */
const changeCenterAndMarker = (location: Array<number>, type: string) => {
  //起始位置发生改变，先将原来的标记点删除，再进行新增标记点
  deleteMarder(
    type === "start" ? lastMarkerInfo["lastStart"] : lastMarkerInfo["lastEnd"]
  );

  //每次先记录上一次的经纬度和type类型
  type === "start"
    ? (lastMarkerInfo["lastStart"] = location)
    : (lastMarkerInfo["lastEnd"] = location);

  //将地图定位到选中的地址位置去
  center.value = location;

  //新增标记点
  addMarker(location, type);
};
/* 根据经纬度新增标记点 */
const addMarker = (location: Array<number>, type: string) => {
  // 创建一个 Icon
  var markerIcon = new AMap.Icon({
    // 图标尺寸
    size: new AMap.Size(25, 34),
    // 图标的取图地址
    image: "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png", //精灵图
    // 图标所用图片大小
    imageSize: new AMap.Size(135, 40),
    // 图标取图偏移量
    imageOffset:
      type === "start" ? new AMap.Pixel(-9, -3) : new AMap.Pixel(-95, -3),
  });
  const marker = new AMap.Marker({
    //经纬度
    position: location,
    //marker的图标
    icon: markerIcon,
    //偏移量
    offset: new AMap.Pixel(-13, -30),
  });
  markers.value.push(marker); //记录标记点
  currentMapInstance.value.add(marker); //往地图中添加标记
};
/* 删除指定标记点 */
const deleteMarder = (markerLocation: Array<number>) => {
  if (!markerLocation || !markerLocation.length) return; //说明上一次没有数据，不需要删除标记点
  //利用存储的标记点数组，找到上一次的经纬度相同的数据，然后用这个实列进行删除标记点
  const lastMarkerInstance = markers.value.find((item) =>
    arraysAreEqual(item._position, markerLocation)
  );
  lastMarkerInstance.setMap(null); //清除上一次的标记点实列
};
</script>
<style lang="scss" scoped>
.map-tainer {
  width: 100%;
  height: 400px;
}
:deep(.ant-btn-default) {
  background-color: #b4d700;
  color: #1d1c22;
}
:deep(.markerInfo) {
  color: #f00;
}
:deep(.amap-marker-label) {
  border-color: #b4d700;
  border-radius: 5px;
}
:deep(.amap-container) {
  border-radius: 20px;
}
</style>
