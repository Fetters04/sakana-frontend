<template>
  <el-button size="default" icon="Refresh" circle @click="updateRefresh"></el-button>
  <el-button size="default" icon="FullScreen" circle></el-button>
  <el-button size="default" icon="Setting" circle></el-button>
  <!--用户头像-->
  <img src="../../../../public/logo.png" alt="logo">
  <!--下拉菜单-->
  <el-dropdown>
        <span>
          admin
          <el-icon>
            <arrow-down/>
          </el-icon>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue';
import useLayoutSettingStore from '@/store/modules/setting';

// 获取骨架的小仓库
let layoutSettingStore = useLayoutSettingStore();
// 刷新按钮点击回调
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh;
};
</script>

<script lang="ts">
export default {
  name: 'Setting'
};
</script>

<style scoped lang="scss">
img {
  margin: 0 20px;
  width: 60px;
}

.el-dropdown {
  margin-right: 30px;
}
</style>
