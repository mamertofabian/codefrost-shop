import { ActionTypes, CartAction } from "../actions/types";
import { AddressType } from "../types/AddressType";
import { CartItemType } from "../types/CartItemType";

export interface CartState {
  cartItems: CartItemType[];
  shippingAddress?: AddressType;
}

export const cartReducer = (
  state: CartState = { cartItems: [] },
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

    default:
      return state;
  }
};
