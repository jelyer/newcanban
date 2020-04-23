import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/

export const StaticRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/template1',
    name: 'template1',
    meta: { icon: 'static/image/box1.png' },
    stat:'系统模板',
    children: [
      {
        path: 'template1',
        component: () => import('@/views/template/template1')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/template3',
    name: 'template3',
    meta: { icon: 'static/image/box3.png' },
    stat:'系统模板',
    children: [
      {
        path: 'template3',
        component: () => import('@/views/template/template3')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/template2',
    name: 'template',
    meta: { icon: 'static/image/box3.png' },
    stat:'系统模板',
    children: [
      {
        path: 'template2',
        component: () => import('@/views/template/template2')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/template',
    name: 'template',
    meta: { icon: 'static/image/box3.png' },
    stat:'系统模板',
    children: [
      {
        path: 'template',
        component: () => import('@/views/template/template')
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/template',
    name: 'template',
    meta: { icon: 'static/image/box3.png' },
    stat:'拓展模板',
    children: [
      {
        path: 'board1',
        component: () => import('@/views/board/board1')
      }
    ]
  },
/*  {
    path: '',
    component: Layout,
    name: 'template2',
    meta: { icon: '/static/image/box3.png' },
    stat:'已发布',
    children: [
      {
        path: 'template2',
        component: () => import('@/views/template/template2')
      }
    ]
  }*/
]

export const AsyncRouterMap = [
]

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: StaticRouterMap // [...StaticRouterMap, ...AsyncRouterMap]
})
