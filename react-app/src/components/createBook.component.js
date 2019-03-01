import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Admin from "../layouts/admin";




// import MDBSelect from "mdbreact";
// import {
//     DBRow, MDBCol, MDBBtn, MDBSelect, MDBSelectInput, MDBSelectOptions, MDBSelectOption
//   } from 'mdbreact';
export default class CreateBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '', imagePreviewUrl: '', name: '',
            catId: '',
            // avgRate: '',
            authId: '',
            authors: [],
            categories: [],
            redirect: false,
           
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5005/admin/')
            .then(response => {
                // console.log(response.data);
                this.setState({ categories: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:5005/admin/authors')
            .then(response => {
                // console.log(response.data);
                this.setState({ authors: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

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
    changeHandler = event => {
        console.log("ffff");
            this.setState({ [event.target.name]: event.target.value });
       
    };
    submitHandler = event => {
        console.log("99999");
        console.log(this.state.file);
        console.log("99999");
        event.preventDefault();
        event.target.className += " was-validated";
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.set('name',this.state.name);
        formData.set('catId',this.state.catId);
        formData.set('authId',this.state.authId);
        const config = {
            headers: {
                'content-type': 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
            }
        };
        console.log(formData);
        // const data = new FormData();
        // data.append('file', this.state.image);
        // data.append('filename', this.state.image.name);
        const obj = {
            name: this.state.name,
            catId: this.state.catId,
            // avgRate: this.state.avgRate,
            authId: this.state.authId,
            image: formData
        };
        console.log(obj);
        console.log("777777");
        if (event.target.checkValidity()) {
            axios.post('http://localhost:5005/admin/book', formData)
                .then(res => {
                    console.log(res.data);
                    if (res.data === "book was saved") {
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

                        <h4 class="p-3 f16 f400"> New Site </h4>
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
                                        placeholder="Name"
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

                            <MDBRow>
                                <MDBCol md="1" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterConfirmEx3"
                                        className="grey-custom-text "
                                    >
                                        Author
                             </label>
                                </MDBCol>
                                <MDBCol md="3" className="mb-4">
                                    <select className="custom-select browser-default form-custom-control" name='authId' onChange={this.changeHandler} value={this.state.authId} required>
                                        <option value="">Open this select menu</option>
                                        {this.state.authors.map(msgTemplate => (
                                            <option key={msgTemplate._id} value={msgTemplate._id}>
                                                {msgTemplate.fname + " " + msgTemplate.lname}
                                            </option>
                                        ))}
                                    </select>
                                    <div class="invalid-feedback">Example invalid custom select feedback</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>

                                <MDBCol md="1" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterConfirmEx3"
                                        className="grey-custom-text "
                                    >
                                        Category
                             </label>
                                </MDBCol>
                                <MDBCol md="3" className="mb-4">
                                    <select className="custom-select browser-default form-custom-control" name='catId' onChange={this.changeHandler} value={this.state.catId} required>
                                        <option value="">Open this select menu</option>
                                        {this.state.categories.map(msgTemplate => (
                                            <option key={msgTemplate._id} value={msgTemplate._id}>
                                                {msgTemplate.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div class="invalid-feedback">Example invalid custom select feedback</div>
                                    <div className="valid-feedback">Looks good!</div>
                                </MDBCol>
                            </MDBRow>
                            

                            <MDBBtn type="submit" className="yellow-background yellow-button  pointer white-text mb-4 mt-4" id="customButton">
                                submit
                      </MDBBtn>
                            {redirect && (
                                <Redirect to='/admin/books' />
                            )}
                        </form>
                    </div>
                </div>
            </div>
            </Admin>
        )
    }
}