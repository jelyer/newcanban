export default file => {
  return map[file] || null
}

const map = {
  Nested: () => import('@/views/layout/Layout'),
  form: () => import('@/views/layout/Layout'),
  Form: () => import('@/views/form/index'),
  Example: () => import('@/views/layout/Layout'),
  Table: () => import('@/views/table/index'),
  Tree: () => import('@/views/tree/index'),
  template2: () => import('@/views/template/template2'),
}
