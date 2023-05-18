/* eslint-disable no-unused-vars */
// ip配置参数
// const IPCONFIG = 'http://192.168.10.151:8088/kb'
// const IPCONFIG = 'http://47.103.69.104:8088/kb' 测试
// eslint-disable-next-line no-unused-vars
const IPCONFIG = 'http://112.74.85.149:19015/kb'; // 有大量测试业务看板，有用！
// const IPCONFIG = 'http://192.168.1.39:8088/kb'
// const IPCONFIG = 'http://localhost:8088/kb'
// const IPCONFIG = 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin';
// pengxu
// const IPCONFIG = 'http://localhost:8080/Gwms4/'
// eslint-disable-next-line no-unused-vars
// const IPCONFIG = 'http://localhost:8088/kb';
var pathName = window.document.location.pathname;

// eslint-disable-next-line no-unused-vars
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
// const IPCONFIG = projectName;
var customCfg = {
  list: {
    singleHeight: 70, // 70
    limitMoveNum: 10, // 10
    step: 1,
    format: {
      '高': '#a10303', // 红
      '中': '#f1970e', // 黄
      '低': '#17c84d', // 绿
      '百草味-华夫饼': '#a10303',
      'zyh测试': '#17c84d',
      '未占用': '#17c84d',
      '已占用': '#a10303',
      '已完成': '#17c84d',
      '未完成': '#647d68',
      '碧乡': '#a10303',
      '614': '#17c84d'
    }
  },
  authority: 'any', // Back:按后端返回权限/admin:只有admin用户才行/none:谁都不行/any：谁都行
  showTemplate: 1, // 是否显示模板，1：一定显示，2：不显示，3：按state.user.mode权限来
  showIndexModel: true // 是否显示模板数据，会有残影
};
