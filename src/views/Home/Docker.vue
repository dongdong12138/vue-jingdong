<template>
  <div class="docker">
    <div v-for="(item, index) in dockerList" :key="index" :class="[{'docker__item--active': index === 0}, 'docker__item']">
      <router-link :to="{name: item.name}">
        <div v-html="item.icon" class="iconfont"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup() {
    const dockerList = [
      { icon: '&#xe6f3;', text: '首页', name: 'home' },
      { icon: '&#xe7e5;', text: '购物车', name: 'cartList' },
      { icon: '&#xe61e;', text: '订单', name: 'home' },
      { icon: '&#xe660;', text: '我的', name: 'home' }
    ]
    return { dockerList }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.docker {
  box-sizing: border-box;
  width: 100%; height: .49rem;
  border-top: .01rem solid $content-bgColor;
  padding: 0 .18rem;
  position: absolute; left: 0; bottom: 0;
  display: flex;
  &__item {
    flex: 1;
    text-align: center;
    a { color: $content-fontcolor; }
    .iconfont { font-size: .18rem; margin: .07rem 0 .02rem 0; }
    &--active a { color: #1FA4FC; }
  }
  &__title { font-size: .2rem; transform: scale(.5, .5); transform-origin: center top; }
}
</style>
