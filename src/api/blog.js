import request from "../utils/request";

export function getBlogList(params) {
  return request({
    url: "/blog/queryList",
    methods: "get",
    params,
  });
}

export function getBlogDetails(id) {
  return request({
    url: `/blog/info/${id}`,
    methods: "get",
    params: {
      queryTrueStatus: true,
    },
  });
}
