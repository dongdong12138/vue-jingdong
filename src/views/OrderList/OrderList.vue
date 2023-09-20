<template>
  <div class="wrapper">

    <div class="title">我的订单</div>

    <div class="orders">
      <div v-for="(item, index) in list" :key="index" class="order">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{ item.isCanceled ? '已取消' : '已下单' }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
              <img v-if="innerIndex <= 3" :src="innerItem.product.img" class="order__content__img" />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">¥ {{ item.totalPrice }}</div>
            <div class="order__content__count">共 {{ item.totalNumber }} 件</div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { getRequest } from '@/utils/request'
import Docker from '@/components/Docker.vue'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getNearbyList = async () => {
    const result = await getRequest('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += (productItem?.orderSales || 0)
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getNearbyList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: { Docker },
  setup() {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.wrapper {
  background: rgb(248, 248, 248);
  overflow-y: auto;
  position: absolute; left: 0; top: 0; bottom: .5rem; right: 0;
}

.title {
  color: $content-fontcolor; font-size: .16rem;
  background: $bgColor;
  line-height: .44rem; text-align: center;
}

.order {
  background: $bgColor;
  padding: .16rem; margin: .16rem .18rem;
  &__title {
    color: $content-fontcolor; font-size: .16rem;
    line-height: .22rem;
    margin-bottom: .16rem;
  }
  &__status {
    color: $light-fontColor; font-size: .14rem;
    float: right;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      width: .4rem; height: .4rem;
      margin-right: .12rem;
    }
    &__info {
      width: .7rem;
    }
    &__price {
      color: $hightlight-fontColor; font-size: .14rem;
      line-height: .2rem; text-align: right;
      margin-bottom: .04rem;
    }
    &__count {
      color: $content-fontcolor; font-size: .12rem;
      line-height: .14rem; text-align: right;
    }
  }
}
</style>
