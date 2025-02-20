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
          <el-button type="success" size="small" icon="User">编辑</el-button>
          <el-button type="danger" size="small" icon="User">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { HasUserResponseData, UserInfo } from '@/api/acl/user/type';
import { reqUserInfo } from '@/api/acl/user';

// 当前页码
let pageNo = ref<number>(1);
// 页量
let pageSize = ref<number>(5);
// 用户数据总量
let total = ref<number>(0);
// 存储用户分页数据
let userArr = ref<UserInfo[]>([]);

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

</script>

<style scoped lang="scss">

</style>
