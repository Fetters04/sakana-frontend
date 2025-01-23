// 创建用户相关小仓库
import { defineStore } from 'pinia';
// 引入接口
import { reqLogin, reqUserInfo } from '@/api/user';
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type.ts';
import type { UserState } from './types/type.ts';
// 引入操作本地存储的工具方法
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token.ts';
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes';

let useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),   // 存储用户唯一标识 token
      menuRoutes: constantRoute,   // 存储生成菜单所需数组（路由）
      username: '',
      avatar: ''
    };
  },
  // 异步|逻辑地方
  actions: {
    // 用户登录方法
    async userLogin(data: loginForm) {
      // 登录请求
      let result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        // pinia存储token
        this.token = (result.data.token as string);
        // 本地持久化存储token
        SET_TOKEN((result.data.token as string));

        // 保证返回一个成功的promise
        return 'ok';
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息
      let result = await reqUserInfo();
      // 如果获取用户信息成功，存储到仓库（头像、名字）
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        return 'ok';
      } else {
        return Promise.reject('获取用户信息失败');
      }
    },
    // 退出登录方法
    userLogout() {
      this.token = '';
      this.username = '';
      this.avatar = '';
      REMOVE_TOKEN();
    }
  },
  // 计算属性
  getters: {}
});

export default useUserStore;
