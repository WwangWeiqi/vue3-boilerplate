<!-- <script setup lang="ts">
import { toolKit } from "@/sysInit";
import { open_user_api } from "@/services/api/v1/openapi";
import {
  responseActionType,
  responseStatusType,
} from "@/views/status/strategy";
import { ComponentInternalInstance } from "vue";
const { isEmail } = toolKit.validator.inputs;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const email = ref("");
const onSubmit = async () => {
  try {
    await open_user_api.send_password_recover_email({ email: email.value });
    proxy?.$router.push({
      path: "/status",
      query: {
        type: responseActionType.FORGOT_PASSWORD,
        status: responseStatusType.SUCCESS,
        fromPath: "/login",
      },
    });
  } catch (e) {}
};

const isValidEmail = (val: string): boolean => {
  try {
    isEmail(val);
    return true;
  } catch (e) {}
  return false;
};
</script>

<template>
  <div class="content">
    <van-space :size="20" direction="vertical" fill>
      <div class="msg" text-size="large">
        {{ $t("login.email-login.recover-password.title") }}
      </div>
      <div>
        {{ $t("login.email-login.recover-password.body") }}
      </div>
      <van-form
        @submit="onSubmit"
        validate-trigger="onChange"
        ref="formRef"
        label-align="top"
      >
        <van-field
          v-model="email"
          :label="$t('login.email-login.email.label')"
          :placeholder="$t('login.email-login.email.label-ph')"
          :rules="[
            {
              validator: isValidEmail,
              message: $t('login.email-login.email.label-msg'),
            },
          ]"
        />
        <div style="margin-top: 25px">
          <van-button round block type="primary" native-type="submit">
            {{ $t("public.submit") }}
          </van-button>
        </div>
      </van-form>
    </van-space>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-top: 5rem;
  padding: 1rem;
  text-align: center;
  //   .msg-wrapper {
  //     max-width: 80vw;
  //     & > * {
  //       text-align: center;
  //     }
  //     .msg {
  //       color: var(--van-gray-4);
  //     }
  //   }
}
</style> -->
