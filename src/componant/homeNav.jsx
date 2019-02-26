import React from 'react';
import {  Link, Router } from "@reach/router";


export default function HomeNav(props){

  return (

    <>
    <Router>
    <div className="navbar">
      <ul>
          <li>  <Link to='/'>Home</Link></li>
          <li>  <Link to='/categories'>Categories</Link></li>
          <li>  <Link to='/books'>Books</Link></li>
          <li>  <Link to='/authors'>Authors</Link></li>
          <li>
                 <form>
                 <input type="text" placeholder="Search" className="mr-sm-2" />
                 <button >Search</button>
                </form>
          </li>
      </ul>
    </div>
    </Router>
    </>
    
  );

}
