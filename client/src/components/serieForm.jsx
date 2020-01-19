import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi";

import "react-bootstrap";
import "./css/form.css";

import http from "../services/httpService";
import serieService from "../services/serieService";
import userService from '../services/userService' 

class SerieForm extends Form {
  state = {
    elements: [],
    currentElement: {},
    data: {
      wine: "",
      qty: "",
      person: "",
      purpose: "",
      comment: "",
      destinationStr: ""
    },
    errors: { wine: "", qty: "", person: "", purpose: "", comment: "" }
  };

  async componentDidMount() {
    const { data } = await http.get("/wine");
    data.map(wine => {
      delete wine.__v;
      delete wine._id;
    });
    const personId = (await userService.getCurrentUser())._id;
    this.setState({ elements: data, currentElement: data[0].name, data: {wine: data[0].id, person: personId} });
  }

  schema = {
    wine: Joi.string().required(),
    qty: Joi.number()
      .min(1)
      .max(10000)
      .required(),
    person: Joi.string().required(),
    purpose: Joi.string().required(),
    comment: Joi.string()
      .min(10)
      .max(50)
      .required(),
    destinationStr: Joi.string()
      .max(20)
      .required()
  };

  async doSubmit() {
    const { data } = this.state;
    await serieService.postSerie(data);
    window.location = "/serie";
  }

  handleSelectOption = async ({ target }) => {
    const { data, elements, currentElement } = this.state;
    const element = elements.find(el => {
      return el.name === currentElement ? el : null;
    });
    data[target.name] = element.id;
    this.setState({ currentElement: target.value, data});
  };

  render() {
    const { elements } = this.state;
    return (
      <div className="form-group mt-3">
        <form onSubmit={this.handleSubmit} className="form_center">
          <h1>Crea Prelievo</h1>
          {this.renderSelect("wine", elements)}
          {this.renderInput("qty", "Quantita", "Quantità")}
          {/* {this.renderInput("person", "Persona", "Person")} */}
          {this.renderInput("purpose", "Scopo", "Scopo")}
          {this.renderInput("comment", "Commento", "Commento")}
          {this.renderInput("destinationStr", "Destinazione", "Destinazione")}
          {this.renderBtn("Crea prelievo")}
        </form>
      </div>
    );
  }
}

export default SerieForm;
