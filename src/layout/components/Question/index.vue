<template>
  <div class="page-container">
    <question-content ref="question" />
    <related-question ref="related" />
  </div>
</template>

<script>
import QuestionContent from '@/layout/components/Question/QuestionContent'
import RelatedQuestion from '@/layout/components/Question/RelatedQuestion'
import { ref } from 'vue'
import { getQuestion } from '@/api/question'
import { getDate } from '@/util/time'

export default {
  components: {
    QuestionContent,
    RelatedQuestion
  },
  setup() {
    const question = ref()
    const related = ref()
    const questionId = location.href.split('/question/')[1]
    getQuestion(questionId)
      .then(res => {
        if (res.code === 200) {
          res.data.question.gmtCreate = getDate(res.data.question.gmtCreate)
          res.data.question.tag = res.data.question.tag.split(',')
          question.value.receiveQuestion(res.data)
          related.value.receiveRelated(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
    return { question, related }
  }
}
</script>

<style scoped>
.page-container {
  width: 100%;
  display: flex;
}
</style>
