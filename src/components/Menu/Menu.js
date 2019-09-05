import React from 'react';
import {Link} from 'react-router-dom'
import './Menu.css';

class Menu extends React.Component{

    render(){
        return(
            <div className="nav-bar">
                <Link to='/'><header>Rate My Campsite</header></Link>
                <ul>
                    <li><Link to="/post">Post</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li> <Link to="/signup">Sign Up</Link></li>
                </ul>
            </div>
        );
    }
}

export default Menu;