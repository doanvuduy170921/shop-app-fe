import {Product} from "./product";

export interface OrderDetail {
  quantity: number;
  price: number;
  totalMoney: number;
  product: Product;
}
