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

export default class AllCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [], name: "",
            _id: ''
        };
    }
    getData() {
        axios.get('http://localhost:5005/admin')
            .then(response => {
                // console.log(response.data);
                this.setState({ categories: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidMount() {
        this.getData();
    }

    handleDelete(e) {
        axios.delete('http://localhost:5005/admin/catgory/' + e._id)
            .then(
                res => {
                    this.setState({
                        categories: this.state.categories.filter(function (iteme) {
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
            name: this.state.name, 
            
        };
        if (event.target.checkValidity()) {
            axios.put('http://localhost:5005/admin/catgory/' + this.state._id, obj)
                .then(res => {
                    console.log(res.data);
                    if (res.data === "catgory updated!") {                       
                        this.setState({
                            [modalNumber]: !this.state[modalNumber],
                            categories: this.state.categories.map((iteme) => {
                                console.log(iteme);
                                console.log(this.state._id);
                                if (iteme._id == this.state._id) {
                                    Object.assign(iteme, { name: obj.name  })
                                    
                                }
                                return iteme;
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
                name: data.name , _id: data._id
            });
        }
    }

    render() {
        const columns = [{
            Header: 'Name',
            accessor: 'name', // String-based value accessors!,
            // render: props => <input value={props.row.name} onChange={this.onChangeFct} />
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
                    <MDBModalHeader toggle={this.toggle(4)} className="half-grey-background white-text"> Edit Category </MDBModalHeader>
                    <MDBModalBody>
                        <input type="hidden" value={this.state._id} name="_id" />
                        <MDBRow>
                                <MDBCol md="2" className="mb-4">
                                    <label
                                        htmlFor="defaultFormRegisterNameEx"
                                        className="grey-custom-text "
                                    >
                                         Name
                                     </label>
                                </MDBCol>
                                <MDBCol md="4" className="mb-4">
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
                            <Link to={'/admin/categories/create'} className="yellow-button btn light-yellow-background pointer white-text">Add Category</Link>
                        </div>
                    </div>
                </div>
                <div class="white-background content-details mt-3">
                    <div class="content-header white-text grey-blue-background">
                        <h4 class="p-3 f16 f400"> Categories </h4>
                        <div class="clearfix"></div>
                    </div>
                    <div class="p-3"  >
                        <div class="row">
                            <div class="col-md-12">
                                <ReactTable
                                    data={this.state.categories}
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
