<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList" :key="index" :class="[{'docker__item--active': index === 0}, 'docker__item']">
      <div v-html="item.icon" class="iconfont"></div>
      <div class="docker__title">{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup() {
    const dockerList = [
      { icon: '&#xe6f3;', text: '首页' },
      { icon: '&#xe7e5;', text: '购物车' },
      { icon: '&#xe61e;', text: '订单' },
      { icon: '&#xe660;', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.docker {
  box-sizing: border-box;
  color: $content-fontcolor;
  width: 100%; height: .49rem;
  border-top: .01rem solid $content-bgColor;
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
