// 用户管理模块接口
import request from '@/utils/request';
import { AllRoleResponseData, HasUserResponseData, SetRoleData, UserInfo } from '@/api/acl/user/type';

enum API {
  // 获取用户账号分页信息
  USER_URL = '/acl/user',
  // 添加用户账号
  ADD_USER_URL = '/acl/user/save',
  // 修改用户账号
  UPDATE_USER_URL = '/acl/user/update',
  // 获取全部角色和当前账号角色
  ALL_ROLE_URL = '/acl/user/toAssign/',
  // 给已有用户分配角色
  SET_ROLE_URL = '/acl/user/doAssignRole',
  // 删除单个用户
  DELETE_USER_URL = '/acl/user/remove/',
  // 批量删除用户
  BATCH_DELETE_USER_URL = '/acl/user/batchRemove',
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
// 获取全部角色和当前账号角色的接口
export const reqAllRole = (userId: number) =>
    request.get<any, AllRoleResponseData>(API.ALL_ROLE_URL + userId);
// 分配角色的接口
export const reqSetUserRole = (data: SetRoleData) =>
    request.post<any, any>(API.SET_ROLE_URL, data);
// 删除单个用户的接口
export const reqRemoveUser = (userId: number) =>
    request.delete<any, any>(API.DELETE_USER_URL + userId);
// 批量删除用户的接口
export const reqBatchRemoveUser = (userIds: number[]) =>
    request.delete<any, any>(API.BATCH_DELETE_USER_URL, {
      data: userIds
    });
