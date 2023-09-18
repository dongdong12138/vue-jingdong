<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" />
        <div class="check__icon__tag">1</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;127</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCart'
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.cart {
  position: absolute; left: 0; right: 0; bottom: 0;
}

.check {
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  &__icon {
    width: .84rem;
    position: relative;
    &__img {
      display: block;
      width: .28rem; height: .26rem;
      margin: .12rem auto;
    }
    &__tag {
      color: #fff; font-size: .12rem;
      width: .2rem; height: .2rem;
      background-color: $hightlight-fontColor;
      border-radius: 50%;
      line-height: .2rem; text-align: center;
      position: absolute; right: .2rem; top: .04rem;
      transform: scale(.5);
    }
  }
  &__info {
    color: $content-fontcolor; font-size: .12rem;
    flex: 1;
    &__price {
      color: $hightlight-fontColor; font-size: .18rem;
      line-height: .49rem;
    }
  }
  &__btn {
    color: #FFF; font-size: .14rem;
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
  }
}
</style>
