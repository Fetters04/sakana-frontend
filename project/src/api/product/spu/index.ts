// SPU管理模块的接口
import request from '@/utils/request';
import { HasSpuResponseData } from '@/api/product/spu/type';

enum API {
  // 获取已有的SPU数据
  HAS_SPU_URL = '/product'
}

// 获取某个三级分类下已有的SPU数据
export const reqHasSPU = (currentPage: number, pageSize: number, category3Id: number | string) =>
    request.get<any, HasSpuResponseData>(API.HAS_SPU_URL + `/${currentPage}/${pageSize}?category3Id=${category3Id}`);
