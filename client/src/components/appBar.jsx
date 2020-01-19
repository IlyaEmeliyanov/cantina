import React, { Component } from "react";
import { Link } from "react-router-dom";

const AppBar = ({user}) => {
  const date = new Date();
  return (  
    <nav id="navbar-example" className={date.getHours() >= 18 ? 'navbar bg-dark' : 'navbar bg-light'}>
    <Link to="/serie" style={{fontSize: '50px', textDecoration: 'none'}}>💩</Link>
    <Link to="/createSerie">Crea prelievo</Link>
    <ul className="nav nav-pills" style={{display: 'flex', alignItems: 'center'}}>
      <li className="nav-item mr-4 text-primary" style={{cursor: 'pointer'}}>
          {user ? user.name : null}
      </li>
      <li className="nav-item mr-4">
        <Link to="/signup">Sign Up</Link>
      </li>
      <li className="nav-item mr-4">
        {!user && <Link to="/login"><button className="btn btn-primary">Login</button></Link>}
        {user && <button className="btn btn-primary" onClick={signOut}>Sign out</button>}
      </li>
    </ul>
  </nav>
  );
}

const signOut = () => {
  localStorage.removeItem('token');
  window.location = '/serie';
};

export default AppBar;
