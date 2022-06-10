<template>
  <!-- 第二步:准备容器 -->
  <div ref="charts" class="charts"></div>
</template>

<script>
//第一步:引入echarts插件
import echarts from "echarts"

export default {
  name: "ProgressChart",
  mounted() {
    //为什么在这里初始化echarts实例：因为echarts.init方法需要获取容器节点
    //mounted节点挂载完毕，获取到
    let mycharts = echarts.init(this.$refs.charts);
    //配置项
    let option = {
      //x轴
      xAxis: {
        show: false,
        //设置轴的最小值
        min:0,
        //设置轴的最大值
        max:100
      },
      yAxis: {
        type: "category",
        show: false,
      },
      series: {
        type: "bar",
        data: [66],
        barWidth: 10,
        //每一个柱条的背景样式,需要这个属性
        showBackground: true,
        backgroundStyle: {
          color: "#ccc",
        },
        //柱条的颜色
        itemStyle:{
          color:'yellowgreen'
        },
        //标签
        label:{
          show:true,
          //调整标签的位置
          position:'right',
          formatter:'|',
          color:'yellowgreen'
        }
      },
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    };
    //设置配置项
    mycharts.setOption(option);
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
