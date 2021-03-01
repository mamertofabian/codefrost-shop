import { AddressType } from "./AddressType";
import { CartItemType } from "./CartItemType";

export interface OrderType {
  _id?: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: CartItemType[];
  shippingAddress?: AddressType;
  paymentMethod?: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  isPaid?: boolean;
  paidAt?: Date;
  isDelivered?: boolean;
  deliveredAt?: Date;
}
