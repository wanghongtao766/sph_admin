<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="addTradeMark">添加</el-button>
    <!-- 
      表格组件 
      :data    表格组件将来需要展示的数据------数组类型
      border   给表格添加边框
      column属性
      label  标题
      width  对应列的宽度
      align  标题的对齐方式 
      type="index" 展示序号 从1开始自加
      prop  对应列内容的字段名
      注意点1：ele ui中 table展示数据是以列为单位展示的
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌logo" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 70px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      分页器 
      @size-change="handleSizeChange"  每页记录数发生改变会触发
      @current-change="handleCurrentChange"  当前页发生改变时会触发
      page-size 每一页展示多少条数据
      page-sizes 设置每一页展示的数据条数
      pager-count 页码按钮的总个数
      layout  实现分页器的布局
      background  对分页器添加背景色
    -->
    <el-pagination
      style="text-align: center; margin-top: 30px"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[3, 5, 7]"
      :pager-count="7"
      layout="prev, pager, next, jumper, -> ,sizes, total"
      :total="total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
    <!-- 
      对话框
      dialogFormVisible  控制对话框的显示和隐藏 布尔值
      label-width  设置标题宽度
     -->
    <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form 表单 
          :model属性  把表单的数据收集到绑定的对象身上，将来表单验证也需要它
          Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
          :rules="rules"  表单验证规则
          ref="ruleForm"  以此来确定表单验证是否全部通过
      -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" style="margin-left: 12px" prop="logoUrl">
          <!-- 图片上传 
              action: 设置图片上传地址
              :on-success:可以检测到图片上传成功，当图片上传成功，会执行一次
              :before-upload:可以在上传图片之前，会执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2Mb</div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    return {
      // 当前页码
      page: 1,
      // 每页记录数
      limit: 3,
      // 总数据条数
      total: 0,
      // 列表展示的数据
      list: [],
      // 控制对话框的显示隐藏
      dialogFormVisible: false,
      // 上传图片使用的属性
      imageUrl: '',
      // 收集品牌信息  里面的属性名不能乱写，服务器要根据key 添加or修改value
      tmForm: {
        logoUrl: '',
        tmName: ''
      },
      // 表单验证规则
      rules: {
        // 品牌名称的验证
        tmName: [
          { required: true, message: '请输入品牌信息', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
        ],
        // 品牌logo的验证
        logoUrl: [
          { required: true, message: '请选择品牌logo' }
        ],
      }
    }
  },
  mounted() {
    // 组件挂载完毕请求数据
    this.getPageList()
  },
  methods: {
    // 获取品牌列表数据
    async getPageList() {
      let { page, limit } = this
      let result = await this.$API.trademark.reqTradeMarkList(page, limit)
      if (result.code == 200) {
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    // 当前页改变  page参数是改变后的页码数
    handleCurrentChange(page) {
      this.page = page
      this.getPageList()
    },
    // 每页展示的记录数改变  limit是改变后每页记录数
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 点击添加品牌的按钮
    addTradeMark() {
      this.dialogFormVisible = true
      // 清除数据
      this.tmForm = { logoUrl: '', tmName: '' }
    },
    // 修改品牌信息
    updateTradeMark(row) {
      // 开启对话框
      this.dialogFormVisible = true
      // row 当前点击的品牌信息
      // 将 row 对象的浅拷贝赋值给响应式的数据 tmForm, 不能将 row 直接赋值给 tmForm，
      this.tmForm = { ...row }
      // this.tmForm = row
      // 将服务器返回的品牌信息 row 直接赋值给 tmForm,
      // 也就是说 tmForm 存储的即为服务器返回的品牌信息
      // 导致这两个对象指向相同
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // res 给前端返回图片在服务器上的真实路径
      this.tmForm.logoUrl = res.data
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 添加品牌 || 更新品牌的确定按钮
    addOrUpdateTradeMark() {
      this.$refs['ruleForm'].validate(async (valid) => {
        // valid 返回布尔值 以此确定表单验证是否全部完成
        if (valid) {
          // 隐藏对话框
          this.dialogFormVisible = false
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code == 200) {
            // 弹出消息 添加品牌成功 || 修改品牌成功
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功！' : '添加品牌成功'
            })
            // 添加 || 修改成功之后 再次请求最新数据
            // 如果是添加品牌则留在第一页 修改品牌则应该留在当前页面
            this.handleCurrentChange(this.tmForm.id ? this.page : 1)
          }
        } else {
          alert('提交错误')
          return false
        }
      })
    },
    // 点击删除品牌按钮
    removeTradeMark(row) {
      this.$confirm(`此操作将删除该品牌，品牌id为${row.id}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 用户点击确定按钮时触发
        // 发生删除请求 传入品牌的 id
        let result = await this.$API.trademark.reqRemoveTradeMark(row.id)
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 请求最新数据 若当前页的数据长度小于1 则去往上一页，否则停在当前页
          this.handleCurrentChange(this.list.length>1? this.page:this.page-1)
        }
      }).catch(() => {
        // 用户点击取消按钮时触发
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

    }
  }

}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>