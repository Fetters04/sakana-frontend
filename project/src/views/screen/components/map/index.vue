<template>
  <div class="box" ref="map">
    map
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
// 引入中国地图JSON数据
import chinaJSON from './china.json';

let map = ref();
// 注册中国地图
echarts.registerMap('china', chinaJSON);

onMounted(() => {
  let myCharts = echarts.init(map.value);
  //设置配置项
  myCharts.setOption({
    //地图组件
    geo: {
      map: 'china',//中国地图
      roam: true,//鼠标缩放的效果
      //地图的位置调试
      left: 150,
      top: 150,
      right: 150,
      zoom: 1.2,
      bottom: 0,
      //地图上的文字的设置
      label: {
        show: true,//文字显示出来
        color: 'white',
        fontSize: 14
      },

      itemStyle: {
        //每一个多边形的样式
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'red' // 0% 处的颜色
          }, {
            offset: 1, color: 'blue' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        opacity: .8
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: 'red'
        },
        label: {
          fontSize: 40
        }
      }
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    },
    series: [
      {
        type: 'lines',//航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989],  // 起点
              [119.306239, 26.075302]   // 终点

            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width: 5
            }
          },
          {
            coords: [
              [116.405285, 39.904989],  // 起点
              [114.298572, 30.584355]   // 终点

            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 5
            }
          }
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10
        }
      }
    ]
  });
});
</script>

<style scoped lang="scss">

</style>
