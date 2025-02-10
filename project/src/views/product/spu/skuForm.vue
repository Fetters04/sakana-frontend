<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline label-width="100px">
        <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
          <el-select class="attr">
            <el-option v-for="attrValue in item.attrValueList" :key="attrValue.id"
                       :label="attrValue.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline label-width="100px">
        <el-form-item v-for="item in saleAttrArr" :key="item.id" :label="item.saleAttrName">
          <el-select class="attr">
            <el-option v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                       :label="saleAttrValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr">
        <el-table-column type="selection" width="100px" align="center"></el-table-column>
        <el-table-column label="图片" align="center">
          <template #="{row, $index}">
            <el-image :src="row.imgUrl" alt="" style="width: 150px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{row, $index}">
            <el-button type="warning" size="default">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存
      </el-button>
      <el-button @click="cancel" size="default">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { SaleAttr, SaleAttrResponseData, SpuData, SpuHasImg, SpuImage } from '@/api/product/spu/type';
import { reqAttr } from '@/api/product/attr';
import { reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import { ref } from 'vue';
import { Attr, AttrResponseData } from '@/api/product/attr/type';

let $emit = defineEmits(['changeScene']);
// 平台属性
let attrArr = ref<Attr[]>([]);
// 销售属性
let saleAttrArr = ref<SaleAttr[]>([]);
// 照片墙数据
let imgArr = ref<SpuImage[]>([]);

// 取消按钮的回调
const cancel = () => {
  // 切换场景0
  $emit('changeScene', { flag: 0, params: '' });
};

// 初始化SKU相关数据
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  // 获取平台属性
  let result1: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id);
  // 获取对应销售属性
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id);
  // 获取照片墙数据
  let result3: SpuHasImg = await reqSpuImageList(spu.id);

  // 收集平台属性
  attrArr.value = result1.data;
  // 收集销售属性
  saleAttrArr.value = result2.data;
  // 收集照片墙数据
  imgArr.value = result3.data;
};
defineExpose({ initSkuData });
</script>

<style scoped lang="scss">
.attr {
  width: 300px;
  margin-bottom: 10px;
}
</style>
