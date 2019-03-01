import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    return (
      <div className="book-container" style={{ width: "18rem" }}>
      <img src={"http://localhost:5005/public/" + this.props.bookImg} className="card-img-top" alt="Book Name" />
      {/* <img src="https://hq.recyclist.co/wp-content/uploads/2015/02/books-300x300.jpg" className="card-img-top" alt="Book Name"/> */}

      <div className="card-body">
      <Link  to={"/books/" + this.props.bookId} className="nav-link">
          {this.props.bookName}
        </Link>
        
      <Link className="authorname" to={"/authors/" + this.props.authorId} className="nav-link">
          {this.props.authorName}
        </Link>
        
        {/* <Link to="">{this.props.bookName}</Link>
        <br />
        <Link to="">By {this.props.authorName}</Link> */}
      </div>

    </div>
    );
  }
}