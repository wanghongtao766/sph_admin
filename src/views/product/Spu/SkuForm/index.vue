<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{ spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuInfo.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(KG)">
        <el-input placeholder="重量(KG)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="5" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfo" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="sale.saleAttrName" v-for="sale in saleAttrList" :key="sale.id">
            <el-select placeholder="请选择" v-model="sale.attrIdAndValueId">
              <el-option :label="sValue.saleAttrValueName" :value="`${sale.id}:${sValue.id}`" v-for="sValue in sale.spuSaleAttrValueList" :key="sValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <!-- 
           @selection-change="handleSelectionChange" 复选框发生变化时的回调
         -->
        <el-table style="width: 100%" border :data="spuImageList"  @selection-change="handleSelectionChange">
          <el-table-column prop="prop"  type="selection" label="label" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width: 100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault == 0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  // 存储从父组件传递来的3级Id信息
  props: ['idData'],
  data() {
    return {
      // 销售属性的数据 
      saleAttrList: [],
      // 平台属性数据
      attrInfo: [],
      // 图片数据
      spuImageList: [],
      // spu名称
      spuName: '',
      // 收集sku数据的字段
      skuInfo: {
        // 第一类收集的数据 父组件给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类 需要通过数据双向绑定v-model收集
        skuName: "",
        price: null,
        weight: "",
        skuDesc: "", // 规格描述
        // 第三类 需要自己书写代码
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0
          // }
        ],
        // 默认图片
        skuDefaultImg: "",
        skuImageList: [
          // {
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "isDefault": "string",
          //   "spuImgId": 0
          // }
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   "saleAttrId": 0,
          //   "saleAttrValueId": 0,
          // }
        ],
      },
      // 收集图片的数据字段   但是收集的数据目前缺少 isDefault字段
      imageList: []
    }
  },
  methods: {
    // 获取SkuForm数据
    async getData(spu) {
      // console.log(spu);
      // 收集父组件传递的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      // 获取spu名称
      this.spuName = spu.spuName
      // 获取销售属性数据
      let resultSale = await this.$API.spu.reqSaleAttrList(spu.id)
      if (resultSale.code == 200) {
        this.saleAttrList = resultSale.data
      }
      // 获取平台属性数据
      // 解构出3级id
      let { category1id, category2id, category3id } = this.idData
      let resultAttr = await this.$API.spu.reqAttrInfo(category1id, category2id, category3id)
      if (resultAttr.code == 200) {
        this.attrInfo = resultAttr.data
      }
      // 获取图片数据
      let resultImg = await this.$API.spu.reqSpuImageList(spu.id)
      if (resultImg.code == 200) {
        let list = resultImg.data
        // 将获取到的图片数据添加 isDefault字段
        list.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageList = list
      }
    },
    // 表格中复选框发生变化时的回调
    handleSelectionChange(selection) {
      // selection 可以获取到用户选中图片的信息数据  但是缺少 isDefault字段
      // selection 中的信息源自于 spuImageList，为 spuImageList加上 isDefault字段即可
      this.imageList = selection
    },
    // 排他操作  设置默认图片
    changeDefault(row) {
      // 图片列表数据的 isDefault字段变为 0 
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      // 点击的那个图片数据变为 1
      row.isDefault = 1
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 点击取消按钮的回调
    cancel() {
      this.$emit('changeScene', { scene: 0, flag: '' })
      // 清除数据
      Object.assign(this._data, this.$options.data())
    },
    // 点击保存按钮的回调
    async save() {
      // 整理参数
      const { attrInfo, skuInfo, saleAttrList, imageList } = this
      // 整理平台属性的参数
      skuInfo.skuAttrValueList = attrInfo.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      // 整理销售属性的参数
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 整理图片的数据
      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 参数整理完毕 发送请求
      let result = await this.$API.spu.reqAddSku(skuInfo)
      if (result.code == 200) {
        // 请求成功 切换场景
        this.$emit('changeScene', { scene: 0, flag: '' })
        this.$message({ type: 'success', message: '保存成功' })
      }
      // 清空数据
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style>
</style>