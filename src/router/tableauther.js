import React, { Component } from 'react';
import { Link } from '@reach/router';
import Img from 'react-image'

class TableRow extends Component {
  render() {
    return (

      <tr>
        <td className="td">
        <img src="images.png" alt="Smiley face" height="42" width="42"/> 
          <Link className="authorname" to={"/authors/" + this.props.obj._id} className="nav-link">

            {this.props.obj.fname} {this.props.obj.lname}

          </Link>
          
        </td>
        {/* <td className="td">
          {this.props.obj.email}
          

        </td> */}
      </tr>

    );
  }

}

export default TableRow;

