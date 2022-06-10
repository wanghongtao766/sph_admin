<template>
  <div>
    <!-- 
      :gutter="10"  卡片之间的间距
    -->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Cart title="总销售额" count="￥126560">
            <template slot="charts">
              <span>周同比 56.67% <svg t="1650361035912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9477" width="16" height="16"><path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01" p-id="9478"></path><path d="M463.735467 122.402133a68.266667 68.266667 0 0 1 96.529066 0l307.2 307.2a68.266667 68.266667 0 1 1-96.529066 96.529067L580.266667 335.4624V853.333333a68.266667 68.266667 0 1 1-136.533334 0V335.4624l-190.6688 190.6688a68.266667 68.266667 0 1 1-96.529066-96.529067l307.2-307.2z" fill="#11AA66" p-id="9479"></path></svg></span>
              <span style="margin-left: 10px">周同比 56.67%<svg t="1650361099396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13020" width="16" height="16"><path d="M768.002 535.89H600.749l-0.909-322.563h-166.4v322.56l-167.253-0.455L517.181 858.39l250.821-322.5z" fill="#FD3333" p-id="13021"></path></svg></span>
            </template>
            <template slot="footer">
              <span>日销售额￥ 12423</span>
            </template>
          </Cart>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Cart title="访问量" count="88460">
            <template slot="footer">
              <span>日访问量4399</span>
            </template>
            <template slot="charts">
              <LineCharts></LineCharts>
            </template>
          </Cart>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Cart title="支付笔数" count="88460">
            <template slot="charts">
              <BarCharts></BarCharts>
            </template>
            <template slot="footer">
              <span>转换率为64%</span>
            </template>
          </Cart>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Cart title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart></ProgressChart>
            </template>
            <template slot="footer">
              <span>周同比 56.67% <svg t="1650361035912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9477" width="16" height="16"><path d="M0 0h1024v1024H0V0z" fill="#202425" opacity=".01" p-id="9478"></path><path d="M463.735467 122.402133a68.266667 68.266667 0 0 1 96.529066 0l307.2 307.2a68.266667 68.266667 0 1 1-96.529066 96.529067L580.266667 335.4624V853.333333a68.266667 68.266667 0 1 1-136.533334 0V335.4624l-190.6688 190.6688a68.266667 68.266667 0 1 1-96.529066-96.529067l307.2-307.2z" fill="#11AA66" p-id="9479"></path></svg></span>
              <span style="margin-left: 10px">周同比 56.67%<svg t="1650361099396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13020" width="16" height="16"><path d="M768.002 535.89H600.749l-0.909-322.563h-166.4v322.56l-167.253-0.455L517.181 858.39l250.821-322.5z" fill="#FD3333" p-id="13021"></path></svg></span>
            </template>
          </Cart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Cart from './Cart'
import LineCharts from './LineChart'
import BarCharts from './BarChart'
import ProgressChart from './ProgressChart'

export default {
  name: 'Header',
  components: {
    Cart,
    LineCharts,
    BarCharts,
    ProgressChart
  }

}
</script>

<style>

</style>