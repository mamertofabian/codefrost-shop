import { Dispatch } from "redux";
import axios from "axios";
import { StoreState } from "../store";
import { OrderType } from "../types/OrderType";
import { ActionTypes } from "./types";

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
