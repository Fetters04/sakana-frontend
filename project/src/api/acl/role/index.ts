import request from '@/utils/request';
import { HasRoleResponseData } from '@/api/acl/role/type';

enum API {
  // 获取角色分页数据
  ALL_ROLE_URL = '/acl/role'
}

// 获取角色分页数据的接口
export const reqAllRoleList = (currentPage: number, pageSize: number, roleName: string) =>
    request.get<any, HasRoleResponseData>(API.ALL_ROLE_URL + `/${currentPage}/${pageSize}?roleName=${roleName}`)
