<template>
  <div class="replies-wrapper">
    我的提问
    <el-divider />
    <div class="question-content" v-for="question in questions" :key="question">
      <el-avatar shape="square" :size="40" :src="question.user.avatarUrl" />
      <div class="question-body">
        <div class="question-title">
          <router-link :to="{ path: '/question/' + question.id }">{{ question.title }}</router-link>
        </div>
        <div class="question-desc">
          {{ question.commentCount }} 个回复 • {{ question.viewCount }} 次浏览 • {{ question.gmtCreate }} •
          <el-link :href="'/publish/' + question.id">
            <el-icon><Edit /></el-icon> 编辑
          </el-link>
        </div>
      </div>
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
import { Edit } from '@element-plus/icons-vue'
import { myQuestions } from '@/api/profile'
import { ref } from 'vue'
import { getDate } from '@/util/time'

export default {
  components: {
    Edit
  },
  setup() {
    const questions = ref([])
    const pagination = ref({})
    const currentPage = ref(1)
    myQuestions().then(res => {
      console.log(res)
      res.data.pagination.data.forEach(question => {
        question.gmtCreate = getDate(question.gmtCreate)
      })
      questions.value = res.data.pagination.data
      pagination.value = res.data.pagination
    })
    //切换页面
    const handleCurrentPage = () => {
      myQuestions({ page: currentPage.value }).then(res => {
        res.data.pagination.data.forEach(question => {
          question.gmtCreate = getDate(question.gmtCreate)
        })
        questions.value = res.data.pagination.data
        pagination.value = res.data.pagination
      })
    }
    return { questions, pagination, currentPage, handleCurrentPage }
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
  display: flex;
  margin-bottom: 20px;
}
.question-body {
  margin-left: 10px;
}
.question-title {
  margin: 10px 0;
  font-size: 14px;
}
.question-title a {
  text-decoration: none;
  color: #409eff;
}
.question-title a:hover {
  text-decoration: underline;
  color: #79bbff;
}
.question-desc {
  font-size: 12px;
  color: #777;
}
</style>
