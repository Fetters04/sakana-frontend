import request from '@/utils/request';
import { PermissionResponseData } from '@/api/acl/menu/type';

enum API {
  // 获取全部菜单与按钮的标识数据
  ALL_PERMISSION_URL = '/acl/permission'
}

// 获取菜单数据
export const reqAllPermission = () =>
    request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL);
