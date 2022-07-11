<template>
  <div class="replies-container">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
    <div class="profile">
      <el-menu class="el-menu-vertical-demo" :default-active="activeIndex">
        <el-menu-item index="1">
          <router-link to="/profile/questions">
            <span>我的提问</span>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/profile/replies"> 最新回复 </router-link>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { ref } from 'vue'

export default {
  setup() {
    const activeIndex = ref('')
    if (router.currentRoute.value.path === '/profile/replies') {
      activeIndex.value = '2'
    } else {
      activeIndex.value = '1'
    }
    return { activeIndex }
  }
}
</script>

<style scoped>
.replies-container {
  width: 100%;
  display: flex;
  background-color: #ffffff;
}
.profile {
  width: 30%;
  margin: 20px;
}
.el-menu {
  border-radius: 4px;
  border-top: solid 1px var(--el-menu-border-color);
  border-left: solid 1px var(--el-menu-border-color);
  border-right: solid 1px var(--el-menu-border-color);
}
.el-menu-item {
  border-bottom: solid 1px var(--el-menu-border-color);
}
.el-menu-item a {
  text-decoration: inherit;
  color: #777;
}
.el-menu-item a:hover {
  color: #409eff;
}
.el-pagination {
  margin-top: 10px;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.25s ease-in;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 0.25s ease-in;
}
.fade-leave-to {
  opacity: 0;
}
</style>
