import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'
import AppMain from '@/layout/components/AppMain'
import { getToken } from '@/util/auth'
import useUserStore from '@/store/module/user'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Layout,
    meta: { title: 'Community' },
    children: [
      {
        path: '',
        component: AppMain
      },
      {
        path: 'publish',
        component: () => import(/* webpackChunkName: "publish" */ '@/layout/components/Publish'),
        meta: { title: 'question - publish' }
      },
      {
        path: 'publish/:questionId',
        component: () => import(/* webpackChunkName: "publish" */ '@/layout/components/Publish'),
        meta: { title: 'question - edit' }
      },
      {
        path: 'question/:questionId',
        component: () => import(/* webpackChunkName: "question" */ '@/layout/components/Question'),
        meta: { title: 'question - info' }
      },
      {
        path: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/layout/components/Reply'),
        children: [
          {
            path: 'questions',
            component: () => import(/* webpackChunkName: "questions" */ '@/layout/components/Reply/MyQuestion'),
            meta: { title: 'profile - questions' }
          },
          {
            path: 'replies',
            component: () => import(/* webpackChunkName: "replies" */ '@/layout/components/Reply/RecentlyReply'),
            meta: { title: 'profile - replies' }
          }
        ]
      }
    ]
  },
  {
    path: '/notification/:id',
    component: () => import(/* webpackChunkName: "notification" */ '@/components/Notification')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  if (getToken()) {
    useUserStore()
      .getInfo()
      .catch(() => {
        useUserStore().logout()
      })
  }
  next()
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 新路由实例matcer，赋值给旧路由实例的matcher，（相当于replaceRouter）
}

export default router
