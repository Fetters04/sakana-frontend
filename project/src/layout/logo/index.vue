<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="">
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
// 引入设置标题与logo配置文件
import setting from '@/setting.ts';
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  align-items: center;
  padding-top: 40px;

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
