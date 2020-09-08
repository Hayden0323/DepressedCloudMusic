import request from '@/utils/request'

// 获取轮播图
export function getBanner() {
  return request({
    url: '/banner',
    method: 'get'
  })
}
