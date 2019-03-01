import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Admin from '../layouts/admin';

// import MDBSelect from "mdbreact";
// import {
//     DBRow, MDBCol, MDBBtn, MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption
//   } from 'mdbreact';
export default class CreateAuthor extends Component {

    state = {
        fname: "",
        lname: '',
        email: '',
        file: '', imagePreviewUrl: '',
        redirect: false
    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }
        console.log(this.state.file);
        reader.readAsDataURL(file)
    }
    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.set('fname',this.state.fname);
        formData.set('lname',this.state.lname);
        formData.set('email',this.state.email);
        // const obj = {
        //     fname: this.state.fname,
        //     lname: this.state.lname,
        //     email: this.state.email,
        //     image: formData

        // };
        if (event.target.checkValidity()) {
            axios.post('http://localhost:5005/admin/author', formData)
                .then(res => {
                    console.log(res.data);
                    if (res.data === "author was saved") {
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
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        const { redirect } = this.state;
        return (
            <Admin>
            <div>
                <div class="white-background content-details">
                    <div class="content-header white-text grey-blue-background">
                        <h4 class="p-3 f16 f400"> New Author </h4>
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
                                        First Name
                                     </label>
                                </MDBCol>
                                <MDBCol md="3" className="mb-4">
                                    <input
                                        // value={this.state.name}
                                        name="fname"
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
                            <MDBRow>
                                <MDBCol md="1" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                        Last Name
                                     </label>
                                </MDBCol>
                                <MDBCol md="3" className="mb-4">
                                    <input
                                        // value={this.state.name}
                                        name="lname"
                                        onChange={this.changeHandler}
                                        type="text"
                                        id="defaultFormRegisterNameEx"
                                        className="form-control form-custom-control"
                                        placeholder="Last Name"
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                            </MDBRow>                          
                            <MDBRow>
                                <MDBCol md="1" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                        Email
                                     </label>
                                </MDBCol>
                                <MDBCol md="3" className="mb-4">
                                    <input
                                        name="email"
                                       onChange={this.changeHandler}
                                       type="email"
                                       id="defaultFormRegisterNameEx"
                                       className="form-control form-custom-control"
                                       placeholder="Your Email address" required
                                        />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">Write Email in Correct Format</div>
                                </MDBCol>
                                
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="1" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                        Image
              </label>
                                </MDBCol>
                                <MDBCol md="3" className="mb-4">
                                    <input className="fileInput"
                                        type="file"
                                        onChange={(e) => this._handleImageChange(e)} />
                                    {/* <button className="submitButton"
                                        type="submit"
                                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button> */}
                                    <div className="imgPreview">
                                        {$imagePreview}
                                    </div>
                                </MDBCol>
                            </MDBRow>

                            <MDBBtn type="submit" className="yellow-background yellow-button  pointer white-text mb-4 mt-4" id="customButton">
                                submit
                      </MDBBtn>
                            {redirect && (
                                <Redirect to='/admin/authors' />
                            )}
                        </form>
                    </div>
                </div>
            </div>
            </Admin>
        )
    }
}