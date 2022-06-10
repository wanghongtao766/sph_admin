// SPU 相当于商品的一个类，此文件为spu请求模块

import request from '@/utils/request'

// 获取SPU列表数据   /admin/product/{page}/{limit}   需要三个参数 page  limit  category3Id
export const reqSpuList = (page,limit,category3Id) => request({ 
  url:`/admin/product/${page}/${limit}?category3Id=${category3Id}`,
  method: 'get'
})

// 获取品牌信息    GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取平台全部销售属性 一共三个   GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttr = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 获取spu信息   GET /admin/product/getSpuById/{spuId}
export const reqSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取spu图片   GET /admin/product/spuImageList/{spuId}
export const reqSpuImg = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 添加|修改SPU
// POST /admin/product/updateSpuInfo  修改
// POST /admin/product/saveSpuInfo  添加
export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
  } else {
    return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
  }
}

// 删除 Spu  /admin/product/deleteSpu/{spuId}   delete
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })




// 以下的模块是 spu管理 中需要用到有关 sku 的的网络请求 大多数在 skuForm.vue中使用
// 以下三个请求是 点击添加sku按钮展示的页面需要的初始化数据
// 获取销售属性的数据    get    /admin/product/spuSaleAttrList/{spuId}  
export const reqSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取平台属性的数据   get   /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfo = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 获取图片的数据      get  /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 添加sku     post  /admin/product/saveSkuInfo  保存按钮
export const reqAddSku = (skuInfo) => request({ url: `/admin/product/saveSkuInfo`, method: 'post', data: skuInfo })

// 通过spuId获取Sku列表数据     get  /admin/product/findBySpuId/{spuId}  查看详情按钮
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })

