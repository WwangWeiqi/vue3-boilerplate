/*
 * @Author: weiqi
 * @Date: 2023-05-16 13:26:03
 * @LastEditors: weiqi
 * @LastEditTime: 2023-05-16 13:45:18
 * @Description: file content
 * @FilePath: /frontend/src/services/request.ts
 */
import axios, { AxiosResponse, Method } from "axios";
import { requestOptions, responseBody } from "@/interfaces";
// import router from "@/routes";
// import { standardize } from "@/sysInit/sdkInit";
import { TIME } from "@/config";
// import { userStore } from "@/store/userStore";
// const { errorHandler } = standardize;
// const { errorCode } = errorHandler;
const _axios = axios.create({
  // baseURL: 'http://localhost:4011',
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30 * TIME.SECOND, // request timeout,
  // paramsSerializer: (params) => {
  //   return Qs.stringify(params, { arrayFormat: 'brackets' });
  // }
});

// 请求拦截
// 添加请求拦截器
_axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

const hanldeProjectServerError = (err: responseBody) => {
  // const { statusCode } = err;
  // if (
  //   [errorCode.SessionInvalidError, errorCode.SessionNotFoundError].includes(
  //     statusCode
  //   )
  // ) {
  //   router.replace("/login");
  // }
};

// 添加响应拦截器
/**
 * 在 Axios 中，axios.interceptors.response 拦截器的 error 回调函数会在以下情况下被触发：
 * 1.网络错误：当发送请求时，如果网络连接失败、请求超时或请求被中断等网络错误发生时，响应拦截器的 error 回调函数会被调用。
 * 2.HTTP 错误状态码：当接收到响应后，如果返回的 HTTP 状态码为错误状态码（例如 4xx 或 5xx），则响应拦截器的 error 回调函数会被调用。
 * 3.响应拦截器链中的前一个拦截器显式地抛出错误：如果在响应拦截器链中的某个前置拦截器中抛出了一个错误，那么该错误会被传递到响应拦截器的 error 回调函数中。
 */
_axios.interceptors.response.use(
  function (response) {
    return response;

    // 对响应数据做点什么
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    // ElMessage.error(error.message)
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const defaultRequestOption: requestOptions = {
  showloading: false,
  throwErr: false,
  showMessage: true,
  headers: {},
};
function request(
  config: { version?: string; url: string; method: Method; data?: object },
  options?: requestOptions
) {
  const { showloading, throwErr, showMessage, headers } = {
    ...defaultRequestOption,
    ...options,
  };
  let body = config.method.toLowerCase() === "get" ? "params" : "data";
  const { url, method, data, version } = config;
  const userStore = JSON.parse(localStorage.getItem("userStore") ?? "{}");
  //loading对象
  if (showloading) {
    // showLoading(true);
    // loading = ElLoading.service({
    //   lock: true,
    //   text: '加载中...',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })
  }
  return new Promise((resolve, reject) => {
    _axios({
      url: version ?? API_VERSION.V1 + url,
      method,
      [body]: data ?? {},
      headers: {
        "Content-Type": "application/json",
        sessionid: userStore.sessionid,
        ...headers,
      },
    })
      .then((res: AxiosResponse<responseBody>) => {
        // hideLoading(true);
        if (
          res.status < 400 &&
          // res.statusText === "OK" &&
          res.data.statusCode === 200
        ) {
          resolve(res.data);
        } else {
          throw res.data;
        }
      })
      .catch((err: responseBody) => {
        //没有resolve，所以外部await时如果发生错误会中断执行
        // console.log(err);
        if (showMessage)
          // showFailToast({ duration: 4000, message: err.message });
          //处理项目错误码
          hanldeProjectServerError(err);
        //如果throwErr为true，则抛出错误，交给前端具体场景处理
        if (throwErr) reject(err);
      });
  }) as Promise<responseBody>;
}

export { request };

export enum API_VERSION {
  V1 = "/v1",
  V2 = "/v2",
}
