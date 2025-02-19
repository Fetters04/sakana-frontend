<template>
  <el-card>
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item label="用户名">
        <el-input placeholder="请输入搜索用户名" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 20px 0">
    <el-button type="primary">点击用户</el-button>
    <el-button type="danger">批量删除</el-button>
    <!-- 展示用户信息 -->
    <el-table border style="margin: 20px 0">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" width="80px"></el-table-column>
      <el-table-column label="ID"></el-table-column>
      <el-table-column label="用户名"></el-table-column>
      <el-table-column label="呢称"></el-table-column>
      <el-table-column label="用户角色"></el-table-column>
      <el-table-column label="创建时间"></el-table-column>
      <el-table-column label="更新时间"></el-table-column>
      <el-table-column label="操作" width="300px"></el-table-column>
    </el-table>
  </el-card>
  <!-- 分页器 -->
  <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="400"
      @current-change="getHasSku"
      @size-change="getHasSku(1)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 当前页码
let pageNo = ref<number>(1);
// 页量
let pageSize = ref<number>(10)
</script>

<style scoped lang="scss">

</style>
