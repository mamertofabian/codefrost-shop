export interface CartItemType {
  _id: string;
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface CartSummaryType {
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}
