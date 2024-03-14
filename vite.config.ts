import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    //配置别名
    alias: {
      "@": "/src",
    },
  },

  // 静态资源基础路径 base: './' || '',
  base: "/vue3-demo/",

  //打包输入的文件名
  build: {
    outDir: "docs",
  },

  //指定公共静态文件的目录
  publicDir: "public",

  css: {
    preprocessorOptions: {
      sass: {
        // 这里配置 Sass 的输出样式
        outputStyle: "expanded",
      },
    },
  },

  // 开发服务器配置
  server: {
    host: true,
    open: true,
    port: 4000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
