<template>
  <div v-if="showCart" class="mask"></div>
  <div class="cart">

    <div v-if="showCart" class="product">
      <div class="product__header">
        <div class="product__header__all" @click="setCartItemsChecked(shopId)">
          <span v-html="allChecked ? '&#xe652;': '&#xe6f7;'" class="product__header__icon iconfont"></span>全选
        </div>
        <div class="product__header__clear" @click="cleanCartProducts(shopId)">清空购物车</div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <div
            v-html="item.check ? '&#xe652;': '&#xe6f7;'"
            class="product__item__checked iconfont"
            @click="changeCartItemChecked(shopId, item._id)"
          />
          <img :src="item.imgUrl" class="product__item__img" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus" @click="changeCartItemInfo(shopId, item._id, item, -1)">-</span>
            {{ item.count || 0 }}
            <span class="product__number__plus" @click="changeCartItemInfo(shopId, item._id, item, 1)">+</span>
          </div>
        </div>
      </template>
    </div>

    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" @click="handleCartShowChange" />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ price }}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import useCartEffect from './hooks/useCartEffect'

const useComputedCartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const { cartList } = store.state
  const shopId = route.params.id

  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const key in productList) {
        const product = productList[key]
        count += product.count
      }
    }
    return count
  })

  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const key in productList) {
        const product = productList[key]
        if (product.check) {
          count += (product.count * product.price)
        }
      }
    }
    return count.toFixed(2)
  })

  const allChecked = computed(() => {
    const productList = cartList[shopId]
    let result = true
    if (productList) {
      for (const key in productList) {
        const product = productList[key]
        if (product.count > 0 && !product.check) {
          result = false
        }
      }
    }
    return result
  })

  const productList = computed(() => {
    return cartList[shopId] || []
  })

  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  const cleanCartProducts = shopId => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = shopId => {
    store.commit('setCartItemsChecked', { shopId })
  }

  return { total, price, allChecked, productList, changeCartItemChecked, cleanCartProducts, setCartItemsChecked }
}
export default {
  name: 'ShopCart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { total, price, allChecked, productList, changeCartItemChecked, cleanCartProducts, setCartItemsChecked } = useComputedCartEffect()
    const { changeCartItemInfo } = useCartEffect()
    const showCart = ref(false)
    const handleCartShowChange = () => {
      showCart.value = !showCart.value
    }
    return {
      shopId,
      total, price, allChecked, productList, changeCartItemChecked, cleanCartProducts, setCartItemsChecked,
      changeCartItemInfo,
      showCart, handleCartShowChange
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/iconfont.css";
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.mask {
  background: rgba(0, 0, 0, .5);
  position: fixed; left: 0; right: 0; top: 0; bottom: 0;
  z-index: 1;
}

.cart {
  background: #FFF;
  position: absolute; left: 0; right: 0; bottom: 0;
  z-index: 2;
}

.product {
  flex: 1;
  background: #FFF;
  overflow-y: scroll;
  &__header {
    color: #333; font-size: .14rem;
    border-bottom: 1px solid #F1F1F1;
    line-height: .52rem;
    display: flex;
    &__all {
      width: .64rem;
      margin-left: .18rem;
    }
    &__icon {
      color: #0091FF; font-size: .2rem;
      display: inline-block;
    }
    &__clear {
      text-align: right;
      flex: 1;
      margin-right: .16rem;
    }
  }
  &__item {
    display: flex;
    border-bottom: .01rem solid $content-bgColor;
    padding: .12rem 0; margin: 0 .16rem;
    position: relative;
    &__checked {
      color: #0091FF; font-size: .2rem;
      line-height: .5rem;
      margin-right: .2rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .46rem; height: .46rem;
      margin-right: .16rem;
    }
    &__title {
      color: $content-fontcolor; font-size: .14rem;
      line-height: .2rem;
      margin: 0;
      @include ellipsis;
    }
    &__price {
      color: $hightlight-fontColor; font-size: .14rem;
      line-height: .2rem;
      margin: .06rem 0 0 0;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      color: $light-fontColor; font-size: .12rem;
      line-height: .2rem; text-decoration: line-through;
      margin-left: .06rem;
    }
    .product__number {
      position: absolute; right: 0; bottom: .12rem;
      &__minus, &__plus {
        display: inline-block;
        font-size: .2rem;
        width: .2rem; height: .2rem;
        line-height: .16rem;; text-align: center;
        border-radius: 50%;
      }
      &__minus {
        color: $medium-fontColor;
        border: .01rem solid $medium-fontColor;
        margin-right: .05rem;
      }
      &__plus {
        color: $bgColor;
        background: $btn-bgColor;
        margin-left: .05rem;
      }
    }
  }
}

.check {
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  &__icon {
    width: .84rem;
    position: relative;
    &__img {
      display: block;
      width: .28rem; height: .26rem;
      margin: .12rem auto;
    }
    &__tag {
      color: #fff; font-size: .12rem;
      min-width: .2rem; height: .2rem;
      background-color: $hightlight-fontColor;
      border-radius: .1rem;
      line-height: .2rem; text-align: center;
      padding: 0 .04rem;
      position: absolute; left: .46rem; top: .04rem;
      transform: scale(.5); transform-origin: left center;
    }
  }
  &__info {
    color: $content-fontcolor; font-size: .12rem;
    flex: 1;
    &__price {
      color: $hightlight-fontColor; font-size: .18rem;
      line-height: .49rem;
    }
  }
  &__btn {
    color: #FFF; font-size: .14rem;
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
  }
}
</style>