// 全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// SKU平台属性的类型
export interface AttrParams {
  id?: number;
  // 平台属性的ID
  attrId: number | string;
  // 属性值的ID
  valueId: number | string;
  // 平台属性名称
  attrName?: string;
  // 属性值名称
  attrValueName?: string;
}

// SKU销售属性的类型
export interface SaleAttrParams {
  id?: number;
  // 销售属性的ID
  saleAttrId: number | string;
  // 销售属性值的ID
  saleAttrValueId: number | string;
  // 销售属性名称
  saleAttrName?: string;
  // 销售属性值名称
  saleAttrValueName?: string;
}

// SKU的数据类型
export interface SkuData {
  id?: number;
  category3Id: number | string;
  spuId: number | string;
  tmId: number | string;
  skuName: string;
  price: number | string;
  weight: number | string;
  skuDesc: string;
  // 平台属性
  skuAttrValueList?: AttrParams[];
  skuInfoAttrValueVO?: AttrParams[];
  // 销售属性
  skuSaleAttrValueList?: SaleAttrParams[];
  skuInfoSaleAttrValueVO?: SaleAttrParams[];
  // sku默认图片地址
  skuDefaultImg: string;
  // 控制商品上架与下架
  isSale?: number;
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

// 获取SKU详情接口返回数据ts类型
export interface SkuInfoResponseData extends ResponseData {
  data: SkuData;
}
