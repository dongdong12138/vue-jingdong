<template>
  <div v-if="showCart && calculations.total > 0" class="mask" @click="handleCartShowChange"></div>
  <div class="cart">

    <div v-if="showCart && calculations.total > 0" class="product">
      <div class="product__header">
        <div class="product__header__all" @click="setCartItemsChecked(shopId)">
          <span v-html="calculations.allChecked ? '&#xe652;': '&#xe667;'" class="product__header__icon iconfont"></span>全选
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn" @click="cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <div
            v-html="item.check ? '&#xe652;': '&#xe667;'"
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
        <div class="check__icon__tag">{{ calculations.total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn">
        <router-link :to="{path: `/orderConfirmation/${shopId}`}">去结算</router-link>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import useCartEffect from '@/hooks/useCartEffect'

const useComputedCartEffect = (shopId) => {
  const store = useStore()
  const { cartList, productList, changeCartItemInfo } = useCartEffect(shopId)

  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (const key in productList) {
        const product = productList[key]
        result.total += product.count
        if (product.check) {
          result.price += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
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

  return { calculations, productList, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemsChecked }
}

const useToggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'ShopCart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { calculations, productList, changeCartItemChecked, cleanCartProducts, setCartItemsChecked } = useComputedCartEffect(shopId)
    const { changeCartItemInfo } = useCartEffect()
    const { showCart, handleCartShowChange } = useToggleCartEffect()
    return {
      shopId,
      calculations, productList, changeCartItemChecked, cleanCartProducts, setCartItemsChecked,
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
  background: $bgColor;
  position: absolute; left: 0; right: 0; bottom: 0;
  z-index: 2;
}

.product {
  flex: 1;
  background: $bgColor;
  overflow-y: scroll;
  &__header {
    color: $content-fontcolor; font-size: .14rem;
    border-bottom: 1px solid $content-bgColor;
    line-height: .52rem;
    display: flex;
    &__all {
      width: .64rem;
      margin-left: .18rem;
    }
    &__icon {
      color: $btn-bgColor; font-size: .2rem;
      display: inline-block;
      vertical-align: top;
      margin-right: .1rem;
    }
    &__clear {
      text-align: right;
      flex: 1;
      margin-right: .16rem;
      &__btn {
        display: inline-block;
      }
    }
  }
  &__item {
    display: flex;
    border-bottom: .01rem solid $content-bgColor;
    padding: .12rem 0; margin: 0 .16rem;
    position: relative;
    &__checked {
      color: $btn-bgColor; font-size: .2rem;
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
      position: absolute; right: 0; bottom: .26rem;
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
      color: $bgColor; font-size: .12rem;
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
    color: $bgColor; font-size: .14rem;
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
    a {
      color: $bgColor;
    }
  }
}
</style>
