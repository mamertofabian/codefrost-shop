import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { ProductListType, ProductType, ReviewType } from "../types/ProductType";
import { StoreState } from "../store";

export interface FetchProductsRequestAction {
  type: ActionTypes.PRODUCT_LIST_REQUEST;
  payload: ProductListType;
}
export interface FetchProductsSuccessAction {
  type: ActionTypes.PRODUCT_LIST_SUCCESS;
  payload: ProductListType;
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

export interface ProductDeleteRequestAction {
  type: ActionTypes.PRODUCT_DELETE_REQUEST;
}
export interface ProductDeleteSuccessAction {
  type: ActionTypes.PRODUCT_DELETE_SUCCESS;
}
export interface ProductDeleteFailAction {
  type: ActionTypes.PRODUCT_DELETE_FAIL;
  payload: string;
}

export interface ProductCreateRequestAction {
  type: ActionTypes.PRODUCT_CREATE_REQUEST;
}
export interface ProductCreateSuccessAction {
  type: ActionTypes.PRODUCT_CREATE_SUCCESS;
  payload: ProductType;
}
export interface ProductCreateFailAction {
  type: ActionTypes.PRODUCT_CREATE_FAIL;
  payload: string;
}
export interface ProductCreateResetAction {
  type: ActionTypes.PRODUCT_CREATE_RESET;
}

export interface ProductUpdateRequestAction {
  type: ActionTypes.PRODUCT_UPDATE_REQUEST;
}
export interface ProductUpdateSuccessAction {
  type: ActionTypes.PRODUCT_UPDATE_SUCCESS;
  payload: ProductType;
}
export interface ProductUpdateFailAction {
  type: ActionTypes.PRODUCT_UPDATE_FAIL;
  payload: string;
}
export interface ProductUpdateResetAction {
  type: ActionTypes.PRODUCT_UPDATE_RESET;
}

export interface ProductReviewRequestAction {
  type: ActionTypes.PRODUCT_REVIEW_REQUEST;
}
export interface ProductReviewSuccessAction {
  type: ActionTypes.PRODUCT_REVIEW_SUCCESS;
}
export interface ProductReviewFailAction {
  type: ActionTypes.PRODUCT_REVIEW_FAIL;
  payload: string;
}
export interface ProductReviewResetAction {
  type: ActionTypes.PRODUCT_REVIEW_RESET;
}

export const listProducts = (
  keyword: string = "",
  pageNumber: string = ""
) => async (dispatch: Dispatch) => {
  try {
    dispatch<FetchProductsRequestAction>({
      type: ActionTypes.PRODUCT_LIST_REQUEST,
      payload: {} as ProductListType,
    });

    const { data } = await axios.get<ProductListType>(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );

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

export const deleteProduct = (productId: string) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<ProductDeleteRequestAction>({
      type: ActionTypes.PRODUCT_DELETE_REQUEST,
    });

    const { userInfo } = getState().userLoginState;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${productId}`, config);

    dispatch<ProductDeleteSuccessAction>({
      type: ActionTypes.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch<ProductDeleteFailAction>({
      type: ActionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<ProductCreateRequestAction>({
      type: ActionTypes.PRODUCT_CREATE_REQUEST,
    });

    const { userInfo } = getState().userLoginState;
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post<ProductType>(`/api/products`, {}, config);

    dispatch<ProductCreateSuccessAction>({
      type: ActionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<ProductCreateFailAction>({
      type: ActionTypes.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product: ProductType) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<ProductUpdateRequestAction>({
      type: ActionTypes.PRODUCT_UPDATE_REQUEST,
    });

    const { userInfo } = getState().userLoginState;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put<ProductType>(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch<ProductUpdateSuccessAction>({
      type: ActionTypes.PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<ProductUpdateFailAction>({
      type: ActionTypes.PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview = (
  productId: string,
  review: ReviewType
) => async (dispatch: Dispatch, getState: () => StoreState) => {
  try {
    dispatch<ProductReviewRequestAction>({
      type: ActionTypes.PRODUCT_REVIEW_REQUEST,
    });

    const { userInfo } = getState().userLoginState;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`/api/products/${productId}/reviews`, review, config);

    dispatch<ProductReviewSuccessAction>({
      type: ActionTypes.PRODUCT_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch<ProductReviewFailAction>({
      type: ActionTypes.PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
