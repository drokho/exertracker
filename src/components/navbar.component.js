import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="container">
        <Link to="/" className="brand">ExcerTracker</Link>
            <ul className="">
                <li className="">
                    <Link to="/" className="nav-link">Exercises</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Log Exercise</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/user" className="nav-link">Manage Users</Link>
                </li>
            </ul>
      </nav>
    );
  }
}