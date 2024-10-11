// export * from './userStore'
// export * from './web3ProviderStore'
// import { etherjsProvider } from '@/web3'
import { userStore } from "./userStore";
import { globalStore } from "./globalStore";

const store = {
  userInstance: userStore(),
  globalInstance: globalStore(),
};

export default store;
