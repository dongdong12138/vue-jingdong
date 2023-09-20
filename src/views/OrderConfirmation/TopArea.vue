<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe6f2;</div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">瑶妹（先生）</span>
        <span class="top__receiver__info__name">18911024266</span>
      </div>
      <div class="iconfont top__receiver__icon">&#xe6f2;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopArea',
  setup() {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.top {
  height: 1.96rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, $btn-bgColor 50%);
  background-repeat: no-repeat;
  background-size: 100% 1.59rem;
  position: relative;
  &__header {
    color: $bgColor; font-size: .16rem;
    line-height: .24rem; text-align: center;
    padding-top: .2rem;
    position: relative;
    &__back {
      font-size: .22rem;
      position: absolute; left: .18rem;
    }
  }
  &__receiver {
    height: 1.11rem;
    background: $bgColor;
    border-radius: .04rem;
    position: absolute; left: .18rem; right: .18rem; bottom: 0;
    &__title {
      color: $content-fontcolor; font-size: .16rem;
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
    }
    &__address {
      color: $content-fontcolor; font-size: .14rem;
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
    }
    &__info {
      padding: .06rem 0 0 .16rem;
      &__name {
        color: $medium-fontColor; font-size: .12rem;
        line-height: .18rem;
        margin-right: .06rem;
      }
    }
    &__icon {
      color: $medium-fontColor; font-size: .2rem;
      position: absolute; right: .16rem; top: .5rem;
      transform: rotate(180deg);
    }
  }
}
</style>
