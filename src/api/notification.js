import request from '@/util/request'

//获取通知
export function notification(id) {
  return request({
    url: '/notification/' + id,
    method: 'get'
  })
}
