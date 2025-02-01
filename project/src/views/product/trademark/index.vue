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
          <el-button type="success" size="default" icon="Edit" @click="updateTrademark(row)"></el-button>
          <el-popconfirm :title="`您确定要删除${row.tmName}？`" width="200px" icon="Delete"
                         @confirm="removeTrademark(row.id)">
            <template #reference>
              <el-button type="danger" size="default" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
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
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id? '修改品牌': '添加品牌'">
    <!--表单-->
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <!--
          上传资源
              action: 图片资源的请求存放地址
              show-file-list: 是否显示已上传的文件列表
              before-upload: 上传文件之前的钩子，参数为当前文件对象
              on-success: 上传文件成功的钩子
        -->
        <el-upload
            class="avatar-uploader"
            action="/api/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" alt="" class="avatar"/>
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
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reqAddOrUpdateTrademark, reqDeleteTrademark, reqHasTrademark } from '@/api/product/trademark';
import { Records, Trademark, TrademarkResponseData } from '@/api/product/trademark/type';
import { ElMessage, UploadProps } from 'element-plus';

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
// 定义收集新增品牌的数据
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: ''
});
// 获取el-form组件实例
let formRef = ref();

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
  // 清空收集数据
  trademarkParams.id = 0;
  trademarkParams.tmName = '';
  trademarkParams.logoUrl = '';
  // 清除校验信息
  // formRef.value?.clearValidate('tmName');
  // formRef.value?.clearValidate('logoUrl');
  nextTick(() => {
    formRef.value.clearValidate('tmName');
    formRef.value.clearValidate('logoUrl');
  });
};
// 修改品牌按钮回调
const updateTrademark = (row: Trademark) => {
  dialogFormVisible.value = true;
  // 回显数据
  Object.assign(trademarkParams, row);
  // 清除校验信息
  nextTick(() => {
    formRef.value.clearValidate('tmName');
    formRef.value.clearValidate('logoUrl');
  });
};

// 对话框底部取消按钮回调
const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false;
};
// 对话框底部确定按钮回调
const confirm = async () => {
  console.log(formRef);
  // 发请求前对整个表单进行校验
  await formRef.value.validate();
  // 发送新增|修改请求
  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  // 添加|修改品牌成功
  if (result.code == 200) {
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
    });
    // 再次获取全部已有品牌数据
    await getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    // 添加品牌失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
    });
  }
  // 关闭对话框
  dialogFormVisible.value = false;
};

// 上传图片之前触发的钩子函数，限制上传图片的类型和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 要求：上传文件格式 jpg|png|gif 4M
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
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
// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  // 收集上传图片的地址，添加品牌的时候带给服务器
  trademarkParams.logoUrl = response.data;
  // 图片上传成功，清除掉对应图片校验结果
  formRef.value.clearValidate('logoUrl');
};

// 品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  // 自定义校验规则
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error('品牌名称位数大于等于两位'));
  }
};
// 品牌logo图片自定义校验规则方法
const validatorLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error('LOGO图片务必上传'));
  }
};
// 表单校验规则对象
const rules = {
  tmName: [
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [
    { required: true, validator: validatorLogoUrl }
  ]
};

// 气泡确认框确定按钮的回调
const removeTrademark = async (id: number) => {
  // 发送删除请求
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    });
    // 再次获取已有品牌数据
    await getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    });
  }
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
