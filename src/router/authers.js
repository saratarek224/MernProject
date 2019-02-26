import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './tableauther';

 class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { business: [] };
  }
  componentDidMount() {
    console.log("jjjj");
    axios.get('http://localhost:4000/author/')
      .then(response => {
        console.log("7777777");
        console.log(response.data)
        this.setState({ business: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  tabRow() {
    return this.state.business.map(function (object, i) {
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Author</h1>
        <table border="1" className="table table-striped" >
          {/* <thead>
            <tr>
              <th className='th'>Author</th>
            </tr>
          </thead> */}
          
          <tbody>
            {this.tabRow()}
          </tbody>
        </table>
        {/* //<p className="p" >{this.tabRow()}</p> */}
      </div>
    );
  }
}
export default Index;