import React from 'react';
import {Link } from 'react-router-dom';
import './Login.css';
import authApi from '../../api-services/auth-api';
import TokenService from '../../services/token-service';

class Login extends React.Component{
   
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    state={
        error: null
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {username, password} = e.target;
       
        authApi.postLogin({
            user_name: username.value,
            password: password.value,
        })
        .then(res=>{
            username.value = ''
            password.value = ''
           
            // save token
            TokenService.saveAuthToken(res.authToken)
            this.props.onLoginSuccess()
        }).catch(error=>{
           
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