// 全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// SPU数据的ts类型
export interface SpuData {
  category3Id: number | string;
  id?: number;
  spuName: string;
  tmId: number | string;
  description: string;
  spuImageList: null | SpuImage[];
  spuSaleAttrList: null | SaleAttr[];
}

// 统一存放SpuData数据
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

// 品牌数据的ts类型
export interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}

// 品牌接口返回数据ts类型
export interface AllTrademark extends ResponseData {
  data: Trademark[];
}

// 商品图片的ts类型
export interface SpuImage {
  id?: number;
  imgName: string;
  imgUrl: string;
  spuId?: number;
  createTime?: string;
  updateTime?: string;
}

// 获取已有SPU照片墙接口返回数据ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImage[];
}

// 已有的SPU的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}

// 销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SaleAttrValue[];
  flag?: boolean;
  saleAttrValue?: string;
}

// 获取某个SPU已有销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

// 获取全部已有的销售属性的ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

// 获取全部销售属性接口返回数据ts类型
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}

// SKU参数平台属性的类型
export interface AttrParams {
  // 平台属性的ID
  attrId: number | string;
  // 属性值的ID
  valueId: number | string;
}

// SKU参数销售属性的类型
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
