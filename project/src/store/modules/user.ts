// 创建用户相关小仓库
import { defineStore } from 'pinia';
// 引入接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user';
import type { UserState } from './types/type.ts';
// 引入操作本地存储的工具方法
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.ts';
// 引入路由（常量路由）
import { anyRoute, asyncRoute, constantRoute } from '@/router/routes';
import { loginFormData, loginResponseData, userInfoResponseData } from '@/api/user/type';
import router from '@/router';
// 引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep';

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
}

let useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),   // 存储用户唯一标识 token
      menuRoutes: constantRoute,   // 存储生成菜单所需数组（路由）
      username: '',
      avatar: '',
      buttons: []     // 存储当前用户包含的按钮
    };
  },
  // 异步|逻辑地方
  actions: {
    // 用户登录方法
    async userLogin(data: loginFormData) {
      // 登录请求
      let result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        // pinia存储token
        this.token = (result.data as string);
        // 本地持久化存储token
        SET_TOKEN((result.data as string));

        // 保证返回一个成功的promise
        return 'ok';
      } else {
        return Promise.reject(new Error(result.data));
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息
      let result: userInfoResponseData = await reqUserInfo();
      // 如果获取用户信息成功，存储到仓库（头像、名字）
      if (result.code == 200) {
        this.username = result.data.username;
        this.avatar = result.data.avatar;
        this.buttons = result.data.buttons;
        // 如果有角色并且角色有权限
        if (result.data.routes != null) {
          // 过滤出当前用户的异步路由
          let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
          // 用户可见的菜单
          this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute];
          // 路由器当前管理只有常量路由，动态追加异步路由、任意路由
          [...userAsyncRoute, ...anyRoute].forEach((route: any) => {
            router.addRoute(route);
          });
        } else {
          // 否则只能访问常量路由和任意路由
          [...constantRoute, ...anyRoute].forEach((route: any) => {
            router.addRoute(route);
          });
        }
        return 'ok';
      } else {
        return Promise.reject('获取用户信息失败');
      }
    },
    // 退出登录方法
    async userLogout() {
      // 退出登录请求
      let result: any = await reqLogout();
      if (result.code == 200) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        // 复原 menuRoutes 路由菜单
        this.menuRoutes = [...constantRoute];
        // 清空动态追加的路由（处理切换角色后还能访问之前角色权限问题）
        router.getRoutes().forEach(route => {
          if (route.name) { // 确保路由有名称
            // 检查当前路由是否不在 constantRoute 中
            const isConstantRoute = constantRoute.some(constRoute => constRoute.name === route.name);
            if (!isConstantRoute) {
              router.removeRoute(route.name);
            }
          }
        });
        return 'ok';
      }

      return Promise.reject('退出登录失败');
    }
  },
  // 计算属性
  getters: {}
});

export default useUserStore;
