import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.css';

// renders a basic footer that contains
// about, credits, home.

class Footer extends React.Component{

    render(){
        return(
            <div className="footer">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/'>Login</Link></li>
                    <li><Link to='/about'>Signup</Link></li>
                </ul>
                
            </div>
        )
    }
}

export default Footer;