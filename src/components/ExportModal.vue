<template>
  <div class="export-modal" v-if="showModal">
    <div class="modal-content">
      <h3>导出图片</h3>
      <label>选择格式：
        <select v-model="exportFormat">
          <option value="png">PNG</option>
          <option value="jpeg">JPG</option>
        </select>
      </label>
      <div class="buttons">
        <button @click="exportImage">导出</button>
        <button @click="closeModal">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'ExportModal',
  data() {
    return {
      showModal: false,
      exportFormat: 'png',
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    exportImage() {
      const canvasElement = document.querySelector('.canvas');
      html2canvas(canvasElement, {
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        const mimeType = this.exportFormat === 'png' ? 'image/png' : 'image/jpeg';
        const imgData = canvas.toDataURL(mimeType);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `design.${this.exportFormat}`;
        link.click();
        this.closeModal();
      });
    },
  },
  mounted() {
    this.$root.$on('export-image', this.openModal);
  },
  beforeUnmount() {
    this.$root.$off('export-image', this.openModal);
  },
};
</script>

<style scoped>
.export-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 100px auto;
  padding: 20px;
  width: 300px;
  text-align: center;
}

.buttons {
  margin-top: 20px;
}

.buttons button {
  margin: 0 10px;
}
</style>
