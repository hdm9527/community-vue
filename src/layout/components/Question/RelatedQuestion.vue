<template>
  <aside class="aside">
    <div class="related-question-header">
      <div class="initiator">发起人</div>
      <div class="avatar">
        <el-avatar shape="square" :size="40" :src="user.avatarUrl" />
        <span class="name">{{ user.name }}</span>
      </div>
      <el-divider />
    </div>
    <div class="related-question">相关问题</div>
    <div class="link">
      <router-link
        v-for="relatedQuestion in relatedQuestions"
        :key="relatedQuestion"
        :to="'/question/' + relatedQuestion.id">
        {{ relatedQuestion.title }}
      </router-link>
    </div>
  </aside>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const user = ref({})
    const relatedQuestions = ref([])
    function receiveRelated(data) {
      user.value = data.question.user
      relatedQuestions.value = data.relatedQuestions
    }
    return { user, relatedQuestions, receiveRelated }
  }
}
</script>

<style scoped>
.aside {
  width: 30%;
  background-color: #ffffff;
}
.related-question-header {
  margin: 20px;
}
.related-question {
  margin: 20px 0 20px 20px;
  font-size: 18px;
}
.link {
  margin-left: 20px;
}
.link a {
  margin: 5px 10px 5px 0;
  font-size: 14px;
  text-decoration: none;
  color: #409eff;
}
.link a:hover {
  text-decoration: underline;
  color: #79bbff;
}
.initiator {
  font-size: 18px;
}
.avatar {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.name {
  margin-left: 10px;
}
</style>
