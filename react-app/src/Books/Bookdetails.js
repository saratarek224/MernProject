import React, { Component } from "react";
//import StarRatings from './react-star-ratings';
import { Button } from "react-bootstrap";
import {
    MDBCard, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBInput
} from "mdbreact";
import { Link } from 'react-router-dom';
import Web from '../layouts/webLayout';
import axios from 'axios';
import { faComment } from '@fortawesome/free-solid-svg-icons'
import CustomUser from '../layouts/customUserLayout';

export default class Bookdetails extends Component {
    constructor(props) {
        // console.log("gggdgdgd");
        super(props);
        this.state = {
            book: [], review: [], comment: '', status: ''
        };



        // console.log("6666");
    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    changeStatusHandler = event => {
        console.log("changeChange");
        console.log(event.target.value);
        this.setState({ status: event.target.value });
        const obj = {
            status: event.target.value
        };
        console.log(event.target.value);
        axios.put('http://localhost:5005/userBook/status/' + this.props.match.params.id, obj)
            .then(res => {
                // console.log(res.data);
                if (res.data === "status updated") {
                    console.log("sucess");
                    this.getBookStatus();

                } else {
                    console.log("error");
                }
            }
            ).catch(function (error) {
                console.log("errorrrrrrrrrrrrr4");
            });
    }
    submitHandler = event => {

        event.preventDefault();
        event.target.className += " was-validated";
        const obj = {
            review: this.state.comment,
        };
        if (event.target.checkValidity()) {
            axios.post('http://localhost:5005/userBook/bookReview/' + this.state.book.bookId, obj)

                .then(res => {
                    console.log(res.data);
                    if (res.data === "bookReview was saved") {
                        this.getData();

                    } else {
                        console.log("error");
                    }
                }
                ).catch(function (error) {

                });
        }
    };
    getData() {
        axios.get('http://localhost:5005/book/' + this.props.match.params.id)
            .then(response => {
                // console.log(response.data);
                this.setState({ book: response.data, review: response.data.review }

                );
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getBookStatus() {
        axios.get('http://localhost:5005/userBook')
            .then(response => {
                console.log("55555");
                console.log(response.data);
                console.log("777777");
                for (var i = 0; i < response.data.length; i++) {
                    console.log(this.props.match.params.id);
                    console.log(response.data[i].bookId);
                    if (response.data[i].bookId == this.props.match.params.id) {
                        console.log(response.data[i].bookId);
                        this.setState({ status: response.data[i].status });
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        console.log("infobook");
        // console.log(this.props.match.params.id);
        axios.get('http://localhost:5005/book/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({ book: response.data, review: response.data.review }

                );
            })
            .catch(function (error) {
                console.log(error);
            })
        this.getBookStatus();
    }
    render() {
        return (
            <CustomUser>
                <div>
                    <MDBContainer className="book-detailes">
                        <MDBRow className="mb-4">
                            <MDBCol sm="3">
                                <MDBCard className="new_card">
                                    {/* <img src="https://hq.recyclist.co/wp-content/uploads/2015/02/books-300x300.jpg"
                                        className="card-img-top" alt="Book Name" /> */}
                                        <img  src={"http://localhost:5005/public/" + this.state.book.bookImg}
                                             className="card-img-top"        alt="Book Name" />
                                    <select className="book-rating" name="status" onChange={this.changeStatusHandler} value={this.state.status}>
                                        <option key="" value=''>choose Book Status</option>
                                        <option key="Want To Read" value="Want To Read">want to read</option>
                                        <option key="Read" value="Read">read</option>
                                        <option key="Currently Reading" value="Currently Reading">Currently Reading</option>
                                    </select>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol sm="9">
                                <MDBCard className="new_card">
                                    <h1>{this.state.book.bookName}</h1>
                                    <Link to=""> By : {this.state.book.authName}</Link>
                                    <Link to=""> {this.state.book.catName} </Link>

                                    <div className="ratings">


                                    </div>


                                </MDBCard>
                            </MDBCol>

                        </MDBRow>

                        <MDBRow className="mb-4">
                            <MDBCol sm="12">
                                <MDBCard className="new_card">
                                    <div className="reviews">
                                        <h3>Reviews</h3>
                                        {this.state.review.map(item => {
                                            console.log(item.review);
                                            return <div>{item.review}</div>;
                                        })}
                                    </div>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>

                        <MDBRow className="mb-4">
                            <MDBCol sm="12">
                                <MDBCard className="new_card">
                                    <div className="review-bg">
                                        <div className="add_reviews ">
                                            <h3>Add Review</h3>
                                            <form
                                                className="needs-validation"
                                                onSubmit={this.submitHandler}
                                                noValidate

                                            >
                                                <MDBRow>

                                                    <MDBCol md="10" className="mb-4 ml-4 mr-4">

                                                        <MDBInput type="textarea" label="Material textarea" rows="5" name="comment" className="form-control form-custom-control"
                                                            onChange={this.changeHandler} required />

                                                        <div className="valid-feedback">Looks good!</div>
                                                    </MDBCol>
                                                </MDBRow>



                                                <MDBBtn type="submit" className="yellow-background yellow-button  pointer white-text mb-4 mt-4" id="customButton">
                                                    submit
                                                </MDBBtn>
                                            </form>
                                        </div>
                                    </div>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
            </CustomUser>
        )
    }
}