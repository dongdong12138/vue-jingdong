import { useStore } from 'vuex'

const useCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }

  return { cartList, changeCartItemInfo }
}

export default useCartEffect
