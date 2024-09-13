<template>
  <div class="canvas-container">
    <div
      class="canvas"
      :style="{ width: canvasSize.width + 'px', height: canvasSize.height + 'px' }"
      ref="canvas"
    >
      <img
        v-if="backgroundImage"
        :src="backgroundImage"
        class="background-image"
        :style="{ width: canvasSize.width + 'px', height: canvasSize.height + 'px' }"
      />
      <TextBox
        v-for="textBox in textBoxes"
        :key="textBox.id"
        :textBox="textBox"
        @update="updateTextBox"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TextBox from './TextBox.vue';

export default {
  name: 'Canvas',
  components: {
    TextBox,
  },
  computed: {
    ...mapGetters(['backgroundImage', 'textBoxes', 'canvasSize']),
  },
  methods: {
    updateTextBox(updatedTextBox) {
      this.$store.commit('updateTextBox', updatedTextBox);
    },
  },
};
</script>

<style scoped>
.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.canvas {
  position: relative;
  border: 1px solid #ccc;
  background-color: #fff;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}
</style>
