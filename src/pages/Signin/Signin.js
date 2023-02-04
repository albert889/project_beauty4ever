import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Auth, Fire } from "../../firebase/config";
// import authReducer from "../../store/reducers/authReducer";




export default class Signin extends Component {
    state = {
        email: '',
        password: '',

    }

    handleChangeField = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state
        signInWithEmailAndPassword(Auth, email, password)
            .then(res => {
                this.props.history.push('/home')
                localStorage.setItem('uid', res.user.uid)
                window.location.reload();
            })
            .catch(err => {
                alert(err.message)
            })
    }
    render() {
        const { email, password } = this.state
        return (
            <div>
                <h2>Signin</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={this.handleChangeField} name="email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={this.handleChangeField} name="password" />
                    </Form.Group>

                    <Button color="primary" type="submit">Signin</Button>
                </Form>
                <p>Dont have an account? <Link to='/signup'>Signup</Link></p>
            </div>
        )
    }
}