<template>
  <div class="router-page blog-page">
    <ContentHeader :pageName="'博客'" :pageTitle="'博客列表'">
      <template #icon>
        <BoldOutlined :style="$iconStyle" />
      </template>
      <template #infoText>
        <div>
          这是我的个人博客，用于记录一些重要的知识点以及工作中遇到的难点
        </div>
      </template>
      <template #symbol>!</template>
    </ContentHeader>

    <!-- 列表 -->
    <div class="list-box">
      <div
        class="list-item"
        v-for="item in blogList"
        :key="item.id"
        @click="goForDetails(item)"
      >
        <div class="img">
          <img :src="'/api' + item.imagePath[0]" alt="" />
        </div>
        <div class="content">
          <div class="info" v-mouseStyle>{{ item.blogTitle }}</div>

          <div class="describe">
            {{ item.blogDescribe }}
          </div>

          <div class="user-time">
            <div class="user-info">
              <a-avatar style="background-color: #b4d700">
                <template #icon>
                  <UserOutlined />
                </template>
              </a-avatar>
              <span class="user-name">{{ item.createUser }}</span>
            </div>

            <span class="time">
              <CalendarOutlined :style="$iconStyle" />
              {{ item.createTime }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <a-pagination
        v-model:current="paginationData.page"
        :total="paginationData.total"
        :defaultPageSize="paginationData.pageSize"
        @change="pageChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  BoldOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { getBlogList } from "@/api/blog";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const paginationData = ref({
  page: 1,
  pageSize: 6,
  total: 0,
  queryTrueStatus: true, //只查询博客状态为启用的
});
interface ListItem {
  imagePath: Array<string>;
  createUser: string;
  createTime: string;
  blogTitle: string;
  blogDescribe: string;
  id: number;
}
const blogList = ref<Array<ListItem>>([]);

function queryList() {
  getBlogList(paginationData.value).then((res: any) => {
    if (res.code === 200) {
      paginationData.value.total = res.result.itemCount;
      blogList.value = res.result.list;
    }
  });
}
//进入页面就调用一次
queryList();

//页码发生改变
function pageChange(current: number) {
  paginationData.value.page = current;
  queryList();
}

//查看详情
function goForDetails(item: ListItem) {
  router.push({
    path: "blogDetails/" + item.id,
  });
}
</script>
<style lang="scss" scoped>
.blog-page {
  .list-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .list-item {
      width: 48%;
      border-radius: 15px;
      overflow: hidden;
      background-color: var(--title-light);
      transition: all 0.3s ease-out 0s;
      margin-bottom: 25px;
      position: relative;
      &:hover {
        cursor: pointer;
        .img {
          img {
            transform: scale(1.2);
          }
        }
      }
      &::after {
        content: "";
        width: 8%;
        height: 22%;
        background-color: var(--blog-after);
        position: absolute;
        bottom: -16px;
        right: -7px;
        transform: rotate3d(1, 1, 1, 45deg);
      }
      &:nth-child(2n) {
        margin-left: auto;
      }
      .img {
        width: 100%;
        height: 200px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.3s ease-out 0s;
        }
      }

      .content {
        width: 100%;
        box-sizing: border-box;
        padding: 25px 30px;
        .info {
          width: fit-content;
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-color);
          padding-bottom: 15px;
          transition: all 0.3s ease-out 0s;
          &:hover {
            color: #b4d700;
          }
        }

        .describe {
          color: var(--primary-color-no);
          font-size: 16px;
          padding-bottom: 15px;
        }

        .user-time {
          display: flex;
          justify-content: space-between;

          .user-info {
            .user-name {
              color: var(--primary-color-no);
              margin-left: 5px;
            }
          }
          .time {
            border: 1px solid var(--bg-dark-hover);
            border-radius: 15px;
            padding: 2px 10px;
            color: var(--primary-color);
            transition: all 0.3s ease-out 0s;
            &:hover {
              color: #b4d700;
            }
          }
        }
      }
    }
  }

  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
}
:deep(.pagination) {
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-item {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--icon-bgc);
    transition: all 0.3s ease-out 0s;
    &:hover {
      background-color: #b4d700;
      .ant-pagination-item-link {
        background-color: transparent;
      }
      a,
      svg {
        color: #000;
      }
    }
  }
  .anticon,
  .ant-pagination-item-link,
  .ant-pagination-item a {
    font-size: 14px;
    color: var(--primary-color);
  }
  .ant-pagination-item a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-pagination-item-ellipsis,
  .ant-pagination-item-link-icon {
    color: #b4d700 !important;
  }

  .ant-pagination-item-active {
    background-color: #b4d700;
    border: none;

    a {
      color: #000;
    }
  }
}
</style>
