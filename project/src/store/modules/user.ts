// 创建用户相关小仓库
import {defineStore} from 'pinia';
// 引入接口
import {reqLogin} from '@/api/user';
// 引入数据类型
import type {loginForm, loginResponseData} from '@/api/user/type.ts';
import type {UserState} from './types/type.ts';
// 引入操作本地存储的工具方法
import {SET_TOKEN, GET_TOKEN} from '@/utils/token.ts';

let useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN()
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
    }
  },
  // 计算属性
  getters: {}
});

export default useUserStore;
