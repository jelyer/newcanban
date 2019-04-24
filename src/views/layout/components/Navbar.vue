<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">
      <!--<template v-if="device!=='mobile'">-->
      	<template>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <!--<router-link class="inlineBlock" to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>-->
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">LogOut</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="navbutton">
          <!--按钮-->
          <div class="navb"  @click="toggleSideBar()">编辑面板</div>
          <!--<div class="navb">保存面板</div>-->
          <div class="navb" @click="largeScreen()">大屏展示</div>

          <!--<el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
            <screenfull class="screenfull right-menu-item"/>
          </el-tooltip>-->
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      //this.$store.dispatch('ToggleSideBar')
      let theSideBar=document.getElementsByClassName('app-wrapper')[0];
      if(theSideBar.getAttribute("class").indexOf('openSidebar')==-1){
        theSideBar.classList.remove('hideSidebar');
        theSideBar.classList.add('openSidebar');
      }else {
        theSideBar.classList.remove('openSidebar');
        theSideBar.classList.add('hideSidebar');
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    largeScreen:function(){
      document.getElementsByClassName('app-wrapper')[0].classList.add('largeScreen');
      this.$message('esc键 退出大屏展示');
      document.onkeydown=function () {
        let oEvent = window.event;
        if(oEvent.keyCode==27 ){
          document.getElementsByClassName('app-wrapper')[0].classList.remove('largeScreen');
          document.onkeydown = undefined;
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .navbutton{
    display: inline-block;
    flex-direction: row;
    align-items: center;
    height: 100%;
    float: left;
    margin-right: 15px;
  }
  .navbutton .navb{
    width: 6rem;
    height: 2.1rem;
    display: inline-block;
    line-height: 2.1rem;
    text-align: center;
    background: url(/static/image/choicBtn.png) no-repeat center;
    background-size: 100% 100%;
    color: #3caff2;
    font-size: .95rem;cursor: pointer;
  }
  .navbutton .navb:hover{opacity: .8}
  .navbar {
    height: 60px;
    line-height: 60px;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 60px;
      height: 60px;
      float: left;
      padding: 0 10px;
      display: flex;
      align-items: center;
    }
    .breadcrumb-container{
      float: left;
      line-height: 60px;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      height: 100%;
      &:focus{
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 30px;
      }
      .international{
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .avatar-container {
        height: 60px;
        margin-right: 30px;
        float: left;
        .avatar-wrapper {
          margin-top: 5px;
          position: relative;
          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .largeScreen .navbar{
    display: none;
  }
</style>
