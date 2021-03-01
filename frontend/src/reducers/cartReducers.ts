import { ActionTypes, CartAction } from "../actions/types";
import { AddressType } from "../types/AddressType";
import { CartItemType, CartSummaryType } from "../types/CartItemType";

export interface CartState {
  cartItems: CartItemType[];
  cartSummary: CartSummaryType;
  shippingAddress?: AddressType;
  paymentMethod?: string;
}

export const cartReducer = (
  state: CartState = { cartItems: [], cartSummary: {} as CartSummaryType },
  action: CartAction
): CartState => {
  switch (action.type) {
    case ActionTypes.CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((i) => i.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === existItem.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case ActionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case ActionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case ActionTypes.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
