<template>
  <div class="wrapper">

    <div class="search">
      <span class="iconfont">&#xe62d;</span>
      <input type="text" placeholder="山姆会员商店优惠商品" class="search__area" @change="handleSearchChange" />
      <div class="search__cancel" @click="handleCancelSearchClick">取消</div>
    </div>

    <div v-if="history.length" class="area">
      <h4 class="area__title">
        搜索历史
        <span class="area__title__clear" @click="handleClearHistoryClick">清除搜索历史</span>
      </h4>
      <ul class="area__list">
        <li v-for="item in history" :key="item" class="area__list__item" @click="goToSearchList(item)">{{ item }}</li>
      </ul>
    </div>

    <div class="area">
      <h4 class="area__title">热门搜索</h4>
      <ul class="area__list">
        <li v-for="item in hotWordList" :key="item" class="area__list__item" @click="goToSearchList(item)">{{ item }}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getRequest } from '@/utils/request'

const useHotWordListEffect = () => {
  const hotWordList = ref([])
  const getHotWorList = async () => {
    const result = await getRequest('/api/shop/search/hot-words')
    if (result?.errno === 0 && result?.data?.length) {
      hotWordList.value = result.data
    }
  }
  return { hotWordList, getHotWorList }
}

export default {
  name: 'Search',
  setup() {
    const router = useRouter()
    const history = ref(JSON.parse(localStorage.getItem('history')) || [])
    const { hotWordList, getHotWorList } = useHotWordListEffect()

    getHotWorList()
    const handleSearchChange = event => {
      const searchValue = event.target.value
      if (!searchValue) return
      const hasValue = history.value.find(item => item === searchValue)
      if (!hasValue) {
        history.value.push(searchValue)
        localStorage.setItem('history', JSON.stringify(history.value))
      }
      router.push(`/searchList?keyword=${searchValue}`)
    }

    const handleCancelSearchClick = () => {
      router.back()
    }

    const handleClearHistoryClick = () => {
      history.value = []
      localStorage.setItem('history', JSON.stringify(history.value))
    }

    const goToSearchList = keyword => {
      router.push(`/searchList?keyword=${keyword}`)
    }

    return { history, hotWordList, handleSearchChange, handleCancelSearchClick, handleClearHistoryClick, goToSearchList }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  margin: 0 .18rem;

  .search {
    color: #333;
    line-height: .32rem;
    display: flex;
    margin-top: .16rem;
    position: relative;
    .iconfont {
      color: #B7B7B7;
      position: absolute; left: .16rem;
    }
    &__area {
      flex: 1;
      font-size: .14rem;
      background: #F5F5F5;
      border: none; outline: none; border-radius: .16rem;
      padding: 0 .12rem 0 .44rem;
    }
    &__cancel {
      font-size: .16rem;
      margin-left: .12rem;
    }
  }

  .area {
    margin-top: .24rem;
    &__title {
      color: #333; font-size: .16rem; font-weight: normal;
      line-height: .22rem;
      margin: 0;
      &__clear {
        font-size: .14rem;
        float: right;
      }
    }
    &__list {
      padding: 0; margin: 0 0 0 -.1rem;
      list-style-type: none;
      &__item {
        color: #666; font-size: .14rem;
        background: #F5F5F5;
        border-radius: .02rem;
        line-height: .32rem;
        padding: 0 .1rem; margin-left: .1rem; margin-top: .12rem;
        display: inline-block;
      }
    }
  }
}
</style>
