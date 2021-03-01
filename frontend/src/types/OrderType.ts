import { AddressType } from "./AddressType";
import { CartItemType } from "./CartItemType";
import { CartSummaryType } from "./CartSummaryType";

export interface OrderType {
  _id?: string;
  orderItems: CartItemType[];
  shippingAddress?: AddressType;
  paymentMethod?: string;
  orderSummary: CartSummaryType;
}
