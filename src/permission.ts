import router from "@/routes";
// import { SessionInterface, EMAIL_VALIDATE_STATUS } from "./models";
import { userStore } from "./store/userStore";
import { globalStore } from "./store/globalStore";
import { routeUtils } from "./routes/route.utils";
import { menus } from "@/routes";
// import { hasMetamaskAddress } from "./utils";
const whiteList = ["/login"];

// function emailValidated() {
//   //防止infinite redirect
//   // const userStore = JSON.parse(localStorage.getItem("userStore") ?? "{}");
//   const sessionInfo = userStore().sessionInfo as SessionInterface;
//   // console.log(sessionInfo);
//   if (
//     sessionInfo &&
//     sessionInfo.permission.emailValidated == EMAIL_VALIDATE_STATUS.VALIDATED
//   ) {
//     return true;
//   }
//   return false;
// }
// function hasPermission(url: string) {
//   const userStore = JSON.parse(localStorage.getItem("userStore") ?? "{}");
//   const isLogged = !!userStore.sessionid;
//   // whiteList.findIndex((value) => {
//   //   return new RegExp(url).test(value);
//   // });
//   // 路径在在白名单中，允许可以跳转
//   if (whiteList.indexOf(url) !== -1 || isLogged) {
//     return true;
//   }
//   return false;
// }

function isLogged() {
  // const userStore = JSON.parse(localStorage.getItem("userStore") ?? "{}");
  // console.log(userStore().sessionInfo);
  const isLogged = !!userStore().sessionid;
  return isLogged;
}

//whitelist内的route可以在没有登录的情况下访问
function isPathInWhitelist(path: string) {
  return whiteList.indexOf(path) !== -1;
}

router.beforeEach((to, _, next) => {
  console.log(" router", to);
  if (!to.name) {
    return next({ path: menus[0].path });
  }
  const globalStoreData = globalStore();
  const meta = routeUtils.getMeta(to.meta);
  globalStoreData.setLayout({
    showHeader: meta.showHeader,
    showSider: meta.showSider,
  });
  next();

  // if (!hasPermission(to.path)) {
  //   return next({ path: "/login" });
  // }
  // if (!emailValidated()) {
  //   return next({ path: "/exceptions/email_unverified" });
  // }

  // console.log("email validate");

  //如果路由为 /,则跳转到/home页面
});

// router.afterEach((to, from) => {
//   console.log(from)
// })
