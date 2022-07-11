<template>
  <main class="page-content">
    <div class="page-content-header">
      <div class="question-title">{{ question.title }}</div>
      <div class="question-desc">
        作者: {{ user.name }} | 发布时间: {{ question.gmtCreate }} | 阅读数: {{ question.viewCount }}
      </div>
      <el-divider />
    </div>
    <div class="page-content-body">
      <div class="question-content">
        <md-editor v-model="question.description" :preview-only="true" />
      </div>
      <el-divider />
      <div class="question-tag">
        <el-tag v-for="tag in question.tag" :key="tag">{{ tag }}</el-tag>
      </div>
      <div v-if="token">
        <el-divider />
        <div class="question-edit">
          <el-link @click="edit" :href="'/publish/' + question.id">
            <el-icon><Edit /></el-icon> 编辑
          </el-link>
        </div>
      </div>
      <el-divider />
      <div class="comment-count">{{ question.commentCount }} 个回复</div>
      <el-divider />
      <div class="reply-body" v-for="comment in comments" :key="comment.id">
        <div class="reply-body-wrapper">
          <div class="reply-left">
            <el-avatar class="reply-avatar" shape="square" :size="40" :src="comment.user.avatarUrl" />
          </div>
          <div class="reply-right">
            <div class="reply-info">
              <span class="reply-name">{{ comment.user.name }}</span>
              <span class="reply-desc">{{ comment.content }}</span>
              <div class="reply-icon">
                <div>
                  <i class="iconfont icon-dianzan"></i>
                  <i class="iconfont icon-pinglun" @click="subComments(comment)"></i>
                  <span class="reply-num">{{ comment.commentCount }}</span>
                </div>
                <div>
                  <span class="reply-time">{{ comment.gmtCreate }}</span>
                </div>
              </div>
              <div class="sub-comments" v-if="comment.showSubComment">
                <div v-for="second in comment.secondComments" :key="second">
                  <div class="sub-comments-body">
                    <el-avatar shape="square" :size="40" :src="second.user.avatarUrl" />
                    <div class="sub-comments-info">
                      <div class="sub-comments-name">{{ second.user.name }}</div>
                      <div class="sub-comments-content">{{ second.content }}</div>
                      <div class="sub-comments-time">{{ second.gmtCreate }}</div>
                    </div>
                  </div>
                  <el-divider />
                </div>
                <el-input v-model="subReplyContent" placeholder="评论一下..." clearable />
                <el-button class="comment-btn" type="primary" @click="handleSubReply(comment)">评论</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-divider />
      </div>
      <div class="reply-input">
        <span>提交回复</span>
        <el-divider />
        <div class="avatar">
          <el-avatar v-if="user !== undefined" shape="square" :size="40" :src="user.avatarUrl" />
          <span class="name">{{ user.name }}</span>
        </div>
        <el-input v-model="replyContent" :rows="10" type="textarea" placeholder="请输入回复内容" />
        <el-button type="primary" @click="handleReply">回复</el-button>
      </div>
    </div>
  </main>
</template>

<script>
import { Edit } from '@element-plus/icons-vue'
import { getToken } from '@/util/auth'
import { ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getUser } from '@/api/user'
import { getDate } from '@/util/time'
import { getSubComments, publishComment } from '@/api/question'

export default {
  components: {
    Edit,
    MdEditor
  },
  setup() {
    const token = getToken() !== undefined
    const replyContent = ref('')
    const subReplyContent = ref('')
    const question = ref({})
    const comments = ref([])
    const user = ref({})

    //回复评论
    function handleReply() {
      publishComment(question.value.id, replyContent.value, 1)
        .then(res => {
          if (res.code === 200) {
            console.log('回复成功')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    //二级回复评论
    function handleSubReply(comment) {
      publishComment(comment.id, subReplyContent.value, 2)
        .then(res => {
          if (res.code === 200) {
            console.log('回复成功')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    //接收问题数据
    function receiveQuestion(data) {
      data.comments.forEach(comment => {
        comment.gmtCreate = getDate(comment.gmtCreate)
        comment.showSubComment = false
      })
      question.value = data.question
      comments.value = data.comments
    }
    //获取子评论
    function subComments(comment) {
      comment.showSubComment = !comment.showSubComment
      if (comment.commentCount !== 0) {
        getSubComments(comment.id).then(res => {
          if (res.data.length !== 0) {
            res.data.forEach(comment => {
              comment.gmtCreate = getDate(comment.gmtCreate)
            })
            comment.secondComments = res.data
          }
        })
      }
    }
    //检测当前是否登录
    if (getToken()) {
      getUser().then(res => {
        user.value = res.data.user
      })
    } else {
      user.value.name = '匿名用户'
      user.value.avatarUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
    const edit = () => {}
    return {
      token,
      replyContent,
      subReplyContent,
      handleReply,
      handleSubReply,
      question,
      comments,
      user,
      subComments,
      receiveQuestion,
      edit
    }
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

.page-content-body {
  margin: 20px;
}

.question-content {
  display: flex;
  margin-bottom: 20px;
}

.question-title {
  margin: 10px 0;
  font-size: 16px;
}

.question-desc {
  font-size: 14px;
  color: #777;
}

.reply-body-wrapper {
  display: flex;
  justify-content: flex-start;
}
.reply-left {
}
.reply-right {
  width: 100%;
}

.reply-icon {
  display: flex;
  justify-content: space-between;
}
.reply-icon i {
  cursor: pointer;
}

.sub-comments {
  margin: 10px 0;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 10px 10px 52px 10px;
}
.comment-btn {
  margin-top: 10px;
  float: right;
}
.sub-comments-body {
  display: flex;
  justify-content: flex-start;
}
.sub-comments-info {
  width: 100%;
  margin: 10px 0 0 10px;
}
.sub-comments-name {
  font-size: 16px;
}
.sub-comments-content {
  margin-top: 10px;
  font-size: 14px;
}
.sub-comments-time {
  margin-top: 10px;
  font-size: 14px;
  color: #777777;
  float: right;
}
.reply-time {
  color: #777777;
  font-size: 14px;
}

.reply-avatar {
}

.reply-name {
  display: block;
  font-size: 16px;
  margin-top: 12px;
}

.reply-desc {
  margin-top: 10px;
  display: block;
  font-size: 14px;
}
.icon-dianzan {
  margin-top: 10px;
  display: inline-block;
}
.icon-pinglun {
  margin-left: 10px;
}
.reply-num {
  margin-left: 10px;
}
.reply-info {
  margin-left: 5px;
}

.comment-count {
}

.question-tag span {
  margin: 5px 10px 5px 0;
}

.question-edit a {
  color: #777777;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}

.question-edit a:hover {
  color: #999999;
}

.reply-input span {
  margin-bottom: 20px;
  display: block;
}

.reply-input button {
  float: right;
  margin: 10px 0;
}

.avatar {
  display: flex;
  align-items: center;
}

.name {
  margin-left: 10px;
}
</style>
