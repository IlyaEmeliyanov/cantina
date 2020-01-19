import React from 'react'
import Joi from 'joi'

import './css/form.css'

import Form from '../components/common/form'

import userService from '../services/userService'

class RegisterForm extends Form {
    state = { 
        data: { name: "", email: "", password: "", confirmPassword: "" },
        errors: {name: "", email: "", password: "", confirmPassword: ""}
     }
    
    async doSubmit() {
        const token = await userService.signup(this.state.data);
        userService.loginWithJwt(token);
        window.location = '/serie';
    }

    schema = {
        name: Joi.string().max(10).required(),
        email: Joi.string().email().required(), 
        password: Joi.string().min(4).max(20).required(),
        confirmPassword: Joi.string().min(4).max(20).required()
    };

    render() { 
        return (
            <div className="form-group mt-3">
                <form onSubmit={this.handleSubmit} className="form_center">
                    <h1>Sign up</h1>
                    {this.renderInput("name", "Name", "Name")}
                    {this.renderInput("email", "Email", "Email")}
                    {this.renderInput("password", "Password", "Password", "password")}
                    {this.renderInput("confirmPassword", "Confirm password", "Confirm password", "password")}
                    {this.renderBtn("Sign up")}
                </form>
            </div> 
         );
    }
}
 
export default RegisterForm;