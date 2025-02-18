// SKU模块接口管理
import request from '@/utils/request';
import { HasSkuResponseData } from '@/api/product/sku/type';

enum API {
  // 获取已有的SKU数据
  SKU_URL = '/product/list',
  // 上架
  SALE_URL = '/product/onSale/',
  // 下架
  CANCEL_SALE_URL = '/product/cancelSale/',
}

// 获取SKU分页数据的接口
export const reqHasSku = (currentPage: number, pageSize: number) =>
    request.get<any, HasSkuResponseData>(API.SKU_URL + `/${currentPage}/${pageSize}`);
// SKU上架接口
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId);
// SKU下架接口
export const reqCancelSaleSku = (skuId: number) => request.get<any, any>(API.CANCEL_SALE_URL + skuId);
