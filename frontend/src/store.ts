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
  userDetailsReducer,
  userLoginReducer,
  UserInfoState,
  userRegisterReducer,
  UserUpdateState,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import { UserType } from "./types/UserType";
import { AddressType } from "./types/AddressType";

export interface StoreState {
  productListState: ProductListState;
  productDetailState: ProductDetailState;
  cartState: CartState;
  userLoginState: UserInfoState;
  userRegisterState: UserInfoState;
  userDetailState: UserInfoState;
  userUpdateProfileState: UserUpdateState;
}

const reducer = combineReducers<StoreState>({
  productListState: productListReducer,
  productDetailState: productDetailsReducer,
  cartState: cartReducer,
  userLoginState: userLoginReducer,
  userRegisterState: userRegisterReducer,
  userDetailState: userDetailsReducer,
  userUpdateProfileState: userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems");
const cartItems: CartItemType[] = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage)
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress");
const shippingAddress: AddressType = shippingAddressFromStorage
  ? JSON.parse(shippingAddressFromStorage)
  : {};

let cartStateFromStorage: CartState = { cartItems };
if (shippingAddress && shippingAddress.address) {
  cartStateFromStorage = { ...cartStateFromStorage, shippingAddress };
}

const userInfoFromStorage = localStorage.getItem("userInfo");
const userInfo: UserType = userInfoFromStorage
  ? JSON.parse(userInfoFromStorage)
  : {};

const initialState: StoreState = {
  cartState: cartStateFromStorage,
  productDetailState: {} as ProductDetailState,
  productListState: {} as ProductListState,
  userLoginState: { userInfo, loading: false },
  userRegisterState: {} as UserInfoState,
  userDetailState: {} as UserInfoState,
  userUpdateProfileState: {} as UserUpdateState,
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
