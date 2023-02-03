import React, {useState, useRef, useEffect} from 'react';
import { connect } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

import './styles.css';

import { likeProduct, unlikeProduct } from '../../store/actions/liked';
import {
  addProductToCart,
  removeProductFromCart,
} from '../../store/actions/cart';
import {ref, remove, set} from "firebase/database";
import {RealDatabase} from "../../firebase/config";

const Product = ({
  product,
  likeProduct,
  unlikeProduct,
  addProductToCart,
  removeProductFromCart,
    dataLike,
    dataCart,
  cart,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);
  const [products, setProducts] = useState(product)

  function imageLoaded() {
    counter.current += 1;
    if (counter.current >= 1) {
      setIsLoading(false);
    }
  }

  function toggleAddProduct() {
    if (!isAdded()) {
      addProductToCart(product);
    } else {
      removeProductFromCart(product);
    }
  }

  function isAdded() {
    const isAdded =
      cart.cartProducts.length > 0 &&
      cart.cartProducts.find(p => p.product.id === product.id);
    return isAdded;
  }

  const handleLikeV2 = async product => {
    var dataLikeByOd = '';
    dataLike.map(i => {
      if (product.id === i.id) {
        dataLikeByOd = product.id;
      }
    });
    if (dataLikeByOd === '') {
      set(ref(RealDatabase, `liked/HmVao72bu7WnUbYR4ssTd34AMLp1/list/${product.id}`), {
        id: product.id,
      });
      setProducts({...product, like: true})
      likeProduct(product);
    } else {
      const dbRef = ref(RealDatabase, `liked/HmVao72bu7WnUbYR4ssTd34AMLp1/list/${product.id}`);
      remove(dbRef);
      likeProduct(product);
      setProducts({...product, like: false})
    }
  };

  const handleAddCart = async id => {
    var dataCartById = '';
    var dataCartByIdQty = '';
    dataCart.map(i => {
      if (id === i.id) {
        dataCartById = i.id;
        dataCartByIdQty = i.qty;
      }
    });
    if (dataCartById === '') {
      set(ref(RealDatabase, `cart/HmVao72bu7WnUbYR4ssTd34AMLp1/list/${id}`), {
        id: id,
        qty: 1,
      });
      setProducts({...product, qty: 1})
      addProductToCart(product)
    } else {
      const quantity = dataCartByIdQty + 1
      set(ref(RealDatabase, `cart/HmVao72bu7WnUbYR4ssTd34AMLp1/list/${id}`), {
        id: id,
        qty: quantity,
      });
      addProductToCart(product)
      setProducts({...product, qty: quantity})
    }
  };

  return (
    <>
      <Col
        lg={3}
        className="mb-3"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <Card className="product-card h-300 p-3">
        <i
            onClick={() => handleLikeV2(product)}
            className={
              products.like
                ? 'fa fa-heart text-danger like'
                : 'fa fa-heart text-disable like'
            }
          ></i>
          <Link to={`/product-details/${product.id}`}>
            <Card.Img
              className="product-img"
              variant="top"
              src={product.image_link}
              alt={product.name}
              onLoad={imageLoaded}
            />
          </Link>
          <Card.Body className="p-0">
          <p className="card-title name">{product.name}</p>
          <div className="d-flex align-items-center justify-content-between">
            <span className="price">Rp. {(Number(product.price) * 15000).toLocaleString()}</span>
            <Button
                onClick={() => handleAddCart(product.id)}
                className="button-cart mt-3"
            >
              {products.qty !== 0 ? products.qty : <i className="fa fa-shopping-cart"></i>}

            </Button>
          </div>

        </Card.Body>

        </Card>
      </Col>
    </>
  );
};

export default connect(
  state => ({
    liked: state.likedReducer,
    cart: state.cartReducer,
  }),
  {
    likeProduct,
    unlikeProduct,
    addProductToCart,
    removeProductFromCart,
  },
)(Product);
