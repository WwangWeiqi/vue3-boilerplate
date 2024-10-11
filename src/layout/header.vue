<script setup lang="ts" name="appHeader">
// onMounted(() => {});
</script>

<template>
  <div class="header-container">
    <div class="title" text-size="large" bold>Spingo Hermes</div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  height: 100%;

  .title {
    color: var(--el-color-white);
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(var(--el-aside-width) - 20px);
  }
}
</style>
