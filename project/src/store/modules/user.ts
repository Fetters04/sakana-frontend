// 创建用户相关小仓库
import { defineStore } from 'pinia';
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
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
    async userLogin(data: any) {
      // 登录请求
      let result: any = await reqLogin(data);
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
      let result = await reqUserInfo();
      // 如果获取用户信息成功，存储到仓库（头像、名字）
      if (result.code == 200) {
        this.username = result.data.username;
        this.avatar = result.data.avatar;
        return 'ok';
      } else {
        return Promise.reject('获取用户信息失败');
      }
    },
    // 退出登录方法
    async userLogout() {
      // 退出登录请求
      let result = await reqLogout();
      console.log(result);
      if (result.code == 200) {
        this.token = '';
        this.username = '';
        this.avatar = '';
        REMOVE_TOKEN();
        return 'ok';
      }

      return Promise.reject('退出登录失败');
    }
  },
  // 计算属性
  getters: {}
});

export default useUserStore;
