import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails } from "../actions/userActions";
import { StoreState } from "../store";
import { UserLoginState } from "../reducers/userReducers";

const ProfileScreen = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetailState = useSelector<StoreState, UserLoginState>(
    (state) => state.userDetailState
  );
  const { userInfo, loading, error } = userDetailState;

  const userLoginState = useSelector<StoreState, UserLoginState>(
    (state) => state.userLoginState
  );
  const { userInfo: userLoginInfo } = userLoginState;

  useEffect(() => {
    if (userLoginInfo && userLoginInfo.email) {
      if (userInfo && userInfo.name) {
        setName(userInfo.name);
        setEmail(userInfo.email);
      } else {
        dispatch(getUserDetails("profile"));
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, userLoginInfo]);

  const submitHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      // DISPATCH UPDATE PROFILE
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message ? (
          <Message variant="danger">
            <span>{message}</span>
          </Message>
        ) : (
          <span></span>
        )}
        {error ? (
          <Message variant="danger">
            <span>{error}</span>
          </Message>
        ) : (
          <span></span>
        )}
        {loading && <Loader />}
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
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfileScreen;
