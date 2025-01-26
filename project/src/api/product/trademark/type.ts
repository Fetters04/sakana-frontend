export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 已有品牌的数据类型
export interface Trademark {
  id?: number;
  tmName: string;
  logoUrl: string;
}

// 包含全部品牌的数据类型
export type Records = Trademark[];

// 接口获取的已有全部品牌的数据类型
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}
