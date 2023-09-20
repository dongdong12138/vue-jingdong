<template>

  <div class="order">
    <div class="order__price">实付金额 <b>¥{{ calculations.price }}</b></div>
    <div class="order__btn" @click="handleShowConfirmChange(true)">提交订单</div>
  </div>

  <div v-show="showConfirm" class="mask" @click.self="handleShowConfirmChange(false)">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="handleConfirmOrder(false)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--last" @click="handleConfirmOrder(true)">确认支付</div>
      </div>
    </div>
  </div>

</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { postRequest } from '@/utils/request'
import useCartEffect from '@/hooks/useCartEffect'

const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = useStore()

  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const key in productList.value) {
      const product = productList.value[key]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try {
      const result = await postRequest('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'orderList' })
      }
    } catch (e) {
      // 提示下单失败
    }
  }
  return { handleConfirmOrder }
}

const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = state => {
    showConfirm.value = state
  }
  return { showConfirm, handleShowConfirmChange }
}

export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCartEffect(shopId)
    const { handleConfirmOrder } = useMakeOrderEffect(shopId, shopName, productList)
    const { showConfirm, handleShowConfirmChange } = useShowMaskEffect()
    return { showConfirm, handleShowConfirmChange, calculations, handleConfirmOrder }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.order {
  height: .49rem;
  background: $bgColor;
  line-height: .49rem;
  display: flex;
  position: absolute; left: 0; right: 0; bottom: 0;
  &__price {
    color: $content-fontcolor; font-size: .14rem;
    text-indent: .24rem;
    flex: 1;
  }
  &__btn {
    color: $bgColor; font-size: .14rem;
    width: .98rem;
    background: #4FB0F9;
    text-align: center;
  }
}

.mask {
  background: rgba(0, 0, 0, 0.5);
  position: absolute; left: 0; right: 0; bottom: 0; top: 0;
  z-index: 1;
  &__content {
    width: 3rem; height: 1.56rem;
    background: #FFF;
    border-radius: .04rem;
    text-align: center;
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    &__title {
      color: #333; font-size: .18rem;
      line-height: .26rem;
      margin: .24rem 0 0 0;
    }
    &__desc {
      color: #666666; font-size: .14rem;
      margin: .08rem 0 0 0;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn {
      font-size: .14rem;
      width: .8rem;
      border-radius: .16rem;
      line-height: .32rem;
      flex: 1;
      &--first {
        color: #4FB0F9;
        border: .01rem solid #4FB0F9;
        margin-right: .12rem;
      }
      &--last {
        color: #fff;
        background: #4FB0F9;
        margin-left: .12rem;
      }
    }
  }
}
</style>
