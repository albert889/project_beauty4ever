import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {
  addProductToCart,
  removeProductFromCart,
  removeProductsFromCart,
} from '../../store/actions/cart';
import { LinkContainer } from 'react-router-bootstrap';
import './styles.css';
import cart from "./index";
import {getDataMakeup} from "../../fakebackend/axiosData";
import {child, get, ref, set, push, getDatabase, update} from "firebase/database";
import {RealDatabase} from "../../firebase/config";
import Button from "react-bootstrap/Button";
import {showToast} from "../../store/actions/toast";


const Cart = ({
  cart: { cartProducts },
  addProductToCart,
  removeProductFromCart,
  removeProductsFromCart,

}) => {
  const [data, setData] = useState([]);
  const [dataCart, setDataCart] = useState([])
  const [qty, setqty] = useState()

  const handleGetData = async () => {
    const response = await getDataMakeup();
    setData(response)
  }

  const handleAddCart = async id => {
    var dataCartById = '';
    var dataCartByIdQty = '';
    dataCart.map(i => {
      if (id === i.id) {
        dataCartById = i.id;
        dataCartByIdQty = i.qty;
      }
    });
    const quantity = dataCartByIdQty + 1
      set(ref(RealDatabase, `cart/HmVao72bu7WnUbYR4ssTd34AMLp1/list/${id}`), {
        id: id,
        qty: quantity,
      });

    setqty(quantity)
    addProductToCart(quantity)


  };

  const handleRemove = async id => {
    var dataCartById = '';
    var dataCartByIdQty = '';
    dataCart.map(i => {
      if (id === i.id) {
        dataCartById = i.id;
        dataCartByIdQty = i.qty;
      }
    });
      const quantity = dataCartByIdQty - 1
      set(ref(RealDatabase, `cart/HmVao72bu7WnUbYR4ssTd34AMLp1/list/${id}`), {
        id: id,
        qty: quantity,
      });
      setqty(quantity)
    addProductToCart(quantity)

  };


  const getDataCart = async () => {
    const dbRef = ref(RealDatabase);
    get(child(dbRef, `cart/HmVao72bu7WnUbYR4ssTd34AMLp1/list`))
        .then(async snapshot => {
          if (snapshot.exists()) {
            const oldData = snapshot.val();
            const datas = [];
            Object.keys(oldData).map(key => {
              datas.push({
                id: oldData[key].id,
                qty: oldData[key].qty,
              });
            });
            console.log('dataHasilParse: ', datas);
            setDataCart(datas);
          } else {
            console.log('No data available');
          }
        })
        .catch(error => {
          console.error(error);
        });
  };

  useEffect(() => {
    handleGetData();
    getDataCart();
  }, [cart, qty])

  const handleAddOrder = () => {
    var dataCartById = '';
    var dataCartByIdQty = '';
    dataCart.map(i => {
        dataCartById = i.id;
        dataCartByIdQty = i.qty;
    });
    const db = getDatabase();
    const newPostKey = push(child(ref(db), 'posts')).key;
    const updates = {};
    updates['order/' + "HmVao72bu7WnUbYR4ssTd34AMLp1" + '/' + newPostKey] = dataCart;

    return update(ref(db), updates);

  };


  return (
    <Fragment>
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
              {data.map((product, i) => {
                const indx = dataCart.findIndex((it => it.id === product.id))
                if (indx >= 0) {
                  return (
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
                                style={{paddingTop: 5}}
                            >
                              <h5>
                                <strong>Rp. {(Number(product.price) * 15000).toLocaleString()}</strong>
                              </h5>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4">
                              <div className="quantity">
                                <button
                                    onClick={() => handleAddCart(product.id)}
                                    className="plus"
                                >
                                  +
                                </button>
                                <span className="quantity-number">{dataCart[indx].qty}</span>
                                <button
                                    onClick={() => handleRemove(product.id)}
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
                        <hr/>
                      </Fragment>
                  )
                }
              })}

              <div className="pull-right">
                <Link to={'/home'}>
                  <button className="btn btn-outline-primary pull-right">
                    Continue shopping
                  </button>
                </Link>
              </div>
            </div>
            <div className="card-footer">
              <div className="pull-right" style={{ margin: 10 }}>
                <Link to="/home">
                  <Button onClick={() => handleAddOrder()} className="btn btn-primary pull-right" >
                    Checkout
                  </Button>
                </Link>

                <div className="pull-right" style={{ margin: 5 }}>
                  Total price:{' '}
                  <b>
                    Rp.
                    {data.map((product, i) => {
                        debugger
                          const indx = dataCart.findIndex((it => it.id === product.id))
                          if (indx >= 0) {
                            return (Number(product.price) * 15000) * dataCart[indx].qty;
                          } else {
                            return 0;
                          }
                      }).reduce((a, b) => a + b, 0)
                          .toLocaleString()}
                  </b>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    </Fragment>
  );
};

export default connect(
  state => ({
    cart: state.cartReducer,
  }),
  { addProductToCart, removeProductFromCart, removeProductsFromCart },
)(Cart);
