<template>
  <el-card class="box-card">
    <!--添加品牌按钮-->
    <el-button type="primary" size="large" icon="Plus">添加品牌</el-button>
    <!--表格组件：展示数据-->
    <el-table style="margin: 20px 0" border :data="trademarkArr">
      <el-table-column label="序号" width="150px" align="center" type="index"/>
      <el-table-column label="品牌名称" align="center">
        <template #="{row, $index}">
          <pre style="color: brown; font-size: 20px">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{row, $index}">
          <img :src="row.logoUrl" alt="" style="height: 100px;"/>
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #="{row, $index}">
          <el-button type="primary" size="default" icon="Edit"></el-button>
          <el-button type="primary" size="default" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
         pagination
            v-model:current-page: 当前页数
            v-model:page-size: 每页显示条目个数
            page-sizes: 每页显示个数选择器的选项设置
            background:	是否为分页按钮添加背景色
            layout:	设置六个子组件布局
    -->
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqHasTrademark } from '@/api/product/trademark';
import { Records, TrademarkResponseData } from '@/api/product/trademark/type';

// 当前页数
let pageNo = ref<number>(1);
// 每页显示条目个数
let pageSize = ref<number>(10);
// 数据总数
let total = ref<number>(0);
// 已有品牌数据
let trademarkArr = ref<Records>([]);

// 获取已有品牌
const getHasTrademark = async () => {
  let result: TrademarkResponseData = await reqHasTrademark(pageNo.value, pageSize.value);
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};
onMounted(() => {
  getHasTrademark();
});
</script>

<style scoped lang="scss">

</style>
