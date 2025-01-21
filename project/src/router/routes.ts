// 对外暴露配置路由（常量路由）
export const constantRoute = [
  {
    // 登录页
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',  // 菜单标题
      hidden: true  // 代表路由标题在菜单中是否隐藏
    }
  },
  {
    // 主页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'layout',
      hidden: false
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false
        }
      },
      {
        path: '/test',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '测试',
          hidden: false
        }
      }
    ]
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意',
      hidden: true
    }
  }
];
