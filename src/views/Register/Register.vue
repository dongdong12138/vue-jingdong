<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img" />
    <div class="wrapper__input">
      <input v-model="username" type="text" placeholder="请输入用户名" class="wrapper__input__content" />
    </div>
    <div class="wrapper__input">
      <input v-model="password" type="password" placeholder="请输入密码" class="wrapper__input__content" />
    </div>
    <div class="wrapper__input">
      <input v-model="ensure" type="password" placeholder="确认密码" class="wrapper__input__content" />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注 册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有账号去登录</div>
  </div>
  <Toast v-show="toastVisible" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { postRequest } from '@/utils/request'
import Toast, { useToastEffect } from '@/components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensure: '' })
  const handleRegister = async () => {
    const { username, password, ensure } = data
    if (!username) return showToast('请输入用户名')
    if (!password) return showToast('请输入密码')
    if (!ensure) return showToast('请输入确认密码')
    if (password !== ensure) return showToast('两次输入的密码不一致')
    try {
      const result = await postRequest('/api/user/register', { username, password, ensure })
      if (result?.errno === 0) {
        router.push({ name: 'login' })
      } else {
        showToast('注册失败')
      }
    } catch (err) {
      showToast('请求失败')
    }
  }
  const { username, password, ensure } = toRefs(data)
  return { username, password, ensure, handleRegister }
}

const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: { Toast },
  setup() {
    const { toastVisible, toastMessage, showToast } = useToastEffect()
    const { username, password, ensure, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return { username, password, ensure, toastVisible, toastMessage, showToast, handleRegister, handleLoginClick }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.wrapper {
  position: absolute; left: 0; top: 50%; right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: .66rem; height: .66rem;
    margin: 0 auto .4rem auto;
  }
  &__input {
    height: .48rem;
    background: #F9F9F9;
    border: .01rem solid rgba(0,0,0,0.10); border-radius: .06rem;
    padding: 0 .16rem; margin: 0 .4rem .16rem .4rem;
    &__content {
      color: $content-notice-fontcolor; font-size: .16rem;
      width: 100%;
      background: none;
      border: none; outline: none;
      line-height: .22rem;
      margin-top: .12rem;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__register-button {
    color: $bgColor; font-size: .16rem;
    background: $btn-bgColor;
    border-radius: .04rem;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    text-align: center; line-height: .48rem;
    margin: .32rem .4rem .16rem .4rem;
  }
  &__register-link {
    color: $content-notice-fontcolor; font-size: .14rem;
    text-align: center;
  }
}
</style>
