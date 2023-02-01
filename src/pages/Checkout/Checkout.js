import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Col, Button, Modal } from 'react-bootstrap';
import CountrySelect from 'react-bootstrap-country-select';
import './styles.css';
import { createHashHistory } from 'history';

const Checkout = () => {
  const history = createHashHistory();

  const removeItem = () => {
    localStorage.removeItem('CART');
    history.push('/home');
    window.location.reload(true);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [value, setValue] = useState(null);
  return (
    <Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Yeeaayyy</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, your order have been placed!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={removeItem}>
            Back to home
          </Button>
        </Modal.Footer>
      </Modal>
      <Col xs={12} sm={12} lg={8} xl={8} key={0}>
        <Card>
          <Card.Header>
            <h4 className="title">Customer Informatioin</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col lg={6} xl={6}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" />
                  </Form.Group>
                </Col>
                <Col lg={6} xl={6}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <CountrySelect value={value} onChange={setValue} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="number" placeholder="Enter Postal Code" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Detail Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Detail Address"
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={12} lg={4} xl={4} key={0}>
        <Card>
          <Card.Header>
            <h4 className="title">Order Summary</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg={6} xl={6}>
                <h6>Subtotal</h6>
              </Col>
              <Col lg={6} xl={6}>
                {JSON.parse(localStorage.getItem('CART')) && (
                  <div>
                    <h6 className="text-end">
                      Rp{' '}
                      {JSON.parse(localStorage.getItem('CART'))
                        .map(
                          (p) => Number(p.product.price) * 15000 * p.quantity,
                        )
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString()}
                    </h6>
                  </div>
                )}
              </Col>
              <Col lg={6} xl={6}>
                <h6 className="">Total Payment</h6>
              </Col>
              <Col lg={6} xl={6}>
                {JSON.parse(localStorage.getItem('CART')) && (
                  <div>
                    <h6 className="text-end">
                      Rp{' '}
                      {JSON.parse(localStorage.getItem('CART'))
                        .map(
                          (p) => Number(p.product.price) * 15000 * p.quantity,
                        )
                        .reduce((a, b) => a + b, 0)
                        .toLocaleString()}
                    </h6>
                  </div>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="mt-2">
          <Button className="ok" variant="primary" onClick={handleShow}>
            Place Order
          </Button>
        </div>
      </Col>
      <Col xs={12} sm={12} lg={8} xl={8} className="mt-4">
        <Card>
          <Card.Header>
            <h4 className="title">Payment Information</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Card Number" />
              </Form.Group>

              <Row>
                <Col xl={4} lg={4}>
                  <Form.Group className="mb-3" controlId="formBasicCardNumber">
                    <Form.Label>Valid Until</Form.Label>
                    <Form.Control
                      type="month"
                      placeholder="Enter Card Number"
                    />
                  </Form.Group>
                </Col>
                <Col xl={4} lg={4}>
                  <Form.Group className="mb-3" controlId="formBasicCardNumber">
                    <Form.Label>CVC</Form.Label>
                    <Form.Control type="number" placeholder="Enter CVC" />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
