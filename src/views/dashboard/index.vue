<template>
  <div class="box1">
    <div id="mainBox" class="mainBox">
      <div class="bigTitle">
        <h1 class="bigTitleName" v-text="mainTitle"/>
        <p>2019-04-11 14:16:00</p>
      </div>
      <div class="mainContent">
        <div class="firstBox">
          <div class="firstLeft">
            <div id="firstLeftTop" class="firstLeftTop" index="3" @click="toEditDiv('firstLeftTop')">
              <p class="boxTitle">仓库预警报表</p>
              <div class="boxContent">
                <div class="boxContent-div">
                  <el-row>
                    <el-col :span="6">
                      <p><span/>商品过期数量</p>
                      <div><span>35</span>个</div>
                    </el-col>
                    <el-col :span="6">
                      <p><span/>订单超时数量</p>
                      <div><span>35</span>个</div>
                    </el-col>
                    <el-col :span="6">
                      <p><span/>安全库存预警数量</p>
                      <div><span>35</span>个</div>
                    </el-col>
                    <el-col :span="6">
                      <p><span/>禁售库存数量</p>
                      <div><span>35</span>个</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="icoTL"/>
                <div class="icoTR"/>
                <div class="icoBL"/>
                <div class="icoBR"/>
              </div>
            </div>
            <div class="firstLeftBot">
              <div id="firstLeftBot1" class="firstLeftBot1" index="4" @click="toEditDiv('firstLeftBot1')">
                <p class="boxTitle">到货预约信息</p>
                <div class="boxContent">
                  <div class="boxContent-div">
                    <div class="Tb-box">
                      <div class="Tb-title">
                        <el-row>
                          <el-col :span="14">
                            商品名称
                          </el-col>
                          <el-col :span="4">
                            单数
                          </el-col>
                          <el-col :span="6">
                            件数
                          </el-col>
                        </el-row>
                      </div>
                      <div class="Tb-content">
                        <el-row>
                          <el-col :span="14" title="百草味-每日坚果每日坚果每日坚果">
                            百草味-每日坚果每日坚果每日坚果
                          </el-col>
                          <el-col :span="4">
                            1234
                          </el-col>
                          <el-col :span="6">
                            56789
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="14" title="百草味-每日坚果">
                            百草味-每日坚果
                          </el-col>
                          <el-col :span="4">
                            1234
                          </el-col>
                          <el-col :span="6">
                            56789
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="14" title="百草味-肉松饼">
                            百草味-肉松饼
                          </el-col>
                          <el-col :span="4">
                            1234
                          </el-col>
                          <el-col :span="6">
                            56789
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="14" title="百草味-芒果干">
                            百草味-芒果干
                          </el-col>
                          <el-col :span="4">
                            1234
                          </el-col>
                          <el-col :span="6">
                            56789
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                  <div class="icoTL"/>
                  <div class="icoTR"/>
                  <div class="icoBL"/>
                  <div class="icoBR"/>
                </div>
              </div>
              <div id="firstLeftBot2" class="firstLeftBot2" index="5" @click="toEditDiv('firstLeftBot2')">
                <p class="boxTitle">快递订单完成情况</p>
                <div class="boxContent">
                  <div class="boxContent-div">
                    <div class="Tb-box">
                      <div class="Tb-title">
                        <el-row>
                          <el-col :span="10">
                            快递公司
                          </el-col>
                          <el-col :span="5">
                            总单量
                          </el-col>
                          <el-col :span="5">
                            完成量
                          </el-col>
                          <el-col :span="4">
                            占比
                          </el-col>
                        </el-row>
                      </div>
                      <div class="Tb-content">
                        <el-row>
                          <el-col :span="10" title="百草味-每日坚果每日坚果每日坚果">
                            百草味-每日坚果每日坚果每日坚果
                          </el-col>
                          <el-col :span="5">
                            42537
                          </el-col>
                          <el-col :span="5">
                            1344
                          </el-col>
                          <el-col :span="4">
                            36%
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10" title="百草味-每日坚果">
                            百草味-每日坚果
                          </el-col>
                          <el-col :span="5">
                            51234
                          </el-col>
                          <el-col :span="5">
                            2345
                          </el-col>
                          <el-col :span="4">
                            42%
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10" title="百草味-肉松饼">
                            百草味-肉松饼
                          </el-col>
                          <el-col :span="5">
                            56789
                          </el-col>
                          <el-col :span="5">
                            1234
                          </el-col>
                          <el-col :span="4">
                            40%
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="10" title="百草味-芒果干">
                            百草味-芒果干
                          </el-col>
                          <el-col :span="5">
                            56789
                          </el-col>
                          <el-col :span="5">
                            1234
                          </el-col>
                          <el-col :span="4">
                            50%
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>
                  <div class="icoTL"/>
                  <div class="icoTR"/>
                  <div class="icoBL"/>
                  <div class="icoBR"/>
                </div>
              </div>
            </div>
          </div>
          <div id="firstRight" class="firstRight" index="0" @click="toEditDiv('firstRight')">
            <p class="boxTitle">订单进展情况</p>
            <div class="boxContent" >
              <div id="firstRightChart" class="boxContent-div"/>
              <div class="icoTL"/>
              <div class="icoTR"/>
              <div class="icoBL"/>
              <div class="icoBR"/>
            </div>
          </div>
        </div>
        <div class="secondBox">
          <div id="secondLeft" class="secondLeft" index="2" @click="toEditDiv('secondLeft')">
            <p class="boxTitle">到货预约信息</p>
            <div class="boxContent">
              <div id="secondLeftChart" class="boxContent-div"/>
              <div class="icoTL"/>
              <div class="icoTR"/>
              <div class="icoBL"/>
              <div class="icoBR"/>
            </div>
          </div>
          <div id="secondRight" class="secondRight" index="1" @click="toEditDiv('secondRight')">
            <p class="boxTitle">快递订单完成情况</p>
            <div class="boxContent">
              <div id="secondRightChart" class="boxContent-div"/>
              <div class="icoTL"/>
              <div class="icoTR"/>
              <div class="icoBL"/>
              <div class="icoBR"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightSetting">
      <div class="title">属性设置</div>
      <div class="content">
        <operation-form ref="operation_form"/>
      </div>

    </div>
  </div>
</template>

<script>
import operationForm from '@/components/operationForm/operationForm';
export default {
  name: 'Dashboard',
  components: {
    operationForm
  },
  data() {
    return {
      echartArr: [],
      echartObjArr: [],
      // isFirst:true,
      thePageId: '', // 页面传参的id
      mainTitle: '深圳仓订单进展统计',
      allData: [],
      nowDivIndex: ' ', // 要编辑的div的编号
      nowDivKey: '',
      pageData: '', // 渲染页面的数据
      form: {
        boxTitle: '', // 表标题
        key: '', // 图表类型
        dataKey: '' // 图表数据
      },
      nowEditDivId: '',
      nowEditChartId: ''

    };
  },

  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    }
  },
  created() {
    this.thePageId = this.COMMONFUN.GetRequest().pageId;
    if (this.thePageId == undefined) {
      this.thePageId = 'p1';
    }
  },
  mounted() {
    this.$axios.get('static/json/box1-' + this.thePageId + '.json').then((response) => {
      this.pageData = response.data;
      this.drawLine(response);
    });
  },
  methods: {
    // 获取页面数据，以及渲染数据
    drawLine: function(response) {
      this.mainTitle = response.data.pageTitle;
      // document.getElementById('mainTitle').value=this.mainTitle;
      this.$refs.operation_form.mainTitle = this.mainTitle;
      this.echartArr[0] = this.$echarts.init(document.getElementById('firstRightChart'));
      this.echartArr[1] = this.$echarts.init(document.getElementById('secondRightChart'));
      this.echartArr[2] = this.$echarts.init(document.getElementById('secondLeftChart'));
      this.echartObjArr[0] = this.GLOBAL.allChartObj[response.data.data[0].key];
      this.echartObjArr[1] = this.GLOBAL.allChartObj[response.data.data[1].key];
      this.echartObjArr[2] = this.GLOBAL.allChartObj[response.data.data[2].key];
      document.getElementById('firstRight').getElementsByTagName('p')[0].innerHTML = response.data.data[0].boxTitle;
      document.getElementById('secondRight').getElementsByTagName('p')[0].innerHTML = response.data.data[1].boxTitle;
      document.getElementById('secondLeft').getElementsByTagName('p')[0].innerHTML = response.data.data[2].boxTitle;

      this.$axios.get('static/json/' + response.data.data[0].dataKey + '.json').then((res) => {
        if (response.data.data[0].key != 0) {
          this.echartObjArr[0].xAxis.data = this.COMMONFUN.getChartData(res.data.dataKey)[0];
          this.echartObjArr[0].series.data = this.COMMONFUN.getChartData(res.data.dataKey)[1];
          if (response.data.data[0].key == 2) {
            this.echartObjArr[0].series.itemStyle.normal.color = new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#44cbf5' },
                { offset: 1, color: '#2669c5' }
              ]
            );
          }
        } else {
          this.echartObjArr[0].series[0].data = this.COMMONFUN.getChartDataPie(res.data.dataKey);
        }
        this.echartArr[0].setOption(this.echartObjArr[0]);
      });
      this.$axios.get('static/json/' + response.data.data[1].dataKey + '.json').then((res) => {
        if (response.data.data[1].key != 0) {
          this.echartObjArr[1].xAxis.data = this.COMMONFUN.getChartData(res.data.dataKey)[0];
          this.echartObjArr[1].series.data = this.COMMONFUN.getChartData(res.data.dataKey)[1];
          if (response.data.data[1].key == 2) {
            this.echartObjArr[1].series.itemStyle.normal.color = new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#44cbf5' },
                { offset: 1, color: '#2669c5' }
              ]
            );
          }
        } else {
          this.echartObjArr[1].series[0].data = this.COMMONFUN.getChartDataPie(res.data.dataKey);
        }
        this.echartArr[1].setOption(this.echartObjArr[1]);
      });
      this.$axios.get('static/json/' + response.data.data[2].dataKey + '.json').then((res) => {
        if (response.data.data[2].key != 0) {
          this.echartObjArr[2].xAxis.data = this.COMMONFUN.getChartData(res.data.dataKey)[0];
          this.echartObjArr[2].series.data = this.COMMONFUN.getChartData(res.data.dataKey)[1];
          if (response.data.data[2].key == 2) {
            this.echartObjArr[2].series.itemStyle.normal.color = new this.$echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: '#44cbf5' },
                { offset: 1, color: '#2669c5' }
              ]
            );
          }
        } else {
          this.echartObjArr[2].series[0].data = this.COMMONFUN.getChartDataPie(res.data.dataKey);
        }
        this.echartArr[2].setOption(this.echartObjArr[2]);
      });
    },
    // 点击需要编辑的div后
    toEditDiv: function(eleId) {
      var theStatus = document.getElementsByClassName('app-wrapper')[0];
      // if(!this.sidebar.opened){
      if (theStatus.getAttribute('class').indexOf('openSidebar') == -1) {
        var nowDivBox = document.getElementById(eleId);
        // let echartBox=nowDivBox.getElementsByClassName("boxContent")[0];
        if (nowDivBox.getAttribute('class').indexOf('active') == -1) {
          this.$refs.operation_form.form.boxTitle = nowDivBox.getElementsByClassName('boxTitle')[0].innerHTML;
          document.getElementById('dataKey').value = '';
          this.allData = null;
          this.nowDivIndex = nowDivBox.getAttribute('index') * 1;
          this.nowDivKey = this.pageData.data[this.nowDivIndex].key;
          if (document.getElementById('mainBox').getElementsByClassName('active').length > 0) { document.getElementById('mainBox').getElementsByClassName('active')[0].classList.remove('active'); }
          nowDivBox.classList.add('active');
          this.nowEditDivId = eleId;
          this.nowEditChartId = nowDivBox.getElementsByClassName('boxContent-div')[0].id;
          this.getAllDatas();
        }
      }
    },
    // 获取所有的可取后台数据列表
    getAllDatas: function() {
      this.$axios.get('static/json/allDatas.json').then(response => {
        this.allData = response.data.allDatas;
      });
    }
  }

  /* props: {
        msg: String
    }*/
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .box1{
    /*min-height: calc(100vh - 84px);*/
    position: relative;
    border: 2px solid #0db3fd;
    color: white;
    height: 100%;
    /*overflow: hidden;*/

  }
  .mainBox{
    width: 100%;
    /*height: calc(100vh - 84px);*/
    transition: all 0.5s;
    padding: 0 1%;
    overflow: hidden;
    background: url("/static/images/pageBg.png") no-repeat center;
    background-size: 100% 100%;
    height: 100%;
  }
  .bigTitle{
    height: 12.5%;
    color: #fff;
    background: url("/static/images/titleBg.png") no-repeat center;
    background-size: 100% 100%;
    overflow: hidden;
    text-align: center;
  }
  .bigTitle h1{
    font-size: 1.7rem;
    font-weight: normal;
    margin-top: 1.2%;
    margin-bottom: 0.5%;
  }
  .bigTitle p{
    font-size: 0.7rem;
    margin: 0;
  }
  .mainContent{
    height: 87.5%;
    margin-top: -2%;
  }
  .firstBox{
    height: 56%;
    width: 100%;
  }
  .firstBox>div{
    float: left;
  }
  .firstLeft{
    width: 66%;
    margin-right: 1.5%;
    height: 100%;
  }
  .firstLeftTop{
    height: 44%;
    width: 100%;
    text-align: left;
  }
  .boxTitle{
    height: 25%;
    color: #3190cb;
    font-size: 1vw;
    /*padding-top: 1%;*/
    text-align: left;
    line-height: 2.4rem;
    font-weight: 400;
    opacity: .9;

  }
  .boxContent{
    height: 75%;
    width: 100%;
    border: 1px solid #0d1743;
    display: block;
    position: relative;
  }
  .boxContent-div{
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .active .boxContent{
    border:2px solid #0db3fd;
    background: rgba(13,179,253,0.2);
  }
  .active .boxContent>div{
    border:none;
  }
  .icoTL{
    position: absolute;
    left:-1px;
    top:-1px;
    width: 1rem;
    height: 1rem;
    border-left:2px solid #0db3fd ;
    border-top:2px solid #0db3fd ;
  }
  .icoTR{
    position: absolute;
    right:-1px;
    top:-1px;
    width: 1rem;
    height: 1rem;
    border-right:2px solid #0db3fd ;
    border-top:2px solid #0db3fd ;
  }
  .icoBL{
    position: absolute;
    left:-1px;
    bottom:-1px;
    width: 1rem;
    height: 1rem;
    border-left:2px solid #0db3fd ;
    border-bottom:2px solid #0db3fd ;
  }
  .icoBR{
    position: absolute;
    right:-1px;
    bottom:-1px;
    width: 1rem;
    height: 1rem;
    border-right:2px solid #0db3fd ;
    border-bottom:2px solid #0db3fd ;
  }
  .firstLeftBot{
    height: 56%;
  }
  .firstLeftBot1{
    width: 40%;
    height: 100%;
    float: left;
    margin-right: 2%;
  }
  .firstLeftBot2{
    width: 58%;
    height: 100%;
    float: left;
  }
  .firstLeftBot .boxTitle{
    height:24% ;
  }
  .firstLeftBot .boxContent{
    height:75% ;
  }
  .firstRight{
    width: 32.5%;
    height: 100%;
  }
  .firstRight .boxTitle{
    height:10.7% ;
  }
  .firstRight .boxContent{
    height:89.2% ;
  }
  .secondBox{
    height:44% ;
  }
  .secondLeft{
    width: 26.4%;
    height: 100%;
    float: left;
    margin-right: 1.5%;
  }
  .secondRight{
    width: 72.1%;
    height: 100%;
    float: left;
  }
  .secondBox .boxTitle{
    height:14% ;
  }
  .secondBox .boxContent{
    height:85% ;
  }

  /*表单样式############### start*/
  #app .editDiv{
    position: absolute;
    right: -19.5rem;
    top: 0;
    height: 100%;
    width: 18rem;
    transition: all 0.5s;
    background: black;
    color: white;
  }
  .editDiv form{
    background: black;
    padding: 0 1rem;
  }
  .editDiv h3{
    font-weight: normal;
    height:3.2rem ;
    background:#2c333b ;
    color: #3aaff4;
    line-height:3.2rem  ;
    font-size:1.2rem ;
  }
  .editDiv .el-input__inner{
    height: 1.4rem;
    font-size: 0.85rem ;
    border-radius: 0;
    border: 1px solid #2e323b;
    background: #000;
    color: #a3a3a3;
    padding-left: 0.4rem;
  }
  .editDiv .el-input__icon{
    line-height: 1.4rem;
  }
  .editDiv .el-form-item__label{
    height: 1.4rem;
    line-height: 1.4rem;
    color: white;
    width: 5.5rem !important;
    padding-right: 1rem;
  }
  .editDiv .el-form-item__content{
    height: 1.4rem;
    line-height: 1.4rem;
  }
  .editDiv  .el-form-item{
    margin-top: 1rem;
  }
  .el-scrollbar .el-select-dropdown__item{
    height: 1.4rem;
    font-size: 0.85rem !important;
    line-height: 1.4rem;
  }
  .el-scrollbar .el-select-dropdown__item span{
    color: black;
    font-size: 0.85rem !important;
  }
  .el-form-item{
    margin-bottom: 0;
  }
  .componentsBox{
    margin-top: 1rem;
  }
  .componentsContent{
    width: 100%;
    height:20.5rem ;
    border: 2px solid #2e323b;
    overflow: auto;
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
  }
  .subBtn{
    display: inline-block;
    padding: 0.1rem 2rem;
    border: 1px solid ;
    margin-right: 1rem;
    cursor: pointer;
  }
  .cancelBtn{
    display: inline-block;
    border: 1px solid ;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
  }
  .rightSetting{background:rgb(10, 17, 50)}
  .rightSetting .title{width:100%;height:60px;line-height: 60px;text-align: center;font-size: 16px;color: #209ff2;}
  .rightSetting .content{height: calc(100vh - 84px); background: black;  margin: 0 5px;overflow: hidden;  /*border: 1px solid #0db3fd;*/}

  /*数据样式##########################starrt*/
  .firstLeftTop .el-row{
    height: 100%;
    padding-top: 1.3rem;
  }
  .el-row>div{
    height: 100%;
    text-align: center;
  }
  .el-row .el-col p{
    font-size: 1.2rem;
  }
  .el-row .el-col p span{
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    display: inline-block;
    margin:0 0.5rem;
    vertical-align: middle;
  }
  .el-row .el-col:nth-child(1) p span{
    background-color: #ffb522;
  }
  .el-row .el-col:nth-child(2) p span{
    background-color: #44b9ef;
  }
  .el-row .el-col:nth-child(3) p span{
    background-color: #61e263;
  }
  .el-row .el-col:nth-child(4) p span{
    background-color: #fd3126;
  }
  .el-row .el-col div{
    margin-top: 0.5rem;
  }
  .el-row .el-col div span{
    font-size: 2rem;
    margin:0 0.5rem;
  }

  /*列表样式##########################starrt*/
  .Tb-box{
    width: 100%;
    height: 100%;
    padding-left: 1.3rem;
    overflow: hidden;
  }
  .Tb-box .el-row .el-col{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.8rem;
  }
  .Tb-title{
    height: 20%;
    color: #3caff2;
  }
  .Tb-title div{
    height: 100%;

  }
  .Tb-box .el-row .el-col:nth-child(1){
    text-align: left;
  }
  .Tb-content{
    height: 75%;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar{
    display: none;
  }
</style>
