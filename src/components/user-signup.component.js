import { Component } from 'react';
import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

// UserSignUp class component allows a user to sign up for an account.
export default class UserSignUp extends Component {
    constructor(props) {
        super(props)

        // State is set with all the necessary information needed to make an account for the user.
        this.state = {
            username: "",
            password: "",
            first_name: "",
            last_name: "",
            age: "",
            Body_Mass_Index: ""
        };

        // Binds all the "this" keywords to the appropriate method that is invoking it
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBodyMassIndex = this.onChangeBodyMassIndex.bind(this);
    }

    // IMPORTANT NOTE: These methods were not properly assigning the form's input to the state object because
    // of a lexical scope issue so arrow function were required for 'this' to gain correct scoping when called.


    // Sets the username.
    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }


    // Sets the password.
    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    // Sets the first name.
    onChangeFirstName = (e) => {
        this.setState({ first_name: e.target.value });
    }


    // Sets the last name.
    onChangeLastName = (e) => {
        this.setState({ last_name: e.target.value });
    }


    // Sets the age.
    onChangeAge = (e) => {
        this.setState({ age: e.target.value });
    }


    // Sets the BMI.
    onChangeBodyMassIndex = (e) => {
        this.setState({ Body_Mass_Index: e.target.value });
    }


    // Handler function that controls the functionality of the form's submission.
    onSubmit = (e) => {
        e.preventDefault();

        // Creating a user object on form submit and initializing all variables for it.
        const user = {
            _id: Math.random(),
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            Body_Mass_Index: this.state.Body_Mass_Index
        };

        console.log(user);

        // IMPORTANT NOTE: Front end server uses the port number 3000, not 5000 like the backend port number.

        // HTTP POST REQUEST: post request made to backend BMI API so user's new account is added to the database.
        axios.post('https://body-mass-index-cal.herokuapp.com/users/add', user)
            .then(response => console.log(response))
            .catch(error => console.log('+ Failed to make the axios post request to add user to the database: ' + error));

        // Takes the user back to the login component.
        this.props.history.push('/login');
    }


    render() {
        return (
            <div className="row-fluid bg-body" style={{ margin: '200px auto'}}>
                <div className="col-sm-4 mx-auto">
                    <form className="card shadow-lg" onSubmit={this.onSubmit} style={{ width: '100%'}}>
                        <h2 className="card-header text-center bg-dark text-white">Create Account</h2>
                        <div className="form-group row p-4">
                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2" >Username: </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={this.state.username}
                                    className="form-control"
                                    onChange={this.onChangeUsername}
                                    autoComplete="on"
                                    required />
                            </div>

                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2">Password: </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="{styles.input} form-control"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    autoComplete="on"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row p-4">
                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2">First name: </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    id="firstname"
                                    className="{styles.input} form-control"
                                    value={this.state.first_name}
                                    onChange={this.onChangeFirstName}
                                    autoComplete="on"
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2">Last name: </label>
                                <input
                                    type="text"
                                    name="lastname"
                                    id="lastname"
                                    className="{styles.input} form-control"
                                    value={this.state.last_name}
                                    onChange={this.onChangeLastName}
                                    autoComplete="on"
                                />
                            </div>
                        </div>

                        <div className="form-group row p-4">
                            <div className="form-group col-md-6">
                                <label className="fs-5 pb-2">Age: </label>
                                <input
                                    type="number"
                                    className="{styles.input} form-control"
                                    value={this.state.age}
                                    onChange={this.onChangeAge}
                                    autoComplete="on"
                                />
                            </div>

                            <Link  to="/login" className="mt-4 fs-5">Login into account </Link>
                        </div>

                        <div className="form-group pt-4 pb-4">
                            <input type="submit" value="Sign up" className="btn btn-primary fs-4" style={{marginLeft: '30px'}} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}