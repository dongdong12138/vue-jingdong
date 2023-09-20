import { computed } from 'vue'
import { useStore } from 'vuex'

const useCartEffect = shopId => {
  const store = useStore()
  const cartList = store.state.cartList

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const key in productList) {
      const product = productList[key]
      if (product.count > 0) {
        notEmptyProductList[key] = product
      }
    }
    return notEmptyProductList
  })

  const shopName = computed(() => {
    return cartList[shopId]?.shopName || ''
  })

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

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }

  return { cartList, productList, shopName, calculations, changeCartItemInfo }
}

export default useCartEffect
