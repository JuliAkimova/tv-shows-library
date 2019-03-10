import React, { Component } from 'react'
import AuthService from './authService';

const withAuth = (AuthComponent) => {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor(props) {
            super(props);
            this.state = {
                admin: null
            }
        };

        componentWillMount() {
            if(!Auth.isLoggedIn()) {
                this.props.history.replace('/admin')
            } else {
                try {
                    const admin = Auth.getProfile()
                    this.setState({
                        admin: admin
                    })
                }
                catch(err) {
                    Auth.logout()
                    this.props.history.replace('/admin')
                }
            }
        }
      render() {
        if(this.state.admin) {
            return (
                <AuthComponent history={this.props.history} admin={this.state.admin} />
            )
        } else {
            return null
        }
      }
    }
    
};

export default withAuth;
