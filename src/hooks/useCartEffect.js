import { computed } from 'vue'
import { useStore } from 'vuex'

const useCartEffect = shopId => {
  const store = useStore()
  const cartList = store.state.cartList

  const productList = computed(() => {
    return cartList[shopId]?.productList || []
  })

  const shopName = computed(() => {
    return cartList[shopId]?.shopName || ''
  })

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }

  return { cartList, productList, shopName, changeCartItemInfo }
}

export default useCartEffect
