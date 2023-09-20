<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop__img">
    <div :class="{'shop__content': true, 'shop__content--bordered': hideBorder ? false: true}">

      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售: {{ item.sales }}</span>
        <span class="shop__content__tag">起送: {{ item.expressLimit }}</span>
        <span class="shop__content__tag">基础运费: {{ item.expressPrice }}</span>
      </div>
      <p class="shop__content__highlight">{{ item.slogan }}</p>

      <div v-if="item.products" class="shop__products">
        <div v-for="product in item.products" :key="product.name" class="shop__product">
          <img :src="product.imgUrl" alt="img" class="shop__product__img" />
          <p class="shop__product__title">{{ product.name }}</p>
          <p class="shop__product__price">
            <span class="yen">&yen;</span><span class="price">{{ product.price }}</span>
            <span class="origin">&yen;{{ product.price }}</span>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";

.shop {
  display: flex;
  padding-top: .12rem;
  &__img {
    width: .56rem; height: .56rem;
    margin-right: .16rem;
  }
  &__content {
    flex: 1;
    padding-bottom: .12rem;
    &--bordered {
      border-bottom: .01rem solid $content-bgColor;
    }
    &__title {
      color: $content-fontcolor; font-size: .16rem;
      line-height: .22rem;
    }
    &__tags {
      color: $content-fontcolor; font-size: .13rem;
      line-height: .18rem;
      margin-top: .08rem;
    }
    &__tag {
      margin-right: .16rem;
    }
    &__highlight {
      color: $hightlight-fontColor; font-size: .13rem;
      line-height: .18rem;
      margin: .08rem 0 0 0;
    }
  }

  &__products {
    overflow: hidden;
    margin: .08rem .07rem 0 -.18rem;
  }
  &__product {
    width: 33.33%;
    box-sizing: border-box;
    padding-left: .18rem;
    float: left;
    &__img {
      width: 100%;
    }
    &__title {
      color: #333; font-size: .12rem;
      line-height: .17rem;
      margin: .04rem 0 0 0;
      @include ellipsis;
    }
    &__price {
      color: #999; font-size: .14rem;
      line-height: .2rem;
      margin: .02rem 0 0 0;
      @include ellipsis;
      .yen {
        color: #E93B3B; font-size: .12rem;
      }
      .price {
        color: #E93B3B;
      }
      .origin {
        font-size: .12rem;
        margin-left: .06rem;
      }
    }
  }
}

</style>
