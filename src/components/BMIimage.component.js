import React, { Component } from 'react';

// BMIimg component class renders a mobile responsive image for the home page.
export default class BMIimg extends Component {
    render() {
        return (
            <div className="row">
                <img className="img-responsive img-fluid"  src="https://www.texashealthflowermound.com/wp-content/uploads/2019/07/THFM_Headers_WeightLoss_2_BMI.jpg"  alt="vector of the acronym BMI"/>
            </div>
        );
    }
}
