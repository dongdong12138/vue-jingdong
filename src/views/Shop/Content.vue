<template>
  <div class="content">

    <div class="category">
      <div
        v-for="item in categories" :key="item.name"
        :class="['category__item', {'category__item--active': item.tab === currentTab}]"
        @click="handleCategoryClick(item.tab)"
      >{{ item.name }}</div>
    </div>

    <div class="product">
      <div v-for="item in contentList" :key="item._id" class="product__item">
        <img :src="item.imgUrl" alt="productImg" class="product__item__img" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus">-</span>
          0
          <span class="product__number__plus">+</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { getRequest } from '@/utils/request'

export default {
  name: 'ShopContent',
  setup() {
    const categories = [
      { name: '全部商品', tab: 'all' }, { name: '秒杀', tab: 'seckill' },
      { name: '新鲜水果', tab: 'fruit' }
    ]
    const data = reactive({
      currentTab: categories[0].tab,
      contentList: []
    })
    const getContentData = async (tab) => {
      const result = await getRequest('/api/shop/1/products', { tab })
      if (result?.errno === 0 && result?.data?.length) {
        data.contentList = result.data
      }
    }
    const handleCategoryClick = (tab) => {
      data.currentTab = tab
      getContentData(tab)
    }
    getContentData('all')

    return { ...toRefs(data), categories, handleCategoryClick }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.content {
  display: flex;
  position: absolute; left: 0; right: 0; top: 1.5rem; bottom: .5rem;
}

.category {
  width: .76rem; height: 100%;
  background: $search-bgColor;
  overflow-y: scroll;
  &__item {
    color: $content-fontcolor; font-size: 14px;
    line-height: .4rem; text-align: center;
    &--active {
      background: $bgColor;
    }
  }
}

.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    border-bottom: .01rem solid $content-bgColor;
    display: flex;
    padding: .12rem 0; margin: 0 .16rem;
    position: relative;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: .68rem; height: .68rem;
      margin-right: .16rem;
    }
    &__title {
      color: $content-fontcolor; font-size: .14rem;
      line-height: .2rem;
      margin: 0;
      @include ellipsis;
    }
    &__sales {
      color: $content-fontcolor; font-size: .12rem;
      margin: .06rem 0;
    }
    &__price {
      color: $hightlight-fontColor; font-size: .14rem;
      line-height: .2rem;
      margin: 0;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      color: $light-fontColor; font-size: .12rem;
      text-decoration: line-through; line-height: .2rem;
      margin-left: .06rem;
    }
    .product__number {
      position: absolute; right: 0; bottom: .12rem;
      &__minus, &__plus {
        display: inline-block;
        font-size: .2rem;
        width: .2rem; height: .2rem;
        text-align: center; line-height: .16rem;;
        border-radius: 50%;
      }
      &__minus {
        color: $medium-fontColor;
        border: .01rem solid $medium-fontColor;
        margin-right: .05rem;
      }
      &__plus {
        color: $bgColor;
        background: $btn-bgColor;
        margin-left: .05rem;
      }
    }
  }
}
</style>
