import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { ProductType } from "../types/ProductType";

export interface FetchProductsRequestAction {
  type: ActionTypes.PRODUCT_LIST_REQUEST;
  payload: ProductType[];
}
export interface FetchProductsSuccessAction {
  type: ActionTypes.PRODUCT_LIST_SUCCESS;
  payload: ProductType[];
}
export interface FetchProductsFailAction {
  type: ActionTypes.PRODUCT_LIST_FAIL;
  payload: string;
}
export interface FetchProductDetailsRequestAction {
  type: ActionTypes.PRODUCT_DETAILS_REQUEST;
  payload: ProductType;
}
export interface FetchProductDetailsSuccessAction {
  type: ActionTypes.PRODUCT_DETAILS_SUCCESS;
  payload: ProductType;
}
export interface FetchProductDetailsFailAction {
  type: ActionTypes.PRODUCT_DETAILS_FAIL;
  payload: string;
}

export const listProducts = () => async (dispatch: Dispatch) => {
  try {
    dispatch<FetchProductsRequestAction>({
      type: ActionTypes.PRODUCT_LIST_REQUEST,
      payload: [],
    });

    const { data } = await axios.get<ProductType[]>("/api/products");

    dispatch<FetchProductsSuccessAction>({
      type: ActionTypes.PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<FetchProductsFailAction>({
      type: ActionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<FetchProductDetailsRequestAction>({
      type: ActionTypes.PRODUCT_DETAILS_REQUEST,
      payload: {} as ProductType,
    });

    const { data } = await axios.get<ProductType>(`/api/products/${id}`);

    dispatch<FetchProductDetailsSuccessAction>({
      type: ActionTypes.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<FetchProductDetailsFailAction>({
      type: ActionTypes.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
