import {OrderDetailRes} from "../responses/order/OrderDetailRes";

export interface OrderReq {
  address: string;
  totalMoney: number;
  shippingMethod: string;
  shippingAddress: string;
  shippingDate: Date;
  paymentMethod: string;
}
