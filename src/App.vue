<template>
  <div class="docker">
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe6f3;</div>
      <div class="docker__title">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe7e5;</div>
      <div class="docker__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe61e;</div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe660;</div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>

<style lang="scss">
.docker {
  box-sizing: border-box;
  width: 100%; height: .49rem;
  border-top: 1px solid #F1F1F1;
  padding: 0 .18rem;
  position: absolute; left: 0; bottom: 0;
  display: flex;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont { font-size: .18rem; margin: .07rem 0 .02rem 0; }
    &--active { color: #1FA4FC; }
  }
  &__title { font-size: 20px; transform: scale(.5, .5); transform-origin: center top; }
}
</style>
