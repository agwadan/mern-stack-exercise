import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg sticky-top">
        <Link to="/exercises" className="navbar-brand">Exercise Tracker</Link>

        <div className="collpse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/exercises" className="nav-link">Exercises</Link>
            </li>

            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Exercise</Link>
            </li>

            <li className="navbar-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
            <li className="navbar-item">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}