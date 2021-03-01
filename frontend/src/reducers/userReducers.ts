import {
  ActionTypes,
  UserDeleteAction,
  UserDetailsAction,
  UserListAction,
  UserLoginAction,
  UserRegisterAction,
  UserUpdateProfileAction,
} from "../actions";
import { UserType } from "../types/UserType";

export interface UserInfoState {
  loading: Boolean;
  userInfo: UserType;
  error?: string;
}

export interface UserListState {
  loading: Boolean;
  users: UserType[];
  error?: string;
}

export interface UserDeleteState {
  loading: boolean;
  deleted: boolean;
  error?: string;
}

export interface UserUpdateState {
  loading: Boolean;
  success: Boolean;
  userInfo: UserType;
  error?: string;
}

export const userLoginReducer = (
  state: UserInfoState = { loading: false, userInfo: {} as UserType },
  action: UserLoginAction
): UserInfoState => {
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
  state: UserInfoState = { loading: false, userInfo: {} as UserType },
  action: UserRegisterAction
): UserInfoState => {
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
  state: UserInfoState = { loading: false, userInfo: {} as UserType },
  action: UserDetailsAction
): UserInfoState => {
  switch (action.type) {
    case ActionTypes.USER_DETAILS_REQUEST:
      return { loading: true, userInfo: {} as UserType };
    case ActionTypes.USER_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case ActionTypes.USER_DETAILS_FAIL:
      return {
        loading: false,
        userInfo: {} as UserType,
        error: action.payload,
      };
    case ActionTypes.USER_DETAILS_RESET:
      return { loading: false, userInfo: {} as UserType };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state: UserUpdateState = {
    loading: false,
    success: false,
    userInfo: {} as UserType,
  },
  action: UserUpdateProfileAction
): UserUpdateState => {
  switch (action.type) {
    case ActionTypes.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case ActionTypes.USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        success: false,
        userInfo: {} as UserType,
        error: action.payload,
      };
    case ActionTypes.USER_UPDATE_PROFILE_RESET:
      return {
        loading: false,
        success: false,
        userInfo: {} as UserType,
      };
    default:
      return state;
  }
};

export const userListReducer = (
  state: UserListState = { loading: false, users: [] as UserType[] },
  action: UserListAction
): UserListState => {
  switch (action.type) {
    case ActionTypes.USER_LIST_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ActionTypes.USER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ActionTypes.USER_LIST_RESET:
      return { users: [] as UserType[], loading: false };
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state: UserDeleteState = { loading: false, deleted: false },
  action: UserDeleteAction
): UserDeleteState => {
  switch (action.type) {
    case ActionTypes.USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case ActionTypes.USER_DELETE_SUCCESS:
      return { loading: false, deleted: true };
    case ActionTypes.USER_DELETE_FAIL:
      return {
        deleted: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
