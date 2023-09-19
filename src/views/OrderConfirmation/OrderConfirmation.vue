<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'

export default {
  name: 'OrderConfirmation',
  components: { Order, ProductList, TopArea }
}
</script>

<style scoped lang="scss">
.wrapper {
  background-color: #eee;
  overflow-y: scroll;
  position: absolute; left: 0; right: 0; top: 0; bottom: 0;
}
</style>
