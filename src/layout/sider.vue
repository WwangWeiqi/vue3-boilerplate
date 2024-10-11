<script setup lang="ts" name="appSider">
import { menus } from "@/routes";
// import { filter } from "lodash";

// const menus = computed(() => {
//   return filter(routes, (item) => {
//     return !item.hidden;
//   });
// });

// const active =
//   location.pathname == "/" ? menus.value[0].path : location.pathname;
</script>

<template>
  <el-menu
    :default-active="$route.path"
    class="menu-container"
    :collapse="false"
    router
  >
    <el-menu-item :index="item.path" v-for="(item, i) in menus" :key="i">
      <el-icon><document /></el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss"></style>
