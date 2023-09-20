<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe6f2;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe62d;</span>
        <input v-model="keyword" placeholder="请输入商品名称" class="search__content__input" @change="handleSearchInputChange" />
      </div>
    </div>
    <router-link v-for="item in searchList" :key="item._id" :to="`/shop/${item._id}`">
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getRequest } from '@/utils/request'
import ShopInfo from '@/components/ShopInfo.vue'

const useBackRouterEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

const useSearchListEffect = () => {
  const searchList = ref([])
  const getSearchList = async (keyword) => {
    const result = await getRequest('/api/shop/search', { keyword })
    if (result?.errno === 0 && result?.data?.length) {
      searchList.value = result.data
    }
  }
  return { searchList, getSearchList }
}

export default {
  name: 'SearchList',
  components: { ShopInfo },
  setup() {
    const route = useRoute()
    const { searchList, getSearchList } = useSearchListEffect()
    const { handleBackClick } = useBackRouterEffect()
    const keyword = ref(route.query.keyword || '')

    getSearchList(keyword.value)
    const handleSearchInputChange = () => {
      getSearchList(keyword.value)
    }

    return { keyword, searchList, handleBackClick, handleSearchInputChange }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/viriables.scss";

.wrapper {
  padding: 0 .18rem;
}

.search {
  line-height: .32rem;
  display: flex;
  margin: .14rem 0 .04rem 0;
  &__back {
    color: #B6B6B6; font-size: .24rem;
    width: .3rem;
  }
  &__content {
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;
    display: flex;
    &__icon {
      color: $search-fontColor;
      width: .44rem;
      text-align: center;
    }
    &__input {
      color: $content-fontcolor; font-size: .14rem;
      width: 100%; height: .32rem;
      background: none;
      border: none; outline: none;
      padding-right: .2rem;
      display: block;
      &::placeholder {
        color: $content-fontcolor;
      }
    }
  }
}
</style>
