<template>
  <section class="app-main">
    <transition v-if="showRouter" name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
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
  },
  watch: {
    $route(to, from) {
      if(to.query.pageId != undefined && from.query.pageId != undefined) {
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
