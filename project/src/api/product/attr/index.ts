import request from '@/utils/request';
import { Attr, AttrResponseData, CategoryResponseData } from '@/api/product/attr/type';

// 属性管理模块接口地址
enum API {
  // 获取一级分类接口地址
  C1_URL = '/product/getCategory1',
  // 获取二级分类接口地址
  C2_URL = '/product/getCategory2/',
  // 获取三级分类接口地址
  C3_URL = '/product/getCategory3/',
  // 获取分类下已有的属性和属性值
  ATTR_URL = '/product/attrInfoList',
  // 添加或修改已有属性的接口
  ADD_OR_UPDATE_ATTR_URL = '/product/saveAttrInfo',
  // 删除已有属性
  DELETE_ATTR_URL = '/product/deleteAttr/',
}

// 获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
// 获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) =>
    request.get<any, CategoryResponseData>(API.C2_URL + category1Id);
// 获取三级分类的接口方法
export const reqC3 = (category2Id: number) =>
    request.get<any, CategoryResponseData>(API.C3_URL + category2Id);
// 获取分类下已有的属性和属性值的接口方法
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) =>
    request.get<any, AttrResponseData>(API.ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`);
// 新增或修改已有属性的接口方法
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data);
// 删除已有属性的接口方法
export const reqRemoveAttr = (attrId: number) => request.delete<any, any>(API.DELETE_ATTR_URL + attrId);
