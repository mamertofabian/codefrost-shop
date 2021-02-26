import { ActionTypes } from "../actions/types";
import { ProductType, Reviews } from "../types/ProductType";
import {
  FetchProductsRequestAction,
  FetchProductsSuccessAction,
  FetchProductsFailAction,
  FetchProductDetailsRequestAction,
  FetchProductDetailsSuccessAction,
  FetchProductDetailsFailAction,
} from "../actions/productActions";

export interface ProductListState {
  loading: Boolean;
  products: ProductType[];
  error?: string;
}

export interface ProductDetailState {
  loading: Boolean;
  product: ProductType;
  error?: string;
}

export const productListReducer = (
  state: ProductListState = { loading: false, products: [] },
  action:
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailAction
): ProductListState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, products: action.payload };
    case ActionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case ActionTypes.PRODUCT_LIST_FAIL:
      return { loading: false, products: [], error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state: ProductDetailState = {
    loading: false,
    product: { reviews: [] as Reviews[] } as ProductType,
  },
  action:
    | FetchProductDetailsRequestAction
    | FetchProductDetailsSuccessAction
    | FetchProductDetailsFailAction
): ProductDetailState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        product: state.product,
      };
    case ActionTypes.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case ActionTypes.PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        product: { reviews: [] as Reviews[] } as ProductType,
        error: action.payload,
      };
    default:
      return state;
  }
};
