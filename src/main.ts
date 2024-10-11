/*
 * @Author: weiqi
 * @Date: 2023-05-15 20:54:55
 * @LastEditors: weiqi
 * @LastEditTime: 2023-05-15 22:31:43
 * @Description: file content
 * @FilePath: /frontend/src/main.ts
 */
// import Vconsole from "vconsole";
// if (import.meta.env.MODE == "development") {
//   new Vconsole();
// }
import { createApp } from "vue";
// import { showLoading, hideLoading } from "./utils";
import router from "./routes/index";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persistedstate";
import "./sysInit";
import "./permission";
import mixins from "./mixins";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import { i18n } from "./locale";
import App from "./App.vue";

dayjs.extend(relativeTime);
console.log(import.meta.env);
const pinia = createPinia();
pinia.use(piniaPersist);

const app = createApp(App);
app.mixin(mixins);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus).use(pinia).use(router);
const { i18n } = await import("./locale");
app.use(i18n);
app.mount("#app");
app.config.globalProperties.$dayjs = dayjs;
