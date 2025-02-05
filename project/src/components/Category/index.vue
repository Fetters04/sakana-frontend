<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类" style="width: 300px">
        <el-select :disabled="scene!=0" v-model="categoryStore.c1Id" @change="handlerFirst">
          <el-option v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="width: 300px">
        <el-select :disabled="scene!=0" v-model="categoryStore.c2Id" @change="handlerSecond">
          <el-option v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="width: 300px">
        <el-select :disabled="scene!=0" v-model="categoryStore.c3Id">
          <el-option v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category';

// 获取分类仓库
let categoryStore = useCategoryStore();

// 分类组件挂载完毕，通知仓库发请求获取一级分类数据
onMounted(() => {
  getC1();
});

// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1();
};

// 一级下拉菜单change事件（保证有一级分类的id）
const handlerFirst = () => {
  // 清空二级、三级数据
  categoryStore.c2Id = '';
  categoryStore.c3Arr = [];
  categoryStore.c3Id = '';
  // 通知仓库获取二级分类
  categoryStore.getC2();
};
// 二级下拉菜单change事件（保证有二级分类的id）
const handlerSecond = () => {
  // 清空三级数据
  categoryStore.c3Id = '';
  // 通知仓库获取三级分类
  categoryStore.getC3();
};

// 接收父组件传递的scene
defineProps(['scene']);
</script>

<style scoped lang="scss">

</style>
