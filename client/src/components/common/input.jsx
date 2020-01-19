import React, { Component } from 'react'

const Input = ({name, label, placeholder, errors,...rest}) => {
    return ( 
        <div className="form-group">
        <label className="ml-2" htmlFor={name}>{label}</label>
        <input {...rest} placeholder={placeholder} name={name} id={name} className="form-control" />
        <div className="text-danger">{errors}</div>
      </div>
    );
}
 
export default Input;