<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请您输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU名牌">
      <el-select style="width: 300px">
        <el-option label="小米"></el-option>
        <el-option label="华为"></el-option>
        <el-option label="苹果"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请您输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload style="width: 178px; height: 178px; border: 1px solid red">
        <el-icon style="width: 178px; height: 178px;">
          <Plus/>
        </el-icon>
      </el-upload>
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
let $emit = defineEmits(['changeScene']);

// 通知父组件切换场景0
const cancel = () => {
  $emit('changeScene', 0);
};
</script>

<style scoped lang="scss">

</style>
