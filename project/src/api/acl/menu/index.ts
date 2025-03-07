import request from '@/utils/request';
import { MenuParams, PermissionResponseData } from '@/api/acl/menu/type';

enum API {
  // 获取全部菜单与按钮的标识数据
  ALL_PERMISSION_URL = '/acl/permission',
  // 给某一级菜单新增子菜单
  ADD_MENU_URL = '/acl/permission/save',
  // 更新菜单
  UPDATE_MENU_URL = '/acl/permission/update',
}

// 获取菜单数据
export const reqAllPermission = () =>
    request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL);
// 新增或更新菜单
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_MENU_URL, data);
  } else {
    return request.post<any, any>(API.ADD_MENU_URL, data);
  }
};
