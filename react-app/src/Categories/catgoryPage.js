import React, { Component } from 'react';
import axios from 'axios';
import CategoryBooks from "./Info";
import Pagination from "../webComponents/Pagination";
import Web from "../layouts/webLayout";
import UserLayout from "../layouts/userLayout";
import paginate from 'paginate-array';
import Card from "./Card";
import CustomUser from '../layouts/customUserLayout';
export default class categoryPage extends Component {

  // state ={currentBooks: [], categoryBooks: []};
  constructor(props) {
    super(props);

    this.state = {
      catBooks: [],
      categoryName : '',
      size: 1,
      page: 1,
      currPage: null
    }

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5005/catgory/' + this.props.match.params.id)
      .then(response => response.data.myBooks
        

      ).then(catBooks => {
        const { page, size } = this.state;

        const currPage = paginate(catBooks, page, size);

        this.setState({
          ...this.state,
          catBooks,
          currPage
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  previousPage() {
    const { currPage, page, size, catBooks } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(catBooks, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, catBooks } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(catBooks, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  handleChange(e) {
    const { value } = e.target;
    const { catBooks, page } = this.state;

    const newSize = +value;
    const newPage = 1;
    const newCurrPage = paginate(catBooks, newPage, newSize);

    this.setState({
      ...this.state,
      size: newSize,
      page: newPage,
      currPage: newCurrPage
    });
  }

  render() {
    const { page, size, currPage } = this.state;

    return (
      <CustomUser>
        <div>
          <h1 style={{ marginTop: 55 }}>{this.state.categoryName}</h1>
          {/* <div>
                  <label for="size">Size</label>
                  <select name="size" id="size" onChange={this.handleChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                </div> */}
          {currPage &&
            <ul>
              {currPage.data.map(book => {
                return <Card bookName={book.bookName} bookImg={book.bookImg} authorName={book.authName} bookId={book.bookId} authorId={book.authId} />;
              })}
            </ul>
          }

          <div className="pag">
            <button className="pagination_points" onClick={this.previousPage}>&laquo;</button>
            <div class="lpagination"> <span> {page} </span> </div>
            {/* <div> Number of Pages is size: {size} , Press Next and Previous to navigate </div> */}
            <button className="pagination_points" onClick={this.nextPage}> &raquo; </button>
          </div>

        </div>
      </CustomUser>
    )
  }
}

