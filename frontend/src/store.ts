import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  ProductDetailState,
  productListReducer,
  ProductListState,
} from "./reducers/productReducers";
import { cartReducer, CartState } from "./reducers/cartReducers";
import { CartItemType } from "./types/CartItemType";

export interface StoreState {
  productListState: ProductListState;
  productDetailState: ProductDetailState;
  cartState: CartState;
}

const reducer = combineReducers<StoreState>({
  productListState: productListReducer,
  productDetailState: productDetailsReducer,
  cartState: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems");
const cartItems: CartItemType[] = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage)
  : [];

const initialState: StoreState = {
  cartState: { cartItems },
  productDetailState: {} as ProductDetailState,
  productListState: {} as ProductListState,
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
