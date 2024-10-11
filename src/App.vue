<!--
 * @Author: weiqi
 * @Date: 2023-05-15 20:54:55
 * @LastEditors: weiqi
 * @LastEditTime: 2023-05-15 20:59:40
 * @Description: file content
 * @FilePath: /frontend/src/App.vue
-->
<script setup lang="ts">
import appSider from "@/layout/sider.vue";
import appHeader from "@/layout/header.vue";
// import { ComponentInternalInstance } from "vue";
// import { RouteRowProp } from "./routes/route.model.ts";
import { globalStore } from "./store/globalStore.ts";
// import store from "@/store";
// const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// const { globalInstance } = store;
// const siderRef = ref<{
//   menus: RouteRowProp[];
// }>({ menus: [] });

// onMounted(() => {
//   if (location.pathname == "/") {
//     proxy?.$router.push(siderRef.value.menus[0].path);
//   }
// });

const layout = computed(() => {
  return globalStore().layout;
});
</script>

<template>
  <el-config-provider>
    <div class="common-layout">
      <el-container class="common-container">
        <el-header v-if="layout.showHeader"><app-header /></el-header>
        <el-container>
          <el-aside class="menu-container" v-if="layout.showSider"
            ><app-sider
          /></el-aside>
          <el-container>
            <el-main>
              <router-view></router-view>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
          </el-container>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
</template>

<style lang="scss">
@import "@/styles/theme.scss";
// @import "element-plus/dist/index.css";

.common-layout {
  height: 100vh;
  width: 100vw;
  .common-container {
    height: 100%;
    width: 100%;

    .menu-container {
      // min-height: 100vh;
      height: calc(100vh - var(--el-header-height));
    }

    // .app-content {
    //   padding: 6px;
    // }

    .footer {
      text-align: center;
      // position: absolute;
      // bottom: 0;
      width: 100%;
    }
  }
}
</style>
