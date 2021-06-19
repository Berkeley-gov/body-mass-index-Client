import React, {Component} from 'react';
import axios from "axios";

export default class UserHome extends Component {
    // Constructor for UserHome instances
    constructor(props) {
        super(props);

        // For now, I am going to capture the basic metrics needed for the BMI formula
        // ** Might change approach later
        this.state = {
            heightInFeet: '',
            heightInInches: '',
            weight: '',
            userLoggedIn: null
        }

        // Data binding the 'this' keyword to its appropriate function
        this.onChangeFeet = this.onChangeFeet.bind(this);
        this.onChangeInches = this.onChangeInches.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
    }

    componentDidMount() {
        let sessionMemory = sessionStorage.getItem('username');
        console.log('\nUsername from COOKIE is: ' + sessionMemory);
        // the url is sent with parameter that the backend will then extract
        // ** before, I was putting https://body-mass-index-cal.herokuapp.com/find/?username=ramjam but that is not how you should do it
        axios.get('https://body-mass-index-cal.herokuapp.com/find/' + sessionStorage.getItem('username'))
            .then(response => {
                console.log('\n> Current user data retrieved - DATA: ' + response.data);
                this.setState({ user: response.data });
                console.log(this.state.user.first_name);

            })
            .catch(error => console.log('+ Failed to make the axios get request for user information: ' + error));
    }

    // Function sets the state for the heightInFeet property
    onChangeFeet = (e) => {
        this.setState({ heightInFeet: Number(e.target.value) });
    }

    onChangeInches = (e) => {
        this.setState({ heightInInches: Number(e.target.value) });
    }

    onChangeWeight = (e) => {
        this.setState({ weight: Number(e.target.value) });
    }

    // This is a pure function that returns the user's BMI
    //TODO: calculateBodyMassIndex function must be test with chai and mocha
    calculateBodyMassIndex = (feet, inches, weight) => {
        // Formula for BMI: BMI(kg/m2) = mass(lb) / height2(in) × 703
        return Number((703 * weight / Math.pow(((feet * 12) + inches), 2)));
    }

    onSubmit = (e) => {
        e.preventDefault();


        let BMI = this.calculateBodyMassIndex(this.state.heightInFeet, this.state.heightInInches, this.state.weight);
        console.log(`\n> BMI was calculated to approximately:  ${BMI.toPrecision(4)}`);

    }
    
    render() {
        return (
            <div className="container-fluid">
                <main className="row" style={{ margin: '150px 0'}}>
                    {/* start of the welcome board section of the home page  */}
                    <section className="col-md-12" style={{ margin: '80px auto' }}>
                        <div className="card bg-light">
                            <h3 className="card-title">Welcome {sessionStorage.getItem('username')}</h3>

                        </div>
                    </section>

                    <section className="col-md-6 will">
                        <div className="card mb-5 shadow p-1">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src="https://cdn2.iconfinder.com/data/icons/men-women-health-wildberry-vol-1/256/BMI_Calculator-512.png" className="card-img shadow-sm" alt="" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">Body Mass Index</h5>
                                        <hr />
                                        <p className="card-text">Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.</p>
                                        <p className="card-text">Your BMI can be calculated using standard or metric measures for your height and weight.</p>
                                        <p className="card-text"><small className="text-muted">Last updated 3 mins
                                            ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow p-1 mt-5">
                            <div className="row no-gutters">
                                <div className="col">
                                    <div className="card-body">
                                        <h5 className="card-title text-center pb-2">Standardized cutoff points for overweight and obesity:</h5>

                                        <ul className="list-group bg-body p-2">
                                            <li className="list-group-item d-flex justify-content-between align-items-center bg-success text-white">
                                                Normal weight is a BMI between 18.5 and 24.9
                                                <span className="badge badge-primary badge-pill bg-white text-success">18.5 - 24.9</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center bg-warning text-white">
                                                Overweight is a BMI between 25.0 and 29.9
                                                <span className="badge badge-primary badge-pill bg-white text-warning"> 25.0 - 29.9</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center bg-danger text-white">
                                                Obesity is a BMI of 30.0 or higher
                                                <span className="badge badge-primary badge-pill bg-white text-danger">30</span>
                                            </li>
                                        </ul>

                                        <br />
                                        <p className="card-text text-center"><small className="text-muted text-center">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="col-md-6 will">
                        <div className="card shadow">
                            <div className="card-header text-center bg-dark text-white">
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
                                            <input type="submit" className="btn btn-primary shadow mt-4 ml-4" value="Calculate BMI"/>
                                        </div>
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

