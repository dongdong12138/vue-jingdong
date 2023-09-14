<template>

  <div class="wrapper">
    <div class="position">
      <span class="iconfont position__icon">&#xe619;</span>
      北京理工大学国防科技园2号楼10层
      <span class="iconfont position_notice">&#xe60b;</span>
    </div>
  </div>

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
@import './style/viriables.scss';
@import './style/mixins.scss';

.wrapper {
  padding: 0 .18rem;
  position: absolute; left: 0; top: 0; bottom: .5rem; right: 0;
}

.position {
  color: $content-fontcolor; font-size: .16rem;
  line-height: .22rem;
  padding: .16rem .24rem .16rem 0;
  position: relative;
  @include ellipsis;
  .position__icon {
    font-size: .2rem;
    position: relative; top: .01rem;
  }
  .position_notice {
    font-size: .2rem;
    position: absolute; right: 0; top: .17rem;
  }
}

.docker {
  box-sizing: border-box;
  color: $content-fontcolor;
  width: 100%; height: .49rem;
  border-top: .01rem solid #F1F1F1;
  padding: 0 .18rem;
  position: absolute; left: 0; bottom: 0;
  display: flex;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont { font-size: .18rem; margin: .07rem 0 .02rem 0; }
    &--active { color: #1FA4FC; }
  }
  &__title { font-size: .2rem; transform: scale(.5, .5); transform-origin: center top; }
}
</style>
