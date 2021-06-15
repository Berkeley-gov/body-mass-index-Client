import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand">BMI Calculator</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label=" Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/update/:id" className="nav-link">Update Account</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" >Action</a></li>
                                    <li><a className="dropdown-item" >Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item">Something else here</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="/users/add" className="nav-link" tabIndex="-1"
                                      aria-disabled="true">Sign Up</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}