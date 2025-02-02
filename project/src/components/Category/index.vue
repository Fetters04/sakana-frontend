<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类" style="width: 300px">
        <el-select v-model="categoryStore.c1Id">
          <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="width: 300px">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="北京"></el-option>
          <el-option label="北京"></el-option>
          <el-option label="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="width: 300px">
        <el-select>
          <el-option label="北京"></el-option>
          <el-option label="北京"></el-option>
          <el-option label="北京"></el-option>
          <el-option label="北京"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

let categoryStore = useCategoryStore();
// 分类组件挂载完毕，通知仓库发请求获取一级分类数据
onMounted(() => {
  getC1();
});

// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1();
};
</script>

<style scoped lang="scss">

</style>
