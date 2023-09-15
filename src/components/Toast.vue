<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Toast',
  props: {
    message: { type: String, required: true }
  }
}
export const useToastEffect = () => {
  const toastData = reactive({ showToast: false, toastMessage: '' })
  const showToast = message => {
    toastData.toastMessage = message
    toastData.showToast = true
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMessage = ''
    }, 2000)
  }
  return { toastData, showToast }
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
