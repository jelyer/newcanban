const data1 = [1, 2, 3, 4, 5, 6, 7];
const data2 =[500, 480, 200, 250, 350, 186, 440,130];
const data3 =[100, 280, 300, 350, 550, 126, 470,335];
const fixedChart=[
  {
    url: "c1",
    key: "c1"
  },
  {
    url: "c2",
    key: "c2"
  },
  {
    url: "c3",
    key: "c3"
  },
  {
    url: "c4",
    key: "c4"
  },
];
const allChartObj =[

  {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius: ['40%', '55%'],
        avoidLabelOverlap: false,
        silent:true,
        label: {
          normal: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.3)"
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
            show: false
          }
        },
        hoverAnimation :false,
        itemStyle:{
          normal:{
            color: function (value){
              return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            }
          }
        },
        data:[]
      }
    ]
  },//环形图
  {
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
      },
        {
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
      name: '单位',
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

    series: [{
      name: '深圳仓',
      type: 'line',
      data: data2
    },{
      name: '北京仓',
      type: 'line',
      data: data3
    }
    ]
  },//正常折线图

  {
    /*title:'',*/
    tooltip: {
      show:false,
    },
    grid: {
      left: '10',
      bottom: '10',
      top: '35',
      right: '10',
      containLabel: true
    },
    xAxis: {
      name: '',
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
    yAxis: [{
      name: '单位',
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
      }
    }],
    series: {
      name: '销量',
      type: 'bar',
      data: data2,
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
        }
      },
    }
  },//柱状图

  {
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
        normal: {
          show: false,

        }
      },
      name: '',
      type: 'line',
      smooth: false,
      data: data2
    }
  },//无y有网格线折线图
  {
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
        name: '姓名',
        type: 'pie',
        radius : '55%',
        center: ['50%', '50%'],
        silent:true,
        data: [],
        label: {
          normal: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.3)"
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
  },//饼图
  {
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
        silent:true,
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
  },//嵌套环形图
  {
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
        silent:true,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: false
          },
          emphasis: {
            show: true
          }
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
  },//层级饼图
  {
    color: ['#003366', '#006699', '#4cabce', '#e5323e'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Forest', 'Steppe', 'Desert', 'Wetland']
    },
    toolbox: {
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
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisTick: {show: false},
        data: ['2012', '2013', '2014', '2015', '2016']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
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
  },//多个柱状图


];

export default {
  data1,
  data2,
  fixedChart,
  allChartObj,
}
