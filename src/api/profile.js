import request from '@/util/request'

export function myQuestions(query) {
  return request({
    url: '/profile/questions',
    method: 'get',
    params: query
  })
}

export function reply(query) {
  return request({
    url: '/profile/replies',
    method: 'get',
    params: query
  })
}
