// 对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    // 登录页
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login'
  },
  {
    // 主页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'home'
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any'
  }
];
