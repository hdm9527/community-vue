import request from '@/util/request'

//查询用户信息
export function getUser() {
  return request({
    url: '/user',
    method: 'get'
  })
}
