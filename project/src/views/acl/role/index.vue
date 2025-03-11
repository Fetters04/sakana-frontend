<template>
  <el-card>
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item label="角色搜索">
        <el-input v-model="keyword" placeholder="请输入角色的关键字" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getHasRole()" :disabled="!keyword" type="primary" size="default">搜索</el-button>
        <el-button @click="reset" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 主体内容 -->
  <el-card style="margin: 20px 0">
    <el-button @click="addRole" type="primary" icon="Plus">添加角色</el-button>
    <el-table border style="margin: 20px 0" :data="allRole">
      <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="角色名" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template #="{row, $index}">
          <el-button @click="setPermission(row)" type="primary" size="small" icon="User">分配权限</el-button>
          <el-button @click="updateRole(row)" type="success" size="small" icon="Edit">编辑</el-button>
          <el-popconfirm :title="`您确定要删除${row.roleName}吗？`" width="260px" @confirm="deleteRole(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total=total
        @current-change="getHasRole"
        @size-change="getHasRole(1)"
    />
  </el-card>
  <!-- 添加角色|修改角色的对话框 -->
  <el-dialog v-model="dialogVisible" :title="roleParams.id?'更新角色':'添加角色'">
    <el-form :model="roleParams" :rules="rules" ref="formRef">
      <el-form-item label="角色名" prop="roleName">
        <el-input placeholder="请输入角色名" v-model="roleParams.roleName"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <!-- 分配权限的抽屉 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配菜单与按钮的权限</h4>
    </template>
    <template #default>
      <!-- 树形控件 -->
      <el-tree
          ref="tree"
          :data="menuArr"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer=false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateRole, reqAllRoleList, reqRemoveRole, reqRoleMenuList, reqSetPermission } from '@/api/acl/role';
import { HasRoleResponseData, RoleInfo } from '@/api/acl/role/type';
import { ElMessage } from 'element-plus';
import { Permission, PermissionResponseData } from '@/api/acl/menu/type';

let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
// 搜索角色关键字
let keyword = ref<string>('');
// 存储角色分页数据
let allRole = ref<RoleInfo[]>([]);
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
// 收集新增角色数据
let roleParams = reactive<RoleInfo>({
  roleName: ''
});
// 获取Form组件实例
let formRef = ref<any>();
// 控制抽屉展示
let drawer = ref<boolean>(false);
// 树形结构
const defaultProps = {
  children: 'children',
  label: 'name'
};
// 存储权限数据
let menuArr = ref<Permission[]>([]);
// 存储勾选的四级节点ID
let selectArr = ref<number[]>([]);
// 获取树形组件实例
let tree = ref<any>();

onMounted(() => {
  // 获取角色数据
  getHasRole();
});

// 获取角色的分页数据
const getHasRole = async (pager = 1) => {
  pageNo.value = pager;
  let result: HasRoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);
  if (result.code == 200) {
    allRole.value = result.data.records;
    total.value = result.data.total;
  }
};

// 重置按钮的回调
const reset = () => {
  keyword.value = '';
  getHasRole();
};

// 添加角色按钮的回调
const addRole = () => {
  dialogVisible.value = true;
  // 清空数据
  Object.assign(roleParams, {
    id: 0,
    roleName: ''
  });
  // 清除上一次校验提示信息
  nextTick(() => {
    formRef.value.clearValidate('roleName');
  });
};

// 编辑按钮的回调
const updateRole = (row: RoleInfo) => {
  console.log(row);
  dialogVisible.value = true;
  // 用户数据回显
  Object.assign(roleParams, row);
  // 清除上一次校验提示信息
  nextTick(() => {
    formRef.value.clearValidate('roleName');
  });
};

const validatorRoleName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error('角色名至少2位'));
  }
};
// 角色名校验规则
const rules = {
  roleName: [
    { required: true, trigger: 'blur', validator: validatorRoleName }
  ]
};

// 确定按钮的回调
const save = async () => {
  // 保证字段校验通过才能发请求
  await formRef.value.validate();
  // 发请求添加|修改角色信息
  let result: any = await reqAddOrUpdateRole(roleParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '修改成功' : '添加成功'
    });
    // 获取最新角色分页数据
    await getHasRole(roleParams.id ? pageNo.value : 1);
    dialogVisible.value = false;
  }
};

// 分配权限按钮的回调
const setPermission = async (row: RoleInfo) => {
  drawer.value = true;
  // 收集当前要分配权限的数据
  Object.assign(roleParams, row);
  // 根据角色获取对应权限
  let result: PermissionResponseData = await reqRoleMenuList(roleParams.id);
  if (result.code == 200) {
    menuArr.value = result.data;
    selectArr.value = filterSelectArr(menuArr.value, []);
  }
};

// 过滤出勾选的四级权限id
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) initArr.push(item.id);
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr);
    }
  });
  return initArr;
};

// 确定按钮的回调
const confirm = async () => {
  // 角色ID
  const roleId = roleParams.id;
  // 选中根节点ID
  let rootIds = tree.value.getCheckedKeys();
  // 半选节点ID
  let halfIds = tree.value.getHalfCheckedKeys();
  // 下发权限
  let selectedIds = rootIds.concat(halfIds);
  let result = await reqSetPermission(roleId, selectedIds);
  if (result.code == 200) {
    drawer.value = false;
    ElMessage({
      type: 'success',
      message: '分配权限成功'
    });
    // 页面刷新
    window.location.reload();
  }
};

// 删除角色
const deleteRole = async (id: number) => {
  let result = await reqRemoveRole(id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    await getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};
</script>

<style scoped lang="scss">

</style>
