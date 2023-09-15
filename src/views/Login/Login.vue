<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img" />
    <div class="wrapper__input">
      <input placeholder="请输入手机号" class="wrapper__input__content" />
    </div>
    <div class="wrapper__input">
      <input placeholder="请输入密码" class="wrapper__input__content" />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登 陆</div>
    <div class="wrapper__login-link">立即注册</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const handleLogin = () => {
      localStorage.setItem('isLogin', 'true')
      router.push({ name: 'home' })
    }
    return { handleLogin }
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
      line-height: .48rem;
      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }
  &__login-button {
    color: #fff; font-size: .16rem;
    background: #0091FF;
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
