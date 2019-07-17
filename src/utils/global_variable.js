const data1 = [1, 2, 3, 4, 5, 6, 7];
const data2 =[500, 480, 200, 250, 350, 186, 440];
const data3 =[100, 280, 300, 350, 550, 126, 470];
/**
 * @type {[null,null,null,null,null]}
 */
const fixedChart=[
  {url: "cd", name:"直观数据", key: 'data'},
  {url: "c0", name:"数据表", key: 'list'},
  {url: "c1", name:"环装图", key: 'ring'},
  {url: "c2", name:"折线图", key: 'line'},
  {url: "c3", name:"柱状图", key: 'bar'},
  {url: "c4", name:"纵向柱状图", key: 'ybar'},
  {url: "c2", name:"无y网格线折线图", key: 'netline'},
  {url: "c8", name:"饼状图", key: 'pie'},
  {url: "c6", name:"多条折线图", key: 'nline'},
  {url: "c7", name:"多条柱状图", key: 'nbar'},
];
/**
 * @type {[null,null,null,null,null,null,null,null]}
 */
const allChartObj ={

  //0-环形图
  ring : {
    /*color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],*/
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        /*name:'统计',*/
        type:'pie',
        radius: ['40%', '55%'],
        avoidLabelOverlap: false,
        /*silent:true,*/
        label: {
          normal: {
            textStyle: {
              color: "#fff"
            },
            formatter:"{b} \n  {d}%",
          },
          /*emphasis: {
            show: true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          }*/
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        hoverAnimation :true,
       /* itemStyle:{
          normal:{
            color: function (value){
              return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            }
          }
        },*/
        data:[
          {name:'item1',value:10},
          {name:'item2',value:10},
          {name:'item3',value:10},
        ]
      }
    ]
  },

//1-折线图
  line:{
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    tooltip: {
      show: false,
    },
    grid: {
      left: '5%',
      bottom: '6%',
      top: '20%',
      right: '5%',
      containLabel: true
    },
    xAxis: {
      axisLabel: {
        interval: 0,
        margin: 7,
        color: "#fff",
      },
      name: '',
      type: 'category',
      boundaryGap: true,
      nameTextStyle: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#cccccc',
        },
      },
      axisTick: {
        alignWithLabel: true
      },
      data: data1
    },
    yAxis: {
      axisLabel: {
        color: "#fff",
      },
      /*name: '单位',*/
      type: 'value',
      nameTextStyle:{
        color:'#fff',
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#cecece', type: 'dashed'
        }
      }, //网格线
      axisLine: {
        /*show: false*/
      },
      /*scale: true,*/            //y轴起点是否根据最下值来定
      axisTick: {
        show: false,
      }
    },
    series: [{
      name: '深圳仓',
      type: 'line',
      itemStyle: {
        normal: {
          show: false,//鼠标悬停时显示label数据
          color: {"x":0,"y":0,"x2":0,"y2":1,"type":"linear","global":false,"colorStops":[{"offset":0,"color":"#3caff2"},{"offset":1,"color":"#3caff2"}]}
        }
      },
      data: data2
    }]
  },

// 2-柱状图
  bar:{
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    /*title:'',*/
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'}
      /*show:false,*/
    },
    grid: {
      left: '10',
      bottom: '10',
      top: '20',
      right: '10',
      containLabel: true
    },
    xAxis: {
      /*name: '单位',*/
      min: 0,
      type: 'category', //纵向柱状图，若需要为横向，则此处值为'value'， 下面 yAxis 的type值为'category'
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      },
      data: data1,
    },
    yAxis: [{
      /*name: '单位',*/
      type: 'value',
      splitArea: { show: false },
      splitLine: {show: false ,},//去除网格线
      nameTextStyle:{
        color:'#999',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    }],
    series: {
      name: '销量',
      type: 'bar',
      barMaxWidth: 15,
      itemStyle: {
        normal: {
          show: false,//鼠标悬停时显示label数据
          color:'',
          color: {"x":0,"y":0,"x2":0,"y2":1,"type":"linear","global":false,"colorStops":[{"offset":0,"color":"#44cbf5"},{"offset":0.25,"color":"#44cbf5"},{"offset":0.251,"color":"#3caff2"},{"offset":0.5,"color":"#3caff2"},{"offset":0.501,"color":"#318bd8  "},{"offset":0.75,"color":"#318bd8 "},{"offset":0.751,"color":"#2669c5"},{"offset":1,"color":"#2669c5"}]}
        },
        emphasis: {
          color: {"x":0,"y":0,"x2":0,"y2":1,"type":"linear","global":false,"colorStops":[{"offset":0,"color":"#2378f7"},{"offset":0.7,"color":"#2378f7"},{"offset":1,"color":"#83bff6"}]}
        }
      },
      data: data2
    }
  },
//3、纵向柱状图
  ybar : {
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    /*title:'',*/
    tooltip: {show:false,},
    grid: {
      left: '10', bottom: '10', top: '35', right: '10', containLabel: true
    },
    yAxis: {
      /*name: '单位',*/
      min: 0,
      type: 'category', //纵向柱状图，若需要为横向，则此处值为'value'， 下面 yAxis 的type值为'category'
      data: data1,
      nameTextStyle:{
        color:'#cbcbcb'
      },
      axisLine: {
        lineStyle: {
          color: '#363e43'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#cbcbcb'
        }
      },
    },
    xAxis: [{
      name: '',
      min: 0,
      type: 'value',
      splitArea: { show: false },
      splitLine: {
        show: false ,
      },//去除网格线
      nameTextStyle:{
        color:'#cbcbcb',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#cbcbcb'
        }
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        textStyle: {
          color: '#cbcbcb'
        }
      },
      data:data1,
    }],
    series: {
      name: '销量',
      type: 'bar',
      barWidth: 15,
      itemStyle: {
        normal: {
          show: false,//鼠标悬停时显示label数据
          color:'',
          /*color: new this.$echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {offset: 0, color: '#44cbf5'},
              {offset: 1, color:'#2669c5'}
            ]
          )*/
        },

      },
      itemStyle: {
        normal: {
          show: false,//鼠标悬停时显示label数据
          color: {"x":0,"y":0,"x2":0,"y2":1,"type":"linear","global":false,"colorStops":[{"offset":0,"color":"#44cbf5"},{"offset":0.5,"color":"#3caff2"},{"offset":0.75,"color":"#318bd8"},{"offset":1,"color":"#2669c5"}]}
        },
        emphasis: {
          color: {"x":0,"y":0,"x2":0,"y2":1,"type":"linear","global":false,"colorStops":[{"offset":0,"color":"#2378f7"},{"offset":0.7,"color":"#2378f7"},{"offset":1,"color":"#83bff6"}]}
        }
      },
      data: data2,
    }
  },

//4、无y有网格线折线图
  netline : {
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    tooltip: {
      show: false,
    },
    grid: {
      left: '10%',
      bottom: '10%',
      top: '15%',
      right: '10%',
      containLabel: true
    },

    xAxis: {
      axisLabel: {
        interval: 0,
        margin: 7,
        color: "#fff",
      },
      name: '',
      type: 'category',
      boundaryGap: true,
      nameTextStyle: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#cccccc',
        },
      },
      axisTick: {
        alignWithLabel: true
      },
      data: data1
    },

    yAxis: {
      axisLabel: {
        color: "#fff",
      },
      name: '',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: '#cecece',
          type: 'dashed'
        }
      }, //网格线
      axisLine: {
        show: false
      },
      scale: true,
      axisTick: {
        show: false,
      }
    },
    series: {
      label: {
        normal: {show: false,}
      },
      name: '',
      type: 'line',
      smooth: false,
      data: data2
    }
  },

//5、饼图
  pie:{
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    /*title : {
      text: '同名数量统计',
      subtext: '纯属虚构',
      x:'center'
    },*/
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
      {
        name: '模块',
        type: 'pie',
        radius : '55%',
        center: ['50%', '50%'],
        silent:false,
        data: [
          {name:'item1',value:10},
          {name:'item2',value:10},
          {name:'item3',value:10},
        ],
        label: {
          normal: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.8)"
            },
            formatter:"{b} \n  {d}%",
          },
        },
        itemStyle: {
          normal:{
            color: function (value){
              return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            }
          }
        }
      }
    ]
  },
//6、多条折线图
  nline:{
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    tooltip: {
      show: false,
    },
    legend: {
      data:[{
        name:'深圳仓',
        icon: 'circle',
        textStyle: {
          color: '#fff'
        }
      }, {
        name:'北京仓',
        icon: 'circle',
        textStyle: {
          color: '#fff'
        }
      },]
    },
    grid: {
      left: '5%',
      bottom: '6%',
      top: '20%',
      right: '5%',
      containLabel: true
    },

    xAxis: {
      axisLabel: {
        interval: 0,
        margin: 7,
        color: "#fff",
      },
      name: '',
      type: 'category',
      boundaryGap: true,
      nameTextStyle: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#cccccc',
        },
      },
      axisTick: {
        alignWithLabel: true
      },
      data: data1
    },
    yAxis: {
      axisLabel: {
        color: "#fff",
      },
      /*name: '单位',*/
      type: 'value',
      nameTextStyle:{
        color:'#fff',
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#cecece',
          type: 'dashed'
        }
      }, //网格线
      axisLine: {
        /*show: false*/
      },
      /*scale: true,*/            //y轴起点是否根据最下值来定
      axisTick: {
        show: false,
      }
    },
    series: [
      {name: '深圳仓', type: 'line', data: data2},
      {name: '北京仓', type: 'line', data: data3}
    ]
  },
//7、多个柱状图
  nbar : {
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {type: 'shadow'}
    },
    legend: {
      itemWidth:10,
      /*left:'5%',*/
      data:[
        {
          name:'Forest',
          icon: 'circle',
          textStyle: {
            color: '#fff'
          }
        }, {
          name:'Steppe',
          icon: 'circle',
          textStyle: {
            color: '#fff'
          }
        }, {
          name:'Desert',
          icon: 'circle',
          textStyle: {
            color: '#fff'
          }
        }, {
          name:'Wetland',
          icon: 'circle',
          textStyle: {
            color: '#fff'
          }
        }
      ]
      //data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    grid: {
      left: '5%',
      bottom: '5%',
      top: 30,
      right: '5%',
      containLabel: true
    },

  /*  toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },*/
    calculable: true,
    xAxis: {
      axisLabel: {
        interval: 0,
        margin: 7,
        color: "#999",
      },
      name: '',
      type: 'category',
      boundaryGap: true,
      nameTextStyle: {
        color: '#999'
      },
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
      axisTick: {
        alignWithLabel: true
      },
      data: ['2012', '2013', '2014', '2015', '2016']
    },
    yAxis: {
      axisLabel: {
        color: "#999",
      },
      /*name: '单位',*/
      type: 'value',
      nameTextStyle:{
        color:'#999',
      },
      splitLine:{
        show:false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#999'
        }
      },
      axisTick: {
        show: true
      },

    },
    series: [
      {
        name: 'Forest',
        type: 'bar',
        barGap: 0,
        /*label: labelOption,*/
        data: [320, 332, 301, 334, 390]
      },
      {
        name: 'Steppe',
        type: 'bar',
        /*label: labelOption,*/
        data: [220, 182, 191, 234, 290]
      },
      {
        name: 'Desert',
        type: 'bar',
        /*label: labelOption,*/
        data: [150, 232, 201, 154, 190]
      },
      {
        name: 'Wetland',
        type: 'bar',
        /*label: labelOption,*/
        data: [98, 77, 101, 99, 40]
      }
    ]
  },
//嵌套环形图
  nring:{
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        silent:false,
        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data:[
          {value:335, name:'直达'},
          {value:679, name:'营销广告'},
          {value:1548, name:'搜索引擎'}
        ]
      },
      {
        name:'访问来源',
        type:'pie',
        radius: ['40%', '55%'],
        silent:true,
        data:[
          {value:335, name:'直达'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:135, name:'123'},
          {value:1048, name:'百度'},
          {value:251, name:'谷歌'},
          {value:147, name:'必应'},
          {value:102, name:'其他'}
        ]
      }
    ]
  },


//层级饼图
  npie : {
    color:['#3caff2','#ffdf8b','#61e064','#0b4383','#ff3126','#f6ff61','#3b3bc9','#ffb31f','#5efcbf','#61e064'],
    /*title : {
      text: '南丁格尔玫瑰图',
      subtext: '纯属虚构',
      x:'center'
    },*/
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      x : 'center',
      y : 'bottom',
      data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        dataView : {show: true, readOnly: false},
        magicType : {
          show: true,
          type: ['pie', 'funnel']
        },
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    calculable : true,
    series : [
      {
        name:'半径模式',
        type:'pie',
        radius : [20, 110],
        center : ['25%', '50%'],
        roseType : 'radius',
        silent:false,
        label: {
          normal: {show: false},
          emphasis: {show: true}
        },
        lableLine: {
          normal: {show: false},
          emphasis: {show: true}
        },
        data:[
          {value:10, name:'rose1'},
          {value:5, name:'rose2'},
          {value:15, name:'rose3'},
          {value:25, name:'rose4'},
          {value:20, name:'rose5'},
          {value:35, name:'rose6'},
          {value:30, name:'rose7'},
          {value:40, name:'rose8'}
        ]
      },
      /* {
         name:'面积模式',
         type:'pie',
         radius : [30, 110],
         center : ['75%', '50%'],
         roseType : 'area',
         silent:true,
         data:[
           {value:10, name:'rose1'},
           {value:5, name:'rose2'},
           {value:15, name:'rose3'},
           {value:25, name:'rose4'},
           {value:20, name:'rose5'},
           {value:35, name:'rose6'},
           {value:30, name:'rose7'},
           {value:40, name:'rose8'}
         ]
       }*/
    ]
  }
};

export default {
  data1,
  data2,
  fixedChart,
  allChartObj,
}

