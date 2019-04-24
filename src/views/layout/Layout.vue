<template>
  <!--<div :class="classObj" class="app-wrapper">-->
  <div  class="app-wrapper openSidebar">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>

    <!--<div class="rightSetting">
      <div class="title">属性设置</div>
      <div class="content">
        <operation-form/>
      </div>

    </div>-->
    <!--收缩按钮-->
    <!--<div id="topleftb" style="position: absolute;bottom: 20px;left: 10px;background: #fff;z-index: 1001;">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </div>-->
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain} from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Hamburger from '@/components/Hamburger'
import operationForm from "./components/OperationForm";

export default {
  name: 'Layout',
  data(){
    return {
      pageData:[],
      allData:[],
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    operationForm
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    rightSetting(){
      return {
        hideRightSet: this.sidebar.opened,
        openSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .rightSetting{background:rgb(10, 17, 50)}
  .rightSetting .title{width:100%;height:60px;line-height: 60px;text-align: center;font-size: 16px;color: #209ff2;}
  .rightSetting .content{height: calc(100vh - 80px); background: rgb(16, 40, 74);  margin: 0 5px;  border: 1px solid #0db3fd;}
</style>
