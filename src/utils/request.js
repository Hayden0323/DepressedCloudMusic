import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// 响应拦截器
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    if (code !== 200) {
      return Promise.reject('error')
    } else {
      console.log(res)
      return res.data
    }
  },
  err => {
    console.log('err' + err)
    return Promise.reject(err)
  }
)

export default service
