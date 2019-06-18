<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <!--<div class="sidebtn">
      <div class="sidb">设置</div>
    </div>-->

    <el-menu
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>

    <div id="kanbmanage">
      <el-button size="mini" round type="primary" @click="kanbanManage()">看板管理</el-button>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'
import Hamburger from '@/components/Hamburger'

export default {
  data(){
    return {
      dialogFormVisible:false
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      //console.log(this.$store.getters.routerList)
      return this.$store.getters.routerList
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    kanbanManage(){
      this.$parent.dialogKanbanVisible = true;
    }
  }
}
</script>
<style scoped>
  .sidebtn{
    width: 100%;
    height:60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sidebtn .sidb{
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
  .sidebtn .sidb:hover{opacity: .8}
</style>
