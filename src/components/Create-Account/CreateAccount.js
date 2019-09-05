import React from 'react';

class CreateAccount extends React.Component {

    render() {
        return (
            <div>
                <header>Create Account</header>
                <form className="account-form gen-form">

                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" name="username" required/>

                    <label htmlFor="profile-pic">Profile picture</label>
                    <input type="file" name="profile-pic"/>

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" required/>

                    <label htmlFor="repeat-password">Repeat password</label>
                    <input id="repeat-password" type="password" name="repeat-password" required/>

                    <button type="submit">Sign Up</button>

	        	</form>
            </div>
        );
    }
}

export default CreateAccount;