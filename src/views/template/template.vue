<template>
  <div class="box1">
    <img class="pagebgsty" src="@/assets/pageBg.png" alt="">
    <div class="mainBox" id="mainBox" style="z-index:100;position:absolute">
      <div class="bigTitle">
        <img class="titlebgstr" src="@/assets/titleBg.png" alt="">
        <h1 class="bigTitleName">{{mainTitle}}  <i v-show="dataloading" style="position:absolute;right:0" class="el-icon-loading"></i></h1>
        <p>{{date}}</p>
      </div>
      <!--firstLeftTop-->
      <div id="mainContent" :class="[{onScreen},'mainContent mixin-components-container']"  @drop="drop" style="position:relative"
           @dragover="dragover">
        <vdr
          @dragstop="onDragstop"
          @resizestop="onResizestop"
          @activated="onActivated(item)"
          :draggable="draggable"
          :resizable="resizable"
          :prevent-deactivation="false"
          :w="item.w"
          :h="item.h"
          :x="item.x"
          :y="item.y"
          :min-width="200"
          :min-height="200"
          :isConflictCheck="false"
          :snap="true"
          :snapTolerance="20"
          :class="[{active: isActiveid == item.id},'cdrsty']"
          classNameDragging="my-active-class"
          classNameResizing="my-resizing-class"
          classNameActive="my-active-class"
          v-contextmenu:contextmenu
          v-for="item in domConfig"
        >

          <p class="boxTitle" @mousemove="onMousemove(item.id)">{{item.boxTitle}}</p>
          <div class="boxContent" @mousemove="onMousemove(item.id)">
            <div class="boxContent-div">
              <table-one v-if="item.key == 'data'" :domConfig="item.data"></table-one>
              <table-two v-if="item.key == 'list'" :domConfig="item.data"></table-two>
              <div :class="[{isshow: item.key == 'data' || item.key == 'list' },'chart']" :id="item.id"></div>
            </div>
            <div class="icoTL"></div>
            <div class="icoTR"></div>
            <div class="icoBL"></div>
            <div class="icoBR"></div>
          </div>
        </vdr>
      </div>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item v-show="draggable" @click="handleConfirm">结束编辑</v-contextmenu-item>
      <v-contextmenu-item v-show="draggable" @click="handleClick">删除</v-contextmenu-item>
    </v-contextmenu>

    <!--右侧设置-->
    <operation-form :mainTitle="mainTitle" :queryparams="queryparams" ref="operation_form"></operation-form>
  </div>
</template>

<script>
  import {mixinsMain} from '@/mixins/main'; //基础调用
  import operationForm from "@/components/operationForm/operationForm";
  import {getTempById,getDataByDataKey} from '@/api/chartSetting'
  import tableOne from "@/components/Kanban/table1";
  import tableTwo from "@/components/Kanban/table2";

  export default {
    name: 'template',/*系统模板四，拖拽式布局*/
    mixins:[mixinsMain],
    inject:['reload'],//注入reload方法
    components: {
      operationForm,
      tableOne,
      tableTwo,
    },
    data(){
      return{
        animate: false,//是否滚动
        pageId:undefined,
        isModle:true,//是否是模板页面
        tempurl:'/template',//模板
        echartArr:[],//ec Dom id
        echartObjArr:[],//缓存ec数据
        eclist:[],//换成ec对象，用于回显，重新渲染图表
        ec:undefined,//echart实例化对象
        ecObj:undefined,//ec配置属性
        //isFirst:true,
        isActiveid:undefined,//当前点击的元素id
        isActive:undefined,//当前选择的元素
        mainTitle: '拖拽式布局',
        nowDivIndex:' ',//要编辑的div的编号
        nowDivKey:'',
        pageData:'',//渲染页面的数据
        date: undefined,
        timer:undefined,//标题下面的时间定时器
        timereload:undefined,//页面定时刷新数据
        reloadbl:true,//是否可以刷新本页
        onScreen:false,
        dataloading:false,//数据加载loading
        form: {
          boxTitle: '',//表标题
          key:'',//图表类型
          dataKey:'',//图表数据
        },
        nowEditDivId:'',
        nowEditChartId:'',
        //拖拽布局##################################################################
        domConfig: [
          {
            "x":52,
            "y":3,
            "w":48,
            "h":53,
            "id":"s15756108220001",
            "boxTitle":"仓库预警报表",
            "key":"pie",
            "dataKey":null,
            "data":[{
              "分拣中": 8,
              "待复核": 2,
              "待装车": 5,
              "未打单": 12,
              "分拣完成": 6,
              "已复核": 6,
              "未锁库": 15,
              "已分配任务": 1
            }]
          },
          {
            "x":0,
            "y":3,
            "w":48,
            "h":53,
            "id":"s15756108870002",
            "boxTitle":"订单情况分析",
            "key":"ybar",
            "dataKey":null,
            "data":[{
              "分拣中": 8,
              "待复核": 2,
              "待装车": 5,
              "未打单": 12,
              "分拣完成": 6,
              "已复核": 6,
              "未锁库": 15,
              "已分配任务": 7
            }]
          },
          {
            "x":0,
            "y":59,
            "w":100,
            "h":41,
            "id":"s15756134140003",
            "boxTitle":"复核称重异常报表",
            "key":"list",
            "dataKey":null,
            "data":
              {
                "legend":["订单号","上环操作人","快递单号","创建时间","备注","单据类型"],
                "data":[
                  ["SO18092600002","广州公司","RB1811190001","2018-09-26","ZX","复核"],
                  ["SO18111700013","09z","RB1811190001","2018-11-19","订单复核异常","称重"],
                  ["SO19080100011","zyh测试","RB1811190001","2019-08-03","订单复核异常","复核"],
                  ["SO18092600002","广州公司","RB1811190001","2018-09-26","ZX","复核"],
                  ["SO18111700013","09z","RB1811190001","2018-11-19","订单复核异常","称重"],
                  ["SO19080100011","zyh测试","RB1811190001","2019-08-03","订单复核异常","复核"],
                  ["SO18092600002","广州公司","RB1811190001","2018-09-26","ZX","复核"],
                  ["SO18111700013","09z","RB1811190001","2018-11-19","订单复核异常","称重"],
                  ["SO19080100011","zyh测试","RB1811190001","2019-08-03","订单复核异常","复核"],
                  ["SO18092600002","广州公司","RB1811190001","2018-09-26","ZX","复核"],
                  ["SO18111700013","09z","RB1811190001","2018-11-19","订单复核异常","称重"],
                  ["SO19080100011","zyh测试","RB1811190001","2019-08-03","订单复核异常","复核"],
                ]
              }
          }],
        draggable: false,//是否可拖拽
        resizable: false,//是否可缩放
        mirrored: false,
        index: 0,//当前模块下标
        //监听mainContent的宽高
        mainContent:{
          width:undefined,
          height:undefined,
        },
        //监听全屏模式下mainContent的宽高
        maxMainContent:{
          width:undefined,
          height:undefined,
        },
        scale:{ //全屏缩放切换比例，默认1
          xbl:1,
          ybl:1
        },
        queryparams:"",//查询参数
      }
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    },

    created(){
      var pageId = this.$route.query.pageId;//页面Id
      if(pageId != undefined){
        this.mainTitle = "";
        this.domConfig = [];
        this.pageId = pageId;
        this.isModle = false;
      }
    },
    mounted(){
      //获取mainContent的宽度和高度
      this.mainContent.width = document.getElementById("mainContent").offsetWidth;
      this.mainContent.height = document.getElementById("mainContent").offsetHeight;
      if(this.pageId != undefined){
        this.getData();//业务模板数据
      }else{
        this.DrawTemplateData();//渲染模板页数据
      }
      this.index = this.domConfig.length;
    },
    watch:{
      //"$route":"reloadPage",    //监听路由变化
      "$store.state.app.isScreen":"screenGetData",//监听是否全屏
      "$store.state.app.sidebar.opened":"isEdit",//监听是否可编辑
      "$store.state.app.reloadData":"getData",//监听刷新页面
    },
    methods:{

      /**
       * 缩放结束触发，缩放触发：resizing
       * @param x 距离x轴位置
       * @param y 距离y轴位置
       * @param width 元素宽度
       * @param height 元素高度
       */
      onResizestop: function (x, y, width, height) {
        for(let cdr of this.domConfig){
          if(cdr.id == this.isActive){
            cdr.x = x;
            cdr.y = y;
            cdr.w = width;
            cdr.h = height;
            break;
          }
        }
      },

      /**
       * 拖动结束触发，拖动触发：dragging
       * @param x 距离x轴位置
       * @param y 距离y轴位置
       */
      onDragstop: function (x,y) {
        for(let cdr of this.domConfig){
          if(cdr.id == this.isActive){
            cdr.x = x;
            cdr.y = y;
            break;
          }
        }
      },

      /**
       * 点击vdr时触发,并关联右侧数据
       * @param ele item
       */
      onActivated:function (ele) {
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
        this.isActive = eleId;
        this.isActiveid = eleId;
      },

      //鼠标移入
      onMousemove(id){
        this.isActive = id;
      },

      // 编辑时，禁止刷新页面,模块可拖动
      isEdit(){
        this.reloadbl = !this.reloadbl;
        if(this.draggable){
          this.draggable = false;
          this.resizable = false;
        }else{
          this.draggable = true;
          this.resizable = true;
        }
        this.isActive = undefined;
        this.isActiveid = undefined;
      },

      //模板页数据
      DrawTemplateData(){
        this.eclist = [];
        var that = this;
        for(let tem of that.domConfig){
          if(tem.x != undefined){

            tem.x = parseInt((tem.x * this.mainContent.width / 100).toFixed(0));
            tem.y = parseInt((tem.y * this.mainContent.height / 100).toFixed(0));
            tem.w = parseInt((tem.w * this.mainContent.width / 100).toFixed(0));
            tem.h = parseInt((tem.h * this.mainContent.height / 100).toFixed(0));
          }
        }
        setTimeout(function(){
          for(let chart of that.domConfig){
            if(chart.key != "data" && chart.key != "list" && chart.data != null){
              that.ec = that.$echarts.init(document.getElementById(chart.id));
              that.ecObj = that.GLOBAL.allChartObj[chart.key];
              that.COMMONFUN.setOptionByKey(that.ecObj,chart.key,chart.data);
              that.ec.setOption(that.ecObj);
              that.eclist.push(that.ec);
            }
          }
        },200)
      },
      //右键确认编辑结束
      handleConfirm(vm, event) {
        this.$refs.operation_form.currModelIndex = undefined,
        this.$refs.operation_form.currKey = undefined;//当前图表类型
        this.$refs.operation_form.currId = undefined;//当前选择的Id
        this.$refs.operation_form.currDataKey = undefined;//当前图表数据源编码
        this.$refs.operation_form.form.boxTitle= undefined;//模块标题
        this.isActiveid = undefined;
      },
      //右键菜单点击删除
      handleClick (vm, event) {
        if(!this.isActive){return;}
        for(let i in this.domConfig){
            if(this.domConfig[i].id == this.isActive){
              this.domConfig.splice(i, 1);
              var that = this;
              setTimeout(function(){
                for(let cdr of that.domConfig){
                  if(cdr.key != "list" && cdr.key != "data"){
                    that.ec = that.$echarts.init(document.getElementById(cdr.id));
                    that.ec.resize();
                    that.ecObj = that.GLOBAL.allChartObj[cdr.key];
                    that.ec.setOption(that.ecObj);
                  }
                }
              },100)
              break;
            }
        }
        this.isActiveid = undefined;//取消当前选择的模块id
      },

      //监听全屏
      screenGetData(){
        var that = this;
        //拖拽模块通过vue-grid-layout重新渲染宽高
        if(this.$store.state.app.isScreen){
          setTimeout(function(){
            that.maxMainContent.width = document.getElementById("mainContent").offsetWidth;
            that.maxMainContent.height = document.getElementById("mainContent").offsetHeight;
            that.scale.xbl = (that.maxMainContent.width / that.mainContent.width).toFixed(4);
            that.scale.ybl = (that.maxMainContent.height / that.mainContent.height).toFixed(4);
            for(let cdr of that.domConfig){
              cdr.w = parseInt(cdr.w * that.scale.xbl);
              cdr.h = parseInt(cdr.h * that.scale.ybl);
              cdr.x = parseInt(cdr.x * that.scale.xbl);
              cdr.y = parseInt(cdr.y * that.scale.ybl);
            }
          },200)
        }else{
          for(let cdr of this.domConfig){
            cdr.w = parseInt(cdr.w / this.scale.xbl);
            cdr.h = parseInt(cdr.h / this.scale.ybl);
            cdr.x = parseInt(cdr.x / this.scale.xbl);
            cdr.y = parseInt(cdr.y / this.scale.ybl);
          }
        }
        this.onScreen = !this.onScreen;
        setTimeout(function(){
          for(let c in that.eclist){
            that.eclist[c].resize();//从新加载图表，自适应宽高
          }
        },300)
      },

      getData(){
        //清空页面初始值
        for(let i = 0;i<this.echartArr.length;i++){
          this.$echarts.init(document.getElementById(this.echartArr[i])).clear();
        }
        this.getTempDataById(this.pageId);
        //Object.assign(this.$data, this.$options.data());//清空页面数据
      },

      //获取页面数据，以及渲染数据
      drawLine:function(response){
        this.mainTitle=response.data.pageTitle;
        this.$refs.operation_form.mainTitle=this.mainTitle;
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
        this.dataloading = true;
        getTempById(this.$qs.stringify(paramid)).then(response => {
          setTimeout(function(){
            _this.dataloading = false;
          },1500)
          if(response.data.code == 200 && response.data.data){
            //是否模板页面
            if(response.data.data.tempstat == 1){
              this.isModle =true;
            }else{
              this.isModle =false;
            }
            //查询参数
            if(response.data.data.queryparams){
              this.queryparams = response.data.data.queryparams;
            }
            //渲染数据
            this.mainTitle= response.data.data.tempname;
            var temconfig = response.data.data.tempconfig;
            if(temconfig != null && temconfig != ""){
              temconfig = JSON.parse(temconfig);
              for(let tem of temconfig){
                if(tem.x != undefined){
                  //是拖拽式的，将宽高转换成像素
                  tem.x = parseInt((tem.x * this.mainContent.width / 100).toFixed(0));
                  tem.y = parseInt((tem.y * this.mainContent.height / 100).toFixed(0));
                  tem.w = parseInt((tem.w * this.mainContent.width / 100).toFixed(0));
                  tem.h = parseInt((tem.h * this.mainContent.height / 100).toFixed(0));
                }
              }
              this.domConfig = temconfig;
              this.index = this.domConfig.length;//拖拽的key
              //各个模块根据dataKey加载数据
              var index = 0;//图表echartArr下标
              for(let i = 0;i<temconfig.length;i++){
                var key = temconfig[i].key;
                if(key != null){
                  //如果是数据表
                  if(key == 'list' || key == 'data'){
                    let dk = {
                      dataKey:temconfig[i].dataKey,
                      boxTitle:temconfig[i].boxTitle,
                      queryparams:this.queryparams
                    }
                    var para = {
                      index:i
                    }
                    var parafun = function(para,$qs){
                      getDataByDataKey($qs.stringify(dk)).then(response => {
                        if(parseInt(response.data.code) == 200 && response.data.data != undefined && response.data.data != '[]') {
                          if(response.data.data != ""){
                            let result = response.data.data;
                            if(JSON.stringify(result).indexOf("xkey") != -1){ //如果是典型列表
                              /*var data = _this.COMMONFUN.formatDataToEchart(JSON.parse(response.data.data));
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTables(data);*/
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(typeof result == "object" ? result : JSON.parse(response.data.data),true);//带xkey的
                            }else{
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(typeof result == "object" ? result : JSON.parse(response.data.data),false);
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
                      boxTitle:temconfig[i].boxTitle,
                      queryparams:this.queryparams
                    }
                    var para = {
                      index:index,
                      model:temconfig[i]
                    }
                    var parafun = function(para,$qs){
                      getDataByDataKey($qs.stringify(dk)).then(response => {
                        if(parseInt(response.data.code) == 200 && response.data.data != undefined && response.data.data != '[]') {
                          var key = para.model.key;
                          _this.ec = _this.$echarts.init(document.getElementById(para.model.id));
                          _this.ecObj = _this.GLOBAL.allChartObj[key];
                          if(response.data.data ==undefined){
                            return;
                          }
                          let result = response.data.data;
                          var parseData = typeof result == "object" ? result : JSON.parse(result);
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

      //监听拖动
      drop (event) {
        if(this.isActiveid != undefined){
          this.$message({
            type: 'error',
            message: '请先结束编辑当前模块'
          });
          return;
        }
        let mainContent=document.getElementsByClassName('mainContent')[0];
        let mainContentW=mainContent.clientWidth||mainContent.offsetWidth;
        let unitWidth=parseInt(mainContentW/12);
        let x = event.layerX;//鼠标位置
        let y = event.layerY;
        let id = "s"+Date.parse(new Date());
        let key = this.$refs.operation_form.currKey;//图表类型
        let boxTitle = this.$refs.operation_form.form.boxTitle;
        let dataKey = this.$refs.operation_form.form.dataKey;
        var data;
        var _this = this;
        if(key == "list" || key == "data"){
          data = {
            legend:['展示数据','展示数据','展示数据','展示数据'],
            data:[
              ["35","35","343","234"],
              ["35","35","343","234"]
            ]
          }
          let item = {"x":x,"y":y,"w":400,"h":200,id:id,boxTitle:boxTitle,key:key,dataKey:dataKey,data:data};
          this.index++;
          this.domConfig.push(item);
          this.$refs.operation_form.currId = id;
        }else{
          let item = {"x":x,"y":y,"w":400,"h":200,id:id,boxTitle:boxTitle,key:key,dataKey:dataKey,data:data};
          this.index++;
          this.domConfig.push(item);
          this.$refs.operation_form.currId = id;
          //示例图
          setTimeout(function(){
            _this.ec = _this.$echarts.init(document.getElementById(id));
            _this.ecObj = _this.GLOBAL.allChartObj[key];
            _this.ec.setOption(_this.ecObj);
          },400)
        }
        this.isActive = id;
        this.isActiveid = id;
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
  .vue-grid-layout {
    position: relative;
    width:100%;
    height:100%;
    /*overflow: hidden;*/
  }
  .vue-grid-layout>div {
    position: absolute;
  }
  .mainContent{width:100%}
  .cdrsty{/*overflow: hidden 会导致拉伸有问题*/}
</style>
