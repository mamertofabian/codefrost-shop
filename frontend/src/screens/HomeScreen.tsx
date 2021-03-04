import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { StoreState } from "../store";
import { ProductListState } from "../reducers/productReducers";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  keyword: string;
  pageNumber: string;
}

const HomeScreen = ({
  match,
  location,
  history,
}: RouteComponentProps<MatchParams>) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || "1";
  const dispatch = useDispatch();

  const productState = useSelector<StoreState, ProductListState>(
    (state) => state.productListState
  );
  const { productList, loading, error } = productState;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <span>{error}</span>
        </Message>
      ) : (
        productList &&
        productList.products.length > 0 && (
          <Fragment>
            <Row>
              {productList.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={productList.pages}
              page={productList.page}
              keyword={keyword ? keyword : ""}
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default HomeScreen;
