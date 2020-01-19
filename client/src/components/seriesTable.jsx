import React, {Component} from "react";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import {Redirect} from 'react-router-dom'

const SeriesTable = ({series}) => {
  const date = new Date();
  return (  
    <React.Fragment>{localStorage.getItem('token') ?
    <table className={date.getHours() >= 18 ? "table table-dark" : "table"}>
      <TableHeader></TableHeader>
      <TableBody series={series}></TableBody>
    </table>
  : <Redirect to="/signup"></Redirect>}</React.Fragment>
  );
}


export default SeriesTable;
