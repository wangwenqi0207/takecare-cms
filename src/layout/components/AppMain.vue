<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  height: calc(100vh - 160px);
  width: 100%;
  position: relative;
  overflow: auto;
  position: relative;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>
<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
