<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
// 导入echarts 
import echarts from 'echarts'

export default {
  name: 'LineChart',
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        type: 'category'
      },
      yAxis: {
        // 隐藏y轴
        show: false
      },
      // 系列
      series: [
        {
          type: 'line',
          data: [40, 20, 53, 12, 88, 9],
          // 拐点的样式设置
          itemStyle: {
            opacity: 0
          },
          //设置平滑曲线
          smooth: true,
          //线条颜色
          lineStyle: {
            color: "#9619ff",
          },
          //填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#9619ff", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        }
      ],
      // 布局
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
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