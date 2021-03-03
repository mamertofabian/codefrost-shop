import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  ProductCreateState,
  productDeleteReducer,
  ProductDeleteState,
  productDetailsReducer,
  ProductDetailState,
  productListReducer,
  ProductListState,
  productUpdateReducer,
  ProductUpdateState,
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
  orderDeliverReducer,
  OrderDeliverState,
  orderDetailReducer,
  OrderDetailsState,
  orderListReducer,
  orderPayReducer,
  OrderPayState,
  userOrdersReducer,
  UserOrdersState,
} from "./reducers/orderReducers";

export interface StoreState {
  productListState: ProductListState;
  productDetailState: ProductDetailState;
  productCreateState: ProductCreateState;
  productUpdateState: ProductUpdateState;
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
  orderDeliverState: OrderDeliverState;
  userOrdersState: UserOrdersState;
  orderListState: UserOrdersState;
}

const reducer = combineReducers<StoreState>({
  productListState: productListReducer,
  productDetailState: productDetailsReducer,
  productCreateState: productCreateReducer,
  productUpdateState: productUpdateReducer,
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
  orderDeliverState: orderDeliverReducer,
  userOrdersState: userOrdersReducer,
  orderListState: orderListReducer,
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
  productListState: {} as ProductListState,
  productDetailState: {} as ProductDetailState,
  productCreateState: {} as ProductCreateState,
  productUpdateState: {} as ProductUpdateState,
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
  orderDeliverState: {} as OrderDeliverState,
  userOrdersState: {} as UserOrdersState,
  orderListState: {} as UserOrdersState,
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
