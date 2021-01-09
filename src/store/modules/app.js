import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
     // opened: !+Cookies.get('sidebarStatus'),//0 true / 1 false
      opened:true,
      withoutAnimation: false
    },
    device: 'desktop',
    routerstat:false, //路由是否有变化，false：有变化；true：无
    isScreen:false,//用于页面是否需要重新渲染数据
    reloadData:false,//刷新当前页面数据
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
    set_isScreen:(state,isScreen) => {
      state.isScreen = isScreen
    },
    SET_RELOADDATA: (state, stat) => {
      state.reloadData = stat
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
    SetIsScreen({commit},isScreen){
      commit('set_isScreen', isScreen)
    },
    SetReloadData({commit},reloadData){
      commit('SET_RELOADDATA', reloadData);//刷新页面
    }
  }
}

export default app
