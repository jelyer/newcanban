<template>
    <div class="form">
      <el-form class="operaform" ref="form" :model="form" label-width="80px">
        <el-form-item label="主标题">
          <el-input v-model="mainTitle" id="mainTitle"  v-on:input="changMainTitle()"></el-input>
        </el-form-item>
        <el-form-item label="图表标题">
          <el-input v-model="form.boxTitle" id="chartTitle"  v-on:input="changTitle()"></el-input>
        </el-form-item>
        <el-form-item label="选择数据">
          <el-select v-model="form.dataKey" placeholder="请选择要绑定的数据"  @change="selected()" id="dataKey">
            <el-option :value="item.value" v-for="(item,i) in this.$parent.allData" :label="item.label" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <div class="componentsBox">
          <div class="componentsTitle" >可选图表</div>
          <div class="componentsContent">
            <el-row>
              <el-col :span="8" v-for="(item,i) in ableChartsData" :key="i"><div class="imgBox"  v-on:click="selectionChart(item.key)"><img :src="'/static/image/'+(item.url)+'.png'" alt=""></div></el-col>
            </el-row>
          </div>

        </div>
        <div class="btnDiv">
          <div class="" id="subBtn" @click="saveChanges()">保存看板</div>
          <div class="addDataBtn" id="addDataBtn"  @click="addDataWindow()">新增数据</div>
        </div>
      </el-form>

      <el-dialog modal="false" v-dialogDrag title="添加数据源" width="500px" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="dataForm" status-icon label-position="left" label-width="100px" style='margin:0 30px;'>
          <el-form-item label="数据编码" prop="datakey">
            <el-input clearable size="mini" v-model="dataForm.datakey"></el-input>
          </el-form-item>
          <el-form-item label="数据名称" prop="dataname">
            <el-input clearable size="mini" v-model="dataForm.dataname"></el-input>
          </el-form-item>
          <el-form-item label="图表类型" prop="datatype">
            <el-select clearable style="width:300px"  multiple size="mini" v-model="dataForm.datatype" placeholder="请选择">
              <el-option label="横向柱状图" value="0"></el-option>
              <el-option label="纵向柱状图" value="1"></el-option>
              <el-option label="折线图" value="2"></el-option>
              <el-option label="饼状图" value="3"></el-option>
              <el-option label="环形图" value="4"></el-option>
              <el-option label="数据表" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据配置" prop="rema">
            <el-input clearable size="mini" v-model="dataForm.rema" type="textarea" :rows="5"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini"  @click="dialogFormVisible = false">取消</el-button>
          <el-button size="mini"   @click="resetForm('dataForm')">重置</el-button>
          <el-button size="mini"  type="primary" @click="submitSourData">保存</el-button>
        </div>
      </el-dialog>
    </div>

</template>
<script>
  import {addSourseData} from '@/api/chartSetting'
  export default {
    name: 'OperationForm',
    data() {
      return {
        mainTitle: '',
        ableChartsData: this.GLOBAL.fixedChart,//所有可用图表
        form: {
          boxTitle: '',//表标题
          key: '',//图表类型
          dataKey: '',//图表数据
        },
        nowEditData:[],//现在编辑地div的数据
        dialogFormVisible: false,
        dataForm:{
          datakey:undefined,
          dataname:undefined,
          datatype:undefined,
          rema:undefined
        },
        rules: {
          datakey: [{ required: true, message: '请输入编码', trigger: 'blur' }],
          dataname: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          datatype: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          rema: [{ required: true, message: '请输入数据源', trigger: 'blur' }],
        },
      }
    },
    mounted(){
      this.getTempleteAll();
    },
    methods: {
      //主标题联动改变
      changMainTitle: function () {
        this.$parent.mainTitle = this.mainTitle;
      },
      //编辑的小div标题的联动改变
      changTitle: function () {
        let theWrapBox = document.getElementById('mainBox').getElementsByClassName('active')[0];
        theWrapBox.getElementsByClassName('boxTitle')[0].innerHTML = this.form.boxTitle;
        this.$parent.form.boxTitle = this.form.boxTitle;
      },
      //选择一条后台数据之后发送请求，获取数据，渲染数据
      selected: function () {
        let _this = this
        this.$axios.get('static/json/' + this.form.dataKey + '.json').then(response => {
          let theData = response.data.dataUrl1;
          _this.nowEditData =theData;
          /*if (_this.$parent.nowDivKey != 0) {
            let dataX = [];
            let dataY = [];
            for (var i = 0; i < theData.length; i++) {
              dataX.push(theData[i].dataX);
              dataY.push(theData[i].dataY);
            }
            _this.$parent.echartObjArr[_this.$parent.nowDivIndex].xAxis.data = dataX;
            _this.$parent.echartObjArr[_this.$parent.nowDivIndex].series.data = dataY;
          }else {
            _this.$parent.echartObjArr[_this.$parent.nowDivIndex].series[0].data = this.COMMONFUN.getChartDataPie(_this.nowEditData);
          }

          _this.$parent.$echarts.init(document.getElementById(_this.$parent.nowEditChartId)).clear();
          _this.$parent.echartArr[_this.$parent.nowDivIndex].setOption(_this.$parent.echartObjArr[_this.$parent.nowDivIndex]);
          _this.ableChartsData = response.data.ableCharts*/
        })
      },
      //选中某一图表后及时反映到页面
      selectionChart: function (key) {
        if(this.nowEditData.length<0){
          return ;
        }
        this.form.key = key;
        this.$parent.echartObjArr[this.$parent.nowDivIndex] = this.GLOBAL.allChartObj[key];
        if (key != 0) {
          this.$parent.echartObjArr[this.$parent.nowDivIndex].xAxis.data = this.COMMONFUN.getChartData(this.nowEditData)[0];
          this.$parent.echartObjArr[this.$parent.nowDivIndex].series.data = this.COMMONFUN.getChartData(this.nowEditData)[1];
        } else {
          this.$parent.echartObjArr[this.$parent.nowDivIndex].series[0].data = this.COMMONFUN.getChartDataPie(this.nowEditData);
        }

        this.$parent.$echarts.init(document.getElementById(this.$parent.nowEditChartId)).clear()

        this.$parent.echartArr[this.$parent.nowDivIndex].setOption(this.$parent.echartObjArr[this.$parent.nowDivIndex]);
      },
      addDataWindow: function () {
        /*this.$alert('<div><textarea style="min-width: 300px;min-height: 100px" ></textarea></textarea></div>', '添加数据', {
          dangerouslyUseHTMLString: true
        });*/
        this.dialogFormVisible = true;
      },
      //保存这个小的div的修改
      saveChanges: function () {
        this.$parent.pageData.pageTitle = this.mainTitle;
        if (this.form.dataKey == '') {
          alert('请选择数据');
          return
        }
        if (this.form.boxTitle == '') {
          alert('请填写图表标题');
          return
        }
        if (this.form.key == '') {
          alert('请选择图表类型');
          return
        }
        if (this.mainTitle == '') {
          alert('填写页面标题');
          return
        }
        this.$parent.pageData.data[this.$parent.nowDivIndex] = this.form;
        if (this.$parent.pageData.isModle) {
          this.$parent.pageData.isModle = false;
          //新增页面
          console.log(1)
        } else {
          this.$parent.pageData.isModle = false;
          //不新增，只是修改页面
          console.log(2)
        }
        console.log(this.form)
      },
      //保存添加数据源
      submitSourData(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
           // this.dataForm.rema = ""
            let datatype = this.dataForm.datatype;
            if(datatype.length > 0){
               let datastr = "";
               for(let d in datatype){
                 if(d == datatype.length -1){
                   datastr = datastr + datatype[d];
                 }else{
                   datastr = datastr + datatype[d] + ","
                 }
               }
              this.dataForm.datatype = datastr;
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
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      }
    }
  }
</script>
<style>
  /*表单样式############### start*/
  .operaform{
    color: white;
    font-size: 12px;
    background: black;
    padding: 0 1rem;
  }
  .operaform .el-input__inner{
    height: 1.4rem;
    font-size: 0.85rem ;
    border-radius: 0;
    border: 1px solid #2e323b;
    background: #000;
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
    height:26rem ;
    border: 2px solid #2e323b;
  }
  .componentsTitle{
    height: 1.8rem;
    line-height: 1.8rem;
    font-size: 0.85rem;
    color: white;
    text-align: left;
    padding-left: 0.5rem;
  }
  .imgBox{
    font-size: 0;
  }
  .imgBox img{
    width: 100%;
    height: auto;
    cursor: pointer;
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
</style>
