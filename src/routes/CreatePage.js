import React, { Component } from 'react'
import CreateAccount from '../components/Create-Account/CreateAccount';

// handles login actions 
export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = () => {
        console.log('pushing for redirect')
        const { history } = this.props
        console.log(history, 'history');
        history.push( '/login');
    }

    render() {
        return (
            <React.Fragment>
                <CreateAccount
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </React.Fragment>

        )
    }
}
