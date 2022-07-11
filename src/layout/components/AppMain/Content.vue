<template>
  <main class="page-content">
    <div class="page-content-header">
      <i class="iconfont icon-liebiao"> 发现</i>
      <el-divider />
    </div>
    <div class="page-content-body">
      <div class="question-content" v-for="question in questions" :key="question">
        <el-avatar shape="square" :size="40" :src="question.user.avatarUrl" />
        <div class="question-body">
          <div class="question-title">
            <router-link :to="{ path: '/question/' + question.id }">{{ question.title }}</router-link>
          </div>
          <div class="question-desc">
            {{ question.commentCount }} 个回复 • {{ question.viewCount }} 次浏览 • {{ question.gmtCreate }}
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
  </main>
</template>

<script>
import { ref } from 'vue'
import { getDate } from '@/util/time'
import { getIndexData } from '@/api/question'
import mitt from '@/util/mitt'

export default {
  setup() {
    const questions = ref([])
    const pagination = ref({})
    const currentPage = ref(1)
    function getQuestions(data) {
      data.data.forEach(question => {
        question.gmtCreate = getDate(question.gmtCreate)
      })
      questions.value = data.data
      pagination.value = data
    }
    function questionSearch(tag) {
      getIndexData({ page: 1, size: 5, tag: tag })
        .then(res => {
          res.data.pagination.data.forEach(question => {
            question.gmtCreate = getDate(question.gmtCreate)
          })
          pagination.value = res.data.pagination
          questions.value = res.data.pagination.data
        })
        .catch(err => {
          console.log(err)
        })
    }
    //热门tag
    mitt.on('hotTag', tag => {
      questionSearch(tag)
    })
    //问题搜索
    mitt.on('search', keyword => {
      getIndexData({ page: 1, size: 5, search: keyword })
        .then(res => {
          res.data.pagination.data.forEach(question => {
            question.gmtCreate = getDate(question.gmtCreate)
          })
          pagination.value = res.data.pagination
          questions.value = res.data.pagination.data
        })
        .catch(err => {
          console.log(err)
        })
    })
    //切换页面
    const handleCurrentPage = () => {
      getIndexData({ page: currentPage.value }).then(res => {
        res.data.pagination.data.forEach(question => {
          question.gmtCreate = getDate(question.gmtCreate)
        })
        pagination.value = res.data.pagination
        questions.value = res.data.pagination.data
      })
    }
    return { questions, pagination, currentPage, handleCurrentPage, getQuestions }
  }
}
</script>

<style scoped>
.page-content {
  width: 70%;
  background-color: #ffffff;
  border-right: 1px solid #e6e6e6;
}
.page-content-header {
  margin: 20px;
}
.icon-liebiao {
  font-size: 30px;
}
.page-content-body {
  margin: 20px;
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
