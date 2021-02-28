import axios from "axios";
import { Dispatch } from "redux";
import { StoreState } from "../store";
import { CartItemType } from "../types/CartItemType";
import { ActionTypes } from "./types";

export interface CartAddAction {
  type: ActionTypes.CART_ADD_ITEM;
  payload: CartItemType;
}

export interface CartRemoveAction {
  type: ActionTypes.CART_REMOVE_ITEM;
  payload: string;
}

export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  const { data } = await axios.get<CartItemType>(`/api/products/${id}`);

  dispatch<CartAddAction>({
    type: ActionTypes.CART_ADD_ITEM,
    payload: { ...data, product: data._id, qty },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
};

export const removeFromCart = (id: string) => (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  dispatch<CartRemoveAction>({
    type: ActionTypes.CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
};