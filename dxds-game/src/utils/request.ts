import { CONFIG } from "@/config";
import useAppStore from "@/store/user";

import axios from "axios";
import md5 from "blueimp-md5";

declare module "axios" {
  interface AxiosResponse<T = any> {
    code: string;
    data: T;
    msg: T;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

/**
 * 签名方法
 * @param params
 */
function getSign(params: any = {}, checkLogin: boolean = true) {
  params.timestamp = Math.round(Date.now() / 1000);

  params.lang = params?.lang || useAppStore.getState().lang || "en";
  params.client = "web";
  if (checkLogin) {
    params.accessToken = useAppStore.getState().token;
  }
  const parr = transform(params).sort();
  let signStr = "";
  for (let i = 0; i < parr.length; i++) {
    const v = params[parr[i]];
    if (!v || v === "undefined") {
      delete params[parr[i]];
      continue;
    }
    signStr += `${parr[i]}=${v}&`;
  }

  signStr += `key=${CONFIG.API_KEY}`;
  const sign = md5(signStr);
  params.sign = sign;
  return params;
}

function transform(obj: any) {
  const arr = [];
  for (const item in obj) {
    arr.push(item);
  }
  arr.sort(mySorter);
  return arr;
}

function mySorter(a: any, b: any) {
  if (/^\d/.test(a) !== /^\D/.test(b)) {
    return a > b ? 1 : (a = b ? 0 : -1);
  }
  return a > b ? -1 : a == b ? 0 : 1;
}

function toParamStr(params: any) {
  let paramStr = "";
  for (const item in params) {
    paramStr += `${item}=${params[item]}&`;
  }
  paramStr = paramStr.substring(0, paramStr.lastIndexOf("&"));
  return paramStr;
}

// create an axios instance
const service = axios.create({
  baseURL: CONFIG.API_HOST, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000, // request timeout
  method: "POST",
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   // config.headers['Authorization'] = `Bearer Token${store.getters.token}`
    config.headers["Content-Type"] =
      "application/x-www-form-urlencoded;charset=UTF-8";

    if (config.data) {
      config.data = toParamStr(getSign(config.data, config.withCredentials));
    }
    if (config.params) {
      config.params = toParamStr(
        getSign(config.params, config.withCredentials)
      );
    }

    return config;
  },
  (error) => {
    // do something with request error
    console.error(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    return res;
  },
  (error) => {
    console.error("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;

export function upload(url: string, data: any, file: any, _params?: any) {
  const config: any = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const params = getSign(data);
  const formData = new FormData();
  formData.append("fileObj", file);
  for (const item in params) {
    formData.append(item, params[item]);
  }
  return axios
    .post(`${CONFIG.API_HOST}${url}?${toParamStr(_params)}`, formData, config)
    .then((response) => {
      const res = response.data;

      return res;
    });
}
export function postForm(url: string, data: any, params?: any) {
  const _params = getSign(params || {});
  const config: any = {
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  };

  return axios
    .post(
      `${CONFIG.API_HOST}${url}?${toParamStr(_params)}`,
      JSON.stringify(data),
      config
    )
    .then((response) => {
      const res = response.data;

      return res;
    });
}
