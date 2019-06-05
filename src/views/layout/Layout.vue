<template>
  <!--<div  class="app-wrapper openSidebar">-->
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>

<!--    <div class="rightSetting">
      <div class="title">属性设置</div>
      <div class="content">
        <operation-form/>
      </div>
    </div>-->
    <!--收缩按钮-->
    <!--<div id="topleftb" style="position: absolute;bottom: 20px;left: 10px;background: #fff;z-index: 1001;">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    </div>-->
    <!--轮播设置-->
    <el-dialog :modal="false" v-dialogDrag title="轮播设置" width="600px" :visible.sync="dialogFormVisible">
      <el-form  status-icon label-position="left" label-width="100px" style='margin:0 30px;'>
        <el-form-item class="layoutcheck" label="轮播页面">
          <el-checkbox class="lpcheckbox" v-for="(item,i) in dataForm.routerData" v-model="item.checked">{{item.title}}</el-checkbox>
        </el-form-item>
        <el-form-item label="刷新时间" >
          <el-input size="mini" @input.native="changeCode" v-model="dataForm.time" placeholder="单位（S）"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" round type="info"  @click="dialogFormVisible = false">取消</el-button>
        <el-button size="mini" round  type="info" @click="clearLunbo">清除轮播</el-button>
        <el-button size="mini" round type="primary" @click="saveRouterSet">设定轮播</el-button>
      </div>
    </el-dialog>

    <!--看板管理-->
    <el-dialog :modal="false" v-dialogDrag title="看板管理" width="700px" :visible.sync="dialogKanbanVisible">
      <el-table
        key="tableKey"
        v-loading="listLoading"
        :data="list"
        fit
        style="width: 100%;">
        <el-table-column label="模版ID" prop="tempid"  align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.tempid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="看板名称" prop="tempname"  align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.tempname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用模板" prop="tempurl"  align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.tempurl }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否发布" prop="tempstat" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.tempstat"
              active-color="#13ce66"
              active-value="9"
              inactive-value="5"
              @change="active_text($event, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="100" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button  size="mini" type="warning" plain @click="handleDeleteK(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button size="mini" round type="info"  @click="dialogKanbanVisible = false">关闭管理</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>

import { Navbar, Sidebar, AppMain} from './components'
import {delTemById,publistTem} from '@/api/chartSetting'
import ResizeMixin from './mixin/ResizeHandler'
import Hamburger from '@/components/Hamburger'
import operationForm from "./components/OperationForm";
export default {
  name: 'Layout',
  data(){
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      pageData:[],
      allData:[],
      dialogFormVisible:false,
      dialogKanbanVisible:false,
      dataForm:{
        routerData:[],
        time:undefined
      }
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
  mounted(){
    this.getList();
    let router = this.$store.state.app.routerlb;
    if(router.length > 0){
       var routerSet = localStorage.routerSet;
       if(routerSet != undefined){
          routerSet = JSON.parse(routerSet);
          var lunbopage = [];//需要轮播的页面url
          for(let c in routerSet.routerData){
              for(let j in router){
                 if(router[j].title == routerSet.routerData[c].title){
                   router[j].checked = routerSet.routerData[c].checked;
                   if(router[j].checked){
                     lunbopage.push(router[j].url);//要轮播
                   }
                 }
              }
          }
         this.dataForm.routerData = router;
         this.dataForm.time = routerSet.time;
         //开始轮播
         var index = 0
         let _this = this;
         this.timers = setInterval(() => {
           _this.$routers.replace(lunbopage[index]);
           index++;
           if(index == lunbopage.length){
             index = 0;
           }
         }, routerSet.time*1000)
       }else{
         this.dataForm.routerData = router
       }
    }
    var _this = this;
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {                // 按 Enter
        _this.dialogFormVisible = true;
        //_this.$routers.replace('/list') // 列表页面的路由
      }
    };
  },
  methods: {
    getList() {
      console.log()
      var allrouter = this.$store.state.user.routerDatas;
      for(let n in allrouter){
        if(allrouter[n].tempstat != '1'){
          this.list.push(allrouter[n]);
        }
      }
    },
    //删除模板
    handleDeleteK(row){
      this.$confirm('您确定要删除此模板吗，请谨慎操作！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTemById(this.$qs.stringify(row)).then(response => {
          if(response.data.errno == 0){
            this.$notify({
              title: '提示',
              message: '删除成功！',
              type: 'success',
              duration: 2000
            })
            const index = this.list.indexOf(row)
            this.list.splice(index, 1);
            //重新加载一次
            this.$store.dispatch('SetReloadRouter', false);//需要刷新路由
          }else{
            this.$notify({
              title: '提示',
              message: response.data.errmsg,
              type: 'error',
              duration: 3000
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    //切换看板状态
    active_text(even,row){
      publistTem(this.$qs.stringify(row)).then(response => {
        if(response.data.errno == 0){
          if(row.tempstat == '9'){
            this.$message({
              message: "发布成功！",
              type: 'success'
            });
          }else{
            this.$message({
              message: "取消发布成功！",
              type: 'success'
            });
          }
          this.$store.dispatch('SetReloadRouter', false);//需要刷新路由
        }else{
          this.$notify({
            type: 'error',
            message: response.data.errmsg
          })
        }
      })
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    //保存路由设置
    saveRouterSet(){
         if(this.dataForm.time == undefined){
           this.$message({
             type: 'error',
             message: '请输入刷新时间'
           });
           return;
         }
         try {
              var time = parseInt(this.dataForm.time);
              if (time < 15) {
                this.$message({
                  type: 'error',
                  message: '请输入不小于30的数字'
                });
                return;
              }
              localStorage.routerSet = JSON.stringify(this.dataForm);
              this.$notify({
                title: '成功',
                message: '设置成功!',
                type: 'success',
                duration: 2000
              })
              this.dialogFormVisible = false;
              this.$routers.replace('/');
          } catch (e) {
              this.$message({
                type: 'error',
                message: '请输入不小于30的数字'
              });
          }
    },
    //取消轮播
    clearLunbo(){
      localStorage.removeItem('routerSet');
      this.$notify({
        title: '提示',
        message: '轮播清除成功!',
        type: 'success',
        duration: 2000
      })
    },
    //限制输入数字
    changeCode() {
      this.$nextTick(() => {
        if(this.dataForm.time !== undefined){
          this.dataForm.time = this.dataForm.time.replace(/[^\d]/g,'')
          if(this.dataForm.time == undefined || this.dataForm.time == ""){
            this.$message({
              type: 'error',
              message: '请输入数字！'
            });
          }
        }
      })
    }
  },
  beforeDestroy() {
    if (this.timers) {
      clearInterval(this.timers);//销毁
    }
  }
}
</script>
<style>
  .layoutcheck .el-checkbox{margin-left:10px !important;}
</style>
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
