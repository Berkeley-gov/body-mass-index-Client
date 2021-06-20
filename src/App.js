import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';


// React Components that were are importing for Root App usage
import Navbar from './components/navbar.component';
import UserHome from './components/user-home.component';
import UserLogin from './components/user-login.component';
import UserSignUp from './components/user-signup.component';
import UserUpdate from './components/user-update.component';
import Footer from "./components/footer.component";
import Image from "./components/BMIimage.component";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="bg-body">
                    <Navbar />
                    <Image/>
                    <Route path="/home" exact={true} component = {UserHome} />
                    <Route path="/login" component={UserLogin} />
                    <Route path="/users/" component={UserSignUp} />
                    <Route path="/update/:id" component={UserUpdate} />
                    <img id="healthPic" style={{ height: '280px', width:' 100%'}} className="img-responsive" src="https://www.myhealthunlimited.com/wp-content/themes/encompass/images/layout/feat-img-sample.jpg" alt="" />
                    <Footer />
                </div>
            </Router>
        );
    }
};

export default App;
