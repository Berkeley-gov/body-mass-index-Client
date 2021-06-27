import React, {Component} from 'react';
import axios from 'axios';

// UserLogin class component controls access to the web application by authenticating the user's credentials
export default class UserLogin extends Component {
    constructor(props) {
        super(props);

        // State holds an array of users retrieved from the database and the user's login credentials
        this.state = {
            username: '',
            password: '',
            users: []
        }

        // binds all the "this" keywords to the appropriate method that is invoking it.
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }


    // Before mounting and initializing the component, all users are retrieved from the database.
    componentDidMount() {
        // HTTP GET REQUEST: retrieves all users from the database sets to the state of users.
        axios.get('https://body-mass-index-cal.herokuapp.com/users/')
            .then(response => {
                this.setState({ users: response.data});
                console.log(this.state.users);
            })
            .catch(error => {
                console.log('\n> Failed to retrieve all user from the database');
                console.log(error);
            });
    }


    // Function to change and save username.
    onChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }


    // Function to change and save password.
    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    // Handler function that controls the functionality of the form's submission.
    onSubmit = (e) => {
        // Prevents the default behavior of the html form.
        e.preventDefault();

        // Object to store the user inputted login credentials.
        const userLoggingIn = {
            username: this.state.username,
            password: this.state.password
        };

        console.log('\nUser attempted to login with the following credentials:');
        console.log(userLoggingIn);

        // Authenticates login information.
        this.checkCredentials(userLoggingIn);
    }


    // Authenticates the user's login information that was submitted from the form.
    checkCredentials = (credentials) => {
        // 'authentication' variable will keep tracker if the credentials were correctly authenticated using a boolean value.
        let authentication = false;

        // Loops through the state of users retrieved from the database.
        for (let arrayElement of this.state.users) {
            // Checks if the current user in iteration has the same password and username that was inputted from the form.
            authentication = arrayElement.username === credentials.username && arrayElement.password === credentials.password;

            if(authentication) {
                console.log('\n> User successfully authenticated and logged into their account.\nUSER LOGGED IN:' + arrayElement.first_name);
                // Setting the user login cookies.
                sessionStorage.setItem('username', arrayElement.username);

                // If the user is successfully authenticated, then redirects the user to the home page.
                this.props.history.push('/');

            } else if(authentication === false) {
                // Grabs the paragraph element from the DOM.
                let warningText = document.getElementById('warning-text');

                // Sets text context to the paragraph element and colors it red.
                warningText.innerHTML = "Username or password was incorrect. Please try again!";
                warningText.style.color = "red";
                warningText.style.fontSize = "16px";
            }
        }
    }

    render() {
        return (
            <div className="row-fluid">
                <form  onSubmit={this.onSubmit} style={{ margin: '200px auto'}} className="card shadow-lg col-sm-4">
                    <div className="card form-group bg-body" style={{ margin: '0 auto', width: '100%'}}>
                        <h2 className="card-header text-center bg-dark text-white p-3 fs-1">Login</h2>

                        <div className="form-group p-5">
                            <div className="form-group mb-4">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-dark text-white" id="addon-wrapping">@</span>
                                    </div>
                                    <input type="text"
                                           value={this.state.username}
                                           className="form-control"
                                           onChange={this.onChangeUsername}
                                           placeholder="Username"
                                           required />
                                </div>
                            </div>

                            <div className="form-group pt-5">
                                <div className="input-group flex-nowrap">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-dark text-white" id="addon-wrapping">#</span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        placeholder="Password"
                                        required />
                                </div>
                            </div>

                            <p id="warning-text"></p>

                            <div  className="form-group mt-2 pt-4" >
                                <input style={{ width: '6rem'}} type="submit" value="Submit" className="btn btn-primary fs-5" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

