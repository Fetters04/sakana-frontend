<template>
  <el-table border style="margin: 20px 0" :data="skuArr">
    <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
    <el-table-column label="名称" show-overflow-tooltip prop="skuName"></el-table-column>
    <el-table-column label="描述" prop="skuDesc"></el-table-column>
    <el-table-column label="默认图片">
      <template #="{row, $index}">
        <img :src="row.skuDefaultImg" alt="" style="width: 100px">
      </template>
    </el-table-column>
    <el-table-column label="重量(g)" prop="weight"></el-table-column>
    <el-table-column label="价格(元)" prop="price"></el-table-column>
    <el-table-column label="操作" fixed="right">
      <template #="{row, $index}">
        <el-button type="primary" size="small" icon="Top"></el-button>
        <el-button type="warning" size="small" icon="Edit"></el-button>
        <el-button type="info" size="small" icon="InfoFilled"></el-button>
        <el-button type="danger" size="small" icon="Delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="getHasSku"
      @size-change="getHasSku(1)"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHasSku } from '@/api/product/sku';
import { SkuData } from '@/api/product/sku/type';

// 分页器当前页码
let pageNo = ref<number>(1);
// 每页展示数据量
let pageSize = ref<number>(10);
// 存储已有SKU总数
let total = ref<number>(0);
// 存储已有的SKU数据
let skuArr = ref<SkuData[]>([]);

// 组件一挂载就请求分页数据展示
onMounted(() => {
  // 获取数据
  getHasSku();
});

// 获取SKU分页数据
const getHasSku = async (pager = 1) => {
  // 当前分页器页码
  pageNo.value = pager;
  // 请求分页数据
  let result = await reqHasSku(pageNo.value, pageSize.value);
  if (result.code == 200) {
    total.value = result.data.total;
    skuArr.value = result.data.records;
  }
};

</script>

<style scoped lang="scss">

</style>
