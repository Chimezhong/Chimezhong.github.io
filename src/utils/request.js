import axios from "axios";
import { message as messageApi } from "ant-design-vue";
import errorCode from "@/utils/errorCode";
import { tansParams, blobValidate } from "@/utils/genericMethod";
import { saveAs } from "file-saver";

let downloadLoadingInstance;

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "/api",
  // 超时
  timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 500) {
      messageApi.error(msg);
      return Promise.reject(new Error(msg));
    } else if (code === 601) {
      messageApi.warning(msg);
      return Promise.reject(new Error(msg));
    } else if (code !== 200) {
      messageApi.error({ title: msg });
      return Promise.reject("error");
    } else {
      return Promise.resolve(res.data);
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    messageApi.error(message);
    return Promise.reject(error);
  }
);

// 通用下载方法
export function download(url, params, filename, config) {
  downloadLoadingInstance = messageApi.loading("正在下载数据，请稍候", 0);
  return service
    .post(url, params, {
      transformRequest: [
        (params) => {
          return tansParams(params);
        },
      ],
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob",
      ...config,
    })
    .then(async (data) => {
      const isBlob = blobValidate(data);
      if (isBlob) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg =
          errorCode[rspObj.code] || rspObj.msg || errorCode["default"];
        messageApi.error(errMsg);
      }
      downloadLoadingInstance();
    })
    .catch((r) => {
      console.error(r);
      messageApi.error("下载文件出现错误，请联系管理员！");
      downloadLoadingInstance();
    });
}

export default service;
