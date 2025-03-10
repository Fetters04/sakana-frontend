<template>
  <div class="box">
    <div class="top">
      <p class="title">年龄比例</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

let charts = ref();

onMounted(() => {
  let myCharts = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}({d}%)'
    },
    legend: {
      top: '5%',
      right: 30,
      orient: 'vertical',
      textStyle: {
        color: 'white',
        fontSize: 16
      }
    },
    series: [
      {
        name: '年龄',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'inside',
          color: 'white'
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 16, name: '10岁以下' },
          { value: 8, name: '10-18岁' },
          { value: 12, name: '18-30岁' },
          { value: 24, name: '30-40岁' },
          { value: 20, name: '40-60岁' },
          { value: 20, name: '60岁以上' }
        ]
      }
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    }
  };
  myCharts.setOption(option);
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

  .top {
    margin-left: 20px;
    margin-top: 10px;

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
  }

  .charts {
    height: 200px;
  }
}
</style>
