import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
 import UserLayout from '../layouts/userLayout';
import Web from "../layouts/webLayout";
import CustomUser from '../layouts/customUserLayout';
export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('http://localhost:5005/catgory')
        .then(response => {
          this.setState({ business: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.business.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <CustomUser>
        <div>
          <table border = "1" className="table table-striped" style={{ marginTop: 55 }}>
            <thead>
              <tr>
                <th className="cat-head">categories</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
        </CustomUser>
      );
    }
  }