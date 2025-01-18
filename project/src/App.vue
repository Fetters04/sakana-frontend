<template>
  <div>
    <el-button type="primary" :icon="Plus">主要按钮</el-button>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
    />
  </div>
</template>

<script setup lang="ts">
// 引入图标组件
import {Plus} from '@element-plus/icons-vue';

</script>

<style scoped>

</style>
