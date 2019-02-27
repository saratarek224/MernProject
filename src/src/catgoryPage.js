import React, { Component } from 'react';
import axios from 'axios';

export default class categoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = { business: [], categoryName: '' };
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get('http://localhost:4000/catgory/' + this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({ categoryName: response.data.name });
            })
            .catch(function (error) {
                console.log(error);
            })
        
    }
    render() {
        return (
            <div>
                <h1 style={{ marginTop: 55 }}>{this.state.categoryName}</h1>

                
                
            </div>
        );
    }
}