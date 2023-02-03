import { createUserWithEmailAndPassword, sendEmailVerification, updateCurrentUser } from "firebase/auth";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Auth, Fire } from "../../firebase/config";
// import authReducer from "../../store/reducers/authReducer";




export default class Register extends Component {
    state = {
        email: '',
        password:'',
        fullname:'',
        address:'',
        phone:'',
    }

    handleChangeField = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const { email, password, phone, address, fullname } = this.state
        createUserWithEmailAndPassword(Auth,  email, password, phone, address, fullname )
        .then(res=>{
            Auth.updateCurrentUser()
            .then(()=>{
                alert('Anda berhasil terdaftar');
                this.props.history.push('/signin')
            })
            .catch((error)=>{
                alert(error.message)
            })
        })
        .catch(err=>{
            alert(err.message)
        })
    }
    render() {
        const { email, password, phone, address, fullname } = this.state
        return (
            <div>
                <h2>Signup</h2>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name"  value={fullname} onChange={this.handleChangeField} name="fullname"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={this.handleChangeField} name="email"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={this.handleChangeField} name="password"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" placeholder="Phone Number"  value={phone} onChange={this.handleChangeField} name="phone"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Address" value={address} onChange={this.handleChangeField} name="address"/>
                    </Form.Group>

                    <Button color="primary" type="submit">Signup</Button>
                </Form>
                <p>Have an account? <Link to='/signin'>Signin</Link></p>
            </div>
        )
    }
}