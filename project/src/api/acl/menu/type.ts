export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 菜单与按钮数据类型
export interface Permission {
  id?: number;
  pid: number;
  name: string;
  code: string;
  type: number;
  level: number;
  select: boolean;
  children?: Permission[];
  createTime: string;
  updateTime: string;
}

// 菜单接口返回数据类型
export interface PermissionResponseData extends ResponseData {
  data: Permission[];
}
