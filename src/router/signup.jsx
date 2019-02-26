import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import axios from 'axios';
import './style.css';

 class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: ""
    }
  }


  onSubmit = event => {
    event.preventDefault();

    const obj = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password

    };
    console.log(obj);
    axios.post('http://localhost:4000/create', JSON.stringify(obj))
      .then(res => console.log(res.data));

    this.setState({
      fname: "",
      lname: "",
      email: "",
      password: ""

    });

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form
          className="needs-validation"
          onSubmit={this.onSubmit}
          Validate
        >
          <h2>signup</h2>
          <MDBRow>
            <MDBCol md="10" className="mb-3">
              <br /><br />
              <input
                value={this.state.fname}
                name="fname"
                onChange={this.onChange}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                placeholder="First name"
                required
              />

            </MDBCol>
          </MDBRow>
          <br />
          <MDBRow>
            <MDBCol md="10" className="mb-3">

              <input
                value={this.state.lname}
                name="lname"
                onChange={this.onChange}
                type="text"
                id="defaultFormRegisterEmailEx2"
                className="form-control"
                placeholder="Last name"
                required
              />

            </MDBCol>
          </MDBRow>
          <br />
          <MDBRow>
            <MDBCol md="10" className="mb-3">

              <input
                value={this.state.email}
                onChange={this.onChange}
                type="email"
                id="defaultFormRegisterConfirmEx3"
                className="form-control"
                name="email"
                placeholder="Your Email address"
                required
              />

            </MDBCol>
          </MDBRow>
          <br />
          <MDBRow>
            <MDBCol md="10" className="mb-3">

              <input
                value={this.state.password}
                onChange={this.onChange}
                type="password"
                id="defaultFormRegisterConfirmEx4"
                className="form-control"
                name="password"
                placeholder="Your password"
                required
              />
            </MDBCol>
          </MDBRow>
          <br />
          <MDBRow>
            <MDBCol md="10" className="mb-3">
              <h4>Aready a memmber</h4>
            </MDBCol>
            <MDBCol md="2" className="mb-3">
              <strong><a href="/login">Login</a></strong>

            </MDBCol>

          </MDBRow>

          <br />
          <MDBBtn color="link" type="submit" className="but" >
            Submit
          </MDBBtn>
        </form>
      </div>
    );
  }
}

export default  Signup ;