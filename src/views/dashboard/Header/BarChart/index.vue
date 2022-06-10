<template>
  <!-- 第二步准备容器 -->
  <div ref="charts" class="charts"></div>
</template>

<script>
// 第一步引入echarts插件
import echarts from 'echarts'

export default {
  name: 'BarChart',
  mounted() {
    // 初始化echarts实例
    let mycharts = echarts.init(this.$refs.charts);
    mycharts.setOption({
      //x轴
      xAxis: { show: false, type: 'category' },
      //y轴
      yAxis: { show: false },
      //系列的设置
      series: {
        type: 'bar',
        data: [30, 66, 42, 47, 88, 62, 75, 38],
        color: '#5172ca',
        //遮罩层
      },
      //定位
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      //遮罩层
      tooltip: {
        //遮罩层在容器内部显示
        confine: true
      }
    })
  }
}
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>