<template>
  <div class="page-container">
    <app-main ref="questionList" />
    <hot-tag ref="tags" />
  </div>
</template>

<script>
import AppMain from '@/layout/components/AppMain/Content'
import HotTag from '@/layout/components/AppMain/HotTag'
import { ref } from 'vue'
import { getIndexData } from '@/api/question'
import mitt from '@/util/mitt'

export default {
  components: {
    AppMain,
    HotTag
  },
  setup() {
    const questionList = ref()
    const tags = ref()
    let flag = true
    getIndexData({ page: 1, size: 5 })
      .then(res => {
        questionList.value.getQuestions(res.data.pagination)
        tags.value.getTags(res.data.tags)
      })
      .catch(err => {
        console.log(err)
      })
    mitt.on('init', () => {
      if (flag) {
        flag = false
        getIndexData({ page: 1, size: 5 })
          .then(res => {
            questionList.value.getQuestions(res.data.pagination)
            tags.value.getTags(res.data.tags)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    return { questionList, tags }
  }
}
</script>

<style scoped>
.page-container {
  width: 100%;
  display: flex;
}
</style>
