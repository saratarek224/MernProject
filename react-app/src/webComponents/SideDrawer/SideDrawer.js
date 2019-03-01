import React from 'react';
import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses ='side-drawer open';
    }
    return(
        <nav className={drawerClasses}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/">About us</a></li>
                <li><a href="/catgory">Categories</a></li>
                <li><a href="/">Authors</a></li>
                <li><a href="/">Terms and conditions</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/signup">signup</a></li>
            </ul>
        </nav>);
};

export default sideDrawer;