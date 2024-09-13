<template>
  <div
    class="text-box"
    :style="textBoxStyle"
    @mousedown="onMouseDown"
    ref="textBox"
  >
    <textarea v-model="text" @input="updateText"></textarea>
    <div class="controls">
      <label>字体大小：
        <input type="number" v-model="fontSize" @input="updateStyle('fontSize', fontSize + 'px')" />
      </label>
      <label>字体颜色：
        <input type="color" v-model="textBox.style.color" @input="updateStyle('color', textBox.style.color)" />
      </label>
      <label>背景颜色：
        <input type="color" v-model="textBox.style.backgroundColor" @input="updateStyle('backgroundColor', textBox.style.backgroundColor)" />
      </label>
    </div>
    <div class="resize-handle" @mousedown.stop.prevent="onResizeMouseDown"></div>
  </div>
</template>

<script>
export default {
  name: 'TextBox',
  props: {
    textBox: Object,
  },
  data() {
    return {
      text: this.textBox.text,
      fontSize: parseInt(this.textBox.style.fontSize),
      dragging: false,
      resizing: false,
      offset: { x: 0, y: 0 },
      startSize: { width: 0, height: 0 },
      startMousePosition: { x: 0, y: 0 },
    };
  },
  computed: {
    textBoxStyle() {
      return {
        position: 'absolute',
        left: this.textBox.style.left,
        top: this.textBox.style.top,
        color: this.textBox.style.color,
        backgroundColor: this.textBox.style.backgroundColor,
        fontSize: this.textBox.style.fontSize,
        width: this.textBox.style.width || '150px',
        height: this.textBox.style.height || 'auto',
        overflow: 'hidden',
        boxSizing: 'border-box',
      };
    },
  },
  methods: {
    updateText() {
      this.textBox.text = this.text;
      this.updateTextBox();
    },
    updateStyle(styleProp, value) {
      this.textBox.style[styleProp] = value;
      this.updateTextBox();
    },
    updateTextBox() {
      this.$emit('update', this.textBox);
    },
    onMouseDown(event) {
      if (event.target.classList.contains('resize-handle')) {
        return;
      }
      this.dragging = true;
      this.offset.x = event.clientX - this.$el.offsetLeft;
      this.offset.y = event.clientY - this.$el.offsetTop;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    },
    onMouseMove(event) {
      if (this.dragging) {
        const left = event.clientX - this.offset.x;
        const top = event.clientY - this.offset.y;
        this.textBox.style.left = left + 'px';
        this.textBox.style.top = top + 'px';
        this.updateTextBox();
      } else if (this.resizing) {
        const deltaX = event.clientX - this.startMousePosition.x;
        const deltaY = event.clientY - this.startMousePosition.y;
        const newWidth = this.startSize.width + deltaX;
        const newHeight = this.startSize.height + deltaY;
        this.textBox.style.width = newWidth + 'px';
        this.textBox.style.height = newHeight + 'px';
        this.updateTextBox();
      }
    },
    onMouseUp() {
      this.dragging = false;
      this.resizing = false;
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    },
    onResizeMouseDown(event) {
      this.resizing = true;
      this.startSize.width = this.$el.clientWidth;
      this.startSize.height = this.$el.clientHeight;
      this.startMousePosition.x = event.clientX;
      this.startMousePosition.y = event.clientY;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    },
  },
};
</script>

<style scoped>
.text-box {
  border: 1px dashed #ccc;
  padding: 5px;
  position: absolute;
  cursor: move;
}

.text-box textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  resize: none;
  font-size: inherit;
  color: inherit;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
}

.controls label {
  margin-right: 10px;
  font-size: 12px;
}

.resize-handle {
  width: 10px;
  height: 10px;
  background-color: #666;
  position: absolute;
  right: 0;
  bottom: 0;
  cursor: se-resize;
}
</style>
