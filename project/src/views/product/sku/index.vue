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
        <el-button @click="updateSale(row)" :type="row.isSale==1?'success':'primary'" size="small"
                   :icon="row.isSale==1?'Bottom':'Top'" :title="row.isSale==1?'下架':'上架'"></el-button>
        <el-button type="warning" size="small" icon="Edit" title="修改SKU"></el-button>
        <el-button type="info" size="small" icon="InfoFilled" title="查看SKU详情"></el-button>
        <el-button type="danger" size="small" icon="Delete" title="删除SKU"></el-button>
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
import { reqCancelSaleSku, reqHasSku, reqSaleSku } from '@/api/product/sku';
import { SkuData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';

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

// SKU上架与下架的方法
const updateSale = async (row: SkuData) => {
  // isSale == 1，说明当前为上架状态 -> 更新为下架状态
  if (row.isSale == 1) {
    // 发送下架请求
    await reqCancelSaleSku(row.id);
    ElMessage({
      type: 'success',
      message: '下架成功'
    });
  }
  // 否则当前为下架状态 -> 更新为上架状态
  else {
    // 发送上架请求
    await reqSaleSku(row.id);
    ElMessage({
      type: 'success',
      message: '上架成功'
    });
  }
  await getHasSku(pageNo.value);
};
</script>

<style scoped lang="scss">

</style>
