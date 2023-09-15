<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    message: { type: String, required: true }
  }
}
</script>

<style scoped lang="scss">
.toast {
  color: #fff;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  padding: .1rem;
  position: fixed; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
}
</style>
