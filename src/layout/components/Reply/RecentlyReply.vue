<template>
  <div class="replies-wrapper">
    最新回复
    <el-divider />
    <div class="question-content" v-for="question in notification" :key="question">
      {{ question.notifierName }} {{ question.typeName }}
      <a :href="'/notification/' + question.id">
        {{ question.outerTitle }}
      </a>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :hide-on-single-page="true"
      :page-size="5"
      v-model:current-page="currentPage"
      @current-change="handleCurrentPage"
      :total="pagination.totalPage * 5" />
  </div>
</template>

<script>
import { reply } from '@/api/profile'
import { ref } from 'vue'

export default {
  setup() {
    const notification = ref([])
    const pagination = ref({})
    const currentPage = ref(1)
    reply().then(res => {
      notification.value = res.data.pagination.data
      pagination.value = res.data.pagination
    })
    //切换页面
    const handleCurrentPage = () => {
      reply({ page: currentPage.value }).then(res => {
        notification.value = res.data.pagination.data
        pagination.value = res.data.pagination
      })
    }
    return { notification, pagination, currentPage, handleCurrentPage }
  }
}
</script>

<style scoped>
.replies-wrapper {
  width: 70%;
  padding: 20px;
  font-size: 30px;
  border-right: 1px solid #e6e6e6;
}
.replies-wrapper {
  width: 70%;
  padding: 20px;
  font-size: 30px;
  border-right: 1px solid #e6e6e6;
}
.question-content {
  font-size: 14px;
  padding: 15px 0;
}
.question-content a {
  color: #409eff;
  text-decoration: none;
}
.question-content a:hover {
  color: #79bbff;
  text-decoration: underline;
}
</style>
