import { useStore } from 'vuex'

const useCartEffect = () => {
  const store = useStore()

  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }

  return { changeCartItemInfo }
}

export default useCartEffect
