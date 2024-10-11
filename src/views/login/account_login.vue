<script setup lang="ts" name="accountLogin">
import { FormInstance } from "element-plus";
import { getCurrentInstance, ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

// const props = defineProps<{ referrerCode: string }>();
// console.log(props.referrerCode);
// const login_method = ref<LOGIN_TYPE>(LOGIN_TYPE.EMAIL);
const loginForm = ref<{ username: string; password: string }>({
  username: "",
  password: "",
});
const loading = ref(false);
const formRef = ref<FormInstance>();
const onSubmit = async (formEl: FormInstance | undefined) => {
  try {
    loading.value = true;
    if (!formEl) return;
    console.log(loginForm.value);
    await formEl.validate();
    // const { data } = await general_open_api.login(loginForm.value);
    // const { sessionid, sessionInfo } = data;
    // userInstance.setSessionId(sessionid);
    // userInstance.setSessionInfo(sessionInfo);

    proxy?.$router.replace("/next");
    // proxy?.$router.replace("/next");
  } catch (e) {
    console.log("err", e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <el-form
    ref="formRef"
    :model="loginForm"
    label-width="auto"
    class="demo-ruleForm"
    label-position="top"
    hide-required-asterisk
  >
    <!-- <h3>Login</h3> -->
    <el-form-item
      label="username"
      prop="username"
      :rules="[{ required: true, message: 'username is required' }]"
    >
      <el-input v-model="loginForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item
      :label="$t('login.password')"
      prop="password"
      :rules="[{ required: true, message: 'password is required' }]"
    >
      <el-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        @click="onSubmit(formRef)"
        type="primary"
        block
        :loading="loading"
        v-t="'login.login-button'"
      >
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
