import router from './router';
import store from './store';
// eslint-disable-next-line no-unused-vars
import { getToken, removeToken, getPath } from './utils/auth';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getRouter } from './api/login';
import { addRouter } from './utils/addRouter';

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  // if (getToken()) {
  // 判断cookice是否存在 不存在即为未登录
  if (to.path !== '/login') {
    if (store.state.app.routerstat) {
      // 获取了动态路由 routerstat一定true,就无需再次请求 直接放行
      next();
    } else {
      // routerstat为false,一定没有获取动态路由,就跳转到获取动态路由的方法
      gotoRouter(to, next);
      // 获取info
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next();
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || '验证错误，请重新登录！');
            next({ path: '/' });
          });
        });
      } else {
        next();
      }
    }
    /*    } else {
      Message({ message: '您已经登录', type: 'info' })
      next('/')
    }*/
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 免登陆白名单 直接进入
      next();
    } else {
      debugger;
      if (to.path !== '/login') {
        // 重定向到登录页面 不能这么写 因为假如之前的角色是 管理员页面 后又登陆了非管理员 重定向的页面就可能不存在,就会导致404
        // next(`/login?redirect=${to.path}`)
        next('/login');
      } else {
        next();
      }
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

function gotoRouter(to, next) {
  // 获取动态路由的方法
  getRouter().then(res => {
    var result = res.data.data;
    var jsondata = [];
    var roulunbo = [];
    var icon;
    if (result.length > 0) {
      for (let n in result) {
        switch (result[n].tempurl) {
          case '/template1':
            icon = 'box1.png';
            break;
          case '/template2':
            icon = 'box2.jpg';
            break;
          case '/template3':
            icon = 'box5.png';
            break;
          default:
            icon = 'box3.png';
        }
        var data = {
          'name': result[n].tempname,
          'stat': result[n].tempstat,
          'url': '',
          'icon': 'static/images/' + icon, // zy
          'children': [{
            'name': result[n].tempid,
            'url': result[n].tempurl + '?pageId=' + result[n].tempid + '&stat=' + result[n].tempstat
          }]
        };
        jsondata.push(data);
        // lunbo 如果是已发布的,1系统模板，5编辑中，9已发布
        if (parseInt(result[n].tempstat) != 5) {
          let list = { title: undefined, url: undefined, checked: true };
          list.title = result[n].tempname;
          list.url = result[n].tempurl + '?pageId=' + result[n].tempid + '&stat=' + result[n].tempstat;
          roulunbo.push(list);
        }
      }
    }
    store.dispatch('setRouterData', result); // 存储到路由数据，未转,看板管理
    store.dispatch('SetRouterLb', roulunbo);// 存储路由数据，用于轮播，只包含已发布的路由
    var asyncRouter = addRouter(jsondata); // 进行递归解析
    store.dispatch('setAsyncRouterMap', asyncRouter);// 已转好的动态路由，存
    // store.dispatch('setroles', res.data.data.permit)
    // console.log(res.data.data.permit)
    // 一定不能写在静态路由里面,否则会出现,访问动态路由404的情况.所以在这列添加
    /* asyncRouter.push({ path: '*', redirect: '/404', hidden: true })*/
    return asyncRouter;
  })
    .then(asyncRouter => {
      // router.addRoutes(asyncRouter) // vue-router提供的addRouter方法进行路由拼接
      store.dispatch('SetReloadRouter', true); // 记录路由获取状态
      store.dispatch('setRouterList', { routerList: asyncRouter, isOnlyAsyn: true }); // 添加动态路由
      // store.dispatch('setRouterList', {routerList:[]});//默认不添加，只显示静态路由
      // store.dispatch('GetInfo')
      store.dispatch('GetSourData');// 加载数据源
      store.dispatch('getWhidOwcoData');// 加载仓库和货主
      setTimeout(function() {
        // eslint-disable-next-line no-undef
        $('#scrowrapper li').eq(0).click();// 选择第一个业务看板，待优化
      }, 1000);
      next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
    })
    .catch(e => {
      // console.log(e)
      removeToken();
    });
}
