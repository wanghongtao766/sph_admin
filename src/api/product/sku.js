// sku就是相对于spu的一个实例对象  此文件是sku的请求模块

import request from '@/utils/request'

// 直接获取到sku列表的数据   get  /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// sku的上架     get  /admin/product/onSale/{skuId}
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

// sku的下架     get  /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// sku的详情数据 通过skuId获取sku的数据     get  /admin/product/getSkuById/{skuId}
export const reqgetSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })

// sku删除   delete  /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId) => request({ url: `/admin/product/deleteSku/${skuId}`, method: 'delete' })