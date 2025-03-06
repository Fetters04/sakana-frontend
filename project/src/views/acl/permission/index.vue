<template>
  <el-table :data="permissionArr" style="width: 100%; margin: 20px 0;" row-key="id" border>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{row, $index}">
        <el-button type="primary" size="small" :disabled="row.level==4">
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button type="success" size="small" :disabled="row.level==1">编辑</el-button>
        <el-button type="danger" size="small" :disabled="row.level==1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqAllPermission } from '@/api/acl/menu';
import { Permission, PermissionResponseData } from '@/api/acl/menu/type';

// 存储菜单数据
let permissionArr = ref<Permission[]>([]);

onMounted(() => {
  getHasPermission();
});

// 获取菜单数据的方法
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission();
  if (result.code == 200) {
    permissionArr.value = result.data;
  }
};
</script>

<style scoped lang="scss">

</style>
