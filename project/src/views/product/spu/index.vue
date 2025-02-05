<template>
  <!-- 三级分类 -->
  <Category :scene="scene"/>
  <el-card style="margin: 20px 0">
    <el-button type="primary" size="large" icon="Plus">添加SPU</el-button>
    <el-table border style="margin: 20px 0">
      <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
      <el-table-column label="SPU名称"></el-table-column>
      <el-table-column label="SPU描述"></el-table-column>
      <el-table-column label="SPU操作"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 10]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="400"
        @current-change="getHasTrademark"
        @size-change="getHasTrademark(1)"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 场景切换
let scene = ref<number>(0);
// 分页器默认页码
let pageNo = ref<number>(1);
// 每一页展示数据量
let pageSize = ref<number>(3);
</script>

<style scoped lang="scss">

</style>
