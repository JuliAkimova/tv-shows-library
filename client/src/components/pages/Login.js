import React, { Component } from 'react';
import AuthService from './authService';
  
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Auth = new AuthService();
    };

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.Auth.login(
            this.state.email,
            this.state.password
        )
        .then(res => {
            this.props.history.replace('/admin/editor')
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentWillMount() {
        // Redirect to editor page if already authenticated
        if(this.Auth.isLoggedIn()) {
            this.props.history.replace('/admin/editor')
        }
    }

    render() {
        return (
            <div className='form-container'>
                <form 
                    autoComplete='off'
                    onSubmit={this.handleSubmit}
                    >
                    <h2 className='form-header'>LogIn</h2>
                    <div className='form-body'>
                        <input 
                            type='email'
                            name='email'
                            placeholder='email...'
                            value={this.state.email}
                            onChange={this.handleInput}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='password'
                            value={this.state.password}
                            onChange={this.handleInput}
                            required
                        />   
                        <input type='submit' value='submit' /> 
                    </div>
                </form>
            </div>
        )
    }
};

export default Login;
