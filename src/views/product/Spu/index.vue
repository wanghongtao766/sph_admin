<template>
  <div>
    <el-card style="margin-bottom: 15px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene == 0"></CategorySelect>
    </el-card>
    <el-card>
      <!-- 展示SPU列表的结构 -->
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3id" @click="addSpu">添加SPU</el-button>
        <!-- 表格 展示SPU数据的表格-->
        <el-table style="width: 100%; margin: 10px 0" border :data="SpuList" v-loading="spuLoading"  element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中">
          <el-table-column prop="prop" label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="success" icon="el-icon-plus" size="mini" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="warning" icon="el-icon-edit" size="mini" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="info" icon="el-icon-info" size="mini" title="查看SPU全部SKU列表" @click="showSkuList(row)"></el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                <el-button style="margin-left: 10px" type="danger" icon="el-icon-delete" size="mini" title="删除SPU" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          :current-page="page"
          :page-sizes="[3, 5, 7]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="handleCurrentChange" 
          @size-change="handleSizeChange"
          background
          style="text-align: center">
        </el-pagination>
      </div>
      <!-- 展示添加|修改SPU -->
      <div v-show="scene==1">
        <SpuForm @changeScene="changeScene" ref="spu" :scene="scene"></SpuForm>
      </div>
      <!-- 展示添加SKU -->
      <div v-show="scene==2">
        <SkuForm ref="sku" :idData="{category1id, category2id, category3id}" @changeScene="changeScene"></SkuForm>
      </div>
    </el-card>
     <!-- 展示SKU信息的对话框 -->
     <!-- :before-close="close" 对话框关闭前的回调 -->
    <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible" :before-close="close">
      <!-- 展示sku信息的表格 -->
      <el-table :data="skuList" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中">
        <el-table-column property="skuName" label="名称" width="150"></el-table-column>
        <el-table-column property="price" label="价格" width="200"></el-table-column>
        <el-table-column property="weight" label="重量"></el-table-column>
        <el-table-column property="skuDefaultImg" label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width: 100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
// 引入其他两个组件
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'

export default {
  name: 'Spu',
  components: {
    SpuForm,
    SkuForm
  },
  data() {
    return {
      // 三级分类的 id
      category1id: '',
      category2id: '',
      category3id: '',
      // 当前页
      page: 1,
      // 每页记录数
      limit: 3,
      // SPU列表数据
      SpuList: [],
      // 分页器一共需要展示数据的条数
      total: 0,
      // 控制底部三部分的切换
      // 0代表展示SPU的列表数据    1 添加|修改SPU     2 添加SKU
      scene: 0,
      // SKU列表数据
      skuList: [],
      // 控制对话框的显示和隐藏
      dialogTableVisible: false,
      // 临时存储 SpuList中的单个对象
      spu: {},
      // 控制加载效果
      loading: false,  // 控制sku列表数据的 loading
      spuLoading: false  // 控制spu列表数据的 loading
    }
  },
  methods: {
    // 获取分类 id 获取spu列表数据
    getCategoryId(dataId) {
      // 解构出对应的分类 id 
      let { category1id, category2id, category3id } = dataId
      // 保存 id数据
      this.category1id = category1id
      this.category2id = category2id
      this.category3id = category3id
      // 获取spu列表数据
      // 获取数据前 loading
      this.spuLoading = true
      this.getSpuList()
    },
    // 获取SPU列表数据的方法
    async getSpuList() {
      // 调用这个函数时 开启loading
      this.spuLoading = true
      // 解构出参数
      const { page, limit, category3id } = this
      let result = await this.$API.spu.reqSpuList(page, limit, category3id)
      // console.log(result);
      if (result.code == 200) {
        // 将SPU列表数据传递给组件保存
        this.SpuList = result.data.records
        // 将total数据总数也保留
        this.total = result.data.total
        // 获取到数据后结束loading
        this.spuLoading = false
      } else {
        alert('获取SPU列表数据失败！')
      }
    },
    // 点击分页器第几页按钮的回调
    handleCurrentChange(page = 1) {
      // page = 1 代表 page默认为 1
      // page 代表点击的页码
      this.page = page
      this.getSpuList()
    },
    // 选择每页记录数的回调
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // 点击 添加SPU 按钮
    addSpu() {
      this.scene = 1
      //  点击添加Spu按钮需要获取相应的数据
      this.$refs.spu.addSpuData(this.category3id)
    },
    // 点击 修改Spu图标按钮
    updateSpu(row) {
      this.scene = 1
      // 通过 $ref,获取子组件SpuFrom的数据和方法
      this.$refs.spu.initSpuData(row)
    },
    // 自定义事件回调 （SpuForm）
    changeScene({ scene, flag }) {
      // flag 为了区分保存按钮是添加还是修改
      this.scene = scene
      // 切换场景后需要在请求最新的数据 并且 保持在当前页
      if (flag == '修改') {
        this.handleCurrentChange(this.page)
      } else {
        this.handleCurrentChange()
      }
    },
    // 删除 Spu 点击的是 垃圾桶图标 按钮
    async deleteSpu(row) {
      // 发请求 删除Spu
      let result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '删除成功！' })
        // 请求最新数据 停留在哪个页码取决于数据条数
        this.handleCurrentChange(this.SpuList.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加 Sku  点击的是 + 号按钮
    addSku(row) {
      this.scene = 2
      // console.log(row);
      // 初始化 SkuForm中的数据
      this.$refs.sku.getData(row)
    },
    // 点击查看Sku列表信息的按钮
    async showSkuList(row) {
      // 显示对话框
      this.dialogTableVisible = true
      // loading效果开始
      this.loading = true
      // 临时存储 SpuList 的单个数据对象
      this.spu = row
      // 发请求 获取sku列表信息
      let result = await this.$API.spu.reqSkuList(row.id)
      if (result.code == 200) {
        this.skuList = result.data
        // 获取到数据后，loading效果关闭
        this.loading = false
      }
    },
    // Dialog 对话框关闭的回调
    close(done) {
      // 防止数据回显 清除 sku列表数据
      this.skuList = []
      // 关闭对话框
      done()
    }

  }

}
</script>

<style>
</style>