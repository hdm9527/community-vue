<template>
  <div class="question-container">
    <publish-edit />
    <publish-guide />
  </div>
</template>

<script>
import PublishEdit from '@/layout/components/Publish/PublishEdit'
import PublishGuide from '@/layout/components/Publish/PublishGuide'
export default {
  components: {
    PublishEdit,
    PublishGuide
  }
}
</script>

<style scoped>
.question-container {
  width: 100%;
  display: flex;
}
</style>
