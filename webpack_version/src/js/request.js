import axios from 'axios'
// import { MessageBox } from 'element-ui'
import store from '../store/store'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://gateway.zan-qian.com/' : 'http://testgate.zan-qian.com/', // api的base_url
  timeout: 5000, // 请求超时时间
  // transformRequest: [function(data) {
  //   // Do whatever you want to transform the data
  //   let ret = '';
  //   for (const it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //   }
  //   return ret
  // }],
  headers: {
    // 'Content-Type': 'application/json;charset=utf-8'
  }
});

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    console.log(store.getters.token)

    config.headers['Authorization'] = 'Bearer ' + store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const result_response = error.response;

    if (result_response.status === 401) {
    }

    console.log('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
