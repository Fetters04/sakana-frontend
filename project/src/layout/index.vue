<template>
  <div class="layout_container">
    <!--左侧菜单-->
    <div class="layout_slider">111</div>
    <!--顶部导航-->
    <div class="layout_tabbar">222</div>
    <!--内容展示区域-->
    <div class="layout_main">
      <p style="height: 3000px; background: red">hhhhhhhhh</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
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
