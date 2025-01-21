<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_slider">
      <!--logo组件-->
      <Logo></Logo>
      <!--展示菜单-->
      <el-scrollbar class="scrollbar">
        <!--菜单组件-->
        <el-menu background-color="#001529" text-color="white">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据大屏</el-menu-item>
          <!--折叠菜单-->
          <el-sub-menu index="3">
            <template #title>
              <span>权限管理</span>
            </template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">角色管理</el-menu-item>
            <el-menu-item index="3-3">菜单管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div class="layout_tabbar">222</div>
    <!--内容展示区域-->
    <div class="layout_main">
      <p style="height: 3000px; background: red">hhhhhhhhh</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue';
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background: skyblue;
    top: 0;
    left: $base-menu-width;
  }

  .layout_main {
    position: absolute;
    padding: 20px;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background: yellowgreen;
    left: $base-menu-width;
    top: $base-tabbar-height;
    overflow: auto;
  }
}
</style>
