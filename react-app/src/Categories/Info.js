import React, { Component } from "react";
import Card from "./Card";

export default class CategoryBooks extends Component {
  render() {
    return (
      <div className="cards_container">

        {this.props.books.map(book => {
          console.log(book.bookName);
          return <Card bookName={book.bookName} bookImg={book.bookImg} authorName={book.authName} bookId={book.bookId} authorId={book.authId}/>;
        })}
        
      </div>
    );
  }
}