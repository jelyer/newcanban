<template>
  <div class="rightSetting">
    <div class="title">
       <div :class="[{active: !sourSetting },'til']" @click="chooseBase()">基本设置</div>
       <div :class="[{active: sourSetting },'til']" @click="chooseSource()">数据源</div>
    </div>
    <div class="content">

        <div v-if="!sourSetting" class="form">
          <el-form class="operaform" ref="form" :model="form" label-width="80px">
            <el-form-item label="主标题">
              <el-input v-model="mainTitle" id="mainTitle"  v-on:input="changMainTitle()"></el-input>
            </el-form-item>
            <el-form-item label="图表标题">
              <el-input v-model="form.boxTitle" id="chartTitle"  v-on:input="changTitle()"></el-input>
            </el-form-item>
            <el-form-item label="刷新时间">
              <el-input v-model="reloadTime" @input.native="changeCode" id="reloadTime"></el-input>
            </el-form-item>
            <el-form-item label="选择数据">
              <el-select  v-model="form.dataKey" placeholder="请选择要绑定的数据"  @change="selected()" id="dataKey">
                <el-option :value="item.datakey" v-for="(item,i) in this.$parent.allData" :label="item.dataname" :key="i" :datatype="item.datatype"></el-option>
              </el-select>
            </el-form-item>
            <div class="componentsBox">
              <div class="componentsTitle" >可选图表</div>
              <div class="componentsContent">
                <el-row>
                  <el-col :span="8" v-for="(item,i) in ableChartsData" :key="i">
                    <div class="imgBox" v-if="dataTypes.indexOf(item.key.toString()) > -1"  v-on:click="selectionChart(item.key)">
                      <img v-if="item.key == currKey" class="checked" :src="'/static/image/'+(item.url)+'.png'" alt="">
                      <img v-else :src="'/static/image/'+(item.url)+'.png'" alt="">
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="btnDiv">
              <div class=""  v-if="this.$parent.$data.isModle" id="subBtn" @click="saveChanges()">保存看板</div>
              <div class="" v-else  @click="updataChangesData()">保存修改</div>
              <div class="addDataBtn" id="addDataBtn"  @click="addDataWindow('dataForm')">新增数据</div>
            </div>
          </el-form>


        </div>

        <!--数据源-->
        <div v-else>
          <el-table :data="this.$parent.allData" style="width: 100%;margin-top:15px">
            <el-table-column prop="dataname" label="数据源"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.row)" size="small">编辑</el-button>
                <el-button @click="handleDelect(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      <el-dialog  v-dialogDrag :title="textMap[dialogStatus]" width="500px" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="dataForm" status-icon label-position="left" label-width="100px" style='margin:0 30px;'>
          <el-form-item label="数据编码" prop="datakey">
            <el-input v-if="this.dialogStatus == 'update'" disabled size="mini" v-model="dataForm.datakey"></el-input>
            <el-input v-else   size="mini" v-model="dataForm.datakey"></el-input>
          </el-form-item>
          <el-form-item label="数据名称" prop="dataname">
            <el-input  size="mini" v-model="dataForm.dataname"></el-input>
          </el-form-item>
          <el-form-item label="图表类型" prop="datatype">
            <el-select  style="width:300px"  size="mini"  multiple v-model="dataForm.datatype" placeholder="请选择">
              <el-option-group
                v-for="group in chartOption"
                :key="group.label"
                :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-option-group>
             <!-- <el-option-group  label="数据列表">
                <el-option label="数据列表" value="-1"></el-option>
              </el-option-group>
              <el-option-group  label="单维图表">
                <el-option label="折线统计图" value="1"></el-option>
                <el-option label="柱状统计图" value="2"></el-option>
                <el-option label="饼状图" value="5"></el-option>
                <el-option label="环形图" value="0"></el-option>
              </el-option-group>
              <el-option-group  label="多维图表">
                <el-option label="多条折线统计图" value="6"></el-option>
                <el-option label="多条柱状统计图" value="7"></el-option>
              </el-option-group>
              <el-option-group  label="其它">
                <el-option label="纵向柱状图" value="3"></el-option>
              </el-option-group>-->
            </el-select>
          </el-form-item>
          <el-form-item label="数据配置" prop="dataconfig">
            <el-input  size="mini" v-model="dataForm.dataconfig" type="textarea" :rows="5"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" round  type="info" @click="dialogFormVisible = false">取消</el-button>
          <el-button size="mini" v-if="dialogStatus=='create'" round type="info"  @click="resetForm('dataForm')">重置</el-button>
          <el-button size="mini" v-if="dialogStatus=='create'" round type="primary" @click="submitSourData">保存</el-button>
          <el-button size="mini" v-if="dialogStatus=='update'" round type="primary" @click="editSourData">保存</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
  import {addSourseData,getSourDataAll,saveTemplateSetting,updataTemSetting,editSourData,delSourData} from '@/api/chartSetting'
  export default {
    name: 'OperationForm',
    data() {
      return {
        mainTitle: '',
        currModelIndex:0,//当前模块下标
        currKey:undefined,//当前图表类型--回显
        currDataKey:undefined,//当前数据源类型--回显
        currId:undefined,//当前模块id
        ableChartsData: this.GLOBAL.fixedChart,//所有可用图表
        dataTypes:[1,2,3,4],//根据所选数据可支持的图表范围
        sourSetting:false,//切换
        reloadTime:undefined,
        dialogStatus: 'create',
        textMap: {update: '编辑数据源', create: '添加数据源'},
        form: {
          modelId:'',//模块id
          boxTitle: '',//表标题
          key: '',//图表类型
          dataKey: '',//图表数据
        },
        chartOption: [
          {
            label: '数据列表',
            options: [{
              value: this.GLOBAL.fixedChart[0].key,
              label: '数据列表'
            }]
          }, {
            label: '单维图表',
            options: [{
              value: this.GLOBAL.fixedChart[2].key,
              label: '折线统计图'
            }, {
              value: this.GLOBAL.fixedChart[3].key,
              label: '柱状统计图'
            }, {
              value: this.GLOBAL.fixedChart[6].key,
              label: '饼状图'
            }, {
              value: this.GLOBAL.fixedChart[1].key,
              label: '环形图'
            }]
          }, {
            label: '多维图表',
            options: [{
              value: this.GLOBAL.fixedChart[7].key,
              label: '多条折线统计图'
            }, {
              value: this.GLOBAL.fixedChart[8].key,
              label: '多条柱状统计图'
            }]
          }, {
            label: '其它',
            options: [{
              value: this.GLOBAL.fixedChart[4].key,
              label: '纵向柱状图'
            }]
          }
        ],
        nowEditData:[],//现在编辑地div的数据
        dialogFormVisible: false,
        dataForm:{
          datakey:undefined,
          dataname:undefined,
          datatype:undefined,
          dataconfig:undefined
        },
        rules: {
          datakey: [{ required: true, message: '请输入编码', trigger: 'blur' }],
          dataname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          datatype: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          dataconfig: [{ required: true, message: '请输入数据源', trigger: 'blur' }],
        }
      }
    },
    props:['mainTitle'],//标题
    mounted(){
      this.getTempleteAll();
    },
    watch:{
      "$route":"rutrnDatas",    //监听路由变化
      "currDataKey":"rutrnData",   //监听当前数据源变化修改可支持的图表类型
    },
    methods: {
      //监听值回显
      rutrnData(){
        this.form.dataKey = this.currDataKey;
        //图表要显示的内容
        var datatype;
        for(let i in this.$parent.allData){
          if(this.$parent.allData[i].datakey == this.currDataKey){
            datatype = this.$parent.allData[i].datatype;
            break;
          }
        }
        this.dataTypes = JSON.parse(datatype);
      },
      rutrnDatas(){
        this.currDataKey = undefined;
        //图表要显示的内容
        var datatype;
        for(let i in this.$parent.allData){
          if(this.$parent.allData[i].datakey == this.currDataKey){
            datatype = this.$parent.allData[i].datatype;
            break;
          }
        }
        this.dataTypes = JSON.parse(datatype);
        //console.log(this.dataTypes)
      },
      //主标题联动改变
      changMainTitle: function () {
        this.$parent.mainTitle = this.mainTitle;
      },
      //编辑的小div标题的联动改变
      changTitle: function () {
        this.$parent.domConfig[this.currModelIndex].boxTitle = this.form.boxTitle;
      },
      //选择一条后台数据之后发送请求，获取数据，渲染数据
      //选择数据类型下面图表响应
      selected(){
        this.$parent.domConfig[this.currModelIndex].dataKey = this.form.dataKey;//赋值
        var datatype;
        for(let i in this.$parent.allData){
           if(this.$parent.allData[i].datakey == this.form.dataKey){
             datatype = this.$parent.allData[i].datatype;
             break;
           }
        }
        this.dataTypes = JSON.parse(datatype);
      },
      //选中某一图表后及时反映到页面
      selectionChart: function (key) {
        this.$parent.domConfig[this.currModelIndex].key = key;//赋值
        this.form.key = key;
        this.currKey = key;//当前选择
        if(this.nowEditData.length<0){
          return;
        }
        var index = this.COMMONFUN.contains(this.$parent.echartArr,this.currId);//获取下标
        var domId;
        if(index == -1){
          if(key == "-1"){
             return;//数据表
          }
          //空图，给个例子
          domId = this.currId;
          this.$parent.ec = this.$echarts.init(document.getElementById(domId));
          this.$parent.ecObj = this.GLOBAL.allChartObj[key];

        }else{
            domId = this.$parent.echartArr[index];
            var parseData = this.$parent.echartObjArr[index];
            this.$parent.ec = this.$echarts.init(document.getElementById(domId));
            this.$parent.ecObj = this.GLOBAL.allChartObj[key];
            if (key != 0) {
              //如果是纵向柱状图
              switch(key){
                case "3": //如果是纵向柱状图
                  this.$parent.ecObj.yAxis.data = this.COMMONFUN.getChartData(parseData)[0];
                  this.$parent.ecObj.series.data = this.COMMONFUN.getChartData(parseData)[1];
                  break;
                case "6": //如果是多条折线图
                  let datad = this.COMMONFUN.getChartsData(parseData,"line");
                  this.$parent.ecObj.legend.data = datad.legend;
                  this.$parent.ecObj.xAxis.data = datad.xdata;
                  this.$parent.ecObj.series = datad.series;
                  break;
                case "7"://条形柱状图
                  let datads = this.COMMONFUN.getChartsData(parseData,"bar");
                  this.$parent.ecObj.legend.data = datads.legend;
                  this.$parent.ecObj.xAxis.data = datads.xdata;
                  this.$parent.ecObj.series = datads.series;
                  break;
                default:
                  this.$parent.ecObj.xAxis.data=this.COMMONFUN.getChartData(parseData)[0];
                  this.$parent.ecObj.series.data=this.COMMONFUN.getChartData(parseData)[1];
              }
             /* if(key == 3){
                this.$parent.ecObj.yAxis.data = this.COMMONFUN.getChartData(parseData)[0];
                this.$parent.ecObj.series.data = this.COMMONFUN.getChartData(parseData)[1];
              }else{
                this.$parent.ecObj.xAxis.data = this.COMMONFUN.getChartData(parseData)[0];
                this.$parent.ecObj.series.data = this.COMMONFUN.getChartData(parseData)[1];
              }*/
            }else{
              //饼状图
              this.$parent.ecObj.series[0].data = this.COMMONFUN.getChartDataPie(parseData);
            }
        }
        this.$parent.$echarts.init(document.getElementById(domId)).clear();
        this.$parent.ec.setOption(this.$parent.ecObj);
      },
      addDataWindow: function (formName) {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        //this.$refs[formName].resetFields();//清空
      },
      //保存这个小的div的修改
      saveChanges: function () {
        //设定刷新时间
        if(this.reloadTime != undefined){
          try{
            var time = parseInt(this.reloadTime);
            if(time < 30){
              this.$message({
                type: 'error',
                message: '刷新时间不能低于30秒！'
              });
              return;
            }
            localStorage.reloadTime = time;
          }catch(e){
            this.$message({
              type: 'error',
              message: '刷新时间输入有误！'
            });
            return;
          }
        }

        let tempid,tempname,tempconfig,tempstat,tempurl;
        //this.$parent.pageData.pageTitle = this.mainTitle;
        if (this.form.dataKey == '') {
          this.$message({
            type: 'error',
            message: '请选择数据'
          });
          return
        }
        if (this.form.boxTitle == '') {
          this.$message({
            type: 'error',
            message: '请填写图表标题'
          });
          return
        }
        if (this.mainTitle == '') {
          this.$message({
            type: 'error',
            message: '填写页面标题'
          });
          return
        }
        if (this.form.key == '') {
          this.$message({
            type: 'error',
            message: '请选择图表类型'
          });
          return
        }
        //this.$parent.pageData.data[this.$parent.nowDivIndex] = this.form;
        tempid = Date.parse(new Date());
        tempname=this.mainTitle;
        tempconfig=JSON.stringify(this.$parent.domConfig);
        tempurl=this.$parent.$data.tempurl;
        tempstat=5;//新增编辑中页面
        let datas={
          tempid:tempid,
          tempname:tempname,
          tempconfig:tempconfig,
          tempstat:tempstat,
          tempurl:tempurl
        }
        const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        saveTemplateSetting(this.$qs.stringify(datas)).then((response) => {
          setTimeout(() => {
            loading.close();
          }, 1000)
          if(response.data.errno == 0) {
            this.$notify({
              title: '成功',
              message: '添加成功!',
              type: 'success',
              duration: 2000
            })
            this.$store.dispatch('SetReloadRouter', false);//需要刷新路由
            var _this = this;
            this.$store.dispatch('ToggleSideBar')
            setTimeout(function(){
              _this.$routers.replace('/');//刷新页面
            },1000)

          }else{
            this.$notify({
              title: '提示',
              message: response.data.errmsg,
              type: 'error',
              duration: 3000
            })
          }
        })
      },
      //如果是编辑中的模板，那么保存修改
      updataChangesData(){
        //设定刷新时间
        if(this.reloadTime != undefined){
            try{
              var time = parseInt(this.reloadTime);
              if(time < 30){
                this.$message({
                  type: 'error',
                  message: '刷新时间不能低于30秒！'
                });
                return;
              }
              localStorage.reloadTime = time;
            }catch(e){
              this.$message({
                type: 'error',
                message: '刷新时间输入有误！'
              });
              return;
            }
        }


        let tempid = this.$parent.$data.pageId;
        let tempname= this.mainTitle;
        let tempconfig=JSON.stringify(this.$parent.domConfig);
        if (this.form.boxTitle == '') {
          this.$message({
            type: 'error',
            message: '请填写图表标题'
          });
          return
        }
        if (this.mainTitle == '') {
          this.$message({
            type: 'error',
            message: '填写页面标题'
          });
          return
        }
        let datas={
          tempid:tempid,
          tempname:tempname,
          tempconfig:tempconfig,
        }
        const loading = this.$loading({
          lock: true,
          text: '提交中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        updataTemSetting(this.$qs.stringify(datas)).then(response => {
          setTimeout(() => {
            loading.close();
          }, 1000)
          if(response.data.errno == 0) {
            this.$notify({
              title: '成功',
              message: '修改成功!',
              type: 'success',
              duration: 2000
            })
            this.$store.dispatch('SetReloadRouter', false);//需要刷新路由
            var _this = this;
            this.$store.dispatch('ToggleSideBar')
            setTimeout(function(){
              _this.$routers.replace('/');//刷新页面
            },1000)
          }else{
            this.$notify({
              title: '提示',
              message: response.data.errmsg,
              type: 'error',
              duration: 3000
            })
          }

        })
      },
      //保存添加数据源
      submitSourData(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let datatype = this.dataForm.datatype;
            if(datatype.length > 0){
              this.dataForm.datatype = JSON.stringify(datatype);
            }
            addSourseData(this.$qs.stringify(this.dataForm)).then((response) => {
              this.dialogFormVisible = false
              if(response.data.errno == 0) {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success',
                  duration: 2000
                })
                this.$parent.allData.push(this.dataForm);
                //刷新数据源列表 TODO

              }else{
                this.$notify({
                  title: '提示',
                  message: response.data.errmsg,
                  type: 'error',
                  duration: 3000
                })
              }
            })
          }
        })
      },
      //修改数据源
      editSourData(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            let datatype = this.dataForm.datatype;
            if(datatype.length > 0){
              this.dataForm.datatype = JSON.stringify(datatype);
            }
            this.dataForm.crdt = undefined,
            editSourData(this.$qs.stringify(this.dataForm)).then((response) => {
              this.dialogFormVisible = false
              if(response.data.errno == 0) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000
                })
                //刷TODO

              }else{
                this.$notify({
                  title: '提示',
                  message: response.data.errmsg,
                  type: 'error',
                  duration: 3000
                })
              }
            })
          }
        })
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();//清空
      },
      getTempleteAll(){
        getSourDataAll().then((response) => {
          if(response.data.errno == 0) {
            var options = [];
            for(var i=0;i<response.data.data.length;i++){
              var tree = {};
              tree.label = response.data.data[i].appkey;
              tree.value = response.data.data[i].appkey;
              options.push(tree);
            }
            this.options = options;
          }
        })
      },
      //删除数据源
      handleDelect(row){
          var params = {
            "datakey":row.datakey
          }
          this.$confirm('看板中可能有模块依赖此数据源，删除将影响使用，您确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            delSourData(this.$qs.stringify(params)).then(response => {
              if(response.data.errno == 0) {
                this.$notify({
                  title: '提示',
                  message: '删除成功！',
                  type: 'success',
                  duration: 2000
                })
                const index = this.$parent.allData.indexOf(row)
                this.$parent.allData.splice(index, 1)
              }else{
                this.$notify({
                  title: '提示',
                  message: response.data.errmsg,
                  type: 'error',
                  duration: 3000
                })
              }
            })
          })
      },
      //编辑修改数据源
      handleEdit(row){
          this.$confirm('看板中可能有模块依赖此数据源，修改可能影响使用，您确定要修改此项吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.dialogStatus = 'update';
              this.dialogFormVisible = true;

              if(typeof row.datatype == "number"){
                row.datatype = '["'+row.datatype+'"]';
              };
              if(typeof row.datatype == "string"){
                row.datatype = JSON.parse(row.datatype);
              }
              this.dataForm = row;
          })
      },
      //限制输入数字
      changeCode() {
        this.$nextTick(() => {
          if(this.reloadTime !== undefined){
            this.reloadTime = this.reloadTime.replace(/[^\d]/g,'');
            if(this.reloadTime == undefined || this.reloadTime == ""){
              this.$message({
                type: 'error',
                message: '请输入数字！'
              });
            }
          }
        })
      },
      //切换
      chooseBase(){
        this.sourSetting = false;
      },
      //
      chooseSource(){
        this.sourSetting = true;
      }
    }
  }
</script>
<style>
  /*表单样式############### start*/
  .operaform{
    color: white;
    font-size: 12px;
    background: #1c1f25;
    padding: 0 1rem;
  }
  .operaform .el-input__inner{
    height: 1.4rem;
    font-size: 0.85rem ;
    border-radius: 0;
    border: 1px solid #2e323b;
    background: #0e1013;
    color: #a3a3a3;
    padding-left: 0.4rem;
  }
  .operaform .el-input__icon{
    line-height: 1.4rem;
  }
  .operaform .el-form-item__label{
    height: 1.4rem;
    line-height: 1.4rem;
    color: white;
    width: 5.5rem !important;
    padding-right: 1rem;
  }
  .operaform .el-form-item__content{
    height: 1.4rem;
    line-height: 1.4rem;
  }
  .operaform  .el-form-item{
    margin-top: 1rem;
  }
  .operaform .el-scrollbar .el-select-dropdown__item{
    height: 1.4rem;
    font-size: 0.85rem !important;
    line-height: 1.4rem;
  }
  .operaform .el-scrollbar .el-select-dropdown__item span{
    color: black;
    font-size: 0.85rem !important;
  }
  .operaform .el-form-item{
    margin-bottom: 0;
  }
  .componentsBox{
    margin-top: 1rem;
  }
  .componentsContent{
    width: 100%;
    height:20.5rem ;
    border: 2px solid #2e323b;
    background:#0e1013;
    overflow:auto;
  }
  .componentsTitle{
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.85rem;
    color: #ddd;
    text-align: left;
    padding-left: 0.5rem;
  }
  .imgBox{
    font-size: 0;
    margin: 5px;
  }
  .imgBox img{
    width: 100%;
    height: auto;
    cursor: pointer;
  }
  .imgBox .checked{
    border: 1px solid #3681ab;
    background: #0db3fd4f;
  }
  .btnDiv{
    margin-top:1rem;
    text-align: center;
  }
  .btnDiv>div{
    width: 6rem;
    height: 2.1rem;
    display: inline-block;
    line-height: 2.1rem;
    text-align: center;
    background: url(/static/image/choicBtn.png) no-repeat center;
    background-size: 100% 100%;
    color: #3caff2;
    font-size: .95rem;
    cursor: pointer;
  }

  .operaform .el-message-box__header span,.el-message-box__content textarea{
    color: black;
  }
  .el-table th, .el-table tr{background: #1c1f25 !important;}
  .el-table td, .el-table th.is-leaf{ border-bottom: 1px solid #27343e !important;}
  .el-table .cell{color:#ddd !important;}
  .el-table td, .el-table th{padding: 8px 0 !important;}
  .el-table::before{height: 0px !important;}
  .el-table__row .cell{color:#999 !important;}

  .rightSetting{background:rgb(10, 17, 50)}
  .rightSetting .title{width:100%;height:2.7rem;line-height: 2.7rem;text-align: center;font-size: 1.1rem;color: #3caff2;background: #27343e;display: flex}
  .rightSetting .content{height: 100%; background: #1c1f25;  margin: 0;overflow: hidden;padding-bottom: 2.7rem;  /*border: 1px solid #0db3fd;*/}
  .rightSetting .title .til{width:50%;cursor: pointer;}
  .rightSetting .title .active{background: #1c1f25;border-top:2px solid #0db3fd;cursor: default;}
</style>
