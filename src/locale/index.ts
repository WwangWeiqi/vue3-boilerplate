import { createI18n } from "vue-i18n";
import en from "./locale.constant-en_US.json";
import zh from "./locale.constant-zh_CN.json";
import { globalStore } from "@/store/globalStore";
// globalStore();
// export const i18n = () => {
//   return createI18n({
//     locale: globalStore().locale,
//     fallbackLocale: 'en',
//     legacy: false,
//     messages: {
//       en,
//       zh,
//     },
//   });
// };
globalStore().setLocale("en");
export const i18n = createI18n({
  locale: globalStore().locale,
  fallbackLocale: "en",
  legacy: false,
  messages: {
    en,
    zh,
  },
});
