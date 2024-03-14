// router.js
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import index from "../view/index.vue"; // 导入首页组件
import Layout from "@/layout/index.vue";
const routes = [
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        component: () => import("@/view/index.vue"),
        name: "Index",
      },
      {
        path: "about",
        component: () => import("@/view/About/index.vue"),
        name: "About",
      },
      {
        path: "map",
        component: () => import("@/view/Map/index.vue"),
        name: "Map",
      },
      {
        path: "skill",
        component: () => import("@/view/Skill/index.vue"),
        name: "Skill",
      },
      {
        path: "blog",
        component: () => import("@/view/Blog/index.vue"),
        name: "Blog",
      },
      {
        path: "blogDetails/:id",
        component: () => import("@/view/BlogDetails/index.vue"),
        name: "BlogDetails",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
