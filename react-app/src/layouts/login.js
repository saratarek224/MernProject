import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route,  Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import '../css/adminlogin.css';
export default class Login extends Component {
    state = {
        email: "",
        password: "",
        redirect: false

    };

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        const obj = {
            email: this.state.email,
            password: this.state.password

        };
        if (event.target.checkValidity()) {
            console.log("yyy");
            axios.post('http://localhost:5005/admin/login', obj)
                .then(res => {
                    if (res.data !="error") {
                        console.log(res.data);
                        localStorage.setItem("AdminToken", res.data);
                        this.setState({ redirect: true });
                        axios.defaults.headers.common['x-auth'] = res.data;
                        this.props.history.push("/admin/books");
                        
                    } else {
                        console.log("error");
                        this.setState({ redirect: false });
                    }
                    console.log(res.data);
                    // if (res.data === "author was saved") {
                    //     this.setState({ redirect: true });
                    // } else {
                    //     this.setState({ redirect: false });
                    // }
                }
                ).catch(function (error) {
                    console.log("error2");
                    this.setState({ redirect: false })
                });
        }
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { redirect } = this.state;
        return (
            <section class="login-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1 class="login-header light-violet"> 
                   Login
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <section class="login-container">
                    <div class="row">
                        <div class="col-md-12 login-body">
                        <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    Validate
                >
                    <MDBRow>
                        <MDBCol md="10" className="mb-3">

                            <input
                                value={this.state.email}
                                name="email"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder="Email"
                                required
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="10" className="mb-3">

                            <input
                                value={this.state.password}
                                onChange={this.changeHandler}
                                type="password"
                                id="defaultFormRegisterConfirmEx4"
                                className="form-control"
                                name="password"
                                placeholder="Your password"
                                required
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn color="primary" type="submit" className="but">
                        Submit
                     </MDBBtn>
                </form>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
</section>
        );
    }
}
