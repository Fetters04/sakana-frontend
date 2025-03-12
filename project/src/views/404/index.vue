<template>
  <div class="error-page">
    <div class="content-container">
      <div class="image-container">
        <img src="../../assets/images/error_images/404.png" alt="404 Error" class="error-image">
      </div>
      <h1 class="error-title">哎呀，页面走丢啦！</h1>
      <p class="error-message">别担心，你可以点击下面的按钮回到首页。</p>
      <button @click="goHome" class="home-button">首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const $router = useRouter();

const goHome = () => {
  $router.push('/home');
};
</script>

<style scoped lang="scss">
.error-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .content-container {
    text-align: center;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.5s ease-out;

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .error-image {
        max-height: 300px;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .error-title {
      font-size: 36px;
      color: #333;
      margin-bottom: 10px;
    }

    .error-message {
      font-size: 18px;
      color: #666;
      margin-bottom: 30px;
    }

    .home-button {
      width: 120px;
      height: 40px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
