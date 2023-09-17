<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'Toast',
  props: {
    message: { type: String, required: true }
  }
}
export const useToastEffect = () => {
  const toastData = reactive({ toastVisible: false, toastMessage: '' })
  const showToast = message => {
    toastData.toastMessage = message
    toastData.toastVisible = true
    setTimeout(() => {
      toastData.toastVisible = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { toastVisible, toastMessage } = toRefs(toastData)
  return { toastVisible, toastMessage, showToast }
}
</script>

<style scoped lang="scss">
@import "../style/viriables.scss";

.toast {
  color: $bgColor;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  padding: .1rem;
  position: fixed; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
}
</style>
