<template>
  <!--顶部左侧静态-->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold? 'Fold': 'Expand'"></component>
  </el-icon>
  <!--左侧面包屑-->
  <el-breadcrumb separator-icon='ArrowRight'>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';

let layoutSettingStore = useLayoutSettingStore();
// 点击图标折叠|展开的方法
const changeIcon = () => {
  layoutSettingStore.fold = !layoutSettingStore.fold;
};
</script>

<script lang="ts">
export default {
  name: 'Breadcrumb'
};
</script>

<style scoped lang="scss">

</style>
