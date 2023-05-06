import Vue from 'vue';
import Cookies from 'js-cookie';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import vdr from 'vue-draggable-resizable-gorkys';// vue-draggable-resizable-gorkys 新拖拽
// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css';
Vue.component('vdr', vdr);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN'; // lang i18n 中文
import { directive } from './utils/directive';
import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/icons'; // icon
import '@/permission'; // permission control
import echarts from 'echarts';
import commonFun from './utils/commonFun';
import globalVariable from './utils/global_variable';
import './directives';
Cookies.set('sidebarStatus', 1);
import axios from 'axios';
import qs from 'qs';
import vueSeamlessScroll from 'vue-seamless-scroll';
Vue.use(vueSeamlessScroll);
import contentmenu from 'v-contextmenu';
import VueAwesomeSwiper from 'vue-awesome-swiper'; /* swiper轮播*/
import VueSuperSlide from 'vue-superslide';/* 轮滚*/

import 'swiper/dist/css/swiper.css';
import 'v-contextmenu/dist/index.css';
Vue.use(contentmenu);
Vue.use(VueAwesomeSwiper); /* { default global options } */
Vue.use(VueSuperSlide);
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.COMMONFUN = commonFun; // 将全局函数当做插件来进行注册
Vue.prototype.GLOBAL = globalVariable;
Vue.prototype.$store = store;
Vue.prototype.$routers = router;
Vue.use(ElementUI, { locale });
directive();
Vue.config.productionTip = false;

// eslint-disable-next-line no-unused-vars
var vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
