<template>
  <div class="content">

    <div class="category">
      <div class="category__item category__item--active">全部商品</div>
      <div class="category__item">秒杀</div>
      <div class="category__item">新鲜水果</div>
      <div class="category__item">休闲食品</div>
      <div class="category__item">时令蔬菜</div>
      <div class="category__item">肉蛋家禽</div>
    </div>

    <div class="product">
      <div class="product__item">
        <img src="http://www.dell-lee.com/imgs/vue3/near.png" class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">番茄250g/份</h4>
          <p class="product__item__sales">月售10件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>33.6
            <span class="product__item__origin">&yen;66.6</span>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ShopContent'
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute; left: 0; right: 0; top: 1.5rem; bottom: .5rem;
}

.category {
  width: .76rem; height: 100%;
  background: #F5F5F5;
  overflow-y: scroll;
  &__item {
    color: #333; font-size: 14px;
    line-height: .4rem; text-align: center;
    &--active {
      background: #FFF;
    }
  }
}

.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    border-bottom: .01rem solid #F1F1F1;
    display: flex;
    padding: .12rem 0; margin: 0 .16rem;
    &__img {
      width: .68rem; height: .68rem;
      margin-right: .16rem;
    }
    &__title {
      color: #333; font-size: .14rem;
      line-height: .2rem;
      margin: 0;
    }
    &__sales {
      color: #333; font-size: .12rem;
      margin: .06rem 0;
    }
    &__price {
      color: #E93B3B; font-size: .14rem;
      line-height: .2rem;
      margin: 0;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      color: #999; font-size: .12rem;
      text-decoration: line-through; line-height: .2rem;
      margin-left: .06rem;
    }
  }
}
</style>
