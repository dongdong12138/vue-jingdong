<template>
  <div class="order">
    <div class="order__price">实付金额 <b>¥{{ calculations.price }}</b></div>
    <div class="order__btn">提交订单</div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import useCartEffect from '@/hooks/useCartEffect'

export default {
  name: 'Order',
  setup() {
    const route = useRoute()
    const { calculations } = useCartEffect(route.params.id)
    return { calculations }
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
</style>
