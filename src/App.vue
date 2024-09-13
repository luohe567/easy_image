<template>
  <div id="app">
    <Toolbar />
    <Canvas />
    <ExportModal />
  </div>
</template>

<script>
import Toolbar from './components/Toolbar.vue';
import Canvas from './components/Canvas.vue';
import ExportModal from './components/ExportModal.vue';

export default {
  name: 'App',
  components: {
    Toolbar,
    Canvas,
    ExportModal,
  },
};
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
