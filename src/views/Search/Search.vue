<template>
  <div class="wrapper">
    <div class="search">
      <span class="iconfont">&#xe62d;</span>
      <input type="text" class="search__area" />
      <div class="search__cancel">取消</div>
    </div>
    <div class="area">
      <h4 class="area__title">
        搜索历史
        <span class="area__title__clear">清除搜索历史</span>
      </h4>
      <ul class="area__list">
        <li class="area__list__item">尖椒肉丝</li>
        <li class="area__list__item">鲜花</li>
        <li class="area__list__item">山姆会员商店</li>
        <li class="area__list__item">新鲜水果</li>
        <li class="area__list__item">生日鲜花</li>
      </ul>
    </div>
    <div class="area">
      <h4 class="area__title">热门搜索</h4>
      <ul class="area__list">
        <li class="area__list__item">尖椒肉丝</li>
        <li class="area__list__item">鲜花</li>
        <li class="area__list__item">山姆会员商店</li>
        <li class="area__list__item">新鲜水果</li>
        <li class="area__list__item">生日鲜花</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Search'
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
