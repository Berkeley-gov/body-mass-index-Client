import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Footer class component renders a navigational footer bar to the home page. Contains access to my portfolio.
export default class Footer extends Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 bg-dark shadow-lg">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Tenth navbar example">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarsExample08" aria-controls="navbarsExample08"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="https://berkeley-gov.github.io/myportfolio.github.io/">Juan's portfolio</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </footer>
        );
    }
}