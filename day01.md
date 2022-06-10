### 1）模板介绍

简洁版：https://github.com/PanJiaChen,/vue-admin-template
加强版：https:/github.com/PanJiaChen/vue-element-admin

### 2）模板的文件与文件夹认知【简洁版】

build
---index.js webpacki配置文件【很少修改这个文件】

mock
---mock数据的文件夹【模拟一些假的数据mock了s实现的】，因为咱们实际开发的时候，利用的是真是接口

node modules
----项目依赖的模块
public
--ico图标，静态页面，publick文件夹里面经常放置一些静态资源，而且在项目打包的时侯候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面

src
程序员源代码的地方
---api文件夹：涉及请求相关的
---assets文件夹：里面放置一些静态资源（一般共享的），放在aseets.文件夹里面静态资源，在webpack打包的时侯，会进行编译
---components文件夹：一般放置非路由组件获取全局组件
---iconsi这个文件夹的里面放置了一些svg矢量图
---layout文件夹：他里面放置一些组件与混入
---router.文件夹：与路由相关的
store文件夹：一定是与vuex先关的
styles文件夹：与样式先关的
---utils文件夹：request.js是axios二次封装文件

App.Vue:根组件
main.js:入口文件
permission.js:与导航守卫先关、
settings:项目配置项文件

### 后台管理系统API接口在线文档：

http://39.98.123.211:8170/swagger-ui.html
http://39.98.123.211:8216/swagger-ui.html

### 3）完成登录业务

-----静态组件完成
-----书写API(换成真实的接口)
-----axios二次封装
-----换成真实接口之后需要解决代理跨域问题（解决代理跨域问题

### 4）完成退出登录业务

修改layout组件中的 Navbar组件

### 5）项目路由的搭建

-----删除views目录下的不需要的路由组件
-----删除router目录下的路由信息
-----新建product相关的路由组件
-----配置producti路由信息router目录下
-----路由一配置好左侧的sidebar会自动配置好

### 6）品牌管理静态组件

-----element ui中，按钮 表格 分页器相关属性设置

### 7）品牌管理列表的展示

-----书写相关API接口  书写tradeMark.js中的网络请求
-----在api目录下新建index.js文件， 将四个模块接口函数统一暴漏 在main.js文件中将index.js文件挂载到Vue的实例对象上
-----ele ui中 table展示数据是以列为单位展示的
-----渲染数据时 注意作用域插槽和prop的用法，作用域插槽可以将数据传递给子组件
-----分页器中 两个事件回调的使用
      @size-change="handleSizeChange"  每页记录数发生改变会触发
      @current-change="handleCurrentChange"  当前页发生改变时会触发

### 8）添加品牌和修改品牌静态完成

-----element ui 中的upload上传 用户头像上传以及 dialog对话框中的自定义内容

### 9）完成添加品牌的功能

-----书写相关API接口
-----前台收集数据 提交给服务器（发请求）
-----点击确定 发送请求

### 10）品牌修改功能

------修改品牌信息的回调 将 row 对象的浅拷贝赋值给响应式的数据 tmForm, 不能将 row 直接赋值给 tmForm，
------如果是添加品牌则留在第一页 修改品牌则应该留在当前页面

### 11）添加 || 修改品牌的表单验证 

-----给form表单添加 rules 属性，在data中自定义验证规则，给每个form的item项添加 prop属性，用来匹配验证规则
-----全部字段通过表单验证后 再执行相应的业务逻辑
-----自定义校验规则 （重点）

### 12）品牌删除功能

-----利用ele ui的 MessageBox 弹框
-----封装相应的删除接口







