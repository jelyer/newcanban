import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { StaticRouterMap } from '../../router/index'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    RouterList: [], // 动态路由,已拼接好
    routerDatas:[],//路由数据，未转格式
    AsyncRouterMap:[],//动态获取的路由，已转好
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    set_router: (state, RouterList) => {
      state.RouterList = RouterList
    },
    set_routerData: (state, RouterData) => {
      state.routerDatas = RouterData
    },
    SET_ASYNCROUTERMAP: (state, RouterData) => {
      state.AsyncRouterMap = RouterData
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          })
          .catch(error => {
            setToken("jsiifeerw")
            commit('SET_TOKEN', "jsiifeerw")
            resolve()
            //reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data
            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch(error => {
            commit('SET_NAME', "admin")
            commit('SET_AVATAR', "")
            resolve()
           // reject(error)
          })
      })
    },
    // 动态设置路由 此为设置设置途径
    setRouterList({ commit },{routerList,isOnlyAsyn}) {
      if(isOnlyAsyn){
        //只要动态的路由
        commit('set_router', routerList);
      }else{
        commit('set_router', StaticRouterMap.concat(routerList));
      }
    },

    // 存储路由数据-未转的
    setRouterData({ commit }, RouterData) {
      commit('set_routerData', RouterData)
    },

    // 存储动态路由-已转
    setAsyncRouterMap({ commit }, RouterData) {
      commit('SET_ASYNCROUTERMAP', RouterData)
    },

    // 存储颗粒话权限
    setroles({ commit }, roleList) {
      commit('SET_ROLES', roleList)
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('set_router', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
