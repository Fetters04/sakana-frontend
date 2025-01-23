<template>
  <div>
    <h1>{{ getTime() }}好，{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time';
import useUserStore from '@/store/modules/user';

let userStore = useUserStore();
</script>

<style scoped>

</style>
