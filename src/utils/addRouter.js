import _import from '../router/_import'; // 获取组件的方法

/**
 * 生成路由,这里将动态添加的路由格式化
 * @param {Array} routerlist 格式化路由
 * @returns
 */
export function addRouter(routerlist) {
  const router = [];
  routerlist.forEach(e => {
    if (e.stat == 1) { e.stat = '系统模板'; } else if (e.stat == 5) { e.stat = '编辑中'; } else { e.stat = '已发布'; }
    /* if(e.url != "/template" && e.url != "/template1" && e.url != "/template3"){
       //定制化模板,从url截取页面名称
      let e_new = {
        path: e.url,
        name: e.name,
        stat:e.stat,
        component: _import(e.url.substring(e.url.lastIndexOf("/")+1))
      }
    }else{
      let e_new = {
        path: e.url,
        name: e.name,
        stat:e.stat,
        component: _import(e.name)
      }
    }*/
    let e_new = {
      path: e.url,
      name: e.name,
      stat: e.stat,
      component: _import(e.url.substring(e.url.lastIndexOf('/') + 1))
    };
    // 如果含有子目录
    if (e.children) {
      e_new = Object.assign({}, e_new, { children: addRouter(e.children) });
    }
    if (e.redirect) {
      e_new = Object.assign({}, e_new, { redirect: e.redirect });
    }
    if (e.generatemenu === 1) {
      e_new = Object.assign({}, e_new, { hidden: true });
    }
    if (e.icon !== '' && e.title !== '') {
      e_new = Object.assign({}, e_new, {
        meta: { title: e.title, icon: e.icon }
      });
    } else if (e.title !== '' && e.icon === '') {
      e_new = Object.assign({}, e_new, { meta: { title: e.title }});
    }
    router.push(e_new);
  });
  return router;
}
