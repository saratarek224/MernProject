import React, { Component } from "react";
import Card from "./Card";

export default class CategoryBooks extends Component {
  render() {
    return (
      <div className="cards_container">

        {this.props.books.map(book => {
          return <Card bookName={book.name} authorName={book.author} />;
        })}
        
      </div>
    );
  }
}