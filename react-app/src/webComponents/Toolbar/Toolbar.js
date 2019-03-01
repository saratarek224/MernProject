import React from 'react';
import './Toolbar.css';
import DrawerToggleBtn from '../SideDrawer/DrawerToggleBtn';
import { Link } from 'react-router-dom';

const toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar_navigation">
            <div className="toolebar_toggle_btn">
                <DrawerToggleBtn click = {props.drawerToggleClickHandler} />
            </div>
            <div className="toolbar_logo"><Link to= "/">Good Reads</Link></div>
            <div className="space" />
            <div className="toolbar_navigation_items">
                <ul>
                    {/* <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/books">Books</Link></li>
                    <li><Link to="/authors">Authors</Link></li>
                    <li><Link to="/catgory">Categories</Link></li>
                    <li><Link to="/terms">Terms and conditions</Link></li> */}
                    <li><Link to="/webLogin" class="button1">Login</Link></li>
                    <li><Link to="/signup" class="button1">Signup</Link></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;