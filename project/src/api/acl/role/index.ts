import request from '@/utils/request';
import { HasRoleResponseData, RoleInfo } from '@/api/acl/role/type';

enum API {
  // 获取角色分页数据
  ALL_ROLE_URL = '/acl/role',
  // 新增角色
  ADD_ROLE_URL = '/acl/role/save',
  // 更新角色
  UPDATE_ROLE_URL = '/acl/role/update',
}

// 获取角色分页数据的接口
export const reqAllRoleList = (currentPage: number, pageSize: number, roleName: string) =>
    request.get<any, HasRoleResponseData>(API.ALL_ROLE_URL + `/${currentPage}/${pageSize}?roleName=${roleName}`)
// 新增与更新角色的接口
export const reqAddOrUpdateRole = (data: RoleInfo) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, data);
  }
}
