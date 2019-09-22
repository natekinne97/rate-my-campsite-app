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

    handleCreateSuccess = () => {
        const { history } = this.props
        history.push('/');
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
