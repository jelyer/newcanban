const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  routerList: state => state.user.RouterList,
  roles: state => state.user.roles,
  routerstat: state => state.app.routerstat,
  RouterData: state => state.user.RouterData,
  routerlb: state => state.app.routerlb
}
export default getters
