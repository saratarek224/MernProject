import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow.component';
import ReactTable from "react-table";
// import 'react-table/react-table-css'
import Pagination from "./paginatiom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBRow, MDBCol } from "mdbreact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Admin from '../layouts/admin';

export default class AllAuthors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [], fname: "", lname: '',
            // avgRate: '',
            email: '',
            image: '',
            _id: ''
        };
    }
    getData() {
        axios.get('http://localhost:5005/admin/authors')
            .then(response => {
                // console.log(response.data);
                this.setState({ authors: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.getData();
    }

    handleDelete(e) {
        // console.log("deleted " + e._id);
        // console.log(e);
      //  console.log(e._id);
       // console.log("hhhhh");
        axios.delete('http://localhost:5005/admin/author/' + e._id)
            .then(
                res => {
                    this.setState({
                        authors: this.state.authors.filter(function (iteme) {
                            console.log(iteme);
                            return iteme._id != e._id
                        })
                    })
                }

            )
            .catch(err => console.log(err))

    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    submitHandler = event => {
        let modalNumber = 'modal' + 4;
        event.preventDefault();
        event.target.className += " was-validated";
        const obj = {
            fname: this.state.fname, 
            lname: this.state.lname,
            email: this.state.email,
            image: this.state.email
        };
        if (event.target.checkValidity()) {
            axios.put('http://localhost:5005/admin/author/' + this.state._id, obj)

                .then(res => {
                    console.log(res.data);
                    if (res.data === "author updated!") {
                        console.log("sucess");
                        console.log("hhhhhhhhhhhhhhhhhhhh");
                        console.log(this.state._id);
                        // this.getBooksData();
                        this.setState({
                            [modalNumber]: !this.state[modalNumber],
                            authors: this.state.authors.map((iteme) => {
                                console.log(iteme);
                                console.log(this.state._id);
                                if (iteme._id == this.state._id) {
                                    Object.assign(iteme, { fname: obj.fname, lname: obj.lname, email: obj.email  })
                                    
                                }
                                return iteme;
                                // 

                            })

                            // name: data.name, catId: data.catId,
                            // avgRate: '',
                            // authId: data.authId,
                        });
                    } else {
                        console.log("error");
                    }
                }
                ).catch(function (error) {

                });
        }
    };
    toggle = (nr, data = null) => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber],
            name: ''

        });
        if (data != null) {         
            this.setState({
                fname: data.fname, lname: data.lname,
                // avgRate: '',
                email: data.email, _id: data._id
            });
        }
    }

    render() {
        const columns = [{
            Header: 'First Name',
            accessor: 'fname', // String-based value accessors!,
            // render: props => <input value={props.row.name} onChange={this.onChangeFct} />
        },{
            Header: 'Last Name',
            accessor: 'lname', // String-based value accessors!,
            // render: props => <input value={props.row.name} onChange={this.onChangeFct} />
        },{
            Header: 'Email',
            accessor: 'email', // String-based value accessors!,
            // render: props => <input value={props.row.name} onChange={this.onChangeFct} />
        }, {
            Header: 'Image',
            accessor: 'image',
            Cell: (row) => {
                return <div><img height={100} src={"http://localhost:5005/public/" + row.original.image} /></div>
            },
        }, {
            Header: 'Edit',
            Cell: row => (
                <div>
                    <button onClick={this.toggle(4, row.original)} className="action-icons"><i class="fas fa-pen-square "></i></button>
                    {/* <button onClick={() => this.handleEdit(row.original)}>Edit</button> */}
                    {/* <button onClick={() => this.handleDelete(row.original)}><i class="fas fa-trash"></i></button> */}
                </div>
            )
        }
            , {
            Header: 'Delete',
            Cell: row => (
                <div>
                    {/* <button onClick={this.toggle(4, row.original)}><i class="fas fa-pen-square"></i></button> */}
                    {/* <button onClick={() => this.handleEdit(row.original)}>Edit</button> */}
                    <button onClick={() => this.handleDelete(row.original)} className="action-icons"><i class="fas fa-trash action-icons"></i></button>
                </div>
            )

        }]

        return (
            <Admin>
        <div>

            <MDBModal isOpen={this.state.modal4} toggle={this.toggle(4)} size="lg">
                <form className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate>
                    <MDBModalHeader toggle={this.toggle(4)} className="half-grey-background white-text"> Edit Author </MDBModalHeader>
                    <MDBModalBody>
                        <input type="hidden" value={this.state._id} name="_id" />
                        <MDBRow>
                                <MDBCol md="2" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                        First Name
                                     </label>
                                </MDBCol>
                                <MDBCol md="4" className="mb-4">
                                    <input
                                         value={this.state.fname}
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
                                <MDBCol md="2" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                        Last Name
                                     </label>
                                </MDBCol>
                                <MDBCol md="4" className="mb-4">
                                    <input
                                        // value={this.state.name}
                                        value={this.state.lname}
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
                                <MDBCol md="2" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                        Email
                                     </label>
                                </MDBCol>
                                <MDBCol md="4" className="mb-4">
                                    <input
                                    value={this.state.email}
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
                        
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" className="yellow-background yellow-button  pointer white-text mb-4 mt-4">
                            submit
                      </MDBBtn>
                        <MDBBtn className="grey-blue-background" onClick={this.toggle(4)} >Close</MDBBtn>

                    </MDBModalFooter>
                </form>
            </MDBModal>
            <div class="button-header mb-4 white-background p-3">
                <div>
                    <div class="row ">
                        <div class="col-md-12">
                            <Link to={'/admin/authors/create'} className="yellow-button btn light-yellow-background pointer white-text">Add Author</Link>
                        </div>
                    </div>
                </div>
                <div class="white-background content-details mt-3">
                    <div class="content-header white-text grey-blue-background">
                        <h4 class="p-3 f16 f400"> Authors </h4>
                        <div class="clearfix"></div>
                    </div>
                    <div class="p-3"  >
                        <div class="row">
                            <div class="col-md-12">
                                <ReactTable
                                    data={this.state.authors}
                                    columns={columns}
                                    defaultPageSize={5} PaginationComponent={Pagination} className="table-responsive text-center table-bordered" />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        </Admin>
        )


    }
}
