import React, { Fragment, useEffect } from 'react';
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
  getGoogleUser,
  logOutGoogleUser,
  getLocalUser,
  logoutLocalUser,
}) => {
  const { pathname } = location;

  useEffect(() => {
    getGoogleUser();
    getLocalUser();
  }, []);

  function calcCartLength() {
    const sum = cart.cartProducts
      .map(p => p.quantity)
      .reduce((a, b) => a + b, 0);
    return sum;
  }

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
      expand="lg"
      className="navbar container"
      fixed="top"
    >
      <Container>
        <LinkContainer to="/home">
          {/* <span className="header-name font-weight-bold">Beauty4ever</span> */}
          <img src={require(`../../images/img_logo.svg`)} className="logo-img"/>
          
        </LinkContainer>
        <Navbar.Collapse className="nav" id="responsive-navbar-nav">
          <Nav className="mr-auto nav-color" activeKey={pathname}>
            <LinkContainer to="/home">
              <Nav.Link> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/liked">
              <Nav.Link>Liked{' '}
                {liked.likedProducts.length > 0 && (
                  <Badge pill variant="light">
                    {liked.likedProducts.length}
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
    auth: state.authReducer,
  }),
  {
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
