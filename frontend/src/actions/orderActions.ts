import { Dispatch } from "redux";
import axios from "axios";
import { StoreState } from "../store";
import { OrderType } from "../types/OrderType";
import { ActionTypes } from "./types";
import { PaymentResultType } from "../types/PaymentResultType";

export interface OrderCreateRequestAction {
  type: ActionTypes.ORDER_CREATE_REQUEST;
  payload: OrderType;
}
export interface OrderCreateSuccessAction {
  type: ActionTypes.ORDER_CREATE_SUCCESS;
  payload: OrderType;
}
export interface OrderCreateFailAction {
  type: ActionTypes.ORDER_CREATE_FAIL;
  payload: string;
}

export interface OrderDetailsRequestAction {
  type: ActionTypes.ORDER_DETAILS_REQUEST;
}
export interface OrderDetailsSuccessAction {
  type: ActionTypes.ORDER_DETAILS_SUCCESS;
  payload: OrderType;
}
export interface OrderDetailsFailAction {
  type: ActionTypes.ORDER_DETAILS_FAIL;
  payload: string;
}

export interface OrderPayRequestAction {
  type: ActionTypes.ORDER_PAY_REQUEST;
}
export interface OrderPaySuccessAction {
  type: ActionTypes.ORDER_PAY_SUCCESS;
  payload: OrderType;
}
export interface OrderPayFailAction {
  type: ActionTypes.ORDER_PAY_FAIL;
  payload: string;
}
export interface OrderPayResetAction {
  type: ActionTypes.ORDER_PAY_RESET;
}

export interface UserOrdersRequestAction {
  type: ActionTypes.USER_ORDERS_REQUEST;
}
export interface UserOrdersSuccessAction {
  type: ActionTypes.USER_ORDERS_SUCCESS;
  payload: OrderType[];
}
export interface UserOrdersFailAction {
  type: ActionTypes.USER_ORDERS_FAIL;
  payload: string;
}

export const createOrder = (order: OrderType) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<OrderCreateRequestAction>({
      type: ActionTypes.ORDER_CREATE_REQUEST,
      payload: {} as OrderType,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post<OrderType>("/api/orders", order, config);

    dispatch<OrderCreateSuccessAction>({
      type: ActionTypes.ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<OrderCreateFailAction>({
      type: ActionTypes.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id: string) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<OrderDetailsRequestAction>({
      type: ActionTypes.ORDER_DETAILS_REQUEST,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get<OrderType>(`/api/orders/${id}`, config);

    dispatch<OrderDetailsSuccessAction>({
      type: ActionTypes.ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<OrderDetailsFailAction>({
      type: ActionTypes.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (
  id: string,
  paymentResult: PaymentResultType
) => async (dispatch: Dispatch, getState: () => StoreState) => {
  try {
    dispatch<OrderPayRequestAction>({
      type: ActionTypes.ORDER_PAY_REQUEST,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put<OrderType>(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch<OrderPaySuccessAction>({
      type: ActionTypes.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<OrderPayFailAction>({
      type: ActionTypes.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserOrders = () => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<UserOrdersRequestAction>({
      type: ActionTypes.USER_ORDERS_REQUEST,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get<OrderType[]>(
      `/api/orders/userorders`,
      config
    );

    dispatch<UserOrdersSuccessAction>({
      type: ActionTypes.USER_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<UserOrdersFailAction>({
      type: ActionTypes.USER_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
