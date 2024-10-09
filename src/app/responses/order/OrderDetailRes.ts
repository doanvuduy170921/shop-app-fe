import {ProductDto} from "../../dtos/product/ProductDto";

export interface OrderDetailRes {
  id: number;
  product: ProductDto;
  price: number;
  quantity: number;
  totalMoney: number;
}
