<template>
  <section class="app-main">
    <transition v-if="showRouter" name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
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
