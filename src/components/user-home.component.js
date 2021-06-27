import React, {Component} from 'react';
import axios from "axios";

// UserHome class component renders the main page that will be the home page for BMI web app.
// Main functionality consist of calculating the user's body mass index and performing database CRUD operation on it.
export default class UserHome extends Component {
    // Constructor for UserHome component instances.
    constructor(props) {
        super(props);

        // Capturing the basic metrics needed for the BMI formula along with the user currently logged in and the calculated BMI.
        this.state = {
            heightInFeet: '',
            heightInInches: '',
            weight: '',
            userLoggedIn: {},
            bodyMassIndex: 0
        }

        // HTTP GET REQUEST: Retrieves the user that is currently logged into the application.
        axios.get('https://body-mass-index-cal.herokuapp.com/find/' + sessionStorage.getItem('username'))
            .then(response => {
                console.log(response.data[0]);
                // If the response comes back empty, then the userLoggedIn state will be assigned an empty object to prevent it from crashing.
                this.setState({ userLoggedIn: response.data[0] || {} });
                console.log(this.state.userLoggedIn);
            })
            .catch(error => console.log('+ Failed to make the axios get request for user information: ' + error));

        // Data binding the 'this' keyword to its appropriate function.
        this.onChangeFeet = this.onChangeFeet.bind(this);
        this.onChangeInches = this.onChangeInches.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
    }


    // Before the component is mounted to the DOM, retrieve the current user's username from the client and checks for login status.
    componentDidMount() {
        let sessionMemory = sessionStorage.getItem('username');
        console.log(sessionMemory);
        console.log('\nCOOKIE has the following information: ' + sessionMemory);

        // If the user's username session is not an empty string, then log it and allow them to remain in the home page.
        // otherwise, redirect them to the login page to sign into their account.
        if(sessionMemory) {
            console.log(`Signed in as ${sessionMemory}`);
        } else {
            // Redirects the user to the login component.
            this.props.history.push('/login');
        }
    }


    // Sets the state for the heightInFeet property.
    onChangeFeet = (e) => {
        this.setState({ heightInFeet: Number(e.target.value) });
    }


    // Sets the state for the heightInInches property.
    onChangeInches = (e) => {
        this.setState({ heightInInches: Number(e.target.value) });
    }


    // Sets the state for the weight property.
    onChangeWeight = (e) => {
        this.setState({ weight: Number(e.target.value) });
    }

    // This is a pure function that calculates and returns the user's BMI: TESTED.
    calculateBodyMassIndex = (feet, inches, weight) => {
        // Formula for BMI: BMI(kg/m2) = mass(lb) / height2(in) × 703
        return Number((703 * weight / Math.pow(((feet * 12) + inches), 2)));
    }


    onSubmit = (e) => {
        e.preventDefault();

        // BMI stores the user's body mass index which is already calculated before assignment.
        let newBMI = this.calculateBodyMassIndex(this.state.heightInFeet, this.state.heightInInches, this.state.weight);
        console.log(`\n> BMI was calculated to approximately:  ${newBMI.toPrecision(4)}`);

        // Sets the current BMI state to the newly calculated BMI at a decimal precision of 4.
        this.setState({ bodyMassIndex: newBMI.toPrecision(4) });

        // HTTP PUT REQUEST: axios call to update the BMI for the current user logged in.
        axios.put('https://body-mass-index-cal.herokuapp.com/update/' + this.state.userLoggedIn._id, {
            Body_Mass_Index: newBMI
        })
            .then(response => console.log(`\n> User's body mass index was updated to the database: ${response}`))
            .catch(error => console.log(`\n> Failed to load the user's body mass index: ${error}`));

        // the BMI calculated is then rendered to the client.
        let userBMI = document.getElementById('bodyMassIndex');

        // Custom styling to the BMI rendered element above.
        userBMI.style.backgroundColor = 'rgba(205, 14, 14, 0.9)';
        userBMI.innerHTML = `BODY MASS INDEX: ${newBMI.toPrecision(4)}`;
    }

    render() {
        return (
            <div className="container-fluid fs-5 lh-base bg-light">
                <main className="row" style={{ padding: '100px 0'}}>
                    {/* start of the welcome board section of the home page. If the user is   */}
                    <h2 className="col-md-12 text-center fs-1 p-2">Welcome { this.state.userLoggedIn.first_name || '' }</h2>
                    <p className="text-center fs-4" style={{ marginBottom: '100px' }}>Enter your height and weight below to find your body mass index (BMI). This number is commonly used to judge whether your weight is healthy.</p>

                    <section className="col-md-6 will">
                        <div className="card mb-5 shadow-lg p-1">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="https://cdn2.iconfinder.com/data/icons/men-women-health-wildberry-vol-1/256/BMI_Calculator-512.png" className="card-img img-responsive shadow-sm mt-5 mb-5" alt="Green body mass index calculator" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title fs-3">Body Mass Index</h5>
                                        <hr />
                                        <p className="card-text">Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.</p>
                                        <p className="card-text pt-4">Your BMI can be calculated using standard or metric measures for your height and weight.</p>
                                        <p className="card-text mt-5"><small className="text-muted mt-5">Last updated 3 mins
                                            ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-lg p-1 mt-5 mb-5">
                            <div className="row no-gutters">
                                <div className="col">
                                    <div className="card-body">
                                        <h5 className="card-title text-center pb-2 fs-3">Standardized cutoff points for overweight and obesity:</h5>
                                        <hr />

                                        <ul className="list-group bg-body p-3">
                                            <li className="list-group-item d-flex justify-content-between align-items-center bg-success text-white p-3">
                                                Normal weight is a BMI between 18.5 and 24.9
                                                <span className="badge badge-primary badge-pill bg-white text-success">18.5 - 24.9</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center bg-warning text-white p-3">
                                                Overweight is a BMI between 25.0 and 29.9
                                                <span className="badge badge-primary badge-pill bg-white text-warning"> 25.0 - 29.9</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center bg-danger text-white p-3">
                                                Obesity is a BMI of 30.0 or higher
                                                <span className="badge badge-primary badge-pill bg-white text-danger">30</span>
                                            </li>
                                        </ul>

                                        <p className="card-text text-center"><small className="text-muted text-center">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="col-md-6 will">
                        <div className="card shadow-lg">
                            <div className="card-header text-center bg-dark text-white fs-3">
                                BMI Calculator
                            </div>
                            <div className="card-body p-5">
                                <p className="card-text text-center">The BMI calculator provides body mass index and the corresponding weight status category for adults 20 years and older.</p>

                                <form onSubmit={this.onSubmit}>
                                    <br/>
                                    <p className="card-text pb-3"><b>Step 1.) Enter your height</b></p>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Enter feet:</label>
                                            <input
                                                type="number"
                                                value={this.state.heightInFeet}
                                                className="form-control"
                                                onChange={this.onChangeFeet}
                                                placeholder="5"
                                                autoComplete="on"
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <label>Enter inches:</label>
                                            <input
                                                type="number"
                                                value={this.state.heightInInches}
                                                className="form-control"
                                                onChange={this.onChangeInches}
                                                placeholder="4"
                                                autoComplete="on"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <br/>
                                    <p className="card-text pb-3 pt-3"><b>Step 2.) Enter your weight</b></p>
                                    <div className="row">
                                        <div className="col-6">
                                            <label>Enter weight in pounds:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={this.state.weight}
                                                placeholder="135.8"
                                                onChange={this.onChangeWeight}
                                                autoComplete="on"
                                                required
                                            />
                                        </div>

                                        <div className="col-6">
                                            <div id="bodyMassIndex" className="p-2 mt-4 mb-3 text-center text-white font-weight-bold">

                                            </div>
                                        </div>

                                        <input type="submit" className="btn btn-lg btn-outline-success mt-5" value="Calculate"/>
                                    </div>
                                </form>
                            </div>

                            <p className="card-text text-center text-muted"><small>Note: this calculator uses JavaScript. If you have JavaScript turned off or have problems using the calculator, use the formula for calculating BMI on <a href="https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html">About BMI for Adults</a>.</small></p>
                            <div className="card-footer text-center bg-dark text-white">
                                2 days ago
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        );
    }
}

