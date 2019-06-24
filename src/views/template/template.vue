<template>
  <div class="box1">
    <div class="mainBox" id="mainBox">
      <div class="bigTitle">
        <h1 class="bigTitleName" v-text="mainTitle"></h1>
        <p>{{date}}</p>
      </div>
      <!--firstLeftTop-->
      <div class="mainContent" @drop="drop"
           @dragover="dragover">
        <grid-layout
          :layout.sync="layout"
          :col-num="parseInt(colNum)"
          :row-height="rowHeight"
          :is-draggable="draggable"
          :is-resizable="resizable"
          :is-mirrored="mirrored"
          :vertical-compact="true"
          :use-css-transforms="true"
          :responsive="responsive"
          @layout-created="layoutCreatedEvent"
          @layout-before-mount="layoutBeforeMountEvent"
          @layout-mounted="layoutMountedEvent"
          @layout-ready="layoutReadyEvent"
          @layout-updated="layoutUpdatedEvent"
        >
          <grid-item v-for="item in layout" :key="item.i"  :itemId="'item'+item.i"  class="" @click="toEditDiv(domConfig[item.i])"
                     :static="item.static"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i"
                     @resize="resize"
                     @move="move"
                     @resized="resized"
                     @moved="moved"
          >
            <p class="boxTitle"></p>
            <div class="boxContent" >
              <div class="boxContent-div" :id="'itemBox'+item.i">

              </div>
              <div class="icoTL"></div>
              <div class="icoTR"></div>
              <div class="icoBL"></div>
              <div class="icoBR"></div>
            </div>
            <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
            <!--<test-element :text="item.i"></test-element>-->
            <!--<button @click="clicked">CLICK ME!</button>-->
          </grid-item>
        </grid-layout>


      </div>
    </div>

    <!--右侧设置-->
    <operation-form :mainTitle="mainTitle" ref="operation_form"></operation-form>
  </div>
</template>

<script>
  import operationForm from "@/components/operationForm/operationForm";
  import {getSourDataAll,getTempById,getDataByDataKey} from '@/api/chartSetting'
  import { GridLayout,GridItem } from 'vue-grid-layout'
  let InitialWdth=400;
  let Initialheight=250;
  let testLayout = [
    {"x":0,"y":0,"w":4,"h":6,"i":"0", resizable: true, draggable: true, static: false,id:'itemBox0',boxTitle:"快递订单完成情况0",key:null,dataKey:null,data:null},
    {"x":1,"y":1,"w":2,"h":2,"i":"1", resizable: null, draggable: null, static: false,id:'itemBox1',boxTitle:"快递订单完成情况1",key:null,dataKey:null,data:null},
    {"x":4,"y":0,"w":2,"h":5,"i":"2", resizable: true, draggable: false, static: false,id:'itemBox2',boxTitle:"快递订单完成情况2",key:null,dataKey:null,data:null},
    /*{"x":6,"y":0,"w":2,"h":3,"i":"3", resizable: false, draggable: false, static: false},
    {"x":8,"y":0,"w":2,"h":3,"i":"4", resizable: false, draggable: false, static: false},
    {"x":10,"y":0,"w":2,"h":3,"i":"5", resizable: false, draggable: false, static: false},
    {"x":0,"y":5,"w":2,"h":5,"i":"6", resizable: false, draggable: false, static: false},
    {"x":2,"y":5,"w":2,"h":5,"i":"7", resizable: false, draggable: false, static: false},
    {"x":4,"y":5,"w":2,"h":5,"i":"8", resizable: false, draggable: false, static: false},
    {"x":6,"y":3,"w":2,"h":4,"i":"9", resizable: false, draggable: false, static: false},
    {"x":8,"y":4,"w":2,"h":4,"i":"10", resizable: false, draggable: false, static: false},
    {"x":10,"y":4,"w":2,"h":4,"i":"11", resizable: false, draggable: false, static: false},
    {"x":0,"y":10,"w":2,"h":5,"i":"12", resizable: false, draggable: false, static: false},
    {"x":2,"y":10,"w":2,"h":5,"i":"13", resizable: false, draggable: false, static: false},
    {"x":4,"y":8,"w":2,"h":4,"i":"14", resizable: false, draggable: false, static: false},
    {"x":6,"y":8,"w":2,"h":4,"i":"15", resizable: false, draggable: false, static: false},
    {"x":8,"y":10,"w":2,"h":5,"i":"16", resizable: false, draggable: false, static: false},
    {"x":10,"y":4,"w":2,"h":2,"i":"17", resizable: false, draggable: false, static: false},
    {"x":0,"y":9,"w":2,"h":3,"i":"18", resizable: false, draggable: false, static: false},
    {"x":2,"y":6,"w":2,"h":2,"i":"19", resizable: false, draggable: false, static: false}*/
  ];



  export default {
    name: 'box1',
    components: {
      operationForm,
      GridLayout,
      GridItem
    },
    data(){
      return{
        animate: false,//是否滚动
        pageId:undefined,
        isModle:true,//是否是模板页面
        tempurl:'/template3',//模板
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

        //拖拽布局##################################################################
        layout: JSON.parse(JSON.stringify(testLayout)),
        layout2: JSON.parse(JSON.stringify(testLayout)),
        draggable: true,
        resizable: true,
        mirrored: false,
        responsive: true,
        rowHeight: 30,
        colNum: 12,
        index: 0



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
    },
    mounted(){
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
      let reloadt = localStorage.reloadTime;
      if(reloadt != undefined){
        reloadt = parseInt(reloadt);
        if(reloadt > 19){
          this.timereload = setInterval(() => {
             _this.getData();//刷新数据
          }, reloadt * 1000)
        }
      }

      //拖拽布局##################################################################
      this.index = this.layout.length;
    },
    watch:{
      "$route":"getData",    //监听路由变化
      "$store.state.app.isScreen":"screenGetData"

    },
    methods:{
      screenGetData(){
          for(let c in this.eclist){
            this.eclist[c].resize();//从新加载图表，自适应宽高
          }
      },
      getData(){
        //清空页面初始值
        for(let i = 0;i<this.echartArr.length;i++){
          this.$echarts.init(document.getElementById(this.echartArr[i])).clear();
        }
        Object.assign(this.$data, this.$options.data());//清空页面数据
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
      },
      //点击需要编辑的div后  param: 元素id
      toEditDiv:function (ele) {
        var index = this.COMMONFUN.contains(this.domConfig,ele);//当前模块下标
        let eleId = ele.id;
        this.$refs.operation_form.currModelIndex = index
        this.$refs.operation_form.currKey = ele.key;//当前图表类型
        this.$refs.operation_form.currId = ele.id;//当前选择的Id
        this.$refs.operation_form.currDataKey = ele.dataKey//当前图表数据源编码
        this.$refs.operation_form.form.boxTitle= ele.boxTitle;//模块标题
        let theStatus=document.getElementsByClassName('app-wrapper')[0];
        if(theStatus.getAttribute("class").indexOf('openSidebar')==-1){
          this.isActive = index;
        }
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
                                   //temconfig[para.index].data = response.data.data
                                   if(response.data.data != ""){
                                     var data = _this.COMMONFUN.formatDataToEchart(JSON.parse(response.data.data));
                                     if(data.legend != undefined){ //如果是典型列表
                                       //_this.domConfig[para.index].data = data;
                                       _this.domConfig[para.index].data = _this.COMMONFUN.formatTables(data);
                                     }else{
                                       _this.domConfig[para.index].data = data;
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



      //拖拽布局##################################################################
      removeItem: function(item) {
        //console.log("### REMOVE " + item.i);
        this.layout.splice(this.layout.indexOf(item), 1);
      },
      addItem: function() {
        // let self = this;
        //console.log("### LENGTH: " + this.layout.length);
        let item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
        this.index++;
        this.layout.push(item);
      },
      move: function(i, newX, newY){
        console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resize: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      moved: function(i, newX, newY){
        console.log("### MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resized: function(i, newH, newW, newHPx, newWPx){
        console.log("### RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      /**
       * Add change direction button
       */
      changeDirection() {
        let documentDirection = getDocumentDir();
        let toggle = "";
        if (documentDirection === "rtl") {
          toggle = "ltr"
        } else {
          toggle = "rtl"
        }
        setDocumentDir(toggle);
        //eventBus.$emit('directionchange');
      },

      layoutCreatedEvent: function(newLayout){
        console.log("Created layout: ", newLayout)
      },
      layoutBeforeMountEvent: function(newLayout){
        console.log("beforeMount layout: ", newLayout)
      },
      layoutMountedEvent: function(newLayout){
        console.log("Mounted layout: ", newLayout)
      },
      layoutReadyEvent: function(newLayout){
        console.log("Ready layout: ", newLayout)
      },
      layoutUpdatedEvent: function(newLayout){
        console.log("Updated layout: ", newLayout)
      },


      drop (event) {
        console.log('drop', event)
        let layerX= event.layerX;//鼠标位置
        let layerY= event.layerY;
        let mainContent=document.getElementsByClassName('mainContent')[0];
        let mainContentW=mainContent.clientWidth||mainContent.offsetWidth;
        /*let mainContentH=mainContent.clientHeight||mainContent.offsetHeight;*/
        let unitWidth=parseInt(mainContentW/12);
        let x=parseInt(((layerX-InitialWdth/2)>0?(layerX-InitialWdth/2):0)/unitWidth);
         let y=parseInt(((layerY-Initialheight/2)>0?(layerY-Initialheight/2):0)/30);
         let id='itemBox'+this.index
        let item = {"x":x,"y":y,"w":4,"h":6,"i":this.index+"", whatever: "bbb",id:id,boxTitle:"快递订单完成情况2",key:null,dataKey:null,data:null};
        this.index++;
        this.layout.push(item);
        console.log(this.layout);

        this.$refs.operation_form.currId = 'itemBox'+this.index;
      },
      dragover (event) {
        event.preventDefault()
      }



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

  .box1{
    /*min-height: calc(100vh - 84px);*/
    position: relative;  border: 2px solid #0db3fd;  color: white;  height: 100%;
    /*overflow: hidden;*/
  }
  .mainBox{
    width: 100%;
    /*height: calc(100vh - 84px);*/
    transition: all 0.5s;  padding: 0 2%;  overflow: hidden;
    background: url("/static/image/pageBg.png" ) no-repeat center;
    background-size: 100% 100%;  height: 100%;
  }
  .bigTitle{
    height: 12.5%;  color: #fff;
    background: url("/static/image/titleBg.png" ) no-repeat center;
    background-size: 100% 100%;  overflow: hidden;  text-align: center;
  }
  .bigTitle h1{
    font-size: 1.7rem;  font-weight: normal;  margin-top: 1.2%; margin-bottom: 0.5%;
  }
  .bigTitle p{
    font-size: 0.7rem;  margin: 0;
  }
  .mainContent{
    height: 87.5%;margin-top: -2%;
    overflow: auto;
  }

  .boxTitle{height: 30px;color: #3190cb;font-size: 1.1rem;  text-align: left;  line-height: 2.4rem;  }
  .boxContent{  height: calc(100% - 30px);  width: 100%;  border: 1px solid #0d1743;  display: block;  position: relative;}
  .boxContent-div{  width: 100%;  height: 100%;  cursor: pointer;}
  .active .boxContent{  border:2px solid #0db3fd;  background: rgba(13,179,253,0.2);}
  .active .boxContent>div{  border:none;  }
  .icoTL{position: absolute;  left:-1px;  top:-1px;  width: 1rem;  height: 1rem; border-left:2px solid #0db3fd ;
    border-top:2px solid #0db3fd ;
  }
  .icoTR{position: absolute;  right:-1px;  top:-1px;  width: 1rem;  height: 1rem;
    border-right:2px solid #0db3fd ;  border-top:2px solid #0db3fd ;
  }
  .icoBL{
    position: absolute;
    left:-1px;  bottom:-1px;  width: 1rem;  height: 1rem;  border-left:2px solid #0db3fd ;  border-bottom:2px solid #0db3fd ;
  }
  .icoBR{
    position: absolute;  right:-1px;  bottom:-1px;  width: 1rem;  height: 1rem;
    border-right:2px solid #0db3fd ;  border-bottom:2px solid #0db3fd ;
  }
  .firstLeftBot{  height: 56%;  }
  .firstLeftBot1{
    width: 40%;  height: 100%;
    float: left;  margin-right: 2%;
  }
  .firstLeftBot2{
    width: 58%;  height: 100%;  float: left;
  }
  .firstLeftBot .boxTitle{
    height:24% ;
  }
  .firstLeftBot .boxContent{
    height:75% ;
  }
  .firstRight{
    width: 32.5%;height: 100%;
  }
  .firstRight .boxTitle{
    height:10.7% ;
  }
  .firstRight .boxContent{
    height:89.2% ;
  }
  .secondBox{
    height:100% ;
  }
  .secondLeft{
    width: 26.4%;  height: 100%;  float: left;  margin-right: 1.5%;
  }
  .secondRight{
    width: 100%;  height: 100%;  float: left;
  }
  .secondBox .boxTitle{
    height:14% ;
  }
  .secondBox .boxContent{
    height:85% ;
  }

  /*数据样式##########################starrt*/
  .firstLeftTop .el-row{
    height: 100%;  padding-top: 1.3rem;overflow: hidden;
  }
  .el-row>div{
    height: 100%;  text-align: center;
  }
  .el-row .el-col p{
    font-size: 1.2rem;
  }
  .el-row .el-col p span{
    width: 0.7rem;  height: 0.7rem;  border-radius: 50%;
    display: inline-block;  margin:0 0.5rem;  vertical-align: middle;
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
    font-size: 2rem;  margin:0 0.5rem;
  }

  /*列表样式##########################starrt*/
  .Tb-box{
    width: 100%;  height: 100%;  padding:0 .3rem;  overflow: hidden;
  }
  .Tb-box .el-row .el-col{
    white-space: nowrap;  overflow: hidden;  text-overflow: ellipsis;  line-height: 1.8rem;
  }
  .Tb-title{
    height: 20%;  color: #3caff2;
  }

  .Tb-title div{
    height: 100%;

  }
  .Tb-title .colflex, .Tb-content .colflex{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .Tb-box .el-row .el-col:nth-child(1){
    /*text-align: left;*/
  }
  .Tb-content{
    height: 75%;  overflow-y: scroll;
  }
  ::-webkit-scrollbar{
    display: none;
  }

  .temtable thead th{text-align: center;color:#3caff2;height: 1.6rem;}
  .temtable tbody tr td{text-align: center}
  .temtable tbody tr{height: 1.5rem;}
  .seamless-warp {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
