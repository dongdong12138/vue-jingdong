<template>
  <div class="wrapper">

    <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back">&#xe6f2;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹（先生）</span>
          <span class="top__receiver__info__name">18911024266</span>
        </div>
        <div class="iconfont top__receiver__icon">&#xe6f2;</div>
      </div>
    </div>

    <div class="products">
      <div class="products__title">{{ shopName }}</div>
      <div class="products__list">
        <div v-for="item in productList" :key="item._id" class="products__item">
          <img :src="item.imgUrl" alt="img" class="products__item__img" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item.name }}</h4>
            <p class="products__item__price">
              <span>
                <span class="products__item__yen">&yen; </span>
                {{ item.price }} x {{ item.count }}
              </span>
              <span class="products__item__total">
                 <span class="products__item__yen">&yen; </span>
                {{ item.price * item.count }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import useCartEffect from '@/hooks/useCartEffect'

export default {
  name: 'OrderConfirmation',
  setup() {
    const route = useRoute()
    const { shopName, productList } = useCartEffect(route.params.id)
    return { shopName, productList }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.wrapper {
  background-color: #eee;
  position: absolute; left: 0; right: 0; top: 0; bottom: 0;
}

.top {
  height: 1.96rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  background-size: 100% 1.59rem;
  position: relative;
  &__header {
    color: #FFF; font-size: .16rem;
    line-height: .24rem; text-align: center;
    padding-top: .26rem;
    position: relative;
    &__back {
      font-size: .22rem;
      position: absolute; left: .18rem;
    }
  }
  &__receiver {
    height: 1.11rem;
    background: #FFF;
    border-radius: .04rem;
    position: absolute; left: .18rem; right: .18rem; bottom: 0;
    &__title {
      color: #333; font-size: .16rem;
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
    }
    &__address {
      color: #333; font-size: .14rem;
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
    }
    &__info {
      padding: .06rem 0 0 .16rem;
      &__name {
        color: #666; font-size: .12rem;
        line-height: .18rem;
        margin-right: .06rem;
      }
    }
    &__icon {
      color: #666; font-size: .2rem;
      position: absolute; right: .16rem; top: .5rem;
      transform: rotate(180deg);
    }
  }
}

.products {
  background: #FFF;
  margin: .16rem .18rem .55rem .18rem;
  &__title {
    color: #333; font-size: .16rem;
    padding: .16rem .16rem 0 .16rem;
  }
  &__item {
    display: flex;
    padding: .16rem;
    position: relative;
    &__img {
      width: .46rem; height: .46rem;
      margin-right: .16rem;
    }
    &__detail {
      flex: 1;
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
      display: flex;
      margin: .06rem 0 0 0;
    }
    &__total {
      color: #000;
      text-align: right;
      flex: 1;
    }
    &__yen {
      font-size: .12rem;
    }
  }
}
</style>
