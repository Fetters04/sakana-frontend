<template>
  <el-card>
    <!-- 搜索框 -->
    <el-form inline>
      <el-form-item label="角色搜索">
        <el-input v-model="keyword" placeholder="请输入角色的关键字" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getHasRole()" type="primary" size="default">搜索</el-button>
        <el-button @click="reset" size="default">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 主体内容 -->
  <el-card style="margin: 20px 0">
    <el-button type="primary" icon="Plus">添加角色</el-button>
    <el-table border style="margin: 20px 0" :data="allRole">
      <el-table-column label="#" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column label="角色名" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template #="{row, $index}">
          <el-button type="primary" size="small" icon="User">分配权限</el-button>
          <el-button type="success" size="small" icon="Edit">编辑</el-button>
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
        :total=total
        @current-change="getHasRole"
        @size-change="getHasRole(1)"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqAllRoleList } from '@/api/acl/role';
import { HasRoleResponseData, RoleInfo } from '@/api/acl/role/type';

let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
let total = ref<number>(0);
// 搜索角色关键字
let keyword = ref<string>('');
// 存储角色分页数据
let allRole = ref<RoleInfo[]>([]);

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
</script>

<style scoped lang="scss">

</style>
