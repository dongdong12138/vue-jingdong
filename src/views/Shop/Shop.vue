<template>
  <div class="wrapper">

    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6f2;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe62d;</span>
        <input type="text" placeholder="请输入商品名称" class="search__content__input" />
      </div>
    </div>

    <ShopInfo :item="item" :hideBorder="true" />

  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import ShopInfo from '@/components/ShopInfo.vue'

export default {
  name: 'Shop',
  components: { ShopInfo },
  setup() {
    const router = useRouter()
    const item = {
      _id: '1',
      name: '沃尔玛',
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      sales: 10000,
      expressLimit: 0,
      expressPrice: 5,
      slogan: 'VIP尊享满89元减4元运费券'
    }
    const handleBackClick = () => {
      router.back()
    }
    return {
      item,
      handleBackClick
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.wrapper {
  padding: 0 .18rem;
}

.search {
  line-height: .32rem;
  display: flex;
  margin: .14rem 0 .04rem 0;
  &__back {
    color: #B6B6B6; font-size: .24rem;
    width: .3rem;
  }
  &__content {
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;
    display: flex;
    &__icon {
      color: $search-fontColor; text-align: center;
      width: .44rem;
    }
    &__input {
      display: block;
      color: $content-fontcolor; font-size: .14rem;
      width: 100%; height: .32rem;
      border: none; outline: none;
      background: none;
      padding-right: .2rem;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
