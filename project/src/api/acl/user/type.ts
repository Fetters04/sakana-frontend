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
