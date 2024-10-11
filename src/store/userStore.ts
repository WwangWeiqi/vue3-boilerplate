import { defineStore } from "pinia";
// import { SessionInterface } from "@/models";
export const userStore = defineStore("userStore", {
  state: () => {
    return {
      sessionid: "",
      // sessionInfo: {} as SessionInterface,
    };
  },
  persist: [
    {
      storage: localStorage,
      paths: ["sessionid", "sessionInfo"],
    },
  ],
  actions: {
    setSessionId(sessionid: string) {
      this.sessionid = sessionid;
    },
    // setSessionInfo(sessionInfo: SessionInterface) {
    //   this.sessionInfo = sessionInfo;
    // },
    cleanSession() {
      this.setSessionId(undefined as unknown as string);
      // this.setSessionInfo(undefined as unknown as SessionInterface);
    },
  },
});
