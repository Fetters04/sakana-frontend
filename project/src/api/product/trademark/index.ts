// 品牌管理模块相关的接口
import request from '@/utils/request';

// 接口地址
enum API {
  TRADEMARK_URL = '/product/baseTrademark',
}

// 获取已有品牌接口
export const reqHasTrademark = (page: number, pageSize: number) => {
  return request.get<any, any>(API.TRADEMARK_URL + `/${page}/${pageSize}`);
};

