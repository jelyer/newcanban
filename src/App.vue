<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth/96+'px';
    window.addEventListener('resize',function(){
      document.documentElement.style.fontSize = document.documentElement.clientWidth/96+'px';
    })
  },
}
</script>
