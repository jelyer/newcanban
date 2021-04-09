<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in"><!--v-show="showRouter"-->
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data(){
    return {
      transitionName:'',
      showRouter:true
    }
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
    key() {
      return this.$route.name !== undefined
        ? this.$route.name + new Date()
        : this.$route + new Date();
    }
  },
  watch: {
    $route(to, from) {
      //会导致缓存失效
      if(to.query.pageId != undefined || from.query.pageId != undefined) {
        this.showRouter = false;
        var that = this;
        setTimeout(function(){
          that.showRouter = true;
        },500)
      }
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
</style>
