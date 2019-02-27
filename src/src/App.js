import React, { Component } from 'react';
import './App.css';
import Index from './index.component';
import catgoryPage from './catgoryPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer'; 
import Backdrop from './components/Backdrop/Backdrop';
import Homepage from './Homepage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import BooksPage from './Books/BooksPage'

class App extends Component {

  state = {
    sideDrawerOpen : false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render() {
    let backDrop;

    if(this.state.sideDrawerOpen){
      backDrop = <Backdrop click={this.backdropClickHandler} />;
    }
    return (
      <Router>
        <div style={{height: '100%'}}>

          <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backDrop}          
          <Switch>
              <Route path='/books' component={BooksPage} />
              <Route path='/catgory' exact component={ Index } />
              <Route path="/catgory/:id" component={ catgoryPage } />
              <Route path='/' component={Homepage} />
              
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
