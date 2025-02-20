// 用户管理模块接口
import request from '@/utils/request';
import { HasUserResponseData } from '@/api/acl/user/type';

enum API {
  // 获取用户账号分页信息
  USER_URL = '/acl/user'
}

// 获取用户账号分页信息的接口
export const reqUserInfo = (currentPage: number, pageSize: number) =>
    request.get<any, HasUserResponseData>(API.USER_URL + `/${currentPage}/${pageSize}`);
