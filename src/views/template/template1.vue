<template>
  <div class="box1">
    <div class="mainBox" id="mainBox">
      <div class="bigTitle">
        <h1 class="bigTitleName" v-text="mainTitle"></h1>
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
                  <table-two v-if="domConfig[0].key == 'list'" :domConfig="domConfig[1].data"></table-two>
                  <div class="chart" :id="domConfig[0].id"></div>
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
                    <div class="chart" :id="domConfig[1].id"></div>
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
                    <div class="chart" :id="domConfig[2].id"></div>
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
                <div class="chart" :id="domConfig[3].id"></div>
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
                <div class="chart" :id="domConfig[4].id"></div>
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
                <div class="chart" :id="domConfig[5].id"></div>
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
  import operationForm from "@/components/operationForm/operationForm";
  import {getSourDataAll,getTempById,getDataByDataKey} from '@/api/chartSetting'
  import tableOne from "@/components/Kanban/table1";
  import tableTwo from "@/components/Kanban/table2";
  export default {
    name: 'template1',
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
        tempurl:'/template1',
        echartArr:[],//ec Dom id
        echartObjArr:[],//缓存ec数据
        eclist:[],//换成ec对象
        ec:undefined,//echart实例化对象
        ecObj:undefined,//ec配置属性
        //isFirst:true,
        isActive:undefined,
        thePageId:'',//页面传参的id
        mainTitle: '',
        allData:[],
        nowDivIndex:' ',//要编辑的div的编号
        nowDivKey:'',
        pageData:'',//渲染页面的数据
        date: undefined,
        timer:undefined,//标题下面的时间定时器
        timereload:undefined,//页面定时刷新数据
        domConfig:[
          {
            id:"firstLeftTop",
            boxTitle:"仓库预警报表2",
            key:'data', //图表类型
            dataKey:null,//
            data:{
                legend:['商品过期数量','订单超时数量','禁售库存数量','安全库存预警数量'],
                data:[
                  ["35","35","343","234"]
                ]
              }
          },{
            id:"firstLeftBot1",
            boxTitle:"到货预约信息",
            key:'list',
            dataKey:null,
            data:{
                legend:['商品名称','单数','件数'],
                data:[
                  ["百草味-每日坚果每日","35","34352"],
                  ["百草味-每日坚果每日","35","34352"],
                  ["百草味-每日坚果每日","35","34352"]
                ]
            }
          },{
            id:"firstLeftBot2",
            boxTitle:"快递订单完成情况",
            key:null,
            dataKey:null,
            data:{
              legend:['快递公司','总单量','完成量','占比'],
              data:[
                ["百草味-每日坚果每日","35","34352","30%"],
                ["百草味-每日坚果每日","35","34352","30%"],
                ["百草味-每日坚果每日","35","34352","30%"]
              ]
            }

          },{
            id:"firstRight",
            boxTitle:"订单进展情况",
            key:null,
            dataKey:null,
            data:null
          },{
            id:"secondLeft",
            boxTitle:"到货预约信息1",
            key:null,
            dataKey:null,
            data:null
          },{
            id:"secondRight",
            boxTitle:"快递订单完成情况",
            key:null,
            dataKey:null,
            data:null
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
      this.thePageId=this.COMMONFUN.GetRequest().pageId;
      if(this.thePageId==undefined){
        this.thePageId='p1';
      }

      var pageId = this.$route.query.pageId;//页面Id
      if(pageId != undefined){
        this.pageId = pageId
      }
      //setInterval (this.showMarquee, 2000)
    },
    mounted(){
      /* 测试数据
      this.$axios.get('static/json/box1-'+this.thePageId+'.json').then((response) => {

        this.pageData=response.data;
        this.drawLine(response);
      });*/
      if(this.pageId != undefined){
        this.getTempDataById(this.pageId);
      }
      //加载数据源
      this.getAllDatas();
      //当前时间
      let _this = this;
      _this.date = this.COMMONFUN.parseTime(null,new Date());
      this.timer = setInterval(() => {
        _this.date = this.COMMONFUN.parseTime(null,new Date());
      }, 1000)
      //设定刷新时间
      let reloadt = localStorage.reloadTime;//单位分钟
      if(reloadt != undefined){
        reloadt = parseInt(reloadt);
        if(reloadt > 0){
          this.timereload = setInterval(() => {
            if(_this.reloadbl){
              _this.reloadPage();//刷新数据
            }
          }, reloadt * 1000 * 60)
        }
      }
    },
    watch:{
      "$route":"reloadPage",    //监听路由变化
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
      //刷新页面数据
      reloadPage(){
        this.reload();
      },
      getData(){
        //清空页面初始值
       /* for(let i = 0;i<this.echartArr.length;i++){
          this.$echarts.init(document.getElementById(this.echartArr[i])).clear();
        }*/
        //Object.assign(this.$data, this.$options.data());//清空页面数据
        var pageId = this.$route.query.pageId;//页面Id
        if(pageId != undefined){
          this.pageId = pageId
        }else{
          this.isModle = true;
        }
        this.getTempDataById(pageId);
        //加载数据源
        this.getAllDatas();
      },
      //获取页面数据，以及渲染数据
      drawLine:function(response){
        this.mainTitle=response.data.pageTitle;
        this.$refs.operation_form.mainTitle=this.mainTitle;
       /* this.echartObjArr[0]= this.GLOBAL.allChartObj[response.data.data[0].key];
        this.echartObjArr[1]= this.GLOBAL.allChartObj[response.data.data[1].key];
        this.echartObjArr[2]= this.GLOBAL.allChartObj[response.data.data[2].key];*/
        /*document.getElementById('firstRight').getElementsByTagName('p')[0].innerHTML=response.data.data[0].boxTitle;
        document.getElementById('secondRight').getElementsByTagName('p')[0].innerHTML=response.data.data[1].boxTitle;
        document.getElementById('secondLeft').getElementsByTagName('p')[0].innerHTML=response.data.data[2].boxTitle;*/

/*        for(let i = 0;i<3;i++){
          var resd = response.data.data[i];
          this.$axios.get('static/json/'+resd.dataKey+'.json').then((res) => {
            if(resd.key!=0){
              this.echartObjArr[0].xAxis.data=this.COMMONFUN.getChartData(res.data.dataKey)[0];
              this.echartObjArr[0].series.data=this.COMMONFUN.getChartData(res.data.dataKey)[1];
              if(resd.key==2){
                this.echartObjArr[0].series.itemStyle.normal.color=new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#44cbf5'},
                    {offset: 1, color:'#2669c5'}
                  ]
                )
              }
            }else{
              this.echartObjArr[0].series[0].data=this.COMMONFUN.getChartDataPie(res.data.dataKey);
            }
            this.echartArr[0].setOption(this.echartObjArr[0]);
          });
        }

        this.$axios.get('static/json/'+response.data.data[1].dataKey+'.json').then((res) => {

          if(response.data.data[1].key!=0){
            this.echartObjArr[1].xAxis.data=this.COMMONFUN.getChartData(res.data.dataKey)[0];
            this.echartObjArr[1].series.data=this.COMMONFUN.getChartData(res.data.dataKey)[1];
            if(response.data.data[1].key==2){
              this.echartObjArr[1].series.itemStyle.normal.color=new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#44cbf5'},
                  {offset: 1, color:'#2669c5'}
                ]
              )
            }
          }else{
            this.echartObjArr[1].series[0].data=this.COMMONFUN.getChartDataPie(res.data.dataKey);
          }
          this.echartArr[1].setOption(this.echartObjArr[1]);
        });
        this.$axios.get('static/json/'+response.data.data[2].dataKey+'.json').then((res) => {

          if(response.data.data[2].key!=0){
            this.echartObjArr[2].xAxis.data=this.COMMONFUN.getChartData(res.data.dataKey)[0];
            this.echartObjArr[2].series.data=this.COMMONFUN.getChartData(res.data.dataKey)[1];
            if(response.data.data[2].key==2){
              this.echartObjArr[2].series.itemStyle.normal.color=new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#44cbf5'},
                  {offset: 1, color:'#2669c5'}
                ]
              )
            }
          }else{
            this.echartObjArr[2].series[0].data=this.COMMONFUN.getChartDataPie(res.data.dataKey);
          }
          this.echartArr[2].setOption(this.echartObjArr[2]);
        });*/

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
      //获取数据源下拉列表
      getAllDatas:function () {
        getSourDataAll().then((response) => {
            if(response.data.code == 200) {
              this.allData=response.data.data;
            }
        })
      },
      //根据模板id查找模板配置数据
      getTempDataById(pageId){
        let paramid = {
          tempid:pageId
        }
        var _this = this;
        this.echartArr = [];
        this.echartObjArr = [];
        this.eclist = [];
        getTempById(this.$qs.stringify(paramid)).then(response => {
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
                         if(key == 'list'){
                             let dk = {
                               dataKey:temconfig[i].dataKey,
                               boxTitle:temconfig[i].boxTitle
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
                               dataKey:temconfig[i].dataKey,
                               boxTitle:temconfig[i].boxTitle
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
