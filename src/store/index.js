import { createStore } from 'vuex';

export default createStore({
  state: {
    backgroundImage: null,
    textBoxes: [],
    canvasSize: { width: 800, height: 600 },
  },
  mutations: {
    setBackgroundImage(state, image) {
      state.backgroundImage = image;
    },
    addTextBox(state, textBox) {
      state.textBoxes.push(textBox);
    },
    updateTextBox(state, payload) {
      const index = state.textBoxes.findIndex(tb => tb.id === payload.id);
      if (index !== -1) {
        state.textBoxes.splice(index, 1, payload);
      }
    },
    setCanvasSize(state, size) {
      state.canvasSize = size;
    },
  },
  actions: {},
  getters: {
    backgroundImage: state => state.backgroundImage,
    textBoxes: state => state.textBoxes,
    canvasSize: state => state.canvasSize,
  },
});
