import React, { useEffect, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteUser, getUsers } from "../actions/userActions";
import { StoreState } from "../store";
import {
  UserDeleteState,
  UserInfoState,
  UserListState,
} from "../reducers/userReducers";

const UserListScreen = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const userListState = useSelector<StoreState, UserListState>(
    (state) => state.userListState
  );
  const { users, loading, error } = userListState;

  const userLoginState = useSelector<StoreState, UserInfoState>(
    (state) => state.userLoginState
  );
  const { userInfo } = userLoginState;

  const userDeleteState = useSelector<StoreState, UserDeleteState>(
    (state) => state.userDeleteState
  );
  const { deleted } = userDeleteState;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, deleted, userInfo]);

  const deleteHandler = (userId: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <Fragment>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default UserListScreen;
