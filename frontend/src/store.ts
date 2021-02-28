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
import {
  userLoginReducer,
  UserLoginState,
  userRegisterReducer,
} from "./reducers/userReducers";
import { UserType } from "./types/UserType";

export interface StoreState {
  productListState: ProductListState;
  productDetailState: ProductDetailState;
  cartState: CartState;
  userLoginState: UserLoginState;
  userRegisterState: UserLoginState;
}

const reducer = combineReducers<StoreState>({
  productListState: productListReducer,
  productDetailState: productDetailsReducer,
  cartState: cartReducer,
  userLoginState: userLoginReducer,
  userRegisterState: userRegisterReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems");
const cartItems: CartItemType[] = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage)
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo");
const userInfo: UserType = userInfoFromStorage
  ? JSON.parse(userInfoFromStorage)
  : {};

const initialState: StoreState = {
  cartState: { cartItems },
  productDetailState: {} as ProductDetailState,
  productListState: {} as ProductListState,
  userLoginState: { userInfo, loading: false },
  userRegisterState: {} as UserLoginState,
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
