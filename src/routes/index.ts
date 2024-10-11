import { createRouter, createWebHistory } from "vue-router";
import { RouteRowProp } from "./route.model";
import { filter } from "lodash";

const routes: RouteRowProp[] = [
  {
    path: "/login",
    name: "login",
    hidden: true,
    // props($route: any) {
    //   return { referrerCode: $route.query.referrerCode };
    // },
    // 使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/login/index.vue"),
    meta: {
      showHeader: false,
      showSider: false,
    },
    // children: [
    //   {
    //     path: "email",
    //     name: "email_login",
    //     component: () => import("@/views/login/email_login.vue"),
    //     // props($route: any) {
    //     //   return { referrerCode: $route.query.referrerCode };
    //     // },
    //   },
    // ],
  },
  {
    path: "/contract-event",
    name: "Contract events",
    hidden: false,
    // 使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/contractEvent/index.vue"),
  },
  {
    path: "/datasources",
    name: "Datasources",
    hidden: false,
    // 使用import可以路由懒加载，如果不使用，太多组件一起加载会造成白屏
    component: () => import("@/views/dataSources/index.vue"),
  },
];
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export const menus = filter(routes, (item) => {
  return !item.hidden;
});

export { routes };
// 导出
export default router;
