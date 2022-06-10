// 平台属性管理模块请求文件

// 引入二次封装的 axios
import request from '@/utils/request'

// 获取一级商品分类  /admin/product/getCategory1
export const reqCategory1List = () => request({
  url: '/admin/product/getCategory1',
  method: 'get'
})

// 获取二级商品分类  /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'get'
})

// 获取商品三级分类  GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'get'
})

// 获取商品属性数据列表   /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqCategoryAttrList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 添加||修改属性和属性值    /admin/product/saveAttrInfo  post
export const reqAddOrUpdateAttr = (data) => request({
  url: "/admin/product/saveAttrInfo",
  method: 'post',
  data
})
// data中的参数格式
// {
//   "attrName": "string",
//   "attrValueList": [
//     {
//       "attrId": 0,
//       "valueName": "string"
//     }
//   ],
//   "categoryId": 0,
//   "categoryLevel": 3,
// }

// 删除平台属性接口  DELETE  /admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'delete'
})
