import { ActionTypes, OrderCreateAction, OrderDetailsAction } from "../actions";
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
