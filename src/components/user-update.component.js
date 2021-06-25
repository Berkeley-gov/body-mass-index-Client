import React, { Component} from 'react';
import axios from "axios";


export default class UserUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            age: '',
            bodyMassIndex: '',
            user: {}
        };


        // Data binding all the "this" keywords to the appropriate method that is invoking it
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBodyMassIndex = this.onChangeBodyMassIndex.bind(this);
    }

    componentDidMount() {
        axios.get('https://body-mass-index-cal.herokuapp.com/find/' + sessionStorage.getItem('username'))
            .then(response => {
                this.setState({ user: response.data[0] || {}});
                console.log(this.state.user);
            })
            .catch(error => {
                console.log('\n> Failed to retrieve all user from the database');
                console.log(error);
            });
    }

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onChangeFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    }

    onChangeLastName = (e) => {
        this.setState({ lastName: e.target.value });
    }

    onChangeAge = (e) => {
        this.setState({ age: e.target.value });
    }

    onChangeBodyMassIndex = (e) => {
        this.setState({ bodyMassIndex: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        // Creating a user object on form submit and initializing all variables for it
        const userToUpdate = {
            username: this.state.username,
            password: this.state.password,
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            age: this.state.age,
            Body_Mass_Index: this.state.bodyMassIndex
        };

        console.log(userToUpdate);

        const username = sessionStorage.getItem('username');
        console.log(`\n> username from cookie is: ${username}`);

        console.log(this.state.user._id);

        // 'authentication' variable will keep tracker if the credentials were correctly authenticated using a boolean value
        axios.put('https://body-mass-index-cal.herokuapp.com/users/update/' + this.state.user._id, userToUpdate)
            .then(response => { console.log('\n> User new information was saved to the database as: ' + response) })
            .catch(error => console.log(`\n> Failed to update the user's new information: ${error}`));
    }

    render() {
        return (
            <div>
                <div className="">
                    <form className="bg-light p-5" onSubmit={this.onSubmit}>
                        <h2 className="text-center p-5 fs-1">Update Your Account Information Below</h2>
                        <p className="fs-4 text-center p-5">Submit any changes that you would like made to your account. Once you are ready to update any account information, submit the form by clicking on the update button. </p>

                        <hr/>
                        <div className="form-group row m-5 fs-4">
                            <label htmlFor="username" className="col-sm-2 col-form-label font-weight-bold"><b>Username:</b></label>
                            <div className="col-sm-10">
                                <input type="text"
                                    className="form-control"
                                    id="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    placeholder="username" />
                            </div>
                        </div>

                        <hr/>
                        <div className="form-group row m-5 fs-4">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label font-weight-bold"><b>Password:</b></label>
                            <div className="col-sm-10">
                                <input type="password"
                                       className="form-control"
                                       id="password"
                                       value={this.state.password}
                                       onChange={this.onChangePassword}
                                       placeholder="Password" />
                            </div>
                        </div>

                        <hr/>
                        <div className="form-group row m-5 fs-4">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label font-weight-bold"><b>First Name:</b></label>
                            <div className="col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="firstName"
                                       value={this.state.firstName}
                                       onChange={this.onChangeFirstName}
                                       placeholder="Juan" />
                            </div>
                        </div>

                        <hr/>
                        <div className="form-group row m-5 fs-4">
                            <label htmlFor="lastName" className="col-sm-2 col-form-label"><b>Last Name:</b></label>
                            <div className="col-sm-10">
                                <input type="text"
                                       className="form-control"
                                       id="LastName"
                                       value={this.state.lastName}
                                       onChange={this.onChangeLastName}
                                       placeholder="Ramirez" />
                            </div>
                        </div>

                        <hr/>
                        <div className="form-group row m-5 fs-4">
                            <label htmlFor="age" className="col-sm-2 col-form-label"><b>Age:</b></label>
                            <div className="col-sm-10">
                                <input type="number"
                                       className="form-control"
                                       id="age"
                                       value={this.state.age}
                                       onChange={this.onChangeAge}
                                       placeholder="21" />
                            </div>
                        </div>

                        <hr/>
                        <div className="form-group row m-5 fs-4">
                            <label htmlFor="bodyMassIndex" className="col-sm-2 col-form-label"><b>Body Mass Index:</b></label>
                            <div className="col-sm-10">
                                <input type="number"
                                       className="form-control"
                                       id="bodyMassIndex"
                                       value={this.state.bodyMassIndex}
                                       onChange={this.onChangeBodyMassIndex}
                                       placeholder="18.43" />
                            </div>
                        </div>

                        <hr/>
                        <div className="form-group row">
                            <div className="col-sm-12 text center">
                                <button type="submit" className="btn btn-primary text-center fs-4 m-5">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}