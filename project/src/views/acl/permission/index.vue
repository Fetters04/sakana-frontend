<template>
  <!-- 数据展示区 -->
  <el-table :data="permissionArr" style="width: 100%; margin: 20px 0;" row-key="id" border>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="权限值" prop="code"></el-table-column>
    <el-table-column label="修改时间" prop="updateTime"></el-table-column>
    <el-table-column label="操作">
      <template #="{row, $index}">
        <el-button @click="addPermission(row)" type="primary" size="small" :disabled="row.level==4">
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button @click="updatePermission(row)" type="success" size="small" :disabled="row.level==1">编辑</el-button>
        <el-button type="danger" size="small" :disabled="row.level==1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加或更新的对话框 -->
  <el-dialog v-model="dialogVisible" :title="menuParams.id?'更新菜单':'添加菜单'">
    <el-form :model="menuParams" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="menuParams.name" placeholder="请输入菜单名称"/>
      </el-form-item>
      <el-form-item label="权限值" prop="code">
        <el-input v-model="menuParams.code" placeholder="请输入权限值"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible=false">取消</el-button>
      <el-button @click="save" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateMenu, reqAllPermission } from '@/api/acl/menu';
import { MenuParams, Permission, PermissionResponseData } from '@/api/acl/menu/type';
import { ElMessage } from 'element-plus';

// 存储菜单数据
let permissionArr = ref<Permission[]>([]);
let dialogVisible = ref<boolean>(false);
// 收集菜单参数
let menuParams = reactive<MenuParams>({
  pid: 0,
  name: '',
  code: '',
  level: 0
});
// 获取Form组件实例
let formRef = ref<any>();

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
const addPermission = (row: Permission) => {
  // 清空收集的数据
  Object.assign(menuParams, {
    id: 0,
    pid: 0,
    name: '',
    code: '',
    level: 0
  });
  dialogVisible.value = true;
  // 收集菜单参数的值
  menuParams.level = row.level + 1;
  menuParams.pid = row.id;
  // 清除上一次校验提示信息
  nextTick(() => {
    formRef.value.clearValidate('name');
    formRef.value.clearValidate('code');
  });
};

// 编辑菜单按钮的回调
const updatePermission = (row: Permission) => {
  dialogVisible.value = true;
  // 收集菜单参数的值
  Object.assign(menuParams, row);
  // 清除上一次校验提示信息
  nextTick(() => {
    formRef.value.clearValidate('name');
    formRef.value.clearValidate('code');
  });
};

// 确定按钮的回调
const save = async () => {
  // 发请求新增或修改菜单
  let result = await reqAddOrUpdateMenu(menuParams);
  if (result.code == 200) {
    // 隐藏对话框
    dialogVisible.value = false;
    ElMessage({
      type: 'success',
      message: menuParams.id ? '更新成功' : '添加成功'
    });
    // 再次获取最新数据
    await getHasPermission();
  }
};

const validatorName = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 0) {
    callback();
  } else {
    callback(new Error('名称不能为空'));
  }
};
const validatorCode = (rule: any, value: any, callback: any) => {
  if (value.trim().length > 0) {
    callback();
  } else {
    callback(new Error('权限值不能为空'));
  }
};
// 菜单校验规则
const rules = {
  name: [
    { required: true, trigger: 'blur', validator: validatorName }
  ],
  code: [
    { required: true, trigger: 'blur', validator: validatorCode }
  ]
};
</script>

<style scoped lang="scss">

</style>
