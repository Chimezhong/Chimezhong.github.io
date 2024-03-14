//引入路由实列
import router from "./index";
//引入pinia实列
import { pinia } from "../store/index";
//引入我们定义得store
import userInfo from "../store/user";
//实列我们定义得store，这里为什么需要userInfo(pinia)将pinia的实列放进去呢？因为这里pinia的实列还未挂载上vue中，所以需要我们手动处理
/* 因为 Pinia 实例未正确注入到Vue应用中造成的，在路由实例化的时候，Pinia 没有实例，出现的一个异常，也算是一个坑。 */
const user = userInfo(pinia);
router.beforeEach((to, from, next) => {
  next();
});
