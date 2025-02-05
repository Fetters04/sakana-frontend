// SPU管理模块的接口
import request from '@/utils/request';
import {
  AllTrademark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData,
  SpuHasImg
} from '@/api/product/spu/type';

enum API {
  // 获取已有的SPU数据
  HAS_SPU_URL = '/product',
  // 获取已有品牌
  TRADEMARK_URL = '/product/baseTrademark',
  // 获取某个SPU下的全部售卖商品图片数据
  IMAGE_URL = '/product/spuImageList/',
  // 获取某个SPU下的全部的已有销售属性
  SPU_HAS_SALE_ATTR_URL = '/product/spuSaleAttrList/',
  // 获取全部的销售属性
  ALL_SALE_ATTR_URL = '/product/baseSaleAttrList'
}

// 获取某个三级分类下已有的SPU数据接口
export const reqHasSPU = (currentPage: number, pageSize: number, category3Id: number | string) =>
    request.get<any, HasSpuResponseData>(API.HAS_SPU_URL + `/${currentPage}/${pageSize}?category3Id=${category3Id}`);
// 获取已有品牌接口
export const reqAllTrademark = () =>
    request.get<any, AllTrademark>(API.TRADEMARK_URL);
// 获取某个SPU下全部商品图片接口
export const reqSpuImageList = (spuId: number) =>
    request.get<any, SpuHasImg>(API.IMAGE_URL + spuId);
// 获取某个SPU已有的销售属性接口
export const reqSpuHasSaleAttr = (spuId: number) =>
    request.get<any, SaleAttrResponseData>(API.SPU_HAS_SALE_ATTR_URL + spuId);
// 获取全部销售属性接口
export const reqAllSaleAttr = () =>
    request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL);
