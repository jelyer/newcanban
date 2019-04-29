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
  getChartData:function (data) {
    let newData1=[];
    let newData2=[];
    for (var i=0;i<data.length;i++){
      newData1.push(data[i].dataX);
      newData2.push(data[i].dataY);
    }
    let newData=[newData1,newData2];
    return newData;
  },
  getChartDataPie :function(data){
    let newData=[];

    if(data[0].dataX!=undefined){
      for (var i=0;i<data.length;i++){
        let Obj={name:'',value:''}
        Obj.name=data[i].dataX;
        Obj.value=data[i].dataY;
        newData.push(Obj);
      }
    }else{
      newData=data;
    }
    return newData;
  },
}
