<template>
  <!-- 数据展示区 -->
  <el-table :data="permissionArr" style="width: 100%; margin: 20px 0;" row-key="id" border>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{row, $index}">
        <el-button @click="addPermission" type="primary" size="small" :disabled="row.level==4">
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button @click="updatePermission(row)" type="success" size="small" :disabled="row.level==1">编辑</el-button>
        <el-button type="danger" size="small" :disabled="row.level==1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加或更新的对话框 -->
  <el-dialog v-model="dialogVisible" title="添加菜单">
    <el-form label-width="60px">
      <el-form-item label="名称">
        <el-input placeholder="请输入菜单名称"/>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input placeholder="请输入权限值"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button  @click="dialogVisible=false" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqAllPermission } from '@/api/acl/menu';
import { Permission, PermissionResponseData } from '@/api/acl/menu/type';

// 存储菜单数据
let permissionArr = ref<Permission[]>([]);
let dialogVisible = ref<boolean>(false);

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

// 添加菜单按钮的回调
const addPermission = () => {
  dialogVisible.value = true;
};

// 编辑菜单按钮的回调
const updatePermission = (row: Permission) => {
  dialogVisible.value = true;

};
</script>

<style scoped lang="scss">

</style>
