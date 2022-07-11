<template>
  <header class="navbar">
    <div class="navbar-wrapper">
      <div class="header-container">
        <div class="logo-container">
          <router-link to="/" @click="initData">社区</router-link>
          <div class="search">
            <el-input
              v-model="question"
              size="large"
              @keydown.enter="questionSearch"
              placeholder="搜索问题"
              clearable />
          </div>
          <el-button size="large" :icon="Search" @click="questionSearch" class="search-btn" />
        </div>
        <div class="content">
          <a class="login" v-if="loginStatus === false" @click="login">登录</a>
          <nav class="navbar-menu" v-if="loginStatus">
            <router-link class="link-item" to="/publish">提问</router-link>
            <router-link class="link-item message" to="/profile/replies">
              <span>消息</span>
              <span class="num" v-if="unreadCount !== 0">{{ unreadCount }}</span>
            </router-link>
          </nav>
          <div class="account">
            <el-dropdown trigger="click" v-if="loginStatus">
              <span class="el-dropdown-link">
                <el-avatar shape="square" :size="40" :src="avatarUrl" />
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <router-link to="/profile/questions">
                    <el-dropdown-item>我的问题</el-dropdown-item>
                  </router-link>
                  <el-dropdown-item>
                    <a href="/" class="logout" @click="logout">退出登录</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { removeToken, setToken } from '@/util/auth'
import useUserStore from '@/store/module/user'
import { storeToRefs } from 'pinia'
import router, { resetRouter } from '@/router'
import mitt from '@/util/mitt'

export default {
  setup() {
    const question = ref('')
    //获取用户信息
    const userStore = useUserStore()
    const { avatarUrl, unreadCount, loginStatus } = storeToRefs(userStore)
    //问题搜索
    const questionSearch = () => {
      mitt.emit('search', question.value)
    }
    //oauth登录
    function login() {
      const authorize_url = 'https://github.com/login/oauth/authorize'
      const client_id = '72c9bc45ffdad0ebbea3'
      const uuid = crypto.randomUUID()
      const githubUrl = `${authorize_url}?client_id=${client_id}&scope=user&state=${uuid}`
      window.open(
        githubUrl,
        'newwindow',
        'height=700, width=700, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no'
      )
      window.addEventListener(
        'message', //监听事件类型
        function (e) {
          setToken(e.data)
          userStore.getInfo()
          loginStatus.value = true
        },
        false
      )
    }
    const initData = () => {
      if (router.currentRoute.value.path === '/') {
        mitt.emit('init')
      }
    }
    const logout = () => {
      removeToken()
      resetRouter()
      loginStatus.value = false
    }
    return { question, loginStatus, avatarUrl, unreadCount, questionSearch, Search, initData, login, logout }
  }
}
</script>

<style scoped>
.navbar {
  width: 100%;
  position: fixed;
  background-color: #ffffff;
  z-index: 999;
}
@media screen and (min-width: 768px) {
  .navbar-wrapper {
    padding: 0 30px;
  }
}
@media screen and (min-width: 960px) {
  .navbar-wrapper {
    padding: 0 100px;
  }
}
@media screen and (min-width: 1400px) {
  .navbar-wrapper {
    padding: 0 250px;
  }
}
.navbar-wrapper a {
  color: #777;
}
.header-container {
  display: flex;
  justify-content: space-between;
}
.logo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-container a {
  line-height: 60px;
  text-decoration: inherit;
}
.search {
  width: 300px;
  margin-left: 30px;
}
.search :deep(.el-input__wrapper) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.search-btn {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #e7e9ee;
}
.content {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: center;
}
.content a {
  text-decoration: inherit;
}
.login {
  cursor: pointer;
}
.navbar-menu {
  display: flex;
}
.navbar-menu a {
  display: block;
  padding: 0 12px;
  text-decoration: inherit;
}
.link-item {
  display: block;
  padding: 0 12px;
  font-size: 14px;
  line-height: 60px;
  align-items: center;
}
.message {
  position: relative;
}
.message .num {
  min-width: 16px;
  height: 16px;
  position: absolute;
  top: -20px;
  right: 0px;
  color: #ffffff;
  background-color: #fa5a57;
  margin-top: 26px;
  text-align: center;
  font-size: 12px;
  padding: 0 3px;
  line-height: 15px;
  border-radius: 8px;
}
.account {
  padding: 0 12px;
}
.el-dropdown-menu a {
  color: #777;
  text-decoration: inherit;
}
.el-dropdown-link {
  cursor: pointer;
}
a:hover {
  color: #409eff;
}
.logout {
  text-decoration: inherit;
  color: #777;
}
</style>
