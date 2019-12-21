import React , { Component } from 'react';

import './sign-in.styles.sass';

import FormInput from './../form-input';
import CustomButton from './../custom-button';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    };

    handleSubmit = event => {
        event.preventDefault();

        this.setState({
            email: '',
            password: ''
        });
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    render() {

        const { email, password } = this.state;

        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form action="" onSubmit={ this.handleSubmit }>
                    <FormInput
                        type="email" 
                        name="email" 
                        value={ email } 
                        required
                        handleChange={ this.handleChange }
                        label="Email" />
                    <FormInput
                        type="password" 
                        name="password" 
                        value={ password } 
                        required 
                        handleChange={ this.handleChange }
                        label="Password" />

                    <CustomButton type="submit"> Sign In </CustomButton>
                </form>
            </div>
        );
    };
}

export default SignIn;