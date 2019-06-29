const steps = [
  {
    element: '#pullKanban',
    popover: {
      title: '发布看板',
      description: '可将编辑中的看板发布',
      position: 'bottom',
      onNext: (Element) => {console.log(1)},
    }
  },
  {
    element: '#editKanban',
    popover: {
      title: '编辑看板',
      description: '打开编辑面板，修改数据源或图表类型',
      position: 'left',
    }
  },
  {
    element: '#fullChart',
    popover: {
      title: '全屏',
      description: '全屏显示，按回车可设置看板轮播',
      position: 'left',
    }
  },
  {
    element: '#outLogin',
    popover: {
      title: '退出登录',
      description: '退出看板',
      position: 'left',
    }
  },
  {
    element: '#mainBox',
    popover: {
      title: '这里是看板区域',
      description: '可自定义您要显示的图表类型和数据源',
      position: 'bottom',
    }
  },
  {
    element: '#scrowrapper',
    popover: {
      title: '模板页面',
      description: '点击系统模板，再点击编辑模板，通过配置数据源和页面需要展示的模块，即可保存新增一个看板页面',
      position: 'right',
    }
  },
  {
    element: '#kbmbtn',
    popover: {
      title: '看板管理',
      description: '可管理看板的状态，发布已编辑好的看板，删除多余看板',
      position: 'top',
      onNext: (Element) => {alert(1);$("#editKanban").click()},
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: 'Tags view',
      description: 'The history of the page you visited',
      position: 'left',
    },
    padding: 0
  }
]

export default steps
