<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_slider" :class="{fold: layoutSettingStore.fold}">
      <!--logo组件-->
      <Logo></Logo>
      <!--展示菜单-->
      <el-scrollbar class="scrollbar">
        <!--菜单组件-->
        <el-menu
            :default-active="$router.path"
            background-color="#001529"
            text-color="white"
            active-text-color="skyblue"
            :collapse="layoutSettingStore.fold"
        >
          <!--根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div class="layout_tabbar" :class="{fold: layoutSettingStore.fold}">
      <Tabbar></Tabbar>
    </div>
    <!--内容展示区域-->
    <div class="layout_main" :class="{fold: layoutSettingStore.fold}">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue';
// 引入菜单组件
import Menu from './menu/index.vue';
// 内容展示区
import Main from './main/index.vue';
// 引入顶部组件
import Tabbar from './tabbar/index.vue';
// 获取相关小仓库
import useUserStore from '@/store/modules/user.ts';
import useLayoutSettingStore from '@/store/modules/setting';
// 获取路由对象
import { useRoute } from 'vue-router';

let userStore = useUserStore();
let layoutSettingStore = useLayoutSettingStore();
let $router = useRoute();
</script>

<script lang="ts">
export default {
  name: 'Layout'
};
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    padding: 20px;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
