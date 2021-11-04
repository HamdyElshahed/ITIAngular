export interface Product {
    id : number;
    basicdata: BasicData[];
    price: number;
    discount?: number;
    imgurl: string[];
    paymentmethod: PaymentMethod[];
    category: Category;
    tags: Tags[];
    relatedproducts? : number[];
}


export interface BasicData {
  id?: number;
  name: string;
  description?: string;
  lang:  Lang[];
}

export interface Lang {
  id?: number;
  name: string;
}

export interface PaymentMethod {
  id?: number;
  name: string;
}
export interface Category {
  id?: number;
  name: string;
}

export interface Tags {
  id?: number;
  name: string;
}
