import React, { Component} from 'react';
import axios from 'axios';

export default class UserLogin extends Component {
    constructor(props) {
        super(props);

        // State will hold an array of users retrieved from the database
        this.state = {
            username: '',
            password: '',
            users: []
        }

        // binds all this keywords to the appropriate method that is invoking it
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    // Upon mounting and initializing the Component, fetch all users from the database
    componentDidMount() {
        axios.get('http://localhost:3000/users/')
            .then(response => {
                this.setState({ users: response.data});
                console.log(this.state.users);
            })
            .catch(error => {
                console.log('\n> Failed to retrieve all user from the database');
                console.log(error);
            });
    }

    // Function to change and save user's login credentials
    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onSubmit = (e) => {
        // Prevents the default behavior of the html form
        e.preventDefault();

        const userLoggingIn = {
            username: this.state.username,
            password: this.state.password
        };

        console.log('\nUser attempted to login with the following credentials:');
        console.log(userLoggingIn);


        this.checkCredentials(userLoggingIn);


    }

    checkCredentials = (credentials) => {
        // 'authentication' variable will keep tracker if the credentials were correctly authenticated using a boolean value
        let authentication = false;

        for (let arrayElement of this.state.users) {
            authentication = arrayElement.username === credentials.username && arrayElement.password === credentials.password;

            if(authentication) {
                // If the user is successfully authenticated, then redirect the user to the home page
                console.log('\n> User successfully authenticated and logged into their account.');

                // Setting the user login cookies
                window.cookie = `username=${credentials.username}`;

                // If the user is authenticated, then redirect them to home page
                window.location = '/home';

            } else {
                // Grabs the paragraph element from the dom based on it's ID
                let warningText = document.getElementById('warning-text');

                // Set text context to the paragraph element and color it red
                warningText.innerHTML = "Username or password was incorrect. Please try again!";
                warningText.style.color = "red";
                warningText.style.fontSize = "12px";
            }
        }
    }

    render() {
        return (
            <div className="loginForm shadow p-2">
                <form className="" onSubmit={this.onSubmit}>
                    <div className="card form-group">
                        <h2 className="card-header text-center bg-dark text-white">Login</h2>

                        <div className="form-group p-5">
                            <div className="form-group mb-4">
                                <label>Username: </label>
                                <input type="text"
                                       value={this.state.username}
                                       className="form-control"
                                       onChange={this.onChangeUsername}
                                       placeholder="Enter username"
                                       required />
                            </div>

                            <div className="form-group">
                                <label>Password: </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    placeholder="Enter password"
                                    required />
                            </div>

                            <p id="warning-text"></p>

                            <div  className="form-group mt-2 pt-4">
                                <input type="submit" value="Login" className="btn btn-primary" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

