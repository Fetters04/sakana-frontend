// 全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// SKU平台属性的类型
export interface AttrParams {
  // 平台属性的ID
  attrId: number | string;
  // 属性值的ID
  valueId: number | string;
}

// SKU销售属性的类型
export interface SaleAttrParams {
  // 平台属性的ID
  saleAttrId: number | string;
  // 属性值的ID
  saleAttrValueId: number | string;
}

// SKU的数据类型
export interface SkuData {
  category3Id: number | string;
  spuId: number | string;
  tmId: number | string;
  skuName: string;
  price: number | string;
  weight: number | string;
  skuDesc: string;
  // 平台属性
  skuAttrValueList?: AttrParams[];
  // 销售属性
  skuSaleAttrValueList?: SaleAttrParams[];
  // sku默认图片地址
  skuDefaultImg: string;
}

// 获取SKU分页数据接口返回数据ts类型
export interface HasSkuResponseData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}
