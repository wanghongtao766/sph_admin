// index.js   将四个模块接口函数统一暴漏
import * as trademark from './product/tradeMark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'

export default {
  trademark,
  attr,
  sku,
  spu
}