/// <reference types="vite/client" />
// <reference types="vite/types/importMeta.d.ts" />
import { ComponentCustomProperties } from "vue";
import { Router, RouteLocationNormalizedLoaded } from "vue-router";
import { ethers } from "ethers";
import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// declare module "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
    $dayjs: typeof dayjs;
    $t: (key: string, ...args: any[]) => string;
  }
}
