import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
// import from 'react-r';
import { IndexRoute, hashHistory } from 'react-router';
import Admin from './layouts/admin';
import Web from './layouts/webLayout';
import Login from './layouts/login';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import ImageUpload from './components/test.components';
import AllBooks from './components/allBooks.components';
import CreateBook from './components/createBook.component';
import AllAuthors from './components/allAuthors.components';
import CreateAuthor from './components/createAuthor.component';
import AllCategories from './components/allCategories.components';
import CreateCategory from './components/createCategory.components';
import Index from './Categories/index.component';
import catgoryPage from './Categories/catgoryPage';
import Homepage from './webComponents/Homepage';
import Signup from './Login/Signup';
import WebLogin from './Login/Login';
import BooksPage from './Books/BooksPage';
import AuthorPage from './Authors/AuthorsPage';

import Bookdetails from './Books/Bookdetails';
import Authordetails from './Authors/Authordetails';
import AllUserBooks from './userComponents/allUserBooks.components';
import AllReadBooks from './userComponents/allReadBooks.components';
import WantToReadBooks from './userComponents/wantToRead.components';
import CurrentlyBooks from './userComponents/currentlyBooks.components';
// import WantToReadBooks
library.add(faIgloo);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/admin/books" component={AllBooks} />
          <Route exact path="/admin/books/create" component={CreateBook} />
          <Route exact path="/admin/authors" component={AllAuthors} />
          <Route exact path="/admin/authors/create" component={CreateAuthor} />
          <Route exact path="/admin/categories" component={AllCategories} />
          <Route exact path="/admin/categories/create" component={CreateCategory} />
          <Route exact path="/" component={Homepage} />
          <Route path="/adminLogin" component={Login} />
          {/* web  */}
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/webLogin' component={WebLogin} />
          <Route exact path='/books' component={BooksPage} />
          <Route exact path='/authors' component={AuthorPage} />
          <Route exact path='/catgory' exact component={Index} />
          <Route exact path="/catgory/:id" component={catgoryPage} />

          <Route exact path="/authors/:id" component={Authordetails} />
          <Route exact path='/books/:id' component={Bookdetails} />
          {/* user */}
          <Route exact path='/allUserBooks' component={AllUserBooks} />
          <Route exact path='/allReadBooks' component={AllReadBooks} />
          <Route exact path='/WantToReadBooks' component={WantToReadBooks} />
          <Route exact path='/CurrentlyBooks' component={CurrentlyBooks}/>
        </Switch>

      </Router>

    );
  }
}

export default withRouter(App);

