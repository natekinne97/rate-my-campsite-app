import config from '../config'
import TokenService from './token-service';

const AuthApiService = {
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
    // create new user
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
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
        ).then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        ).catch(err => {
            console.log(err, 'error');
            return null;
        })
    },
    // reset password
    emailReset(email) {
        return fetch(`${config.API_ENDPOINT}/reset/forgot`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(email),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    postRefreshToken() {
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => {
                /*
                  similar logic to whenever a user logs in, the only differences are:
                  - we don't need to queue the idle timers again as the user is already logged in.
                  - we'll catch the error here as this refresh is happening behind the scenes
                */
                TokenService.saveAuthToken(res.authToken)
                TokenService.queueCallbackBeforeExpiry(() => {
                    AuthApiService.postRefreshToken()
                })
                return res
            })
            .catch(err => {
                console.log('refresh token request error')
                console.error(err)
            })
    },
}

export default AuthApiService