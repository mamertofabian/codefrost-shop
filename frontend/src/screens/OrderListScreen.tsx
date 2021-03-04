import React, { useEffect, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";
import { StoreState } from "../store";
import { UserInfoState } from "../reducers/userReducers";
import { UserOrdersState } from "../reducers/orderReducers";

const OrderListScreen = ({ history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const orderListState = useSelector<StoreState, UserOrdersState>(
    (state) => state.orderListState
  );
  const { orders, loading, error } = orderListState;

  const userLoginState = useSelector<StoreState, UserInfoState>(
    (state) => state.userLoginState
  );
  const { userInfo } = userLoginState;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Fragment>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt?.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default OrderListScreen;