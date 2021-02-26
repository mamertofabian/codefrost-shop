import { ActionTypes } from "../actions/types";
import { ProductType } from "../types/ProductType";
import {
  FetchProductsRequestAction,
  FetchProductsSuccessAction,
  FetchProductsFailAction,
} from "../actions/productActions";

export interface ProductState {
  loading: Boolean;
  products?: ProductType[];
  error?: string;
}

export const productListReducer = (
  state: ProductState = { loading: false, products: [] },
  action:
    | FetchProductsRequestAction
    | FetchProductsSuccessAction
    | FetchProductsFailAction
) => {
  switch (action.type) {
    case ActionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, products: action.payload };
    case ActionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case ActionTypes.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
