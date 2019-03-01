import React from 'react';
import './Toolbar.css';
import { Link } from 'react-router-dom';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            
            <div className="toolbar_logo"><Link to= "/">Good Reads</Link></div>
            <div className="space" />
            <div className="toolbar_navigation_items">
                <ul>
                    {/* <li><Link to="/">Home</Link></li> */}
                    <li><Link to="/books">Books</Link></li>
                    <li><Link to="/authors">Authors</Link></li>
                    <li><Link to="/catgory">Categories</Link></li>
                    <li><input type="search" placeholder="search"/></li>
                    <li><Link to="/">
                        <img src="https://secure.gravatar.com/avatar/67b9c20b6ee38d1d50f2114795981fbf?s=50&d=mm&r=g"
                        alt="Book Name" /> </Link>
                    </li>
                    <li><label>Username</label></li>
                    {/* <li>  <button className="logout" onClick={this.onLogout}>
                                            Logout
                                </button></li> */}
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;