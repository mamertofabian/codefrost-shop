import { ActionTypes, OrderAction } from "../actions";
import { OrderType } from "../types/OrderType";

export interface OrderState {
  loading: Boolean;
  success?: Boolean;
  order?: OrderType;
  error?: string;
}

export const orderCreateReducer = (
  state = {} as OrderState,
  action: OrderAction
): OrderState => {
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
