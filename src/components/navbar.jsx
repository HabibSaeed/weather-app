import React from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

const Navbar = () => {
    return (
        <div className='navbar-main'>
            <div className='navbar-content'>
                <FontAwesomeIcon className='icon-1' icon={faCloud} />
                <h3>Weather App</h3>
            </div>
            <div className='navbar-nested'>
                <ul>
                    <li>Home</li>
                    <li>Weather</li>
                    <li>About</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
