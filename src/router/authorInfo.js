import React, { Component } from 'react';
import axios from 'axios';

import './authorTable.css'

export default class AuthorInfo extends Component {

    constructor(props) {
        super(props);
        this.state = { business: [], authorName: '' };
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:4000/author/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({ authorName: response.data.fname });
            })
            .catch(function (error) {
                console.log(error);
            })

        // axios.get('http://localhost:4000/book/' + this.props.match.params.id)
        // .then(response => {
        //     console.log(response);
        //     this.setState({ categoryName: response.data.name });
        // })
        // .catch(function (error) {
        //     console.log(error);
        // })
    }
    render() {
        return (
            <div>
                <h1>{this.state.authorName}</h1>

            </div>
        );
    }
}