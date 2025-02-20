<template>
  <div class="logo" v-if="!setting.logoHidden">
    <img :src="setting.logo" alt="">
    <p v-if="showTitle">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入设置标题与logo配置文件
import setting from '@/setting.ts';
import useLayoutSettingStore from '@/store/modules/setting';
import { ref, watch } from 'vue';

let layoutSettingStore = useLayoutSettingStore();
// 控制 p 标签的显示，默认展示
let showTitle = ref<boolean>(true);

// 监听 layoutSettingStore.fold 的变化
watch(() => !layoutSettingStore.fold, (newValue) => {
  if (newValue) {
    // 当!layoutSettingStore.fold 变为 true 时，延迟 0.3 秒显示 p 标签
    setTimeout(() => {
      showTitle.value = true;
    }, 300);
  } else {
    // 当!layoutSettingStore.fold 变为 false 时，立即隐藏 p 标签
    showTitle.value = false;
  }
});
</script>

<script lang="ts">
export default {
  name: 'Logo'
};
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    margin-left: 5px;
  }

  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 5px;
  }
}
</style>
