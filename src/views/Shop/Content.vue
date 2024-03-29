<template>
  <div class="content">

    <div class="category">
      <div
        v-for="item in categories" :key="item.name"
        :class="['category__item', {'category__item--active': item.tab === currentTab}]"
        @click="handleTabClick(item.tab)"
      >{{ item.name }}</div>
    </div>

    <div class="product">
      <div v-for="item in contentList" :key="item._id" class="product__item">
        <img :src="item.imgUrl" alt="productImg" class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont" @click="changeCartItem(shopId, item._id, item, -1, shopName)">&#xe691;</span>
          {{ getProductCartCount(shopId, item._id) }}
          <span class="product__number__plus iconfont" @click="changeCartItem(shopId, item._id, item, 1, shopName)">&#xe668;</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getRequest } from '@/utils/request'
import useCartEffect from '@/hooks/useCartEffect'

const categories = [
  { name: '全部商品', tab: 'all' }, { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = tab => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

const useContentListEffect = (tab, shopId) => {
  const data = reactive({ contentList: [] })
  const getContentList = async () => {
    const result = await getRequest(`/api/shop/${shopId}/products`, { tab: tab.value })
    if (result?.errno === 0 && result?.data?.length) {
      data.contentList = result.data
    }
  }
  watchEffect(() => getContentList())
  const { contentList } = toRefs(data)
  return { contentList }
}

const useContentCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'ShopContent',
  props: ['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { contentList } = useContentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useContentCartEffect()
    return {
      shopId, categories, contentList,
      currentTab, handleTabClick,
      cartList, changeCartItem, getProductCartCount
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.content {
  display: flex;
  position: absolute; left: 0; right: 0; top: 1.5rem; bottom: .5rem;
}

.category {
  width: .76rem; height: 100%;
  background: $search-bgColor;
  overflow-y: scroll;
  &__item {
    color: $content-fontcolor; font-size: .14rem;
    line-height: .4rem; text-align: center;
    &--active {
      background: $bgColor;
    }
  }
}

.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    border-bottom: .01rem solid $content-bgColor;
    display: flex;
    padding: .12rem 0; margin: 0 .16rem;
    position: relative;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .68rem; height: .68rem;
      margin-right: .16rem;
    }
    &__title {
      color: $content-fontcolor; font-size: .14rem;
      line-height: .2rem;
      margin: 0;
      @include ellipsis;
    }
    &__sales {
      color: $content-fontcolor; font-size: .12rem;
      margin: .06rem 0;
    }
    &__price {
      color: $hightlight-fontColor; font-size: .14rem;
      line-height: .2rem;
      margin: 0;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      color: $light-fontColor; font-size: .12rem;
      text-decoration: line-through; line-height: .2rem;
      margin-left: .06rem;
    }
    .product__number {
      line-height: .18rem;
      position: absolute; right: 0; bottom: .12rem;
      &__minus {
        color: $medium-fontColor;
        margin-right: .05rem;
        position:relative; top: .02rem;
      }
      &__plus {
        color: $btn-bgColor;
        margin-left: .05rem;
        position:relative; top: .02rem;
      }
    }
  }
}
</style>
