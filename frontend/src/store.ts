import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  ProductDetailState,
  productListReducer,
  ProductListState,
} from "./reducers/productReducers";

export interface StoreState {
  productListState: ProductListState;
  productDetailState: ProductDetailState;
}

const reducer = combineReducers<StoreState>({
  productListState: productListReducer,
  productDetailState: productDetailsReducer,
});
const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
