import request from '@/util/request'

//获取首页展示数据
export function getIndexData(query) {
  return request({
    url: '/',
    method: 'get',
    params: query
  })
}

//获取单个问题数据
export function getQuestion(questionId) {
  return request({
    url: '/question/' + questionId,
    method: 'get'
  })
}

//获取二级评论
export function getSubComments(id) {
  return request({
    url: '/comment/' + id,
    method: 'get'
  })
}

//发表评论
export function publishComment(parentId, content, type) {
  const json = {
    parentId: parentId,
    content: content,
    type: type
  }
  return request({
    url: '/comment',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(json)
  })
}
