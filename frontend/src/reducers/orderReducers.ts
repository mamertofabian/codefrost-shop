import {
  ActionTypes,
  OrderCreateAction,
  OrderDetailsAction,
  OrderPayAction,
  UserOrdersAction,
} from "../actions";
import { AddressType } from "../types/AddressType";
import { OrderType } from "../types/OrderType";

export interface OrderCreateState {
  loading: Boolean;
  success?: Boolean;
  order?: OrderType;
  error?: string;
}

export interface OrderDetailsState {
  order: OrderType;
  loading: boolean;
  shippingAddress?: AddressType;
  error?: string;
}

export interface OrderPayState {
  order: OrderType;
  success: boolean;
  loading: boolean;
  error?: string;
}

export interface UserOrdersState {
  orders: OrderType[];
  loading: boolean;
  error?: string;
}

export const orderCreateReducer = (
  state = {} as OrderCreateState,
  action: OrderCreateAction
): OrderCreateState => {
  switch (action.type) {
    case ActionTypes.ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ActionTypes.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ActionTypes.ORDER_CREATE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state = { order: {} as OrderType, loading: false },
  action: OrderDetailsAction
): OrderDetailsState => {
  switch (action.type) {
    case ActionTypes.ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ActionTypes.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        order: {} as OrderType,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state = { order: {} as OrderType, loading: false, success: false },
  action: OrderPayAction
): OrderPayState => {
  switch (action.type) {
    case ActionTypes.ORDER_PAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ActionTypes.ORDER_PAY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.ORDER_PAY_RESET:
      return state;

    default:
      return state;
  }
};

export const userOrdersReducer = (
  state = { orders: [] as OrderType[], loading: false },
  action: UserOrdersAction
): UserOrdersState => {
  switch (action.type) {
    case ActionTypes.USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.USER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ActionTypes.USER_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
