import React, { Fragment, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { StoreState } from "../store";
import { getOrderDetails } from "../actions/orderActions";
import { OrderDetailsState } from "../reducers/orderReducers";
import Loader from "../components/Loader";

interface MatchParams {
  id: string;
}

const OrderScreen = ({ match }: RouteComponentProps<MatchParams>) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetailState = useSelector<StoreState, OrderDetailsState>(
    (state) => state.orderDetailState
  );
  const { order, loading, error } = orderDetailState;

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, dispatch, orderId]);

  return loading || !order || !order._id ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user?.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.postalCode},{" "}
                {order.shippingAddress?.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  <span>Delivered on {order.deliveredAt}</span>
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  <span>Paid on {order.paidAt}</span>
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderScreen;
