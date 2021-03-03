import React, { useState, useEffect, Fragment } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { StoreState } from "../store";
import { UserInfoState, UserUpdateState } from "../reducers/userReducers";
import { ActionTypes } from "../actions";

interface MatchParams {
  id: string;
}

const UserEditScreen = ({
  match,
  history,
}: RouteComponentProps<MatchParams>) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetailState = useSelector<StoreState, UserInfoState>(
    (state) => state.userDetailState
  );
  const { userInfo, loading, error } = userDetailState;

  const userUpdateState = useSelector<StoreState, UserUpdateState>(
    (state) => state.userUpdateState
  );
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdateState;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ActionTypes.USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (userInfo && userInfo.name && userInfo._id === userId) {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setIsAdmin(userInfo.isAdmin);
      } else if (!loading) {
        dispatch(getUserDetails(userId));
      }
    }
  }, [dispatch, history, userId, userInfo, loading, successUpdate]);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({ _id: userId, name, email, isAdmin, password: "", token: "" })
    );
  };

  return (
    <Fragment>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate ? (
          <Message variant="danger">{errorUpdate}</Message>
        ) : (
          <span></span>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;
