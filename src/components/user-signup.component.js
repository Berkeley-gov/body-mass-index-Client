import { Component } from 'react';
import React from 'react';
import axios from 'axios';

export default class UserSignUp extends Component {
    constructor(props) {
        super(props)

        // This how to create a variable in React, not javascript
        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            age: "",
            Body_Mass_Index: ""
        };

        // binds all this keywords to the appropriate method that is invoking it
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBodyMassIndex = this.onChangeBodyMassIndex.bind(this);
    }


    // Custom method to handle form input and save it to state object
    // IMPORTANT: These methods were not properly assigning the form's input to the state object because
    // of a lexical scope issue so arrow function were required for 'this' to gain correct scoping
    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onChangeFirstName = (e) => {
        this.setState({ first_name: e.target.value });
    }

    onChangeLastName = (e) => {
        this.setState({ last_name: e.target.value });
    }

    onChangeAge = (e) => {
        this.setState({ age: e.target.value });
    }

    onChangeBodyMassIndex = (e) => {
        this.setState({ Body_Mass_Index: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Creating a user object on form submit and initializing all variables for it
        const user = {
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            Body_Mass_Index: this.state.Body_Mass_Index
        };

        console.log(user);

        // Using axios to make http post request to the back end api
        // Front end server uses the port number 3000, not 5000 like the backend port number
        axios.post('http://localhost:3000/users/add', user)
            .then(response => console.log(response))
            .catch(error => console.log('+ Failed to make the axios post request to add user to the database: ' + error));

        // Takes the user back to the login page
        window.location = '/login';
    }

    // Form code to render to the front-end view
    render() {
        return (
            <div className="p-5 m-5">

                <form className="card shadow" onSubmit={this.onSubmit}>
                    <h2 className="card-header text-center bg-dark text-white">Create Account</h2>
                    <div className="form-group row p-3">
                        <div className="form-group col-md-6">
                            <label>Username: </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={this.state.username}
                                className="form-control"
                                onChange={this.onChangeUsername}
                                placeholder="username"
                                autoComplete="on"
                                required />
                        </div>

                        <div className="form-group col-md-6">
                            <label>Password: </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="{styles.input} form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                placeholder="password"
                                autoComplete="on"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group row p-3">
                        <div className="form-group col-md-6">
                            <label>First name: </label>
                            <input
                                type="text"
                                name="firstname"
                                id="firstname"
                                className="{styles.input} form-control"
                                value={this.state.first_name}
                                onChange={this.onChangeFirstName}
                                placeholder="ex: Jacob"
                                autoComplete="on"
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label>Last name: </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="{styles.input} form-control"
                                value={this.state.last_name}
                                onChange={this.onChangeLastName}
                                placeholder="ex: Ramirez"
                                autoComplete="on"
                            />
                        </div>
                    </div>

                    <div className="form-group row p-3">
                        <div className="form-group col-md-6">
                            <label>Age: </label>
                            <input
                                type="number"
                                className="{styles.input} form-control"
                                value={this.state.age}
                                onChange={this.onChangeAge}
                                placeholder="ex: 24"
                                autoComplete="on"
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label>Body Mass Index: </label>
                            <input
                                type="decimal"
                                className="{styles.input} form-control"
                                value={this.state.Body_Mass_Index}
                                onChange={this.onChangeBodyMassIndex}
                                placeholder="ex: 18.5"
                                autoComplete="on"
                            />
                        </div>
                    </div>

                    <div className="form-group pt-4 pb-4">
                       <input type="submit" value="Sign up" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}