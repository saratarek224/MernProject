import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Toolbar from '../webComponents/Toolbar/Toolbar';
import UserToolbar from '../webComponents/UserToolbar/Toolbar';
import SideDrawer from '../webComponents/SideDrawer/SideDrawer';
import Backdrop from '../webComponents/Backdrop/Backdrop';
import axios from 'axios';

import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router';

class UserLayout extends Component {
    state = {
        sideDrawerOpen: false
    };
    componentDidMount() {
        const token = localStorage.getItem('UserToken');
        if (token) {
            axios.defaults.headers.common['x-auth'] = token;
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
            <div class=" full-height">
                <div class="container-fluid h100 light-grey-background p0">
                    <div class="main-content ">
                        <div style={{ height: '100%' }}>
                            {/* <UserToolbar drawerToggleClickHandler={this.drawerToggleClickHandler} /> */}
                            <header className="toolbar">
                                <nav className="toolbar_navigation">

                                    <div className="toolbar_logo"><Link to="/">Good Reads</Link></div>
                                    <div className="space" />
                                    <div className="toolbar_navigation_items">
                                        <ul>
                                            {/* <li><Link to="/">Home</Link></li> */}
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
                            {/* {this.props.children} */}
                        </div>
                        <div class="row" style={{ paddingTop: '60px' }}>
                            <div class="col-md-3 sidebar half-grey-background pt-4 pb-4">
                                <div class="vertical-tabs pr-5" >
                                    <Nav variant="pills" defaultActiveKey="/allUserBooks">
                                        <LinkContainer to={'/allUserBooks'} activeClassName="active">
                                            <Nav.Item className=" mb-4 pointer light-grey-background pt-2 pb-2 pl-3" >
                                                All Books
                                             {/* <Nav.Link  className="nav-link grey-blue-text" > Books
                                                {/* <Link to={'/admin/books'}>Books</Link> */}
                                                {/* </Nav.Link>  */}
                                            </Nav.Item>
                                        </LinkContainer>
                                        <LinkContainer to={'/allReadBooks'} activeClassName="active">
                                            <Nav.Item className=" mb-4 pointer light-grey-background pt-2 pb-2 pl-3" >
                                                Read
                                             {/* <Nav.Link  className="nav-link grey-blue-text" > Books
                                                {/* <Link to={'/admin/books'}>Books</Link> */}
                                                {/* </Nav.Link>  */}
                                            </Nav.Item>
                                        </LinkContainer>

                                        <LinkContainer to={'/CurrentlyBooks'} activeClassName="active">
                                            <Nav.Item className=" mb-4 pointer light-grey-background pt-2 pb-2 pl-3" >
                                                Currenlty Reading

                                                </Nav.Item>
                                        </LinkContainer>
                                        <LinkContainer to={'/WantToReadBooks'} activeClassName="active">
                                            <Nav.Item className=" mb-4 pointer light-grey-background pt-2 pb-2 pl-3" >
                                                Want To read

                                                </Nav.Item>
                                        </LinkContainer>
                                    </Nav>
                                </div>
                            </div>
                            <div class="col-md-9 p-4 ">
                                {this.props.children}

                            </div>
                        </div>
                    </div>
                    <footer class="h8">
                        <div class="row text-center custom-footer h100 f600 dark-grey-background white-text">
                            <div class="col-md-12 pt-3 pb-3">
                                Good Reads Copy Right 2019
                                </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}
 export default withRouter(UserLayout);

//export default (UserLayout);