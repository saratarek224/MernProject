import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import axios from 'axios';
import './style.css';
import './Login.css';

class FormsPage extends React.Component {
  state = {
    username:"",
    password:""
    
  };

  submitHandler = event => {
    event.preventDefault();
    const obj = {
        username: this.state.username,
        password: this.state.password
        
     };

     axios.post('', obj)
         .then(res => console.log(res.data));

     this.setState({
        username: '',
       password:''
     
     })
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form
          className="needs-validation"
          onSubmit={this.submitHandler}
          Validate
        >
        <h2>Login</h2>
           <br/><br/>
          <MDBRow>
          <MDBCol md="10" className="mb-3">
            
              <input
                value={this.state.fname}
                name="fname"
                onChange={this.changeHandler}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                placeholder="username"
                required
              />
              </MDBCol>
              </MDBRow>
              <br />
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
          <MDBRow>
          <MDBCol md="6" className="mb-3">
        <h3>New to us</h3>
           </MDBCol>
           <MDBCol md="6" className="mb-3">
        <strong><a href="/signup">Signup</a></strong>
        
        </MDBCol>

       </MDBRow>
         
          <MDBBtn color="primary" type="submit" className="but">
            Submit 
          </MDBBtn>
        </form>
      </div>
    );
  }
}

export default FormsPage;