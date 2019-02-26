import React, { Component } from 'react';

import HomeNav from '../componant/homeNav';
import HomeSideBar from '../componant/homesidebar';
 
 class Home extends Component{


  render()
  {
      return(
          <>
          <div className="nav">
          <HomeNav/>
          </div>
           <div className="sidenav">
          <HomeSideBar/>
         </div>
         <div className="table">
         <h1> table</h1>
         </div>
         </>
)}
      }
      export default Home;


