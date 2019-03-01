import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";
import Web from '../layouts/webLayout';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

export default class WebLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  submitHandler = event => {
    event.preventDefault();
    event.target.className += " was-validated";
    const obj = {
      email: this.state.email,
      password: this.state.password

    };
    if (event.target.checkValidity()) {
      console.log("yyy");
      axios.post('http://localhost:5005/login', obj)
        .then(res => {
          if (res.data != "error") {
            console.log(res.data);
            localStorage.setItem("UserToken", res.data.token);
            localStorage.setItem("user_name" ,res.data.user.fname);
            localStorage.setItem("image" ,res.data.user.image);
            this.setState({ redirect: true });
            axios.defaults.headers.common['x-auth'] = res.data.token;
            this.props.history.push("/AllUserBooks");

            

          } else {
            console.log("error");
            this.setState({ redirect: false });
          }
          console.log(res.data);

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
    return (
      <Web>
        <div className="Login">
          <div className="cover">

            <div>
              <form
                className="needs-validation"
                onSubmit={this.submitHandler}
                Validate>

                <div className="login-bg">
                  <h2>LOGIN</h2>
                  <FormGroup controlId="Email" bsSize="large">

                  <MDBRow>
                    <MDBCol md="12" className="mb-1">
                      <label className="form-label"
                        htmlFor="defaultFormRegisterNameEx">
                        Email
                      </label>
                    </MDBCol>
                  </MDBRow>

                    <MDBRow>
                      <MDBCol md="12" className="mb-3">

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
                  </FormGroup>

                  <FormGroup controlId="Email" bsSize="large">
                  <MDBRow>
                    <MDBCol md="12" className="mb-1">
                      <label className="form-label"
                        htmlFor="defaultFormRegisterNameEx">
                        Password
                      </label>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow>
                    <MDBCol md="12" className="mb-3">

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
                  </FormGroup>
                  <MDBBtn color="primary" type="submit" id="customButton" className="but form-btn btn btn-primary btn-block   pointer white-text mb-4 mt-4">
                    Submit
                     </MDBBtn>
                  {/* {redirect && (
                        <Redirect to='/admin' />
                    )} */}
                </div>
              </form>
            </div>

          </div>
        </div>
      </Web>
    );
  }
}