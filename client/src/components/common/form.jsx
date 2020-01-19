import React, { Component } from "react";
import Joi from "joi";

import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const errors = {};
    const options = { abortEarly: true };
    const { data } = this.state;
    const { error } = Joi.validate(data, this.schema, options);

    if (!error) return null;

    for (let e of error.details) errors[e.path[0]] = e.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };
  validatePasswordEquality = (password, confirmPassword) => {
    return password === confirmPassword || confirmPassword === password
      ? null
      : "The 2 passwords must be equal";
  };
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    const data = { ...this.state.data };

    data[input.name] = input.value;

    const passwordEqualityMessage = this.validatePasswordEquality(
      data.password,
      data.confirmPassword
    );

    if (errorMessage || passwordEqualityMessage) {
      errors[input.name] = errorMessage;
      errors["confirmPassword"] = passwordEqualityMessage;
    } else delete errors[input.name];

    this.setState({ data, errors });
  };
  renderInput = (name, label, placeholder, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        value={data[name]}
        type={type}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };
  renderBtn(label) {
    const { password, confirmPassword } = this.state.data;
    if (confirmPassword)
      return (
        <button
          disabled={this.validate() || password !== confirmPassword}
          className="btn btn-primary"
        >
          {label}
        </button>
      );
    else
      return (
        <button disabled={this.validate()} className="btn btn-primary">
          {label}
        </button>
      );
  }
  renderSelect(name) {
    const { elements } = this.state;
    return (
      <select
        className="dropdown"
        name={name}
        onChange={this.handleSelectOption}
      >
        {elements.map(el => (
          <option key={el.id}>{el.name}</option>
        ))}
      </select>
    );
  }
}

export default Form;
