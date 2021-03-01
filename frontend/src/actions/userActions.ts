import axios from "axios";
import { ActionTypes } from "./types";
import { UserType } from "../types/UserType";
import { Dispatch } from "redux";
import { StoreState } from "../store";
import { UserOrdersResetAction } from "./orderActions";

export interface UserRegisterRequestAction {
  type: ActionTypes.USER_REGISTER_REQUEST;
  payload: UserType;
}
export interface UserRegisterSuccessAction {
  type: ActionTypes.USER_REGISTER_SUCCESS;
  payload: UserType;
}
export interface UserRegisterFailAction {
  type: ActionTypes.USER_REGISTER_FAIL;
  payload: string;
}

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

export interface UserDetailsRequestAction {
  type: ActionTypes.USER_DETAILS_REQUEST;
  payload: UserType;
}
export interface UserDetailsSuccessAction {
  type: ActionTypes.USER_DETAILS_SUCCESS;
  payload: UserType;
}
export interface UserDetailsFailAction {
  type: ActionTypes.USER_DETAILS_FAIL;
  payload: string;
}
export interface UserDetailsResetAction {
  type: ActionTypes.USER_DETAILS_RESET;
}

export interface UserListRequestAction {
  type: ActionTypes.USER_LIST_REQUEST;
}
export interface UserListSuccessAction {
  type: ActionTypes.USER_LIST_SUCCESS;
  payload: UserType[];
}
export interface UserListFailAction {
  type: ActionTypes.USER_LIST_FAIL;
  payload: string;
}
export interface UserListResetAction {
  type: ActionTypes.USER_LIST_RESET;
}

export interface UserDeleteRequestAction {
  type: ActionTypes.USER_DELETE_REQUEST;
}
export interface UserDeleteSuccessAction {
  type: ActionTypes.USER_DELETE_SUCCESS;
}
export interface UserDeleteFailAction {
  type: ActionTypes.USER_DELETE_FAIL;
  payload: string;
}

export interface UserUpdateProfileRequestAction {
  type: ActionTypes.USER_UPDATE_PROFILE_REQUEST;
  payload: UserType;
}
export interface UserUpdateProfileSuccessAction {
  type: ActionTypes.USER_UPDATE_PROFILE_SUCCESS;
  payload: UserType;
}
export interface UserUpdateProfileFailAction {
  type: ActionTypes.USER_UPDATE_PROFILE_FAIL;
  payload: string;
}
export interface UserUpdateProfileResetAction {
  type: ActionTypes.USER_UPDATE_PROFILE_RESET;
}

export const register = (
  name: string,
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  try {
    dispatch<UserRegisterRequestAction>({
      type: ActionTypes.USER_REGISTER_REQUEST,
      payload: {} as UserType,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post<UserType>(
      "/api/users",
      { name, email, password },
      config
    );

    dispatch<UserRegisterSuccessAction>({
      type: ActionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch<UserLoginSuccessAction>({
      type: ActionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch<UserRegisterFailAction>({
      type: ActionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

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

export const getUserDetails = (id: string) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<UserDetailsRequestAction>({
      type: ActionTypes.USER_DETAILS_REQUEST,
      payload: {} as UserType,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get<UserType>(`/api/users/${id}`, config);

    dispatch<UserDetailsSuccessAction>({
      type: ActionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });

    // dispatch<UserUpdateProfileResetAction>({
    //   type: ActionTypes.USER_UPDATE_PROFILE_RESET,
    // });
  } catch (error) {
    dispatch<UserDetailsFailAction>({
      type: ActionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user: UserType) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<UserUpdateProfileRequestAction>({
      type: ActionTypes.USER_UPDATE_PROFILE_REQUEST,
      payload: {} as UserType,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put<UserType>(
      "/api/users/profile",
      user,
      config
    );

    dispatch<UserUpdateProfileSuccessAction>({
      type: ActionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch<UserDetailsResetAction>({
      type: ActionTypes.USER_DETAILS_RESET,
    });
  } catch (error) {
    dispatch<UserUpdateProfileFailAction>({
      type: ActionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsers = () => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<UserListRequestAction>({
      type: ActionTypes.USER_LIST_REQUEST,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get<UserType[]>("/api/users", config);

    dispatch<UserListSuccessAction>({
      type: ActionTypes.USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch<UserListFailAction>({
      type: ActionTypes.USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (userId: string) => async (
  dispatch: Dispatch,
  getState: () => StoreState
) => {
  try {
    dispatch<UserDeleteRequestAction>({
      type: ActionTypes.USER_DELETE_REQUEST,
    });

    const { userInfo } = getState().userLoginState;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${userId}`, config);

    dispatch<UserDeleteSuccessAction>({
      type: ActionTypes.USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch<UserDeleteFailAction>({
      type: ActionTypes.USER_DELETE_FAIL,
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
  dispatch<UserDetailsResetAction>({ type: ActionTypes.USER_DETAILS_RESET });
  dispatch<UserOrdersResetAction>({ type: ActionTypes.USER_ORDERS_RESET });
  dispatch<UserListResetAction>({ type: ActionTypes.USER_LIST_RESET });
};
