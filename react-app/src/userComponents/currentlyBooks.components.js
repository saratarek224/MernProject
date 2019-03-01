import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
// import 'react-table/react-table-css'
import Pagination from "../components/paginatiom";

// import Admin from '../layouts/admin';
import UserLayout from '../layouts/userLayout'
export default class CurrentlyBooks extends Component {
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
        axios.get('http://localhost:5005/userBook/cread')
            .then(response => {
                console.log(response.data);
                this.setState({ books: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getBooksData();
        // this.getData();
    }

    changeHandler = event => {

        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state.authId);
    };
    render() {
        const data = this.state.books;
        const columns = [{
            Header: 'Name',
            accessor: 'bookName', // String-based value accessors!,
            // render: props => <input value={props.row.name} onChange={this.onChangeFct} />
        }, {
            Header: 'Author',
            accessor: 'authName',
           
        }, {
            Header: 'Rating',
            accessor: 'rate'
            //   accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: 'Average Rate',
            accessor: 'avgRate'
        }, {
            Header: 'Status',
            accessor: 'status'
        }
          

        ]

        return (
            <UserLayout>
        <div>         
            <div class="button-header mb-4 white-background p-3">

                <div class="white-background content-details mt-3">
                    <div class="content-header white-text grey-blue-background">
                        <h4 class="p-3 f16 f400"> Currently Reading </h4>
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
        </UserLayout>
        )


    }
}
