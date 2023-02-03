import React, {Fragment, useEffect, useState} from 'react';
import { withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import imgLogo from '../../images/img_logo.svg';

import { GoogleLogout } from 'react-google-login';

import {
  setSortBy,
  setFilterBy,
  setPageToLoad,
} from '../../store/actions/header';
import { loadProducts } from '../../store/actions/products';
import {
  getGoogleUser,
  logOutGoogleUser,
  getLocalUser,
  logoutLocalUser,
} from '../../store/actions/auth';
import { config } from '../../services/config';

import './styles.css';
import {child, get, ref} from "firebase/database";
import {RealDatabase} from "../../firebase/config";
import {likeProduct} from "../../store/actions/liked";

const Header = ({
  location,
  header,
  loadProducts,
  setSortBy,
  setFilterBy,
  setPageToLoad,
  liked,
  cart,
  auth,
  checkout,
  getGoogleUser,
  logOutGoogleUser,
  getLocalUser,
  logoutLocalUser,
}) => {
  const { pathname } = location;
  const [dataLike, setDataLikes] = useState([]);
  const [dataCart, setDataCart] = useState([]);

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
            setDataCart(datas);
          } else {
          }
        })
        .catch(error => {
          console.error(error);
        });
  };



  useEffect(() => {
    getGoogleUser();
    getLocalUser();
  }, []);

  function calcCartLength() {
    const sum = dataCart
      .map(p => p.qty)
      .reduce((a, b) => a + b, 0);
    return sum;
  }

  const getDataLikeV2 = async () => {
    const dbRef = ref(RealDatabase);
    get(child(dbRef, `liked/HmVao72bu7WnUbYR4ssTd34AMLp1/list`))
        .then(async snapshot => {
          if (snapshot.exists()) {
            const oldData = snapshot.val();
            const datas = [];
            Object.keys(oldData).map(key => {
              datas.push({
                id: oldData[key].id,
              });
            });
            setDataLikes(datas);
          } else {
          }
        })
        .catch(error => {
          console.error(error);
        });
  };

  useEffect(() => {
    getDataLikeV2();
    getDataCart();
  }, [liked, cart])

  function logoutSuccess() {
    logOutGoogleUser();
  }

  function logoutLocalUserClick() {
    logoutLocalUser();
  }

  function getCurrentUser() {
    let user = null;
    user = auth.googleUser ? 'google' : auth.localUser ? 'local' : null;
    return user;
  }
  return (
    <Navbar

      collapseOnSelect
      className="navbar container"
      fixed="top"
    >
      <Container>
        <LinkContainer to="/home">
          {/* <span className="header-name font-weight-bold">Beauty4ever</span> */}
          <img src={require(`../../images/img_logo.svg`)} className="logo-img"/>

        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="nav" id="responsive-navbar-nav">
          <Nav className="mr-auto nav-color" activeKey={pathname}>
            <LinkContainer to="/home">
              <Nav.Link> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/liked">
              <Nav.Link>Liked{' '}
                {dataLike.length > 0 && (
                  <Badge pill variant="light">
                    {dataLike.length}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav activeKey={pathname}>
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fa fa-shopping-cart"></i> Cart{' '}
                {calcCartLength() > 0 && (
                  <Badge pill variant="danger">
                    {calcCartLength()}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>
            
            {!getCurrentUser() ? (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa fa-sign-in"></i> Log in
                </Nav.Link>
              </LinkContainer>
            ) : (
              <NavDropdown
                title={
                  <>
                    <i className="fa fa-user"></i> <span>Logged in</span>
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <div
                    className="row"
                    style={{ minWidth: '15rem', maxHeight: '4rem' }}
                  >
                    <div className="col-lg-3 col-2 img-container">
                      <img
                        src={
                          getCurrentUser() === 'google'
                            ? auth.googleUser.imageUrl
                            : require(`../../static/products/avatar.jpg`)
                        }
                        className="user-img"
                      />
                    </div>
                    <div className="col-lg-9 col-10 text-left">
                      <p className="">
                        <strong>
                          {getCurrentUser() === 'google'
                            ? auth.googleUser.name
                            : auth.localUser.name}
                        </strong>
                      </p>
                      <p className="small">
                        {getCurrentUser() === 'google'
                          ? auth.googleUser.email
                          : auth.localUser.email}
                      </p>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {getCurrentUser() === 'google' ? (
                  <GoogleLogout
                    clientId={config.clientId}
                    buttonText="Logout"
                    onLogoutSuccess={logoutSuccess}
                    render={renderProps => (
                      <>
                        <LinkContainer to="/profile">
                          <NavDropdown.Item className="text-center">
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          className="text-center"
                          onClick={renderProps.onClick}
                        >
                          Google log out
                        </NavDropdown.Item>
                      </>
                    )}
                  />
                ) : (
                  <>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="text-center">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      className="text-center"
                      onClick={logoutLocalUserClick}
                    >
                      Local log out
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default connect(
  state => ({
    header: state.headerReducer,
    liked: state.likedReducer,
    cart: state.cartReducer,
    checkout: state.checkoutReducer,
    auth: state.authReducer,
  }),
  {
    likeProduct   ,
    setSortBy,
    setFilterBy,
    setPageToLoad,
    loadProducts,
    getGoogleUser,
    logOutGoogleUser,
    getLocalUser,
    logoutLocalUser,
  },
)(withRouter(Header));
