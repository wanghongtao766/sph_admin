<template>
  <div>
    <el-card style="margin-bottom: 20px"> 
      <CategorySelect @getCategoryId="getCategoryId" :show="isShowTable"></CategorySelect>
    </el-card>
    <el-card> 
      <!-- 展示平台属性数据的结构 -->
      <div v-show="isShowTable">
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px" :disabled="!category3id" @click="addAttr">添加属性</el-button>
        <!-- 表格 展示平台属性-->
        <el-table style="width: 100%" :data="attrList" border>
          <el-table-column prop="prop" label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row}">
              <!-- {{ row }} -->
              <el-tag type="success" v-for="item in row.attrValueList" :key="item.id" style="margin-right: 10px">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-popconfirm title="确认删除此属性？" @onConfirm="deleteAttr(row)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference" style="margin: 0 5px"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性 || 修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="54px">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
        <el-table style="width: 100%; margin: 20px 0" border :data="attrInfo.attrValueList">
          <el-table-column prop="prop" label="序号" width="70" type="index" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row, $index}">
              <el-input v-model="row.valueName" placeholder="请输入属性值" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row, $index}">
              <!-- 气泡确认框 -->
              <el-popconfirm :title="`确认删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入 lodash中的深拷贝
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attr',
  data() {
    return {
      // 商品分类的id
      category1id: '',
      category2id: '',
      category3id: '',
      // 平台的属性数据
      attrList: [],
      // 控制 table表格的显示和隐藏  同时页决定中三级联动的input的禁用和非禁用状态
      isShowTable: true,
      // 添加属性 || 修改属性需要的参数
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [  // 属性值
          // {
          //   attrId: 0, // 相应属性名的id
          //   valueName: "string"
          // }
        ],
        categoryId: 0,  // 三级分类的 id
        categoryLevel: 3,  // 告知服务器是几级id
      }
    }
  },
  methods: {
    // 获取分类 id 发送请求
    getCategoryId(dataId) {
      // 解构出对应的分类 id 
      let { category1id, category2id, category3id } = dataId
      // 保存 id数据
      this.category1id = category1id
      this.category2id = category2id
      this.category3id = category3id
      // 发请求获取平台属性数据
      this.getAttrList()
    },
    // 获取平台属性数据
    async getAttrList() {
      let result = await this.$API.attr.reqCategoryAttrList(this.category1id, this.category2id, this.category3id)
      if (result.code == 200) {
        this.attrList = result.data
      }
    },
    // 点击 添加属性值 的按钮
    addAttrValue() {
      // 向属性值的数组添加元素
      this.attrInfo.attrValueList.push({
        //对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上
        attrId: this.attrInfo.id,
        valueName: '',
        // 给每一个属性添加 flag标记，控制编辑模式和查看模式的切换 ，好处：每一个属性值都可以控制自己的模式切换
        // 而且 flag属性是响应式的 
        flag: true,
      })
      // 新增一个属性值 表单元素自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 点击 添加属性 的按钮
    addAttr() {
      this.isShowTable = false
      // 清除之前填写的数据，防止数据回显, 顺便收集三级分类的 id
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3id,
        categoryLevel: 3
      }
    },
    // 点击 更新属性图标 按钮 
    updateAttr(row) {
      this.isShowTable = false
      // console.log(row);
      // 将数据传递到修改页
      // this.attrInfo = row // 不可直接赋值，将两个对象指向同一地址，因为row中的数据结构较为复杂所以需要深拷贝
      this.attrInfo = cloneDeep(row)
      // 修改某一个属性值时  给相应的元素添加flag属性
      // 为了保证 flag是响应式的，利用$set给对象添加属性
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })

    },
    // 失去焦点事件---切换为查看模式，展示 span
    toLook(row) {
      // 形参 row为用户添加的最新的属性值
      // 1.输入的不能为空
      if (row.valueName.trim() == '') {
        this.$message({
          message: '属性值不能为空',
          type: 'warning'
        })
        return
      }
      // 2.新增属性值不能和已有的属性值重复
      let isRept = this.attrInfo.attrValueList.some(item => {
        // 需要将row从数组判断中去除
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      if (isRept) {
        this.$message({
          message: '属性值不能重复',
          type: 'warning'
        })
        return
      }
      // 编辑模式和查看模式切换
      row.flag = false
    },
    // 点击span 切换为编辑模式
    toEdit(row, index) {
      row.flag = true
      // 获取到相应的input节点，使其自动聚焦
      // 需要注意：点击 span的时候，会重绘重拍一个input，它是需要耗费时间的，因此我们不可能一点击 span立马获取到 input
      // 需要用到 nextTick() 生命周期函数
      this.$nextTick(() => {
        this.$refs[index].focus();
      })
    },
    // 气泡确认框的回调, 确认删除属性值
    deleteAttrValue(index) {
      // 删除相应的数组 即可删除数据
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 添加属性|修改属性的保存按钮-发请求
    async addOrUpdateAttr() {
      // 属性值为空不应该传递给服务器，去掉服务器不需要的flag属性
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName != '') {
          delete item.flag
          return true
        }
      })
      try {
        // 发送请求
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        // 切换到数据展示页面
        this.isShowTable = true
        this.$message({ type: 'success', message: '保存成功' })
        // 成功后获取最新数据
        this.getAttrList()
      } catch {
        this.$message({ type: 'error', message: '保存失败' })
      }
    },
    // 气泡确认框的回调, 确认删除属性, 注意！！！ 此处是删除属性不是 属性值
    async deleteAttr(row) {
      let result = await this.$API.attr.reqDeleteAttr(row.id)
      if (result.code == 200) {
        this.$message({type: 'success', message: '删除成功'})
        this.getAttrList()
      } else {
        this.$message({type: 'danger', message: '删除失败！'})
      }
    }

  }

}
</script>

<style>
</style>