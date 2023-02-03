import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './styles.css';

const Profile = ({ auth }) => {
  function getCurrentUser() {
    let user = {
      name: 'Default Name',
      email: 'email@email.com',
      imageUrl: 'http://placehold.it/150x150',
    };

    if (auth.googleUser) {
      user = auth.googleUser;
    } else if (auth.localUser) {
      user = auth.localUser; //name, email
      user.imageUrl = require(`../../static/products/avatar.jpg`);
    }
    return user;
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="card-title mb-4">
              <div className="d-flex justify-content-start">
                <div className="image-container">
                  <img
                    src={getCurrentUser().imageUrl}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: 'cover',
                    }}
                    className="img-thumbnail"
                  />
                </div>
                <div className="userData ml-3">
                  <h2>{getCurrentUser().name}</h2>
                  <h6>{getCurrentUser().email}</h6>
                  <h6>Customer info</h6>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <Tabs defaultActiveKey="info" id="uncontrolled-tab-example">
                  <Tab eventKey="info" title="Basic info">
                    <div className="mt-4">
                      <div className="row">
                        <div className="col-sm-3 col-md-2 col-5">
                          <label className="item-label">Full Name</label>
                        </div>
                        <div className="col-md-8 col-6">Lorem Ipsum</div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3 col-md-2 col-5">
                          <label className="item-label">Phone Number</label>
                        </div>
                        <div className="col-md-8 col-6">-</div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3 col-md-2 col-5">
                          <label className="item-label">Email</label>
                        </div>
                        <div className="col-md-8 col-6">-</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3 col-md-2 col-5">
                          <label className="item-label">Address</label>
                        </div>
                        <div className="col-md-8 col-6">-</div>
                      </div>
                      <hr />
                     
                      <hr />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    auth: state.authReducer,
  }),
  {},
)(Profile);
