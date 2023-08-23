export interface IDimension {
  w: number;
  h: number;
}

export interface IImage {
  url: string;
  label: string;
  dimensions: IDimension;
}

export interface IPrice {
  id: string;
  value: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  country: string;
}

export interface ITaxedPrice {
  totalNet: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  totalGross: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  totalTax: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

export interface IDiscount {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: string;
}

export interface IProduct {
  productKey: string;
  name: string;
  productUrl: string;
  images: IImage[];
  price: IPrice;
  quantity: number;
  taxedPrice: ITaxedPrice;
  inStock: boolean;
  totalDiscount?: IDiscount;
  totalPrice?: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

export interface IProductsResponse {
  products: IProduct[];
}
