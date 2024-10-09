import { OrderDetailRes } from "../../responses/order/OrderDetailRes";

export interface OrderDto {
  orderCode: string;
  address: string;
  totalMoney: number;
  shippingMethod: string;
  shippingAddress: string;
  shippingDate: Date;
  orderDate:Date;
  paymentMethod: string;
  orderDetails: OrderDetailRes[];
}
