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
  <!-- 主体内容 -->
  <el-card style="margin: 20px 0">
    <el-button @click="addUser" type="primary">添加用户</el-button>
    <el-button type="danger">批量删除</el-button>
    <!-- 展示用户信息 -->
    <el-table border style="margin: 20px 0" :data="userArr">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="ID" align="center" width="120px" prop="id"></el-table-column>
      <el-table-column label="用户名" align="center" prop="username" show-overflow-tooltip></el-table-column>
      <el-table-column label="呢称" align="center" prop="nickname" show-overflow-tooltip></el-table-column>
      <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
      <el-table-column label="创建时间" align="center" width="180px" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" width="180px" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template #="{row, $index}">
          <el-button type="primary" size="small" icon="User">分配角色</el-button>
          <el-button @click="updateUser(row)" type="success" size="small" icon="Edit">编辑</el-button>
          <el-button type="danger" size="small" icon="Delete">删除</el-button>
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
      <h4 style="font-size: 20px">添加用户</h4>
    </template>
    <template #default>
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="userParams.username" style="width: 300px" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userParams.nickname" style="width: 300px" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userParams.password" style="width: 300px" placeholder="请输入密码"></el-input>
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
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { HasUserResponseData, UserInfo } from '@/api/acl/user/type';
import { reqAddOrUpdateUser, reqUserInfo } from '@/api/acl/user';
import { ElMessage } from 'element-plus';

// 当前页码
let pageNo = ref<number>(1);
// 页量
let pageSize = ref<number>(5);
// 用户数据总量
let total = ref<number>(0);
// 存储用户分页数据
let userArr = ref<UserInfo[]>([]);
// 控制抽屉的显示
let drawer = ref<boolean>(false);
// 收集用户信息
let userParams = reactive<UserInfo>({
  username: '',
  nickname: '',
  password: ''
});

onMounted(() => {
  // 获取用户分页数据
  getHasUser();
});

// 获取已有的用户信息分页数据
const getHasUser = async (pager = 1) => {
  // 收集当前页码
  pageNo.value = pager;
  // 发请求获取用户分页数据
  let result: HasUserResponseData = await reqUserInfo(pageNo.value, pageSize.value);
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
    username: '',
    nickname: '',
    password: ''
  });
};

// 编辑按钮的回调
const updateUser = (row: UserInfo) => {
  // 展示抽屉
  drawer.value = true;
  // 用户数据回显
  Object.assign(userParams, row);
};

// 保存按钮的回调
const save = async () => {
  // 发请求添加|修改用户信息
  let result: any = await reqAddOrUpdateUser(userParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功' : '添加成功'
    });
    // 获取最新用户分页数据
    await getHasUser();
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败' : '添加失败'
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
</script>

<style scoped lang="scss">

</style>
