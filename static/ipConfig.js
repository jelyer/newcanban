//ip配置参数
//const IPCONFIG = 'http://192.168.10.151:8088'
//const IPCONFIG = 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin';
//const IPCONFIG = 'http://localhost:8080'
//pengxu
//const IPCONFIG = 'http://localhost:8080/Gwms4/'
var pathName=window.document.location.pathname;
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
const IPCONFIG = projectName;
