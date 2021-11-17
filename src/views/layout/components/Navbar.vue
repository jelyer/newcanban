<template>
  <div class="navbar">
    <div class="navbar-left">
      <img src="@/assets/logo_blue.png" alt="">
      <p navbar-title>巨沃大数据看板</p>
    </div>
    <div class="navbar-right">
      <ul>
        <li id="pullKanban" class="releasePanel" @click="publistTems()">
          <el-tooltip content="发布看板" effect="dark" placement="bottom">
            <span/>
          </el-tooltip>
        </li>
        <li id="editKanban" :class="[{selected: isActive},'editPanel']" @click="toggleSideBar()">
          <el-tooltip content="编辑看板" effect="dark" placement="bottom">
            <span/>
          </el-tooltip>
        </li>
        <li id="reloadboald" class="reloaddata" @click="reloadboald()">
          <el-tooltip content="刷新看板数据" effect="dark" placement="bottom">
            <span/>
          </el-tooltip>
        </li>
        <li id="fullChart" class="fullScreen" @click="largeScreen()">
          <el-tooltip content="全屏" effect="dark" placement="bottom">
            <span class="selected"/>
          </el-tooltip>
        </li>
        <li class="elpGuide" @click.prevent.stop="guide">
          <el-tooltip effect="dark" placement="bottom">
            <div slot="content" style="text-align: center;line-height: 20px">我是平台帮助系统<br>需要我向您做个简短的操作介绍吗？</div>
            <span/>
          </el-tooltip>
        </li>
        <li id="outLogin" class="Logout" @click="logout">
          <el-tooltip content="退出登录" effect="dark" placement="bottom">
            <span/>
          </el-tooltip>
        </li>
      </ul>
    <!--  <div class="user-inform">
        <p class="userName">何进</p>
        <p class="userSubordinate">赖世文组织织织</p>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import { publishTems } from '@/api/chartSetting';

import Driver from 'driver.js'; // import driver.js
import 'driver.js/dist/driver.min.css'; // import driver.js css
import steps from './steps';

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      driver: null,
      isActive: false,
      index: 0 // 当前步骤
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  mounted() {
    // this.driver = new Driver();
    this.driver = new Driver({
      className: 'scoped-class', // className to wrap driver.js popover
      animate: true, // Animate while changing highlighted element
      opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
      padding: 10, // Distance of element from around the edges
      allowClose: true, // Whether clicking on overlay should close or not
      overlayClickNext: false, // Should it move to next step on overlay click
      doneBtnText: 'Done', // Text on the final button
      closeBtnText: '关闭', // Text on the close button for this step
      nextBtnText: '下一步', // Next button text for this step
      prevBtnText: '上一步', // Previous button text for this step
      showButtons: true, // Do not show control buttons in footer
      keyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
      onNext: (Element) => {
        this.index++;
        // 当到第六步时，打开编辑
        if (this.index == 6) {
          this.$store.dispatch('ToggleSideBar');
        }
      }
    });
  },
  created() {
    const that = this;
    if (localStorage.isBeingRotated == '1') {
      localStorage.removeItem('isBeingRotated');
      setTimeout(function() {
        that.largeScreen();
      }, 1000);
    }
  },
  methods: {
    guide() {
      this.index = 0;// 重置记录
      var istoggle = this.$store.state.app.sidebar.opened;
      // 如果是编辑状态，先关闭编辑
      if (!istoggle) {
        this.$store.dispatch('ToggleSideBar');
      }
      var _this = this;
      setTimeout(function() {
        _this.driver.defineSteps(steps);
        _this.driver.start();
      }, 150);
    },
    toggleSideBar() {
      this.isActive = true;
      this.$store.dispatch('ToggleSideBar');
      const theSideBar = document.getElementsByClassName('app-wrapper')[0];
      if (theSideBar.getAttribute('class').indexOf('openSidebar') == -1) {
        /* if(document.getElementsByClassName('main-container')[0].getElementsByClassName('active').length>0){
          document.getElementsByClassName('main-container')[0].getElementsByClassName('active') [0].classList.remove('active');
        }*/
        theSideBar.classList.remove('hideSidebar');
        theSideBar.classList.add('openSidebar');
        if (document.getElementsByClassName('editPanel')[0].getAttribute('class').indexOf('selected') != -1) {
          document.getElementsByClassName('editPanel')[0].classList.remove('selected');
        }
      } else {
        document.getElementsByClassName('editPanel')[0].classList.add('selected');
        theSideBar.classList.remove('openSidebar');
        theSideBar.classList.add('hideSidebar');
      }
    },
    logout() {
      this.$confirm('您确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          // eslint-disable-next-line no-undef
          window.location.href = IPCONFIG + '/login.html';
        });
      });
    },
    largeScreen: function() {
      this.isActive = 2;
      if (document.getElementsByClassName('main-container')[0].getElementsByClassName('active').length > 0) {
        document.getElementsByClassName('main-container')[0].getElementsByClassName('active')[0].classList.remove('active');
      }
      this.$store.dispatch('SetIsScreen', true);// layout监听后添加largeScreen类
      this.$message('按F11进入大屏显示，esc键 退出大屏展示');

      var _this = this;
      document.onkeydown = function() {
        const oEvent = window.event;
        if (oEvent.keyCode == 27) {
          document.onkeydown = undefined;
          _this.$store.dispatch('SetIsScreen', false);
        }
      };
    },
    // 刷新看板数据
    reloadboald() {
      this.$store.dispatch('SetReloadData', !this.$store.state.app.reloadData);
    },
    // 发布看板
    publistTems() {
      this.$confirm('您确定要发布此模板吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const pageId = this.$route.query.pageId;// 页面Id
        if (!pageId) {
          this.$message({
            type: 'error',
            message: '系统模板不能发布!'
          });
          return;
        }
        var routerDatas = this.$store.state.user.routerDatas;
        for (var j in routerDatas) {
          if (routerDatas[j].tempid == pageId) {
            if (parseInt(routerDatas[j].tempstat) == 9) {
              this.$message({
                type: 'error',
                message: '此模板已发布!'
              });
              return;
            } else {
              break;
            }
          }
        }
        var params = {
          tempid: pageId,
          tempstat: 9
        };
        publishTems(this.$qs.stringify(params)).then(response => {
          if (response.data.code == 200) {
            this.$notify({
              title: '提示',
              message: '发布成功！',
              type: 'success',
              duration: 2000
            });
            // 如果处于编辑模式，则关闭编辑
            const theSideBar = document.getElementsByClassName('app-wrapper')[0];
            if (theSideBar.getAttribute('class').indexOf('openSidebar') == -1) {
              this.$store.dispatch('ToggleSideBar');
              if (document.getElementsByClassName('editPanel')[0].getAttribute('class').indexOf('selected') != -1) {
                document.getElementsByClassName('editPanel')[0].classList.remove('selected');
              }
            }
            // this.$store.dispatch('SetReloadRouter', false);//路由有变化
            // 重新加载路由
            this.$store.dispatch('getSyncRouterData');
          } else {
            this.$notify({
              title: '提示',
              message: response.data.msg,
              type: 'error',
              duration: 3000
            });
          }
        });
      });
    }
  }
};
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
    background: url(/static/images/choicBtn.png) no-repeat center;
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

</style>
