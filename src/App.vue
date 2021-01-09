<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
     return {
       reload:this.reload
     }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  created(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth/96+'px';
    window.addEventListener('resize',function(){
      document.documentElement.style.fontSize = document.documentElement.clientWidth/96+'px';
    })
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      //dom渲染后回调此函数
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>
