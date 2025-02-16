// SPU管理模块的接口
import request from '@/utils/request';
import {
  AllTrademark,
  HasSaleAttrResponseData,
  HasSpuResponseData,
  SaleAttrResponseData, SkuData, SkuInfoResponseData, SpuData,
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
  ALL_SALE_ATTR_URL = '/product/baseSaleAttrList',
  // 新增一个SPU
  ADD_SPU_URL = '/product/saveSpuInfo',
  // 修改已有的SPU
  UPDATE_SPU_URL = '/product/updateSpuInfo',
  // 添加一个SKU
  ADD_SKU_URL = '/product/saveSkuInfo',
  // 查看某个已有的SPU下全部SKU
  SKU_INFO_URL = '/product/findBySpuId/',
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
// 新增或修改SPU的接口, data: 新增的SPU或已有的SPU对象
export const reqAddOrUpdateSpu = (data: SpuData) => {
  // 如果SPU拥有ID -> 更新已有的SPU
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data);
  } else {
    // 新增一个SPU
    return request.post<any, any>(API.ADD_SPU_URL, data);
  }
};

// 添加SKU的接口
export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADD_SKU_URL, data);
// 获取某个SPU下的SKU列表接口
export const reqSkuList = (spuId: number | string) =>
    request.get<any, SkuInfoResponseData>(API.SKU_INFO_URL + spuId);
