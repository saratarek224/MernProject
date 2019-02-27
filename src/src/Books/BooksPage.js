import React, { Component } from "react";
import CategoryBooks from "./Info";
import Pagination from "../Pagination";

export default class BooksPage extends Component {
  state = { currentBooks: [], categoryBooks: [] };

  categoryBooks = [
    { name: "Origin", author: "Dan Brown" },
    { name: "Inferno", author: "Dan Brown" },
    { name: "The Lost Symbol", author: "Dan Brown" },
    { name: "The DaVinci Code", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
    { name: "Angels & Demons", author: "Dan Brown" },
  ];

  componentWillMount() {
    this.setState({ categoryBooks: this.categoryBooks });
    const currentBooks = this.categoryBooks.slice(0, 3);
    this.setState({ currentBooks });
  }

  onPageChanged = data => {
    const { categoryBooks } = this.state;
    const { currentPage, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentBooks = categoryBooks.slice(offset, offset + pageLimit);
    this.setState({ currentBooks });
  };

  render() {
    const { categoryBooks } = this.state;
    const totalBooks = categoryBooks.length;

    return (
      <div style={{ textAlign: "center" }}>
        <CategoryBooks books={this.state.currentBooks} />
        <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
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
    );
  }
}