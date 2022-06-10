<template>
  <div>
    <!-- :inline="true" 代表行内表单 一行放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="cForm.category1id" @change="handler1" :disabled="!show">
          <el-option :label="c1.name" :value="c1.id" v-for="c1 in Category1List" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="cForm.category2id" @change="handler2" :disabled="!show">
          <el-option :label="c2.name" :value="c2.id" v-for="c2 in Category2List" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3id" @change="handler3" :disabled="!show">
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in Category3List" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      // 一级分类数据
      Category1List: [],
      // 二级分类数据
      Category2List: [],
      // 三级分类数据
      Category3List: [],
      // 收集相应的一级二级三级分类的id
      cForm: {
        category1id: '',
        category2id: '',
        category3id: ''
      }
    }
  },
  mounted() {
    // 此组件一挂载就要获取到一级分类的数据进行展示
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类数据
    async getCategory1List() {
      let result = await this.$API.attr.reqCategory1List()
      // console.log(result);
      if (result.code == 200) {
        this.Category1List = result.data
      }
    },
    // 一级分类的option发生变化时，获取二级分类的数据
    async handler1() {
      // 清除二三级分类的数据
      this.Category2List = []
      this.Category3List = []
      this.cForm.category2id = ''
      this.cForm.category3id = ''
      // 请求二级分类的数据
      let result = await this.$API.attr.reqCategory2List(this.cForm.category1id)
      // console.log(result);
      if (result.code == 200) {
        this.Category2List = result.data
      }
    },
    // 二级分类option发生变化时，获取三级分类数据
    async handler2() {
      // 清除三级分类数据
      this.Category3List = [],
      this.cForm.category3id = ''
      let result = await this.$API.attr.reqCategory3List(this.cForm.category2id)
      if (result.code == 200) {
        this.Category3List = result.data
      }
    },
    // 三级分类option发生变化时的事件回调
    handler3() {
      // 触发自定义事件 将收集的 id数据传递给父组件
      this.$emit('getCategoryId', this.cForm)
    }
  }

}
</script>

<style>
</style>