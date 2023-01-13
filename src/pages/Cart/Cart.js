import React, { useEffect, useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';

import {
  addProductToCart,
  removeProductFromCart,
  removeProductsFromCart,
} from '../../store/actions/cart';

import './styles.css';

const Cart = ({
  cart: { cartProducts },
  addProductToCart,
  removeProductFromCart,
  removeProductsFromCart,
}) => {
  return (
    <Fragment>
      {cartProducts.length === 0 ? (
        <Row className="justify-content-center">
          <h4>There are no products in the cart yet.</h4>
        </Row>
      ) : (
        <Fragment>
          <div className="card shopping-cart">
            <div className="card-header  text-primary">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
              Shopping cart
              <Link to={'/liked'}>
                <button className="btn btn-outline-primary btn-sm pull-right">
                  Go to liked products
                </button>
              </Link>
              <div className="clearfix"></div>
            </div>
            <div className="card-body">
              {cartProducts.map(({ product, quantity }, i) => (
                <Fragment key={i}>
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 text-center">
                      <Link to={`/product-details/${product.id}`}>
                        <Card.Img
                        className="product-img"
                        variant="top"
                        src={product.image_link}
                        alt={product.name}
                      />
                      </Link>
                    </div>
                    <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                      <h4 className="product-name">{product.name}</h4>
                      <p>{product.description}</p>
                    </div>
                    <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                      <div
                        className="col-3 col-sm-3 col-md-6 text-md-right"
                        style={{ paddingTop: 5 }}
                      >
                        <h5>
                          <strong>Rp. {(Number(product.price) * 15000).toLocaleString()}</strong>
                        </h5>
                      </div>
                      <div className="col-4 col-sm-4 col-md-4">
                        <div className="quantity">
                          <button
                            onClick={() => addProductToCart(product)}
                            className="plus"
                          >
                            +
                          </button>
                          <span className="quantity-number">{quantity}</span>
                          <button
                            onClick={() => removeProductFromCart(product)}
                            className="minus"
                          >
                            -
                          </button>
                        </div>
                      </div>
                      <div className="col-2 col-sm-2 col-md-2 text-right">
                        <button
                          onClick={() => removeProductsFromCart(product)}
                          type="button"
                          className="btn btn-outline-danger btn-xs"
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}

              <div className="pull-right">
                <Link to={'/products'}>
                  <button className="btn btn-outline-primary pull-right">
                    Continue shopping
                  </button>
                </Link>
              </div>
            </div>
            <div className="card-footer">
              <div className="pull-right" style={{ margin: 10 }}>
                <a href="" className="btn btn-primary pull-right">
                  Checkout
                </a>
                <div className="pull-right" style={{ margin: 5 }}>
                  Total price:{' '}
                  <b>
                    Rp.
                    {cartProducts
                      .map(p => (Number(p.product.price) * 15000) * p.quantity)
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString()}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default connect(
  state => ({
    cart: state.cartReducer,
  }),
  { addProductToCart, removeProductFromCart, removeProductsFromCart },
)(Cart);
