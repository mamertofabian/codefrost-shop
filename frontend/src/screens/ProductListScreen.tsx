import React, { useEffect, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productActions";
import { StoreState } from "../store";
import { UserInfoState } from "../reducers/userReducers";
import {
  ProductCreateState,
  ProductDeleteState,
  ProductListState,
} from "../reducers/productReducers";
import { ActionTypes } from "../actions/types";

interface MatchParams {
  keyword: string;
  pageNumber: string;
}

const ProductListScreen = ({
  history,
  match,
}: RouteComponentProps<MatchParams>) => {
  // const keyword = match.params.keyword;
  const keyword = "";
  const pageNumber = match.params.pageNumber || "1";

  const dispatch = useDispatch();

  const productListState = useSelector<StoreState, ProductListState>(
    (state) => state.productListState
  );
  const { productList, loading, error } = productListState;

  const productDeleteState = useSelector<StoreState, ProductDeleteState>(
    (state) => state.productDeleteState
  );
  const {
    deleted,
    loading: deleteLoading,
    error: deleteError,
  } = productDeleteState;

  const productCreateState = useSelector<StoreState, ProductCreateState>(
    (state) => state.productCreateState
  );
  const {
    created,
    product: createdProduct,
    loading: createLoading,
    error: createError,
  } = productCreateState;

  const userLoginState = useSelector<StoreState, UserInfoState>(
    (state) => state.userLoginState
  );
  const { userInfo } = userLoginState;

  useEffect(() => {
    dispatch({ type: ActionTypes.PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (created && createdProduct) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword, pageNumber));
    }
  }, [
    created,
    createdProduct,
    keyword,
    pageNumber,
    dispatch,
    history,
    userInfo,
    deleted,
  ]);

  const deleteHandler = (userId: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(userId));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {createLoading && <Loader />}
      {createError && <Message variant="danger">{createError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Fragment>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productList &&
                productList.products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate
            pages={productList.pages}
            page={productList.page}
            isAdmin={true}
            // keyword={keyword ? keyword : ""}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductListScreen;
