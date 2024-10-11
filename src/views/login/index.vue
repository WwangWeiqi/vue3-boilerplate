<script setup lang="ts" name="loginPage">
// import { ComponentInternalInstance } from "vue";
import accountLogin from "./account_login.vue";
// const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// const active = ref("email_login");
// import store from "@/store";
// const { globalInstance } = store;

// onMounted(() => {
//   if (proxy?.$route.name == "login") {
//     proxy?.$router.replace({ name: "email_login" });
//   }
// });

// const tabList = [
//   {
//     title: "login.email-login.title",
//     name: "email_login",
//     to: { name: "email_login" },
//   },
//   // { title: "Mobile", name: "mobile_login", to: { name: "mobile_login" } },
// ];

// const switchLocale = () => {
//   proxy?.$loading.showLoading(true, "Switching Locale ...");
//   setTimeout(() => {
//     globalInstance.setLocale(globalInstance.locale == "en" ? "zh" : "en");
//     proxy?.$loading.hideLoading(true);
//   }, 2000);
// };
</script>

<template>
  <div class="login-container">
    <el-card class="login-form">
      <account-login />
    </el-card>

    <!-- <router-view /> -->
    <!-- <div style="margin-top: 0px; text-align: center">
      <van-button type="primary" plain block @click="$router.push('/register')">
        {{ $t("login.register") }}
      </van-button>
    </div> -->
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  .login-form {
    width: 480px;
    right: 200px;
    position: absolute;
  }
}
</style>
