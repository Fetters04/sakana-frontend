import pinia from '@/store';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore(pinia);

export const isHasButton = (app: any) => {
  // 全局自定义指令，实现按钮权限
  app.directive('has', {
    // 使用这个全局自定义指令的DOM或组件挂载完毕的时候执行
    mounted(el: any, options: any) {
      // 自定义指令右侧的值如果不在用户信息buttons数组中，从DOM树上删除
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el);
      }
    }
  });
};
