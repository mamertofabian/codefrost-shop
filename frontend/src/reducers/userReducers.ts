import {
  ActionTypes,
  UserDetailsAction,
  UserLoginAction,
  UserRegisterAction,
} from "../actions";
import { UserType } from "../types/UserType";

export interface UserLoginState {
  loading: Boolean;
  userInfo: UserType;
  error?: string;
}

export const userLoginReducer = (
  state: UserLoginState = { loading: false, userInfo: {} as UserType },
  action: UserLoginAction
): UserLoginState => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_REQUEST:
      return { loading: true, userInfo: action.payload };
    case ActionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        userInfo: {} as UserType,
        error: action.payload,
      };
    case ActionTypes.USER_LOGOUT:
      return { loading: false, userInfo: {} as UserType };
    default:
      return state;
  }
};

export const userRegisterReducer = (
  state: UserLoginState = { loading: false, userInfo: {} as UserType },
  action: UserRegisterAction
): UserLoginState => {
  switch (action.type) {
    case ActionTypes.USER_REGISTER_REQUEST:
      return { loading: true, userInfo: action.payload };
    case ActionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionTypes.USER_REGISTER_FAIL:
      return {
        loading: false,
        userInfo: {} as UserType,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state: UserLoginState = { loading: false, userInfo: {} as UserType },
  action: UserDetailsAction
): UserLoginState => {
  switch (action.type) {
    case ActionTypes.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.USER_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionTypes.USER_DETAILS_FAIL:
      return {
        loading: false,
        userInfo: {} as UserType,
        error: action.payload,
      };
    default:
      return state;
  }
};
