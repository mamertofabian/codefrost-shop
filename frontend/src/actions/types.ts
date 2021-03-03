import {
  CartAddAction,
  CartRemoveAction,
  CartSavePaymentMethod,
  CartSaveShippingAddress,
} from "./cartActions";
import {
  OrderCreateFailAction,
  OrderCreateRequestAction,
  OrderCreateSuccessAction,
  OrderDetailsFailAction,
  OrderDetailsRequestAction,
  OrderDetailsSuccessAction,
  OrderPayFailAction,
  OrderPayRequestAction,
  OrderPaySuccessAction,
  OrderPayResetAction,
  UserOrdersRequestAction,
  UserOrdersSuccessAction,
  UserOrdersFailAction,
  UserOrdersResetAction,
  OrderListRequestAction,
  OrderListSuccessAction,
  OrderListFailAction,
  OrderDeliverRequestAction,
  OrderDeliverSuccessAction,
  OrderDeliverFailAction,
  OrderDeliverResetAction,
} from "./orderActions";
import {
  FetchProductsRequestAction,
  FetchProductsSuccessAction,
  FetchProductsFailAction,
  FetchProductDetailsRequestAction,
  FetchProductDetailsSuccessAction,
  FetchProductDetailsFailAction,
  ProductDeleteRequestAction,
  ProductDeleteSuccessAction,
  ProductDeleteFailAction,
  ProductCreateResetAction,
  ProductCreateSuccessAction,
  ProductCreateFailAction,
  ProductCreateRequestAction,
  ProductUpdateRequestAction,
  ProductUpdateSuccessAction,
  ProductUpdateFailAction,
  ProductUpdateResetAction,
  ProductReviewRequestAction,
  ProductReviewSuccessAction,
  ProductReviewFailAction,
  ProductReviewResetAction,
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
  UserListRequestAction,
  UserListSuccessAction,
  UserListFailAction,
  UserListResetAction,
  UserDeleteRequestAction,
  UserDeleteSuccessAction,
  UserDeleteFailAction,
  UserUpdateRequestAction,
  UserUpdateSuccessAction,
  UserUpdateFailAction,
  UserUpdateResetAction,
} from "./userActions";

export enum ActionTypes {
  PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST",
  PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS",
  PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL",
  PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST",
  PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS",
  PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL",
  PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST",
  PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS",
  PRODUCT_DELETE_FAIL = "PRODUCT_DELETE_FAIL",
  PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST",
  PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS",
  PRODUCT_CREATE_FAIL = "PRODUCT_CREATE_FAIL",
  PRODUCT_CREATE_RESET = "PRODUCT_CREATE_RESET",
  PRODUCT_UPDATE_REQUEST = "PRODUCT_UPDATE_REQUEST",
  PRODUCT_UPDATE_SUCCESS = "PRODUCT_UPDATE_SUCCESS",
  PRODUCT_UPDATE_FAIL = "PRODUCT_UPDATE_FAIL",
  PRODUCT_UPDATE_RESET = "PRODUCT_UPDATE_RESET",
  PRODUCT_REVIEW_REQUEST = "PRODUCT_REVIEW_REQUEST",
  PRODUCT_REVIEW_SUCCESS = "PRODUCT_REVIEW_SUCCESS",
  PRODUCT_REVIEW_FAIL = "PRODUCT_REVIEW_FAIL",
  PRODUCT_REVIEW_RESET = "PRODUCT_REVIEW_RESET",
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
  USER_LIST_REQUEST = "USER_LIST_REQUEST",
  USER_LIST_SUCCESS = "USER_LIST_SUCCESS",
  USER_LIST_FAIL = "USER_LIST_FAIL",
  USER_LIST_RESET = "USER_LIST_RESET",
  USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST",
  USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS",
  USER_UPDATE_FAIL = "USER_UPDATE_FAIL",
  USER_UPDATE_RESET = "USER_UPDATE_RESET",
  USER_DELETE_REQUEST = "USER_DELETE_REQUEST",
  USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS",
  USER_DELETE_FAIL = "USER_DELETE_FAIL",
  USER_UPDATE_PROFILE_REQUEST = "USER_UPDATE_PROFILE_REQUEST",
  USER_UPDATE_PROFILE_SUCCESS = "USER_UPDATE_PROFILE_SUCCESS",
  USER_UPDATE_PROFILE_FAIL = "USER_UPDATE_PROFILE_FAIL",
  USER_UPDATE_PROFILE_RESET = "USER_UPDATE_PROFILE_RESET",
  CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS",
  CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD",
  ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST",
  ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS",
  ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL",
  ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST",
  ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS",
  ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL",
  ORDER_PAY_REQUEST = "ORDER_PAY_REQUEST",
  ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS",
  ORDER_PAY_FAIL = "ORDER_PAY_FAIL",
  ORDER_PAY_RESET = "ORDER_PAY_RESET",
  ORDER_DELIVER_REQUEST = "ORDER_DELIVER_REQUEST",
  ORDER_DELIVER_SUCCESS = "ORDER_DELIVER_SUCCESS",
  ORDER_DELIVER_FAIL = "ORDER_PAY_FAIL",
  ORDER_DELIVER_RESET = "ORDER_PAY_RESET",
  USER_ORDERS_REQUEST = "USER_ORDERS_REQUEST",
  USER_ORDERS_SUCCESS = "USER_ORDERS_SUCCESS",
  USER_ORDERS_FAIL = "USER_ORDERS_FAIL",
  USER_ORDERS_RESET = "USER_ORDERS_RESET",
  ORDER_LIST_REQUEST = "ORDER_LIST_REQUEST",
  ORDER_LIST_SUCCESS = "ORDER_LIST_SUCCESS",
  ORDER_LIST_FAIL = "ORDER_LIST_FAIL",
}

export type ProductListAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailAction;

export type ProductDetailAction =
  | FetchProductDetailsRequestAction
  | FetchProductDetailsSuccessAction
  | FetchProductDetailsFailAction;

export type ProductDeleteAction =
  | ProductDeleteRequestAction
  | ProductDeleteSuccessAction
  | ProductDeleteFailAction;

export type ProductCreateAction =
  | ProductCreateRequestAction
  | ProductCreateSuccessAction
  | ProductCreateFailAction
  | ProductCreateResetAction;

export type ProductUpdateAction =
  | ProductUpdateRequestAction
  | ProductUpdateSuccessAction
  | ProductUpdateFailAction
  | ProductUpdateResetAction;

export type ProductReviewAction =
  | ProductReviewRequestAction
  | ProductReviewSuccessAction
  | ProductReviewFailAction
  | ProductReviewResetAction;

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

export type OrderCreateAction =
  | OrderCreateRequestAction
  | OrderCreateSuccessAction
  | OrderCreateFailAction;

export type OrderDetailsAction =
  | OrderDetailsRequestAction
  | OrderDetailsSuccessAction
  | OrderDetailsFailAction;

export type OrderPayAction =
  | OrderPayRequestAction
  | OrderPaySuccessAction
  | OrderPayFailAction
  | OrderPayResetAction;

export type OrderDeliverAction =
  | OrderDeliverRequestAction
  | OrderDeliverSuccessAction
  | OrderDeliverFailAction
  | OrderDeliverResetAction;

export type UserOrdersAction =
  | UserOrdersRequestAction
  | UserOrdersSuccessAction
  | UserOrdersFailAction
  | UserOrdersResetAction;

export type OrderListAction =
  | OrderListRequestAction
  | OrderListSuccessAction
  | OrderListFailAction;

export type UserListAction =
  | UserListRequestAction
  | UserListSuccessAction
  | UserListFailAction
  | UserListResetAction;

export type UserUpdateAction =
  | UserUpdateRequestAction
  | UserUpdateSuccessAction
  | UserUpdateFailAction
  | UserUpdateResetAction;

export type UserDeleteAction =
  | UserDeleteRequestAction
  | UserDeleteSuccessAction
  | UserDeleteFailAction;
