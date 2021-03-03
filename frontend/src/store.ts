import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDeleteReducer,
  ProductDeleteState,
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
  UserListState,
  userListReducer,
  userDeleteReducer,
  UserDeleteState,
  userUpdateReducer,
} from "./reducers/userReducers";
import { UserType } from "./types/UserType";
import { AddressType } from "./types/AddressType";
import {
  orderCreateReducer,
  OrderCreateState,
  orderDetailReducer,
  OrderDetailsState,
  orderPayReducer,
  OrderPayState,
  userOrdersReducer,
  UserOrdersState,
} from "./reducers/orderReducers";

export interface StoreState {
  productListState: ProductListState;
  productDetailState: ProductDetailState;
  productDeleteState: ProductDeleteState;
  cartState: CartState;
  userLoginState: UserInfoState;
  userRegisterState: UserInfoState;
  userDetailState: UserInfoState;
  userListState: UserListState;
  userUpdateState: UserUpdateState;
  userDeleteState: UserDeleteState;
  userUpdateProfileState: UserUpdateState;
  orderCreateState: OrderCreateState;
  orderDetailState: OrderDetailsState;
  orderPayState: OrderPayState;
  userOrdersState: UserOrdersState;
}

const reducer = combineReducers<StoreState>({
  productListState: productListReducer,
  productDetailState: productDetailsReducer,
  productDeleteState: productDeleteReducer,
  cartState: cartReducer,
  userLoginState: userLoginReducer,
  userRegisterState: userRegisterReducer,
  userDetailState: userDetailsReducer,
  userListState: userListReducer,
  userUpdateState: userUpdateReducer,
  userDeleteState: userDeleteReducer,
  userUpdateProfileState: userUpdateProfileReducer,
  orderCreateState: orderCreateReducer,
  orderDetailState: orderDetailReducer,
  orderPayState: orderPayReducer,
  userOrdersState: userOrdersReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems");
const cartItems: CartItemType[] = cartItemsFromStorage
  ? JSON.parse(cartItemsFromStorage)
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress");
const shippingAddress: AddressType = shippingAddressFromStorage
  ? JSON.parse(shippingAddressFromStorage)
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod");
const paymentMethod: string = paymentMethodFromStorage
  ? JSON.parse(paymentMethodFromStorage)
  : "";

let cartStateFromStorage: CartState = {
  cartItems,
  paymentMethod,
};
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
  productDeleteState: {} as ProductDeleteState,
  userLoginState: { userInfo, loading: false },
  userRegisterState: {} as UserInfoState,
  userDetailState: {} as UserInfoState,
  userListState: {} as UserListState,
  userUpdateState: {} as UserUpdateState,
  userDeleteState: {} as UserDeleteState,
  userUpdateProfileState: {} as UserUpdateState,
  orderCreateState: {} as OrderCreateState,
  orderDetailState: {} as OrderDetailsState,
  orderPayState: {} as OrderPayState,
  userOrdersState: {} as UserOrdersState,
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
