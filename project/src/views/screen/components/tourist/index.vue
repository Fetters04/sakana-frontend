<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>999999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
// 水球图拓展插件
import 'echarts-liquidfill';

let people = ref('216908人');
let charts = ref();

onMounted(() => {
  // 获取echarts类实例
  let myCharts = echarts.init(charts.value);
  // 设置实例的配置项
  myCharts.setOption({
    xAxis: {},
    yAxis: {},
    series: {
      type: 'liquidFill',
      data: [0.6],
      radius: '70%'
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  });
});
</script>

<style scoped lang="scss">
.box {
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;
    margin-top: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url("../../images/dataScreen-title.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;
      margin-right: 20px;

      span {
        color: orange;
      }
    }
  }

  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url("../../images/total.png") no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    width: 100%;
    height: 280px;
  }
}
</style>
