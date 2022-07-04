<template>
  <div class="rightSetting">
    <div class="title">
      <div :class="[{actives: !sourSetting },'til']" @click="chooseBase()">基本设置</div>
      <div :class="[{actives: sourSetting },'til']" @click="chooseSource()">数据源</div>
    </div>
    <div class="content">

      <div v-if="!sourSetting" class="form" >
        <el-form id="operationForm" ref="form" :model="form" class="operaform" label-width="5.5rem">
          <el-form-item label="主标题">
            <el-input id="mainTitle" v-model="mainTitle" @input="changMainTitle()"/>
          </el-form-item>
          <el-form-item label="图表标题">
            <el-input id="chartTitle" v-model="form.boxTitle" @input="changTitle()"/>
          </el-form-item>
          <el-form-item label="刷新时间">
            <!--<el-input v-model="reloadTime" @input.native="changeCode" id="reloadTime"></el-input>-->
            <el-select v-model="reloadTime" filterable placeholder="请选择页面刷新时间" >
              <el-option value="0" label="清除刷新" />
              <el-option value="1" label="1分钟" />
              <el-option value="2" label="2分钟" />
              <el-option value="3" label="3分钟" />
              <el-option value="5" label="5分钟" />
              <el-option value="8" label="8分钟" />
              <el-option value="15" label="15分钟" />
            </el-select>
          </el-form-item>
          <el-form-item label="选择数据">
            <el-select id="dataKey" v-model="form.dataKey" filterable placeholder="请选择要绑定的数据" @change="selected($event)">
              <el-option v-for="(item,i) in this.$parent.allData" :value="item.datakey" :label="item.dataname" :key="i" :datatype="item.datatype"/>
            </el-select>
          </el-form-item>
          <div class="componentsBox">
            <div class="componentsTitle" >可选图表</div>
            <div class="componentsContent">
              <el-row>
                <el-col v-for="(item,i) in ableChartsData" :span="8" :key="i">
                  <div v-if="dataTypes.indexOf(item.key) > -1 && form.dataKey != null" :title="item.name" class="imgBox" @mousedown="chartmouseDown(item.key)" @click="selectionChart(item)">
                    <img v-if="item.key == currKey" :src="'/static/images/'+(item.url)+'.png'" class="checked" alt="" d raggable="true">
                    <img v-else :src="'static/images/'+(item.url)+'.png'" alt="" draggable="true">
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="btnDiv">
            <div v-if="this.$parent.$data.isModle" id="subBtn" class="" @click="saveChanges()">保存看板</div>
            <div v-else class="" @click="updataChangesData()">保存修改</div>
            <div id="addDataBtn" class="addDataBtn" @click="addDataWindow('dataForm')">新增数据</div>
          </div>
        </el-form>

      </div>

      <!--数据源-->
      <div v-else style="height:100%;overflow: scroll">
        <el-table :data="this.$parent.allData" style="width: 100%;margin-top:15px">
          <el-table-column prop="dataname" label="数据源"/>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelect(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog v-dialogDrag :title="textMap[dialogStatus]" :modal="false" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="50%">
        <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="margin:0 30px;">
          <el-form-item label="数据编码" prop="datakey">
            <el-input v-if="dialogStatus == 'update'" v-model="dataForm.datakey" disabled size="mini"/>
            <el-input v-else v-model="dataForm.datakey" size="mini"/>
          </el-form-item>
          <el-form-item label="数据名称" prop="dataname">
            <el-input v-model="dataForm.dataname" size="mini"/>
          </el-form-item>
          <!--对应G3版本才要这个数据路由 -->
          <el-form-item label="数据名称" prop="module">
            <el-input v-model="dataForm.module" size="mini"/>
          </el-form-item>
          <el-form-item label="图表类型" prop="datatype">
            <el-select v-model="dataForm.datatype" style="width:300px" size="mini" multiple placeholder="请选择">
              <el-option-group
                v-for="group in chartOption"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="数据配置" prop="dataconfig">
            <el-input v-model="dataForm.dataconfig" :rows="5" size="mini" type="textarea"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="info" @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" size="mini" type="info" @click="resetForm('dataForm')">重置</el-button>
          <el-button v-if="dialogStatus=='create'" size="mini" type="primary" @click="submitSourData">保存</el-button>
          <el-button v-if="dialogStatus=='update'" size="mini" type="primary" @click="editSourData">保存</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import { addSourseData, getSourDataAll, saveTemplateSetting, updataTemSetting, editSourData, delSourData } from '@/api/chartSetting';
export default {
  name: 'OperationForm',
  // eslint-disable-next-line vue/require-prop-types
  props: ['mainTitle'],
  data() {
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      mainTitle: '',
      currModelIndex: 0, // 当前模块下标
      currKey: undefined, // 当前图表类型--回显
      currDataKey: undefined, // 当前数据源类型--回显
      currId: undefined, // 当前模块id
      ableChartsData: this.GLOBAL.fixedChart, // 所有可用图表
      dataTypes: [], // 根据所选数据可支持的图表范围
      sourSetting: false, // 切换
      reloadTime: undefined,
      dialogStatus: 'create',
      textMap: { update: '编辑数据源', create: '添加数据源' },
      form: {
        modelId: undefined, // 模块id
        boxTitle: undefined, // 表标题
        key: undefined, // 图表类型
        dataKey: undefined// 图表数据
      },
      chartOption: [
        {
          label: '数据列表',
          options: [{
            value: 'data',
            label: '直观数据'
          }, {
            value: 'list',
            label: '数据列表'
          }]
        }, {
          label: '单维图表',
          options: [{
            value: 'line',
            label: '折线统计图'
          }, {
            value: 'bar',
            label: '柱状统计图'
          }, {
            value: 'pie',
            label: '饼状图'
          }, {
            value: 'ring',
            label: '环形图'
          }]
        }, {
          label: '多维图表',
          options: [{
            value: 'nline',
            label: '多条折线统计图'
          }, {
            value: 'nbar',
            label: '多条柱状统计图'
          }]
        }, {
          label: '其它',
          options: [{
            value: 'ybar',
            label: '纵向柱状图'
          }, {
            value: 'netline',
            label: '无y网格线折线图'
          }]
        }
      ],
      nowEditData: [], // 现在编辑地div的数据
      dialogFormVisible: false,
      dataForm: {
        datakey: undefined,
        dataname: undefined,
        module: undefined,
        datatype: undefined,
        dataconfig: undefined
      },
      rules: {
        datakey: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        dataname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        module: [{ required: true, message: '请输入数据路由 ', trigger: 'blur' }],
        datatype: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        dataconfig: [{ required: true, message: '请输入数据源', trigger: 'blur' }]
      }
    };
  },
  watch: {
    '$route': 'rutrnDatas', // 监听路由变化
    'currDataKey': 'rutrnData' // 监听当前数据源变化修改可支持的图表类型
  }, // 标题
  mounted() {
    this.getTempleteAll();
    var retime = localStorage.reloadTime;
    if (retime != undefined) {
      this.reloadTime = retime;
    }
  },
  methods: {
    // 监听值回显
    rutrnData() {
      this.form.dataKey = this.currDataKey;
      // 图表要显示的内容
      var datatype;
      for (let i in this.$parent.allData) {
        if (this.$parent.allData[i].datakey == this.currDataKey) {
          datatype = this.$parent.allData[i].datatype;
          break;
        }
      }
      // debugger
      this.dataTypes = JSON.parse(datatype);
    },
    rutrnDatas() {
      this.currDataKey = undefined;
      // 图表要显示的内容
      var datatype;
      for (let i in this.$parent.allData) {
        if (this.$parent.allData[i].datakey == this.currDataKey) {
          datatype = this.$parent.allData[i].datatype;
          break;
        }
      }
      this.dataTypes = JSON.parse(datatype);
      // console.log(this.dataTypes)
    },
    // 主标题联动改变
    changMainTitle: function() {
      this.$parent.mainTitle = this.mainTitle;
    },
    // 编辑的小div标题的联动改变
    changTitle: function() {
      this.$parent.domConfig[this.currModelIndex].boxTitle = this.form.boxTitle;
    },
    // 选择一条后台数据之后发送请求，获取数据，渲染数据
    // 选择数据类型下面图表响应
    selected($event) {
      try {
        this.$parent.domConfig[this.currModelIndex].dataKey = this.form.dataKey;// 赋值
      } catch (e) { console.error(e); }
      var dataname;
      var datatype;
      for (let i in this.$parent.allData) {
        if (this.$parent.allData[i].datakey == this.form.dataKey) {
          datatype = this.$parent.allData[i].datatype;
          dataname = this.$parent.allData[i].dataname;
          break;
        }
      }
      this.dataTypes = JSON.parse(datatype);
      // 如果标题为空，就用这个标题
      this.form.boxTitle = dataname;
    },
    // 鼠标按下就赋值
    chartmouseDown(key) {
      this.form.key = key;
    },
    // 选中某一图表后及时反映到页面
    selectionChart: function(item) {
      var key = item.key;
      try {
        this.$parent.domConfig[this.currModelIndex].key = key;// 赋值
      } catch (e) { console.error(e); }
      // this.form.key = key;
      this.currKey = key;// 当前选择
      if (this.nowEditData.length < 0) {
        return;
      }
      var index = this.COMMONFUN.contains(this.$parent.echartArr, this.currId);// 获取下标
      var domId;
      if (index == -1) { // 如果没找到
        if (key == 'list' || key == 'data') {
          this.$parent.domConfig[this.currModelIndex].data = {
            legend: ['展示数据', '展示数据', '展示数据', '展示数据'],
            data: [
              ['35', '35', '343', '234'],
              ['35', '35', '343', '234']
            ]
          };
          return;// 数据表
        }
        // 空图，给个例子
        domId = this.currId;
        this.$parent.ec = this.$echarts.init(document.getElementById(domId));
        this.$parent.ecObj = this.GLOBAL.allChartObj[key];
      } else {
        domId = this.$parent.echartArr[index];
        var parseData = this.$parent.echartObjArr[index];
        this.$parent.ec = this.$echarts.init(document.getElementById(domId));
        this.$parent.ecObj = this.GLOBAL.allChartObj[key];
        if (key == 'list' || key == 'data') {
          // 列表
          return;
        } else {
          this.COMMONFUN.setOptionByKey(this.$parent.ecObj, key, parseData);
        }
      }
      this.$parent.$echarts.init(document.getElementById(domId)).clear();
      this.$parent.ec.setOption(this.$parent.ecObj);
    },
    addDataWindow: function(formName) {
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
      // this.$refs[formName].resetFields();//清空
    },
    // 保存模板
    saveChanges: function() {
      // 设定刷新时间
      if (this.reloadTime != undefined) {
        try {
          var time = parseInt(this.reloadTime);
          if (time == 0) {
            // 清除刷新
            localStorage.removeItem('reloadTime');
          } else {
            localStorage.reloadTime = time;
          }
        } catch (e) {
          this.$message({
            type: 'error',
            message: '刷新时间输入有误！'
          });
          return;
        }
      }

      let tempid, tempname, tempconfig, tempstat, tempurl;
      // this.$parent.pageData.pageTitle = this.mainTitle;
      if (this.form.dataKey == undefined) {
        this.$message({
          type: 'error',
          message: '请选择数据'
        });
        return;
      }
      if (this.form.boxTitle == undefined) {
        this.$message({
          type: 'error',
          message: '请填写图表标题'
        });
        return;
      }
      if (this.mainTitle == undefined) {
        this.$message({
          type: 'error',
          message: '填写页面标题'
        });
        return;
      }
      if (this.form.key == undefined) {
        this.$message({
          type: 'error',
          message: '请选择图表类型'
        });
        return;
      }
      // this.$parent.pageData.data[this.$parent.nowDivIndex] = this.form;
      tempid = Date.parse(new Date());
      tempname = this.mainTitle;
      tempconfig = this.$parent.domConfig;
      for (let c in tempconfig) {
        tempconfig[c].data = '';// 去掉杂乱数据
      }
      tempconfig = JSON.stringify(tempconfig);
      tempurl = this.$parent.$data.tempurl;
      tempstat = 5;// 新增编辑中页面
      let datas = {
        tempid: tempid,
        tempname: tempname,
        tempconfig: tempconfig,
        tempstat: tempstat,
        tempurl: tempurl
      };
      var loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      saveTemplateSetting(this.$qs.stringify(datas)).then((response) => {
        setTimeout(() => {
          loading.close();
        }, 1000);
        if (response.data.code == 200 || response.data.code == '200') {
          this.$notify({
            title: '成功',
            message: '添加成功,正在刷新页面!',
            duration: 2000
          });
          this.$store.dispatch('SetReloadRouter', false);// 需要刷新路由
          var _this = this;
          this.$store.dispatch('ToggleSideBar');
          setTimeout(function() {
            _this.$routers.replace('/');// 刷新页面
            _this.$message({
              type: 'success',
              message: '刷新成功！'
            });
          }, 1000);
        } else {
          this.$notify({
            title: '提示',
            message: response.data.msg,
            duration: 3000
          });
        }
      });
    },
    // 如果是编辑中的模板，那么保存修改
    updataChangesData() {
      // 设定刷新时间
      if (this.reloadTime != undefined) {
        try {
          var time = parseInt(this.reloadTime);
          if (time == 0) {
            // 清除刷新
            localStorage.removeItem('reloadTime');
          } else {
            localStorage.reloadTime = time;
          }
        } catch (e) {
          this.$message({
            type: 'error',
            message: '刷新时间输入有误！'
          });
          return;
        }
      }
      var tempid = this.$parent.$data.pageId;
      var tempname = this.mainTitle;
      let tempconfig = this.$parent.domConfig;
      for (let c in tempconfig) {
        tempconfig[c].data = '';// 去掉杂乱数据
      }
      tempconfig = JSON.stringify(tempconfig);
      if (this.form.boxTitle == '') {
        this.$message({
          type: 'error',
          message: '请填写图表标题'
        });
        return;
      }
      if (this.mainTitle == '') {
        this.$message({
          type: 'error',
          message: '填写页面标题'
        });
        return;
      }
      var datas = {
        tempid: tempid,
        tempname: tempname,
        tempconfig: tempconfig
      };
      var loading = this.$loading({
        lock: true,
        text: '提交中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      updataTemSetting(this.$qs.stringify(datas)).then(response => {
        setTimeout(() => {
          loading.close();
        }, 1000);
        if (response.data.code == 200 || response.data.code == '200') {
          this.$notify({
            title: '成功',
            message: '修改成功!',
            duration: 2000
          });
          this.$store.dispatch('SetReloadRouter', false);// 需要刷新路由
          this.$store.dispatch('ToggleSideBar');
          window.location.reload();
          /* setTimeout(function(){
              _this.$routers.replace('/');//刷新页面
            },1000)*/
        } else {
          this.$notify({
            title: '提示',
            message: response.data.msg,
            duration: 3000
          });
        }
      });
    },
    // 保存添加数据源
    submitSourData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var datatype = this.dataForm.datatype;
          if (datatype.length > 0) {
            this.dataForm.datatype = JSON.stringify(datatype);
          }
          addSourseData(this.$qs.stringify(this.dataForm)).then((response) => {
            this.dialogFormVisible = false;
            if (response.data.code == 200 || response.data.code == '200') {
              this.$notify({
                title: '成功',
                message: '添加成功',
                duration: 2000
              });
              this.$parent.allData.unshift(this.dataForm);
              // 刷新数据源列表 TODO
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
    // 修改数据源
    editSourData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var datatype = this.dataForm.datatype;
          if (datatype.length > 0) {
            this.dataForm.datatype = JSON.stringify(datatype);
          }
          this.dataForm.crdt = undefined;
          editSourData(this.$qs.stringify(this.dataForm)).then((response) => {
            this.dialogFormVisible = false;
            if (response.data.code == 200 || response.data.code == '200') {
              this.$notify({
                title: '成功',
                message: '修改成功',
                duration: 2000
              });
              // 刷TODO
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
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();// 清空
    },
    getTempleteAll() {
      getSourDataAll().then((response) => {
        if (response.data.code == 200 || response.data.code == '200') {
          var options = [];
          for (var i = 0; i < response.data.data.length; i++) {
            var tree = {};
            tree.label = response.data.data[i].appkey;
            tree.value = response.data.data[i].appkey;
            options.push(tree);
          }
          this.options = options;
        }
      });
    },
    // 删除数据源
    handleDelect(row) {
      var params = {
        'datakey': row.datakey
      };
      this.$confirm('看板中可能有模块依赖此数据源，删除将影响使用，您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSourData(this.$qs.stringify(params)).then(response => {
          if (response.data.code == 200 || response.data.code == '200') {
            this.$notify({
              title: '提示',
              message: '删除成功！',
              duration: 2000
            });
            var index = this.$parent.allData.indexOf(row);
            this.$parent.allData.splice(index, 1);
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
    // 编辑修改数据源
    handleEdit(row) {
      this.$confirm('看板中可能有模块依赖此数据源，修改可能影响使用，您确定要修改此项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;

        if (typeof row.datatype == 'number') {
          row.datatype = '["' + row.datatype + '"]';
        }
        if (typeof row.datatype == 'string') {
          row.datatype = JSON.parse(row.datatype);
        }
        this.dataForm = row;
      });
    },
    // 限制输入数字
    changeCode() {
      this.$nextTick(() => {
        if (this.reloadTime !== undefined) {
          this.reloadTime = this.reloadTime.replace(/[^\d]/g, '');
          if (this.reloadTime == undefined || this.reloadTime == '') {
            this.$message({
              type: 'error',
              message: '请输入数字！'
            });
          }
        }
      });
    },
    // 切换
    chooseBase() {
      this.sourSetting = false;
    },
    //
    chooseSource() {
      this.sourSetting = true;
    }
  }
};
</script>
