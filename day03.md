17）添加属性和修改属性的静态
-----利用v-show 切换展示的结构 （商品属性数据的表格 || 添加属性or修改属性的结构）

19）收集属性名
-----封装添加属性和属性值接口函数
-----收集接口需要的参数
-----v-model 双向绑定收集属性名

20）收集属性值
-----添加属性值按钮的禁用 输入框中有没有填入属性值
-----给添加属性值这个按钮添加点击事件，将属性值以及id添加到属性值的数组中 

21）点击取消按钮，阻止数据回显功能
----对 添加属性按钮 添加回调，清除掉之前填写的数据

22）点击编辑按钮 
----将需要编辑的数据展示到修改页，利用lodash的深拷贝 cloneDeep
----<font color="pink">深拷贝 浅拷贝面试频率高，</font>达到手写深拷贝和浅拷贝 

23）添加属性中的 查看模式与编辑模式 切换  
----<font color="pink">对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）</font>
---- 查看模式与编辑模式 span和input元素的切换
---- 给每一个属性添加 flag标记，控制编辑模式和查看模式的切换 ，好处：每一个属性值都可以控制自己的模式切换
---- 而且flag是响应式的
---- 添加属性值时候 可以添加flag属性，<font color="pink">而在修改属性时利用$set添加新的属性 flag，</font>这样才能保证flag仍是响应式的

24）查看模式和编辑模式注意事项
---- 输入的属性值不能为空
---- 新增的属性值不能和已有的属性值相同

25）表单元素自动聚焦实现
<font color="pink">需要注意:</font>点击 span的时候，会重绘重拍一个input，它是需要耗费时间的，因此我们不可能一点击 span立马获取到 input
---- 使用生命周期函数 nextTick

26）删除属性值的操作
--- 点击删除图标的弹出框是：气泡确认框
--- 然后操作数组 <font color="pink">删除数组中的元素</font>

27）添加属性和修改属性中的保存操作
--- 点击保存按钮 进行的一些回调
--- 整理参数 将不需要的参数flag去掉，以及不可以将属性值为空的传递给服务器

28）三级联动select框以及保存按钮的禁用与非禁用状态
--- 三级联动select框却决于 isShowTable这个数据
--- 保存按钮取决于 attrValueList的长度

29）删除平台属性
--- 封装相应的接口函数