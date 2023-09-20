<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img" />
    <div class="wrapper__input">
      <input v-model="username" type="text" placeholder="请输入用户名" class="wrapper__input__content" />
    </div>
    <div class="wrapper__input">
      <input v-model="password" type="password" placeholder="请输入密码" class="wrapper__input__content" />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登 录</div>
    <div class="wrapper__login-link" @click="handleRegister">立即注册</div>
  </div>
  <Toast v-show="toastVisible" :message="toastMessage" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { postRequest } from '@/utils/request'
import Toast, { useToastEffect } from '@/components/Toast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    const { username, password } = data
    if (!username) return showToast('请输入用户名')
    if (!password) return showToast('请输入密码')
    try {
      const result = await postRequest('/api/user/login', { username, password })
      if (result?.errno === 0) {
        localStorage.setItem('isLogin', 'true')
        router.push({ name: 'home' })
      } else {
        showToast('登录失败')
      }
    } catch (err) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegister = () => {
    router.push({ name: 'register' })
  }
  return { handleRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { toastVisible, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegister } = useRegisterEffect()
    return { username, password, toastVisible, toastMessage, handleLogin, handleRegister }
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
    border: 1px solid rgba(0, 0, 0, 0.10); border-radius: 6px;
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
  &__login-button {
    color: $bgColor; font-size: .16rem;
    background: $btn-bgColor;
    line-height: .48rem; text-align: center;
    border-radius: .04rem;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    margin: .32rem .4rem .16rem .4rem;
  }
  &__login-link {
    color: $content-notice-fontcolor; font-size: .14rem;
    text-align: center;
  }
}
</style>
