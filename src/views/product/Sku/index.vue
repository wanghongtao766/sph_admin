<template>
  <div>
    <el-card>
      <!-- 表格 sku列表 -->
      <!-- 
        stripe  斑马线 隔行变色
      -->
      <el-table style="width: 100%" border :data="skuList" stripe v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column prop="prop" label="序号" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column prop="skuName" label="名称" width="width" >
        </el-table-column>
        <el-table-column prop="skuDesc" label="描述" width="width" >
        </el-table-column>
        <el-table-column prop="skuDefaultImg" label="默认图片" width="150" align="center">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg"  style="width: 80px" alt="商品图片">
          </template>
        </el-table-column>
        <el-table-column prop="weight" label="重量(KG)" width="width" >
        </el-table-column>
        <el-table-column prop="price" label="价格(元)" width="80" >
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" >
          <template slot-scope="{row}">
            <el-button type="info" icon="el-icon-top" size="mini" title="上架" v-if="row.isSale == 0" @click="onSale(row)"></el-button>
            <el-button type="success" icon="el-icon-bottom" size="mini" title="下架" v-else @click="cancelSale(row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="updateSku"></el-button>
            <el-button type="info" icon="el-icon-info" size="mini" title="查看详情" @click="showDetail(row)"></el-button>
            <el-popconfirm :title="`确定删除 ${row.skuName} 吗`" @onConfirm="deleteSku(row)">
              <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" slot="reference" style="margin-left: 10px"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器
       @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        background
        style="text-align: center; padding: 25px 0"
        >
      </el-pagination>
      <!-- 抽屉 
      :direction="direction"         控制方向 默认从右向左
      :before-close="handleClose"   关闭前的回调
      :show-close                   是否显示关闭按钮      
      :with-header="false"          去掉头部空白
      size                          抽屉大小
      -->
      <el-drawer :visible.sync="drawer" :show-close="false" size="50%" :with-header="false" :before-close="handleClose" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-row>
          <el-col :span="5">名称</el-col>
          <el-col :span="16">{{ skuById.skuName }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">描述</el-col>
          <el-col :span="16">{{ skuById.skuDesc }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">价格</el-col>
          <el-col :span="16">{{ skuById.price }}元</el-col>
        </el-row>
        <el-row>
          <el-col :span="5">平台属性</el-col>
          <el-col :span="16">
            <el-tag type="success" v-for="item in skuById.skuAttrValueList" :key="item.id" style="margin: 4px 3px">
              {{ item.attrId }}-{{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">商品图片</el-col>
          <el-col :span="16">
            <!-- 轮播图 -->
            <el-carousel height="400px" class="sku-carousel">
              <el-carousel-item v-for="item in skuById.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="sku图片" style="width: 400px">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      // 当前页
      page: 1,
      // 页大小
      pageSize: 10,
      // 总数据量
      total: 0,
      // sku列表数据
      skuList: [],
      // 表格 loading效果
      loading: false,
      // 抽屉的显示隐藏
      drawer: false,
      // 单个的sku数据
      skuById: {},
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取sku列表数据的方法
    async getSkuList() {
      // 开启loading效果
      this.loading = true
      const { page, pageSize } = this
      let result = await this.$API.sku.reqSkuList(page, pageSize)
      if (result.code == 200) {
        // 收集相关数据
        this.total = result.data.total
        this.skuList = result.data.records
        // 关闭loading 效果
        this.loading = false
      }
    },
    // 页大小发生变化的回调
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getSkuList()
    },
    // 当前页码发送变化
    handleCurrentChange(page) {
      this.page = page
      this.getSkuList()
    },
    // sku的上架
    async onSale(row) {
      let result = await this.$API.sku.reqSale(row.id)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '上架成功！' })
        // 获取最新数据 并停留在当前页
        this.getSkuList()
      }

    },
    // sku的下架
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code == 200) {
        this.$message({ type: 'warning', message: '下架成功！' })
        this.getSkuList()
      }
    },
    // sku 修改
    updateSku() {
      this.$message({ type: 'info', message: '开发中....敬请期待' })
    },
    // 查看详情 sku, 显示抽屉
    async showDetail(row) {
      // 开启loading
      this.loading = true
      // 显示抽屉
      this.drawer = true
      // 请求数据 存储到组件中
      let result = await this.$API.sku.reqgetSkuById(row.id)
      if (result.code == 200) {
        this.skuById = result.data
        // 结束loading 
        this.loading = false
      }
    },
    // 关闭(抽屉)详情前的回调  
    handleClose(done) {
      // 清空数据
      this.skuById = {}
      // 关闭
      done()
    },
    // sku的删除
    async deleteSku(row) {
      // 发请求
      let result = await this.$API.sku.reqDeleteSku(row.id)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '删除成功！' })
        this.getSkuList()
      }
    }
  }

}
</script>

<style scoped>
.el-row {
  line-height: 25px;
  margin-top: 20px;
}
.el-col-5 {
  text-align: right;
  margin-right: 15px;
  font-weight: 700;
  font-size: 20px;
}
.el-col-16 {
  font-size: 15px;
}
.sku-carousel {
  width: 400px;
  border: 1px solid #00ade7;
}
>>>.el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #00ade7;
}
</style>
