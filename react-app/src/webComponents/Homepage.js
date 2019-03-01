import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol,
  MDBBtn, MDBCardGroup, MDBContainer
} from "mdbreact";
import abouImage from '../images/about.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Web from '../layouts/webLayout';
import axios from 'axios';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularCategories:[] , popularAurhors:[] ,popularBooks:[]
    };
}

  componentDidMount() {
    axios.get('http://localhost:5005/catgory/popular')
      .then(response => {
        console.log(response.data)
        this.setState({ popularCategories: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5005/author/popular')
      .then(response => {
        console.log(response.data)
        this.setState({ popularAurhors: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:5005/book/popular')
      .then(response => {
        console.log(response.data)
        this.setState({ popularBooks: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render() {
    return (
      <Web>
        <div>
          <div className="banner">
            <div className="shadow">
              <div className="title1">BOOKCASE is a company created by authors, for authors</div>
              <div className="title2"></div>
            </div>
          </div>
          <div className="aboutus">
            <MDBContainer>
              <MDBRow className="mb-4">
                <MDBCol sm="6">
                  <MDBCard className="new_card">
                    <MDBCardTitle className="about-title">About us</MDBCardTitle>
                    <MDBCardText className="about-body">
                      With supporting text below as a natural lead-in to additional
                      content.
                      With supporting text below as a natural lead-in to additional
                      content.
                      With supporting text below as a natural lead-in to additional
                      content.
                      </MDBCardText>
                    
                  </MDBCard>
                </MDBCol>

                <MDBCol sm="6">
                  <MDBCard className="new_card">
                    <img src={abouImage} alt="aboutus" />
                  </MDBCard>
                </MDBCol>

              </MDBRow>
            </MDBContainer>
          </div>

          <div className="popular">
            <MDBContainer>
              <MDBCardGroup deck>
                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle tag="h5">Popular Author</MDBCardTitle>
                    <MDBCardText>
                      {this.state.popularAurhors.map(item => {
                        // console.log(item.review);
                        return <div>{item.fname + " " + item.lname}</div>;
                      })}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle tag="h5">Popular Books</MDBCardTitle>
                    <MDBCardText>
                    {this.state.popularBooks.map(item => {
                        // console.log(item.review);
                        return <div>{item.name}</div>;
                      })}
                  </MDBCardText>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard>
                  <MDBCardBody>
                    <MDBCardTitle tag="h5">Popular Categories</MDBCardTitle>
                    <MDBCardText>
                    {this.state.popularCategories.map(item => {
                        // console.log(item.review);
                        return <div>{item.name}</div>;
                      })}
                  </MDBCardText>
                  </MDBCardBody>
                </MDBCard>

              </MDBCardGroup>
            </MDBContainer>
          </div>

          <div className="footer">
            <p>Copyright 2019</p>
          </div>

        </div>

      </Web>
    );
  }
}