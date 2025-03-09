<template>
  <div class="box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt=""/>
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt=""/>
      </div>
    </div>
    <div class="rate">
      <p>男士60%</p>
      <p>女士40%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

let charts = ref();

onMounted(() => {
  let myCharts = echarts.init(charts.value);
  myCharts.setOption({
    xAxis: {
      show: false
    },
    yAxis: {
      show: false,
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        data: [60],
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ]
  });
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;

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

  .sex {
    display: flex;
    justify-content: center;

    .man {
      margin: 20px;
      background: url("../../images/man-bg.png") no-repeat;
      width: 111px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .woman {
      margin: 20px;
      background: url("../../images/woman-bg.png") no-repeat;
      width: 111px;
      height: 115px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .rate {
    display: flex;
    justify-content: space-between;
    color: white;
    margin: 0 130px;
    p{
      margin-bottom: 10px;
    }
  }

  .charts {
    width: 100%;
    height: 40px;
  }
}
</style>
