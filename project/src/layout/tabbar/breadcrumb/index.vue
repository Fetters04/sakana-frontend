<template>
  <!--顶部左侧静态-->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold? 'Fold': 'Expand'"></component>
  </el-icon>
  <!--左侧面包屑-->
  <el-breadcrumb separator-icon='ArrowRight'>
    <!--动态展示路由名字和标题-->
    <el-breadcrumb-item
        v-for="(item, index) in $router.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"/>
      </el-icon>
      <!--面包屑展示匹配路由的标题-->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting';

let $router = useRoute();
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
