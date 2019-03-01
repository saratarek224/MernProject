import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Admin from '../layouts/admin';

// import MDBSelect from "mdbreact";
// import {
//     DBRow, MDBCol, MDBBtn, MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption
//   } from 'mdbreact';
export default class CreateCategory extends Component {

    state = {
        name:'',
        redirect: false
    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        const obj = {
            name: this.state.name,
            

        };
        if (event.target.checkValidity()) {
            axios.post('http://localhost:5005/admin/catgory', obj)
                .then(res => {
                    console.log(res.data);
                    if (res.data === "catgory was saved") {
                        this.setState({ redirect: true });
                    } else {
                        this.setState({ redirect: false });
                    }
                }
                ).catch(function (error) {
                    this.setState({ redirect: false })
                });
        }
    };
    render() {
        const { redirect } = this.state;
        return (
            <Admin>
            <div>
                <div class="white-background content-details">
                    <div class="content-header white-text grey-blue-background">
                        <h4 class="p-3 f16 f400"> New Category </h4>
                        <div class="clearfix"></div>
                    </div>
                    <div class="p-3 mt-3"  >
                        <form
                            className="needs-validation"
                            onSubmit={this.submitHandler}
                            noValidate
                        >
                            <MDBRow>
                                <MDBCol md="1" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                        Name
                                     </label>
                                </MDBCol>
                                <MDBCol md="3" className="mb-4">
                                    <input
                                        // value={this.state.name}
                                        name="name"
                                        onChange={this.changeHandler}
                                        type="text"
                                        id="defaultFormRegisterNameEx"
                                        className="form-control form-custom-control"
                                        placeholder="First Name"
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                            </MDBRow>
                            <MDBBtn type="submit" className="yellow-background yellow-button  pointer white-text mb-4 mt-4" id="customButton">
                                submit
                      </MDBBtn>
                            {redirect && (
                                <Redirect to='/admin/categories' />
                            )}
                        </form>
                    </div>
                </div>
            </div>
            </Admin>
        )
    }
}