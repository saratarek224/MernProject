import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import {
  MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol,
  MDBBtn, MDBCardGroup, MDBContainer} from "mdbreact";
import abouImage from './about.jpg';

export default class Homepage extends Component {

  render() {
    return (
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
                    <Link to="/about"><MDBBtn color="primary">Learn more</MDBBtn></Link>
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
                    This is a wider panel with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>

              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle tag="h5">Popular Books</MDBCardTitle>
                  <MDBCardText>
                    This panel has supporting text below as a natural lead-in to
                    additional content.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>

              <MDBCard>
                <MDBCardBody>
                  <MDBCardTitle tag="h5">Popular Categories</MDBCardTitle>
                  <MDBCardText>
                    This is a wider panel with supporting text below as a natural
                    lead-in to additional content. This panel has even longer
                    content than the first to show that equal height action.
                  </MDBCardText>
                </MDBCardBody>
              </MDBCard>

            </MDBCardGroup>
          </MDBContainer>
        </div>

      </div>


    );
  }
}