import React from 'react';
import './DrawerToggleBtn.css';

const DrawerToggleBtn = props => (
    <button className="toggle-button" onClick = {props.click}>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
        <div className="toggle-button-line"></div>
    </button>
);

export default DrawerToggleBtn;