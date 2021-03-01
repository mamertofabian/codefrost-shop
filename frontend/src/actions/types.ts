import {
  CartAddAction,
  CartRemoveAction,
  CartSavePaymentMethod,
  CartSaveShippingAddress,
} from "./cartActions";
import {
  FetchProductsRequestAction,
  FetchProductsSuccessAction,
  FetchProductsFailAction,
  FetchProductDetailsRequestAction,
  FetchProductDetailsSuccessAction,
  FetchProductDetailsFailAction,
} from "./productActions";
import {
  UserDetailsFailAction,
  UserDetailsRequestAction,
  UserDetailsResetAction,
  UserDetailsSuccessAction,
  UserLoginFailAction,
  UserLoginRequestAction,
  UserLoginSuccessAction,
  UserLogoutAction,
  UserRegisterFailAction,
  UserRegisterRequestAction,
  UserRegisterSuccessAction,
  UserUpdateProfileRequestAction,
  UserUpdateProfileSuccessAction,
  UserUpdateProfileFailAction,
  UserUpdateProfileResetAction,
} from "./userActions";

export enum ActionTypes {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",
  PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST",
  PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS",
  PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL",
  CART_ADD_ITEM = "CART_ADD_ITEM",
  CART_REMOVE_ITEM = "CART_REMOVE_ITEM",
  USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST",
  USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
  USER_LOGOUT = "USER_LOGOUT",
  USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST",
  USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL = "USER_REGISTER_FAIL",
  USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST",
  USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS",
  USER_DETAILS_FAIL = "USER_DETAILS_FAIL",
  USER_DETAILS_RESET = "USER_DETAILS_RESET",
  USER_UPDATE_PROFILE_REQUEST = "USER_UPDATE_PROFILE_REQUEST",
  USER_UPDATE_PROFILE_SUCCESS = "USER_UPDATE_PROFILE_SUCCESS",
  USER_UPDATE_PROFILE_FAIL = "USER_UPDATE_PROFILE_FAIL",
  USER_UPDATE_PROFILE_RESET = "USER_UPDATE_PROFILE_RESET",
  CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS",
  CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD",
}

export type ProductListAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailAction;

export type ProductDetailAction =
  | FetchProductDetailsRequestAction
  | FetchProductDetailsSuccessAction
  | FetchProductDetailsFailAction;

export type UserRegisterAction =
  | UserRegisterRequestAction
  | UserRegisterSuccessAction
  | UserRegisterFailAction;

export type UserDetailsAction =
  | UserDetailsRequestAction
  | UserDetailsSuccessAction
  | UserDetailsFailAction
  | UserDetailsResetAction;

export type UserUpdateProfileAction =
  | UserUpdateProfileRequestAction
  | UserUpdateProfileSuccessAction
  | UserUpdateProfileFailAction
  | UserUpdateProfileResetAction;

export type UserLoginAction =
  | UserLoginRequestAction
  | UserLoginSuccessAction
  | UserLoginFailAction
  | UserLogoutAction;

export type CartAction =
  | CartAddAction
  | CartRemoveAction
  | CartSaveShippingAddress
  | CartSavePaymentMethod;
