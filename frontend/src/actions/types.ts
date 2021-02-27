import { CartAddAction, CartRemoveAction } from "./cartActions";
import {
  FetchProductsRequestAction,
  FetchProductsSuccessAction,
  FetchProductsFailAction,
  FetchProductDetailsRequestAction,
  FetchProductDetailsSuccessAction,
  FetchProductDetailsFailAction,
} from "./productActions";

export enum ActionTypes {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",
  PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST",
  PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS",
  PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL",
  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
}

export type ProductListAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailAction;

export type ProductDetailAction =
  | FetchProductDetailsRequestAction
  | FetchProductDetailsSuccessAction
  | FetchProductDetailsFailAction;

export type CartAction = CartAddAction | CartRemoveAction;
