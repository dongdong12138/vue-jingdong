<template>
  <div class="wrapper">

    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6f2;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe62d;</span>
        <input type="text" placeholder="请输入商品名称" class="search__content__input" />
      </div>
    </div>

    <ShopInfo v-if="item.imgUrl" :item="item" :hideBorder="true" />
    <ShopContent :shop-name="item.name" />
    <ShopCart />

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRequest } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo.vue'
import ShopContent from './Content.vue'
import ShopCart from './Cart.vue'

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await getRequest(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

export default {
  name: 'Shop',
  components: { ShopInfo, ShopContent, ShopCart },
  setup() {
    const { handleBackClick } = useBackRouterEffect()
    const { item, getItemData } = useShopInfoEffect()
    getItemData()
    return { item, handleBackClick }
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
