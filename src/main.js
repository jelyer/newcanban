import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import { directive } from './utils/directive'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import echarts from 'echarts'
import commonFun from './utils/commonFun'
import globalVariable from './utils/global_variable'

import  axios from 'axios'
Vue.prototype.$axios=axios;
Vue.prototype.$echarts=echarts;
Vue.prototype.COMMONFUN=commonFun; //将全局函数当做插件来进行注册
Vue.prototype.GLOBAL=globalVariable;

Vue.use(ElementUI, { locale })
directive()
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
