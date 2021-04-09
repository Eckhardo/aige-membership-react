import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Users from "../components/Users/Users";
import Events from "../components/Events/Events"
import Seasons from "../components/Seasons/Seasons";
import SeasonUsers from "../components/SeasonUser/SeasonUsers";
import LoginForm from "../components/Login/LoginForm";
import Nav from "./Nav";


const Router = props => {
    const [user, setUser] = useState();


    useEffect(() => {
        console.log("Layout#useEffect#####################################################################");
        const auth = JSON.parse(localStorage.getItem('user'));
        console.log("local", auth);
        console.log("local string", JSON.stringify(auth));
        if (user) {
            setUser(auth);
        }
    })

    return (
        <BrowserRouter>
            <Route
                path="/"
                render={() => (
                    <Nav/>
                )}
            />
            <Switch>
                <Route exact path="/" component={Users}/>
                <Route path="/users" component={Users}/>
                <Route path="/events" component={Events}/>
                <Route path="/seasons" component={Seasons}/>
                <Route path="/seasonUsers" component={SeasonUsers}/>
                <Route path="/seasonEvents" component={SeasonUsers}/>
                <Route path="/login" component={LoginForm}/>

            </Switch>
        </BrowserRouter>

    )
}

export default Router;
