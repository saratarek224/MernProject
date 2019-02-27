import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    return (
      <div className="book-container" style={{ width: "18rem" }}>
        <img
          src="https://via.placeholder.com/300"
          className="card-img-top"
          alt="Book Name"
        />
        <div className="card-body">
          <Link to="">{this.props.bookName}</Link>
          <br />
          <Link to="">By {this.props.authorName}</Link>
        </div>
      </div>
    );
  }
}