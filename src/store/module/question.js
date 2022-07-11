import { defineStore } from 'pinia'
import { getQuestion } from '@/api/question'
import { getDate } from '@/util/time'

const useQuestionStore = defineStore('question', {
  state: () => {
    return {
      comments: [],
      question: {},
      relatedQuestions: []
    }
  },
  actions: {
    //获取问题信息
    getQuestionInfo(questionId) {
      return new Promise((resolve, reject) => {
        getQuestion(questionId)
          .then(res => {
            res.data.question.gmtCreate = getDate(res.data.question.gmtCreate)
            res.data.question.tag = res.data.question.tag.split(',')
            this.comments = res.data.comments
            this.question = res.data.question
            this.relatedQuestions = res.data.relatedQuestions
            console.log(this.relatedQuestions)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})

export default useQuestionStore
