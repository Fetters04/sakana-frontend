<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline label-width="100px">
        <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
          <el-select class="attr" v-model="item.attrIdAndValueId">
            <el-option :value="`${item.id}:${attrValue.id}`"
                       v-for="attrValue in item.attrValueList"
                       :key="attrValue.id"
                       :label="attrValue.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline label-width="100px">
        <el-form-item v-for="item in saleAttrArr" :key="item.id" :label="item.saleAttrName">
          <el-select class="attr" v-model="item.saleIdAndValueId">
            <el-option :value="`${item.id}:${saleAttrValue.id}`"
                       v-for="saleAttrValue in item.spuSaleAttrValueList"
                       :key="saleAttrValue.id"
                       :label="saleAttrValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="tableVc">
        <el-table-column type="selection" width="100px" align="center"></el-table-column>
        <el-table-column label="图片" align="center">
          <template #="{row, $index}">
            <el-image :src="row.imgUrl" alt="" style="width: 150px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{row, $index}">
            <el-button @click="handlerDefault(row)" type="warning" size="default">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button @click="save" type="primary" size="default">保存
      </el-button>
      <el-button @click="cancel" size="default">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { SaleAttr, SaleAttrResponseData, SkuData, SpuData, SpuHasImg, SpuImage } from '@/api/product/spu/type';
import { reqAttr } from '@/api/product/attr';
import { reqAddSku, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import { reactive, ref } from 'vue';
import { Attr, AttrResponseData } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['changeScene']);
// 平台属性
let attrArr = ref<Attr[]>([]);
// 销售属性
let saleAttrArr = ref<SaleAttr[]>([]);
// 照片墙数据
let imgArr = ref<SpuImage[]>([]);
// 获取table组件实例
let tableVc = ref<any>();
// 收集SKU的参数
let skuParams = reactive<SkuData>({
  // 父组件传递row数据收集
  category3Id: '',    // 三级分类ID
  spuId: '',          // 已有的SPU的ID
  tmId: '',           // SPU品牌的ID
  // v-model收集
  skuName: '',        // sku名称
  price: '',          // sku价格
  weight: '',         // sku重量
  skuDesc: '',        // sku描述
  skuAttrValueList: [], // 平台属性
  skuSaleAttrValueList: [], // 销售属性
  // row收集
  skuDefaultImg: ''   // sku默认图片地址
});

// 取消按钮的回调
const cancel = () => {
  // 切换场景0
  $emit('changeScene', { flag: 0, params: '' });
};

// 初始化SKU相关数据
const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SpuData) => {
  // 收集SKU数据
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id;
  skuParams.tmId = spu.tmId;

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

// 设置默认图片按钮的回调
const handlerDefault = (row: SpuImage) => {
  // 点击的时候，全部图片的复选框不勾选
  imgArr.value.forEach((item: any) => {
    tableVc.value.toggleRowSelection(item, false);
  });
  // 按钮选中的图片复选框才勾选
  tableVc.value.toggleRowSelection(row, true);
  // 收集默认图片地址
  skuParams.skuDefaultImg = row.imgUrl;
};

// 保存按钮的回调
const save = async () => {
  // 整理平台属性参数
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':');
      prev.push({ attrId, valueId });
    }
    return prev;
  }, []);
  // 整理销售属性参数
  skuParams.skuSaleAttrValueList = saleAttrArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':');
      prev.push({ saleAttrId, saleAttrValueId });
    }
    return prev;
  }, []);
  // 发送添加SKU的请求
  let result: any = await reqAddSku(skuParams);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '添加SKU成功'
    });
    // 通知父组件切换场景0
    $emit('changeScene', { flag: 0, params: '' });
  } else {
    ElMessage({
      type: 'error',
      message: '添加SKU失败'
    });
  }
};

defineExpose({ initSkuData });
</script>

<style scoped lang="scss">
.attr {
  width: 300px;
  margin-bottom: 10px;
}
</style>
