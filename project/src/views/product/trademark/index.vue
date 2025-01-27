<template>
  <!--数据展示区-->
  <el-card class="box-card">
    <!--添加品牌按钮-->
    <el-button type="primary" size="large" icon="Plus" @click="addTrademark">添加品牌</el-button>
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
          <el-button type="success" size="default" icon="Edit" @click="updateTrademark"></el-button>
          <el-button type="danger" size="default" icon="Delete"></el-button>
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
        :page-sizes="[3, 5, 10]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="getHasTrademark(1)"
    />
  </el-card>
  <!--对话框组件-->
  <el-dialog v-model="dialogFormVisible" title="添加品牌">
    <!--表单-->
    <el-form style="width: 80%">
      <el-form-item label="品牌名称" label-width="100px">
        <el-input placeholder="请输入品牌名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px">
        <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <!--footer-->
    <template #footer>
      <el-button type="danger" size="large" @click="cancel">取消</el-button>
      <el-button type="primary" size="large" @click="confirm">确定</el-button>
    </template>
  </el-dialog>
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
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false);

// 获取已有品牌
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TrademarkResponseData = await reqHasTrademark(pageNo.value, pageSize.value);
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};
onMounted(() => {
  getHasTrademark();
});

// 添加品牌按钮回调
const addTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true;
};
// 修改品牌按钮回调
const updateTrademark = () => {
  dialogFormVisible.value = true;
};

// 对话框底部取消按钮回调
const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false;
};
// 对话框底部确定按钮回调
const confirm = () => {
  // 对话框隐藏
  dialogFormVisible.value = false;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
