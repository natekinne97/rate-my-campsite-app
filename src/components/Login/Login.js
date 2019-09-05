import React from 'react';

class Login extends React.Component{

    render(){
        return(
            <div>
                <header>Login</header>
                <form className="login-form gen-form">

                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" name="username" required/>

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required/>

                    <button type="submit">Login</button>
		        </form>
            </div>
        );
    }
}

export default Login;