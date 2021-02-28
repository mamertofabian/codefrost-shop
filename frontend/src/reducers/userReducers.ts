import { ActionTypes, UserLoginAction } from "../actions";
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
