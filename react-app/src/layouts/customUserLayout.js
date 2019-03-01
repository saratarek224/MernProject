import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
 import UserToolbar from '../webComponents/UserToolbar/Toolbar';
import SideDrawer from '../webComponents/SideDrawer/SideDrawer';
import Backdrop from '../webComponents/Backdrop/Backdrop';
import axios from 'axios';

 import { withRouter } from 'react-router';

 class CustomUser extends Component {
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
    onLogout = event => {

        console.log("log out");
        localStorage.removeItem('UserToken');
        // <Redirect to='/adminLogin' />
        this.props.history.push("/webLogin");

    };

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
                {/* <UserToolbar drawerToggleClickHandler={this.drawerToggleClickHandler} /> */}
                <header className="toolbar">
                                <nav className="toolbar_navigation">

                                    <div className="toolbar_logo"><Link to="/">Good Reads</Link></div>
                                    <div className="space" />
                                    <div className="toolbar_navigation_items">
                                        <ul>
                                            <li><Link to="/allUserBooks"> Panel </Link></li>
                                            <li><Link to="/books">Books</Link></li>
                                            <li><Link to="/authors">Authors</Link></li>
                                            <li><Link to="/catgory">Categories</Link></li>
                                            <li><input type="search" placeholder="search" /></li>
                                            <li><Link to="/">
                                                <img style={{ height: '50px' }}  src={"http://localhost:5005/public/" + localStorage.getItem('image')}
                                                    alt="Book Name" /> </Link>
                                            </li>
                                            <li><label> {localStorage.getItem('user_name')} </label></li>
                                            <li>  <button className="logout" onClick={this.onLogout}>
                                                Logout
                                </button></li>
                                        </ul>
                                    </div>
                                </nav>
                            </header>
                <SideDrawer show={this.state.sideDrawerOpen} />
                {backDrop}
                {this.props.children}
            </div>
        );
    }
}
 export default withRouter(CustomUser);

//export default (CustomUser);