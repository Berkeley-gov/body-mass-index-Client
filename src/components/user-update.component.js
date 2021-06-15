import React, { Component} from 'react';

export default class UserUpdate extends Component {
    render() {
        return (
            <div>
                <div className="">
                    <form className="bg-light p-5">
                        <h2 className="text-center p-5 fs-1">Update Your Account Information Below</h2>
                        <hr/>

                        <div className="form-group row mb-5">
                            <label htmlFor="username" className="col-sm-2 col-form-label font-weight-bold"><b>Username:</b></label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="username" placeholder="username" />
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row mb-5">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label font-weight-bold"><b>Password:</b></label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3"
                                       placeholder="Password" />
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row mb-5">
                            <label htmlFor="firstName" className="col-sm-2 col-form-label font-weight-bold"><b>First Name:</b></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="firstName"
                                       placeholder="Juan" />
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row mb-5">
                            <label htmlFor="lastName" className="col-sm-2 col-form-label"><b>Last Name:</b></label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="LastName"
                                       placeholder="Ramirez" />
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row mb-5">
                            <label htmlFor="age" className="col-sm-2 col-form-label"><b>Age:</b></label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="age"
                                       placeholder="21" />
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group row mb-5">
                            <label htmlFor="bodyMassIndex" className="col-sm-2 col-form-label"><b>Body Mass Index:</b></label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" id="bodyMassIndex"
                                       placeholder="18.43" />
                            </div>
                        </div>

                        <hr/>

                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}