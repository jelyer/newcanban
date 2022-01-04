import { login, logout, getInfo, getRouter } from '@/api/login';
import { getSourDataAll, getWhidOwcoReq } from '@/api/chartSetting';
import { addRouter } from '@/utils/addRouter';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { StaticRouterMap } from '../../router/index';
import Qs from 'qs';
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    RouterList: [], // 动态路由,已拼接好
    routerDatas: [], // 路由数据，未转格式
    routerlb: [], // 用于路由轮播
    AsyncRouterMap: [], // 动态获取的路由，已转好
    SourDataAll: [], // 数据源
    whidData: [], // 仓库数据，用户查询条件
    owcoData: [], // 货主数据
    mode: '' // 模式：edit(可见系统模板) read（只能看到业务看板）
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    set_router: (state, RouterList) => {
      state.RouterList = RouterList;
    },
    set_routerData: (state, RouterData) => {
      state.routerDatas = RouterData;
    },
    SET_ASYNCROUTERMAP: (state, RouterData) => {
      state.AsyncRouterMap = RouterData;
    },
    SET_SOURDATAAll: (state, SourDataAll) => {
      state.SourDataAll = SourDataAll;
    },
    SET_WHIDDTA: (state, whidData) => {
      state.whidData = whidData;
    },
    SET_OWCODTA: (state, owcoData) => {
      state.owcoData = owcoData;
    },
    set_routerlb: (state, routerlb) => {
      state.routerlb = routerlb;
    },
    SET_MODE: (state, mode) => {
      state.mode = mode;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            // const data = response.data;
            // setToken(data.token);
            // commit('SET_TOKEN', data.token);
            setToken('1639981376000');
            commit('SET_TOKEN', '1639981376000');
            resolve();
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            setToken('1639981376000');
            commit('SET_TOKEN', '1639981376000');
            resolve();
            // reject(error)
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            if (response.data.code == 200) {
              const data = response.data.data;
              if (data.roles && data.roles.length > 0) {
                // 验证返回的roles是否是一个非空数组
                commit('SET_ROLES', data.roles);
              } else {
                // reject('getInfo: 用户角色数据获取失败!');
              }
              commit('SET_MODE', data.mode);
              commit('SET_NAME', data.name);
              commit('SET_AVATAR', data.avatar);
            }
            resolve(response);
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            commit('SET_NAME', 'admin');
            commit('SET_AVATAR', '');
            resolve();
            // reject(error)
          });
      });
    },

    // 动态设置路由 此为设置设置途径
    setRouterList({ commit }, { routerList, isOnlyAsyn }) {
      if (isOnlyAsyn) {
        // 只要动态的路由
        commit('set_router', routerList);
      } else {
        // 静态路由+动态路由
        commit('set_router', StaticRouterMap.concat(routerList));
      }
    },

    // 轮播
    SetRouterLb({ commit }, routerlb) {
      commit('set_routerlb', routerlb);
    },

    // 存储路由数据-未转的
    setRouterData({ commit }, RouterData) {
      commit('set_routerData', RouterData);
    },

    // 重新加载路由
    getSyncRouterData({ commit, state }) {
      return new Promise(resolve => {
        getRouter()
          .then(response => {
            if (response.data.data) {
              const result = response.data.data;
              commit('set_routerData', result);// 看板管理
              var jsondata = [];
              var roulunbo = [];
              var icon;
              if (result.length > 0) {
                for (const n in result) {
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
                  // 轮播如果是已发布的,1系统模板，5编辑中，9已发布
                  if (parseInt(result[n].tempstat) != 5) {
                    const list = { title: undefined, url: undefined, checked: true };
                    list.title = result[n].tempname;
                    list.url = result[n].tempurl + '?pageId=' + result[n].tempid + '&stat=' + result[n].tempstat;
                    roulunbo.push(list);
                  }
                }
              }
              commit('set_routerlb', roulunbo);// 存储路由数据，用于轮播，只包含已发布的路由
              const asyncRouter = addRouter(jsondata);// 进行递归解析
              commit('SET_ASYNCROUTERMAP', asyncRouter);// 已转好的动态路由，存
              // eslint-disable-next-line no-undef
              if ($('#systemmenus').hasClass('actives')) {
                commit('set_router', StaticRouterMap.concat([]));// 只显示系统看板
              } else {
                commit('set_router', asyncRouter);// 显示业务看板的路由
              }
            }
            resolve(response);
          })
          .catch(error => {
            resolve(error);
          });
      });
    },

    // 存储动态路由-已转
    setAsyncRouterMap({ commit }, RouterData) {
      commit('SET_ASYNCROUTERMAP', RouterData);
    },

    // 存储颗粒话权限
    setroles({ commit }, roleList) {
      commit('SET_ROLES', roleList);
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            commit('set_router', []);
            removeToken();
            resolve();
            // eslint-disable-next-line no-undef
            window.location.href = IPCONFIG + '/login.html';
          })
          .catch(error => {
            reject(error);
            // eslint-disable-next-line no-undef
            window.location.href = IPCONFIG + '/login.html';
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },

    // 加载数据源
    GetSourData({ commit, state }) {
      return new Promise(resolve => {
        getSourDataAll()
          .then(response => {
            if (response.data.code == 200) {
              commit('SET_SOURDATAAll', response.data.data);
            }
            resolve(response);
          })
          .catch(error => {
            resolve(error);
          });
      });
    },

    // 加载仓库和或者
    getWhidOwcoData({ commit, state }) {
      return new Promise(resolve => {
        getWhidOwcoReq(Qs.stringify({ owinOrwaho: 'waho' }))
          .then(response => {
            if (response.data.code == 200) {
              commit('SET_WHIDDTA', response.data.data);
            }
            resolve(response);
          })
          .catch(error => {
            resolve(error);
          });
        getWhidOwcoReq(Qs.stringify({ owinOrwaho: 'owin' }))
          .then(response => {
            if (response.data.code == 200) {
              commit('SET_OWCODTA', response.data.data);
            }
            resolve(response);
          })
          .catch(error => {
            resolve(error);
          });
      });
    }
  }
};

export default user;
