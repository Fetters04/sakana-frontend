// 品牌管理模块相关的接口
import request from '@/utils/request';
import { Trademark, TrademarkResponseData } from '@/api/product/trademark/type';

// 接口地址
enum API {
  // 获取已有品牌
  TRADEMARK_URL = '/product/baseTrademark',
  // 添加品牌
  ADD_TRADEMARK_URL = '/product/baseAddTrademark/save',
  // 修改品牌
  UPDATE_TRADEMARK_URL = '/product/baseUpdateTrademark/update'
}

// 获取已有品牌接口
export const reqHasTrademark = (page: number, pageSize: number) => {
  return request.get<any, TrademarkResponseData>(API.TRADEMARK_URL + `/${page}/${pageSize}`);
};
// 添加与修改已有品牌接口
export const reqAddOrUpdateTrademark = (data: Trademark) => {
  if (data.id) {
    // 修改已有品牌数据
    return request.put<any, any>(API.UPDATE_TRADEMARK_URL, data);
  } else {
    // 新增品牌
    return request.post<any, any>(API.ADD_TRADEMARK_URL, data);
  }
};

