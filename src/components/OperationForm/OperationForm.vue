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
              <el-option value="5" label="5分钟" />
              <el-option value="6" label="6分钟" />
              <el-option value="8" label="8分钟" />
              <el-option value="10" label="10分钟" />
              <el-option value="15" label="15分钟" />
              <el-option value="20" label="20分钟" />
              <el-option value="30" label="30分钟" />
              <el-option value="60" label="60分钟" />
            </el-select>
          </el-form-item>
          <el-form-item label="查询参数">
            <el-tooltip :content="form.queryparams" class="item" effect="dark" placement="top">
              <el-input v-model="form.queryparams" :rows="1" type="textarea" @click.native="openSelectQuery()"/>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="选择数据">
            <el-select id="dataKey" v-model="form.dataKey" filterable placeholder="请选择要绑定的数据" @change="selected($event)">
              <el-option v-for="(item,i) in this.$parent.allData" :value="item.datakey" :label="item.dataname" :key="i" :datatype="item.datatype"/>
            </el-select>
          </el-form-item>
          <div class="componentsBox">
            <div class="componentsTitle" ><svg-icon icon-class="eye-open" class-name="card-panel-icon" />  可选图表</div>
            <div class="componentsContent">
              <el-row>
                <!--:src="'@/assets/images/'+item.url+'.png'"-->
                <el-col v-for="(item,i) in ableChartsData" :span="8" :key="i">
                  <div v-if="dataTypes.indexOf(item.key) > -1 && form.dataKey != null" :title="item.name" class="imgBox" @mousedown="chartmouseDown(item.key)" @click="selectionChart(item)">
                    <img v-if="item.key == currKey" :src="'static/images/'+(item.url)+'.png'" class="checked" alt="" d raggable="true">
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
        <div>
          <el-input v-model="sourcename" clearable placeholder="数据源名称" style="width: 94%;margin: 10px 3% 0 3%;" class="filter-itemform" />
          <!-- <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>-->
        </div>
        <el-table :data="sourceListData" style="width: 100%;margin-top:15px">
          <el-table-column prop="dataname" label="数据源"/>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelect(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--数据源-->
      <el-dialog v-dialogDrag :title="textMap[dialogStatus]" :modal="false" :close-on-click-modal="false" :visible.sync="dialogFormVisible" width="700px">
        <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="margin:0 30px;">
          <!--  <el-form-item label="数据编码" prop="datakey">
            <el-input v-if="this.dialogStatus == 'update'" disabled size="mini" v-model="dataForm.datakey"></el-input>
            <el-input v-else   size="mini" v-model="dataForm.datakey"></el-input>
          </el-form-item>-->
          <el-form-item label="数据名称" prop="dataname">
            <el-input v-model="dataForm.dataname" style="width:100%"/>
          </el-form-item>
          <!--对应G3版本才要这个数据路由 仓云注释此即可-->
          <!--  <el-form-item label="数据路由" prop="module">
            <el-input  size="mini" v-model="dataForm.module"></el-input>
          </el-form-item>-->
          <el-form-item label="图表类型" prop="datatype">
            <el-select v-model="dataForm.datatype" style="width:100%" multiple placeholder="请选择">
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
            <el-input v-model="dataForm.dataconfig" :rows="6" style="width:100%" size="mini" type="textarea"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="info" @click="dialogFormVisible = false">取消</el-button>
          <el-button v-if="dialogStatus=='create'" size="mini" type="info" @click="resetForm('dataForm')">重置</el-button>
          <el-button v-if="dialogStatus=='create'" size="mini" type="primary" @click="submitSourData">保存</el-button>
          <el-button v-if="dialogStatus=='update'" size="mini" type="primary" @click="editSourData">保存</el-button>
        </div>
      </el-dialog>

      <!--选择查询参数-->
      <el-dialog v-dialogDrag :modal="false" :close-on-click-modal="false" :visible.sync="dialogFormParam" title="查询条件" width="700px">
        <el-form :rules="rules" :model="queryForm" status-icon label-position="right" label-width="100px" style="margin:0 30px;">
          <el-form-item label="查询时间">
            <el-col :span="11">
              <el-date-picker v-model="queryForm.query_pub_stdate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="开始日期" style="background: none;height:2rem;width:100%"/>
            </el-col>
            <el-col :span="2" class="line" style="text-align: center;color:#aaa;">-</el-col>
            <el-col :span="11">
              <el-date-picker v-model="queryForm.query_pub_enddate" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="结束日期" style="width:100%"/>
            </el-col>
          </el-form-item>
          <el-form-item label="仓库">
            <el-select
              v-model="queryForm.query_pub_whid"
              style="width:100%"
              clearable
              multiple
              class="filter-item"
              filterable
              placeholder="选择仓库">
              <el-option
                v-for="item in whidData"
                :key="item.code"
                :label="item.value"
                :value="item.code"/>
            </el-select>
          </el-form-item>
          <el-form-item label="货主">
            <el-select
              v-model="queryForm.query_pub_owco"
              style="width:100%"
              clearable
              class="filter-item"
              filterable
              placeholder="选择货主">
              <el-option
                v-for="item in owcoData"
                :key="item.code"
                :label="item.value"
                :value="item.code"/>
            </el-select>
          </el-form-item>
          <el-form-item label="Top">
            <el-select v-model="queryForm.query_pub_top" style="width:100%" clearable filterable placeholder="选择排名" >
              <el-option value="10" label="10" />
              <el-option value="15" label="15" />
              <el-option value="20" label="20" />
              <el-option value="30" label="30" />
              <el-option value="40" label="40" />
              <el-option value="50" label="50" />
              <el-option value="100" label="100" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" type="info" @click="dialogFormParam = false">取消</el-button>
          <el-button size="mini" type="primary" @click="saveParamQuery">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addSourseData, getSourDataAll, saveTemplateSetting, updataTemSetting, editSourData, delSourData } from '@/api/chartSetting';
// eslint-disable-next-line no-unused-vars
import c0 from '@/assets/images/c0.png';
export default {
  name: 'OperationForm',
  // eslint-disable-next-line vue/require-prop-types
  props: ['mainTitle', 'queryparams'],
  data() {
    return {
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
        dataKey: undefined, // 图表数据
        queryparams: undefined// 查询参数
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
      queryForm: {
        query_pub_stdate: '', // 开始时间
        query_pub_enddate: '', // 结束时间
        query_pub_whid: [], // 仓库
        query_pub_owco: '', // 货主
        query_pub_top: ''// 排名
      },
      dialogFormParam: false,
      whidOption: [],
      owcoOption: [],
      rules: {
        datakey: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        dataname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        module: [{ required: true, message: '请输入数据路由 ', trigger: 'blur' }],
        datatype: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        dataconfig: [{ required: true, message: '请输入数据源', trigger: 'blur' }]
      },
      sourcename: undefined// 搜索数据源名称
    };
  },
  computed: {
    whidData() {
      return this.$store.state.user.whidData;// 数据源
    },
    owcoData() {
      return this.$store.state.user.owcoData;// 数据源
    },
    sourceListData: {
      get: function() {
        if (this.sourcename == null || this.sourcename == '') {
          return this.$parent.allData;
        } else {
          let datas = [];
          for (let n of this.$parent.allData) {
            if (n.dataname.indexOf(this.sourcename) != -1) {
              datas.push(n);
            }
          }
          return datas;
        }
      }
    }
  },
  watch: {
    '$route': 'rutrnDatas', // 监听路由变化
    'currDataKey': 'rutrnData', // 监听当前数据源变化修改可支持的图表类型
    'queryparams': 'queryparamfun'
  }, // 标题
  mounted() {
    this.getTempleteAll();
    var retime = localStorage.reloadTime;
    if (retime != undefined) {
      this.reloadTime = retime;
    }
  },
  methods: {
    // 监听查询参数,有则回显
    queryparamfun() {
      if (this.queryparams != '') {
        this.form.queryparams = this.queryparams;
        let querydata = JSON.parse(this.queryparams);
        if (querydata.query_pub_stdate) { this.queryForm.query_pub_stdate = querydata.query_pub_stdate; }
        this.queryForm = {
          query_pub_stdate: querydata.query_pub_stdate ? querydata.query_pub_stdate : '', // 开始时间
          query_pub_enddate: querydata.query_pub_enddate ? querydata.query_pub_enddate : '', // 结束时间
          query_pub_whid: querydata.query_pub_whid ? querydata.query_pub_whid.split(',') : [], // 仓库
          query_pub_owco: querydata.query_pub_owco ? querydata.query_pub_owco : '', // 货主
          query_pub_top: querydata.query_pub_top ? querydata.query_pub_top : '' // 排名
        };
      }
    },
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
      if (datatype && datatype.length > 0) {
        this.dataTypes = JSON.parse(datatype);
      }
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
      if (datatype && datatype.length > 0) {
        this.dataTypes = JSON.parse(datatype);
      }
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
      if (datatype && datatype.length > 0) {
        this.dataTypes = JSON.parse(datatype);
      }
      // 如果标题为空，就用这个标题
      this.form.boxTitle = dataname;
    },
    // 鼠标按下就赋值
    chartmouseDown(key) {
      this.currKey = key;// 当前选择
      // this.form.key = key;
    },
    // 选中某一图表后及时反映到页面
    selectionChart: function(item) {
      if (this.currModelIndex == undefined) { return; }
      this.form.key = item.key;
      var key = item.key;
      try {
        this.$parent.domConfig[this.currModelIndex].key = key;// 赋值
      } catch (e) { console.error(e); }
      // this.form.key = key;
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
      this.dataForm = {
        datakey: undefined,
        dataname: undefined,
        module: undefined,
        datatype: undefined,
        dataconfig: undefined
      };
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

      // eslint-disable-next-line one-var
      let tempid, tempname, tempconfig = [], tempstat, tempurl;
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
      tempconfig = JSON.parse(JSON.stringify(this.$parent.domConfig));
      for (let tem of tempconfig) {
        tem.data = '';// 去掉杂乱数据
        tem.boxTitle = '';
        if (tem.x != undefined) {
          // 是拖拽式的，将宽高转换成百分比
          tem.x = parseInt((tem.x / this.$parent.mainContent.width * 100).toFixed(0));
          tem.y = parseInt((tem.y / this.$parent.mainContent.height * 100).toFixed(0));
          tem.w = parseInt((tem.w / this.$parent.mainContent.width * 100).toFixed(0));
          tem.h = parseInt((tem.h / this.$parent.mainContent.height * 100).toFixed(0));
        }
      }
      tempconfig = JSON.stringify(tempconfig);
      tempurl = this.$parent.$data.tempurl;
      tempstat = 5;// 新增编辑中页面
      let datas = {
        tempid: tempid,
        tempname: tempname,
        tempconfig: tempconfig,
        tempstat: tempstat,
        tempurl: tempurl,
        queryparams: this.form.queryparams
      };
      let loading = this.$loading({
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
            message: '添加成功，请在业务看板查看!',
            duration: 3000
          });
          this.$store.dispatch('SetReloadRouter', false);// 路由有变化
          this.$store.dispatch('ToggleSideBar');// 退出编辑模式
          // 重新加载路由
          this.$store.dispatch('getSyncRouterData');
          var _this = this;
          setTimeout(function() {
            _this.$routers.replace('/');// 刷新页面
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
        if (parseInt(this.reloadTime) == 0) {
          // 清除刷新
          localStorage.removeItem('reloadTime');
        } else {
          localStorage.reloadTime = this.reloadTime;
        }
      }
      let tempid = this.$parent.$data.pageId;
      let tempname = this.mainTitle;
      let tempconfig = JSON.parse(JSON.stringify(this.$parent.domConfig));
      for (let tem of tempconfig) {
        tem.data = '';// 去掉杂乱数据
        if (tem.x != undefined) {
          // 是拖拽式的，将宽高转换成百分比
          tem.x = parseInt((tem.x / this.$parent.mainContent.width * 100).toFixed(0));
          tem.y = parseInt((tem.y / this.$parent.mainContent.height * 100).toFixed(0));
          tem.w = parseInt((tem.w / this.$parent.mainContent.width * 100).toFixed(0));
          tem.h = parseInt((tem.h / this.$parent.mainContent.height * 100).toFixed(0));
        }
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
      let datas = {
        tempid: tempid,
        tempname: tempname,
        tempconfig: tempconfig,
        queryparams: this.form.queryparams
      };
      let loading = this.$loading({
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
          this.$store.dispatch('SetReloadRouter', false);// 路由有变化
          // 重新加载路由
          this.$store.dispatch('getSyncRouterData');
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
          let datatype = this.dataForm.datatype;
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
              // 刷新数据源列表
              this.$store.dispatch('GetSourData');
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
          let datatype = this.dataForm.datatype;
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
              // 重新加载数据源
              this.$store.dispatch('GetSourData');
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
        'datakey': row.datakey,
        'id': row.id
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
            // 重新加载数据源
            this.$store.dispatch('GetSourData');
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
        try {
          this.dataForm = JSON.parse(JSON.stringify(row));
        } catch (e) {
          debugger;
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate();
        });
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
    },
    // 打开查询参数
    openSelectQuery() {
      this.dialogFormParam = true;
    },
    // 保存查询参数
    saveParamQuery() {
      if (this.queryForm.query_pub_stdate != undefined && this.queryForm.query_pub_enddate != undefined) {
        if (new Date(this.queryForm.query_pub_enddate) <= new Date(this.queryForm.query_pub_stdate)) {
          this.$message({
            type: 'info',
            message: '截止时间须大于开始时间！'
          });
          return;
        }
      }
      try {
        var json = JSON.parse(JSON.stringify(this.queryForm));
      } catch (e) {
        debugger;
      }
      var hasVal = false;
      for (let i in json) {
        if (json[i].length > 0) {
          hasVal = true; break;
        }
      }
      if (!hasVal) {
        this.form.queryparams = undefined;
      } else {
        json.query_pub_whid = json.query_pub_whid.join(',');
        this.form.queryparams = JSON.stringify(json);
      }
      this.dialogFormParam = false;
      let datas = {
        tempid: this.$parent.$data.pageId,
        queryparams: this.form.queryparams
      };
      this.$parent.queryparams = this.form.queryparams;
      this.$store.dispatch('SetReloadData', !this.$store.state.app.reloadData);// 刷新页面数据
      updataTemSetting(this.$qs.stringify(datas)).then(response => {
        if (response.data.code == 200) {
          this.$notify({
            title: '成功',
            message: '设置成功!',
            duration: 2000
          });
        } else {
          this.$notify({
            title: '提示',
            message: response.data.msg,
            duration: 3000
          });
        }
      });
    }

  }
};
</script>
