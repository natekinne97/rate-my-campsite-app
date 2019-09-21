import React from 'react';
import {Link } from 'react-router-dom';
import './Login.css';
import campsiteContext from '../../context/context';
import authApi from '../../api-services/auth-api';
import TokenService from '../../services/token-service';

class Login extends React.Component{
    static contextType = campsiteContext

    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state={
        error: null
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {username, password} = e.target;
        console.log('logged in');
        authApi.postLogin({
            user_name: username.value,
            password: password.value,
        })
        .then(res=>{
            username.value = ''
            password.value = ''
            console.log(res.user_id);
            // get user id for making reviews
            this.context.setUser(res.user_id);
            console.log(this.context.setUser(res.user_id), 'user id from context');
            // save token
            TokenService.saveAuthToken(res.authToken)
            this.props.onLoginSuccess()
        }).catch(error=>{
            console.log(error.error, 'error');
            this.setState({
                error: error.error
            })
        })
    }

    render(){
        return(
            <div className="login">
                <header>Login</header>
                {this.state.error
                ? <p className="red">{this.state.error}</p>
                : null}

                <form className="login-form gen-form" onSubmit={this.handleSubmit}>

                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" required/>

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required/>

                    <button type="submit">Login</button>
                    <Link to='/forgot-password'>Forgot password?</Link>
		        </form>
                
            </div>
        );
    }
}

export default Login;