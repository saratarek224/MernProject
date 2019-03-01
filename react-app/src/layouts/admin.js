import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import AllBooks from '../components/allBooks.components';
// import CreateBook from '../components/createBook.component';
// import AllAuthors from '../components/allAuthors.components';
// import CreateAuthor from '../components/createAuthor.component';
// import AllCategories from '../components/allCategories.components';
// import CreateCategory from '../components/createCategory.components';
import axios from 'axios';
//import Create from '../components/create.component';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import '../css/main.css';
import { withRouter } from 'react-router';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/main.css';
class Admin extends React.PureComponent {

    componentDidMount() {
        const token = localStorage.getItem('AdminToken');
        if (token) {
            axios.defaults.headers.common['x-auth'] = token;
        }
        else {
            delete axios.defaults.headers.common['x-auth'];
            // <Redirect to='/adminLogin' />
        }
    }
    onLogout = event => {

        console.log("log out");
        localStorage.removeItem('AdminToken');
        // <Redirect to='/adminLogin' />
        this.props.history.push("/adminLogin");

    };

    render() {
        return (
            // <Router>
            <div class=" full-height">
                <div class="container-fluid h100 light-grey-background p0">
                    <div class="main-content ">
                        <Navbar bg="dark" variant="dark" >
                            <div class="row" style={{ width: '100%' }} >
                                <div class="col-md-3">
                                    <Navbar.Brand href="#home">
                                        <img
                                            alt=""
                                            src="http://clipart-library.com/images/pcqKd9nRi.png"
                                            width="40"
                                            height="40"
                                            className="d-inline-block align-top dark-grey-background"
                                        />
                                        {'Good Reads'}
                                    </Navbar.Brand>
                                </div>
                                <div class="col-md-6">

                                </div>
                                <div class="col-md-3 mt-2">
                                    {/* <div className="floatRight"> */}
                                        <button className="logout" onClick={this.onLogout}>
                                            Logout
                                </button>
                                        <div className="clear">
                                        </div>

                                    {/* </div> */}
                                </div>
                            </div>
                        </Navbar>
                        <div class="row">
                            <div class="col-md-3 sidebar half-grey-background pt-4 pb-4">
                                <div class="vertical-tabs pr-5" >
                                    <Nav variant="pills" defaultActiveKey="/admin/books">
                                        <LinkContainer to={'/admin/books'} activeClassName="active">
                                            <Nav.Item className=" mb-4 pointer light-grey-background pt-2 pb-2 pl-3" >
                                                Books
                                             {/* <Nav.Link  className="nav-link grey-blue-text" > Books
                                                {/* <Link to={'/admin/books'}>Books</Link> */}
                                                {/* </Nav.Link>  */}
                                            </Nav.Item>
                                        </LinkContainer>
                                        <LinkContainer to={'/admin/authors'} activeClassName="active">
                                            <Nav.Item className=" mb-4 pointer light-grey-background pt-2 pb-2 pl-3" >
                                                Authors
                                             {/* <Nav.Link  className="nav-link grey-blue-text" > Books
                                                {/* <Link to={'/admin/books'}>Books</Link> */}
                                                {/* </Nav.Link>  */}
                                            </Nav.Item>
                                        </LinkContainer>

                                        <LinkContainer to={'/admin/categories'} activeClassName="active">
                                            <Nav.Item className=" mb-4 pointer light-grey-background pt-2 pb-2 pl-3" >
                                                Categories

                                                </Nav.Item>
                                        </LinkContainer>
                                    </Nav>
                                </div>
                            </div>
                            <div class="col-md-9 p-4 light-grey-background">
                                {this.props.children}


                                {/* <Route  render={matchProps => (
                                        // <HomeLayout>
                                            <Component {...matchProps} />
                                        // </HomeLayout>
                                 )} /> */}
                                {/* <Switch>
                                        <Route  exact path="/admin/books" component={AllBooks} />
                                        <Route exact path="/admin/books/create" component={CreateBook} />
                                        <Route exact path="/admin/authors" component={AllAuthors} />
                                        <Route exact path="/admin/authors/create" component={CreateAuthor} />
                                        <Route exact path="/admin/categories" component={AllCategories} />
                                        <Route exact path="/admin/categories/create" component={CreateCategory} /> 
                                    </Switch> */}

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
            // {/* </Router> */}
        )
    }
}
export default withRouter(Admin);
// Admin.propTypes = {
//     children: PropTypes.node.isRequired,
//   }
