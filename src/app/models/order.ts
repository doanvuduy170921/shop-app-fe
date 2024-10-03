import {OrderDetail} from "./orderDetail";

export interface Order {
  address: string;
  totalMoney: number;
  shippingMethod: string;
  shippingAddress: string;
  shippingDate: Date;  // Định dạng yyyy-MM-dd
  paymentMethod: string;
  orderDetails?: OrderDetail[];
}
