import React, { Component } from 'react';
//import Home from './router/home';
//import Author from './router/authers';
//import Signup from './router/signup';
//import Login from './router/login';
//import { Router, Link } from "@reach/router";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Index  from './router/authers';
import Home from './router/home';
import Signup from './router/signup';
import FormsPage from './router/login'; 
import AuthorInfo from './router/authorInfo'
import './App.css';


class App extends Component {
  render() {
    return (
      // <>
      //   

      //   <Router>
      //     <Home path="/home"  Component={}/>
      //     <Signup path="/signup" />
      //     <Login path="/login" />
      //     <Author path="/authors" />
      //   </Router>
      // </>
      
      <Router>
        <Switch>
       
        <Route path="/home" component={ Home}  />
          <Route path="/authors" component={Index } />
          <Route path="/authors/:id"  component={AuthorInfo } />
          <Route path="/singup" component={Signup } />
          <Route path="/login" component={ FormsPage } />
        </Switch>
      </Router>
      
    );
  }
}

export default App;
