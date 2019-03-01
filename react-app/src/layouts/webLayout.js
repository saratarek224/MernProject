import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Toolbar from '../webComponents/Toolbar/Toolbar';
import SideDrawer from '../webComponents/SideDrawer/SideDrawer';
import Backdrop from '../webComponents/Backdrop/Backdrop';
import axios from 'axios';

 import { withRouter } from 'react-router';

 class Web extends Component {
    state = {
        sideDrawerOpen: false
    };
    componentDidMount() {
        const token = localStorage.getItem('UserToken');
        if (token) {
            axios.defaults.headers.common['x-auth'] = token;
            console.log("wen");
        }
        else {
            delete axios.defaults.headers.common['x-auth'];
            // <Redirect to='/adminLogin' />
            this.props.history.push("/webLogin");
        }
    }

    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen };
        });
    };

    backdropClickHandler = () => {
        this.setState({ sideDrawerOpen: false });
    };

    render() {
        let backDrop;

        if (this.state.sideDrawerOpen) {
            backDrop = <Backdrop click={this.backdropClickHandler} />;
        }
        return (
            <div style={{ height: '100%' }}>
                <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backDrop}
                {this.props.children}
            </div>
        );
    }
}
// export default withRouter(Web);

// export default (Web);

export default withRouter(Web);