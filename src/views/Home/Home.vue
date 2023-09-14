<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker />
</template>

<script>
import Docker from './Docker.vue'
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'

export default {
  name: 'Home',
  components: { Nearby, StaticPart, Docker }
}
</script>

<style lang="scss">
.wrapper {
  overflow-y: auto;
  padding: 0 .18rem .1rem .18rem;
  position: absolute; left: 0; top: 0; bottom: .5rem; right: 0;
}
</style>
