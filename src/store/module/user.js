import { defineStore } from 'pinia'
import { getToken, removeToken } from '@/util/auth'
import { getUser } from '@/api/user'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      avatarUrl: '',
      unreadCount: 0,
      loginStatus: false
    }
  },
  getters: {
    avatar() {
      return this.avatarUrl
    },
    count() {
      return this.count()
    }
  },
  actions: {
    //获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getUser()
          .then(res => {
            this.avatarUrl = res.data.user.avatarUrl
            this.unreadCount = res.data.unreadCount
            this.loginStatus = true
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    logout() {
      removeToken()
      this.avatarUrl = ''
      this.unreadCount = 0
      this.loginStatus = false
    }
  }
})

export default useUserStore
