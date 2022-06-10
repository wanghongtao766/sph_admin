// tradeMark.js 获取品牌管理的数据模块

import request from '@/utils/request'

// 获取品牌列表数据
export const reqTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
})

//处理添加品牌
//新增品牌：/admin/product/baseTrademark/save   post 携带两个参数：品牌名称、品牌logo
//切记：对于新增的品牌，给服务器传递数据，不需要传递id,id是由服务器生成

//修改品牌
//修改品牌 /admin/product/baseTrademark/update   put 携带三个参数：id、品牌名称、品牌logo
//切记：对于修改某一个品牌的操作，前端携带的参数需要带上id,你需要告诉服务器修改的是哪一个品牌

// 可以将两个接口封装为一个
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    // 如果有id 则为修改品牌的接口
    return request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tradeMark
    })
  } else {
    // 否则就是添加品牌
    return request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tradeMark
    })
  }
}

// 删除品牌    DELETE /admin/product/baseTrademark/remove/{id}
export const reqRemoveTradeMark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'DELETE'
})