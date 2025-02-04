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

// 属性值对象类型
export interface AttrValue {
  id?: number;
  valueName: string;
  attrId?: number;
}

// 属性对象
export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValue[];
}

// 属性接口返回的数据类型
export interface AttrResponseData extends ResponseData {
  data: Attr[];
}
