<template>
  <div class="publish-container">
    <div class="publish-header">
      <i class="iconfont icon-jia"> 发起</i>
      <el-divider />
    </div>
    <div class="question-content">
      <div class="question-title">
        <span>问题标题 (简单扼要) :</span>
        <el-input v-model="question.title" placeholder="问题标题..." clearable :autofocus="true" />
      </div>
      <div class="mavon-editor">
        <md-editor v-model="question.content" placeholder="请输入问题描述" />
      </div>
      <div class="question-tags">
        <span class="add-tag">添加标签:</span>
        <el-input
          v-model="question.tags"
          @focus="isShowTags = !isShowTags"
          placeholder="输入标签, 以,逗号分隔"
          clearable />
        <el-tabs
          v-if="isShowTags"
          @focus="isShowTags"
          @blur="isShowTags = !isShowTags"
          v-model="activeName"
          class="demo-tabs">
          <el-tab-pane v-for="(tag, index) in tagList" :key="tag" :label="tag.categoryName" :name="index">
            <el-tag @click="clickTag($event)" v-for="name in tag.tags" :key="name">{{ name }}</el-tag>
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" @click="submit">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getTags, publishQuestion } from '@/api/publish'
import router from '@/router'
import { getQuestion } from '@/api/question'

export default {
  components: {
    MdEditor
  },
  setup() {
    const question = reactive({
      id: '',
      title: '',
      content: '',
      tags: ''
    })
    const activeName = ref(0)
    const tagList = ref([])
    getTags().then(res => {
      tagList.value = res.data.tags
    })
    const isShowTags = ref(false)
    //选择标签
    function clickTag(e) {
      if (question.tags === '') {
        question.tags = e.currentTarget.innerText
      }
      let flag = false
      question.tags.split(',').forEach(tag => {
        if (tag === e.currentTarget.innerText) {
          flag = true
        }
      })
      if (!flag) {
        question.tags = question.tags + ',' + e.currentTarget.innerText
      }
    }
    //提交
    function submit() {
      if (question.title !== '' && question.content !== '' && question.tags !== '') {
        publishQuestion(question.title, question.content, question.tags, questionId)
          .then(res => {
            if (res.code === 200) {
              router.push('/')
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    //获取要修改的问题

    const questionId = location.href.split('/publish/')[1]
    if (questionId !== '' && questionId !== undefined) {
      getQuestion(questionId).then(res => {
        question.id = res.data.question.id
        question.title = res.data.question.title
        question.content = res.data.question.description
        question.tags = res.data.question.tag
      })
    }
    return { question, activeName, tagList, isShowTags, clickTag, submit }
  }
}
</script>

<style scoped>
.publish-container {
  width: 70%;
  background-color: #ffffff;
  border-right: 1px solid #e6e6e6;
}
.publish-header {
  margin: 20px;
}
.icon-jia {
  font-size: 30px;
}
.question-content {
  padding: 0 20px 20px 20px;
}
.question-title span {
  padding-bottom: 10px;
  display: block;
}
.question-content {
  margin-top: 20px;
}
.mavon-editor {
  margin-top: 20px;
}
.question-tags {
  margin-top: 20px;
}
.add-tag {
  padding-bottom: 15px;
  display: block;
}
.demo-tabs {
  margin-top: 15px;
}
.el-tabs__content span {
  margin: 5px 5px 3px 0;
}
.el-tabs__content span:hover {
  cursor: pointer;
  color: #79bbff;
}
.question-tags button {
  float: right;
  margin: 10px 0;
}
</style>
