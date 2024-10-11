/*
 * @Author: weiqi
 * @Date: 2023-05-15 20:54:55
 * @LastEditors: weiqi
 * @LastEditTime: 2023-05-16 00:03:46
 * @Description: file content
 * @FilePath: /frontend/vite.config.ts
 */
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-Vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
// import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    VueSetupExtend(),
    AutoImport({
      imports: ["vue"],
      dts: "src/auto-import.d.ts",
      resolvers: [ElementPlusResolver()],
    }),
    // topLevelAwait({
    //   // The export name of top-level await promise for each chunk module
    //   promiseExportName: "__tla",
    //   // The function to generate import names of top-level await promise in each chunk module
    //   promiseImportName: (i) => `__tla_${i}`,
    // }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/rapi": {
        target:
          "http://remote-host:port/api",
        rewrite: (path) => path.replace(/^\/rapi/, ""),
      },
    },
  },
  // build: {
  //   target: 'modules',
  //   outDir: 'dist', //指定输出路径
  //   assetsDir: 'assets', // 指定生成静态资源的存放路径
  //   minify: 'terser' // 混淆器，terser构建后文件体积更小
  // }
});
