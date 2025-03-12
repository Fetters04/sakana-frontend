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
    <el-table-column label="操作" fixed="right" width="210px">
      <template #="{row, $index}">
        <el-button v-has="`btn.Sku.updown`" @click="updateSale(row)" :type="row.isSale==1?'success':'primary'" size="small"
                   :icon="row.isSale==1?'Bottom':'Top'" :title="row.isSale==1?'下架':'上架'"></el-button>
        <el-button v-has="`btn.Sku.update`" type="warning" size="small" icon="Edit" title="修改SKU"></el-button>
        <el-button v-has="`btn.Sku.detail`" @click="findSku(row)" type="info" size="small" icon="InfoFilled" title="查看SKU详情"></el-button>
        <el-popconfirm :title="`您确定删除${row.skuName}吗？`" width="240px" @confirm="deleteSku(row)">
          <template #reference>
            <el-button v-has="`btn.Sku.remove`" type="danger" size="small" icon="Delete" title="删除SKU"></el-button>
          </template>
        </el-popconfirm>
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
  <!-- SKU详情抽屉组件 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4 style="font-size: 20px;">查看商品详情</h4>
    </template>
    <template #default>
      <div>
        <el-row class="skuInfo">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row class="skuInfo">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row class="skuInfo">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row class="skuInfo">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo.skuInfoAttrValueVO" :key="item.id"
                    type="primary" style="margin: 5px 5px">{{ item.attrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="skuInfo">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in skuInfo.skuInfoSaleAttrValueVO" :key="item.id"
                    type="success" style="margin: 5px 5px">{{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="skuInfo">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px" indicator-position="outside">
              <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqCancelSaleSku, reqHasSku, reqRemoveSKu, reqSaleSku, reqSkuInfo } from '@/api/product/sku';
import { SkuData, SkuInfoResponseData } from '@/api/product/sku/type';
import { ElMessage } from 'element-plus';

// 分页器当前页码
let pageNo = ref<number>(1);
// 每页展示数据量
let pageSize = ref<number>(10);
// 存储已有SKU总数
let total = ref<number>(0);
// 存储已有的SKU分页数据
let skuArr = ref<SkuData[]>([]);
// 控制抽屉显示与隐藏
let drawer = ref<boolean>(false);
// 存储SKU详情信息
let skuInfo = ref<SkuData>({});

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

// 查看SKU详情的回调
const findSku = async (row: SkuData) => {
  // 显示抽屉
  drawer.value = true;
  // 发送请求获取SKU详情
  let result: SkuInfoResponseData = await reqSkuInfo(row.id);
  console.log(result);
  if (result.code == 200) {
    skuInfo.value = result.data;
  }
};

// 删除SKU按钮的回调
const deleteSku = async (row: SkuData) => {
  // 发请求删除SKU
  let result: any = await reqRemoveSKu(row.id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    // 获取剩余数据
    await getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    });
  }
};

</script>

<style scoped lang="scss">
.skuInfo {
  margin: 20px 0;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
