<template>
  <!--三级分类全局组件-->
  <Category/>
  <el-card style="margin: 20px 0">
    <el-button type="primary" size="large" icon="Plus" :disabled="!categoryStore.c3Id">添加属性</el-button>
    <el-table border style="margin-top: 20px">
      <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
      <el-table-column label="属性名称" align="center" width="200px"></el-table-column>
      <el-table-column label="属性值名称" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200px"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';

let categoryStore = useCategoryStore();
</script>

<style scoped lang="scss">

</style>
