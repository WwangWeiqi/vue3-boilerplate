import { defineStore } from "pinia";
// import { i18n } from "@/locale";
// enum LOCALE {
//   en = "EN",
//   zh = "ZH",
// }
export const globalStore = defineStore("globalStore", {
  state: () => {
    // i18n.global.locale = this.locale
    return {
      locale: "zh",
      layout: {
        showHeader: false,
        showSider: false,
      },
    };
  },
  persist: [
    {
      storage: localStorage,
      paths: ["locale"],
    },
  ],
  actions: {
    setLayout(layout: { showHeader: boolean; showSider: boolean }) {
      this.layout = layout;
    },
    setLocale(_locale: "zh" | "en") {
      this.locale = _locale;
      // window.location.reload();
    },
  },
});
