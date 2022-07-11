<template>
  <navbar />
  <main class="main-container">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </main>
  <footer class="footer">
    Copyright &copy; 2022 &bull; All Rights Reserved Powered By
    <a href="https://github.com/hdm9527/community-vue" target="_blank"> community </a>
  </footer>
</template>

<script>
import Navbar from '@/layout/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .main-container {
    padding: 80px 30px 0 30px;
    display: flex;
  }
}
@media screen and (min-width: 960px) {
  .main-container {
    padding: 80px 100px 0 100px;
    display: flex;
  }
}
@media screen and (min-width: 1400px) {
  .main-container {
    padding: 80px 250px 0 250px;
    display: flex;
  }
}
.footer {
  margin: 20px 0;
  text-align: center;
  color: #777;
}
.footer a {
  text-decoration: inherit;
  color: #409eff;
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
