import {
  ActionTypes,
  ProductCreateAction,
  ProductDeleteAction,
  ProductDetailAction,
  ProductListAction,
  ProductReviewAction,
  ProductTopAction,
  ProductUpdateAction,
} from "../actions";
import { ProductListType, ProductType, ReviewType } from "../types/ProductType";

export interface ProductListState {
  loading: Boolean;
  productList: ProductListType;
  error?: string;
}

export interface ProductDetailState {
  loading: Boolean;
  product: ProductType;
  error?: string;
}

export interface ProductCreateState {
  loading?: Boolean;
  created?: Boolean;
  product?: ProductType;
  error?: string;
}

export interface ProductUpdateState {
  loading?: Boolean;
  updated?: Boolean;
  product?: ProductType;
  error?: string;
}

export interface ProductReviewState {
  loading?: Boolean;
  reviewed?: Boolean;
  error?: string;
}

export interface ProductTopState {
  loading: Boolean;
  products: ProductType[];
  error?: string;
}

export interface ProductDeleteState {
  loading: boolean;
  deleted: boolean;
  error?: string;
}

export const productListReducer = (
  state: ProductListState = {
    loading: false,
    productList: {} as ProductListType,
  },
  action: ProductListAction
): ProductListState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_LIST_REQUEST:
      return { loading: true, productList: action.payload };
    case ActionTypes.PRODUCT_LIST_SUCCESS:
      return { loading: false, productList: action.payload };
    case ActionTypes.PRODUCT_LIST_FAIL:
      return {
        loading: false,
        productList: {} as ProductListType,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state: ProductDetailState = {
    loading: false,
    product: { reviews: [] as ReviewType[] } as ProductType,
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
        product: { reviews: [] as ReviewType[] } as ProductType,
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

export const productCreateReducer = (
  state: ProductCreateState = {
    loading: false,
    created: false,
    product: { reviews: [] as ReviewType[] } as ProductType,
  },
  action: ProductCreateAction
): ProductCreateState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, created: true, product: action.payload };
    case ActionTypes.PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        created: false,
        product: {} as ProductType,
        error: action.payload,
      };
    case ActionTypes.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state: ProductUpdateState = {
    loading: false,
    updated: false,
    product: { reviews: [] as ReviewType[] } as ProductType,
  },
  action: ProductUpdateAction
): ProductUpdateState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, updated: true, product: action.payload };
    case ActionTypes.PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        updated: false,
        product: {} as ProductType,
        error: action.payload,
      };
    case ActionTypes.PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (
  state: ProductReviewState = {
    loading: false,
    reviewed: false,
  },
  action: ProductReviewAction
): ProductReviewState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.PRODUCT_REVIEW_SUCCESS:
      return { loading: false, reviewed: true };
    case ActionTypes.PRODUCT_REVIEW_FAIL:
      return {
        loading: false,
        reviewed: false,
        error: action.payload,
      };
    case ActionTypes.PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopReducer = (
  state: ProductTopState = {
    loading: false,
    products: [] as ProductType[],
  },
  action: ProductTopAction
): ProductTopState => {
  switch (action.type) {
    case ActionTypes.PRODUCT_TOP_REQUEST:
      return {
        products: [] as ProductType[],
        loading: true,
      };
    case ActionTypes.PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case ActionTypes.PRODUCT_TOP_FAIL:
      return {
        loading: false,
        products: [] as ProductType[],
        error: action.payload,
      };
    default:
      return state;
  }
};
