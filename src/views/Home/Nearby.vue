<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div v-for="item in nearbyList" :key="item.id" class="nearby__item">
      <img :src="item.imgUrl" alt="near" class="nearby__item__img" />
      <div class="nearby__content">
        <div class="nearby__content__title">{{ item.title }}</div>
        <div class="nearby__content__tags">
          <span v-for="tag in item.tags" :key="tag" class="nearby__content__tag">{{ tag }}</span>
        </div>
        <p class="nearby__content__highlight">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nearby',
  setup () {
    const nearbyList = [{
      id: 1,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥0', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }, {
      id: 2,
      imgUrl: 'http://www.dell-lee.com/imgs/vue3/near.png',
      title: '沃尔玛',
      tags: ['月售1万+', '起送¥5', '基础运费¥5'],
      desc: 'VIP尊享满89元减4元运费券（每月3张）'
    }]
    return { nearbyList }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.nearby {
  &__title {
    color: $content-fontcolor; font-size: .18rem; font-weight: normal;
    margin: .16rem 0 .02rem 0;
  }
  &__item {
    display: flex;
    padding-top: .12rem;
    &__img {
      width: .56rem; height: .56rem;
      margin-right: .16rem;
    }
  }
  &__content {
    flex: 1;
    border-bottom: 1px solid $content-bgColor;
    padding-bottom: .12rem;
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
      color: #E93B3B; font-size: .13rem;
      line-height: .18rem;
      margin: .08rem 0 0 0;
    }
  }
}
</style>
