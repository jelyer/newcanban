<template>
  <div class="box1">
    <img class="pagebgsty" src="@/assets/pageBg.png" alt="">
    <div id="mainBox" class="mainBox" style="z-index:100;position:absolute">
      <div class="bigTitle">
        <img class="titlebgstr" src="@/assets/titleBg.png" alt="">
        <h1 class="bigTitleName">{{ mainTitle }}  <i v-show="dataloading" style="position:absolute;right:0" class="el-icon-loading"/></h1>
        <p>{{ date }}</p>
      </div>
      <div class="mainContent">
        <div class="secondBox">
          <div :class="[{active: isActive == 0 },'secondRight']" @click="toEditDiv(domConfig[0])">
            <p class="boxTitle">{{ domConfig[0].boxTitle }}</p>
            <div class="boxContent">
              <div class="boxContent-div">
                <table-one v-if="domConfig[0].key == 'data'" :dom-config="domConfig[0].data"/>
                <table-two v-if="domConfig[0].key == 'list'" :dom-config="domConfig[0].data"/>
                <div :class="[{isshow: domConfig[0].key == 'data' || domConfig[0].key == 'list' },'chart']" :id="domConfig[0].id"/>
              </div>
              <div class="icoTL"/>
              <div class="icoTR"/>
              <div class="icoBL"/>
              <div class="icoBR"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--右侧设置-->
    <operation-form ref="operation_form" :main-title="mainTitle" :queryparams="queryparams"/>
  </div>
</template>

<script>
import { mixinsMain } from '@/mixins/main'; // 基础调用
import operationForm from '@/components/operationForm/operationForm';
import { getTempById, getDataByDataKey } from '@/api/chartSetting';
import tableOne from '@/components/Kanban/table1';
import tableTwo from '@/components/Kanban/table2';
export default {
  name: 'Template3', // 注入reload方法
  components: {
    operationForm,
    tableOne,
    tableTwo
  }, /* 系统模板三，单一图表展示*/
  mixins: [mixinsMain],
  inject: ['reload'],
  data() {
    return {
      animate: false, // 是否滚动
      pageId: undefined,
      isModle: true, // 是否是模板页面
      tempurl: '/template3', // 模板
      echartArr: [], // ec Dom id
      echartObjArr: [], // 缓存ec数据
      eclist: [], // 换成ec对象
      ec: undefined, // echart实例化对象
      ecObj: undefined, // ec配置属性
      // isFirst:true,
      isActive: undefined,
      reloadbl: true, // 是否可以刷新本页
      mainTitle: '单个图表看板',
      nowDivIndex: ' ', // 要编辑的div的编号
      nowDivKey: '',
      pageData: '', // 渲染页面的数据
      date: undefined,
      timer: undefined, // 标题下面的时间定时器
      timereload: undefined, // 页面定时刷新数据
      dataloading: false, // 数据加载loading
      domConfig: [
        {
          id: 'secondRight',
          boxTitle: '快递订单完成情况',
          key: 'list',
          dataKey: null,
          data: {
            'legend': ['单据状态', '任务批次号', '优先级别', '生成日期', '分拣完成进度', '分配时间', '任务类型'],
            'data': [
              ['', 'ST20041300004', '普通任务', '2020-04-13', 0, '0', '补货'],
              ['拣货中', 'PK19111500006', '普通任务', '2019-11-15', 100, '0', '拣货'],
              ['拣货中', 'PK19111500007', '普通任务', '2019-11-15', 100, '0', '拣货'],
              ['拣货中', 'PK19111500008', '普通任务', '2019-11-15', 100, '0', '拣货'],
              ['拣货中', 'PK19111500009', '普通任务', '2019-11-15', 100, '0', '拣货'],
              ['拣货中', 'PK19111900001', '普通任务', '2019-11-19', 100, '0', '拣货'],
              ['拣货中', 'PK19120400020', '普通任务', '2019-12-04', 100, '2019-12-04', '拣货'],
              ['拣货中', 'PK20011100005', '普通任务', '2020-01-11', 0, '2020-01-13', '拣货'],
              ['拣货中', 'PK20021700001', '普通任务', '2020-02-17', 0, '0', '拣货'],
              ['拣货中', 'PK20021700002', '普通任务', '2020-02-17', 0, '2020-02-17', '拣货'],
              ['拣货中', 'PK20021700003', '普通任务', '2020-02-17', 0, '2020-02-17', '拣货'],
              ['拣货中', 'PK20021700005', '普通任务', '2020-02-17', 0, '2020-02-20', '拣货'],
              ['拣货中', 'PK20021700006', '普通任务', '2020-02-17', 0, '2020-02-17', '拣货'],
              ['拣货中', 'PK20021700007', '普通任务', '2020-02-17', 0, '2020-02-17', '拣货'],
              ['拣货中', 'PK20022000003', '普通任务', '2020-02-20', 0, '2020-02-20', '拣货'],
              ['拣货中', 'PK20022000007', '普通任务', '2020-02-20', 0, '2020-04-03', '拣货'],
              ['拣货中', 'PK20031900001', '普通任务', '2020-03-19', 0, '2020-04-08', '拣货'],
              ['拣货中', 'PK20040100003', '普通任务', '2020-04-01', 100, '2020-04-09', '拣货'],
              ['拣货中', 'PK20040800026', '普通任务', '2020-04-08', 0, '2020-04-08', '拣货'],
              ['', 'PK20041300014', '普通任务', '2020-04-13', 0, '0', '拣货'],
              ['', 'PK20041400010', '普通任务', '2020-04-14', 0, '0', '拣货'],
              ['', 'PK20041500011', '普通任务', '2020-04-15', 0, '0', '拣货'],
              ['', 'PK20041500012', '普通任务', '2020-04-15', 0, '0', '拣货']
            ]
          }
        }
      ],
      form: {
        boxTitle: '', // 表标题
        key: '', // 图表类型
        dataKey: '' // 图表数据
      },
      nowEditDivId: '',
      nowEditChartId: '',
      queryparams: '' // 查询参数
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    optionSingleHeight() {
      return {
        singleHeight: 26
      };
    }
  },
  watch: {
    // "$route":"reloadPage",    //监听路由变化
    '$store.state.app.isScreen': 'screenGetData',
    '$store.state.app.sidebar.opened': 'isEdit', // 监听是否可编辑
    '$store.state.app.reloadData': 'getData'// 监听刷新页面
  },
  created() {
    var pageId = this.$route.query.pageId;// 页面Id
    if (pageId != undefined) {
      this.mainTitle = '';
      this.pageId = pageId;
      this.isModle = false;
      this.domConfig[0].boxTitle = '';
      this.domConfig[0].data = [];
    }
  },
  mounted() {
    if (this.pageId != undefined) {
      this.getData();// 业务模板数据
    } else {
      this.DrawTemplateData();// 渲染模板页数据
    }
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
    // 模板页数据
    DrawTemplateData() {
      this.eclist = [];
      for (let chart of this.domConfig) {
        if (chart.key != 'data' && chart.key != 'list' && chart.data != null) {
          this.ec = this.$echarts.init(document.getElementById(chart.id));
          this.ecObj = this.GLOBAL.allChartObj[chart.key];
          this.COMMONFUN.setOptionByKey(this.ecObj, chart.key, chart.data);
          this.ec.setOption(this.ecObj);
          this.eclist.push(this.ec);
        }
      }
    },

    // 编辑时，禁止刷新页面
    isEdit() {
      this.reloadbl = !this.reloadbl;
      this.isActive = undefined;
    },
    screenGetData() {
      for (let c in this.eclist) {
        this.eclist[c].resize();// 从新加载图表，自适应宽高
      }
    },
    getData() {
      // 清空页面初始值
      for (let i = 0; i < this.echartArr.length; i++) {
        this.$echarts.init(document.getElementById(this.echartArr[i])).clear();
      }
      this.getTempDataById(this.pageId);
      // Object.assign(this.$data, this.$options.data());//清空页面数据
    },
    // 获取页面数据，以及渲染数据
    drawLine: function(response) {
      this.mainTitle = response.data.pageTitle;
      this.$refs.operation_form.mainTitle = this.mainTitle;
    },
    // 点击需要编辑的div后  param: 元素id
    toEditDiv: function(ele) {
      var index = this.COMMONFUN.contains(this.domConfig, ele);// 当前模块下标
      // eslint-disable-next-line no-unused-vars
      let eleId = ele.id;
      this.$refs.operation_form.currModelIndex = index;
      this.$refs.operation_form.currKey = ele.key;// 当前图表类型
      this.$refs.operation_form.currId = ele.id;// 当前选择的Id
      this.$refs.operation_form.currDataKey = ele.dataKey;// 当前图表数据源编码
      this.$refs.operation_form.form.boxTitle = ele.boxTitle;// 模块标题
      let theStatus = document.getElementsByClassName('app-wrapper')[0];
      if (theStatus.getAttribute('class').indexOf('openSidebar') == -1) {
        this.isActive = index;
      }
    },
    // 根据模板id查找模板配置数据
    getTempDataById(pageId) {
      let paramid = {
        tempid: pageId
      };
      var _this = this;
      this.echartArr = [];
      this.echartObjArr = [];
      this.eclist = [];
      this.dataloading = true;
      getTempById(this.$qs.stringify(paramid)).then(response => {
        setTimeout(function() {
          _this.dataloading = false;
        }, 1500);
        if (response.data.code == 200 && response.data.data) {
          // 是否模板页面
          if (response.data.data.tempstat == 1) {
            this.isModle = true;
          } else {
            this.isModle = false;
          }
          // 查询参数
          if (response.data.data.queryparams) {
            this.queryparams = response.data.data.queryparams;
          }
          // 渲染数据
          this.mainTitle = response.data.data.tempname;
          var temconfig = response.data.data.tempconfig;
          if (temconfig != null && temconfig != '') {
            temconfig = JSON.parse(temconfig);
            this.domConfig = temconfig;
            // 各个模块根据dataKey加载数据
            var index = 0;// 图表echartArr下标
            for (let i = 0; i < temconfig.length; i++) {
              var key = temconfig[i].key;
              if (key != null) {
                // 如果是数据表
                if (key == 'list' || key == 'data') {
                  let dk = {
                    dataKey: temconfig[i].dataKey,
                    boxTitle: temconfig[i].boxTitle,
                    queryparams: this.queryparams
                  };
                  var para = {
                    index: i
                  };
                  var parafun = function(para, $qs) {
                    getDataByDataKey($qs.stringify(dk)).then(response => {
                      if (response.data.code == 200 && response.data.data != undefined && response.data.data != '[]') {
                        if (response.data.data != '') {
                          let result = response.data.data;
                          if (JSON.stringify(result).indexOf('xkey') != -1) { // 如果是典型列表
                            /* var data = _this.COMMONFUN.formatDataToEchart(JSON.parse(response.data.data));
                              _this.domConfig[para.index].data = _this.COMMONFUN.formatTables(data);*/
                            _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(typeof result == 'object' ? result : JSON.parse(response.data.data), true);// 带xkey的
                          } else {
                            _this.domConfig[para.index].data = _this.COMMONFUN.formatTotable(typeof result == 'object' ? result : JSON.parse(response.data.data), false);
                          }
                        }
                      }
                    });
                  };
                  parafun(para, this.$qs);
                } else {
                  // 如果是图表
                  let dk = {
                    dataKey: temconfig[i].dataKey,
                    boxTitle: temconfig[i].boxTitle,
                    queryparams: this.queryparams
                  };
                  // eslint-disable-next-line no-redeclare
                  var para = {
                    index: index,
                    model: temconfig[i]
                  };
                  // eslint-disable-next-line no-redeclare
                  var parafun = function(para, $qs) {
                    getDataByDataKey($qs.stringify(dk)).then(response => {
                      if (response.data.code == 200 && response.data.data != undefined && response.data.data != '[]') {
                        var key = para.model.key;
                        _this.ec = _this.$echarts.init(document.getElementById(para.model.id));
                        _this.ecObj = _this.GLOBAL.allChartObj[key];
                        if (response.data.data == undefined) {
                          return;
                        }
                        let result = response.data.data;
                        var parseData = typeof result == 'object' ? result : JSON.parse(result);
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
    }
  }
};

</script>
<style scoped>
  .boxTitle{height: 25%;color: #3190cb;font-size: 1.1rem;  text-align: left;  line-height: 2.4rem;  }
  .boxContent{  height: 75%;  width: 100%;  border: 1px solid #0d1743;  display: block;  position: relative;}
  .boxContent-div{  width: 100%;  height: 100%;  cursor: auto;}
  .secondBox{  height:100% ;  }
  .secondRight{  width: 100%;  height: 100%;  float: left;  }
  .secondBox .boxTitle{  height:14% ;  }
  .secondBox .boxContent{  height:85% ;  }
</style>
