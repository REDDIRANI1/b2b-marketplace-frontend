export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Manufacturer {
  id: number;
  name: string;
  category: string;
  city: string;
  products: Product[];
}
