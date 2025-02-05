// 全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// SPU数据的ts类型
export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number;
  spuSaleAttrList: null;
  spuImageList: null;
}

// 统一存放SPU数据
export type Records = SpuData[];

// 获取已有的SPU接口返回数据的ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}
