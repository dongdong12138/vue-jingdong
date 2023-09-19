<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__wrapper">
      <div class="products__list">
        <template v-for="item in productList" :key="item._id">
          <div v-if="item.count > 0" class="products__item">
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
                {{ (item.price * item.count).toFixed(2) }}
              </span>
              </p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import useCartEffect from '@/hooks/useCartEffect'

export default {
  name: 'ProductList',
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

.products {
  background: $bgColor;
  margin: .16rem .18rem .1rem .18rem;
  &__title {
    color: $content-fontcolor; font-size: .16rem;
    padding: .16rem;
  }
  &__wrapper {
    overflow-y: scroll;
    margin: 0 .18rem;
    position: absolute; left: 0; right: 0; bottom: .6rem; top: 2.6rem;
  }
  &__list {
    background: $bgColor;
  }
  &__item {
    display: flex;
    padding: 0 .16rem 0.16rem .16rem;
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
      color: $dark-fontColor;
      text-align: right;
      flex: 1;
    }
    &__yen {
      font-size: .12rem;
    }
  }
}
</style>
