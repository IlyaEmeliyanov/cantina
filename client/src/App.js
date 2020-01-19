import React, { Component } from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom'
import RegisterForm from './components/registerForm'
import LoginForm from './components/loginForm'
import SeriesTable from './components/seriesTable'
import SerieForm from './components/serieForm'
import DateTable from './components/dateTable'

import AppBar from './components/appBar'

import http from './services/httpService'
import userService from './services/userService'

class App extends Component {
  state={
    series: [],
    user: {}
  };

  async componentDidMount(){
    const {data} = (await http.get('/serie'));
    console.log(data);
    this.setState({series: data});
    const user = await userService.getCurrentUser();
    this.setState({user});
  }

  render(){
    const {series, user} = this.state;
    return (
      <React.Fragment>
        <AppBar user={user}></AppBar>
        <Switch>
          <Route path="/login" render={props => <LoginForm {...props}></LoginForm>}></Route>
          <Route path="/signup" render={props => <RegisterForm {...props}></RegisterForm>}></Route>
          <Route path="/serie" render={props => <SeriesTable {...props} series={series}></SeriesTable>}></Route>
          <Route path="/createSerie" render={props => <SerieForm {...props} series={series}></SerieForm>}></Route>
          <Route path="/" exact render={props => <DateTable {...props} series={series}></DateTable>}></Route>
          <Redirect to="/"></Redirect>
        </Switch>  
      </React.Fragment>
    );
  }
}

export default App;
