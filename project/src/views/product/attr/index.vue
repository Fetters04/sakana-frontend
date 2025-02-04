<template>
  <!--三级分类全局组件-->
  <Category :scene="scene"/>
  <el-card style="margin: 20px 0">
    <!--展示三级分类数据的结构-->
    <div v-if="scene">
      <el-button @click="addAttr"
                 :disabled="!categoryStore.c3Id"
                 type="primary" size="large" icon="Plus">
        添加属性
      </el-button>
      <!-- 数据表格 -->
      <el-table border style="margin-top: 20px" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性名称" align="center" width="200px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{row, $index}">
            <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template #="{row, $index}">
            <el-button @click="updateAttr" type="success" size="small" icon="Edit"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--展示添加和修改数据的结构-->
    <div v-else>
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="addAttrValue"
                 :disabled="!attrParams.attrName"
                 type="primary" size="default" icon="Plus">
        添加属性值
      </el-button>
      <el-button @click="cancel" size="default">取消</el-button>
      <el-table border style="margin: 20px 0" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{row, $index}">
            <el-input :ref="(vc:any)=>inputArr[$index] = vc"
                      v-if="row.flag" @blur="toLook(row, $index)"
                      placeholder="请输入属性值名称"
                      v-model="row.valueName"></el-input>
            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #="{row, $index}">
            <el-button @click="attrParams.attrValueList.splice($index, 1)"
                       type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="save" :disabled="!attrParams.attrValueList.length"
                 type="primary" size="default">保存
      </el-button>
      <el-button @click="cancel" size="default">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { reqAddOrUpdateAttr, reqAttr } from '@/api/product/attr';
import { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
import category from '@/store/modules/category';

// 获取分类仓库
let categoryStore = useCategoryStore();
// 存储已有的属性和属性值
let attrArr = ref<Attr[]>([]);
// 定义card组件内容切换
let scene = ref<boolean>(true);
// 收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
});
// 存储属性值el-input实例对象
let inputArr = ref<any>([]);

onMounted(() => {
  // 一挂载清空三级分类数据
  categoryStore.c1Id = '';
  categoryStore.c1Arr = [];
  categoryStore.c2Id = '';
  categoryStore.c2Arr = [];
  categoryStore.c3Id = '';
  categoryStore.c3Arr = [];
});

// 监听仓库三级分类ID变化
watch(() => categoryStore.c3Id, () => {
  // 清空上一次查询的属性和属性值
  attrArr.value = [];
  // 保证有三级分类ID才能获取
  if (!categoryStore.c3Id) return;
  // 获取属性和属性值数据
  getAttr();
});
// 获取已有的属性和属性值方法
const getAttr = async () => {
  // 获取分类ID
  const { c1Id, c2Id, c3Id } = categoryStore;
  // 发请求获取属性和属性值数据
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  if (result.code == 200) {
    attrArr.value = result.data;
  }
};

// 添加属性按钮回调
const addAttr = () => {
  // 每次点击先清空数据再收集
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3
  });
  // 切换场景
  scene.value = false;
};
// 修改属性按钮回调
const updateAttr = () => {
  // 切换场景
  scene.value = false;
};
// 取消按钮回调
const cancel = () => {
  scene.value = true;
};
// 保存按钮回调
const save = async () => {
  // 发请求
  let result: any = await reqAddOrUpdateAttr(attrParams);
  if (result.code == 200) {
    // 切换场景
    scene.value = true;
    // 提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功'
    });
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败'
    });
  }
  // 获取全部已有的属性与属性值
  await getAttr();
};
// 添加属性值按钮回调
const addAttrValue = () => {
  // 向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    // 控制编辑模式与查看模式的切换
    flag: true
  });
  // 最后el-input聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};

// 属性值表单元素失去焦点切换为查看模式
const toLook = (row: AttrValue, $index: number) => {
  // 空数据判断
  if (row.valueName.trim() == '') {
    // 删除空元素
    attrParams.attrValueList.splice($index, 1);
    // 提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    });
    return;
  }
  // 重复数据判断
  let repeat = attrParams.attrValueList.find((item) => {
    // 判断除自己以外的数据是否存在重复
    if (item != row) {
      return item.valueName == row.valueName;
    }
  });
  if (repeat) {
    // 删除重复元素
    attrParams.attrValueList.splice($index, 1);
    // 提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复'
    });
  }
  // 模式切换
  row.flag = false;
};
// 属性值表单元素点击切换为编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  // 模式切换
  row.flag = true;
  // 对应el-input聚焦
  nextTick(() => {
    inputArr.value[$index].focus();
  });
};
</script>

<style scoped lang="scss">

</style>
