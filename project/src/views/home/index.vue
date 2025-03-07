<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="用户头像" class="avatar"/>
      <div class="text">
        <h1 class="title">{{ getTime() }}好，{{ userStore.username }}</h1>
        <p class="subtitle">SAKANA甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <svg-icon name="welcome" width="500px" height="400px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time';
import useUserStore from '@/store/modules/user';

// 获取用户信息相关仓库对象
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }

  .text {
    margin-left: 20px;;

    .title {
      font-size: 30px;
      font-weight: 800;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: darkred;
    }
  }
}

.bottom {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
