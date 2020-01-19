import React from "react";
import {} from "react-router-dom";

import Joi from "joi";

import Form from "./common/form";
import "./css/form.css";

import userService from "../services/userService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: { email: "", password: "" }
  };

  async doSubmit() {
      const token = await userService.login(this.state.data);
      userService.loginWithJwt(token);
      console.log(token);
      window.location = "/serie";
  }

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };

  render() {
    return (
      <div className="form-group mt-3">
        <form onSubmit={this.handleSubmit} className="form_center">
          <h1>Login</h1>
          {this.renderInput("email", "Email", "Email")}
          {this.renderInput("password", "Password", "Password", "password")}
          {this.renderBtn("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
