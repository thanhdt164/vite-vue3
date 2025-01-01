<template>
  <div v-if="isVisible" class="dialog-overlay">
    <div class="dialog">
      <h3>{{ message }}</h3>
      <div class="button-group">
        <button class="btn confirm" @click="confirm">Đồng ý</button>
        <button class="btn cancel" @click="cancel">Quay lại</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirmed');
      this.close();
    },
    cancel() {
      this.$emit('canceled');
      this.close();
    },
    close() {
      this.$emit('update:isVisible', false);
    }
  }
};
</script>

<style>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog {
  background: white;
  width: 600px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s;
}
.dialog:hover {
  transform: scale(1.02);
}
.button-group {
  margin-top: 20px;
}
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  color: white;
  outline: none;
}
.confirm {
  background: linear-gradient(135deg, #a3a3a3, #879587);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.confirm:hover {
  background: linear-gradient(135deg, #57a05c, #388e3c);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
.cancel {
  background: linear-gradient(135deg, #211818, #1c1313);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.cancel:hover {
  background: linear-gradient(135deg, #e53935, #c62828);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}
</style>