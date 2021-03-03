import {
  ActionTypes,
  ProductDeleteAction,
  ProductDetailAction,
  ProductListAction,
} from "../actions";
import { ProductType, Reviews } from "../types/ProductType";

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

export interface ProductDeleteState {
  loading: boolean;
  deleted: boolean;
  error?: string;
}

export const productListReducer = (
  state: ProductListState = { loading: false, products: [] },
  action: ProductListAction
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
  action: ProductDetailAction
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

export const productDeleteReducer = (
  state: ProductDeleteState = {
    loading: false,
    deleted: false,
  },
  action: ProductDeleteAction
): ProductDeleteState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, deleted: true };
    case ActionTypes.PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        deleted: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
