// 路由鉴权
import router from '@/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import useUserStore from '@/store/modules/user';
import pinia from '@/store';
import setting from './setting';

nprogress.configure({ showSpinner: false });

let userStore = useUserStore(pinia);

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`;
  /*
  * to: 将要访问的路由
  * from: 从哪个路由而来
  * next: 路由的放行函数
  * */
  nprogress.start();
  // 获取token，判断用户是否登录
  let token = userStore.token;
  // 获取用户名
  let username = userStore.username;
  // 用户登录判断
  if (token) {
    // 不能访问登录页，指向首页
    if (to.path == '/login') {
      next({ path: '/' });
    } else {
      // 访问其他路由
      if (username) {
        // 有用户信息直接放行
        next();
      } else {
        // 没有用户信息，在守卫发请求获取到了用户信息再放行
        try {
          // 获取用户信息
          await userStore.userInfo();
          next();
        } catch (e) {
          // token 过期 | 用户手动修改本地存储token
          // 退出登录 -> 用户相关数据清空
          userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 只能访问登录页
    if (to.path == '/login') {
      next();
    } else {
      // 不能访问其他路由，指向登录页
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
});
// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done();
});

// 一：任意路由切换实现进度条业务  --nprogress
// 二：路由鉴权（路由组件访问权限设置）
// 用户未登录：可以访问login，其余路由不能访问（指向login）
// 用户登录成功：不可以访问login（指向首页），其余路由可以访问
