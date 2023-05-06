<template>
  <div class="box1">
    <img class="pagebgsty" src="@/assets/pageBg.png" alt="">
    <div id="mainBox" class="mainBox" style="z-index:100;position:absolute">
      <div class="bigTitle">
        <img class="titlebgstr" src="@/assets/titleBg.png" alt="">
        <img class="titlebgstr skin-mode-2" src="@/assets/titleBg3.png" alt="">
        <h1 class="bigTitleName" v-text="mainTitle"/>
        <p>{{ date }}</p>
      </div>
      <!--firstLeftTop-->
      <div
        :class="[{onScreen},'mainContent mixin-components-container']"
        @drop="drop"
        @dragover="dragover">
        <grid-layout
          :width="1000"
          :layout.sync="domConfig"
          :col-num="parseInt(colNum)"
          :row-height="rowHeight"
          :is-draggable="draggable"
          :is-resizable="resizable"
          :is-mirrored="mirrored"
          :vertical-compact="true"
          :use-css-transforms="true"
          :responsive="responsive"
          :margin="[10, 10]"
          :max-rows="100"
          :auto-size="false"
          @layout-created="layoutCreatedEvent"
          @layout-before-mount="layoutBeforeMountEvent"
          @layout-mounted="layoutMountedEvent"
          @layout-ready="layoutReadyEvent"
          @layout-updated="layoutUpdatedEvent"
        >
          <grid-item
            v-contextmenu:contextmenu
            v-for="item in domConfig"
            :key="item.i"
            :item-id="'item'+item.i"
            :ids="item.id"
            :class="[{active: isActive == item.id },'tzdiv']"
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
            <p class="boxTitle" @click="toEditDiv(item)">{{ item.boxTitle }}</p>
            <div class="boxContent" @click="toEditDiv(item)">
              <div class="boxContent-div">
                <table-one v-if="item.key == 'data'" :dom-config="item.data"/>
                <table-two v-if="item.key == 'list'" :dom-config="item.data"/>
                <div :class="[{isshow: item.key == 'data' || item.key == 'list' },'chart']" :id="item.id"/>
              </div>
              <div class="icoTL"/>
              <div class="icoTR"/>
              <div class="icoBL"/>
              <div class="icoBR"/>
            </div>
            <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
            <!--<test-element :text="item.i"></test-element>-->
            <!--<button @click="clicked">CLICK ME!</button>-->
          </grid-item>
        </grid-layout>

      </div>
    </div>

    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="handleClick">删除</v-contextmenu-item>
    </v-contextmenu>

    <!--右侧设置-->
    <operation-form ref="operation_form" :main-title="mainTitle"/>
  </div>
</template>

<script>
import operationForm from '@/components/operationForm/operationForm';
import { getSourDataAll, getTempById, getDataByDataKey } from '@/api/chartSetting';
import tableOne from '@/components/Kanban/table1';
import tableTwo from '@/components/Kanban/table2';
import { GridLayout, GridItem } from 'vue-grid-layout';
var InitialWdth = 400;
var Initialheight = 250;
export default {
  name: 'Template',
  inject: ['reload'], // 注入reload方法
  components: {
    operationForm,
    GridLayout,
    GridItem,
    tableOne,
    tableTwo
  },
  data() {
    return {
      animate: false, // 是否滚动
      pageId: undefined,
      isModle: true, // 是否是模板页面
      tempurl: '/template', // 模板
      echartArr: [], // ec Dom id
      echartObjArr: [], // 缓存ec数据
      eclist: [], // 换成ec对象
      ec: undefined, // echart实例化对象
      ecObj: undefined, // ec配置属性
      // isFirst:true,
      isActive: undefined,
      mainTitle: '',
      allData: [],
      nowDivIndex: ' ', // 要编辑的div的编号
      nowDivKey: '',
      pageData: '', // 渲染页面的数据
      date: undefined,
      timer: undefined, // 标题下面的时间定时器
      timereload: undefined, // 页面定时刷新数据
      reloadbl: true, // 是否可以刷新本页
      onScreen: false,
      form: {
        boxTitle: '', // 表标题
        key: '', // 图表类型
        dataKey: '' // 图表数据
      },
      nowEditDivId: '',
      nowEditChartId: '',
      // 拖拽布局##################################################################
      domConfig: [
        /*          {"x":0,"y":0,"w":4,"h":6,"i":"0", resizable: true, draggable: true, static: false,id:'itemBox0',boxTitle:"快递订单完成情况0",key:'list',dataKey:null,data:null},
          {"x":1,"y":1,"w":2,"h":2,"i":"1", resizable: null, draggable: null, static: false,id:'itemBox1',boxTitle:"快递订单完成情况1",key:'data',dataKey:null,data:null},
          {"x":4,"y":0,"w":2,"h":5,"i":"2", resizable: true, draggable: false, static: false,id:'itemBox2',boxTitle:"快递订单完成情况2",key:'list',dataKey:null,data:null},*/
      ],
      draggable: false, // 是否可拖拽
      resizable: false, // 是否可缩放
      mirrored: false,
      responsive: true,
      rowHeight: 30,
      colNum: 12,
      index: 0,
      currId: undefined // 当前选的的id
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    }
  },
  watch: {
    '$route': 'reloadPage', // 监听路由变化
    '$store.state.app.isScreen': 'screenGetData', // 监听是否全屏
    '$store.state.app.sidebar.opened': 'isEdit'// 监听是否可编辑
  },
  created() {
    var pageId = this.$route.query.pageId;// 页面Id
    if (pageId != undefined) {
      this.pageId = pageId;
    }
  },
  mounted() {
    if (this.pageId != undefined) {
      this.getTempDataById(this.pageId);
    }
    // 加载数据源
    this.getAllDatas();
    // 当前时间
    var _this = this;
    _this.date = this.COMMONFUN.parseTime(null, new Date());
    this.timer = setInterval(() => {
      _this.date = this.COMMONFUN.parseTime(null, new Date());
    }, 1000);
    // 设定刷新时间
    let reloadt = localStorage.reloadTime;// 单位分钟
    if (reloadt != undefined) {
      reloadt = parseInt(reloadt);
      if (reloadt > 0) {
        this.timereload = setInterval(() => {
          if (_this.reloadbl) {
            _this.getData();// 刷新数据
            this.$message({
              message: '刷新数据',
              type: 'success'
            });
          }
        }, reloadt * 1000 * 60);
      }
    }
    // 拖拽布局##################################################################
    this.index = this.domConfig.length;
    this.moserovers();
  },
  // 销毁
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.timereload) {
      clearInterval(this.timereload);
    }
  },
  methods: {
    // 编辑时，禁止刷新页面,模块可拖动
    isEdit() {
      this.reloadbl = !this.reloadbl;
      if (this.draggable) {
        this.draggable = false;
        this.resizable = false;
      } else {
        this.draggable = true;
        this.resizable = true;
      }
      this.isActive = undefined;
    },
    // 刷新页面数据
    reloadPage() {
      // this.reload();
      this.getData();
    },
    // 绑定记录鼠标位置
    moserovers() {
      var _this = this;
      // eslint-disable-next-line no-undef
      $('.tzdiv').mouseover(function() {
        // eslint-disable-next-line no-undef
        _this.currId = $(this).attr('ids');
      });
    },
    // 右键菜单点击删除
    handleClick(vm, event) {
      for (let i in this.domConfig) {
        if (this.domConfig[i].id == this.currId) {
          this.domConfig.splice(i, 1);
          break;
        }
      }
    },
    screenGetData() {
      var _this = this;
      // 拖拽模块通过vue-grid-layout重新渲染宽高
      if (this.$store.state.app.isScreen) {
        let width = document.body.clientWidth + (document.body.clientWidth / 6 - 20);
        let height = document.body.clientHeight + (document.body.clientHeight / 6 + 50);
        // eslint-disable-next-line no-undef
        $('.vue-grid-layout').css({ 'width': width, 'height': height });
        // /var aaa = JSON.parse(JSON.stringify(this.domConfig));
        // this.domConfig = [];
        // setTimeout(function(){
        // _this.isreload = true;
        // _this.domConfig = aaa;
        // },2300)
      } else {
        // eslint-disable-next-line no-undef
        $('.vue-grid-layout').css({ 'width': '100%', 'height': '100%' });
      }
      this.onScreen = !this.onScreen;
      setTimeout(function() {
        for (let c in _this.eclist) {
          _this.eclist[c].resize();// 从新加载图表，自适应宽高
        }
      }, 300);
    },
    getData() {
      // 清空页面初始值
      for (let i = 0; i < this.echartArr.length; i++) {
        this.$echarts.init(document.getElementById(this.echartArr[i])).clear();
      }
      Object.assign(this.$data, this.$options.data());// 清空页面数据
      var pageId = this.$route.query.pageId;// 页面Id
      if (pageId != undefined) {
        this.pageId = pageId;
      } else {
        this.isModle = true;
      }
      this.getTempDataById(pageId);
      // 加载数据源
      this.getAllDatas();
    },
    // 获取页面数据，以及渲染数据
    drawLine: function(response) {
      this.mainTitle = response.data.pageTitle;
      this.$refs.operation_form.mainTitle = this.mainTitle;
    },
    // 点击需要编辑的div后  param: 元素id
    toEditDiv: function(ele) {
      var theStatus = document.getElementsByClassName('app-wrapper')[0];
      if (theStatus.getAttribute('class').indexOf('openSidebar') != -1) {
        return;
      }
      var index = this.COMMONFUN.contains(this.domConfig, ele);// 当前模块下标
      var eleId = ele.id;
      this.$refs.operation_form.currModelIndex = index;
      this.$refs.operation_form.currKey = ele.key;// 当前图表类型
      this.$refs.operation_form.currId = ele.id;// 当前选择的Id
      this.$refs.operation_form.currDataKey = ele.dataKey;// 当前图表数据源编码
      this.$refs.operation_form.form.boxTitle = ele.boxTitle;// 模块标题
      this.isActive = eleId;
    },
    // 获取数据源下拉列表
    getAllDatas: function() {
      getSourDataAll().then((response) => {
        if (response.data.code == 200 || response.data.code == '200') {
          this.allData = response.data.data;
        }
      });
    },
    // 根据模板id查找模板配置数据
    getTempDataById(pageId) {
      var paramid = {
        eq_tempid: pageId
      };
      var _this = this;
      this.echartArr = [];
      this.echartObjArr = [];
      this.eclist = [];
      getTempById(this.$qs.stringify(paramid)).then(response => {
        if (response.data.code == 200 || response.data.code == '200') {
          // 是否模板页面
          if (response.data.data.tempstat == 1) {
            this.isModle = true;
          } else {
            this.isModle = false;
          }
          // 渲染数据
          this.mainTitle = response.data.data.tempname;
          var temconfig = response.data.data.tempconfig;
          if (temconfig != null && temconfig != '') {
            temconfig = JSON.parse(temconfig);
            this.domConfig = temconfig;
            setTimeout(function() {
              _this.moserovers();
            }, 300);
            this.index = this.domConfig.length;// 拖拽的key
            // 各个模块根据dataKey加载数据
            var index = 0;// 图表echartArr下标
            for (let i = 0; i < temconfig.length; i++) {
              var key = temconfig[i].key;
              if (key != null) {
                // 如果是数据表
                if (key == 'list' || key == 'data') {
                  let dk = {
                    eq_dataKey: temconfig[i].dataKey,
                    eq_boxTitle: temconfig[i].boxTitle
                  };
                  var para = {
                    index: i
                  };
                  var parafun = function(para, $qs) {
                    getDataByDataKey($qs.stringify(dk)).then(response => {
                      if (parseInt(response.data.code) == 200 && response.data.data != undefined && response.data.data != '[]') {
                        if (response.data.data != '') {
                          if (response.data.data.indexOf('xkey') != -1) { // 如果是典型列表
                            /* var data = _this.COMMONFUN.formatDataToEchart(JSON.parse(response.data.data));
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTables(data);*/
                            _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(JSON.parse(response.data.data), true);// 带xkey的
                          } else {
                            _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(JSON.parse(response.data.data), false);
                          }
                        }
                      }
                    });
                  };
                  parafun(para, this.$qs);
                } else {
                  // 如果是图表
                  let dk = {
                    eq_dataKey: temconfig[i].dataKey,
                    eq_boxTitle: temconfig[i].boxTitle
                  };
                  // eslint-disable-next-line no-redeclare
                  var para = {
                    index: index,
                    model: temconfig[i]
                  };
                  // eslint-disable-next-line no-redeclare
                  var parafun = function(para, $qs) {
                    getDataByDataKey($qs.stringify(dk)).then(response => {
                      if (parseInt(response.data.code) == 200 && response.data.data != undefined && response.data.data != '[]') {
                        var key = para.model.key;
                        _this.ec = _this.$echarts.init(document.getElementById(para.model.id));
                        _this.ecObj = _this.GLOBAL.allChartObj[key];
                        if (response.data.data == undefined) {
                          return;
                        }
                        var parseData = JSON.parse(response.data.data);
                        // console.log("获取的数据")
                        // console.log(parseData)
                        // 缓存id及对应数据
                        _this.echartArr.push(para.model.id);
                        _this.echartObjArr.push(parseData);
                        _this.eclist.push(_this.ec);
                        // 饼状图和环状图
                        // 根据图表类型key配置option
                        _this.COMMONFUN.setOptionByKey(_this.ecObj, key, parseData);// 根据数据和图表类型设置option
                        _this.ec.setOption(_this.ecObj);
                      }
                    });
                  };
                  parafun(para, this.$qs);
                  index++;
                }
              }
            }
          }
        }
      });
    },

    // 拖拽布局##################################################################
    removeItem: function(item) {
      // console.log("### REMOVE " + item.i);
      this.domConfig.splice(this.domConfig.indexOf(item), 1);
    },
    addItem: function() {
      // let self = this;
      // console.log("### LENGTH: " + this.domConfig.length);
      let item = { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': this.index + '', whatever: 'bbb', id: 's' + Date.parse(new Date()) };
      this.index++;
      this.domConfig.push(item);
      this.moserovers();
    },
    move: function(i, newX, newY) {
      // console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resize: function(i, newH, newW, newHPx, newWPx) {
      // console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);

    },
    moved: function(i, newX, newY) {
      // console.log("### MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resized: function(i, newH, newW, newHPx, newWPx) {
      // console.log("### RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    },
    /**
       * Add change direction button
       */
    changeDirection() {
      // eslint-disable-next-line no-undef
      var documentDirection = getDocumentDir();
      let toggle = '';
      if (documentDirection === 'rtl') {
        toggle = 'ltr';
      } else {
        toggle = 'rtl';
      }
      // eslint-disable-next-line no-undef
      setDocumentDir(toggle);
      // eventBus.$emit('directionchange');
    },

    layoutCreatedEvent: function(newLayout) {
      // console.log("Created layout: ", newLayout)
    },
    layoutBeforeMountEvent: function(newLayout) {
      // console.log("beforeMount layout: ", newLayout)
    },
    layoutMountedEvent: function(newLayout) {
      // console.log("Mounted layout: ", newLayout)
    },
    layoutReadyEvent: function(newLayout) {
      // console.log("Ready layout: ", newLayout)
    },
    layoutUpdatedEvent: function(newLayout) {
      // 修改之后
      this.domConfig = newLayout;
    },

    drop(event) {
      // console.log('drop', event)
      let layerX = event.layerX;// 鼠标位置
      let layerY = event.layerY;
      let mainContent = document.getElementsByClassName('mainContent')[0];
      let mainContentW = mainContent.clientWidth || mainContent.offsetWidth;
      /* let mainContentH=mainContent.clientHeight||mainContent.offsetHeight;*/
      let unitWidth = parseInt(mainContentW / 12);
      let x = parseInt(((layerX - InitialWdth / 2) > 0 ? (layerX - InitialWdth / 2) : 0) / unitWidth);
      let y = parseInt(((layerY - Initialheight / 2) > 0 ? (layerY - Initialheight / 2) : 0) / 30);
      let id = 's' + Date.parse(new Date());
      let key = this.$refs.operation_form.form.key;// 图表类型
      let boxTitle = this.$refs.operation_form.form.boxTitle;
      let dataKey = this.$refs.operation_form.form.dataKey;
      var data;
      var _this = this;
      if (key == 'list' || key == 'data') {
        data = {
          legend: ['展示数据', '展示数据', '展示数据', '展示数据'],
          data: [
            ['35', '35', '343', '234'],
            ['35', '35', '343', '234']
          ]
        };
        let item = { 'x': x, 'y': y, 'w': 4, 'h': 6, 'i': this.index + '', whatever: '', id: id, boxTitle: boxTitle, key: key, dataKey: dataKey, data: data };
        this.index++;
        this.domConfig.push(item);
        this.$refs.operation_form.currId = id;
      } else {
        let item = { 'x': x, 'y': y, 'w': 4, 'h': 6, 'i': this.index + '', whatever: '', id: id, boxTitle: boxTitle, key: key, dataKey: dataKey, data: data };
        this.index++;
        this.domConfig.push(item);
        this.$refs.operation_form.currId = id;
        // 示例图
        setTimeout(function() {
          _this.ec = _this.$echarts.init(document.getElementById(id));
          _this.ecObj = _this.GLOBAL.allChartObj[key];
          _this.ec.setOption(_this.ecObj);
        }, 400);
      }
      // 重新绑定鼠标移入，用于删除
      setTimeout(function() {
        _this.moserovers();
      }, 300);
    },
    dragover(event) {
      event.preventDefault();
    }
  }
};

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
</style>
