// layout组件相关配置仓库
import { defineStore } from 'pinia';

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false   // 控制菜单折叠|展开
    };
  }
});

export default useLayoutSettingStore;
