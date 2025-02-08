<template>
  <!-- 三级分类 -->
  <Category :scene="scene"/>
  <el-card style="margin: 20px 0">
    <div v-show="scene==0">
      <el-button @click="addSpu" :disabled="!categoryStore.c3Id" type="primary" size="large" icon="Plus">添加SPU
      </el-button>
      <!-- 展示已有SPU数据 -->
      <el-table border style="margin: 20px 0" :data="records">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName" width="240px"></el-table-column>
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{row, $index}">
            <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
            <el-button @click="updateSpu(row)" type="warning" size="small" icon="Edit" title="修改SPU"></el-button>
            <el-button type="info" size="small" icon="View" title="查看SKU列表"></el-button>
            <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 10]"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getHasSpu"
          @size-change="getHasSpu(1)"
      />
    </div>
    <!-- 添加SPU|修改SPU子组件 -->
    <SpuForm ref="spuFormVc" v-show="scene==1" @changeScene="changeScene"></SpuForm>
    <!-- 添加SKU子组件 -->
    <SkuForm v-show="scene==2"></SkuForm>
  </el-card>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue';
import useCategoryStore from '@/store/modules/category';
import { reqHasSPU } from '@/api/product/spu';
import { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type';
import SpuForm from '@/views/product/spu/spuForm.vue';
import SkuForm from '@/views/product/spu/skuForm.vue';

// 场景切换
let scene = ref<number>(0);   // 0：显示已有SPU  1：添加或修改已有SPU  2：添加SKU的结构
// 分页器默认页码
let pageNo = ref<number>(1);
// 每一页展示数据量
let pageSize = ref<number>(3);
// 获取分类仓库
let categoryStore = useCategoryStore();
// 存储已有的SPU数据
let records = ref<Records>([]);
// 存储已有SPU总数
let total = ref<number>(0);
// 获取SpuForm组件实例
let spuFormVc = ref<any>();

// 监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
  // 清空上次分页查询SUP相关数据
  records.value = [];
  total.value = 0;
  // 保证有三级分类ID才能获取
  if (!categoryStore.c3Id) return;
  // 获取数据
  getHasSpu();
});

// 获取某个三级分类下全部已有的SPU数据
const getHasSpu = async (pager = 1) => {
  // 修改当前页码
  pageNo.value = pager;
  let result: HasSpuResponseData = await reqHasSPU(pageNo.value, pageSize.value, categoryStore.c3Id);
  if (result.code == 200) {
    records.value = result.data.records;
    total.value = result.data.total;
  }
};

// 添加SPU按钮回调
const addSpu = () => {
  // 切换为场景1：添加与修改已有SPU结构 -> SpuForm
  scene.value = 1;
};
// 修改SPU按钮回调
const updateSpu = (row: SpuData) => {
  // 切换为场景1：添加与修改已有SPU结构 -> SpuForm
  scene.value = 1;
  // 调用子组件实例方法，获取完整已有的SPU数据
  spuFormVc.value.initHasSpuData(row);
};

// 子组件SpuForm绑定自定义事件：让子组件通知父组件切换场景0
const changeScene = (num: number) => {
  // 子组件SpuForm点击取消切换场景
  scene.value = num;
};

// 组件销毁时清空分类仓库相关数据
onBeforeUnmount(() => {
  // 清空仓库数据
  categoryStore.$reset();
});
</script>

<style scoped lang="scss">

</style>
