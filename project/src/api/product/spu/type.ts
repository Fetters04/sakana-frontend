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

// 获取已有的SPU接口返回数据的ts类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: SpuData[];
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
  id: number;
  spuId: number;
  imgName: string;
  imgUrl: string;
  createTime: string;
  updateTime: string;
}

// 获取已有SPU照片墙接口返回数据ts类型
export interface SpuHasImg extends ResponseData {
  data: SpuImage[];
}

// 已有的SPU的销售属性值对象ts类型
export interface SaleAttrValue {
  id?: number;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName: string;
  isChecked: null;
}

// 销售属性对象ts类型
export interface SaleAttr {
  id?: number;
  spuId: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SaleAttrValue[];
}

// SPU已有销售属性接口返回数据ts类型
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}

// 获取已有的销售属性的ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

// 获取全部销售属性接口返回数据ts类型
export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
}
