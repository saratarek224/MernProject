import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    return (
      <div className="book-container" style={{ width: "18rem" }}>
      <img src={"http://localhost:5005/public/" + this.props.authImg} className="card-img-top"  />

      <div className="card-body">
      <Link className="authorname" to={"/authors/" + this.props.authorId} className="nav-link">
          {this.props.authorName}
        </Link>
        
      </div>

    </div>
    );
  }
}