import { UserInfo } from '@/api/acl/user/type';

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface RoleInfo {
  id?: number;
  roleName: string;
  createTime: string;
  updateTime: string;
}

export interface HasRoleResponseData extends ResponseData {
  data: {
    records: RoleInfo[];
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}
