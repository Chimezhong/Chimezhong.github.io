<template>
  <div class="router-page blog-details-page">
    <ContentHeader :pageName="'博客详情'" :pageTitle="blogInfoData.blogTitle">
      <template #icon>
        <DeploymentUnitOutlined :style="$iconStyle" />
      </template>
      <template #infoText>
        <div>
          {{ blogInfoData.blogDescribe }}
        </div>
      </template>
      <template #symbol>!</template>
    </ContentHeader>

    <div class="blog-details">
      <div class="img-box" v-if="blogInfoData.imagePath[0]">
        <img :src="'/api' + blogInfoData.imagePath[0]" />
      </div>
      <div class="user-time">
        <div class="user-info">
          <a-avatar style="background-color: #b4d700">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <span class="user-name">{{ blogInfoData.createUser }}</span>
        </div>

        <span class="time" v-mouseStyle>
          <CalendarOutlined :style="$iconStyle" />
          {{ blogInfoData.createTime }}
        </span>
      </div>
      <div class="blog-info">
        <MdPreview
          :modelValue="blogInfoData.blogContent"
          class="my-md"
          ref="MdPreviewRef"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  DeploymentUnitOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { MdPreview } from "md-editor-v3";
// preview.css相比style.css少了编辑器那部分样式
import "md-editor-v3/lib/preview.css";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getBlogDetails } from "@/api/blog";
const route = useRoute();
const blogInfoData = ref({
  blogTitle: "",
  blogDescribe: "",
  imagePath: [],
  createUser: "",
  createTime: "",
  blogContent: "",
});
//查询这个博客id得详情
async function getBlogInfo(id: string) {
  const result = await getBlogDetails(id);
  if (result && result.data) {
    blogInfoData.value = result.data;
  } else {
  }
}
getBlogInfo(route.params.id as string);
</script>
<style lang="scss">
.blog-details-page {
  .blog-details {
    width: 100%;

    .img-box {
      width: 100%;
      margin-bottom: 20px;
      img {
        max-width: 100%;
        height: auto;
        border-radius: 20px;
      }
    }

    .user-time {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user-info {
        .user-name {
          margin-left: 5px;
          color: var(--primary-color-no);
        }
      }

      .time {
        border: 1px solid var(--bg-dark-hover);
        border-radius: 15px;
        padding: 2px 10px;
        color: var(--primary-color);
        transition: all 0.3s ease-out 0s;
        cursor: pointer;
        &:hover {
          color: #b4d700;
        }
      }
    }
  }

  .my-md {
    background-color: transparent;
    --md-color: var(--primary-color);

    .md-editor-preview-wrapper {
      padding: 0;
    }
  }
}
</style>
