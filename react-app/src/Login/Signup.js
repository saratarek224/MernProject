import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./Login.css";
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import Web from '../layouts/webLayout';
// import Toolbar  from '../webComponents/Toolbar';
// import Toolbar from '../webComponents/Toolbar';
// import SideDrawer from '../webComponents/SideDrawer/SideDrawer';
// import Backdrop from '../webComponents/Backdrop/Backdrop';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      file: '',
      imagePreviewUrl: ''
    };
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
    event.preventDefault();
    event.target.className += " was-validated";
    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.set('fname', this.state.fname);
    formData.set('lname', this.state.lname);
    formData.set('email', this.state.email);
    formData.set('password', this.state.password);
    const obj = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      image: formData
    };
    console.log(obj);
    console.log("777777");
    if (event.target.checkValidity()) {
      axios.post('http://localhost:5005/create', formData)
        .then(res => {
          console.log(res.data);
          if (res.data === "user was saved") {
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

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
        return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
};

backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
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
    // let backDrop;

    // if (this.state.sideDrawerOpen) {
    //     backDrop = <Backdrop click={this.backdropClickHandler} />;
    // }
    return (
      // <Web>
      <div style={{ height: '100%' }}>
                {/* <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backDrop} */}
        <div className="Login">
          <div className="cover">

            <form className="needs-validation"
              onSubmit={this.submitHandler}
              noValidate>
              <div className="login-bg">
              <h2>SIGNUP</h2>
                <FormGroup controlId="Fname" bsSize="large">
                  <MDBRow>
                    <MDBCol md="12" className="mb-1">
                      <label className="form-label"
                        htmlFor="defaultFormRegisterNameEx"
                      >
                        First Name
                      </label>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12" className="mb-1">
                      <input
                        // value={this.state.name}
                        name="fname"
                        onChange={this.changeHandler}
                        type="text"
                        id="Fname"
                        className="form-control form-custom-control"
                        placeholder="First Name"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                </FormGroup>
                <FormGroup controlId="Lname" bsSize="large">
                  <MDBRow>
                    <MDBCol md="12" className="mb-1">
                      <label className="form-label"
                        htmlFor="defaultFormRegisterNameEx"
                      >
                        Last Name
                      </label>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>

                    <MDBCol md="12" className="mb-1">
                      <input
                        name="lname"
                        onChange={this.changeHandler}
                        type="text"
                        id="Lname"
                        className="form-control form-custom-control"
                        placeholder="Last Name"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                </FormGroup>
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
                    <MDBCol md="12" className="mb-1">
                      <input
                        name="email"
                        onChange={this.changeHandler}
                        type="text"
                        id="Email"
                        className="form-control form-custom-control"
                        placeholder="Email"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>

                </FormGroup>
                <FormGroup controlId="Password" bsSize="large">
                  <MDBRow>
                    <MDBCol md="12" className="mb-1">
                      <label className="form-label"
                        htmlFor="defaultFormRegisterNameEx"
                      >
                        Password
                      </label>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12" className="mb-1">
                      <input
                        name="password"
                        onChange={this.changeHandler}
                        type="text"
                        id="Password"
                        className="form-control form-custom-control"
                        placeholder="Password"
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
                  </MDBRow>
                </FormGroup>
                <MDBRow>
                  <MDBCol md="12" className="mb-1">
                    <label
                      htmlFor="defaultFormRegisterNameEx"
                      className="grey-custom-text form-label"
                    >
                      Image
              </label>
                  </MDBCol>
                  <MDBCol md="3" className="mb-4">
                    <input className="fileInput"
                      type="file"
                      onChange={(e) => this._handleImageChange(e)} />
                  </MDBCol>
                </MDBRow>
                <MDBBtn type="submit" className="form-btn btn btn-primary btn-block   pointer white-text mb-4 mt-4" id="customButton">
                  submit
                      </MDBBtn>
                {redirect && (
                  <Redirect to='/webLogin' />
                )}
              </div>
            </form>

          </div>
        </div>
        </div>
    );
  }
}