// SKU模块接口管理
import request from '@/utils/request';
import { HasSkuResponseData } from '@/api/product/sku/type';

enum API {
  // 获取已有的SKU数据
  SKU_URL = '/product/list'
}

// 获取SKU分页数据的接口
export const reqHasSku = (currentPage: number, pageSize: number) =>
    request.get<any, HasSkuResponseData>(API.SKU_URL + `/${currentPage}/${pageSize}`);
