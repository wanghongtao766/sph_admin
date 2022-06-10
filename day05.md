45）完成添加SKU静态组件

46）获取添加Sku的数据
--- GET /dev-api/admin/product/spuSaleAttrList
--- GET /dev-api/admin/product/attrInfoList
--- GET /dev-api/admin/product/spuImageList
--- 添加Sku时 点击 + 图标按钮，可以知道发送以上三个网络请求
--- 封装接口函数
--- 获取相应的数据 将数据存储到组件，然后将其渲染

47）SkuForm数据的展示和收集    <font color="pink"></font>
--- 收集sku数据所需参数
--- 对于平台属性所需要收集的参数   平台属性id  平台属性值的id
--- 将收集到的 平台属性id 平台属性值的id，保存在每一个<font color="pink">平台属性</font>身上
```vue
<el-form-item :label="attr.attrName" v-for="attr in attrInfo" :key="attr.id">
    <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
        <el-option 
                   :label="attrValue.valueName" 
                   :value="`${attr.id}:${attrValue.id}`" 
                   v-for="attrValue in attr.attrValueList" 
                   :key="attrValue.id">
        </el-option>
    </el-select>
</el-form-item>
```
--- 销售属性的收集也和平台属性类似

48）完成图片的展示和收集
--- 收集到选中的图片相关信息
--- 收集到默认图片的地址
--- 设置默认按钮的动态变化  排他思想

49）完成添加SkuForm保存的操作
--- 整理参数 平台属性的参数 销售属性的参数
--- 图片列表的数据
--- 数组方法 reduce的使用   map映射的使用

50）完成sku列表的展示
--- 静态利用 el-dialog 对话框完成
--- 请求数据 渲染到页面上

51）查看sku列表的loading效果
--- element Ui中的 Loading加载
--- 注意设置 loading的true false时机


sku模块

52）sku模块的数据展示
--- 写静态
--- 写接口  请求到数据展示到页面
--- 分页器的功能完善

53）sku的上架和下架
--- 写好接口
--- 请求上架 下架后，再次请求最新的数据

54）sku查看详情业务
--- 写接口
--- 写静态
--- 发请求 将数据存储到组件
--- 将数据渲染到页面

55）<font color="pink">深度选择器</font>              <font color="pink"></font>
"<<<"     一般用于原生css
/deep/    一般用于1ess
::v-deep  一般用户scss

scoped)属性的作用----加上scoped的作用是只是对于当前的组件有用（样式）
对于某一个组件，如果style添加上scoped属性，给当前子组件的结构中都添加上一个data-v-xxxx自定义属性
会发现Vue是通过属性选择器，给需要添加的元素添加上样式
"h3[data-v-7ba5bd90]"

注意：
如果父组件的样式(scoped),而且还想影响到子组件的样式？像这种情况我们可以使用深度选择器。

56）sku的删除
--- 写接口
--- 发请求
--- 渲染最新的数据