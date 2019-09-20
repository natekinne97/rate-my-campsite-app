import React from 'react';
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Menu.css';

class Menu extends React.Component{
    // delet the auth token when logout is clicked
    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    }

    // renders logout link and post campsite when user is logged in
    renderLogoutLink(){
        return (
            <>
                <li><Link to="/post">Post</Link></li>
                <li><Link
                    onClick={this.handleLogoutClick}
                    to="/">Logout</Link></li>  
            </>
        )
    }

    // renders only login and signup when user is not logged in
    renderLoginLink(){
        return(
            <>
                <li><Link to="/login">Login</Link></li>
                <li> <Link to="/signup">Sign Up</Link></li>
            </>
        )
    }

    render(){
        return(
            <div className="nav-bar">
                <Link to='/'><header>Rate My Campsite</header></Link>
                <ul>
                    {TokenService.hasAuthToken()
                    ? this.renderLogoutLink()
                    : this.renderLoginLink()}
                </ul>
            </div>
        );
    }
}

export default Menu;