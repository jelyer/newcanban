<template>
  <div class="box1">
    <img class="pagebgsty" src="@/assets/pageBg2.png" alt="">
    <div class="mainBox" id="mainBox" style="z-index:100;position:absolute">
      <div class="bigTitle">
        <img class="titlebgstr" src="@/assets/titleBg2.png" alt="">
        <h1 class="bigTitleName">{{mainTitle}}  <i v-show="dataloading" style="position:absolute;right:0" class="el-icon-loading"></i></h1>
        <p>{{date}}</p>
      </div>
      <!--firstLeftTop-->
      <div class="mainContent">
        <div class="firstBox">
          <div class="firstLeft">
            <div :class="[{active: isActive == 0 },'firstLeftTop']" @click="toEditDiv(domConfig[0])">
              <p class="boxTitle">{{domConfig[0].boxTitle}}</p>
              <div class="boxContent">
                <div class="boxContent-div">
                  <table-one v-if="domConfig[0].key == 'data'" :domConfig="domConfig[0].data"></table-one>
                  <table-two v-if="domConfig[0].key == 'list'" :domConfig="domConfig[0].data"></table-two>
                  <div :class="[{isshow: domConfig[0].key == 'data' || domConfig[0].key == 'list' },'chart']" :id="domConfig[0].id"></div>
                </div>
                <div class="icoTL"></div>
                <div class="icoTR"></div>
                <div class="icoBL"></div>
                <div class="icoBR"></div>
              </div>
            </div>
            <div class="firstLeftBot">
              <div :class="[{active: isActive == 1 },'firstLeftBot1']"  @click="toEditDiv(domConfig[1])">
                <p class="boxTitle">{{domConfig[1].boxTitle}}</p>
                <div class="boxContent">
                  <div class="boxContent-div">
                    <table-one v-if="domConfig[1].key == 'data'" :domConfig="domConfig[1].data"></table-one>
                    <table-two v-if="domConfig[1].key == 'list'" :domConfig="domConfig[1].data"></table-two>
                    <div :class="[{isshow: domConfig[1].key == 'data' || domConfig[1].key == 'list' },'chart']" :id="domConfig[1].id"></div>
                  </div>
                  <div class="icoTL"></div>
                  <div class="icoTR"></div>
                  <div class="icoBL"></div>
                  <div class="icoBR"></div>
                </div>
              </div>
              <div :class="[{active: isActive == 2 },'firstLeftBot2']" @click="toEditDiv(domConfig[2])">
                <p class="boxTitle">{{domConfig[2].boxTitle}}</p>
                <div class="boxContent">
                  <div class="boxContent-div">
                    <table-one v-if="domConfig[2].key == 'data'" :domConfig="domConfig[2].data"></table-one>
                    <table-two v-if="domConfig[2].key == 'list'" :domConfig="domConfig[2].data"></table-two>
                    <div :class="[{isshow: domConfig[2].key == 'data' || domConfig[2].key == 'list' },'chart']" :id="domConfig[2].id"></div>
                  </div>
                  <div class="icoTL"></div>
                  <div class="icoTR"></div>
                  <div class="icoBL"></div>
                  <div class="icoBR"></div>
                </div>
              </div>
            </div>
          </div>
          <div :class="[{active: isActive == 3 },'firstRight']"  @click="toEditDiv(domConfig[3])">
            <p class="boxTitle">{{domConfig[3].boxTitle}}</p>
            <div class="boxContent" >
              <div class="boxContent-div">
                <table-one v-if="domConfig[3].key == 'data'" :domConfig="domConfig[3].data"></table-one>
                <table-two v-if="domConfig[3].key == 'list'" :domConfig="domConfig[3].data"></table-two>
                <div :class="[{isshow: domConfig[3].key == 'data' || domConfig[3].key == 'list' },'chart']" :id="domConfig[3].id"></div>
              </div>
              <div class="icoTL"></div>
              <div class="icoTR"></div>
              <div class="icoBL"></div>
              <div class="icoBR"></div>
            </div>
          </div>
        </div>
        <div class="secondBox">
          <div :class="[{active: isActive == 4 },'secondLeft']"  @click="toEditDiv(domConfig[4])">
            <p class="boxTitle">{{domConfig[4].boxTitle}}</p>
            <div class="boxContent">
              <div class="boxContent-div">
                <table-one v-if="domConfig[4].key == 'data'" :domConfig="domConfig[4].data"></table-one>
                <table-two v-if="domConfig[4].key == 'list'" :domConfig="domConfig[4].data"></table-two>
                <div :class="[{isshow: domConfig[4].key == 'data' || domConfig[4].key == 'list' },'chart']" :id="domConfig[4].id"></div>
              </div>
              <div class="icoTL"></div>
              <div class="icoTR"></div>
              <div class="icoBL"></div>
              <div class="icoBR"></div>
            </div>
          </div>
          <div :class="[{active: isActive == 5 },'secondRight']"  @click="toEditDiv(domConfig[5])">
            <p class="boxTitle">{{domConfig[5].boxTitle}}</p>
            <div class="boxContent">
              <div class="boxContent-div">
                <table-one v-if="domConfig[5].key == 'data'" :domConfig="domConfig[5].data"></table-one>
                <table-two v-if="domConfig[5].key == 'list'" :domConfig="domConfig[5].data"></table-two>
                <div :class="[{isshow: domConfig[5].key == 'data' || domConfig[5].key == 'list' },'chart']" :id="domConfig[5].id"></div>
              </div>
              <div class="icoTL"></div>
              <div class="icoTR"></div>
              <div class="icoBL"></div>
              <div class="icoBR"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--右侧设置-->
    <operation-form :mainTitle="mainTitle" ref="operation_form"></operation-form>
  </div>
</template>

<script>
  import {mixinsMain} from '@/mixins/main' //基础调用
  import operationForm from "@/components/operationForm/operationForm";
  import {getTempById,getDataByDataKey} from '@/api/chartSetting'
  import tableOne from "@/components/Kanban/table1";
  import tableTwo from "@/components/Kanban/table2";

  export default {
    name: 'temtwo',//系统模板二
    mixins:[mixinsMain],
    inject:['reload'],//注入reload方法
    components: {
      operationForm,
      tableOne,
      tableTwo
    },
    data(){
      return{
        animate: false,//是否滚动
        pageId:undefined,
        isModle:true,//是否是模板页面
        tempurl:'/template2',
        echartArr:[],//ec Dom id
        echartObjArr:[],//缓存ec数据
        eclist:[],//换成ec对象
        ec:undefined,//echart实例化对象
        ecObj:undefined,//ec配置属性
        //isFirst:true,
        isActive:undefined,
        reloadbl:true,//是否可以刷新本页
        mainTitle: '系统模板二',
        nowDivIndex:' ',//要编辑的div的编号
        nowDivKey:'',
        pageData:'',//渲染页面的数据
        dataloading:false,//数据加载loading
        date: undefined,
        timer:undefined,//标题下面的时间定时器
        timereload:undefined,//页面定时刷新数据
        domConfig:[
          {
            id:"firstLeftTop",
            boxTitle:"待完成任务",
            key:'data', //图表类型
            dataKey:null,//
            data:{
              legend:['分拣中','待复核','待装车','未打单','未锁库'],
              data:[
                ["35","334","189","112","545"]
              ]
            }
          },{
            id:"firstLeftBot1",
            boxTitle:"货主库存变动",
            key:'list',
            dataKey:null,
            data:{
              legend:['货主','入库总件数','出库总件数'],
              data:[
                ["A货主","35","343"],
                ["B货主","345","78"],
                ["C货主","895","23"]
              ]
            }
          },{
            id:"firstLeftBot2",
            boxTitle:"快递订单完成情况",
            key:'list',
            dataKey:null,
            data:{
              legend:['快递公司','总单量','完成量','占比'],
              data:[
                ["圆通速递","35","352","30%"],
                ["申通快递","445","322","30%"],
                ["顺丰快递","345","2","40%"],
                ["中通快递","135","533","30%"],
                ["菜鸟速递","315","444","30%"]
              ]
            }

          },{
            id:"firstRight",
            boxTitle:"订单进展情况",
            key:'line',
            dataKey:null,
            data:[{"分拣中":100,"待复核":280,"待装车":300,"未打单":350,"分拣完成":550,"已复核":126,"未锁库":470,"已分配任务":335}]
          },{
            id:"secondLeft",
            boxTitle:"到货预约信息",
            key:'ring',
            dataKey:null,
            data:[{"未完成":3,"总订单数":5,"完成率%":0E-12,"已完成":0,"已取消":2}]
          },{
            id:"secondRight",
            boxTitle:"快递订单完成情况",
            key:'nbar',
            dataKey:null,
            data:[{"xkey":"北京仓","商品过期数量":35,"订单超时数量":56,"禁售库存数量":90,"安全库存数量":34},{"xkey":"深圳仓","商品过期数量":15,"订单超时数量":26,"禁售库存数量":30,"安全库存数量":74}],
          }
        ],
        form: {
          boxTitle: '',//表标题
          key:'',//图表类型
          dataKey:'',//图表数据
        },
        nowEditDivId:'',
        nowEditChartId:'',

      }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      },
      optionSingleHeight () {
        return {
          singleHeight: 26
        }
      }
    },
    created(){
      let pageId = this.$route.query.pageId;//页面Id
      if(pageId != undefined){
        this.mainTitle = "";
        this.pageId = pageId;
        this.isModle = false;
        //业务看板，把模板数据去掉
        for(let mod of this.domConfig){
          mod.boxTitle = "";
          mod.data = [];
        }
      }
    },
    mounted(){
      if(this.pageId != undefined){
        this.getData();//业务模板数据
      }else{
        this.DrawTemplateData();//渲染模板页数据
      }
    },
    watch:{
      //"$route":"reloadPage", 监听路由变化，由于路由AppMain.vue的设定，只对模板页面能触发
      "$store.state.app.isScreen":"screenGetData",//监听是否全屏
      "$store.state.app.sidebar.opened":"isEdit",//监听是否可编辑
    },
    methods:{
      //编辑时，禁止刷新页面
      isEdit(){
        this.reloadbl = !this.reloadbl;
        this.isActive = undefined;
      },
      screenGetData(){
        for(let c in this.eclist){
          this.eclist[c].resize();//从新加载图表，自适应宽高
        }
      },

      //渲染模板页数据
      DrawTemplateData(){
        this.eclist = [];
        for(let chart of this.domConfig){
          if(chart.key != "data" && chart.key != "list" && chart.data != null){
            this.ec = this.$echarts.init(document.getElementById(chart.id));
            this.ecObj = this.GLOBAL.allChartObj[chart.key];
            this.COMMONFUN.setOptionByKey(this.ecObj,chart.key,chart.data);
            this.ec.setOption(this.ecObj);
            this.eclist.push(this.ec);
          }
        }
      },

      //获取所有数据
      getData(){
        //清空页面初始值
        for(let i = 0;i<this.echartArr.length;i++){
          this.$echarts.init(document.getElementById(this.echartArr[i])).clear();
        }
        this.getTempDataById(this.pageId);
      },
      //获取页面数据，以及渲染数据
      drawLine:function(response){
        this.mainTitle=response.data.pageTitle;
        this.$refs.operation_form.mainTitle=this.mainTitle;
      },
      //点击需要编辑的div后  param: 元素id
      toEditDiv:function (ele) {
        let theStatus=document.getElementsByClassName('app-wrapper')[0];
        if(theStatus.getAttribute("class").indexOf('openSidebar') != -1){
          return;
        }
        var index = this.COMMONFUN.contains(this.domConfig,ele);//当前模块下标
        let eleId = ele.id;
        this.$refs.operation_form.currModelIndex = index
        this.$refs.operation_form.currKey = ele.key;//当前图表类型
        this.$refs.operation_form.currId = ele.id;//当前选择的Id
        this.$refs.operation_form.currDataKey = ele.dataKey//当前图表数据源编码
        this.$refs.operation_form.form.boxTitle= ele.boxTitle;//模块标题
        this.isActive = index;
      },

      //根据模板id查找模板配置数据
      getTempDataById(pageId){
        let paramid = {
          eq_tempid:pageId
        }
        var _this = this;
        this.echartArr = [];
        this.echartObjArr = [];
        this.eclist = [];
        this.dataloading = true;
        getTempById(this.$qs.stringify(paramid)).then(response => {
          setTimeout(function(){
            _this.dataloading = false;
          },1500)
          if(response.data.code == 200){
            //是否模板页面
            if(response.data.data.tempstat == 1){
              this.isModle =true;
            }else{
              this.isModle =false;
            }

            //渲染数据
            this.mainTitle= response.data.data.tempname;
            var temconfig = response.data.data.tempconfig;
            if(temconfig != null && temconfig != ""){
              temconfig = JSON.parse(temconfig);
              this.domConfig = temconfig;
              //各个模块根据dataKey加载数据
              var index = 0;//图表echartArr下标
              for(let i = 0;i<temconfig.length;i++){
                var key = temconfig[i].key;
                if(key != null){
                  //如果是数据表
                  if(key == 'list' || key == 'data'){
                    let dk = {
                      eq_dataKey:temconfig[i].dataKey,
                      eq_boxTitle:temconfig[i].boxTitle
                    }
                    var para = {
                      index:i
                    }
                    var parafun = function(para,$qs){
                      getDataByDataKey($qs.stringify(dk)).then(response => {
                        if(response.data.code == 200 && response.data.data != undefined && response.data.data != '[]') {
                          if(response.data.data != ""){
                            if(response.data.data.indexOf("xkey") != -1){ //如果是典型列表
                              /*var data = _this.COMMONFUN.formatDataToEchart(JSON.parse(response.data.data));
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTables(data);*/
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(JSON.parse(response.data.data),true);//带xkey的
                            }else{
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(JSON.parse(response.data.data),false);
                            }
                          }
                        }
                      })
                    }
                    parafun(para,this.$qs);
                  }else{
                    //如果是图表
                    let dk = {
                      eq_dataKey:temconfig[i].dataKey,
                      eq_boxTitle:temconfig[i].boxTitle
                    }
                    var para = {
                      index:index,
                      model:temconfig[i]
                    }
                    var parafun = function(para,$qs){
                      getDataByDataKey($qs.stringify(dk)).then(response => {
                        if(response.data.code == 200 && response.data.data != undefined && response.data.data != '[]') {
                          var key = para.model.key;
                          _this.ec = _this.$echarts.init(document.getElementById(para.model.id));
                          _this.ecObj = _this.GLOBAL.allChartObj[key];
                          if(response.data.data ==undefined){
                            return;
                          }
                          var parseData =  JSON.parse(response.data.data);
                          //console.log("获取的数据")
                          //console.log(parseData)
                          //缓存id及对应数据
                          _this.echartArr.push(para.model.id);
                          _this.echartObjArr.push(parseData);
                          _this.eclist.push(_this.ec);
                          //饼状图和环状图
                          //根据图表类型key配置option
                          _this.COMMONFUN.setOptionByKey(_this.ecObj,key,parseData);//根据数据和图表类型设置option
                          _this.ec.setOption(_this.ecObj);
                        }
                      })
                    }
                    parafun(para,this.$qs);
                    index++;
                  }
                }
              }
            }
          }
        })
      },
      //文字滚动方法
      /* showMarquee: function () {
         this.animate = true;
         var _this = this;
         setTimeout (() => {
           if(_this.domConfig[1].data.data.length>3){
             _this.domConfig[1].data.data.push (_this.domConfig[1].data.data[0]);
             _this.domConfig[1].data.data.shift ();
             _this.animate = false;
           }
           if(_this.domConfig[2].data.data.length>3){
             _this.domConfig[2].data.data.push (_this.domConfig[2].data.data[0]);
             _this.domConfig[2].data.data.shift ();
             _this.animate = false;
           }

         }, 500);
       }*/
    },
    //销毁
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      if(this.timereload){
        clearInterval(this.timereload);
      }
    }
  }

</script>
<style scoped>
</style>
