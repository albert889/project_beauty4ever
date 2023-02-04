import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Auth } from '../../firebase/config';

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    Auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        history.push('/');
          localStorage.setItem('uid', authUser.user.uid)
          window.location.reload();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="sign-up">
      <h1 className="title">I do not have an account</h1>
      <span>Sign up with your email and password</span>
      <form onSubmit={signUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="sign-up-button">
          Sign Up
        </button>
      </form>
      <Link to="/signin">Already have an account? Sign In</Link>
    </div>
  );
};

export default SignUp;