spu模块  

30）spu管理模块静态
--- ele ui中的 el-card  table  button  pagination(分页器)

31）完成SPU的列表展示
--- 封装好获取SPU列表数据的接口函数
--- 将获取到的数据存储到组件中
--- el-button 添加title属性，完成提示文字
--- 分页器回调的相关处理

32）完成SPU管理内容切换
---- 展示SPU列表的结构
---- 展示添加SPU|修改SPU的结构
---- 展示添加SKU的结构
---- 利用sence这个响应式数据 控制以上三个部分的切换
---- 将 添加SPU|修改SPU 展示添加SKU结构 分别封装为两个组件

33）完成SkuForm静态         数据的展示数据的收集
---- 主要用 el-form进行布局

34）SpuForm业务分析   
----获取品牌的数据需要发请求        http://localhost:9529/dev-api/admin/product/baseTrademark/getTrademarkList
----获取平台中全部的销售属性(3个)   http://localhost:9529/dev-api/admin/product/basesaleAttrList
----获取某一个SPU信息              http://localhost:9529/dev-api/admin/product/getspuById/5092
----获取SPU图片                   http://localhost:9529/dev-api/admin/product/spuImageList/5092
----<font color="pink">在父组件中可以通过$ref获取子组件</font>

35）SpuForm获取服务器数据操作
---- 封装接口函数
---- 获取相关的数据 保存到SpuForm组件当中

36）完成SpuForm数据的展示与收集
---- 在spuInfo中不应该是一个空对象 要根据服务器需要的参数设置相对应的属性，使添加和修改功能都可以实现

37）销售属性的数据展示

38）完成SpuForm照片墙图片的收集
---- 照片墙在删除图片时需要收集图片数据
---- 照片墙在上传图片时也需要收集图片数据

39）完成添加属性的操作
---- 收集哪些数据
  basesaleAttrId
  saleAttrName
  spusaleAttrvalueList
---- 在什么时候收集数据
  :value="`${item.id}:${item.name}`"  收集未选择的属性id和属性名，保存到data中的attrIdAndAttrName
---- 之后将attrIdAndAttrName数据分割，向 spuInfo 中的 spuSaleAttrList 添加新的销售属性

41）完成销售属性值的展示和收集
--- 需要将输入的属性值和属性值id从row中解构出 baseSaleAttrId, inputValue
--- 整理好参数 将参数push到属性值列表中
--- 输入的属性值有限制：不能为空  不能重复

41）完成删除销售属性和销售属性值的操作
--- 利用数组的splic方法删除对应的值

42）完成SpuForm的保存操作
--- 写接口 添加|修改SPU
--- 请求成功 切换场景
--- 修改完后要停留在当前页

43）完成添加Spu业务
--- 点击添加SPU按钮时，要获取品牌信息 销售属性信息
--- 收集3级分类的id category3Id
--- 最后清空数据

44）删除Spu业务