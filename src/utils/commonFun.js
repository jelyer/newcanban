import {getDataByDataKey} from '@/api/chartSetting'
export default{
  GetRequest:function(){
    let url = location.search; //获取url中"?"符后的字串

    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);

      let strs = endDoit(str).split("&");
      for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },

  /**
   * 根据图表类型key配置option
   * @param ecObj  当前ecObj对象
   * @param key  图表类型
   * @param data  图表数据
   */
  setOptionByKey:function(ecObj,key,data){
    var data = this.formatDataToEchart(data);
    if(key == 'pie' || key == 'ring'){
      ecObj.series[0].data= data;
    }else{
      switch(key){
        case "ybar": //如果是纵向柱状图
          ecObj.yAxis.data = this.toFormatZhu(data).name;
          ecObj.series.data = this.toFormatZhu(data).value;
          break;
        case "nline": //如果是多条折线图
          let datad = this.getChartsData(data,"line");
          ecObj.legend.data = datad.legend;
          ecObj.xAxis.data = datad.xdata;
          ecObj.series = datad.series;
          break;
        case "nbar"://条形柱状图
          let datads = this.getChartsData(data,"bar");
          ecObj.legend.data = datads.legend;
          ecObj.xAxis.data = datads.xdata;
          ecObj.series = datads.series;
          break;
        default:
          ecObj.xAxis.data=this.toFormatZhu(data).name;
          ecObj.series[0].data=this.toFormatZhu(data).value;
      }
    }
  },
  //数据格式转换
  formatDataToEchart:function(data,type){
      if(data.length > 0){
        var list = [];
        var isN = data[0].xkey != undefined;
        if(isN){
          //[{"xkey":"2019","B":2,"C":3},{"xkey":"2018","B":4,"C":5}]转换为{legend:["2019","2018"],data:[ [{"name":"B","value":2},{"name":"C","value":3}], [{"name":"B","value":4},{"name":"C","value":5}]  ]}
          var oo = null;
          var legend = [];
          var dt = [];
          for(var i in data){
            oo = data[i];
            dt = [];
            for(var k in oo){
              if(k == "xkey"){
                legend.push(oo[k]);
              }else{
                dt.push({name:k,value:oo[k]});
              }
            }
            list.push(dt);
          }
          return {"legend" : legend, "data" : list};
        }else{
          if(data[0].name != undefined && data[0].value != undefined){
            //如果格式天然符合，不需要转
            return data;
          }else{
            //[{"A":1,"B":2,"C":3}]转换为[{"name":"A","value":1},{"name":"B","value":2},{"name":"C","value":3}]
            var oo = null;
            for(var i in data){
              oo = data[i];
              for(var k in oo){
                list.push({name:k,value:oo[k]});
              }
            }
            return list;
          }
        }
      }
      return [];
  },
  /**
   * 将数据转化为原始
   * @param data
   */
  formatTotable:function(data,key){
      var nd = {
        legend:[],
        data:[]
      }
      //数据不带xkey的,取第一个为列表的name
      if(!key){
          for(let i in data[0]){
            nd.legend.push(i);
          }
          var item;
          var legendc;
          for(let i in data){
            item = []
            for(let j in nd.legend){
              legendc = nd.legend[j];
              item.push(data[i][legendc]);
            }
            nd.data.push(item)
          }
          return nd;
      }else{
        //带xkey的，就用xkey做name
        nd.legend.push("xkey");//排第一位
        for(let i in data[0]){
          if(i != "xkey"){
            nd.legend.push(i);
          }
        }
        var item;
        var legendc;
        for(let i in data){
          item = []
          for(let j in nd.legend){
            legendc = nd.legend[j];
            item.push(data[i][legendc]);
          }
          nd.data.push(item)
        }
        nd.legend[0] = "名称"
        return nd;
      }

  },
  /**
   * 将数组的{"name":"A","value":1}转化为x/y轴对应值
   * @param data  要转的数据
   */
  toFormatZhu:function(data){
    var rdata = {
      name:[],
      value:[]
    }
    for(var i in data){
      rdata.name.push(data[i].name);
      rdata.value.push(data[i].value)
    }
    return rdata;
  },

  /**
   * 将多维数据表数据//{legend:["2019","2018"],data:[ [{"name"...转化为表格数据
   * 将单维的也转化为数据表格式
   * @param data
   */
  formatTables:function(data){
     var nd = {
       legend:undefined,
       data:[]
     }
     nd.legend = data.legend;
     var col = data.data[0].length;//算出有行
     for(var j = 0;j < col;j++){
       var cols = [];//每列数组
       for(var i = 0; i < data.data.length;i++){
         cols.push(data.data[i][j].value);
       }
       nd.data.push(cols);
     }
     return nd;
  },

  //环形、条形、折线图数据转换
  getChartData:function (data,type) {
    let newData1=[];
    let newData2=[];
    for (var i=0;i<data.length;i++){
      newData1.push(data[i].name);
      newData2.push(data[i].value);
    }
    let newData=[newData1,newData2];
    return newData;
  },
  //多条折线图
  getChartsData:function(data,type){
    let alldata ={
      legend : [],
       xdata : [],
      series : []
    }

    for(let i in data.legend){
      let legs = {name:'', icon: 'circle',
        textStyle: {
          color: '#fff'
        }
      }
      legs.name = data.legend[i];
      alldata.legend.push(legs);
      let ser = {
        name: '',
        type: type,
        data: [],
        barMaxWidth:'20',
        label:{
          normal:{
            show:false,        //柱子上面显示数值
            position:'top',  //数值的位置
            textStyle:{
              color:'#fff'
            }
          }
        }
      };
      ser.name = data.legend[i];
      for(let c in data.data[i]){
        ser.data.push(data.data[i][c].value);
      }
      alldata.series.push(ser)
    }
    for(let i in data.data[0]){
      alldata.xdata.push(data.data[0][i].name);
    }
    return alldata;
  },
  getChartDataPie :function(data){
    let newData=[];

    if(data != null && data.length > 0){
      for (var i=0;i<data.length;i++){
        let Obj={name:'',value:''}
        Obj.name=data[i].name;
        Obj.value=data[i].value;
        newData.push(Obj);
      }
    }else{
      newData=data;
    }
    return newData;
  },
  //格式化日期
  parseTime:function(fmt, date) {
    var fmt = fmt || "yyyy-MM-dd hh:mm:ss";
    var o = {
      "M+" : date.getMonth()+1,                 //月份
      "d+" : date.getDate(),                    //日
      "h+" : date.getHours(),                   //小时
      "m+" : date.getMinutes(),                 //分
      "s+" : date.getSeconds(),                 //秒
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  },
  //根据元素返回数组下标 arrays:数组，Obj:元素
  contains:function(arrays, obj) {
    var i = arrays.length;
    while (i--) {
      if (arrays[i] === obj) {
        return i;
      }
    }
    return -1;
  },
  //根据模块dataKey加载数据
  getDataByDataKeys:function(data){
    var dataKey = {
       dataKey:data.dataKey
    }
    getDataByDataKey(this.$qs.stringify(dataKey)).then(response => {

    })
  }
}
