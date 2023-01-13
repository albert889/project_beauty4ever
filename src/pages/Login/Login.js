import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// import * as Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { config } from '../../services/config';
import {
  setGoogleUser,
  registerLocalUser,
  loginLocalUser,
  redirectAfterLogin,
} from '../../store/actions/auth';
import { showToast } from '../../store/actions/toast';

import './styles.css';

export const DisplayFormikState = props => (
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Password must be 2 characters at minimum.')
    .max(10, 'Password must be 10 characters at maximum.')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Name must be 2 characters at minimum.')
    .max(10, 'Name must be 10 characters at maximum.')
    .required('Required'),
  repeatPassword: Yup.string()
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password must be the same',
      ),
    })
    .required('Required'),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Password must be 2 characters at minimum.')
    .max(10, 'Password must be 10 characters at maximum.')
    .required('Required'),
});

const Login = ({
  setGoogleUser,
  showToast,
  registerLocalUser,
  loginLocalUser,
  redirectAfterLogin,
  history,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const formik = useRef(null);

  function toggleRegisterClick() {
    setIsRegister(!isRegister);
    if (formik.current) {
      formik.current.resetForm();
    }
  }

  const responseGoogleSuccess = response => {
    setGoogleUser(response.profileObj);
    if (formik.current) {
      formik.current.resetForm();
    }
    redirectAfterLogin(() => history.push('/products'));
  };

  const responseGoogleFail = response => {
    showToast({
      title: 'Error',
      text: `Error loging in with Google: ${response.error}.`,
    });
    if (formik.current) {
      formik.current.resetForm();
    }
  };

  return (
    <Row>
      <Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
        <div className="card">
          <article className="card-body">
            <Button
              onClick={toggleRegisterClick}
              variant="outline-primary"
              className="float-right"
            >
              {isRegister ? 'Login' : 'Register'}
            </Button>
            <h4 className="card-title mb-4 mt-1">Sign in</h4>
            <p>
              <GoogleLogin
                clientId={config.clientId}
                render={renderProps => (
                  <Button
                    id="googleButton"
                    variant="outline-primary"
                    className="btn-block"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    {' '}
                    <i className="fa fa-google"></i>   Login with Google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFail}
                cookiePolicy={'single_host_origin'}
              />
            </p>
            <hr />

            <Formik
              ref={formik}
              initialValues={
                isRegister
                  ? {
                      email: '',
                      password: '',
                      name: '',
                      repeatPassword: '',
                    }
                  : {
                      email: '',
                      password: '',
                    }
              }
              validationSchema={isRegister ? registerSchema : loginSchema}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  if ('name' in values) registerLocalUser(values);
                  else loginLocalUser(values);
                  actions.setSubmitting(false);
                  actions.resetForm();
                  redirectAfterLogin(() => history.push('/products'));
                }, 1000);
              }}
              onChange={e => console.log(e)}
              render={props => {
                const {
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  isValid,
                  errors,
                  isSubmitting,
                } = props;
                return (
                  <>
                    <Form noValidate onSubmit={handleSubmit}>
                      {isRegister && (
                        <Form.Group controlId="validationFormik1">
                          <Form.Control
                            name="name"
                            type="input"
                            placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.name && !!errors.name}
                            isValid={touched.name && !errors.name}
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            {errors.name}
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                      <Form.Group controlId="validationFormik2">
                        <Form.Control
                          name="email"
                          type="email"
                          placeholder="Email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && !!errors.email}
                          isValid={touched.email && !errors.email}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="validationFormik3">
                        <Form.Control
                          name="password"
                          type="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && !!errors.password}
                          isValid={touched.password && !errors.password}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {isRegister && (
                        <Form.Group controlId="validationFormik4">
                          <Form.Control
                            name="repeatPassword"
                            type="password"
                            placeholder="Repeat Password"
                            value={values.repeatPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={
                              touched.repeatPassword && !!errors.repeatPassword
                            }
                            isValid={
                              touched.repeatPassword && !errors.repeatPassword
                            }
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            {errors.repeatPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                      )}
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormik3"
                        >
                          <Form.Group>
                            <Button
                              type="submit"
                              className="btn-block"
                              disabled={isSubmitting}
                            >
                              {isSubmitting
                                ? 'Please wait...'
                                : isRegister
                                ? 'Register'
                                : 'Login'}
                            </Button>
                          </Form.Group>
                        </Form.Group>
                        <div className="col-md-6 text-right">
                          <a className="small" href="#">
                            Forgot password?
                          </a>
                        </div>
                      </Form.Row>
                      <Form.Row>
                        <div className="col-12 text-center small">
                          <p>Test email: default@gmail.com</p>
                          <p>Test password: password</p>
                        </div>
                      </Form.Row>
                    </Form>
                    {/* <DisplayFormikState {...props} /> */}
                  </>
                );
              }}
            />
          </article>
        </div>
      </Col>
    </Row>
  );
};

export default connect(
  state => ({}),
  {
    setGoogleUser,
    showToast,
    registerLocalUser,
    loginLocalUser,
    redirectAfterLogin,
  },
)(withRouter(Login));
/*
profileObj:
email: "api@gmail.com"
familyName: "Kralc"
givenName: "rko"
googleId: "25350571"
imageUrl: "https://lh6.googleusercontent.com/-6ZAIGkgvuaQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rc9E5uex_lbFBctbj8KYQ6cLt5WLg/s96-c/photo.jpg"
name: "rko Kral
*/
