<template>
  <aside class="aside">
    <div class="related-question">热门标签</div>
    <div class="link">
      <el-tag @click="searchTag($event)" :key="tag" v-for="tag in tags">{{ tag }}</el-tag>
    </div>
  </aside>
</template>

<script>
import { ref } from 'vue'
import mitt from '@/util/mitt'
export default {
  setup() {
    const tags = ref([])
    function getTags(data) {
      tags.value = data
    }
    function searchTag(e) {
      mitt.emit('hotTag', e.currentTarget.innerText)
    }
    return { tags, getTags, searchTag }
  }
}
</script>

<style scoped>
.aside {
  width: 30%;
  background-color: #ffffff;
}
.related-question {
  margin: 20px 0 20px 20px;
  font-size: 20px;
}
.link {
  margin-left: 20px;
}
.link a {
  text-decoration: none;
}
.link span {
  margin: 5px 10px 5px 0;
  color: #409eff;
}
.link span:hover {
  cursor: pointer;
  color: #79bbff;
}
</style>
