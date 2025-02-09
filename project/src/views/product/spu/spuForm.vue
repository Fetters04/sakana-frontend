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
      <!-- 展示未拥有销售属性的下拉菜单 -->
      <el-select style="width: 300px" v-model="saleAttrIdAndValueName"
                 :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:'无'">
        <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name"
                   :value="`${item.id}:${item.name}`"></el-option>
      </el-select>
      <el-button @click="addSaleAttr" :disabled="!saleAttrIdAndValueName"
                 style="margin-left: 20px" type="primary" size="default" icon="Plus">添加属性
      </el-button>
      <!-- 展示销售属性与属性值 -->
      <el-table border style="margin: 20px 0" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性名" width="240px" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <!-- row：为当前SPU已有的销售属性对象 -->
          <template #="{row, $index}">
            <el-tag v-for="(item, index) in row.spuSaleAttrValueList"
                    @close="row.spuSaleAttrValueList.splice(index, 1)"
                    closable :key="item.id" style="margin: 0 5px">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input v-if="row.flag" @blur="toLook(row)" v-model="row.saleAttrValue"
                      placeholder="请输入属性值" size="small" style="width: 120px"></el-input>
            <el-button v-else @click="toEdit(row)" type="primary" size="small" icon="Plus"
                       style="margin: 0 5px"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <!-- 删除属性 -->
          <template #="{row, $index}">
            <el-button @click="saleAttr.splice($index, 1)"
                       type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
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
  SaleAttrResponseData, SaleAttrValue,
  SpuData,
  SpuHasImg,
  SpuImage,
  Trademark
} from '@/api/product/spu/type';
import { reqAllSaleAttr, reqAllTrademark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import { computed, ref } from 'vue';
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
// 将来收集还未选择的销售属性的ID与属性值名字
let saleAttrIdAndValueName = ref<string>('');

// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
  // 从allSaleAttr中过滤出不在saleAttr中的元素
  let unSelectArr = allSaleAttr.value.filter(item => {
    return saleAttr.value.every(item1 => {
      return item.name != item1.saleAttrName;
    });
  });
  return unSelectArr;
});

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

};
// 照片墙上传成功前的钩子，限制上传图片的类型和大小
const handleUpload = (file: any) => {
  // 要求：上传文件格式 jpg|png|gif 4M
  if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif') {
    if (file.size / 1024 / 1024 < 4) {
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

// 添加销售属性的方法
const addSaleAttr = () => {
  // 解构出销售属性所需字段
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
  // 构造一个销售属性对象
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: []
  };
  // 追加到数组中
  saleAttr.value.push(newSaleAttr);
  // 清空收集的数据
  saleAttrIdAndValueName.value = '';
};

// 属性值按钮点击事件
const toEdit = (row: SaleAttr) => {
  // 切换为编辑模式
  row.flag = true;
  // 收集属性值相关数据，失去焦点时加入到属性的属性值列表中
  row.saleAttrValue = '';
};
// 失去焦点事件
const toLook = (row: SaleAttr) => {
  // 收集属性ID和属性值内容
  const { baseSaleAttrId, saleAttrValue } = row;

  // 非法情况判断
  if (saleAttrValue.trim() == '') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    });
    return;
  }
  // 判断该属性值是否已存在
  let repeat = row.spuSaleAttrValueList.find(item => {
    return item.saleAttrValueName == saleAttrValue;
  });
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    });
    return;
  }

  // 整理为SaleAttrValue所需格式
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue
  };
  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  // 切换为查看模式
  row.flag = false;
};
</script>

<style scoped lang="scss">

</style>
