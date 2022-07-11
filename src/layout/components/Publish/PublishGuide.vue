<template>
  <div class="publish-guide">
    <div class="publish-guide-wrapper">
      <div class="guide-title">问题发起指南</div>
      <span>• 问题标题: 请用精简的语言描述您发布的问题，不超过25字</span>
      <span>• 问题补充: 详细补充您的问题内容，并确保问题描述清晰直观, 并提供一些相关的资料</span>
      <span>• 选择标签: 选择一个或者多个合适的标签，用逗号隔开，每个标签不超过10个字</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.publish-guide {
  width: 30%;
  background-color: #ffffff;
}
.publish-guide-wrapper {
  padding: 15px;
}
.publish-guide-wrapper span {
  display: block;
  margin: 10px 0;
  color: #3e3e3e;
}
.guide-title {
  font-size: 20px;
}
</style>
