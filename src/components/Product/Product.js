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
  liked,
    dataLike,
    forProduct,
  cart,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const counter = useRef(0);
  const [products, setProducts] = useState(product)
  const [prod, setProd] = useState()
  const [like, setLike] = useState(false)

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
    //console.log(cart.cartProducts);
  }

  function isAdded() {
    const isAdded =
      cart.cartProducts.length > 0 &&
      cart.cartProducts.find(p => p.product.id === product.id);
    return isAdded;
  }

  function toggleLike() {
    if (!isLiked()) {
      likeProduct(product);
      setLike(true)
    } else {
      unlikeProduct(product);
      setLike(false)
    }
  }

  useEffect(() => {
    // likeProduct([]);
    if(forProduct) {
      if (product.like === true) {
        setLike(true)
      }
    }

  },[])

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
      unlikeProduct(product);
      setProducts({...product, like: false})
    }
  };

  function isLiked() {
    const isLiked =
      liked.likedProducts.length > 0 &&
      liked.likedProducts.find(p => p.id === product.id);
    return isLiked;
  }
  
  return (
    <>
      <Col
        xs={12}
        sm={6}
        lg={4}
        xl={3}
        key={0}
        className="container"
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        <div className="row justify-content-center align-self-center h-300">
          <Spinner animation="border" className="align-self-center" />
        </div>
      </Col>

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
                onClick={toggleAddProduct}
                className="button-cart mt-3"
            >
              <i className="fa fa-shopping-cart"></i>
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
