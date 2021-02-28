import axios from "axios";
import { ActionTypes } from "./types";
import { UserType } from "../types/UserType";
import { Dispatch } from "redux";

export interface UserLoginRequestAction {
  type: ActionTypes.USER_LOGIN_REQUEST;
  payload: UserType;
}
export interface UserLoginSuccessAction {
  type: ActionTypes.USER_LOGIN_SUCCESS;
  payload: UserType;
}
export interface UserLoginFailAction {
  type: ActionTypes.USER_LOGIN_FAIL;
  payload: string;
}
export interface UserLogoutAction {
  type: ActionTypes.USER_LOGOUT;
}

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch<UserLoginRequestAction>({
      type: ActionTypes.USER_LOGIN_REQUEST,
      payload: {} as UserType,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post<UserType>(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch<UserLoginSuccessAction>({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch<UserLoginFailAction>({
      type: ActionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch<UserLogoutAction>({ type: ActionTypes.USER_LOGOUT });
};
