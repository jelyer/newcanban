<template>
  <div class="navbar">
    <div class="navbar-left">
      <img src="/static/image/logo_blue.png" alt="">
      <p navbar-title>巨沃大数据看板</p>
    </div>
    <div class="navbar-right">
      <ul>
        <li class="releasePanel" title="发布看板">
          <span></span>
        </li>
        <li class="editPanel" title="编辑看板" @click="toggleSideBar()">
          <span></span>
        </li>
        <li class="fullScreen" title="全屏" @click="largeScreen()">
          <span></span>
        </li>
        <li class="elpGuide" title="帮助指导">
          <span></span>
        </li>
        <li class="Logout" title="退出登录">
          <span></span>
        </li>
      </ul>
      <div class="user-inform">
        <p class="userName">何进</p>
        <p class="userSubordinate">赖世文组织织织</p>
      </div>
    </div>
    <!--<hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb class="breadcrumb-container"/>-->
    <!--<div class="right-menu">
      &lt;!&ndash;<template v-if="device!=='mobile'">&ndash;&gt;
      	<template>
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">LogOut</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="navbutton">
          &lt;!&ndash;按钮&ndash;&gt;
          <div class="navb"  @click="toggleSideBar()">编辑面板</div>
          &lt;!&ndash;<div class="navb">保存面板</div>&ndash;&gt;
          <div class="navb" @click="largeScreen()">大屏展示</div>
        </div>
      </template>
    </div>-->
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
        if(document.getElementsByClassName('main-container')[0].getElementsByClassName('active').length>0){
          document.getElementsByClassName('main-container')[0].getElementsByClassName('active') [0].classList.remove('active');
        }
        theSideBar.classList.remove('hideSidebar');
        theSideBar.classList.add('openSidebar');
        if(document.getElementsByClassName('editPanel')[0].getAttribute("class").indexOf('selected')!=-1){
          document.getElementsByClassName('editPanel')[0].classList.remove('selected');
        }
      }else {
        document.getElementsByClassName('editPanel')[0].classList.add('selected');
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
      if(document.getElementsByClassName('main-container')[0].getElementsByClassName('active').length>0){
        document.getElementsByClassName('main-container')[0].getElementsByClassName('active') [0].classList.remove('active');
      }

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

<!--<style rel="stylesheet/scss" lang="scss" scoped>
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
    height: 3.5rem;
    line-height: 3.5rem;
    border-radius: 0px !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #000;
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
</style>-->
<style rel="stylesheet/scss" lang="scss" scoped >
  .navbar {
    height: 3.5rem;
    line-height: 3.5rem;
    border-radius: 0px !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #000;
    overflow: hidden;
    .navbar-left{
      float:left;
      height: 100%;
      padding-left: 15px;
      img{
        height: 3rem;
        width: auto;
        margin-top: 0.25rem;
      }
      p{
        display: inline-block;
        vertical-align: top;
        color: #0db3fd;
        font-size: 1.2rem;
        margin-left: 0.5rem;
        padding-top: 1.6rem;
        line-height: 1.2rem;
      }
    }
    .navbar-right{
      float: right;
      height: 100%;
      ul{
        display: inline-block;
        height: 100%;
        overflow: hidden;
        li{
          width: 5rem;
          height: 100%;
          float: left;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          span{
            display:block ;
            width: 2.4rem;
            margin: auto;
            padding-top: 0.6rem;
            height: 100%;
           /* background: url("/static/image/c5.png") no-repeat center;*/
          }
        }
        li:hover{
          span{
            border-top: 2px solid #0db3fd;
          }
        }
        .releasePanel{
          span{
            background: url("/static/image/top-ico/icon-publish.png") no-repeat center;
            background-size: 80%;
          }
        }
        .releasePanel:hover span{
          background: url("/static/image/top-ico/icon-publish-selected.png") no-repeat center;
          background-size: 80%;
        }
        .editPanel{
          span{
            background: url("/static/image/top-ico/icon-edit.png") no-repeat center;
            background-size: 80%;
          }
        }
        .editPanel:hover span{
          background: url("/static/image/top-ico/icon-edit-selected.png") no-repeat center;
          background-size: 80%;
        }
        .editPanel.selected span{
          background: url("/static/image/top-ico/icon-edit-selected.png") no-repeat center;
          background-size: 80%;
          border-top: 2px solid #0db3fd;
        }
        .fullScreen{
          span{
            background: url("/static/image/top-ico/icon-full-screen.png") no-repeat center;
            background-size: 80%;
          }
        }
        .fullScreen:hover span{
          background: url("/static/image/top-ico/icon-full-screen-selected.png") no-repeat center;
          background-size: 80%;
        }
        .elpGuide{
          span{
            background: url("/static/image/top-ico/icon-help.png") no-repeat center;
            background-size: 80%;
          }
        }
        .elpGuide:hover span{
          background: url("/static/image/top-ico/icon-help-selected.png") no-repeat center;
          background-size: 80%;
        }
        .Logout{
          span{
            background: url("/static/image/top-ico/icon-out.png") no-repeat center;
            background-size: 80%;
          }
        }
        .Logout:hover span{
          background: url("/static/image/top-ico/icon-out-selected.png") no-repeat center;
          background-size: 80%
        }
      }
      .user-inform{
        display: inline-block;
        width: 9rem;
        padding-left: 1.5rem;
        padding-right: 0.3rem;
        font-size: 1.2rem;
        padding-top: 0.3rem;
        text-align: center;
        .userName{
          color:#0db3fd ;
          line-height: 1.6rem;

        }
        .userSubordinate{
          color: white;
          line-height: 1.6rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .largeScreen .navbar{
    display: none;
  }
</style>
