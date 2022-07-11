import request from '@/util/request'
import qs from 'qs'

//获取标签
export function getTags() {
  return request({
    url: '/publish',
    method: 'get'
  })
}

//发布问题
export function publishQuestion(title, description, tag, id) {
  const data = {
    title: title,
    description: description,
    tag: tag,
    id: id
  }
  return request({
    url: '/publish',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
