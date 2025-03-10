<template>
  <div class="box">
    <div class="top">
      <p class="title">热门景区排行</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref='charts'></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

// 获取DOM节点
let charts = ref();

// 组件挂载完毕
onMounted(() => {
  // 一个容器可以同时展示多种类型的图形图标
  let myCharts = echarts.init(charts.value);

  // 模拟真实的景区数据
  const scenicSpots = ['故宫', '长城', '西湖', '九寨沟', '黄山', '张家界', '桂林'];
  const visitorData = [120000, 95000, 80000, 75000, 70000, 65000, 60000];

  // 设置配置项
  myCharts.setOption({
    // 标题组件
    title: {
      // 主标题
      text: '景区排行',
      link: 'http://www.baidu.com',
      // 标题的位置
      left: '50%',
      // 主标题文字样式
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20
      },
      // 子标题
      subtext: '各大景区排行',
      // 子标题的样式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 16
      }
    },
    // x|y轴组件
    xAxis: {
      type: 'category',
      data: scenicSpots, // x轴显示景区名称
      axisLabel: {
        rotate: 45, // 旋转x轴标签，防止重叠
        color: 'white' // x轴标签颜色
      }
    },
    yAxis: {
      type: 'value',
      name: '访问量',
      axisLabel: {
        color: 'white' // y轴标签颜色
      }
    },
    // 布局组件
    grid: {
      top: 100,
      left: 50,  // 增加左侧留白
      bottom: 50, // 增加底部留白
    },
    // 系列:决定显示图形图标是哪一种的
    series: [
      {
        type: 'bar',
        data: visitorData, // y轴显示访问量
        // 柱状图的:图形上的文本标签，
        label: {
          show: true,
          // 文字的位置
          position: 'insideTop',
          // 文字颜色
          color: 'white'
        },
        // 是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          // 底部背景的颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'black' // 0% 处的颜色
            }, {
              offset: 1, color: 'blue' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        // 柱条的样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          // 柱条颜色
          color: function (data: any) {
            // 给每一个柱条设置背景颜色
            let arr = ['red', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue'];
            return arr[data.dataIndex];
          }
        }
      },
      {
        type: 'line',
        data: visitorData,
        smooth: true,  // 平滑曲线
        itemStyle: {
          color: 'yellow' // 折线图颜色
        }
      }
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
      formatter: function (params: any) {
        return `${params.name}<br/>访问量: ${params.value}`;
      }
    }
  });
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-rb.png") no-repeat;
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
  }

  .charts {
    height: calc(100% - 100px);
    padding-left: 30px;
  }
}
</style>
