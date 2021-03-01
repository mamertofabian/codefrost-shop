import React, { Fragment, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { StoreState } from "../store";
import { CartState } from "../reducers/cartReducers";

const PlaceOrderScreen = () => {
  const cartState = useSelector<StoreState, CartState>(
    (state) => state.cartState
  );
  const { cartItems, cartSummary } = cartState;

  const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  // Calculate prices
  cartSummary.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cartSummary.shippingPrice = addDecimals(
    Number(cartSummary.itemsPrice) > 100 ? 0 : 100
  );
  cartSummary.taxPrice = addDecimals(
    Number((Number(cartSummary.itemsPrice) * 0.15).toFixed(2))
  );
  cartSummary.totalPrice = addDecimals(
    Number(cartSummary.itemsPrice) +
      Number(cartSummary.shippingPrice) +
      Number(cartSummary.taxPrice)
  );

  const placeOrderHandler = () => {
    console.log("placeorder");
  };

  return (
    <Fragment>
      <CheckoutSteps step1={1} step2={2} step3={3} step4={4} />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cartState.shippingAddress?.address},{" "}
                {cartState.shippingAddress?.city},{" "}
                {cartState.shippingAddress?.postalCode},{" "}
                {cartState.shippingAddress?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cartState.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
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
                  <Col>${cartSummary.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cartSummary.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cartSummary.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cartSummary.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceOrderScreen;
