<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div v-if="visiblesysModel" class="sidebtn">
        <div id="systemmenus" :class="[{actives: sourSetting },'til']" @click="chooseBase(true)">系统模板</div>
        <div :class="[{actives: !sourSetting },'til']" @click="chooseBase(false)">业务看板</div>
      </div>
      <div v-else class="sidebtn">
        <div :class="[{actives: !sourSetting },'til']" style="width:100% !important;" @click="chooseBase(false)">业务看板</div>
      </div>
      <el-menu
        id="scrowrapper"
        :default-active="$route.path"
        :collapse="isCollapses"
        :background-color="variablescss.menuBg"
        :text-color="variablescss.menuText"
        :active-text-color="variablescss.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      ><!-- :key="route.path" -->
        <sidebar-item v-for="route in routedata" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
    <div id="kanbmanage">
      <el-button id="kbmbtn" size="mini" round type="primary" @click="kanbanManage()">看板管理</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import variables from '@/styles/variables.scss';
import SidebarItem from './SidebarItem';

export default { // 标题
  components: { SidebarItem },
  // eslint-disable-next-line vue/require-prop-types
  props: ['visiblesysModel'],
  data() {
    return {
      sourSetting: false// 切换
    };
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routedata() {
      return this.$store.getters.routerList;
    },
    variablescss() {
      return variables;
    },
    isCollapses() {
      return !this.sidebar.opened;
    }
  },
  watch: {
    '$store.state.app.routerstat': 'isShowyboard' // 监听是否可编辑
  },
  mounted() {
    // if (this.$store.getters.routerList > 0 && this.$store.getters.routerList[0]) {
    // }
  },
  methods: {
    isShowyboard() {
      this.sourSetting = false;
    },
    kanbanManage() {
      this.$parent.dialogKanbanVisible = true;
    },
    // 切换
    chooseBase(stat) {
      this.sourSetting = stat;
      if (!stat) {
        // 只要动态的路由
        this.$store.dispatch('setRouterList', { routerList: this.$store.state.user.AsyncRouterMap, isOnlyAsyn: true });
      } else {
        this.$store.dispatch('setRouterList', { routerList: [] }); // 动态路由设置为空
      }
    }
  }
};
</script>
<style scoped>
  .sidebtn{
    width: 92%;
    height: 2.7rem;
    line-height: 2.7rem;
    text-align: center;
    font-size: 1.1rem;
    color: #999;
    background: #11254e;
    display: flex;
    margin: auto;
    margin-bottom: 6px;
    position: absolute;
    left: 4%;
  }
  .sidebtn .til{
    width:50%;height:100%;color:#999;font-size: 1vw;
    text-align: center;    cursor: pointer;
  }
  .sidebtn .actives{
    background: #1c1f25;
    border-top: 2px solid #0db3fd;
    cursor: default;
    color: #3caff2;
  }
  .sidebtn .sidb:hover{opacity: .8}
</style>
