// 用户管理模块接口
import request from '@/utils/request';
import { HasUserResponseData, UserInfo } from '@/api/acl/user/type';

enum API {
  // 获取用户账号分页信息
  USER_URL = '/acl/user',
  // 添加用户账号
  ADD_USER_URL = '/acl/user/save',
  // 修改用户账号
  UPDATE_USER_URL = '/acl/user/update'
}

// 获取用户账号分页信息的接口
export const reqUserInfo = (currentPage: number, pageSize: number) =>
    request.get<any, HasUserResponseData>(API.USER_URL + `/${currentPage}/${pageSize}`);
// 添加用户|修改用户的接口
export const reqAddOrUpdateUser = (data: UserInfo) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data);
  } else {
    return request.post<any, any>(API.ADD_USER_URL, data);
  }
};
