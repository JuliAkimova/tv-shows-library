import React, { Component } from 'react';
import AuthService from './authService';
import withAuth from './withAuth';
const Auth = new AuthService();

class Editor extends Component {
    handleLogout(){
        Auth.logout()
        this.props.history.replace('/admin');
    }
    render() {
        return (
            <div>
                <h2>Editor page</h2>
                <button 
                    type="button" 
                    className="logout" 
                    onClick={this.handleLogout.bind(this)}>
                Logout
                </button>
            </div>
        )
    }
};

export default withAuth(Editor);
