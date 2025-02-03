// 分类相关数据ts类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
  createTime: Date;
  updateTime: Date;
}

export interface CategoryObj {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}

// 相应分类接口返回数据的类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}
