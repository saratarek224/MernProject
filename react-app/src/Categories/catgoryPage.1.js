import React, { Component } from 'react';
import axios from 'axios';
import CategoryBooks from "./Info";
import Pagination from "../webComponents/Pagination";
import Web from "../layouts/webLayout";
import UserLayout from "../layouts/userLayout";
export default class categoryPage extends Component {

    // state ={currentBooks: [], categoryBooks: []};
    constructor(props) {
        super(props);
        this.state = {categoryName: '' , currentBooks: [], categoryBooks: []};
    }
    // state = { currentBooks: [], categoryBooks: [] };



    componentWillMount() {
        console.log("nnnnn");
        console.log(this.state.categoryBooks);
        console.log("nnnnn");
        this.setState({ categoryBooks: this.state.categoryBooks });
        console.log("nnnnn");
        console.log(this.state.categoryBooks);
        console.log("nnnnn");
        const currentBooks = this.state.categoryBooks.slice(0, 3);
        this.setState({ currentBooks });
    }

    onPageChanged = data => {
        const { categoryBooks } = this.state;
        const { currentPage, pageLimit } = data;
        const offset = (currentPage - 1) * pageLimit;
        const currentBooks = categoryBooks.slice(offset, offset + pageLimit);
        this.setState({ currentBooks });
    };


    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:5005/catgory/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data.myBooks);
                this.setState({ categoryName: response.data.catName, categoryBooks: response.data.myBooks });
                const currentBooks = this.state.categoryBooks.slice(0, 3);
                this.setState({ currentBooks });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        const { categoryBooks } = this.state;
        const totalBooks = categoryBooks.length;
        return (
            <Web>
                <div>
                    <h1 className="categoryName" style={{ marginTop: 55 }}>{this.state.categoryName}</h1>

                    <CategoryBooks books={this.state.currentBooks} />
                    <div style={{ display: "inline-flex" }} className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-row py-4 align-items-center">
                            <Pagination
                                totalRecords={totalBooks}
                                pageLimit={4}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged}
                            />
                        </div>
                    </div>

                </div>
            </Web>
        );
    }
}