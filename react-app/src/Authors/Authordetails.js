import React, { Component } from "react";
//import StarRatings from './react-star-ratings';
import { MDBCard, MDBRow, MDBCol, MDBContainer } from "mdbreact";
//import { Link } from 'react-router-dom';
import Web from '../layouts/webLayout';
import CustomUser from '../layouts/customUserLayout';
import axios from 'axios';

export default class Authordetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: [], authorBooks: []
        };
    }
    componentDidMount() {
        console.log("hhhhh");
        console.log(this.props.match.params.id);
        axios.get('http://localhost:5005/author/' + this.props.match.params.id)
            .then(response => {
                console.log("come");
                console.log(response.data);
                this.setState({
                    author: response.data, authorBooks: response.data.output
                },
                );
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <CustomUser>
                <div className="general-bg">
                    <div className="bg-shadow ">
                        <br></br>
                        <br></br>
                        <br></br>

                        <MDBContainer>
                            <MDBRow className="mb-4">
                                <MDBCol sm="3">
                                    <MDBCard className="new_card ">
                                    <img src={"http://localhost:5005/public/" + this.state.author.authImg}
                                                                        className="card-img-top" alt="Book Name" />

                                    </MDBCard>
                                </MDBCol>

                                <MDBCol sm="9">
                                    <MDBCard style={{ height: "250px" }} className="new_card">
                                        <h1>{this.state.author.authName}</h1>
                                        {/* <p>Birthdate</p> */}


                                    </MDBCard>
                                </MDBCol>

                            </MDBRow>

                            <MDBRow className="mb-4">
                                <MDBCol sm="12">
                                    {this.state.authorBooks.map(item => {
                                        return <MDBCard style={{ boxShadow: "none" }} className="new_card row-bg" >
                                            <div className="reviews">
                                                <div>
                                                    {/* <h3>Author's Books</h3> */}
                                                    <table border="1" className="table table-striped" style={{ marginTop: 55 }}>
                                                        <tbody>
                                                            <tr style={{ border: "1px solid gray" }}>
                                                                <td>
                                                                    {/* <img src="https://secure.gravatar.com/avatar/67b9c20b6ee38d1d50f2114795981fbf?s=50&d=mm&r=g"
                                                                        alt="Book Name" /> */}
                                                                    <img src={"http://localhost:5005/public/" + item.image}
                                                                        className="card-img-top" alt="Book Name"  style={{ width: "250px" }} />
                                                                </td>
                                                                <td> {item.name}
                                                                    <br></br>
                                                                    {/* <div className="ratings">rating</div> */}
                                                                </td>
                                                                <td>
                                                                    {/* <select>
                                                                    <option value="wnattoread">want to read</option>
                                                                    <option value="read">read</option>
                                                                    <option selected value="reading">reading</option>
                                                                </select> */}
                                                                    <br></br>
                                                                    <div className="ratings">ratings</div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </MDBCard>
                                    })}
                                </MDBCol>

                            </MDBRow>
                        </MDBContainer>
                    </div>
                </div>
            </CustomUser>
        )
    }
}