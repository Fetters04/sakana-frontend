// 路由鉴权
import router from '@/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  /*
  * to: 将要访问的路由
  * from: 从哪个路由而来
  * next: 路由的放行函数
  * */
  nprogress.start();
  next();
});
// 全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done();
});

// 一：任意路由切换实现进度条业务  --nprogress
