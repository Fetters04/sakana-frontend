<template>
  <!--三级分类全局组件-->
  <Category/>
  <el-card style="margin: 20px 0">
    <el-button type="primary" size="large" icon="Plus" :disabled="!categoryStore.c3Id">添加属性</el-button>
    <el-table border style="margin-top: 20px" :data="attrArr">
      <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
      <el-table-column label="属性名称" align="center" width="200px" prop="attrName"></el-table-column>
      <el-table-column label="属性值名称" align="center">
        <template #="{row, $index}">
          <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template #="{row, $index}">
          <el-button type="success" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { ref, watch } from 'vue';
import { reqAttr } from '@/api/product/attr';
import { Attr, AttrResponseData } from '@/api/product/attr/type';

// 获取分类仓库
let categoryStore = useCategoryStore();
// 存储已有的属性和属性值
let attrArr = ref<Attr[]>([]);

// 监听仓库三级分类ID变化
watch(() => categoryStore.c3Id, () => {
  // 清空上一次查询的属性和属性值
  attrArr.value = [];
  // 保证有三级分类ID才能获取
  if (!categoryStore.c3Id) return;
  // 获取属性和属性值数据
  getAttr();
});
// 获取已有的属性和属性值方法
const getAttr = async () => {
  // 获取分类ID
  const { c1Id, c2Id, c3Id } = categoryStore;
  // 发请求获取属性和属性值数据
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code == 200) {
    attrArr.value = result.data;
  }
};
</script>

<style scoped lang="scss">

</style>
