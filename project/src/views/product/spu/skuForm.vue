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
        <el-form-item label="型号">
          <el-select style="width: 300px">
            <el-option label="iPhone 14"></el-option>
            <el-option label="iPhone 14 Pro"></el-option>
            <el-option label="iPhone 14 Pro Max"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运行内存">
          <el-select style="width: 300px">
            <el-option label="6GB"></el-option>
            <el-option label="8GB"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机身内存">
          <el-select style="width: 300px"></el-select>
        </el-form-item>
        <el-form-item label="CPU型号">
          <el-select style="width: 300px"></el-select>
        </el-form-item>
        <el-form-item label="电池容量">
          <el-select style="width: 300px"></el-select>
        </el-form-item>
        <el-form-item label="屏幕尺寸">
          <el-select style="width: 300px"></el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline label-width="100px">
        <el-form-item label="颜色">
          <el-select style="width: 300px">
            <el-option label="粉色"></el-option>
            <el-option label="蓝色"></el-option>
            <el-option label="绿色"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" width="100px" align="center"></el-table-column>
        <el-table-column label="图片"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>
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
let $emit = defineEmits(['changeScene']);

// 取消按钮的回调
const cancel = () => {
  // 切换场景0
  $emit('changeScene', { flag: 0, params: '' });
};
</script>

<style scoped lang="scss">

</style>
