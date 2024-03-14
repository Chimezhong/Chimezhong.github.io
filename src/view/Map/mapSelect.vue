<!-- 地址搜索下拉组件 -->
<template>
  <div>
    <a-select
      :value="props.searchKey"
      placeholder="请输入关键字"
      :filter-option="false"
      :not-found-content="fetching ? undefined : null"
      :default-active-first-option="false"
      :show-arrow="false"
      :options="optionData"
      show-search
      @search="searchOption"
      @change="searchKeyChange"
    >
      <template v-if="fetching" #notFoundContent>
        <a-spin size="small" />
      </template>
      <template #option="{ address, name, type, tel, location }">
        <div class="location-info" :key="String(location.KL) + location.KT">
          <div class="name">
            {{ name }}
            <a-tag color="cyan">{{
              type ? type.split(";")[0] : "暂无信息"
            }}</a-tag>
          </div>
          <span class="label">{{ address }}</span>
          <span class="tel">{{ tel }}</span>
        </div>
      </template>
    </a-select>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { debounce } from "lodash-es";
import type { SelectProps } from "ant-design-vue";
interface Props {
  searchKey: string | null;
  type: "start" | "end"; //联合类型
}

let optionData = ref<SelectProps["options"]>([]);
let fetching = ref(false);
const props = defineProps<Props>();
const emit = defineEmits();

/* 搜索关键字 */
const searchOption = debounce((value: string) => {
  optionData.value = [];
  fetching.value = true;
  //AMap是高德地图的sdk，全局可用
  AMap.plugin("AMap.PlaceSearch", function () {
    //查询的参数
    const autoOptions = {
      city: "全国", // 兴趣点城市
      pageSize: 10, // 单页显示结果条数
      pageIndex: 1, // 页码
      citylimit: true, //是否强制限制在设置的城市内搜索
      // map: props.currentMapInstance, // 展现结果的地图实例
      // panel: "panel", // 结果列表将在此容器中进行展示,panel为节点的id。
      autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    };
    //构造地点查询的类
    const placeSearch = new AMap.PlaceSearch(autoOptions);
    //执行查询，以及结果的回调函数
    placeSearch.search(value, function (status: any, result: any) {
      console.log(status, result);
      //排除一些错误的情况
      if (status !== "complete" && result.info !== "OK") {
        optionData.value = [];
        fetching.value = false;
        return;
      }
      //将搜索的结果作为select的选项，这个其实是有分页的，我们就只取它第一页就行
      optionData.value = result.poiList.pois.map((item: any) => {
        return {
          label: item.name + `(${item.address})`,
          value: item.name,
          address: item.address,
          type: item.type, //地址的类型，比如学校，政府...
          location: item.location, //这个地址的经纬度信息，等等
          name: item.name, //店铺信息
          tel: item.tel, //商家电话
        };
      });
      fetching.value = false;
    });
  });
}, 600);
/* 选择确定 */
const searchKeyChange = (e: string) => {
  emit("update:searchKey", e);
  /* 在这里定位到选择的位置当中去 */
  const locationLng = optionData.value?.find((item) => item.name === e)
    ?.location?.lng;
  const locationLat = optionData.value?.find((item) => item.name === e)
    ?.location?.lat;
  //往地图添加标记点
  emit("changeCenterAndMarker", [locationLng, locationLat], props.type);
};
</script>
<style lang="scss" scoped>
.location-info {
  .name {
    font-size: 16px;
    color: #1d1c22;
  }
  .label,
  .type,
  .tel {
    font-size: 12px;
    color: #a2a5b1;
    margin: 0 5px;
  }
  .label {
    margin: 0;
  }
}
</style>
