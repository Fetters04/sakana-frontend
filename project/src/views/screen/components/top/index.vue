<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import moment from 'moment';

let $router = useRouter();
// 当前时间
let time = ref(moment().format('YYYY-MM-DD HH:mm:ss'));
// 定时器
let timer = ref(0);

onMounted(() => {
  // 更新当前时间
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD HH:mm:ss');
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});

// 首页按钮的回调
const goHome = () => {
  $router.push('/home');
};
</script>

<style scoped lang="scss">
.top {
  display: flex;
  width: 100%;
  height: 100%;

  .left {
    flex: 1.5;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;

    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url("../../images/dataScreen-header-btn-bg-l.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      cursor: pointer;
    }
  }

  .right {
    flex: 1.5;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .rbtn {
      width: 150px;
      height: 40px;
      float: left;
      background: url("../../images/dataScreen-header-btn-bg-r.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
    }

    .time {
      color: #29fcff;
      font-size: 18px;
      margin-right: 20px;
    }
  }

  .center {
    flex: 2;

    .title {
      width: 100%;
      height: 74px;
      background: url("../../images/dataScreen-header-center-bg.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
}
</style>
