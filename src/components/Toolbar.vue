<template>
  <div class="toolbar">
    <!-- 其他按钮和控件 -->
    <button @click="exportImage">导出图片</button>
    <!-- 文件输入框 -->
    <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" />
  </div>
</template>

<script>
export default {
  // ...其他代码
  methods: {
    // ...其他方法
    exportImage() {
      this.$root.$emit('export-image');
    },
  },
};
</script>
