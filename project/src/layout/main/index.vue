<template>
  <!--路由组件出口位置-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--渲染layout一级路由组件的子路由-->
      <component :is="Component" v-if="flag"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import { nextTick, ref, watch } from 'vue';

let layoutStore = useLayoutSettingStore();
// 控制当前组件是否销毁重建
let flag = ref(true);
// 监听仓库内部数据是否发送变化
watch(() => layoutStore.refresh, () => {
  // 点击刷新按钮：路由组件销毁
  flag.value = false;
  nextTick(() => {
    flag.value = true;
  });
});
</script>

<script lang="ts">
export default {
  name: 'Main'
};
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
