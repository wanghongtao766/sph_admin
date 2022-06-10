<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spuInfo">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spuInfo.spuName"></el-input>
      </el-form-item>
      <!-- SPU品牌 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" value="" v-model="spuInfo.tmId">
          <el-option :label="item.tmName" :value="item.id" v-for="item in tradeMarkList" :key="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spuInfo.description"></el-input>
      </el-form-item>
      <!-- SPU图片 -->
      <el-form-item label="SPU图片">
        <!-- 
          上传图片
          action 图片上传地址
          list-type  文件列表类型
          on-preview  图片预览时触发
          on-remove   删除图片触发
          file-list   展示的图片列表
        -->
        <el-upload
          action="dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImg"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}个未选择`" v-model="attrIdAndAttrName">
          <el-option :label="item.name" :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttr" :key="item.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <!-- 展示的是当前SPU属于自己的销售属性 -->
        <el-table style="width: 100%; margin:10px 0" border :data="spuInfo.spuSaleAttrList">
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{row}">
              <!-- 
                @close="handleClose(tag)" 
                @close 点击 x 号的回调，删除相应的属性值
              -->
              <el-tag v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- 
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm(row)
               -->
              <el-input v-if="row.inputVisible" class="input-new-tag"  v-model="row.inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm(row)" ></el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">+ 添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spuInfo.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // spu信息
      spuInfo: {
        // 三级分类的id
        category3Id: 0,
        // SPU描述
        description: "",
        // 品牌的id
        tmId: "",
        // SPU名称
        spuName: "",
        // 收集SPU的图片
        spuImageList: [],
        // 销售属性
        spuSaleAttrList: [],
      },
      // 品牌信息
      tradeMarkList: [],
      // 销售属性
      SaleAttr: [],
      // spu图片信息  收集照片墙图片的数据
      spuImg: [],
      // 收集未选择的销售属性的id和销售属性的name
      attrIdAndAttrName: ''
    }
  },
  methods: {
    // 删除照片墙图片的回调
    handleRemove(file, fileList) {
      // file 代表的时删除的那个图片相关信息
      // fileList 代表剩余的图片信息
      // 收集照片墙图片的数据
      //对于已有的图片【照片墙中显示的图片：有name、ul字段】，因为照片墙显示数据务必要有这两个属性
      //对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理的
      this.spuImg = fileList
    },
    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      // file.url 图片地址，将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
      // 对话框显示 相对于显示放大的图片
      this.dialogVisible = true;
    },
    // 照片墙图片上传成功的回调
    handleSuccess(response, file, fileList) {
      // 收集图片信息
      this.spuImg = fileList
    },
    // 初始化SpuForm数据
    async initSpuData(spu) {
      // 获取品牌信息
      let tmResult = await this.$API.spu.reqTradeMarkList()
      if (tmResult.code == 200) {
        this.tradeMarkList = tmResult.data
      }
      // 获取全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttr()
      if (saleResult.code == 200) {
        this.SaleAttr = saleResult.data
      }
      // 获取spu信息
      let spuResult = await this.$API.spu.reqSpuInfo(spu.id)
      if (spuResult.code == 200) {
        this.spuInfo = spuResult.data
      }
      // 获取spu图片
      let spuImgResult = await this.$API.spu.reqSpuImg(spu.id)
      if (spuImgResult.code == 200) {
        let listArr = spuImgResult.data
        // 由于照片墙显示图片的数据列表中需要 name 和 url字段
        // 需要将服务器返回的数据进行处理
        listArr.forEach(item => {
          item.name = item.imgName,
            item.url = item.imgUrl
        })
        // 将整理好的数据赋值
        this.spuImg = listArr
      }
    },
    // 添加销售属性的回调
    addSaleAttr() {
      // 将已经收集到的销售属性的数据进行分割
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      // 向 spuInfo 中的 spuSaleAttrList 添加新的销售属性
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spuInfo.spuSaleAttrList.push(newSaleAttr)
      // 清空数据
      this.attrIdAndAttrName = ''
    },
    // 点击 +添加售卖属性值 的按钮
    addSaleAttrValue(row) {
      // 通过 inputVisiblekong控制 input和 button的切换
      this.$set(row, 'inputVisible', true)
      // 通过 inputValue收集输入的属性值
      this.$set(row, 'inputValue', "")
    },
    // +添加按钮的焦点变化事件 
    handleInputConfirm(row) {
      // 解构出需要的参数
      const { baseSaleAttrId, inputValue } = row
      // 1.切换为按钮
      row.inputVisible = false
      // 3.输入属性值的限制      不能为空   不能重复
      if (inputValue.trim() == '') {
        this.$message({ type: 'warning', message: '输入值不能为空！' })
        return
      }
      // 属性值不能重复
      let result = row.spuSaleAttrValueList.every(item => {
        return item.saleAttrValueName != inputValue
      })
      if (!result) {
        this.$message({ type: 'warning', message: '属性值不能重复！' })
        return
      }
      console.log(result)
      // 2.收集输入的属性值
      // 整理好参数
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
      // 将收集好的属性值push到渲染的数组中去
      row.spuSaleAttrValueList.push(newSaleAttrValue)
    },
    // 保存按钮的回调
    async addOrUpdateSpu() {
      // 整理参数
      // 只需要整理照片墙数据相关的参数
      this.spuInfo.spuImageList = this.spuImg.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spuInfo)
      if (result.code == 200) {
        this.$message({ type: 'success', message: '保存成功' })
        // 切换场景
        this.$emit('changeScene', { scene: 0, flag: this.spuInfo.id ? '修改' : '添加' })
      }
      // 清空数据
      Object.assign(this._data, this.$options.data())
    },
    // 点击父组件的添加SPU按钮的回调
    // 需要获取到 品牌信息 销售属性信息
    async addSpuData(category3Id) {
      // 点击添加SPU的时候 收集3级分类的id
      this.spuInfo.category3Id = category3Id
      // 获取品牌信息
      let tmResult = await this.$API.spu.reqTradeMarkList()
      if (tmResult.code == 200) {
        this.tradeMarkList = tmResult.data
      }
      // 获取全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttr()
      if (saleResult.code == 200) {
        this.SaleAttr = saleResult.data
      }
    },
    // 取消按钮的回调
    cancel() {
      // 切换场景
      this.$emit('changeScene', { scene: 0, flag: '' })
      // 清空数据
      // this._data 是data中的响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空
      Object.assign(this._data, this.$options.data())
    }
  },
  computed: {
    // 计算出还未选择的销售属性
    // 所有的销售属性存储在 SaleAttr中 尺寸 颜色 版本
    // 已有的销售属性存储在 spuInfo.spuSaleAttrList 中
    // filter 可以从已有的数组中过滤出用户需要的元素 返回一个新的数组
    // every 返回布尔值
    unSelectSaleAttr() {
      return this.SaleAttr.filter(item => {
        return this.spuInfo.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>