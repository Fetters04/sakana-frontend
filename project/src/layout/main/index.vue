<template>
  <!--路由组件出口位置-->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!--渲染layout一级路由组件的子路由-->
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
