<template>
  <!--三级分类全局组件-->
  <Category :scene="scene"/>
  <el-card style="margin: 20px 0">
    <div v-if="scene">
      <el-button type="primary" size="large" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">添加属性
      </el-button>
      <!-- 真实数据表格 -->
      <el-table border style="margin-top: 20px" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性名称" align="center" width="200px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{row, $index}">
            <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template #="{row, $index}">
            <el-button type="success" size="small" icon="Edit" @click="updateAttr"></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <!--展示添加和修改数据的结构-->
      <el-form inline>
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="default" icon="Plus">添加属性值</el-button>
      <el-button size="default">取消</el-button>
      <el-table border style="margin: 20px 0">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性值名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200px"></el-table-column>
      </el-table>
      <el-button type="primary" size="default">保存</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import { reactive, ref, watch } from 'vue';
import { reqAttr } from '@/api/product/attr';
import { Attr, AttrResponseData } from '@/api/product/attr/type';

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
  scene.value = false;
};
// 修改属性按钮回调
const updateAttr = () => {
  scene.value = false;
};
// 取消按钮回调
const cancel = () => {
  scene.value = true;
};
</script>

<style scoped lang="scss">

</style>
