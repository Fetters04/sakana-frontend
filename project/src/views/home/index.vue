<template>
  <div>
    <h1>{{ getTime() }}好，{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { onMounted } from 'vue';
import { getTime } from '@/utils/time';

let userStore = useUserStore();
// 主页一挂载，获取用户信息
onMounted(() => {
  userStore.userInfo();
});
</script>

<style scoped>

</style>
