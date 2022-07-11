import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import './assets/style/icons/iconfont/iconfont.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(mavonEditor)
app.use(router)
app.use(store)
app.mount('#app')
