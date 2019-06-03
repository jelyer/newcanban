import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
axios.default = IPCONFIG;//设置默认ip
// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api 的 base_url
  baseURL:IPCONFIG,
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.errno === 501) {
      MessageBox.alert('系统未登录，请重新登录', '未登录', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      })
      return Promise.reject('error')
    } else if (res.errno === 502) {
      MessageBox.alert('系统内部错误，请联系管理员维护', '错误', {
        confirmButtonText: '确定',
        type: 'error'
      })
      return Promise.reject('error')
    } else if (res.errno === 503) {
      MessageBox.alert('请求业务目前未支持', '警告', {
        confirmButtonText: '确定',
        type: 'error'
      })
      return Promise.reject('error')
    } else {
      return response
    }
  }, error => {
   /* console.log('err' + error)// for debug
    Message({
      message: '登录连接超时',
      type: 'error',
      duration:3000
    })*/
    return Promise.reject(error)
  })

export default service
