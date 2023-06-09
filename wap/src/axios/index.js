
import axios from 'axios' // 引入axios
import qs from 'qs' // 引入qs
// import store from '@/store'
import router from '@/router'
import APIUrl from './api.url' // 引入api.url.js

// axios 默认配置  更多配置查看Axios中文文档
axios.defaults.timeout = 50000 // 超时默认值
axios.defaults.baseURL = APIUrl.baseURL // 默认baseURL
axios.defaults.responseType = 'json' // 默认数据响应类型
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证

// http request 拦截器
// 在ajax发送之前拦截 比如对所有请求统一添加header token
axios.interceptors.request.use(
  config => {
    // if (store.state.token) {
    //     // config.headers.Authorization = `USER_TOKEN = ${store.state.token}`;
    //     config.headers["USER_TOKEN"] = store.state.token;
    // }
    // console.log(config) 
    if (!config.params) {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
// ajax请求回调之前拦截 对请求返回的信息做统一处理 比如error为401无权限则跳转到登陆界面
axios.interceptors.response.use(
  response => {
    switch (response.data && response.data.success) {
      case false:
        // response.data.msg = '您还未登录,请先登录'
        response.data.msg = 'Bạn chưa đăng nhập, vui lòng đăng nhập trước'
        // console.log(response.data)
        router.replace({
          path: 'openaccount'
        })
        break
      default:
        break
    }
    return response
  },
  error => {
    // console.log(error,'error');
    return Promise.reject(error)
  }
)

export default axios // 这句千万不能漏下！！！

/**
 * post 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}, out) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data))
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * get 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: data })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 其他delete等的封装类似
 * 可以查看中文文档 自行封装
 */
