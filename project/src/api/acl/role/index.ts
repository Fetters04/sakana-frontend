import request from '@/utils/request';
import { HasRoleResponseData, RoleInfo } from '@/api/acl/role/type';
import { PermissionResponseData } from '@/api/acl/menu/type';

enum API {
  // 获取角色分页数据
  ALL_ROLE_URL = '/acl/role',
  // 新增角色
  ADD_ROLE_URL = '/acl/role/save',
  // 更新角色
  UPDATE_ROLE_URL = '/acl/role/update',
  // 根据角色ID获取权限数据
  ROLE_PERMISSION_URL = '/acl/permission/toAssign',
  // 给角色分配权限
  SET_PERMISSION_URL = '/acl/permission/doAssign?'
}

// 获取角色分页数据的接口
export const reqAllRoleList = (currentPage: number, pageSize: number, roleName: string) =>
    request.get<any, HasRoleResponseData>(API.ALL_ROLE_URL + `/${currentPage}/${pageSize}?roleName=${roleName}`);
// 新增与更新角色的接口
export const reqAddOrUpdateRole = (data: RoleInfo) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, data);
  }
};
// 根据角色ID获取权限数据
export const reqRoleMenuList = (roleId: number) =>
    request.get<any, PermissionResponseData>(API.ROLE_PERMISSION_URL + `/${roleId}`);
// 给角色分配权限
export const reqSetPermission = (roleId: number, permissionIds: number[]) =>
    request.post<any, any>(API.SET_PERMISSION_URL + `roleId=${roleId}&permissionIds=${permissionIds}`);
