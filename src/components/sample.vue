<!--
 * @Author: weiqi
 * @Date: 2023-05-15 20:54:55
 * @LastEditors: weiqi
 * @LastEditTime: 2023-05-16 00:16:36
 * @Description: 输入密码actionsheet组件
 * - 默认密码最大长度6
-->
<script setup lang="ts">
import { ref, watch, getCurrentInstance, ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const props = defineProps({
  maxLength: { type: Number, default: 6 },
  loading: { type: Boolean, default: false },
});
const passCode = ref<string>("");

watch(passCode, (cur: string) => {
  if (cur.length == props.maxLength) {
    proxy?.$emit("confirm", { passCode: passCode.value });
  }
});
</script>

<template>
  <van-action-sheet v-bind="{ ...props, ...$attrs }">
    <van-space :size="10" direction="vertical" fill v-if="!loading">
      <slot name="info"></slot>
      <van-password-input
        :gutter="10"
        :focused="$attrs.show"
        :value="passCode"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="$attrs.show"
        v-model="passCode"
        :maxlength="maxLength"
      />
    </van-space>
    <van-space
      :size="10"
      direction="vertical"
      class="loading-content"
      fill
      v-else
    >
      <van-loading />
      <div>authenticating...</div>
    </van-space>
  </van-action-sheet>
</template>

<style scoped lang="scss">
.van-password-input__security li {
  background: var(--van-background-3);
}
.van-number-keyboard {
  position: relative;
}

.loading-content {
  height: 50vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
