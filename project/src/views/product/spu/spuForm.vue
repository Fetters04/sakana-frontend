<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请您输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU名称">
      <el-select style="width: 300px" v-model="spuParams.tmId">
        <el-option v-for="item in allTrademark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请您输入SPU描述" v-model="spuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
          v-model:file-list="imgList"
          action="/api/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="handleUpload"
      >
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible" style="width: 500px">
        <img :src="dialogImageUrl" alt="Preview Image" width="100%"/>
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select style="width: 300px">
        <el-option label="小米"></el-option>
        <el-option label="华为"></el-option>
        <el-option label="苹果"></el-option>
      </el-select>
      <el-button style="margin-left: 20px" type="primary" size="default" icon="Plus">添加属性值</el-button>
      <!-- 展示销售属性与属性值 -->
      <el-table border style="margin: 20px 0">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性名" width="240px"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作" width="240px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default">保存</el-button>
      <el-button @click="cancel" size="default">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {
  AllTrademark,
  HasSaleAttr,
  HasSaleAttrResponseData,
  SaleAttr,
  SaleAttrResponseData,
  SpuData,
  SpuHasImg,
  SpuImage,
  Trademark
} from '@/api/product/spu/type';
import { reqAllSaleAttr, reqAllTrademark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

let $emit = defineEmits(['changeScene']);

// 通知父组件切换场景0
const cancel = () => {
  $emit('changeScene', 0);
};

// 存储SPU相关数据
let allTrademark = ref<Trademark[]>([]);
let imgList = ref<SpuImage[]>([]);
let saleAttr = ref<SaleAttr[]>([]);
let allSaleAttr = ref<HasSaleAttr[]>([]);
// 收集SPU对象数据
let spuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: []
});
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false);
// 存储预览图片的地址
let dialogImageUrl = ref<string>('');

// 回显Spu数据+发请求
const initHasSpuData = async (spu: SpuData) => {
  // 存储SPU对象，用来在模板展示
  spuParams.value = spu;
  // 获取全部品牌数据
  let result1: AllTrademark = await reqAllTrademark();
  // 获取某SPU下全部售卖商品图片
  let result2: SpuHasImg = await reqSpuImageList(spu.id);
  // 获取已有的SPU销售属性的数据
  let result3: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id);
  // 获取全部销售属性数据
  let result4: HasSaleAttrResponseData = await reqAllSaleAttr();

  // 存储全部品牌数据
  allTrademark.value = result1.data;
  // SPU对应的商品图片
  imgList.value = result2.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    };
  });
  // 存储已有的SPU的销售属性
  saleAttr.value = result3.data;
  // 存储全部销售属性
  allSaleAttr.value = result4.data;
};
defineExpose({ initHasSpuData });

// 照片墙点击预览按钮时触发的钩子
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl = file.url;
  // 弹出对话框
  dialogVisible.value = true;
};
// 照片墙删除文件的钩子
const handleRemove = () => {
  console.log(123);
};
// 照片墙上传成功前的钩子，限制上传图片的类型和大小
const handleUpload = (file: any) => {
  // 要求：上传文件格式 jpg|png|gif 4M
  if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小应小于4M'
      });
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必为 jpg, png, gif'
    });
    return false;
  }
};
</script>

<style scoped lang="scss">

</style>
