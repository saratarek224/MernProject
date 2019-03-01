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

export default class AllBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [], name: "", catId: '',
            // avgRate: '',
            authId: '',
            authors: [],
            categories: [],
            _id: '',
            fullpath: ''
        };
    }
    getBooksData() {
        axios.get('http://localhost:5005/admin/books')
            .then(response => {
                console.log(response.data);
                this.setState({ books: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    getData() {

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
    componentDidMount() {
        this.getBooksData();
        this.getData();
    }

    handleDelete(e) {
        // console.log("deleted " + e._id);
        // console.log(e);

        axios.delete('http://localhost:5005/admin/book/' + e._id)
            .then(
                res => {
                    this.setState({
                        books: this.state.books.filter(function (iteme) {
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
        console.log(this.state.authId);
    };
    submitHandler = event => {
        let modalNumber = 'modal' + 4;

        event.preventDefault();
        event.target.className += " was-validated";
        const obj = {
            name: this.state.name,
            catId: this.state.catId,
            authId: this.state.authId
        };

        if (event.target.checkValidity()) {
            axios.put('http://localhost:5005/admin/book/' + this.state._id, obj)
                .then(res => {
                    if (res.data === "Book updated!") {
                        this.getBooksData();
                        this.setState({
                            [modalNumber]: !this.state[modalNumber],
                            // books: this.state.books.map((iteme) => {

                            //     if (iteme._id === this.state._id) {
                            //         //                  
                            //         //    Object.assign(iteme, { name: obj.name, catId: obj.catId, authId: obj.authId })
                            //         Object.assign(iteme, { name: obj.name, authId: obj.authId, catId: obj.catId })
                            //     }
                            //     return iteme;
                            //     //                         // 

                            // })
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
            name: '',
            catId: '',
            authId: ''
            // name: data.name, catId: data.catId,
            // avgRate: '',
            // authId: data.authId,
        });
        if (data != null) {
            this.setState({

                name: data.name, catId: data.catId[0],
                // avgRate: '',
                authId: data.authId[0], _id: data._id
            });
        }
    }

    render() {
        const data = this.state.books;
        const columns = [{
            Header: 'Name',
            accessor: 'name', // String-based value accessors!,
            // render: props => <input value={props.row.name} onChange={this.onChangeFct} />
        }, {
            Header: 'Image',
            accessor: 'image',
            Cell: (row) => {
                return <div><img height={100} src={"http://localhost:5005/public/" + row.original.image} /></div>
            },
        }, {
            Header: 'Author',
            accessor: 'authId'
            //   accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: 'Category',
            accessor: 'catId'
        }, {
            Header: 'Average Rate',
            accessor: 'avgRate'
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
                    <MDBModalHeader toggle={this.toggle(4)} className="half-grey-background white-text"> Edit Book </MDBModalHeader>
                    <MDBModalBody>
                        <input type="hidden" value={this.state._id} name="_id" />
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
                                    value={this.state.name}
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
                                    htmlFor="defaultFormRegisterConfirmEx3"
                                    className="grey-custom-text "
                                >
                                    Author
                             </label>
                            </MDBCol>
                            <MDBCol md="3" className="mb-4">
                                <select className="custom-select browser-default form-custom-control" name='authId' onChange={this.changeHandler} value={this.state.authId} required placeholder="Deleted User">
                                    {/* if (!this.state.authors.includes(this.state.authId)){ */}

                                    {/* // <option>Deleted User</option> */}
                                    {/* } */}
                                    {/* <option>Deleted User</option> */}
                                    {/* <option value =>Deleted User</option> */}
                                    {/* {this.state.authors.push({})} */}
                                    {this.state.authors.map(msgTemplate => (

                                        <option key={msgTemplate._id} value={msgTemplate._id}>
                                            {msgTemplate.fname + " " + msgTemplate.lname}
                                        </option>
                                    ))}
                                    {/* <option  value="" >Deleted</option> */}
                                    {/* {this.state.authors.map((msgTemplate) => {
                                        if (msgTemplate._id === this.state.authId) {
                                            
                                            console.log("becames " + msgTemplate.fname);
                                            return <option key={msgTemplate._id} value={msgTemplate._id} selected>
                                                {msgTemplate.fname + " " + msgTemplate.lname}
                                            </option>
                                        } else {
                                            return <option key={msgTemplate._id} value={msgTemplate._id} >
                                                {msgTemplate.fname + " " + msgTemplate.lname}
                                            </option>
                                        }
                                    })} */}

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
                                    {/* <option  value="" >Deleted</option> */}
                                    {this.state.categories.map((msgTemplate) => {

                                        if (msgTemplate._id == this.state.catId) {
                                            return <option key={msgTemplate._id} value={msgTemplate._id} selected>
                                                {msgTemplate.name}
                                            </option>
                                        } else {
                                            return <option key={msgTemplate._id} value={msgTemplate._id}>
                                                {msgTemplate.name}
                                            </option>
                                        }
                                    })}
                                </select>
                                <div class="invalid-feedback">Example invalid custom select feedback</div>
                                <div className="valid-feedback">Looks good!</div>
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
                            <Link to={'/admin/books/create'} className="yellow-button btn light-yellow-background pointer white-text">Add Book</Link>
                        </div>
                    </div>
                </div>
                <div class="white-background content-details mt-3">
                    <div class="content-header white-text grey-blue-background">
                        <h4 class="p-3 f16 f400"> Books </h4>
                        <div class="clearfix"></div>
                    </div>
                    <div class="p-3"  >
                        <div class="row">
                            <div class="col-md-12">
                                <ReactTable
                                    data={this.state.books}
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
