// 全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface UserInfo {
  id?: number;
  username: string;
  nickname: string;
  password: string;
  phone?: string;
  roleName?: string;
  creatTime?: string;
  updateTime?: string;
}

export interface HasUserResponseData extends ResponseData {
  data: {
    records: UserInfo[];
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}

// 角色的类型
export interface RoleData {
  id?: number;
  roleName: string;
  createTime?: string;
  updateTime?: string;
}

export interface AllRoleResponseData extends ResponseData {
  data: {
    // 当前用户的角色
    assignRolesList: RoleData[];
    // 全部角色
    allRolesList: RoleData[];
  };
}

// 分配角色接口参数类型
export interface SetRoleData {
  userId?: number;
  roleIdList: number[];
}
