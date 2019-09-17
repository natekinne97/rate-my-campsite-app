import config from '../config';


const authApi = {
    // login
    postLogin(credentials) {
        // login endpoint
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    // user is auto logged in after creation
    // create account
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users/new-user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    // checks for user associated with token given 
    // user has 1 chance to open the link or it expires
    // called when rendered in reset.js
    getUsername(token){
        return fetch(`${config.API_ENDPOINT}/reset/reset-check`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ resetPasswordToken: token})
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    // final step is to reset the password.
    updatePassword( username,newPassword) {
        return fetch(`${config.API_ENDPOINT}/reset/reset-password`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: newPassword })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
}

export default authApi;