import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            <Link to={"/catgory/"+ this.props.obj._id} className="nav-link">
              {this.props.obj.name}
            </Link>
          </td>
        </tr>
    );
  }
  
}

export default TableRow;