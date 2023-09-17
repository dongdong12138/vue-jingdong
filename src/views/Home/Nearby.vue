<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <div v-for="item in nearbyList" :key="item._id" class="nearby__item">
      <img :src="item.imgUrl" alt="near" class="nearby__item__img" />
      <div class="nearby__content">
        <div class="nearby__content__title">{{ item.name }}</div>
        <div class="nearby__content__tags">
          <span class="nearby__content__tag">月售: {{item.sales}}</span>
          <span class="nearby__content__tag">起送: {{item.expressLimit}}</span>
          <span class="nearby__content__tag">基础运费: {{item.expressPrice}}</span>
        </div>
        <p class="nearby__content__highlight">{{ item.slogan }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getRequest } from '@/utils/request'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await getRequest('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
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
