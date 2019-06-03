import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
     // opened: !+Cookies.get('sidebarStatus'),//0 true / 1 false
      opened:true,
      withoutAnimation: false
    },
    device: 'desktop',
    routerstat:false, //控制是否重新加载路由，false：加载；true：不加载
    routerlb:[],//用于路由轮播
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
/*      if (state.sidebar.opened) {   //取消缓存
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }*/
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    set_routerstat: (state, stat) => {
      state.routerstat = stat
    },
    set_routerlb: (state, routerlb) => {
      state.routerlb = routerlb
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    SetReloadRouter({commit},stat){
      commit('set_routerstat', stat) // 进行路由拼接并存储
    },
    SetRouterLb({commit},routerlb){
      commit('set_routerlb', routerlb)
    }
  }
}

export default app
