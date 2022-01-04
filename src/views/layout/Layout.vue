<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar :visiblesys-model="visiblesysModel" class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
    <!--轮播设置-->
    <el-dialog v-dialogDrag :modal="false" :visible.sync="dialogFormVisible" title="轮播设置" width="50%">
      <el-form status-icon label-position="left" label-width="100px" style="margin:0 30px;">
        <el-form-item class="layoutcheck" label="轮播页面">
          <el-checkbox v-for="(item,i) in dataForm.routerData" :key="i" v-model="item.checked" class="lpcheckbox">{{ item.title }}</el-checkbox>
        </el-form-item>
        <el-form-item label="刷新时间" >
          <el-input v-model="dataForm.time" style="width:200px" size="mini" placeholder="单位（S）" @input.native="changeCode"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" round type="info" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="mini" round type="info" @click="clearLunbo">清除轮播</el-button>
        <el-button size="mini" round type="primary" @click="saveRouterSet">设定轮播</el-button>
      </div>
    </el-dialog>

    <!--看板管理-->
    <el-dialog v-dialogDrag :modal="false" :visible.sync="dialogKanbanVisible" title="看板管理" width="60%">
      <el-table
        v-loading="listLoading"
        key="tableKey"
        :data="list"
        height="45vh"
        style="width: 100%;">
        <el-table-column :show-overflow-tooltip="true" label="模版ID" prop="tempid" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.tempid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="看板名称" prop="tempname" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.tempname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用模板" prop="tempurl" align="center" width="150">
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
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="{row}">
            <!--<el-button  size="mini" type="primary" plain @click="handleAddQuery(row)">
              添加查询条件
            </el-button>-->
            <el-button type="text" size="small" @click="handleDeleteK(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer" style="display: flex;justify-content: space-between;">
        <div v-if="visiblesysModel" style="color: #409eff;font-size: 14px;">
          是否显示系统模板:
          <el-switch
            v-model="visiblesysModel"
            @change="showsysSwitch"/>
        </div>
        <div>
          <el-button size="mini" round type="info" @click="addDIYbload()">添加定制化看板页</el-button>
          <el-button size="mini" round type="info" @click="dialogKanbanVisible = false">关闭管理</el-button>
        </div>
      </div>
    </el-dialog>

    <!--添加定制化看板页-->
    <el-dialog v-dialogDrag :modal="false" :close-on-click-modal="false" :visible.sync="dialogFormDIY" title="添加定制化看板" width="500px">
      <el-form ref="diyForm" :rules="rules" :model="diyForm" status-icon label-position="right" label-width="100px" style="margin:0 30px;">
        <el-form-item label="看板ID">
          <el-input v-model="diyForm.tempid" style="width:100%" disabled/>
        </el-form-item>
        <el-form-item label="看板名称" prop="tempname">
          <el-input v-model="diyForm.tempname" style="width:100%"/>
        </el-form-item>
        <el-form-item label="看板地址" prop="tempurl">
          <el-input v-model="diyForm.tempurl" style="width:100%"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="info" @click="dialogFormDIY = false">取消</el-button>
        <el-button size="mini" type="primary" @click="saveDIYbload">添加</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import { Navbar, Sidebar, AppMain } from './components';
import { delTemById, publishTems, saveTemplateSetting } from '@/api/chartSetting';
import ResizeMixin from './mixin/ResizeHandler';
var that;
var index = 0;// 轮播记录
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: false,
      pageData: [],
      dialogFormVisible: false,
      dialogKanbanVisible: false,
      timers: undefined, // 轮播对象
      dataForm: {
        routerData: [],
        time: undefined
      },
      diyForm: {
        tempid: Date.parse(new Date()),
        tempname: undefined,
        tempconfig: Date.parse(new Date()),
        tempstat: 5,
        tempurl: undefined,
        queryparam: Date.parse(new Date())
      },
      dialogFormDIY: false,
      rules: {
        tempname: [{ required: true, message: '请输入页面名称', trigger: 'blur' }],
        tempurl: [{ required: true, message: '请输入页面url', trigger: 'blur' }]
      },
      lunbopage: [], // 轮播页面
      visiblesysModel: false, // 设置是否显示系统模，默认不显示
      timedRefreshTimer: undefined,
      router: []
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
        largeScreen: this.$store.state.app.isScreen // 看是否全屏，如果全屏，就带上largeScreen样式
      };
    }
  },
  watch: {
    // "$route":"reloadPage", 监听路由变化，由于路由AppMain.vue的设定，只对模板页面能触发
    '$store.state.app.isScreen': 'screenGetData', // 监听是否全屏
    '$store.state.user.routerDatas': 'getList'// 监听路由是否改变
  },
  created() {
    // 是否显示系统模板
    if (this.$store.state.user.mode == 'read') {
      this.visiblesysModel = false;
    } else {
      const visiblesysModel = localStorage.visiblesysModel;
      debugger;

      if (!visiblesysModel || visiblesysModel == 'false') {
        this.visiblesysModel = false;
      } else {
        this.visiblesysModel = true;
      }
    }
    /*
      为了处理轮播时内存泄露自动刷新
    if(localStorage.isBeingRotated=='1'){
      setTimeout(function(){
        that.handlelunbo()
      },4000)
    }
	  this.timedRefresh();*/
  },
  mounted() {
    that = this;
    this.getList();
    this.router = this.$store.state.user.routerlb;// 已发布的业务模板
    if (this.router.length > 0) {
      let routerSet = localStorage.routerSet; // 轮播设置
      if (routerSet != undefined) {
        routerSet = JSON.parse(routerSet);
        this.lunbopage = [];// 需要轮播的页面url
        for (const c in routerSet.routerData) {
          for (const j in this.router) {
            if (this.router[j].title == routerSet.routerData[c].title) {
              this.router[j].checked = routerSet.routerData[c].checked;
              if (this.router[j].checked) {
                this.lunbopage.push(this.router[j].url);// 要轮播
              }
            }
          }
        }
        this.dataForm.routerData = this.router;
        this.dataForm.time = routerSet.time;
      } else {
        that.dataForm.routerData = this.router;
      }
    }
  },
  beforeDestroy() {
    if (this.timers) {
      clearInterval(this.timers);// 销毁
    }
  },
  methods: {
    getList() {
      this.list = [];
      var allrouter = this.$store.state.user.routerDatas;
      for (const n in allrouter) {
        if (parseInt(allrouter[n].tempstat) != 1) {
          this.list.push(allrouter[n]);
        }
      }
    },
    // 删除模板
    handleDeleteK(row) {
      this.$confirm('您确定要删除此模板吗，请谨慎操作！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delTemById(this.$qs.stringify(row)).then(response => {
          if (response.data.code == 200) {
            this.$notify({
              title: '提示',
              message: '删除成功！',
              duration: 2000
            });
            const index = this.list.indexOf(row);
            this.list.splice(index, 1);
            // this.$store.dispatch('SetReloadRouter', false);//需要刷新路由
            // 重新加载路由
            this.$store.dispatch('getSyncRouterData');
          } else {
            this.$notify({
              title: '提示',
              message: response.data.msg,
              duration: 3000
            });
          }
        });
      });
    },
    // 切换看板状态
    active_text(even, row) {
      var params = {
        tempid: row.tempid,
        tempstat: row.tempstat
      };
      publishTems(this.$qs.stringify(params)).then(response => {
        if (response.data.code == 200) {
          if (parseInt(row.tempstat) == 9) {
            this.$message({
              message: '发布成功！',
              type: 'success'
            });
            // 刷新左侧路由状态显示
            document.getElementById(row.tempid).innerHTML = '已发布';
          } else {
            this.$message({
              message: '取消发布成功！',
              type: 'success'
            });
            // 刷新左侧路由状态显示
            document.getElementById(row.tempid).innerHTML = '编辑中';
          }
          // this.$store.dispatch('SetReloadRouter', false);//需要刷新路由
          // 重新加载路由
          this.$store.dispatch('getSyncRouterData');
        } else {
          this.$notify({
            message: response.data.msg
          });
        }
      });
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false });
    },
    // 保存路由设置
    saveRouterSet() {
      if (this.dataForm.time == undefined) {
        this.$message({
          type: 'error',
          message: '请输入刷新时间'
        });
        return;
      }
      try {
        var time = parseInt(this.dataForm.time);
        if (time < 10) {
          this.$message({
            type: 'error',
            message: '请输入不小于10的数字'
          });
          return;
        }
        localStorage.routerSet = JSON.stringify(this.dataForm);
        this.$notify({
          title: '成功',
          message: '设置成功，开始轮播！',
          duration: 2000
        });
        this.dialogFormVisible = false;
        for (const c in this.dataForm.routerData) {
          for (const j in this.router) {
            if (this.router[j].title == this.dataForm.routerData[c].title) {
              this.router[j].checked = this.dataForm.routerData[c].checked;
              if (this.router[j].checked) {
                this.lunbopage.push(this.router[j].url);// 要轮播
              }
            }
          }
        }
        this.handlelunbo();
        // this.$routers.replace('/');
        // 开始全屏轮播
        /* if(document.getElementsByClassName('main-container')[0].getElementsByClassName('active').length>0){
                 document.getElementsByClassName('main-container')[0].getElementsByClassName('active') [0].classList.remove('active');
               }
               this.$store.dispatch('SetIsScreen', true);
               this.$message('esc键 退出大屏展示');
               var _this = this;
               document.onkeydown=function () {
                 let oEvent = window.event;
                 if(oEvent.keyCode==27 ){
                   document.onkeydown = undefined;
                   _this.$store.dispatch('SetIsScreen', false);
                 }
               }*/
      } catch (e) {
        this.$message({
          type: 'error',
          message: '请输入不小于10的数字'
        });
      }
    },
    // 打开添加定制化看板页面
    addDIYbload() {
      this.dialogFormDIY = true;
    },
    // 保存定制化看板
    saveDIYbload() {
      this.$refs['diyForm'].validate((valid) => {
        if (valid) {
          saveTemplateSetting(this.$qs.stringify(this.diyForm)).then((response) => {
            if (response.data.code == 200 || response.data.code == '200') {
              this.dialogFormDIY = false;
              this.$notify({
                title: '成功',
                message: '添加成功!',
                duration: 2000
              });
              this.list.unshift(this.diyForm);
              // this.$store.dispatch('SetReloadRouter', false);//需要刷新路由
              // 重新加载路由
              this.$store.dispatch('getSyncRouterData');
              // this.$store.dispatch('ToggleSideBar')
            } else {
              this.$notify({
                title: '提示',
                message: response.data.msg,
                duration: 3000
              });
            }
          });
        }
      });
    },
    // 取消轮播
    clearLunbo() {
      localStorage.removeItem('routerSet');
      clearInterval(that.timers);// 销毁
      this.$notify({
        title: '提示',
        message: '轮播清除成功!',
        duration: 2000
      });
    },
    // 限制输入数字
    changeCode() {
      this.$nextTick(() => {
        if (this.dataForm.time !== undefined) {
          this.dataForm.time = this.dataForm.time.replace(/[^\d]/g, '');
          if (this.dataForm.time == undefined || this.dataForm.time == '') {
            this.$message({
              type: 'error',
              message: '请输入数字！'
            });
          }
        }
      });
    },

    // 轮播
    handlelunbo() {
      clearInterval(that.timers);// 销毁
      // 开始轮播
      that.timers = setInterval(() => {
        // 如果是全屏
        if (that.$store.state.app.isScreen) {
          that.$routers.replace(this.lunbopage[index]);
        }
        index++;
        if (index == this.lunbopage.length) {
          index = 0;
        }
      }, that.dataForm.time * 1000);//
    },

    // 是否显示系统模板切换
    showsysSwitch(value) {
      this.visiblesysModel = value;
      localStorage.visiblesysModel = value;
      if (!value) {
        // 只要动态的路由
        this.$store.dispatch('setRouterList', { routerList: this.$store.state.user.AsyncRouterMap, isOnlyAsyn: true });
      }
    },
    // 定时刷新
    timedRefresh() {
      clearInterval(this.timedRefreshTimer);// 销毁
      // 开始轮播
      this.timedRefreshTimer = setInterval(() => {
        // 是否是轮播状态
        if (that.timers) {
          localStorage.isBeingRotated = '1';
          location.reload();
        }
      }, 20 * 60 * 1000);//
    }
  }
};
// eslint-disable-next-line no-undef
$(document).keydown(function(event) {
  if (event.keyCode == 13) {
    that.dialogFormVisible = true;
    // that.$routers.replace('/list') // 列表页面的路由
  }
});
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
