<template>
  <el-card>
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item label="用户名">
        <el-input v-model="keyword" placeholder="请输入搜索用户名" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary" :disabled="!keyword">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 主体内容 -->
  <el-card style="margin: 20px 0">
    <el-button @click="addUser" type="primary">添加用户</el-button>
    <el-button @click="batchDeleteUser" type="danger" :disabled="selectUserArr.length==0">批量删除</el-button>
    <!-- 展示用户信息 -->
    <el-table @selection-change="selectChange" border style="margin: 20px 0" :data="userArr">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="ID" align="center" width="120px" prop="id"></el-table-column>
      <el-table-column label="用户名" align="center" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="呢称" align="center" prop="nickname" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="手机号" align="center" prop="phone"></el-table-column>
      <el-table-column label="创建时间" align="center" width="180px" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" width="180px" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template #="{row, $index}">
          <el-button @click="setRole(row)" type="primary" size="small" icon="User">分配角色</el-button>
          <el-button @click="updateUser(row)" type="success" size="small" icon="Edit">编辑</el-button>
          <el-popconfirm :title="`您确定删除${row.username}吗？`" width="260px" @confirm="deleteUser(row)">
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
        :total="total"
        @current-change="getHasUser"
        @size-change="getHasUser(1)"
    />
  </el-card>
  <!-- 抽屉：添加用户|修改用户时展示 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4 style="font-size: 20px">{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form label-width="80px" :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userParams.username" style="width: 300px" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="userParams.nickname" style="width: 300px" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!userParams.id">
          <el-input v-model="userParams.password" style="width: 300px" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userParams.phone" style="width: 300px" placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel" size="large">取消</el-button>
        <el-button @click="save" size="large" type="primary">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉：分配角色时展示 -->
  <el-drawer v-model="drawer2">
    <template #header>
      <h4 style="font-size: 20px">分配角色</h4>
    </template>
    <template #default>
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input style="width: 300px" v-model="userParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox v-model="checkAll"
                       :indeterminate="isIndeterminate"
                       @change="handleCheckAllChange">全选
          </el-checkbox>
          <!-- 显示职位的复选框 -->
          <el-checkbox-group v-model="assignRolesList" @change="handleCheckedRolesChange">
            <el-checkbox v-for="role in allRolesList" :key="role.id" :label="role">{{ role.roleName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button size="large">取消</el-button>
        <el-button @click="doAssignRole" size="large" type="primary">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue';
import { AllRoleResponseData, HasUserResponseData, RoleData, SetRoleData, UserInfo } from '@/api/acl/user/type';
import {
  reqAddOrUpdateUser,
  reqAllRole,
  reqBatchRemoveUser,
  reqRemoveUser,
  reqSetUserRole,
  reqUserInfo
} from '@/api/acl/user';
import { ElMessage } from 'element-plus';

// 当前页码
let pageNo = ref<number>(1);
// 页量
let pageSize = ref<number>(5);
// 用户数据总量
let total = ref<number>(0);
// 存储用户分页数据
let userArr = ref<UserInfo[]>([]);
// 控制添加|修改用户抽屉的显示
let drawer = ref<boolean>(false);
// 控制分配角色抽屉的显示
let drawer2 = ref<boolean>(false);
// 收集用户信息
let userParams = reactive<UserInfo>({
  username: '',
  nickname: '',
  password: '',
  phone: ''
});
// 获取Form组件实例
let formRef = ref<any>();
// 存储批量删除用户
let selectUserArr = ref<number[]>([]);
// 收集搜索框输入
let keyword = ref<string>('');
// 角色复选框的控制变量和回调方法
const checkAll = ref<boolean>(false);
const isIndeterminate = ref<boolean>(true);
const assignRolesList = ref<RoleData[]>([]);
const allRolesList = ref<RoleData[]>([]);
const handleCheckAllChange = (val: boolean) => {
  assignRolesList.value = val ? allRolesList.value : [];
  isIndeterminate.value = false;
};
const handleCheckedRolesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRolesList.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRolesList.value.length;
};

onMounted(() => {
  // 获取用户分页数据
  getHasUser();
});

// 获取已有的用户信息分页数据
const getHasUser = async (pager = 1) => {
  // 收集当前页码
  pageNo.value = pager;
  // 发请求获取用户分页数据
  let result: HasUserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value);
  if (result.code == 200) {
    userArr.value = result.data.records;
    total.value = result.data.total;
  }
};

// 添加用户按钮的回调
const addUser = () => {
  // 展示抽屉
  drawer.value = true;
  // 清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    nickname: '',
    password: '',
    phone: ''
  });
  // 清除上一次校验提示信息
  nextTick(() => {
    formRef.value.clearValidate('username');
    formRef.value.clearValidate('nickname');
    formRef.value.clearValidate('password');
  });
};

// 编辑按钮的回调
const updateUser = (row: UserInfo) => {
  // 展示抽屉
  drawer.value = true;
  // 用户数据回显
  Object.assign(userParams, row);
  // 清除上一次校验提示信息
  nextTick(() => {
    formRef.value.clearValidate('username');
    formRef.value.clearValidate('nickname');
    formRef.value.clearValidate('password');
  });
};

// 保存按钮的回调
const save = async () => {
  // 保证字段校验通过才能发请求
  await formRef.value.validate();
  // 发请求添加|修改用户信息
  let result: any = await reqAddOrUpdateUser(userParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功' : '添加成功'
    });
    // 获取最新用户分页数据
    await getHasUser(pageNo.value);
  } else {
    ElMessage({
      type: 'error',
      message: result.message
    });
  }
  // 关闭抽屉
  drawer.value = false;
};

// 取消按钮的回调
const cancel = () => {
  // 关闭抽屉
  drawer.value = false;
};

// 校验用户名的回调函数
const validatorUsername = (rule, value, callBack) => {
  // 定义正则表达式，用于匹配仅包含英文和数字的字符串
  const reg = /^[a-zA-Z0-9]+$/;

  // 去除字符串首尾空格
  const trimmedValue = value.trim();

  if (trimmedValue.length >= 5) {
    if (reg.test(trimmedValue)) {
      // 长度至少5位且仅由英文和数字组成，校验通过
      callBack();
    } else {
      // 不符合仅由英文和数字组成的规则
      callBack(new Error('用户名只能由英文和数字组成'));
    }
  } else {
    // 长度不足5位
    callBack(new Error('用户名至少5位'));
  }
};
// 校验昵称的回调函数
const validatorNickname = (rule: any, value: any, callBack: any) => {
  // 长度至少5位
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('昵称至少2位'));
  }
};
// 校验昵称的回调函数
const validatorPassword = (rule: any, value: any, callBack: any) => {
  // 长度至少5位
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error('密码至少6位'));
  }
};
// 表单校验规则对象
const rules = {
  username: [
    { required: true, trigger: 'blur', validator: validatorUsername }
  ],
  nickname: [
    { required: true, trigger: 'blur', validator: validatorNickname }
  ],
  password: [
    { required: true, trigger: 'blur', validator: validatorPassword }
  ]
};

// 分配角色按钮的回调
const setRole = async (row: UserInfo) => {
  // 用户数据回显
  Object.assign(userParams, row);
  // 发送请求获取全部角色数据和当前用户的角色数据
  let result: AllRoleResponseData = await reqAllRole(row.id);
  if (result.code == 200) {
    allRolesList.value = result.data.allRolesList;
    assignRolesList.value = result.data.assignRolesList;
    // 展示抽屉
    drawer2.value = true;
  }
};

// 确定按钮的回调（分配角色）
const doAssignRole = async () => {
  // 收集参数
  let data: SetRoleData = {
    userId: userParams.id,
    roleIdList: assignRolesList.value.map(item => item.id)
  };
  // 发送请求分配用户角色
  let result = await reqSetUserRole(data);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配角色成功'
    });
    // 关闭抽屉
    drawer2.value = false;
    // 更新完再次获取数据
    await getHasUser(pageNo.value);
  }
};

// 删除单个用户
const deleteUser = async (row: UserInfo) => {
  let result: any = await reqRemoveUser(row.id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    await getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  }
};

// table 复选框勾选时触发
const selectChange = (value) => {
  // value 是注入勾选的用户对象
  selectUserArr.value = value;
};

// 批量删除按钮的回调
const batchDeleteUser = async () => {
  // 整理参数
  let ids: number[] = selectUserArr.value.map(item => item.id);
  console.log(ids);
  let result: any = await reqBatchRemoveUser(ids);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功'
    });
    await getHasUser();
  }
};

// 搜索按钮的回调
const search = () => {
  getHasUser();
};
// 重置按钮的回调
const reset = () => {
  keyword.value = '';
  getHasUser();
};
</script>

<style scoped lang="scss">

</style>
