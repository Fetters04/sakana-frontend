<template>
  <el-card>
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item label="角色搜索">
        <el-input placeholder="请输入角色的关键字" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default">搜索</el-button>
        <el-button size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 主体内容 -->
  <el-card style="margin: 20px 0">
    <el-button type="primary" icon="Plus">添加角色</el-button>
    <el-table border style="margin: 20px 0">
      <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="ID" align="center"></el-table-column>
      <el-table-column label="角色名" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center"></el-table-column>
      <el-table-column label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" width="300px"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total=400
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
</script>

<style scoped lang="scss">

</style>
