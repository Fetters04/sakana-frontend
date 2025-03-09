<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top/>
      </div>
      <div class="bottom">
        <div class="left">左</div>
        <div class="center">中</div>
        <div class="right">右</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// 引入子组件
import Top from './components/top/index.vue';

// 获取数据大屏展示内容盒子的DOM元素
let screen = ref();

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});

// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
}

// 监听视口的变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;

      .left {
        flex: 1;
      }

      .right {
        flex: 1;
      }

      .center {
        flex: 2;
      }
    }
  }
}
</style>
